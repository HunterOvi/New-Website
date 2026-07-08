# Mehedi Hasan Ovi — Portfolio

A glassmorphism-themed portfolio site. Static HTML/CSS/JS — no build step, no frameworks.
Content is separated into a JSON file so you can update your site without touching any code.

## Files
- `index.html` — page structure (shell only, content is loaded dynamically)
- `style.css` — all styling (glass panels, colors, layout, animations)
- `script.js` — loads `content.json` and builds the page; also handles the mobile menu
- `content.json` — **all your editable content lives here** (name, bio, skills, projects, contact links)
- `CNAME` — tells GitHub Pages to serve this site on `mehedihasanovi.site`

## How to edit your content
You do not need to touch HTML, CSS, or JS to update your portfolio. Just open
`content.json` and edit the values:

- `name`, `role`, `intro` — your hero section
- `status` — availability, location, focus
- `about.paragraphs` — your bio (add/remove paragraphs freely)
- `about.stats` — the 4 stat cards (e.g. "12" / "PROJECTS SHIPPED")
- `skills` — array of skill names, add or remove as many as you like
- `projects` — array of project objects. Each has:
  - `size`: `"large"` or `"small"` (controls the bento grid layout)
  - `tag`, `title`, `desc`, `stack` (array of tech names), `link`
- `contact` — heading, description, email, GitHub URL, LinkedIn URL

Save the file, re-upload it to GitHub (or push via git), and the live site updates —
no rebuild needed since it's read at page-load time.

**Important:** because the page loads `content.json` via `fetch()`, it must be viewed over
`http://` or `https://` (e.g. GitHub Pages, or a local dev server). Opening `index.html`
directly by double-clicking it (`file://...`) will not load the content — see "Testing
locally" below if you want to preview changes before uploading.

## Testing locally (optional)
If you want to preview edits before uploading, you need a local server since browsers
block `fetch()` on `file://` pages. If you have Python installed:
```bash
cd portfolio
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

## Deploy on GitHub Pages

1. **Create a repo** (skip if you already have one)
   - github.com → New repository → name it anything (e.g. `portfolio`)

2. **Upload/push these 5 files**: `index.html`, `style.css`, `script.js`, `content.json`, `CNAME`
   - Easiest: on the repo page, use "Add file" → "Upload files", drag all 5 in, commit.
   - Or via git:
     ```bash
     git init
     git add .
     git commit -m "Portfolio site"
     git branch -M main
     git remote add origin https://github.com/<your-username>/<repo-name>.git
     git push -u origin main
     ```

3. **Enable GitHub Pages**
   - Settings → Pages → Source: "Deploy from a branch" → Branch: `main`, folder: `/ (root)` → Save

4. **Connect your custom domain**
   - Settings → Pages → Custom domain → enter `mehedihasanovi.site` → Save
   - At your domain registrar, set DNS records:
     - 4 **A records** on `@` pointing to:
       ```
       185.199.108.153
       185.199.109.153
       185.199.110.153
       185.199.111.153
       ```
     - 1 **CNAME record**: `www` → `<your-username>.github.io`
   - Wait for DNS to propagate (minutes to a few hours), then check "Enforce HTTPS" once available.

5. **Done** — live at `https://mehedihasanovi.site`

## Notes
- Fully responsive, keyboard-accessible focus states, respects reduced-motion preference.
- To add/remove a project, just add/remove an object in the `projects` array in `content.json` — the layout updates automatically.
