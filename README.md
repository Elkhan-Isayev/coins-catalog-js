# Coins Catalog

A lightweight, fully static catalog of collectible coins. Browse the collection,
open any coin for details, and search or filter by name, country, metal, year and
price — all in the browser, with **no backend and no database**.

🔗 **Live demo:** https://elkhan-isayev.github.io/coins-catalog-js/

## Highlights

- ⚛️ **React 18 + Vite** — fast dev server and tiny production bundle.
- 🪶 **Zero backend** — coin data is bundled as a static JSON module, so the app
  runs anywhere static files can be served.
- 🔎 **Client-side search, filtering and pagination.**
- 🚀 **Auto-deploys to GitHub Pages** via GitHub Actions on every push to `master`.

## Tech stack

| Concern  | Choice                          |
| -------- | ------------------------------- |
| UI       | React 18                        |
| Routing  | React Router 6 (`HashRouter`)   |
| Build    | Vite 5                          |
| Styling  | SCSS (Dart Sass)                |
| Hosting  | GitHub Pages                    |

## Getting started

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # produce an optimized static build in dist/
npm run preview  # preview the production build locally
```

## Project structure

```
.
├── index.html              # Vite entry HTML
├── vite.config.js          # base path configured for GitHub Pages
├── public/                 # static assets (favicon)
├── src/
│   ├── main.jsx            # app bootstrap + routes
│   ├── App.jsx             # shared layout (header/footer)
│   ├── index.scss          # global styles & design tokens
│   ├── data/coins.js       # the catalog (replaces the old database)
│   └── components/         # Home, CoinList, CoinCard, CoinDetails, SearchBar, Pagination
└── .github/workflows/deploy.yml
```

## Adding or editing coins

All catalog content lives in [`src/data/coins.js`](src/data/coins.js). Add an
object to the `coins` array; the country and metal filter options are derived
automatically from the data.

## Deployment

Pushing to `master` triggers the **Deploy to GitHub Pages** workflow, which
builds the site and publishes `dist/`. Enable it once in
**Settings → Pages → Build and deployment → Source: GitHub Actions**.

If you fork this repo under a different name, update the `base` value in
`vite.config.js` and the favicon path in `index.html` to match your repository
name.

## History

This project began as a full-stack app (React + Express + MySQL with image
uploads and an admin panel). It has been rewritten as a static single-page app:
the server, database and authentication were removed so it can be hosted for
free on GitHub Pages while keeping the public-facing catalog experience.

## License

[MIT](LICENSE)
