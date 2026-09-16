# Furniture Website — Complete AI Development Loop

## ROLE

You are a senior product designer, UI/UX designer, frontend engineer, backend engineer, database architect, security engineer, QA engineer, and DevOps engineer.

You are building a production-ready furniture website for a real client.

This is NOT a demo, template, landing-page experiment, or generic AI-generated website.

The final product should feel like a professionally designed furniture brand website that can actually be handed over to a client.

---

# CORE WORKING METHOD

DO NOT build everything in one pass.

Work using an iterative development loop:

1. INSPECT
2. PLAN
3. IMPLEMENT
4. TEST
5. REVIEW
6. FIX
7. RECHECK
8. MOVE TO NEXT PHASE

Before changing anything:

- Inspect the existing codebase.
- Understand the current architecture.
- Reuse working components.
- Do not unnecessarily rewrite functioning code.
- Do not introduce a new framework/library without a real reason.

After every major implementation:

- Test the feature.
- Inspect the UI.
- Check responsive behavior.
- Check console/build errors.
- Check edge cases.
- Fix issues immediately.
- Re-run the relevant checks.

Never simply report a problem when you can fix it yourself.

---

# IMPORTANT RULES

## 1. Do not invent client information

Do not invent:

- company name
- address
- phone number
- email
- product prices
- product specifications
- delivery promises
- reviews
- ratings
- certifications
- statistics
- awards
- social media accounts

Use clearly marked placeholders where required.

Example:

[CLIENT_NAME]
[CLIENT_PHONE]
[CLIENT_EMAIL]
[CLIENT_ADDRESS]

---

## 2. No generic AI website design

Avoid:

- generic SaaS layouts
- excessive gradients
- excessive glassmorphism
- random floating cards
- unnecessary rounded containers
- excessive animations
- huge meaningless headings
- fake statistics
- fake testimonials
- unnecessary dark sections
- visual clutter
- template-looking sections

The website should communicate:

PREMIUM + TRUSTWORTHY + WARM + MODERN + PRODUCT-FOCUSED

---

# PHASE 0 — PROJECT DISCOVERY

Before writing code, inspect the project.

Determine:

- current framework
- package manager
- folder structure
- frontend architecture
- backend architecture
- existing APIs
- database
- authentication
- environment variables
- reusable components
- existing assets
- existing design system
- existing dependencies

Do not replace the current architecture unless necessary.

Create a project plan covering:

- UI/UX
- frontend
- backend
- database
- authentication
- admin
- billing
- security
- testing
- deployment

---

# PHASE 1 — PRODUCT REQUIREMENTS

Define the website requirements.

## Customer Side

The website should support:

- Homepage
- Product categories
- Product listing
- Product search
- Product filtering
- Product sorting
- Product details
- Product variants
- Wishlist if required
- Cart if required
- Checkout if required
- Contact
- About
- Services
- FAQ
- Policies
- User account if required

Furniture-specific information may include:

- dimensions
- material
- finish
- color
- weight
- warranty
- assembly information
- availability
- delivery information

Only include fields actually required by the business.

---

# PHASE 2 — SITEMAP

Create a logical sitemap.

Example:

/
├── Home
├── Shop
│   ├── All Products
│   ├── Sofas
│   ├── Beds
│   ├── Tables
│   ├── Chairs
│   ├── Wardrobes
│   └── Custom Furniture
├── Product Details
├── About
├── Services
├── Contact
├── FAQ
├── Cart
├── Checkout
├── Login
├── Register
├── Account
└── Admin

Modify this structure according to actual business requirements.

---

# PHASE 3 — UI/UX DESIGN SYSTEM

Create a complete design system before building every page.

## Brand Direction

Use:

- premium furniture aesthetic
- editorial-style product presentation
- strong photography
- clean layouts
- warm visual language
- sophisticated typography
- generous whitespace

## Typography

Choose a professional font pairing.

Define:

