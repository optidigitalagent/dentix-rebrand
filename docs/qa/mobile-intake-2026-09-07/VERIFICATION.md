# Patient form verification — 2026-09-07

Canonical source: feature/dentix-booking-crm, implementation d129b02 + ccb3714.
No patient candidate deployment or live request was performed by this isolated browser suite.

- Build:pages, scoped ESLint and TypeScript --noEmit passed. Existing public unit suite: 13/13.
- Chromium full flow passed 360/375/390/393/412/430 portrait, 844x390 landscape and 768/1024/1440 tablet/desktop.
- WebKit full flow passed all six portrait widths plus 844x390 landscape and 768/1024/1440 tablet/desktop. The four resumed viewports are recorded in browser-fixtures-webkit-remaining.json; the original first six PASS results were reported by the full matrix runner before its strict scroll-reference assertion was corrected.
- Full flow: default/focus/filled/error editable field fonts, Ukrainian ordinary names, tel/select/textarea/date/consent, 422, failed network then durable fixture success, all timed steps, 409 returns to slot selection, retry, close/reopen, body style restoration and base-scale overflow.
- Focused 390px on both engines additionally passed Price page, menu → booking → close, policy-unavailable fallback, and local visualViewport adapter simulation. See browser-focused390.json.
- Independent viewport test on both engines simulated a 300px visual viewport and confirmed 300px dialog, visible close control, positive 211px scroll body and access to its bottom. Screenshot names explicitly contain simulated-keyboard300.
- Chromium CDP intentional page scale was 2 before focus/input/blur and remained 2 afterward. No application scale reset. WebKit scale gating was simulated; no claim of native WebKit pinch gesture coverage.
- Footer visibility hides the floating call CTA; focus in patient fields and an open booking dialog hide it through scoped CSS.

No physical iPhone, Android device or Telegram in-app keyboard was exercised. Autofill/native picker interaction beyond browser emulation and actual OS keyboard Done remain physical-device verification pending. Font size is applied before focus to the same controls, so it does not depend on autofill or focus styling.

A first WebKit landscape test compared scroll before Playwright's click with scroll after closing. The click itself adjusted the page by 3px before opening. The corrected assertion compares against the body's captured opening scroll, matching the restoration contract; no product scroll workaround was added for this test.

Owner device check: open Home or Price at your preferred scale; focus name, phone and comment, switch fields, tap keyboard Done; open booking/fallback, scroll to consent and buttons, close and reopen. Repeat after deliberate pinch zoom. Record visualViewport scale before/during/after when available. Expected: no unsolicited magnification, all controls reachable, preferred zoom retained and closing returns to the same page position.
