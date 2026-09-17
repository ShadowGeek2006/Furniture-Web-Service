# [CLIENT_NAME] — Artisanal Solid Wood Furniture Studio

An e-commerce showroom and workshop management system for a custom-crafted
solid wood furniture brand.

Combines a zero-login guest browsing/enquiry flow with **automated WhatsApp
order dispatch** and a **password-protected admin panel** for order tracking
and GST invoicing.

---

## Key Features

1. **Editorial Furniture Showroom:**
   * Warm, tactile design system built with Tailwind CSS, `Playfair Display` serif typography, and espresso/linen/brass color tokens.
   * Full catalog with room filters (*Living, Dining, Bedroom, Study*), timber variety filters (*Solid Teak, Sheesham, Solid Oak*), and price sorting.
   * Product detail pages with dimensions (inches & cm), wood finish selectors, and technical specifications.

2. **Zero-Friction Cart & Automated WhatsApp Order Flow:**
   * Guest cart requiring zero customer login or password creation.
   * Checkout modal collecting contact details and delivery location.
   * **Automated dispatch:** the server validates the order (re-pricing every item from the product catalog — the browser's price is never trusted), then alerts the shop owner and sends an automated acknowledgment to the customer via the Meta WhatsApp Cloud API.
   * On-screen WhatsApp chat fallback link so customers can immediately discuss customization.

3. **Password-Protected Staff Admin & 1-Click GST Invoicing:**
   * The entire `/admin` section requires signing in at `/admin/login` — see **Admin Access** below.
   * **Orders Dashboard (`/admin/orders`):** list of incoming enquiries with status tracking and search.
   * **Order Editor (`/admin/orders/[id]`):** adjust quantities, add custom line items/surcharges, set discounts and delivery fees.
   * **1-Click GST Invoicing:** computes 18% GST (Intra-State CGST+SGST vs Inter-State IGST) and locks the order into an invoice record (`INV-YYYY-XXXX`).
   * **Print-Ready A4 Tax Invoice (`/admin/invoices/[id]`):** print stylesheet for clean printing or "Save as PDF".

---

## Tech Stack & Current Storage Model

* **Framework:** Next.js 14 (App Router, TypeScript, Tailwind CSS)
* **Hosting:** Vercel
* **WhatsApp Dispatch:** Meta WhatsApp Cloud API (falls back to console logging if not configured — safe for local dev)

**⚠️ Data storage — read this before going live:** there is currently **no
database**. Orders and invoices created through the storefront and admin
panel are cached in the browser's `localStorage`. This means:

* Data is scoped to one browser on one device — the admin will only see
  orders that were placed (or already loaded) in the same browser they're
  viewing `/admin/orders` in. It will **not** sync across devices, and will
  not survive clearing browser data.
* The two `/api/admin/invoices` and (implicitly) any server-only invoice
  read/write **cannot** see this data at all, since a Vercel serverless
  function has no access to browser `localStorage`. See the comment at the
  top of `src/app/api/admin/invoices/route.ts`.

This is fine for a low-volume, single-admin, single-device workflow (e.g.
the shop owner always checks orders from the same laptop). If the business
needs multiple staff members or multi-device access, this needs to be
replaced with a real datastore (e.g. Vercel Postgres, Vercel KV, or
Supabase) behind `src/lib/orderService.ts` — that is a separate, scoped
piece of work, not a quick config change.

Product photography currently uses placeholder Unsplash stock images in
`src/data/mockProducts.ts`. Replace these with the client's real product
photography before going live (per internal build guidelines, stock photos
should not ship in the final production build without client approval).

---

## Admin Access

The `/admin` section (and its API routes) is protected by a single shared
password, checked server-side and backed by a signed session cookie — see
`src/middleware.ts` and `src/lib/adminAuth.ts`. You must set two environment
variables before the admin panel will work (see `.env.example`):

* `ADMIN_PANEL_PASSWORD` — the password staff enter at `/admin/login`.
* `ADMIN_SESSION_SECRET` — a long random string used to sign the session
  cookie. Generate one with `openssl rand -hex 32`. Never reuse the example
  value, and never commit a real value to git.

This is a lightweight, single-password gate appropriate for one admin user.
It does not support per-staff accounts, permissions, or audit trails — if
that's needed later, it should be replaced with real per-user authentication.

---

## Local Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Then fill in `.env.local` with real values (at minimum, set
   `ADMIN_PANEL_PASSWORD` and `ADMIN_SESSION_SECRET` so you can log into
   `/admin`). `.env.local` is gitignored and never committed.

3. **Run the local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` for the customer showroom, and
   `http://localhost:3000/admin/login` to sign in to the staff portal.

---

## Deploying to Vercel

1. Push this repository to GitHub (`.gitignore` already excludes
   `node_modules`, `.next`, and any `.env*.local` files).
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import the GitHub repository (Vercel auto-detects Next.js — no extra
   build configuration needed).
4. In **Environment Variables**, add every variable listed in
   `.env.example` with real production values. At minimum this means a
   strong, unique `ADMIN_PANEL_PASSWORD` and a freshly generated
   `ADMIN_SESSION_SECRET` — do not reuse local/dev values in production.
5. Click **Deploy**.
6. After deploying, confirm `/admin/orders` redirects you to
   `/admin/login` when signed out, and that signing in with the
   production password works, before sharing the URL with the client.