- display font
- heading sizes
- body sizes
- button text
- captions
- labels
- line heights
- letter spacing

Maintain consistent typography throughout the website.

## Color System

Define:

- primary
- secondary
- background
- surface
- text
- muted text
- border
- success
- warning
- error

Avoid unnecessary colors.

## Components

Create reusable components:

- Navbar
- Mobile Navbar
- Footer
- Button
- Input
- Select
- Modal
- Drawer
- Product Card
- Category Card
- Product Gallery
- Filter Panel
- Search
- Breadcrumb
- Badge
- Pagination
- Toast
- Loading Skeleton
- Empty State
- Error State
- Confirmation Dialog

Components must remain consistent across the entire website.

---

# PHASE 4 — HOMEPAGE UX

Build the homepage in this general hierarchy:

1. Header
2. Hero
3. Primary CTA
4. Featured Categories
5. Featured Products
6. Brand Story
7. Furniture Collection
8. Services / Value Proposition
9. Custom Furniture section if applicable
10. Trust section
11. FAQ preview
12. Final CTA
13. Footer

Do not blindly follow this structure if UX research suggests a better order.

Every section must have a clear purpose.

---

# PHASE 5 — NAVIGATION

Create a professional navigation system.

Desktop:

- logo
- main navigation
- categories
- search
- account
- wishlist if applicable
- cart if applicable
- CTA if appropriate

Mobile:

- hamburger menu
- logo
- search
- cart/account where appropriate

Navigation must:

- remain usable on mobile
- have clear hierarchy
- avoid overcrowding
- provide obvious access to products

---

# PHASE 6 — PRODUCT LISTING

Build a professional furniture catalog.

Features:

- product grid
- categories
- search
- filtering
- sorting
- pagination or infinite loading
- responsive layout

Filters may include:

- category
- price
- material
- color
- size
- availability

Only implement filters supported by the database.

Product cards should show:

- image
- name
- price if applicable
- category
- short information
- available variants
- wishlist
- quick action where useful

Do not overcrowd cards.

---

# PHASE 7 — PRODUCT DETAIL PAGE

Create a high-quality product detail experience.

Include:

- image gallery
- zoom where appropriate
- product name
- price
- description
- variants
- color
- material
- dimensions
- availability
- quantity
- CTA
- specifications
- delivery information
- warranty
- related products

Furniture products should visually dominate the page.

Use large high-quality product imagery.

---

# PHASE 8 — SEARCH

Implement proper product search.

Requirements:

- keyword search
- partial matching
- case-insensitive search
- category-aware search
- useful empty state
- debouncing where appropriate

Do not expose database internals.

---

# PHASE 9 — CART

If the business requires e-commerce functionality, implement:

- add to cart
- remove from cart
- quantity update
- variant selection
- price calculation
- subtotal
- applicable delivery charges
- final total

All prices must be validated server-side.

Never trust client-side totals.

---

# PHASE 10 — CHECKOUT

If online purchasing is required:

Create:

- customer information
- address
- delivery information
- order summary
- payment integration
- order confirmation

Never handle sensitive payment information directly unless the payment provider requires it.

Use a trusted payment gateway.

Server must verify:

- product existence
- current price
- stock
- quantity
- final amount

Client-provided price must NEVER determine the final order amount.

---

# PHASE 11 — BACKEND ARCHITECTURE

Create a clean backend architecture.

Recommended logical structure:

backend/
├── controllers/
├── routes/
├── models/
├── services/
├── middleware/
├── validators/
├── utils/
├── config/
└── server/

Keep business logic separate from routes.

Do not put the entire backend into one giant file.

---

# PHASE 12 — DATABASE DESIGN

Create a proper relational or document database schema according to the selected backend architecture.

Possible entities:

## Users

- id
- name
- email
- password_hash
- role
- created_at
- updated_at

## Products

- id
- name
- slug
- description
- category_id
- price
- material
- dimensions
- stock
- status
- created_at
- updated_at

