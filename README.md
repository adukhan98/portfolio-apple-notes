<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwindcss" alt="Tailwind" />
</p>

<h1 align="center">📝 personal notes</h1>

<p align="center">
  <em>a portfolio that feels like apple notes.</em>
</p>

<p align="center">
  <a href="https://www.linkedin.com/in/adnaankhan98/">linkedin</a> · 
  <a href="https://www.instagram.com/theadnaankhan">instagram</a> · 
  <a href="https://github.com/adukhan98">github</a>
</p>

---

## ✨ features

- **apple notes aesthetic** — clean, minimal ui inspired by macos notes
- **dark mode** — automatic system preference detection
- **markdown content** — write in markdown, render beautifully
- **smart date grouping** — today, yesterday, previous 7 days
- **responsive typography** — optimized for reading

---

## 🛠️ stack

| layer | tech |
|-------|------|
| framework | next.js 16 (app router) |
| styling | tailwind css 4 |
| content | markdown + gray-matter |
| rendering | react-markdown + remark-gfm |

---

## 🚀 quick start

```bash
# clone
git clone https://github.com/adukhan98/portfolio-applenotes.git

# install
npm install

# develop
npm run dev
```

open [localhost:3000](http://localhost:3000)

---

## 📁 structure

```
src/
├── app/
│   ├── globals.css      # apple notes styling
│   ├── layout.tsx       # root layout
│   └── page.tsx         # main page
├── components/
│   ├── NoteList.tsx     # sidebar with notes
│   └── NoteEditor.tsx   # content viewer
├── content/
│   ├── about/           # about me
│   ├── projects/        # project notes
│   ├── stack/           # tech stack
│   └── writing/         # thoughts & principles
└── lib/
    └── posts.ts         # markdown parser
```

---

## ✏️ adding content

create a new `.md` file in `src/content/[folder]/`:

```markdown
---
title: my new note
folder: projects
is_pinned: false
updated_at: '2025-12-15T12:00:00.000Z'
slug: my-new-note
---

# my new note

content goes here...
```

---

## 🎨 customization

edit `src/app/globals.css` to customize:

```css
:root {
  --sidebar-bg: #f5f5f7;
  --sidebar-active: #fef3c7;
  --accent-yellow: #f5c746;
}
```

---

## 📄 license

mit © [adnaan khan](https://github.com/adukhan98)

---

<p align="center">
  <sub>built with ☕ and next.js</sub>
</p>
