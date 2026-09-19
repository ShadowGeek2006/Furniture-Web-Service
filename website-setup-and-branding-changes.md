# Artisan Furniture Studio → Maa Samay Sitla Furniture and Electronics
### Setup log + pending changes

---

## ✅ Already done

1. Unzipped `artisan-furniture-studio-FINAL.zip` into `project/`
2. Ran `npm install` (successful — 364 packages, no blocking errors)
3. Ran `copy .env.example .env.local`
4. Ran `npm run dev` — confirmed working at **http://localhost:3000**

This is a **Next.js 15 / React 19** project. Dev server auto-reloads on file save — no restart needed after edits below.

---

## ⬜ Still to do

### A. Fill in `.env.local`

Open `project/.env.local` and set:

```
STORE_NAME="Maa Samay Sitla Furniture and Electronics"
STORE_ADDRESS="Dubari, Madhuban, Mau, Uttar Pradesh, India - 221601"
STORE_PHONE="YOUR_PHONE"
STORE_EMAIL="YOUR_EMAIL"
STORE_GSTIN="YOUR_GSTIN_IF_ANY"
STORE_STATE="Uttar Pradesh"
STORE_STATE_CODE="09"
ADMIN_WHATSAPP_NUMBER="91YOUR_PHONE_NO_SPACES"
ADMIN_PANEL_PASSWORD="choose-a-real-password"
ADMIN_SESSION_SECRET="run: openssl rand -hex 32"
```

> Replace `YOUR_PHONE` / `YOUR_EMAIL` — not visible in the Instagram screenshot you shared, so these have to come from you.

---

### B. `src/components/layout/Navbar.tsx`

**Line 45** — replace:
```tsx
[CLIENT_NAME]
```
with:
```tsx
माँ समय शीतला फर्नीचर
```

**Line 68** — replace `919999999999` with your real WhatsApp number.

---

### C. `src/components/layout/MobileNav.tsx`

**Line 15** — replace:
```tsx
<Drawer isOpen={isOpen} onClose={onClose} title="[CLIENT_NAME]" subtitle="Artisanal Solid Wood Studio" position="left">
```
with:
```tsx
<Drawer isOpen={isOpen} onClose={onClose} title="माँ समय शीतला फर्नीचर" subtitle="Furniture & Electronics" position="left">
```

**Line 57** — replace `919999999999` with your real number.

---

### D. `src/components/layout/Footer.tsx`

**Lines 10–19** — replace:
```tsx
            <span className="font-serif text-2xl font-bold tracking-wider text-linen-100 block">
              [CLIENT_NAME]
            </span>
            <p className="text-xs tracking-[0.25em] uppercase text-brass-400 font-medium">
              Bespoke Solid Wood Atelier
            </p>
            <p className="text-sm text-sand-300 leading-relaxed max-w-sm pt-2">
              We design and handcraft generational furniture in Grade-A Solid Teak and Seasoned Sheesham. 
              Zero MDF. Zero particle board. Crafted with traditional mortise-and-tenon joinery to endure for decades.
            </p>
            <div className="pt-2 flex items-center space-x-3 text-xs text-sand-400">
              <span className="flex items-center"><span className="text-brass-400 mr-1.5">✓</span> 10-Year Structural Warranty</span>
              <span className="flex items-center"><span className="text-brass-400 mr-1.5">✓</span> White-Glove Installation</span>
            </div>
```
with:
```tsx
            <span className="font-serif text-2xl font-bold tracking-wider text-linen-100 block">
              माँ समय शीतला फर्नीचर एंड इलेक्ट्रॉनिक्स
            </span>
            <p className="text-xs tracking-[0.25em] uppercase text-brass-400 font-medium">
              Furniture & Electronics Showroom — Best Quality, Budget Prices
            </p>
            <p className="text-sm text-sand-300 leading-relaxed max-w-sm pt-2">
              आपके घर के लिए बेहतरीन फर्नीचर और इलेक्ट्रॉनिक्स, अपने बजट में।
              Wide range of home furniture and electronics at prices that fit every budget — trusted by families across Mau.
            </p>
            <div className="pt-2 flex items-center space-x-3 text-xs text-sand-400">
              <span className="flex items-center"><span className="text-brass-400 mr-1.5">✓</span> Best Price Guarantee</span>
              <span className="flex items-center"><span className="text-brass-400 mr-1.5">✓</span> Home Delivery Available</span>
            </div>
```