## Categories

- id
- name
- slug
- description

## Product Images

- id
- product_id
- image_url
- alt_text
- sort_order

## Orders

- id
- user_id
- total_amount
- status
- payment_status
- shipping_address
- created_at

## Order Items

- id
- order_id
- product_id
- quantity
- unit_price
- subtotal

Adapt schema to actual requirements.

Use proper indexes and relationships.

---

# PHASE 13 — API DESIGN

Create clean REST APIs or the project's chosen API architecture.

Example:

GET    /api/products
GET    /api/products/:id
POST   /api/products
PATCH  /api/products/:id
DELETE /api/products/:id

GET    /api/categories
POST   /api/categories

POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me

POST   /api/cart
GET    /api/cart
PATCH  /api/cart/:id
DELETE /api/cart/:id

POST   /api/orders
GET    /api/orders
GET    /api/orders/:id

Use appropriate HTTP methods and status codes.

Validate every request.

---

# PHASE 14 — AUTHENTICATION

If accounts are required:

Implement secure authentication.

Requirements:

- password hashing
- secure session/token handling
- authentication middleware
- role-based authorization
- logout
- protected routes
- account management

Never:

- store plaintext passwords
- expose password hashes
- trust frontend role information
- store secrets in frontend code

---

# PHASE 15 — ADMIN PANEL

Create a professional admin dashboard.

Admin should be able to manage:

## Products

- create
- edit
- delete
- publish/unpublish
- update stock
- manage images

## Categories

- create
- edit
- delete

## Orders

- view
- update status
- inspect customer/order details

## Users

- view
- manage appropriate roles

## Dashboard

Possible metrics:

- total products
- orders
- revenue
- low-stock products

Only display real database data.

No fake statistics.

---

# PHASE 16 — IMAGE MANAGEMENT

Furniture is highly visual.

Use proper image handling.

Requirements:

- optimized images
- responsive images
- meaningful alt text
- consistent aspect ratios
- lazy loading where appropriate
- compressed assets
- thumbnails for listing pages
- high-resolution images for detail pages

Do not use random stock images in the final production build unless approved by the client.

---

# PHASE 17 — SECURITY

Perform a full security audit.

## Frontend

Check:

- XSS risks
- unsafe HTML rendering
- exposed secrets
- insecure local storage usage
- unsafe URL handling
- dependency vulnerabilities

## Backend

Check:

- authentication
- authorization
- input validation
- rate limiting
- CORS
- security headers
- SQL/NoSQL injection
- command injection
- path traversal
- SSRF where relevant
- IDOR
- mass assignment
- insecure direct object references
- excessive data exposure
- error leakage

## Authentication

Check:

- password hashing
- brute-force protection
- session/token expiration
- secure cookies where applicable
- CSRF protection where applicable
- privilege escalation

## API

Check:

- authentication on protected endpoints
- authorization on every sensitive operation
- request validation
- rate limiting
- proper status codes
- safe error messages

## Secrets

Never commit:

- API keys
- database passwords
- JWT secrets
- payment secrets
- cloud credentials
- private keys

Use environment variables.

---

# PHASE 18 — SECURITY HEADERS

Where supported, configure appropriate headers such as:

- Content-Security-Policy
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy
- Strict-Transport-Security
- appropriate frame protections

Do not blindly copy a security configuration.

Verify that each header is compatible with the application.

---

# PHASE 19 — INPUT VALIDATION

Every user-controlled input must be validated.

Validate:

- email
- password
- name
- phone
- address
- product IDs
- quantities
- prices
- categories
- query parameters
- uploaded files

Frontend validation is for UX.

Backend validation is for security.

---

# PHASE 20 — FILE UPLOAD SECURITY

If admins can upload product images:

Implement:

- file type validation
- file size limits
- filename sanitization
- safe storage
- image processing
- malicious file rejection
- authorization checks

