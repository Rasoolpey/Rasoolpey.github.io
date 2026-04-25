# PCB Portfolio — Fork & Customization Guide
### Based on Hamish Williams' Portfolio — REV A · 2026-04-25

---

## Step 0 — The Repo to Fork

```
https://github.com/HamishMW/portfolio
```

- ⭐ 3.4k stars · 715 forks · MIT license
- Live demo: https://hamishw.com
- Components storybook: https://storybook.hamishw.com

---

## Step 1 — Prerequisites

Make sure you have the following installed before cloning:

- **Node.js** `19.9.0` or higher
- **npm** `9.6.3` or higher

Check your versions:

```bash
node -v
npm -v
```

---

## Step 2 — Clone & Install

```bash
git clone https://github.com/HamishMW/portfolio.git
cd portfolio
npm install
```

---

## Step 3 — Run Locally

```bash
npm run dev
```

To view the component storybook:

```bash
npm run dev:storybook
```

---

## Step 4 — Understand the Stack

This is **not** a plain React + Vite app. Know what you're working with:

| Layer | Technology |
|---|---|
| Framework | **Remix** (full-stack, SSR) |
| 3D / Hero background | **Three.js** + **GLSL shaders** |
| Animations | **Framer Motion** |
| Styling | **CSS custom properties** (no Tailwind) |
| Deployment (original) | **Cloudflare Pages** (not GitHub Pages) |

> ⚠ **GitHub Pages note:** Hamish deploys to Cloudflare Pages, not GitHub Pages.
> To use GitHub Pages you'll need to add a static export step, or switch to
> Cloudflare Pages free tier (recommended — better performance, easier setup).

---

## Step 5 — File Map (what to touch)

```
portfolio/
├── app/
│   ├── styles/
│   │   └── theme.css           ← START HERE — all color variables
│   ├── components/
│   │   └── displacement-sphere ← Replace with PCB SVG hero art
│   ├── routes/
│   │   └── home/               ← Main page layout and sections
│   └── layouts/
│       └── navbar/             ← Navigation links
├── public/
│   └── favicon.svg             ← Replace with your own logo/initials
└── package.json
```

---

## Step 6 — First Thing to Change: Color Palette

Open `app/styles/theme.css` and replace Hamish's accent colors with the PCB palette below.

### PCB Color Variables (add/replace in theme.css)

```css
:root {
  /* --- PCB Layer Tints (backgrounds) --- */
  --pcb-l1-bg: #FDF8F8;        /* Top Copper — very light red tint */
  --pcb-l2-bg: #F8FDF9;        /* Solder Mask — very light green tint */
  --pcb-l3-bg: #FAF8FD;        /* Inner Copper — very light purple tint */
  --pcb-l4-bg: #F7F9FD;        /* Bottom Copper — very light blue tint */
  --pcb-l5-bg: #FDFBF0;        /* Silkscreen — very light yellow tint */

  /* --- PCB Trace Colors (SVG strokes, accents) --- */
  --pcb-l1-trace: rgba(184, 58, 46, 0.20);   /* Red — Top Copper */
  --pcb-l2-trace: rgba(42, 112, 72, 0.18);   /* Green — Solder Mask */
  --pcb-l3-trace: rgba(123, 94, 167, 0.18);  /* Purple — Inner Copper */
  --pcb-l4-trace: rgba(30, 79, 154, 0.18);   /* Blue — Bottom Copper */
  --pcb-l5-trace: rgba(160, 122, 16, 0.22);  /* Amber — Silkscreen */

  /* --- PCB Solid Layer Colors (for layer indicator panel) --- */
  --pcb-red:    #b83a2e;
  --pcb-green:  #2a7048;
  --pcb-purple: #7b5ea7;
  --pcb-blue:   #1e4f9a;
  --pcb-amber:  #a07a10;

  /* --- Base / Structural --- */
  --pcb-board-dark: #0d1117;   /* FR4 board dark background */
  --pcb-board-mid:  #1a1a1a;   /* Section backgrounds */
  --pcb-copper:     #c87533;   /* Copper color for accents */
  --pcb-gold:       #c8a020;   /* Gold/ENIG finish color */
  --pcb-silkscreen: #f5f0dc;   /* Silkscreen white/cream */

  /* --- Typography --- */
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
}
```

> 💡 Swapping just these variables will immediately shift the whole site's
> feel. Do this first to validate the aesthetic before touching any layout.

