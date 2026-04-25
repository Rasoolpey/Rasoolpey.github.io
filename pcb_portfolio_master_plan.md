# PCB Portfolio Master Plan
### rasoolpeykarporsan.me — REV A · 2026-04-25

---

## Overview

A portfolio website themed as a **multi-layer PCB**, where each section of the site corresponds to one copper layer. Scrolling through the site triggers a **90° board rotation** revealing the cross-section edge, then flips flat into the next layer's top view. Each layer has a distinct ultra-subtle background tint and SVG traces routing between content blocks like real signal paths.

**Owner:** Rasool Peykarporsan  
**URL:** rasoolpeykarporsan.me  
**Source:** github.com/Rasoolpey/Rasoolpey.github.io  
**Goal:** Job hunting — impress recruiters and employers  
**Tech stack:** Plain HTML + CSS + JavaScript (GitHub Pages)

---

## Design Principles

- **Color:** Ultra-subtle tints only — background shifts ~3–4% from white. Layer identity comes from trace color + the cross-section flash during transition, not from bold backgrounds.
- **Traces:** SVG traces route between content blocks at 18–25% opacity. All corners are strictly 90° or 45°. Traces start/end with filled circular pads. Vias appear where traces would connect layers.
- **Typography:** Monospace font for labels, reference designators, and technical text. Clean sans-serif for body content.
- **Interaction:** Click to expand inline — no page navigation for detail views.
- **Layer indicator:** Persistent side panel (like an EDA layer panel) showing all layers as colored bars, highlighting the current one. Clickable to jump.

---

## Transition Mechanic

**Trigger:** User scrolls to the end of a section.

1. Current top-view layer fades + board rotates **90° on X-axis** (CSS 3D perspective driven by GSAP ScrollTrigger pin)
2. Cross-section edge view is briefly visible — thin colored bands representing each layer
3. Camera zooms into the edge, centering on the next layer's color band
4. Board rotates back **90° to flat** — now showing next layer's top view with new subtle tint + new SVG trace pattern

**Duration:** ~1.2s total, scrub-tied to scroll wheel so it feels physical.

---

## PCB Color System

| Layer | PCB Name | Background Tint | Trace Color |
|---|---|---|---|
| L1 | Top Copper | `#FDF8F8` | `rgba(184, 58, 46, 0.20)` |
| L2 | Solder Mask | `#F8FDF9` | `rgba(42, 112, 72, 0.18)` |
| L3 | Inner Copper | `#FAF8FD` | `rgba(123, 94, 167, 0.18)` |
| L4 | Bottom Copper | `#F7F9FD` | `rgba(30, 79, 154, 0.18)` |
| L5 | Silkscreen | `#FDFBF0` | `rgba(160, 122, 16, 0.22)` |

---

## PCB Trace Decoration Rules

Mimics real PCB EDA signal routing:

- All corners strictly **90° or 45°** only — no curves
- Traces start and end with **filled circular pads** (via symbol)
- **Vias** (small drilled circles: 6–8px outer, 3px inner hole) appear where traces cross layers
- Traces run between content blocks as if routing signals between components
- **Trace width:** 1.5–2px stroke, same hue family as the layer tint
- **Trace opacity:** 18–25% — present as texture, never distracting
- Reference designator labels (R1, C2, U3…) used as decorative flavor text near components

---

## Layer Architecture

---

### L1 — Identity & Contact
**PCB Layer:** Top Copper (Red tint)  
**Purpose:** First impression — who you are and how to reach you

#### Components

**Full name + title wordmark** *(static)*
- Large typographic treatment of "Rasool Peykarporsan"
- Subtitle: Electrical Engineer + specialization
- Entry animation: traces draw in around your name like autorouter completing

**One-line professional tagline** *(static)*
- One sentence capturing your angle — what makes you specifically interesting
- ⚠ **TO DO:** Write this before Phase 3 — it's the most important sentence on the site

**Profile photo** *(static)*
- Styled as a PCB component footprint — circular mask with pad ring around it
- Optional: B&W or slightly desaturated to match the PCB aesthetic

**Contact links** *(clickable icons)*
- Email, LinkedIn, GitHub — styled as a connector pinout diagram
- Labels: PIN 1 = Email · PIN 2 = LinkedIn · PIN 3 = GitHub · PIN 4 = Resume PDF

**Location + availability status** *(static)*
- City/country, open to relocation yes/no
- "Available for: Full-time / Internship / Freelance" as a component status flag

**Layer navigation panel** *(persistent UI across all layers)*
- Side panel showing all 5 layers as colored bars
- Highlights current layer, click to jump to any layer

---

### L2 — Academic Background
**PCB Layer:** Solder Mask (Green tint)  
**Purpose:** Education, publications, academic projects, titles held

#### Components

**Education timeline** *(static)*
- Degree(s), university, years — formatted as a PCB revision table
- Thesis title listed here with link to expand

**Thesis** *(expandable on click)*
- Title, abstract (2–3 sentences), supervisor, year
- Key findings as bullet points
- Download PDF link
- Any related publications linked

**Published papers** *(each expandable on click)*
- Paper title, journal/conference, year, co-authors
- Abstract visible on expand
- DOI / link to full paper
- Styled as a component datasheet card on expand

**Academic projects** *(each expandable on click)*
- Project name, course/context, year
- What you built, what you learned
- Photos, schematics, or GitHub link if available

**Academic titles & roles** *(static)*
- Teaching assistant, lab demonstrator, student society roles, etc.
- Formatted as an "approval history" list with dates

**Skills & Toolchain block** *(static or expandable)*
- ⚠ **OPEN QUESTION:** Skills need a home — either here (L2) or top of L3, or both
- Group by domain: EDA tools, programming languages, lab equipment, simulation software
- Trace weight = proficiency level (thicker = stronger skill)
- Layout: compact grid of labeled pads — each pad = one skill

