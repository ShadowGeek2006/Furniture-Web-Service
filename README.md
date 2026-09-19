# Maa Samay Sitla Furniture and Electronics — Mau, UP

A production-ready e-commerce and workshop management system tailored for high-ticket, custom-crafted solid wood furniture brands. 

Combines zero-friction guest discovery with **automated WhatsApp order dispatch** and an **admin 1-click GST invoicing engine**.

---

## Key Features

1. **Editorial Furniture Showroom:**
   * Warm, tactile design system built with Tailwind CSS, `Playfair Display` serif typography, and rich espresso/linen/brass color tokens.
   * Full catalog with dynamic room filters (*Living, Dining, Bedroom, Study*), timber variety filters (*Solid Teak, Sheesham, Solid Oak*), and price sorting.
   * Product detail pages with multi-angle photography, architectural dimensions blueprints (inches & cm), wood finish selectors, and technical timber seasoning specifications.

2. **Zero-Friction Cart & Automated WhatsApp Order Flow:**
   * Guest cart requiring zero customer login or password creation.
   * Checkout modal collecting contact details and delivery location.
   * **Automated Dual-Dispatch:** Backend instantly alerts the shop owner with the customer dossier and order summary, while sending an automated acknowledgment to the customer via Meta WhatsApp Cloud API.
   * Direct on-screen WhatsApp chat fallback link so customers can immediately discuss customization and fabric swatches.

3. **Staff Admin & 1-Click GST Invoicing Engine:**
   * **Orders Dashboard (`/admin/orders`):** Real-time list of all incoming inquiries with status tracking, revenue KPIs, and search.
   * **Order Editor (`/admin/orders/[id]`):** Adjust quantities, add custom carpentry line items / surcharges, set trade discounts, and delivery fees.
   * **1-Click GST Invoicing:** Computes 18% GST (Intra-State CGST+SGST vs Inter-State IGST), locks the order into a permanent, immutable record (`INV-YYYY-XXXX`).
   * **Print-Ready A4 Tax Invoice (`/admin/invoices/[id]`):** Compliant with Indian GST rules, equipped with print stylesheets for clean printing or instant "Save as PDF".

---

## Free-Tier Tech Stack

* **Framework:** Next.js 14 (App Router, TypeScript, Tailwind CSS)
* **Database:** Serverless PostgreSQL (Neon / Supabase)
* **Hosting:** Vercel (Hobby Tier — 100% Free, zero cold-start delay)
* **Media & Assets:** Cloudinary CDN (Free 25GB storage for high-res furniture photography)
* **WhatsApp Dispatch:** Meta WhatsApp Cloud API (1,000 free conversations/month)

---

## Local Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Create a `.env.local` file:
   ```env
   # Admin & Store Details
   NEXT_PUBLIC_STORE_NAME="Maa Samay Sitla Furniture and Electronics"
   ADMIN_WHATSAPP_NUMBER="919876543210"

   # Meta WhatsApp Cloud API (Optional in local dev - logs to terminal if omitted)
   WHATSAPP_API_TOKEN="EAA..."
   WHATSAPP_PHONE_NUMBER_ID="1234567890"

   # Database (Neon / Supabase PostgreSQL)
   DATABASE_URL="postgresql://user:password@host/db?sslmode=require"
   ```

3. **Run local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` for the customer showroom, and `http://localhost:3000/admin/orders` for the staff invoicing portal.

---

## One-Click Deployment to Vercel

1. Push this repository to your **GitHub** account.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Add the environment variables from `.env.example` into Vercel's **Environment Variables** settings.
5. Click **Deploy**. Your furniture website is immediately live with free SSL and edge CDN!
