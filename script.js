// Loads content.json and renders the entire site.
// To update your portfolio, edit content.json — you never need to touch this file.

async function loadContent() {
  try {
    const res = await fetch('content.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to load content.json');
    const data = await res.json();
    render(data);
  } catch (err) {
    document.getElementById('app').innerHTML =
      '<p class="loading-note">Could not load content.json. Make sure it is in the same folder as index.html and that you are viewing this over http/https (not by double-clicking the file).</p>';
    console.error(err);
  }
}

function el(tag, opts = {}, children = []) {
  const e = document.createElement(tag);
  if (opts.class) e.className = opts.class;
  if (opts.href) e.href = opts.href;
  if (opts.id) e.id = opts.id;
  if (opts.text) e.textContent = opts.text;
  if (opts.html) e.innerHTML = opts.html;
  if (opts.attrs) Object.entries(opts.attrs).forEach(([k, v]) => e.setAttribute(k, v));
  children.forEach(c => c && e.appendChild(c));
  return e;
}

function render(data) {
  document.title = `${data.name} — Portfolio`;

  renderNav(data);
  renderHero(data);
  renderAbout(data);
  renderSkills(data);
  renderProjects(data);
  renderContact(data);
  renderFooter(data);

  document.getElementById('year').textContent = new Date().getFullYear();
  setupInteractions();
}

function renderNav(data) {
  document.getElementById('navLogoText').textContent = data.siteName || 'Portfolio';
}

function renderHero(data) {
  document.getElementById('heroName').innerHTML =
    `${escapeHtml(data.name)}<br><span>${escapeHtml(data.taglineHighlight)}</span>`;
  document.getElementById('heroRole').textContent = data.role;
  document.getElementById('heroDesc').textContent = data.intro;

  const avatar = document.getElementById('heroAvatar');
  if (data.avatar) {
    avatar.src = data.avatar;
    avatar.alt = data.name;
    avatar.style.display = 'block';
  }

  const status = data.status || {};
  const pulse = document.getElementById('statusPulse');
  const statusText = document.getElementById('statusText');
  if (status.available) {
    pulse.classList.remove('off');
    statusText.textContent = 'Available for work';
  } else {
    pulse.classList.add('off');
    statusText.textContent = 'Not currently available';
  }
  document.getElementById('statusLocation').textContent = status.location || '—';
  document.getElementById('statusFocus').textContent = status.focus || '—';
}

function renderAbout(data) {
  const textWrap = document.getElementById('aboutText');
  textWrap.innerHTML = '';
  (data.about?.paragraphs || []).forEach(p => {
    textWrap.appendChild(el('p', { text: p }));
  });

  const statGrid = document.getElementById('statGrid');
  statGrid.innerHTML = '';
  (data.about?.stats || []).forEach(s => {
    statGrid.appendChild(el('div', { class: 'stat-card glass' }, [
      el('div', { class: 'stat-num', text: s.num }),
      el('div', { class: 'stat-cap', text: s.label })
    ]));
  });
}

function renderSkills(data) {
  const cloud = document.getElementById('skillCloud');
  cloud.innerHTML = '';
  (data.skills || []).forEach(s => {
    cloud.appendChild(el('span', { class: 'skill-pill glass', text: s }));
  });
}

function renderProjects(data) {
  const bento = document.getElementById('bento');
  bento.innerHTML = '';
  (data.projects || []).forEach(p => {
    const sizeClass = p.size === 'large' ? 'p-large' : 'p-small';
    const stack = el('div', { class: 'project-stack' },
      (p.stack || []).map(t => el('span', { text: t })));

    const card = el('a', {
      class: `project-card glass ${sizeClass}`,
      href: p.link || '#',
      attrs: p.link && p.link !== '#' ? { target: '_blank', rel: 'noopener' } : {}
    }, [
      el('div', {}, [
        el('div', { class: 'project-tag', text: p.tag || '' }),
        el('div', { class: 'project-title', text: p.title || '' }),
        el('div', { class: 'project-desc', text: p.desc || '' })
      ]),
      stack,
      el('span', { class: 'project-arrow', text: '↗' })
    ]);
    bento.appendChild(card);
  });
}

function renderContact(data) {
  const c = data.contact || {};
  document.getElementById('contactHeading').textContent = c.heading || '';
  document.getElementById('contactDesc').textContent = c.desc || '';
  document.getElementById('contactEmail').href = `mailto:${c.email || ''}`;
  document.getElementById('contactGithub').href = c.github || '#';
  document.getElementById('contactLinkedin').href = c.linkedin || '#';
}

function renderFooter(data) {
  document.getElementById('footerName').textContent = data.name;
}

function escapeHtml(str = '') {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function setupInteractions() {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));

  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    nav.style.padding = window.scrollY > 40 ? '8px 24px' : '12px 24px';
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  setupScrollReveal(reduceMotion);
  if (!reduceMotion) setupBlobParallax();
}

function setupScrollReveal(reduceMotion) {
  const groups = [
    document.querySelectorAll('.stat-card'),
    document.querySelectorAll('.skill-pill'),
    document.querySelectorAll('.project-card'),
    [document.getElementById('aboutText')],
    [document.querySelector('.contact-card')],
    document.querySelectorAll('.section-head')
  ];

  groups.forEach(group => {
    group.forEach((elNode, i) => {
      if (!elNode) return;
      elNode.classList.add('reveal', 'reveal-stagger');
      elNode.style.setProperty('--stagger-delay', `${Math.min(i * 60, 300)}ms`);
    });
  });

  if (reduceMotion || !('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(elNode => elNode.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(elNode => observer.observe(elNode));
}

function setupBlobParallax() {
  // Parallax is applied to the wrapper, not individual .blob elements,
  // since each .blob already has its own CSS keyframe animation on `transform`
  // and a CSS animation always wins over an inline transform on the same element.
  const field = document.querySelector('.blob-field');
  if (!field || !window.matchMedia('(pointer: fine)').matches) return;

  let targetX = 0, targetY = 0, curX = 0, curY = 0;
  window.addEventListener('mousemove', (e) => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function animate() {
    curX += (targetX - curX) * 0.04;
    curY += (targetY - curY) * 0.04;
    field.style.transform = `translate(${curX * 18}px, ${curY * 18}px)`;
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

loadContent();