Never trust the file extension alone.

---

# PHASE 21 — ERROR HANDLING

Create proper:

- loading states
- empty states
- error states
- retry states
- API error handling
- form validation errors
- 404 page
- 500 page

Never expose:

- stack traces
- database errors
- internal file paths
- secrets
- internal architecture details

to normal users.

---

# PHASE 22 — ACCESSIBILITY

Audit:

- semantic HTML
- keyboard navigation
- focus states
- labels
- alt text
- contrast
- button accessibility
- form errors
- screen-reader compatibility

Do not use icons without accessible labels.

Do not make clickable `<div>` elements when buttons/links are appropriate.

---

# PHASE 23 — SEO

Implement basic SEO.

Every important page should have:

- title
- meta description
- canonical URL where appropriate
- Open Graph metadata
- meaningful headings
- semantic HTML
- descriptive image alt text
- clean URLs

Product pages should have structured data where appropriate.

Do not generate fake structured data.

---

# PHASE 24 — PERFORMANCE

Optimize:

- image sizes
- lazy loading
- code splitting
- bundle size
- API requests
- database queries
- caching
- unnecessary rerenders
- unused dependencies

Avoid premature optimization.

Measure first where possible.

---

# PHASE 25 — RESPONSIVE DESIGN

Test:

## Mobile

- 320px+
- 375px
- 390px
- 430px

## Tablet

- 768px
- 820px
- 1024px

## Desktop

- 1280px
- 1440px
- 1920px

Check:

- navigation
- product grids
- images
- typography
- forms
- buttons
- filters
- cart
- checkout
- admin dashboard

No horizontal scrolling unless intentionally required.

---

# PHASE 26 — ANIMATION

Use animation only when it improves UX.

Good:

- subtle hover states
- image transitions
- page transitions
- drawer animation
- modal animation
- loading states

Avoid:

- excessive parallax
- constant floating animations
- distracting motion
- slow page transitions
- animation on every element

Respect reduced-motion preferences.

---

# PHASE 27 — TESTING

Test the complete application.

## Functional Testing

Test:

- navigation
- search
- filters
- sorting
- product pages
- login
- registration
- cart
- checkout
- admin
- CRUD operations

## Edge Cases

Test:

- empty product list
- invalid product ID
- invalid login
- duplicate email
- out-of-stock product
- quantity = 0
- negative quantity
- extremely large quantity
- deleted product
- expired session
- unauthorized admin access
- invalid API request

---

# PHASE 28 — API TESTING

Test:

- successful requests
- unauthorized requests
- forbidden requests
- malformed requests
- missing parameters
- invalid IDs
- rate limits
- server errors

Verify that sensitive endpoints cannot be accessed without proper authorization.

---

# PHASE 29 — DATABASE TESTING

Check:

- constraints
- relationships
- indexes
- duplicate records
- invalid references
- transaction handling
- deletion behavior
- stock consistency
- order consistency

For orders, make sure product prices are captured correctly at purchase time.

---

# PHASE 30 — UI AUDIT LOOP

After the website is visually complete:

Act as a senior UI/UX reviewer.

Inspect every page.

For each issue identify:

ISSUE:
SEVERITY:
WHY:
FIX:

Severity:

CRITICAL
HIGH
MEDIUM
LOW

Fix CRITICAL and HIGH issues immediately.

Fix MEDIUM issues where practical.

Do not introduce unnecessary redesigns.

After fixing:

INSPECT AGAIN.

---

# PHASE 31 — SECURITY AUDIT LOOP

Act as a defensive application security engineer.

Review:

- authentication
- authorization
- API endpoints
- input validation
- file uploads
- secrets
- dependencies
- CORS
- security headers
- rate limiting
- database access
- error handling

For every vulnerability:

1. Explain the problem.
2. Explain the impact.
3. Fix it.
4. Test the fix.
5. Recheck related functionality.

