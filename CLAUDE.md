# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **static personal portfolio website** for Diego Tascon (Data Analyst). There is no build step — the site is pure HTML/CSS/JS served directly.

## Development

**Run locally**: Open `index.html` in a browser, or use the VSCode Live Server extension on port `5501` (configured in `.vscode/settings.json`).

No package manager, bundler, linter, or test suite exists.

## Architecture

The entire site lives in three files:

- **`index.html`** — Single HTML file containing all sections and content
- **`style.css`** — All styling; uses CSS custom properties for theming (no preprocessor)
- **`script.js`** — All interactivity; vanilla JS plus library initialization

### Key Design Patterns

**Bilingual support (ES/EN)**: Default language is Spanish (`currentLang = "es"`). Content duplication via `data-es` and `data-en` attributes on elements. The language toggle in `script.js` swaps text site-wide; elements with class `.header-title-sub` get a typewriter animation on switch. If the attribute value contains `<`, `innerHTML` is used instead of `textContent`.

**Scroll animations**: AOS (Animate On Scroll) v2.3.1 initialized globally. Add `data-aos="fade-up"` (or other variants) to elements to animate them on scroll.

**Section layout**: All sections use the `.page-section` class with `overflow-x: hidden` to prevent horizontal scroll bleed from AOS animations.

**Tab systems**: Skills, Certifications, and Featured Projects each use a Bootstrap tab pattern (`nav-tabs` / `tab-pane`) with custom JS to handle carousel resets on tab switch.

**Stats bar counters**: Animated on first scroll-into-view using `IntersectionObserver`. Counter targets are set via `data-target` attribute.

**Navbar active section**: Tracked on scroll using `updateActiveNavLink()`. Active link gets the `.active-section` class (not Bootstrap's `.active`).

**Deployment**: The site is deployed at `https://diegotascon94.github.io`. Update canonical URL, OG tags, and JSON-LD `url` field in `<head>` when changing the deployment domain.

### CSS Variables (Theming)

Defined in `:root` in `style.css`:
- `--color-principal`: `#0F172A` — dark navy (primary dark)
- `--color-secundario`: `#2563EB` — blue accent (CTAs, highlights)
- `--color-fondo`: `#F8FAFC` — light background
- `--color-texto`: `#1F2937` — body text
- `--color-acento`: `#94A3B8` — muted slate accent

### External Libraries (CDN)

- Bootstrap 5.2.3 (grid, components)
- Bootstrap Icons 1.11.0
- AOS 2.3.1 (scroll animations)
- tsParticles (hero background particle effect)
- Google Fonts: Merriweather, Merriweather Sans

### Asset Layout

```
/assets/img/          — project and section images
/*.png                — profile photo, favicon
/*.pdf                — CV download
/video.mp4            — hero or project video asset
```
