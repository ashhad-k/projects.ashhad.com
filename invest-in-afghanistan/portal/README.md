# Investor & Business Portal — prototype

The signed-in half of the Invest in Afghanistan site: a **front-end prototype**
of the account area where an investor or a business owner onboards, applies for
licences and services, pays, tracks progress and holds a verifiable digital
licence.

**Nothing talks to a backend.** Every page runs on mock data held in the inlined
scripts. No payment is taken and no credential is stored. It is a clickable
demonstration for the backend/API team to build against.

**Start here:** open `login.html` (the site's **Portal** button links to it).
Sign-in, OTP and identity checks are simulated — the demo accounts are pre-filled,
so just click through.

---

## Two account types

The prototype models two roles. Pages are prefixed by role:

* **`b-…` — Business account.** A company that starts/manages a business: trade
  licences, trade names, trademarks, company records, renewals.
* **`i-…` — Investor account.** An investor evaluating and pursuing projects:
  opportunities, shortlists, requests, plus the shared account tooling.

Shared, un-prefixed pages (login, onboarding, notifications, verify…) serve both.

---

## Page map

**Entry & auth**
`login.html` · `create-account.html` · `forgot.html` · `reset.html` ·
`verify.html` (OTP / identity) · `verify-licence.html`

**Onboarding flow**
`onboarding.html` → `onboarding-profile.html` → `onboarding-preferences.html` →
`onboarding-documents.html` → `onboarding-done.html`

**Business (`b-`)**
`b-dashboard` · `b-applications` · `b-application` · `b-apply` · `b-licences` ·
`b-licence` · `b-documents` · `b-messages` · `b-payments` · `b-profile` ·
`b-services`

**Investor (`i-`)**
`i-dashboard` · `i-opportunities` · `i-shortlist` · `i-requests` · `i-request` ·
`i-apply` · `i-licences` · `i-licence` · `i-documents` · `i-messages` ·
`i-payments` · `i-profile` · `i-services`
(the investor side tracks *requests*; the business side tracks *applications*.)

**Shared**
`notifications.html`

---

## How it is built

Same pattern as the main site: shared CSS/JS live once, and `build.py` inlines
them into every page so each ships self-contained.

```bash
cd portal
python3 build.py
```

It builds `src/*.html` → the matching page here, then **link-checks** every
internal link (including `../…` links back into the main site).

| Source | Role |
|---|---|
| `assets/portal.css` | Portal design system (shares the site's tokens) |
| `assets/portal.js`  | Portal behaviour / chrome (nav rail, menus, interactions) |
| `assets/app.js`     | Data model — the mock accounts, applications, licences, payments |
| `assets/views.js`   | View rendering used across pages |
| `assets/img/`       | Portal-specific imagery |
| `src/*.html`        | Per-page markup, before the four assets above are inlined |

**Editing:** change shared look/behaviour in `assets/`, or a page's markup in
`src/`, then run `python3 build.py`. Do not hand-edit the built pages at the top
of `portal/` — the next build overwrites them.

---

## Notes

* Links back to the public site use `../` (e.g. `../verify.html`) and are covered
  by the build's link check.
* Demo data lives in `assets/app.js` — change accounts, licences and statuses
  there, rebuild, and every page reflects it.
* Still to do: wire the flows to a real API/CMS, Dari & Pashto with RTL, and final
  imagery.
