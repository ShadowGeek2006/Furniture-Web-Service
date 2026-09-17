/**
 * Minimal in-memory rate limiter for Next.js Route Handlers.
 *
 * Scope/limitation, stated plainly: this keeps counts in a `Map` inside the
 * running Node process. That's correct and sufficient for this app's actual
 * deployment shape — a single `next start` process on the client's own
 * server/laptop, not a fleet of serverless instances behind a load
 * balancer. If this is ever deployed to a multi-instance/serverless
 * platform (e.g. Vercel), each instance would track its own counts
 * independently, which weakens (but doesn't remove) the protection — at
 * that point, swap this for a shared store (Redis, Upstash, etc.). Noted
 * here and in the security report rather than silently assumed away.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

// Prevents unbounded memory growth from a long-running process that gets
// hit by many distinct IPs over time.
const MAX_TRACKED_KEYS = 5000;

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

/**
 * @param key A string identifying the caller + the limited action, e.g. `login:203.0.113.4`.
 * @param limit Max requests allowed within the window.
 * @param windowMs Window size in milliseconds.
 */
export function checkRateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    if (buckets.size >= MAX_TRACKED_KEYS) {
      // Cheap eviction under memory pressure: drop the oldest-looking entry.
      // A small false-negative here (an occasional early reset) is an
      // acceptable trade for never growing unbounded.
      const firstKey = buckets.keys().next().value;
      if (firstKey) buckets.delete(firstKey);
    }
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, retryAfterSeconds: 0 };
  }

  if (existing.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil((existing.resetAt - now) / 1000),
    };
  }

  existing.count += 1;
  return { allowed: true, remaining: limit - existing.count, retryAfterSeconds: 0 };
}

/** Best-effort client IP extraction behind a reverse proxy (or direct connection during local dev). */
export function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}