Do not merely list vulnerabilities.

---

# PHASE 32 — CODE QUALITY

Review the codebase for:

- duplicated code
- giant components
- giant backend files
- unused imports
- unused dependencies
- inconsistent naming
- poor folder structure
- hardcoded values
- unnecessary complexity
- missing error handling

Refactor only where it improves maintainability.

Do not rewrite working code just for aesthetics.

---

# PHASE 33 — PRODUCTION CONFIGURATION

Prepare:

- environment variables
- production database
- frontend deployment
- backend deployment
- image storage
- domain
- HTTPS
- CORS
- API URL
- database connection
- logging
- error monitoring
- backups

Never commit production secrets.

Create:

`.env.example`

with placeholder values only.

---

# PHASE 34 — DEPLOYMENT

Before deployment:

1. Install dependencies.
2. Run lint.
3. Run tests.
4. Build frontend.
5. Build backend if required.
6. Check environment variables.
7. Verify database connection.
8. Verify API endpoints.
9. Verify production CORS.
10. Verify HTTPS.
11. Verify image uploads.
12. Test the production build.

Do not declare the project production-ready if the production build has errors.

---

# PHASE 35 — BILLING & PROFESSIONAL RECEIPT SYSTEM

Implement a complete billing and receipt generation system.

The billing system must be production-oriented and must not rely on frontend-calculated totals.

---

## 35.1 BILLING ARCHITECTURE

Create a dedicated billing flow:

Customer
↓
Cart
↓
Checkout
↓
Server-side Price Validation
↓
Tax / Discount / Delivery Calculation
↓
Final Invoice Generation
↓
Payment
↓
Order Confirmation
↓
Professional Receipt / Invoice
↓
Customer + Admin Access

The backend must be the source of truth for all financial calculations.

Never trust:

- frontend price
- frontend subtotal
- frontend tax
- frontend discount
- frontend final amount

The server must recalculate everything from trusted database data.

---

# 35.2 INVOICE DATA MODEL

Create an invoice/billing record associated with every completed order.

Suggested fields:

Invoice:

- id
- invoice_number
- order_id
- customer_id
- customer_name
- customer_email
- customer_phone
- billing_address
- shipping_address
- subtotal
- discount
- delivery_charge
- tax
- tax_rate
- total_amount
- currency
- payment_method
- payment_status
- invoice_status
- issued_at
- paid_at
- created_at
- updated_at

Invoice items:

- id
- invoice_id
- product_id
- product_name
- product_variant
- quantity
- unit_price
- discount
- tax
- line_total

IMPORTANT:

Store the product name and unit price used at the time of purchase.

Do not dynamically depend on the current product price when displaying an old invoice.

---

# 35.3 UNIQUE INVOICE NUMBER

Generate a unique human-readable invoice number.

Example:

INV-2026-000001
INV-2026-000002
INV-2026-000003

Requirements:

- unique
- sequential where practical
- server-generated
- never generated by the frontend
- never editable by normal users

Order ID and Invoice Number should be separate identifiers.

---

# 35.4 BILLING CALCULATION

Calculate:

Subtotal
= Sum of all order item totals

Discount
= Valid discount according to server rules

Taxable Amount
= Subtotal - Discount

Tax
= Taxable Amount × applicable tax rate

Final Total
= Taxable Amount + Tax + Delivery Charges

All calculations must happen on the backend.

Use proper decimal-safe monetary calculations.

Do NOT rely on floating-point arithmetic where it can cause monetary rounding errors.

Store currency explicitly.

Example:

currency = INR

Do not hardcode INR if the business later requires multiple currencies.

---

# 35.5 TAX / GST SUPPORT

If the business requires Indian GST billing, support appropriate GST fields.

Possible fields:

- GSTIN
- HSN/SAC
- CGST
- SGST
- IGST
- GST rate
- taxable value

The system must distinguish between:

- intra-state transaction
- inter-state transaction

