# Project Context: Artisan Furniture Studio Website

Paste or upload this file into a new chat to bring it up to speed on this
project without re-explaining everything.

---

## 1. What this project is

A production-ready furniture e-commerce website built from a detailed
36-phase development-loop spec (UI/UX design system, product catalog,
admin panel, GST billing/invoicing, security audit, deployment). Not a
demo — intended to be handed to a real client. Working name in the repo:
"Artisan Furniture Studio" (placeholder — real brand name not yet
supplied, represented as `[CLIENT_NAME]` throughout).

**Stack:** Next.js 14.2.35 (App Router, TypeScript), Tailwind CSS.
No backend framework beyond Next.js API routes. No database (see §4).
Deployment target: Vercel.

## 2. Business/product decisions already made

- **No online payment gateway.** Customers do not pay on the site.
- **Order flow:** customer adds items to cart → fills a checkout/enquiry
  form → order is submitted → shop owner is notified via **WhatsApp**
  (Meta WhatsApp Cloud API) → admin manually reviews the order in the
  admin panel and confirms it (a checkbox/status action) → confirming
  generates a bill/GST invoice for that order.
- **Invoices/bills are admin-only** — not something a customer account
  system exposes (there is no customer login at all; checkout is
  guest-only).

## 3. Architecture

```
src/
  app/
    (site)/                     ← customer storefront route group, own root layout
      layout.tsx                   (renders Navbar, Footer, CartProvider, CartDrawer)
      page.tsx                     home page
      shop/page.tsx                product listing + filters
      shop/[slug]/page.tsx         product detail page
    (admin)/
      admin/
        layout.tsx               ← admin route group, own root layout (own <html>/<body>,
                                    robots: noindex, NO storefront chrome). Server component
                                    that reads the session cookie and only renders the staff
                                    header/nav when authenticated.
        login/page.tsx           password form, posts to /api/admin/login
        orders/page.tsx          orders list (client component, reads localStorage)
        orders/[id]/page.tsx     order detail — edit, confirm, "Generate Invoice" button
        invoices/page.tsx        invoices list (client component, reads localStorage)
        invoices/[id]/page.tsx   print-ready A4 GST invoice view
    api/
      orders/route.ts            POST — public, customer-facing. Re-derives prices server-side
                                  from mockProducts (never trusts client price), generates an
                                  order object + a wa.me WhatsApp deep link, dispatches WhatsApp
                                  notifications, returns { order, waLink }.
      admin/
        login/route.ts           POST — checks password, sets signed session cookie
        logout/route.ts          POST — clears cookie, redirects to /admin/login
        invoices/route.ts        ⚠️ effectively dead/stub — see §4
    globals.css
  middleware.ts                  protects /admin/:path* and /api/admin/:path* — verifies the
                                  session cookie, redirects (pages) or 401s (API) if missing/invalid
  lib/
    adminAuth.ts                 signs/verifies the admin session cookie (Web Crypto HMAC-SHA256),
                                  checks the login password. Env-driven, no hardcoded secrets.
    orderService.ts              reads/writes orders & invoices via `localStorage` — see §4
    whatsappService.ts           Meta WhatsApp Cloud API wrapper; falls back to console.log
                                  "simulation mode" if WHATSAPP_API_TOKEN/PHONE_NUMBER_ID unset
    CartContext.tsx              cart state (React context, in-memory)
  data/mockProducts.ts           placeholder product catalog (Unsplash stock photos — swap for
                                  real product photography before launch)
  types/{product,order,invoice}.ts
  components/                    ui/, layout/, home/, product/, cart/, checkout/
```

## 4. ⚠️ Important limitation: no real database

`orderService.ts` persists orders/invoices to **browser `localStorage`**,
not a database. Consequences:

- Admin data (orders, invoices) is scoped to **one browser on one
  device**. It does not sync across devices and is lost if browser data
  is cleared. Fine for a single admin always using the same laptop; not
  fine for multiple staff or multi-device access.
- `/api/admin/invoices/route.ts` is effectively **dead code**: it calls
  `orderService.ts` functions from a Vercel serverless function, which
  has no `window`/`localStorage`, so it can only ever see hardcoded seed
  data. It's not currently called by anything (the admin pages import
  `orderService.ts` directly as client components instead, which is why
  the real UI works). There's a comment at the top of that file
  documenting this.
- **If the client ever needs multi-device/multi-staff admin access**,
  this needs a real datastore (Vercel Postgres, Vercel KV, or Supabase)
  behind `orderService.ts`, replacing the localStorage calls. This is a
  scoped follow-up project, not a quick fix.

## 5. Authentication

