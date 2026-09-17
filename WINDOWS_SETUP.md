# Running Artisan Furniture Studio locally on Windows

Target path: `C:\Work\Furniture Web Service`

## 1. Prerequisites (one-time)

1. Install **Node.js 20 LTS** (or newer) from https://nodejs.org — the Windows Installer (.msi), default options are fine.
   Verify it installed correctly by opening **PowerShell** or **Command Prompt** and running:
   ```
   node -v
   npm -v
   ```
   You should see version numbers (Node 20.x or higher).

## 2. Unzip the project

1. Extract the delivered `.zip` file so its contents land at:
   ```
   C:\Work\Furniture Web Service
   ```
   (i.e. `C:\Work\Furniture Web Service\package.json` should exist directly — not nested one folder deeper.)

## 3. Configure environment variables

1. In `C:\Work\Furniture Web Service`, copy `.env.example` to a new file named `.env`.
   In File Explorer: copy `.env.example`, paste it, rename the copy to `.env`.
   Or in PowerShell, from inside that folder:
   ```
   copy .env.example .env
   ```
2. Open `.env` in Notepad (or any text editor) and fill in real values:
   - `ADMIN_PANEL_PASSWORD` — the password the shop owner will use to log into `/admin`. Pick something strong and unique.
   - `ADMIN_SESSION_SECRET` — a long random string. Generate one with PowerShell:
     ```
     powershell -Command "[System.Guid]::NewGuid().ToString() + [System.Guid]::NewGuid().ToString()"
     ```
     Paste the result in as the value (remove the dashes if you like, doesn't matter — just needs to be long and random).
   - `STORE_NAME`, `STORE_ADDRESS`, `STORE_PHONE`, `STORE_EMAIL`, `STORE_GSTIN`, `STORE_STATE`, `STORE_STATE_CODE` — the real shop details. These print on every GST tax invoice, so get the GSTIN right.
   - `ADMIN_WHATSAPP_NUMBER` — the shop's WhatsApp number (with country code, no `+` or spaces, e.g. `919876543210`) that receives new-enquiry alerts.
   - `WHATSAPP_API_TOKEN` / `WHATSAPP_PHONE_NUMBER_ID` — only needed if you want *real* outgoing WhatsApp messages sent automatically via Meta's Cloud API. Leave blank for now — the app still works fine without these; it just logs what it would have sent to the terminal instead, and every order still gets a ready-to-tap `wa.me` link either way.
   - `DATA_DIR` — leave as `./data` unless you specifically want order/invoice data stored somewhere else on disk.

## 4. Install dependencies and build

Open PowerShell or Command Prompt, then:
```
cd "C:\Work\Furniture Web Service"
npm install
npm run build
```
`npm install` takes a couple of minutes the first time. `npm run build` should finish with a green "✓ Compiled successfully" — if it errors, stop here and send the full error text back for a fix; don't try to run it with a broken build.

## 5. Run it

For a normal production run (recommended for actually showing the client / using day-to-day):
```
npm run start
```
This starts the server at **http://localhost:3000**. Leave this terminal window open — closing it stops the server. Visit:
- `http://localhost:3000/shop` — the public storefront customers would order from
- `http://localhost:3000/admin/login` — the staff dashboard (log in with `ADMIN_PANEL_PASSWORD` from your `.env`)

To stop the server, click into that terminal window and press `Ctrl + C`.

If you'd rather run it in development mode (auto-reloads on code changes, slightly slower, shows more debug detail) use `npm run dev` instead of `npm run build` + `npm run start`.

## 6. Where the data lives

Every order a customer places, and every invoice the admin generates, is saved as a real file on disk at:
```
C:\Work\Furniture Web Service\data\orders.json
C:\Work\Furniture Web Service\data\invoices.json
```
This is the actual backend — it's what makes the admin dashboard see real customer orders now, which it could not do before (see the handoff report for why). Back this `data` folder up periodically (copy it somewhere safe) — it's the shop's real order/invoice history.

## 7. Keeping it running long-term (optional)

`npm run start` only runs while that terminal window is open. For a machine that should keep serving orders even after a reboot or logout, look into running it as a Windows background service — for example with `pm2` (`npm install -g pm2`, then `pm2 start npm --name furniture-site -- start`, then `pm2 save` and `pm2-startup install`) or NSSM (Non-Sucking Service Manager). This is optional and not required to get the site working today — flag it to Ayush if the client wants "always-on" hosting rather than "run it when needed."

## 8. Troubleshooting

- **"npm is not recognized"** — Node.js wasn't installed correctly, or you need to close and reopen the terminal after installing it.
- **Port 3000 already in use** — another app is using that port. Run `npm run start -- -p 3001` to use port 3001 instead, then visit `http://localhost:3001`.
- **Admin login says "Admin login is not configured"** — `ADMIN_PANEL_PASSWORD` (or `ADMIN_SESSION_SECRET`) is missing from `.env`, or the `.env` file isn't in the same folder as `package.json`.
- **Orders placed on the storefront don't show up in `/admin/orders`** — check that only one copy of the app is running (e.g. you didn't start it twice on two different ports with two different `data` folders), and that the `data` folder is writable (not read-only / not inside a OneDrive-synced folder that's blocking writes).
