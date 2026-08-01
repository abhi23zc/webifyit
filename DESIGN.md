# Formwork — Design System

A light-theme, "blueprint / drafting" visual identity for a web & app design-development studio. Built as an alternative to the two AI-default light looks (warm cream + serif, or broadsheet newspaper), grounded instead in the vernacular of technical drawing — the actual craft of the subject.

---

## 1. Concept

**Subject:** A studio that designs *and* builds digital products — the bridge between a sketch and shipped software.
**Idea:** Borrow from architectural/engineering blueprints and drafting tables — paper-white backgrounds, ink-navy line work, a single "red pen" accent used the way a drafter marks a correction or a reviewer marks a PR.
**Signature element:** Corner crosshair marks (`⌐ ⌐` / `⌐ ⌐`) on cards and panels, like registration marks on a technical drawing — reinforcing "precision" without decoration. Paired with a hero visual of a browser window whose wireframe **draws itself on load** (SVG stroke animation), as if a blueprint is being drafted in real time.

---

## 2. Color

| Token | Hex | Role |
|---|---|---|
| `--bg` | `#F5F6F1` | Page background — cool paper white (not cream) |
| `--surface` | `#FFFFFF` | Cards, panels, browser chrome |
| `--ink` | `#12151B` | Primary text, headlines, dark surfaces |
| `--ink-soft` | `#585D67` | Body copy, secondary text |
| `--ink-faint` | `#8A8E96` | Captions, labels, disabled states |
| `--accent` | `#FF4B23` | CTAs, hover states, "marker" highlights |
| `--blue` | `#1F3D8C` | Data viz, charts, blueprint line work |
| `--line` | `#DCDDD6` | Hairline borders, dividers |
| `--line-strong` | `#C7C9C0` | Card borders, crosshair marks |

**Why:** Avoids the common AI-default palettes (`#F4F1EA` cream + terracotta `#D97757`). The cooler, greyer paper tone plus a true red-orange (not clay/terracotta) and a technical blue keep it reading as "drafting table," not "editorial blog."

---

## 3. Typography

| Role | Typeface | Usage |
|---|---|---|
| Display | **Space Grotesk** (600/700) | H1–H3, logo, price numbers — geometric, slightly technical |
| Body | **IBM Plex Sans** (400/500) | Paragraphs, nav, buttons |
| Utility/mono | **IBM Plex Mono** (400/500) | Eyebrows, labels, tags, section numbers (`FIG. 01`), URLs |

Type scale: H1 `clamp(40–68px)`, H2 `clamp(30–44px)`, H3 `20–28px`, body `14.5–18px`, mono labels `11–13px` with `0.03–0.04em` tracking.

**Why mono labels:** Section eyebrows read like drawing annotations ("FIG. 01 — DISCOVERY") rather than generic marketing eyebrows — structure that encodes real information (this *is* a numbered, ordered process) rather than decorative numbering.

---

## 4. Layout

```
┌────────────────────────────────────────────┐
│ Sticky nav — logo · links · CTA            │
├────────────────────────────────────────────┤
│ HERO                                       │
│ [eyebrow]                 ┌──────────────┐ │
│ Headline (2 lines)        │ browser mock │ │
│ Lead paragraph            │ self-drawing │ │
│ [CTA] [CTA]                │ blueprint    │ │
│ stat · stat · stat        └──────────────┘ │
├────────────────────────────────────────────┤
│ Logo marquee (infinite scroll)             │
├────────────────────────────────────────────┤
│ FIG.01 CAPABILITIES — 2×2 card grid        │
│ (each card: number, copy, mini data widget)│
├────────────────────────────────────────────┤
│ FIG.02 PROCESS — 4 alternating rows        │
│ visual | text  ⇄  text | visual            │
├────────────────────────────────────────────┤
│ FIG.03 TESTIMONIALS — 3-col grid           │
├────────────────────────────────────────────┤
│ FIG.04 PRICING — 3 tiers, center featured  │
├────────────────────────────────────────────┤
│ FIG.05 FAQ — single-column accordion       │
├────────────────────────────────────────────┤
│ Dark full-bleed closing CTA (grid texture) │
├────────────────────────────────────────────┤
│ Footer — brand · studio · company · social │
└────────────────────────────────────────────┘
```

Container width: `1180px` max, `32px` side padding (`20px` on mobile). Grid-based card sections use `1px` gaps on a `--line` background to fake hairline dividers between cards without doubled borders.

---

## 5. Motion

| Moment | Treatment |
|---|---|
| Page load (hero) | SVG blueprint wireframe draws itself via `stroke-dasharray`/`dashoffset`, staggered ~150ms per shape; two floating status chips fade in with a slow bob |
| Scroll reveal | `IntersectionObserver` adds `.is-visible`; elements fade + rise 24px over 0.8s, staggered by section (`reveal-d1..d4`) |
| Data widgets | Progress bars animate width from 0 → target only once in view; mini line charts draw in via stroke animation |
| Hover | Buttons lift 2px and swap to accent color; cards lift 6px with a soft shadow; nav links get an underline wipe |
| Logo strip | Continuous 32s linear marquee, masked at edges |
| FAQ | Accordion expands via `max-height` transition, one open at a time |
| Reduced motion | All transitions/animations disabled via `prefers-reduced-motion` media query |

**Principle followed:** one orchestrated moment (the hero draw-in) carries the "wow," everything else is quiet, consistent scroll-reveal — not scattered effects on every element.

---

## 6. Content voice

- Headlines describe outcomes ("Design and build products that ship"), not the studio's internal process.
- Process copy is written from the client's side of the table: what they get at each stage, not how the studio is organized internally.
- Numbered lists (`01/02/03`) are only used where order is real: the 4-stage process and FAQ figure numbers — not applied decoratively to the capability cards, which are parallel/unordered (hence lettered by name, not number-ranked).

---

## 7. Component notes (for reuse/editing)

- **`.xmark`** — apply to any card that should carry the corner-crosshair signature; uses `::before`/`::after` with two border edges each.
- **`.widget`** — generic small data panel (progress rows, checklists) reused across capability cards and process visuals; swap `--fill` custom property per bar.
- **`.price-card.featured`** — inverts to `--ink` background for the recommended tier; all child text tokens have `.featured`-scoped overrides.
- All interactive elements have visible focus via default browser outline (not suppressed) — keep this if extending the CSS.

---

## 8. What to customize for a real launch

- Swap placeholder studio name "Formwork," client names, and testimonial quotes for real ones.
- Replace the CSS-drawn browser mockup with an actual product screenshot if you have one — the drafting animation works well as an *intro* even with a real image underneath.
- Confirm pricing tier names/numbers with actual rate card.
- Add real social/legal links in the footer.