- **Customers:** no login at all (guest checkout only).
- **Admin (`/admin/*` and `/api/admin/*`):** single shared password,
  gated by `middleware.ts`. Enter password at `/admin/login` →
  `/api/admin/login` checks it against `ADMIN_PANEL_PASSWORD` → on
  success sets an httpOnly, Secure, SameSite=Lax cookie whose value is
  `HMAC-SHA256(ADMIN_SESSION_SECRET, fixed-label)` (7-day expiry).
  Middleware recomputes the HMAC on every request to verify it.
  This is intentionally lightweight (no per-user accounts/permissions/
  audit trail) — appropriate for one shop-owner admin, not for a team.

## 6. Session log — Vercel-deployment audit (already done)

A full fault-finding pass was run against the uploaded codebase
(`artisan-furniture-studio-codebase.zip`), verified with real builds/
installs/curl tests, not just static review. Fixed and delivered as
`artisan-furniture-studio-fixed.zip`:

**Critical**
- **No auth on `/admin/*` at all** — anyone could see customer PII and
  invoices. → Built the password-gate system described in §5. Verified
  end-to-end with curl (redirect when logged out, 401 on wrong password,
  cookie set on success, protected pages/API load once authenticated).
- **`next@14.2.5` had a critical CVE** → bumped to `14.2.35` (latest
  patched 14.x). Full remediation of every advisory in npm audit would
  require a major-version jump to Next 15/16, which changes core APIs
  (`cookies()`/`headers()`/`params` become async) — flagged as a future
  upgrade, not done here (too high-risk/large to bundle into this pass).

**High**
- **Checkout never called the backend** — `CheckoutModal.tsx` built a
  payload for `/api/orders` but wrote straight to `localStorage` instead
  of fetching it, so server-side price validation and the WhatsApp
  dispatch never actually ran. → Rewired to actually `fetch('/api/orders')`
  and use the server's validated response.
- **Admin panel was wrapped in the customer storefront's navbar/footer**
  (shop nav, cart icon, WhatsApp CTA stacked around the staff tools).
  → Split into `(site)` / `(admin)` Next.js route groups, each with its
  own root layout, so the admin panel has clean, separate chrome.
- **Real React bug**: `shop/[slug]/page.tsx` called hooks after an early
  `return notFound()`, violating the Rules of Hooks (only surfaced once
  linting was actually turned on — see below). → Fixed by moving all
  hooks above the early return with safe fallback values.

**Medium / hygiene**
- No `.gitignore` existed → added one (risk of committing
  `node_modules`/secrets to the repo Vercel builds from).
- `npm run lint` hung forever on an interactive ESLint setup prompt
  (eslint wasn't installed) → added `eslint` + `eslint-config-next` +
  `.eslintrc.json`; confirmed it now runs clean non-interactively.
- README claimed a Postgres database (Neon/Supabase) and a Cloudinary
  integration that don't exist anywhere in the code, and referenced a
  `.env.example` that didn't exist → added `.env.example`; rewrote the
  README to accurately describe what's actually implemented, including
  the localStorage limitation from §4.
- Escaped a raw `"` character in JSX (inches symbol on dimensions) that
  ESLint flagged as an error once linting was turned on.

**Verification performed:** clean `npm install` from scratch, `npm run
build` (passes, zero errors, only non-blocking `<img>`→`next/image`
warnings remain), `npm run lint` (runs clean), and live curl testing of
the full login/logout/protected-route flow against `npm start`.

## 7. Known remaining items / recommendations for next steps

1. **Before deploying**, set real values for `ADMIN_PANEL_PASSWORD` and
   `ADMIN_SESSION_SECRET` in Vercel's project environment variables
   (see `.env.example`). The admin panel will not work without them.
2. **Not yet fixed / decided:** whether to invest in a real database for
   multi-device admin access (§4) — needs a client/product decision, not
   something to silently build without buy-in on infra choice/cost.
3. **Product photography** is still placeholder Unsplash stock images in
   `src/data/mockProducts.ts` — needs the client's real photos before
   launch.
4. **Minor/non-blocking:** several `<img>` tags could be converted to
   `next/image` for better performance (currently just ESLint warnings,
   not build-blocking).
5. **Optional future upgrade:** Next.js 15/16 major-version migration to
   close all remaining npm-audit advisories — bigger, separate effort.
6. Client-supplied content still outstanding generally (per the original
   spec's placeholder rules): real business name/address/phone/email,
   GST/GSTIN details, policies, social links, etc. — currently
   represented as `[CLIENT_NAME]`-style placeholders throughout.

## 8. Environment variables (see `.env.example` in the repo)

```
ADMIN_PANEL_PASSWORD=      # required — admin login password
ADMIN_SESSION_SECRET=      # required — long random string, e.g. `openssl rand -hex 32`
WHATSAPP_API_TOKEN=        # optional — Meta WhatsApp Cloud API token; without it,
WHATSAPP_PHONE_NUMBER_ID=  #            notifications just log to console (safe for dev)
ADMIN_WHATSAPP_NUMBER=     # shop's WhatsApp number, e.g. 919999999999
```