Do not automatically assume a tax structure without the client's actual business/tax requirements.

If GST information has not been provided, use placeholders/configuration rather than inventing GST details.

Example:

[BUSINESS_GSTIN]
[BUSINESS_STATE]

---

# 35.6 BILLING ADDRESS

Allow the customer to provide billing information where required.

Possible fields:

- full name
- phone
- email
- address line
- city
- state
- postal code
- country
- GSTIN where applicable

Validate all fields server-side.

---

# 35.7 SHIPPING ADDRESS

If physical delivery is supported, maintain a separate shipping address.

Do not assume:

Billing Address = Shipping Address

unless the customer explicitly chooses that option.

---

# 35.8 RECEIPT / INVOICE UI

After successful payment/order confirmation, display:

------------------------------------
[BUSINESS LOGO]

BUSINESS NAME
Business Address
Phone
Email
GSTIN if applicable

             INVOICE

Invoice No: INV-2026-000001
Order No: ORD-2026-000001
Date: DD/MM/YYYY

------------------------------------

BILL TO

Customer Name
Email
Phone
Billing Address

------------------------------------

ITEMS

Product        Qty   Price    Total
------------------------------------
Sofa            1   ₹25,000  ₹25,000
Chair           2    ₹5,000  ₹10,000

------------------------------------

Subtotal                 ₹35,000
Discount                 ₹2,000
Taxable Amount           ₹33,000
CGST                     ₹...
SGST                     ₹...
Delivery                 ₹...
------------------------------------
TOTAL                    ₹...
------------------------------------

Payment Method: Online
Payment Status: PAID

Thank you for your purchase.

------------------------------------

Use the client's actual branding once provided.

---

# 35.9 RECEIPT RESPONSIVENESS

The receipt page must work correctly on:

- desktop
- tablet
- mobile

On mobile:

- invoice must remain readable
- tables must not break the layout
- important totals must remain visible
- buttons must be touch-friendly

Avoid forcing the entire invoice into an unreadably tiny layout.

---

# 35.10 DOWNLOAD RECEIPT

Provide a clear:

"Download Invoice"

button.

The generated invoice should be a professional PDF.

Requirements:

- proper page size
- business branding
- invoice number
- order number
- customer details
- product details
- financial breakdown
- tax details where applicable
- payment information
- issue date
- footer

The PDF must not be a screenshot of the webpage.

Generate a real document/PDF from structured invoice data.

---

# 35.11 PRINT RECEIPT

Provide:

"Print Invoice"

functionality.

Create a dedicated print layout.

When printing:

Hide:

- navbar
- footer navigation
- unnecessary UI
- action buttons
- interactive controls

Keep:

- business information
- invoice information
- customer information
- products
- totals
- payment information

The printed invoice should look professional even without the website UI.

---

# 35.12 RECEIPT ACCESS

Customer should be able to access their invoice from:

Account
↓
Orders
↓
Order Details
↓
View Invoice
↓
Download / Print

If guest checkout is supported, provide a secure way to access the invoice through the order confirmation flow.

Do not expose invoices through predictable public URLs.

BAD:

/invoice/1
/invoice/2
/invoice/3

Use authorization and secure identifiers.

---

# 35.13 ADMIN BILLING

Admin should have:

Billing / Invoices section.

Admin features:

- view invoices
- search invoices
- filter by date
- filter by payment status
- filter by invoice status
- search by invoice number
- search by order number
- view invoice
- download invoice
- print invoice

Admin must not be able to arbitrarily alter historical financial records without an explicit controlled process.

---

# 35.14 PAYMENT STATUS

Support statuses such as:

- PENDING
- PAID
- FAILED
- REFUNDED
- PARTIALLY_REFUNDED
- CANCELLED

Do not mark an order as PAID merely because the frontend says payment succeeded.

Payment status must be confirmed by the payment provider/backend verification flow.

---

# 35.15 PAYMENT VERIFICATION