**Lines 56–58** — replace:
```tsx
            <p className="text-sm text-sand-300 leading-normal">[CLIENT_ADDRESS]</p>
            <p className="text-sm text-sand-300"><span className="text-xs text-sand-400 block">Direct Line:</span>[CLIENT_PHONE]</p>
            <p className="text-sm text-sand-300"><span className="text-xs text-sand-400 block">Email:</span>[CLIENT_EMAIL]</p>
```
with:
```tsx
            <p className="text-sm text-sand-300 leading-normal">Dubari, Madhuban, Mau, Uttar Pradesh - 221601</p>
            <p className="text-sm text-sand-300"><span className="text-xs text-sand-400 block">Direct Line:</span>YOUR_PHONE</p>
            <p className="text-sm text-sand-300"><span className="text-xs text-sand-400 block">Email:</span>YOUR_EMAIL</p>
```

**Line 61** — swap `919999999999` for your number (message text can stay or be edited too).

**Line 73** — replace:
```tsx
          <p>&copy; {new Date().getFullYear()} [CLIENT_NAME]. All rights reserved.</p>
```
with:
```tsx
          <p>&copy; {new Date().getFullYear()} Maa Samay Sitla Furniture and Electronics. All rights reserved.</p>
```

---

### E. `src/components/home/HeroSection.tsx`

**Lines 13–26** — replace:
```tsx
              <span className="text-[11px] uppercase tracking-widest text-brass-700 font-semibold">
                Solid Wood Atelier &bull; Zero MDF
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-espresso-900 leading-[1.15] tracking-tight">
              Generational Furniture, <br />
              <span className="italic font-light text-brass-700">Crafted to Outlast Trends.</span>
            </h1>

            <p className="text-base sm:text-lg text-espresso-700/80 max-w-xl leading-relaxed font-normal">
              Hand-planed plantation teak and seasoned Sheesham rosewood. Built with traditional 
              mortise-and-tenon joinery and organic finishes to bring warmth, permanence, and dignity to your home.
            </p>
```
with:
```tsx
              <span className="text-[11px] uppercase tracking-widest text-brass-700 font-semibold">
                Furniture &amp; Electronics &bull; Best Budget Prices
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-espresso-900 leading-[1.15] tracking-tight">
              Best Quality Furniture <br />
              <span className="italic font-light text-brass-700">and Electronics, At Your Budget.</span>
            </h1>

            <p className="text-base sm:text-lg text-espresso-700/80 max-w-xl leading-relaxed font-normal">
              हर घर के लिए भरोसेमंद फर्नीचर और इलेक्ट्रॉनिक्स — अच्छी क्वालिटी, सही दाम।
              Quality home furniture and electronics, priced so every family in Mau can afford the best.
            </p>
```

**Lines 41–54** (the 100% / 10 Yrs / 0% stat block) — replace with:
```tsx
              <div>
                <span className="font-serif text-2xl font-bold block text-espresso-900">230+</span>
                <span className="text-xs text-sand-500 uppercase tracking-wider block mt-0.5">Products in Store</span>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold block text-espresso-900">240+</span>
                <span className="text-xs text-sand-500 uppercase tracking-wider block mt-0.5">Happy Customers</span>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold block text-espresso-900">Best</span>
                <span className="text-xs text-sand-500 uppercase tracking-wider block mt-0.5">Prices in Mau</span>
              </div>
```

---

### F. `src/components/home/CraftsmanshipStory.tsx`

**Lines 19–27** — replace:
```tsx
            <span className="text-xs uppercase tracking-widest text-brass-600 font-semibold block">
              The Atelier Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-espresso-900 font-normal leading-snug">
              Why Real Solid Wood Matters in a World of Disposable Furniture
            </h2>
            <p className="text-sm sm:text-base text-espresso-700/80 leading-relaxed">
              Most commercial furniture today is manufactured from compressed sawdust and synthetic glues designed to degrade within 3 to 5 years. At <strong>[CLIENT_NAME]</strong>, we believe furniture should be an heirloom, not a landfill liability.
            </p>
```
with:
```tsx
            <span className="text-xs uppercase tracking-widest text-brass-600 font-semibold block">
              Our Promise / हमारा वादा
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-espresso-900 font-normal leading-snug">
              Quality You Can Trust, Prices You Can Afford
            </h2>
            <p className="text-sm sm:text-base text-espresso-700/80 leading-relaxed">
              हम आपके लिए सही क्वालिटी और सही दाम में फर्नीचर व इलेक्ट्रॉनिक्स लाते हैं। At <strong>Maa Samay Sitla Furniture and Electronics</strong>, we believe good quality shouldn't cost a fortune — every product is checked before it reaches your home.
            </p>
```

