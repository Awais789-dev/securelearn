# SecureLearn

A 12 page cybersecurity learning website. Frontend only: plain HTML, CSS and JavaScript. No build step, no install.

All courses, posts and resources are sample content for a demo project.

## Run it

Double click `index.html`, or for the best result use a tiny local server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Some features (the hash tool, copy buttons) work best on `localhost` or `https`.

## Pages

| Page | File |
| --- | --- |
| Home | `index.html` |
| About | `about.html` |
| Courses | `courses.html` |
| Course details | `course-details.html?id=...` |
| Blog | `blog.html` |
| Blog post | `blog-post.html?slug=...` |
| Cheat sheets | `cheatsheets.html` |
| Tools | `tools.html` |
| Roadmap | `roadmap.html` |
| Resources | `resources.html` |
| Contact | `contact.html` |
| Login / Sign up | `auth.html` |
| 404 (bonus) | `404.html` |

## Folder structure

```
securelearn/
  index.html ... (one HTML file per page)
  assets/
    favicon.svg
  css/
    base.css         design tokens (colors, fonts), reset, typography
    layout.css       container, grids, header, nav, footer
    components.css   buttons, cards, forms, tabs, accordion, toasts
    pages.css        styles for one or two pages only
    utilities.css    small helpers like mt-2, mb-0 (loaded last)
  js/
    data.js          ALL content: courses, posts, commands, ports, resources
    theme-init.js    sets the saved theme before the page paints
    layout.js        builds the shared header and footer
    main.js          shared helpers (window.SL) and global behavior
    render.js        shared card builders (course card, post card)
    password.js      password strength scoring (tools + sign up)
    pages/           one small script per page
```

## How to change things

- **Add a course, post, command, port or resource:** edit `js/data.js` only. Every page that shows that list updates by itself.
- **Change colors or fonts:** edit the variables at the top of `css/base.css`. The light theme overrides are right below them.
- **Add a menu link:** add one line to `NAV_LINKS` in `js/layout.js`.
- **Add a new page:** copy any HTML file, change `data-page`, add its script in `js/pages/`, and add the link to `layout.js`.

## Deploy on GitHub Pages (free)

1. Create a new repository on GitHub and upload everything inside this folder.
2. Go to **Settings > Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, pick `main` and `/ (root)`, then save.
4. After a minute your site is live at `https://YOUR-USERNAME.github.io/REPO-NAME/`.

All paths are relative, so it works in a sub folder without changes. GitHub Pages also uses `404.html` automatically.

## Notes

- The login, sign up, contact and newsletter forms are demos. They validate input but send and store nothing.
- Roadmap progress, enrollment and the theme choice are saved in `localStorage` in the visitor's browser only.
- The security tools run fully in the browser. The password generator uses `crypto.getRandomValues`.
- Fonts load from Google Fonts. Without internet the site falls back to system fonts.