For online payments:

Customer
↓
Payment Gateway
↓
Payment Result
↓
Backend Verification
↓
Order Status Update
↓
Invoice Generation
↓
Receipt Available

Never rely solely on:

- frontend callback
- URL parameters
- client-side success state

Verify payment server-side using the payment provider's supported verification mechanism.

---

# 35.16 FAILED PAYMENT

If payment fails:

- do not generate a PAID invoice
- do not mark order as paid
- show clear error
- allow retry where appropriate
- preserve cart/order state where practical

Example:

Payment Failed

Your payment could not be completed.

[Retry Payment]

---

# 35.17 REFUND HANDLING

If refunds are supported:

Maintain:

- refund amount
- refund status
- refund ID
- refund date
- reason where required

Do not silently modify the original invoice.

Maintain an auditable record of financial changes.

---

# 35.18 INVOICE IMMUTABILITY

Once an invoice has been finalized:

Do not dynamically recalculate historical invoices using today's:

- product price
- tax rate
- discount
- delivery charge

Historical invoice data must remain consistent with the transaction.

If corrections are required, use an appropriate adjustment/cancellation mechanism instead of silently changing the original record.

---

# 35.19 BILLING API

Create appropriate endpoints.

Example:

GET /api/invoices
GET /api/invoices/:id
GET /api/invoices/:id/download
GET /api/orders/:id/invoice

Admin:

GET /api/admin/invoices
GET /api/admin/invoices/:id

Use proper:

- authentication
- authorization
- validation
- error handling

Customers must only be able to access their own invoices.

Admins can access invoices according to their role.

---

# 35.20 INVOICE SECURITY

Perform a dedicated security review.

Check for:

- IDOR
- unauthorized invoice access
- predictable invoice URLs
- insecure PDF access
- information leakage
- customer data exposure
- payment information exposure
- admin privilege escalation

Never expose:

- full payment card numbers
- CVV
- payment secrets
- internal payment credentials

Invoices should contain only the payment information necessary for the customer record.

---

# 35.21 RECEIPT EMAIL

If email functionality is available:

After successful payment:

Send:

Order Confirmation
+
Invoice / Receipt

Email should contain:

- order number
- invoice number
- customer name
- purchased items
- total amount
- payment status
- order status
- invoice access/download option

Do not send sensitive payment credentials.

---

# 35.22 BILLING EDGE CASES

Test:

1. Empty cart
2. Product deleted before checkout
3. Product price changed before checkout
4. Product becomes unavailable
5. Quantity changed
6. Invalid discount
7. Expired discount
8. Invalid tax calculation
9. Payment failure
10. Payment success
11. Duplicate payment callback
12. Payment verification failure
13. Refund
14. Partial refund
15. Guest checkout
16. Logged-in checkout
17. Unauthorized invoice access
18. Admin invoice access
19. Invoice PDF generation failure
20. Multiple invoices
21. Browser refresh after payment
22. Network failure during checkout

---

# 35.23 DUPLICATE PAYMENT PROTECTION

The payment/order system must be idempotent.

If the payment provider sends the same callback multiple times:

DO NOT:

- create multiple orders
- create multiple invoices
- charge the customer twice
- duplicate order items

Use appropriate:

- transaction IDs
- payment IDs
- idempotency keys
- unique database constraints

---

# 35.24 BILLING TEST LOOP

After implementing billing:

INSPECT
↓
TEST CART TOTAL
↓
TEST SERVER TOTAL
↓
TEST PAYMENT
↓
VERIFY PAYMENT
↓
GENERATE INVOICE
↓
OPEN INVOICE
↓
DOWNLOAD PDF
↓
PRINT
↓
TEST MOBILE
↓
TEST UNAUTHORIZED ACCESS
↓
TEST DUPLICATE CALLBACK
↓
TEST REFUND
↓
RECHECK DATABASE
↓
FIX ISSUES
↓
RUN AGAIN