**⚠️ Decision needed:** Lines 29–65 (the "Kiln-Dried Timber / Mortise & Tenon / Natural Finishes" 3-point list) are wood-specific claims that won't apply to you. Either:
- Delete the whole `<div className="space-y-4 pt-2">...</div>` block, **or**
- Tell me the 3 real things you want to highlight (e.g. warranty, EMI available, free delivery) and I'll write the replacement text.

---

### G. `src/components/home/TrustFeatures.tsx`

**Lines 4–25** — replace the `features` array with:
```tsx
  const features = [
    {
      icon: "💰",
      title: "Best Budget Prices",
      desc: "अच्छी क्वालिटी, सही दाम — quality furniture and electronics at prices that fit your budget.",
    },
    {
      icon: "🛋️",
      title: "Wide Range of Furniture",
      desc: "From living room to bedroom — a full range of home furniture to choose from.",
    },
    {
      icon: "📺",
      title: "Electronics Too",
      desc: "TVs, appliances and more — everything for your home under one roof.",
    },
    {
      icon: "🚚",
      title: "Home Delivery",
      desc: "Delivered to your doorstep in Mau and nearby areas.",
    },
  ];
```

---

### H. `src/components/home/CustomFurnitureCTA.tsx`

**Lines 10–18** — replace:
```tsx
            <span className="text-xs uppercase tracking-widest text-brass-400 font-semibold block">
              Bespoke Carpentry & Custom Dimensions
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight">
              Have a Specific Architectural Layout or Pinterest Board in Mind?
            </h2>
            <p className="text-sm sm:text-base text-sand-300 leading-relaxed max-w-2xl">
              From extending dining tables to fit 12 guests, to crafting customized wall-to-wall library credenzas or bespoke fluted headboards — share your sketches, floor plans, or reference photos directly with our master carpenters on WhatsApp.
            </p>
```
with:
```tsx
            <span className="text-xs uppercase tracking-widest text-brass-400 font-semibold block">
              Need Help Choosing? / मदद चाहिए?
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight">
              Looking for Something Specific?
            </h2>
            <p className="text-sm sm:text-base text-sand-300 leading-relaxed max-w-2xl">
              किसी खास फर्नीचर या इलेक्ट्रॉनिक्स आइटम की तलाश में हैं? हमें WhatsApp पर बताएं — हम आपको सही दाम और उपलब्धता बताएंगे। Tell us what you're looking for on WhatsApp and we'll help you find it at the best price.
            </p>
```

Also swap `919999999999` on **line 22** for your real number.

---

### I. `src/lib/whatsappService.ts`

**Line 97 and 100** — replace `[CLIENT_NAME] Atelier` and `[CLIENT_NAME] Workshop Team` with `Maa Samay Sitla Furniture and Electronics` and `Maa Samay Sitla Team`.

---

### J. `src/app/(site)/layout.tsx`

**Lines 9–10** — replace:
```tsx
  title: "[CLIENT_NAME] — Artisanal Solid Wood Furniture Studio",
  description: "Handcrafted generational furniture in solid plantation teak and seasoned Sheesham wood. Built with traditional mortise-and-tenon joinery and organic finishes. Zero MDF.",
```
with:
```tsx
  title: "Maa Samay Sitla Furniture and Electronics — Mau, UP",
  description: "Furniture and electronics showroom in Mau, Uttar Pradesh. Best quality furniture and electronics at your budget prices.",
```

---

### K. Admin panel (cosmetic, low priority — staff-only screens)

- `src/app/(admin)/admin/login/page.tsx` — line 47
- `src/app/(admin)/admin/layout.tsx` — lines 9 & 27

Same `[CLIENT_NAME]` → `Maa Samay Sitla Furniture and Electronics` swap. Skip if short on time.

---

### L. `src/app/(site)/shop/[slug]/page.tsx`

**Line 49** — swap `919999999999` for your real number.

---

## ⚠️ Open item — not yet resolved

The shop's category structure (`RoomCategories.tsx`, `FeaturedCollection.tsx` tabs) currently only has: **Living Room / Dining Room / Bedroom / Study & Office** — no "Electronics" category or product data exists for it yet.

Adding a real electronics section (new products, possibly a new category tab) is a bigger change than a copy edit and hasn't been scoped yet. Decide:
- Keep the site furniture-focused for now (electronics just mentioned in text), **or**
- Add a proper Electronics category with real product listings — tell me and we'll plan that next.

---

## After editing

Save the files — Next.js dev server hot-reloads automatically, no restart needed. Refresh `http://localhost:3000` to see changes.
