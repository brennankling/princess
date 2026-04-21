# Updating the Website

Whenever you make changes to any file, run these three commands to push them live:

```bash
git add .
git commit -m "describe what you changed"
git push
```

GitHub Pages will automatically rebuild the site — it's usually live within 30 seconds.

---

## Common updates

**Edit text (story, reasons, memories, etc.)**
Open `index.html` and find the section you want. Edit the text directly and save.

**Add photos to the Gold Mine**
1. Drop the new image into the `images/` folder
2. Open `index.html` and find the `<!-- BABY PHOTO GOLD MINE -->` section
3. Add a new line inside the photo grid:
   ```html
   <img src="images/YOUR_FILE.jpeg" alt="baby me 👶" onclick="openLightbox(this.src, this.alt)">
   ```

**Change the start date / day counter**
Open `script.js` and update the date on this line:
```js
var start = new Date('2026-01-20');
```

---

## First time setup (already done if site is live)

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

Then go to your repo → **Settings** → **Pages** → set source to **main / (root)** → Save.

Site will be live at: **https://YOUR_USERNAME.github.io/YOUR_REPO_NAME**
