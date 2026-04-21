# How to Deploy to GitHub Pages

## Step 1 — Create a GitHub repo
1. Go to https://github.com/new
2. Name it something like `seojean` or `anniversary`
3. Set it to **Public**
4. Click **Create repository**

## Step 2 — Push your files
Open a terminal in this folder and run:

```bash
git init
git add .
git commit -m "happy 3 months seojean"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

## Step 3 — Enable GitHub Pages
1. Go to your repo on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under "Source", select **Deploy from a branch**
4. Choose **main** branch, **/ (root)** folder
5. Click **Save**

Your site will be live at:
**https://YOUR_USERNAME.github.io/YOUR_REPO_NAME**

(Takes ~1 minute to go live after first deploy)

## Adding photos
Drop your photos into the `images/` folder, then add `<img>` tags
to the photo grid in `index.html`. See the comment in the gallery section.
