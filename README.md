<div align="center">

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="60" alt="TypeScript" />


## Overview

Random Cat Viewer is a production-ready frontend application that fetches and displays random cat breed data from the [FreeAPI](https://freeapi.app) public cats endpoint. Each visit surfaces a different breed, complete with breed characteristics, temperament tags, animated trait bars, and high-quality imagery.

The project was built as a focused exercise in clean TypeScript architecture, API integration, and high-quality UI design — without any frontend framework.

---

## Preview

> Dark forest-green and warm-gold palette. Playfair Display headings, DM Sans body copy, skeleton loaders, and smooth CSS animations throughout.

```
┌─────────────────────────────────────────────────┐
│  🐾  Feline Gallery                              │
│                                                 │
│  Random Cat Viewer                              │
│  Discover feline companions from around the world│
│                                                 │
│  ┌──────────────┐  ┌───────────────────────────┐│
│  │              │  │  Chantilly-Tiffany         ││
│  │  Cat Image   │  │  Origin: United States     ││
│  │              │  │                            ││
│  │              │  │  Description...            ││
│  │  Life: 14-16 │  │                            ││
│  │  Weight: 3-5 │  │  Trait Bars ████████       ││
│  └──────────────┘  └───────────────────────────┘│
│                                                 │
│  [ Next Cat ]  · View on Wikipedia              │
└─────────────────────────────────────────────────┘
```

---

## Features

- **Random breed on load** — fetches a new cat from the FreeAPI on every visit and on button click
- **Animated trait bars** — adaptability, intelligence, affection level, and 8 more characteristics rendered with smooth CSS transitions
- **Skeleton loading state** — polished shimmer placeholders while data is in-flight
- **Breed badges** — indoor, lap cat, hypoallergenic, and rare breed indicators
- **Temperament tags** — each personality trait rendered as a styled chip
- **Error handling** — graceful error state with a retry button
- **Wikipedia link** — deep-links to the breed's Wikipedia article when available
- **Fully typed** — zero `any`, strict TypeScript throughout
- **No framework** — pure TypeScript DOM manipulation, no React/Vue overhead
- **Responsive layout** — single-column on mobile, two-column grid on desktop

---

## Tech Stack

| Layer | Technology |
|---|---|
| Language | TypeScript 5.3 |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3.4 |
| Fonts | Playfair Display, DM Sans, DM Mono (Google Fonts) |
| API | FreeAPI — `/api/v1/public/cats/cat/random` |
| Icons | Inline SVG (no icon library dependency) |

---

## Project Structure

```
cat-viewer/
├── index.html              # Entry point HTML
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript config (strict mode)
├── tailwind.config.js      # Tailwind theme + custom animations
├── postcss.config.js       # PostCSS with Autoprefixer
├── package.json
└── src/
    ├── main.ts             # App bootstrap, render logic, event wiring
    ├── api.ts              # Fetch utility for the FreeAPI endpoint
    ├── types.ts            # TypeScript interfaces for API response
    ├── icons.ts            # SVG icon strings
    └── style.css           # Tailwind directives + custom component classes
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/random-cat-viewer.git
cd random-cat-viewer

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

```bash
npm run dev        # Start Vite dev server with hot reload
npm run build      # Type-check with tsc, then build for production
npm run preview    # Serve the production build locally
```

---

## API Reference

This project consumes the following public endpoint:

```
GET https://api.freeapi.app/api/v1/public/cats/cat/random
```

**Sample response shape:**

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Cat fetched successfully",
  "data": {
    "id": 19,
    "name": "Chantilly-Tiffany",
    "origin": "United States",
    "temperament": "Affectionate, Demanding, Loyal",
    "life_span": "14 - 16",
    "weight": { "imperial": "7 - 12", "metric": "3 - 5" },
    "description": "...",
    "adaptability": 5,
    "affection_level": 5,
    "intelligence": 5,
    "image": "https://cdn2.thecatapi.com/images/TR-5nAd_S.jpg",
    "wikipedia_url": "https://en.wikipedia.org/wiki/Chantilly-Tiffany"
  }
}
```

All API types are modelled in [`src/types.ts`](src/types.ts).

---

## Architecture Notes

### Why no framework?

The UI is entirely server-side-free and the data shape is flat — a single API call, a single render cycle. Introducing React or Vue would add build complexity with no meaningful benefit here. All rendering is done via typed template string functions (`renderCat`, `renderSkeleton`, `renderError`) that return HTML strings and are injected via `innerHTML`.

### Type safety

The project runs `tsc --noEmit` (strict mode) as part of `npm run build`. The Vite build will fail if there are any type errors, keeping the codebase clean.

### No icon libraries

All icons are self-contained SVG strings in `src/icons.ts`. This eliminates a runtime dependency and keeps the bundle minimal (~13 kB JS gzipped).

---

## Deployment

The `dist/` folder produced by `npm run build` is a fully static site — no server required.

**Netlify / Vercel:**

```bash
npm run build
# Deploy the dist/ folder
```

**GitHub Pages** (with Vite base config):

```ts
// vite.config.ts
export default defineConfig({
  base: '/random-cat-viewer/',
})
```

Then push `dist/` to the `gh-pages` branch.

---

## Roadmap

- [ ] Favourite breeds — persist liked cats to `localStorage`
- [ ] Filter by origin country
- [ ] Share card — generate a shareable image for a breed
- [ ] Dark / light theme toggle
- [ ] Keyboard shortcut (`Space`) to fetch next cat

---

## Contributing

Contributions are welcome. To propose a change:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

Please make sure `npm run build` passes before submitting.

---

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for details.

---

## Acknowledgements

- [FreeAPI.app](https://freeapi.app) for the free public cat API
- [The Cat API](https://thecatapi.com) for breed data and imagery
- [Google Fonts](https://fonts.google.com) for Playfair Display and DM Sans

---

<div align="center">

Made with TypeScript · Vite · Tailwind CSS

</div>