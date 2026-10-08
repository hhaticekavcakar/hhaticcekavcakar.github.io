# Personal website

Source code of my personal website, published with GitHub Pages.
Plain HTML, CSS and JavaScript — no frameworks, no build step, no external libraries.

## Folder structure

```
index.html            all page content (text, projects, links)
style.css             layout, colours, fonts, mobile rules
script.js             mobile menu, image galleries, small helpers
assets/images/        profile photo, project images, favicon
assets/videos/        project videos (MP4, under 25 MB each)
documents/CV.pdf      my CV (keep this exact name)
documents/            project reports and slides (PDF)
```

## Editing checklist

1. Replace every `[PLACEHOLDER]` in `index.html` (search for `[`).
2. Replace `documents/CV.pdf` with my own CV, same file name.
3. Add project images to `assets/images/` and update the `src` and `data-src` paths.
4. Add videos to `assets/videos/` or delete the video blocks.
5. Open the page, press F12 → Console: it lists any placeholders still left.

## Updating the live site

Edit or upload files in this repository and commit. GitHub Pages republishes
automatically; changes appear within a few minutes (hard-refresh with Ctrl+F5).