---

## Step 7 — Replace the Hero (Displacement Sphere → PCB Art)

Hamish's hero uses a Three.js GLSL displacement sphere (`app/components/displacement-sphere`).

**Replace it with one of these options (easiest to hardest):**

### Option A — SVG PCB Board Outline (recommended to start)
- Export a board outline SVG from KiCad (File → Plot → SVG)
- Drop it into `public/` as `pcb-board.svg`
- Reference it in the hero component as a static `<img>` or inline `<svg>`
- Animate with Framer Motion: traces draw in on load using `strokeDashoffset`

### Option B — Animated SVG Traces (Phase 2)
- Hand-craft or generate an SVG with orthogonal traces
- Animate using CSS `stroke-dasharray` / `stroke-dashoffset` draw-on effect
- Add circular via dots at trace intersections

### Option C — Keep the sphere, reskin it (quickest)
- Edit the GLSL fragment shader color to copper/amber tones
- See: https://github.com/HamishMW/portfolio/issues/19#issuecomment-870996615
- This buys you time while you build the proper PCB art

---

## Step 8 — Navigation Links

In `app/layouts/navbar/` change Hamish's nav links to your layer structure:

| Hamish's link | Your link |
|---|---|
| Projects | Identity |
| Details | Academic |
| Articles | Experience |
| Contact | Contact |

Or use the layer numbers as nav labels: **L1 · L2 · L3 · L4**

---

## Step 9 — Content Sections to Replace

Work through these in order — each maps to one of your PCB layers:

| File/Route | Replace with |
|---|---|
| `app/routes/home/` hero | Your name, tagline, PCB board art |
| `app/routes/home/` intro | About you — L1 Identity content |
| Project 01, 02, 03 cards | Your academic papers and projects — L2 |
| Details / About section | Work experience and skills — L3 |
| Contact page | Your contact info, BOM table style — L5 |

---

## Step 10 — Deployment Options

### Option A: Cloudflare Pages (recommended)
Hamish's setup works out of the box. Free tier is generous.

```bash
npm run deploy
```

Point your custom domain `rasoolpeykarporsan.me` to Cloudflare Pages in your
DNS settings (add a CNAME record).

### Option B: GitHub Pages (requires extra step)
Install the static adapter:

```bash
npm install @remix-run/serve
```

Add a build script that outputs to `/dist`, then push `/dist` to your
`gh-pages` branch. Configure GitHub Pages to serve from that branch.

> ⚠ Cloudflare Pages is simpler and faster for a Remix app. Strongly recommended
> over GitHub Pages for this stack.

---

## What to Keep vs. Replace — Summary

| Element | Action |
|---|---|
| Displacement sphere (Three.js blob) | **Replace** → PCB board SVG art |
| Dark background (`#111`) | **Keep** — use `--pcb-board-dark` |
| Accent color (cyan) | **Replace** → copper/gold `--pcb-copper` |
| Framer Motion scroll transitions | **Keep** — just restyle |
| Monospace typography | **Keep** — perfect for EDA/datasheet feel |
| Project card layout | **Reskin** → Gerber viewer aesthetic |
| Contact form | **Keep structure** → restyle as BOM table |
| Storybook component library | **Keep** — useful for building new components |

---

## Build Phases (reminder)

| Phase | Goal |
|---|---|
| **Phase 1** | Fork, install, swap colors, run locally — validate aesthetic |
| **Phase 2** | Replace sphere with PCB SVG art, add trace animations, reskin cards |
| **Phase 3** | Drop in your real content, deploy to rasoolpeykarporsan.me |

---

## Useful Links

| Resource | URL |
|---|---|
| Repo to fork | https://github.com/HamishMW/portfolio |
| Live demo | https://hamishw.com |
| Storybook | https://storybook.hamishw.com |
| Fragment shader issue (color change) | https://github.com/HamishMW/portfolio/issues/19#issuecomment-870996615 |
| Remix docs | https://remix.run/docs |
| Framer Motion docs | https://www.framer.com/motion |
| tscircuit PCB viewer (React) | https://github.com/tscircuit/pcb-viewer |
| KiCad SVG export guide | https://docs.kicad.org/8.0/en/pcbnew/pcbnew.html#plot |
| Master plan doc | pcb_portfolio_master_plan.md |

---

*// END OF GUIDE — rasoolpeykarporsan.me — REV A — 2026-04-25*
