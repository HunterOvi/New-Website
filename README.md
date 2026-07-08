# Mehedi Hasan Ovi — Portfolio

A glassmorphism-themed portfolio site. Static HTML/CSS/JS — no build step needed.

## Files
- `index.html` — the whole site (structure + styles + scripts in one file)
- `CNAME` — tells GitHub Pages to serve this site on `mehedihasanovi.site`

## What to edit before publishing
Open `index.html` and search for `<!-- EDIT` comments — those mark every spot with
placeholder content:
- Hero role/title and intro paragraph
- Status card (location, focus)
- About section bio + stats
- Skills list
- Project cards (title, description, tech stack, links)
- Contact email / GitHub / LinkedIn links

## Deploy on GitHub Pages

1. **Create a repo**
   - Go to github.com → New repository → name it anything (e.g. `portfolio`).
   - It can be public or private (Pages works with both on paid plans; use public if on the free plan).

2. **Push these files**
   ```bash
   cd portfolio
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - In the repo: Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: `main`, folder: `/ (root)` → Save
   - GitHub will give you a URL like `https://<your-username>.github.io/<repo-name>/`

4. **Connect your custom domain (mehedihasanovi.site)**
   - Still in Settings → Pages → Custom domain, enter `mehedihasanovi.site` → Save
     (this writes the `CNAME` file automatically if it isn't already there — you already have one).
   - At your domain registrar (wherever you bought mehedihasanovi.site), add these DNS records:

     **For the apex domain (mehedihasanovi.site):**
     Add four **A records** pointing `@` to GitHub's IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```

     **For www (optional but recommended, so www.mehedihasanovi.site also works):**
     Add a **CNAME record**:
     ```
     www → <your-username>.github.io
     ```

   - DNS changes can take anywhere from a few minutes to 24 hours to propagate.
   - Back in Settings → Pages, once DNS is detected, check **"Enforce HTTPS"** — GitHub will issue a free SSL certificate automatically.

5. **Done** — your site will be live at `https://mehedihasanovi.site`

## Notes
- If you rename the repo or change branches, double check Settings → Pages still points to the right source.
- The site is fully responsive and works without JavaScript for content (JS only handles the mobile menu and scroll effect).
