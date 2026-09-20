# Scent Atlas

> Don't just search for a perfume. Explore the world of fragrance and find your scent.

Scent Atlas is an interactive fragrance discovery platform (MVP). Instead of requiring a perfume or brand name up front, users start from what they want to smell or feel — notes, fragrance family, mood, season, time of day, occasion, style — and discover matching perfumes.

Built from `Scent_Atlas_PRD.md` as the initial working version covering the PRD's five MVP experiences: discovery, search, filtering, detailed profiles, and saving/comparing.

## Purpose

The fragrance market is fragmented across brand sites, retailers, blogs, and reviews. Users often know the experience they want ("warm vanilla for a summer evening", "woody but not too masculine", "vanilla + sandalwood + musk") without knowing which perfume delivers it. Scent Atlas turns structured fragrance data into an intuitive discovery flow:

> "I know what kind of fragrance I want" → "I found perfumes that match."

## Main features

- **Discover** (`#/discover`): hero entry point, discovery prompts (e.g. "Explore Vanilla", "Date Night"), featured, recently added, and seasonal (Autumn) picks.
- **Search** (`#/search`): free-text search across names, brands, notes, families, moods, occasions, and styles; multi-note search (e.g. Vanilla + Sandalwood + Musk); combinable filters for family, season, time of day, occasion, mood, style; best-match / newest / A–Z sorting with match reasons.
- **Explore** (`#/explore`): browse tiles for families, notes, moods, occasions, seasons, and times of day — each jumps into a pre-filtered search.
- **Fragrance profiles** (`#/fragrance/:id`): header (brand, year, type, gender), olfactory profile (family, accords, top/heart/base notes), context (mood, season, time, occasion, style), similar fragrances, more from the same house, Save / Compare actions.
- **Compare** (`#/compare`): side-by-side table (family, notes, mood, season, occasion, time, style) for 2–4 fragrances with shared values highlighted.
- **Saved** (`#/saved`): wishlist persisted in `localStorage` between sessions.
- **Seed database**: 18 structured records (designer, niche, indie, emerging houses) following PRD §9, extensible to thousands.
- Responsive, mobile-first, no dependencies.

## How to run

No build step. Any static server works (required for hash routing to behave consistently; opening `index.html` directly also works in most browsers).

```powershell
# from this folder
python -m http.server 8000
# then open http://localhost:8000
```

Or with Node:

```powershell
npx serve .
```

## Project structure

| File | Purpose |
|---|---|
| `index.html` | App shell, navigation, view container |
| `styles.css` | Elegant responsive styling |
| `data.js` | `FRAGRANCES` seed database (PRD §9 schema + `featured`, `added_rank`, `hue`) |
| `app.js` | Vanilla-SPA: routing, search/scoring (PRD §10), profile, similar, compare, saved |
| `Scent_Atlas_PRD.md` | Source requirements |
| `README.md` | This file |

## Try these journeys (PRD §7)

1. **Note search**: Search → select `Vanilla` + `Sandalwood` + `Musk` → `Vanilla Noir` surfaces first.
2. **Context search**: Search → `Summer` + `Evening` + `Date Night`, or open the "Date Night" prompt from Discover.
3. **Compare**: open any two profiles → Add to compare → `Compare now` → side-by-side table.
4. **Save**: save a fragrance → reopen the app later → still in Saved.

## Notes / out of scope

MVP only: no purchasing, pricing, e-commerce, reviews, accounts, AI recommendations, or native apps (per PRD §18). Saved/compare state is per-browser `localStorage`.
