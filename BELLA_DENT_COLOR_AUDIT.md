# BELLA_DENT_COLOR_AUDIT

Источник: `https://belladentclinik.kr.ua/`  
Метод: Chrome browser audit, computed styles + фактические CSS custom properties, 17 августа 2026.

| ROLE | BELLA SOURCE ELEMENT | COMPUTED COLOR | DENTIX TARGET ROLE |
|---|---|---|---|
| Primary background | `body`, ivory sections | `rgb(251, 247, 241)` / `#FBF7F1` | `--bg-primary`, основной фон |
| Secondary background | alternate sections (`#about`, `#doctors`, `#reviews`) | `rgb(244, 237, 227)` / `#F4EDE3` | `--bg-secondary`, чередующиеся секции |
| Header surface | fixed `header` | `rgb(246, 239, 230)` / `#F6EFE6` | `--bg-header`, Header и mobile menu |
| Card / surface | `.service-card`, inputs | `rgb(255, 255, 255)` / `#FFFFFF` | `--surface`, карточки и панели |
| Soft surface | `.cert-img-wrap` | `rgb(253, 250, 246)` / `#FDFAF6` | `--surface-soft`, вложенные поверхности |
| Primary text | `body`, headings, cards | `rgb(31, 26, 22)` / `#1F1A16` | `--text-primary`, основной текст |
| Secondary text | `.service-desc` | `rgb(111, 98, 88)` / `#6F6258` | `--text-secondary`, абзацы и helper text |
| Secondary strong | `.brand-subtitle` CSS | `#7A6252` | `--text-secondary-strong`, малый читаемый текст |
| Gold accent | `.section-label`, `.btn-primary`, SVG accents | `rgb(196, 154, 85)` / `#C49A55` | `--accent`, кнопки, линии, иконки, active details |
| Light gold | `--gold-light` | `#D0A96A` | `--accent-light`, акцент на тёмных поверхностях |
| Deep gold | `.btn-primary:hover`, `--gold-dark` | `#B88A44` | `--accent-deep`, hover/focus |
| Header gold | `.btn-header` border/hover | `rgb(176, 138, 74)` / `#B08A4A` | `--accent-header`, Header CTA |
| Border / divider | cards, inputs, contact rows | `rgba(196, 154, 85, 0.08–0.50)` | `--border-*`, границы по уровню акцента |
| Primary button | `.btn-primary` | bg `#C49A55`, text `#1F1A16` | gold fill + dark text |
| Primary button hover | `.btn-primary:hover` | bg `#B88A44`, text `#1F1A16` | deep-gold hover + dark text |
| Secondary button | `.btn-secondary` | transparent, text `#FBF7F1`, border `rgba(251,247,241,.4)` | outline button на image/dark surfaces |
| Header | `header`, `.btn-header` | bg `#F6EFE6`, text `#1F1A16`, border `rgba(176,138,74,.22)` | светлый Header с тёмной навигацией |
| Footer | `footer` | bg `#15100B`, text `rgba(251,247,241,.75)`, accent `#C49A55` | `--dark-surface`, on-dark text, gold details |
| Dark panel | `.menu-panel` | `rgb(21, 16, 11)` / `#15100B` | lightbox/footer dark surface |
| Image overlay | `.menu-overlay` + hero CSS | `rgba(31,26,22,.60)`; hero `rgba(15,10,5,.80)` | neutral brown/black image overlays |

## Semantic mapping

- Page rhythm: ivory `#FBF7F1` ↔ cream `#F4EDE3` ↔ white cards `#FFFFFF`.
- Text: `#1F1A16` primary, `#6F6258` secondary; gold is not used for body copy.
- Accent: `#C49A55`; hover/focus uses `#B88A44`; Header CTA uses Bella's `#B08A4A`.
- Dark surfaces: `#15100B` with `#FBF7F1` / alpha variants and gold details.
- Border hierarchy uses the exact Bella gold channel `196,154,85` with reference alpha levels.
