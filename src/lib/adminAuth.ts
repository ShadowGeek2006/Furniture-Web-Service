/**
 * Lightweight session helper for the single-admin staff portal.
 *
 * There is no user database, so this issues one signed, stateless session
 * token (not the raw password) stored in an httpOnly cookie. The signature
 * is an HMAC-SHA256 of a fixed label using ADMIN_SESSION_SECRET, verified
 * on every request to /admin/* by middleware.ts.
 *
 * This is intentionally simple for a solo-shop-owner admin panel. If the
 * business grows to multiple staff accounts with individual permissions,
 * replace this with real per-user authentication.
 */

export const ADMIN_SESSION_COOKIE = "admin_session";
const SESSION_LABEL = "artisan-furniture-admin-authenticated";

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      "ADMIN_SESSION_SECRET is not set (or too short). Set a long random value " +
        "in your environment before deploying — see .env.example."
    );
  }
  return secret;
}

async function hmacHex(message: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(signatureBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Produces the cookie value to set after a successful password check. */
export async function createSessionToken(): Promise<string> {
  return hmacHex(SESSION_LABEL, getSecret());
}

/** Verifies a cookie value against the expected signature. */
export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const expected = await hmacHex(SESSION_LABEL, getSecret());
  if (token.length !== expected.length) return false;
  // Constant-time-ish comparison.
  let mismatch = 0;
  for (let i = 0; i < token.length; i++) {
    mismatch |= token.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return mismatch === 0;
}

/** Checks the submitted login password against ADMIN_PANEL_PASSWORD. */
export function isCorrectPassword(candidate: string): boolean {
  const expected = process.env.ADMIN_PANEL_PASSWORD;
  if (!expected) {
    throw new Error(
      "ADMIN_PANEL_PASSWORD is not set. Set it in your environment before deploying — see .env.example."
    );
  }
  return candidate === expected;
}