---

### L3 — Professional Experience
**PCB Layer:** Inner Copper (Purple tint)  
**Purpose:** Jobs, internships, industry projects, working experience

#### Components

**Work history timeline** *(static)*
- Each role = a connector symbol on the PCB (symbol + label)
- Company, title, dates, location
- Reverse chronological, connected by a routed trace path

**Each role** *(expandable on click)*
- 3–5 bullet point achievements per role
- Technologies used (formatted as component specifications)
- Key deliverables

**Industry / professional projects** *(each expandable on click)*
- Project name, employer context, your role
- Technical details: what you designed, built, tested
- Outcomes and measurable impact
- NDA-safe description if needed

---

### L4 — Honors, References & Personal
**PCB Layer:** Bottom Copper (Blue tint)  
**Purpose:** Awards, recognitions, references, the human behind the engineer

#### Components

**Honors & awards** *(each expandable on click)*
- Award name, issuing body, year, brief context
- Focus: academic — dean's list, scholarships, prizes, certifications

**References** *(listed publicly, contact on request)*
- Show names + titles only (Professor X — Supervisor, Dr Y — Manager)
- Contact details available on request — link to email
- ⚠ **TO DO:** Decide whether to name references publicly or use "available on request"

**Hobbies** *(expandable per item)*
- Personal and human — show the person behind the engineer
- Each hobby as a small card: PCB component symbol style icon + 2–3 sentence description
- Be genuine — this is where personality lands with recruiters

**Languages spoken** *(static)*
- Formatted as a "communication interfaces" block — like a connector pinout
- Example: PIN 1 = Farsi (native) · PIN 2 = English (professional)

---

### L5 — Silkscreen Overlay (Footer)
**PCB Layer:** Silkscreen / Top Overlay (Yellow-white tint)  
**Purpose:** The "bottom of the board" — all the fine detail, contact footer

#### Components

**Bill of Materials contact block** *(static)*
- Formatted as a real BOM table: REF · DESCRIPTION · VALUE
- REF C1 = Email · REF C2 = LinkedIn · REF C3 = GitHub · REF C4 = Resume PDF

**PCB title block** *(static)*
- Bottom-right corner — standard PCB title block format
- Fields: DESIGNED BY / TITLE / REV / DATE
- Filled with: Rasool Peykarporsan / Portfolio / REV A / 2026

**Resume download** *(button)*
- Styled as a test point or programming header
- Label: "Download Gerbers" — but downloads your resume PDF

**Copyright + flavor text** *(static)*
- Simple one-liner
- Optional flavor: "Designed with KiCad & caffeine"

---

## Open Questions (resolve before Phase 3)

| # | Question | Impact |
|---|---|---|
| 1 | What is your engineering specialization? | L1 tagline, L2/L3 framing |
| 2 | Where do Skills live — L2, L3, or both? | Layout of two full layers |
| 3 | References — named publicly or "on request"? | L4 layout |
| 4 | Hobbies — which ones? How many? | L4 real estate |

---

## Build Phases

### Phase 1 — Mechanics
**Goal:** Scroll engine + layer transition working with placeholder content

- Set up project file structure (HTML / CSS / JS)
- Integrate GSAP + ScrollTrigger + Lenis
- Create 5 placeholder section divs with correct background tints
- Build the **90° board rotation transition** between layers
- Test scroll-scrub and snap behavior between layers
- Build persistent layer navigation side panel
- No real content yet — all lorem ipsum / placeholder

### Phase 2 — Visual Identity
**Goal:** PCB trace system + layer aesthetics

- Build the SVG trace-routing module
- Each section gets its own trace layout connecting content headings
- Add vias, pads, reference designators as decorative text
- Refine color tints across all layers
- Style expandable component cards (datasheet aesthetic)
- Export actual PCB SVGs from KiCad as background art on project cards (optional)
- Profile photo with PCB footprint mask treatment

### Phase 3 — Content
**Goal:** Real information, final polish, deploy

- Fill in all content: bio, papers, projects, roles, awards, hobbies, contact
- Fine-tune typography and spacing
- Add silkscreen-style flavor text (reference designators, part numbers)
- QA on all expandable interactions
- Test on mobile (decide: full experience or simplified mobile layout?)
- Deploy to rasoolpeykarporsan.me via GitHub Pages

---

## File Structure (Phase 1 Target)

```
/
├── index.html
├── css/
│   ├── reset.css
│   ├── base.css          ← typography, colors, CSS variables
│   ├── layers.css        ← per-layer tints and trace colors
│   └── transitions.css   ← 3D rotation, GSAP targets
├── js/
│   ├── main.js           ← GSAP init, Lenis, ScrollTrigger setup
│   ├── transition.js     ← 90° rotation mechanic
│   ├── traces.js         ← SVG trace generator per layer
│   └── expand.js         ← click-to-expand interaction
├── assets/
│   ├── img/              ← profile photo, project images
│   └── pdf/              ← resume, papers
└── svg/
    ├── traces-l1.svg
    ├── traces-l2.svg
    ├── traces-l3.svg
    ├── traces-l4.svg
    └── traces-l5.svg
```

---

## Reference: PCB Layer Color Meanings

| PCB Color | Real Meaning | Portfolio Meaning |
|---|---|---|
| Red | Top copper traces | Identity — the visible face |
| Green | Solder mask (protective) | Academic — foundation layer |
| Purple | Inner signal layer | Professional — the hidden working layer |
| Blue | Bottom copper | Recognition & personal — the underside |
| Yellow/White | Silkscreen overlay | Fine detail — labels and contact |

---

*// END OF PLAN — rasoolpeykarporsan.me — REV A — 2026-04-25*