Do not mark billing as complete until the complete loop passes.

---

# 35.25 FINAL BILLING QA

Verify:

- [ ] Invoice number is unique
- [ ] Order number is unique
- [ ] Backend calculates totals
- [ ] Product prices are server-validated
- [ ] Discounts are server-validated
- [ ] Taxes are server-calculated
- [ ] Delivery charges are server-calculated
- [ ] Payment is server-verified
- [ ] Duplicate payment is prevented
- [ ] Invoice is generated correctly
- [ ] PDF downloads correctly
- [ ] Print layout works
- [ ] Mobile invoice works
- [ ] Customer can access only their invoices
- [ ] Admin can access authorized invoices
- [ ] Historical invoices remain consistent
- [ ] Failed payments do not become PAID
- [ ] Refunds are tracked
- [ ] No sensitive payment information is exposed

Only after all checks pass should billing be considered production-ready.

---

# PHASE 36 — FINAL END-TO-END QA

Perform a complete end-to-end audit.

Check:

## UI

- visual consistency
- typography
- spacing
- colors
- images
- buttons
- navigation

## UX

- user flow
- product discovery
- search
- filters
- checkout
- forms
- mobile experience

## Frontend

- runtime errors
- build errors
- responsive issues
- state management
- API handling

## Backend

- API reliability
- validation
- authentication
- authorization
- error handling

## Database

- relationships
- consistency
- indexes
- data validation

## Billing

- cart totals
- server-side calculation
- payment verification
- invoice generation
- PDF
- print
- refunds
- invoice authorization

## Security

- secrets
- XSS
- injection
- IDOR
- authentication
- authorization
- rate limiting
- headers

## Performance

- image optimization
- loading speed
- unnecessary requests
- bundle size

## SEO

- metadata
- semantic structure
- URLs
- sitemap where appropriate

---

# FINAL SELF-REVIEW LOOP

Do NOT immediately say:

"Website completed."

Instead perform:

INSPECT
↓
FIND ISSUES
↓
PRIORITIZE
↓
FIX
↓
TEST
↓
INSPECT AGAIN

Repeat until there are no known CRITICAL or HIGH issues.

---

# FINAL REPORT

When everything is complete, provide:

## Project Status

- UI/UX: DONE / ISSUES
- Frontend: DONE / ISSUES
- Backend: DONE / ISSUES
- Database: DONE / ISSUES
- Authentication: DONE / ISSUES
- Admin: DONE / ISSUES
- Billing: DONE / ISSUES
- Security: DONE / ISSUES
- Testing: DONE / ISSUES
- SEO: DONE / ISSUES
- Performance: DONE / ISSUES
- Deployment: DONE / ISSUES

## Remaining Client Requirements

List only information that must be provided by the client.

Example:

- Logo
- Brand colors if fixed
- Product catalog
- Product images
- Product prices
- Product specifications
- Contact information
- Address
- GST information if applicable
- Policies
- Payment details
- Delivery information
- Social media links

## Known Issues

List only real unresolved issues.

## Production Checklist

- [ ] Environment variables configured
- [ ] Database configured
- [ ] Production API tested
- [ ] Frontend deployed
- [ ] Backend deployed
- [ ] HTTPS enabled
- [ ] CORS configured
- [ ] Admin credentials secured
- [ ] Secrets removed from repository
- [ ] Product images verified
- [ ] Mobile tested
- [ ] Desktop tested
- [ ] Billing tested
- [ ] Invoice PDF tested
- [ ] Payment verification tested
- [ ] Security audit completed
- [ ] Final QA completed

---

# GOLDEN RULE

Build like this is going to a paying client.

Do not optimize for:

"AI generated the website."

Optimize for:

"Nobody can tell this was casually generated by AI."

Every phase must follow:

INSPECT → IMPLEMENT → TEST → REVIEW → FIX → RECHECK

Never skip the review loop.
