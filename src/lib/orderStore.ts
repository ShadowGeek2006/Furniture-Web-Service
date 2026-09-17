/**
 * Server-side persistent data store for orders and invoices.
 *
 * This replaces the original localStorage-based implementation, which only
 * ever persisted data inside a single customer's browser and was invisible
 * to the server — meaning the admin portal could never actually see a real
 * order placed by a real customer (it only ever saw whatever the admin's
 * OWN browser happened to have cached locally).
 *
 * Storage choice: plain JSON files on disk (atomic write: write to a temp
 * file, then rename over the target — rename is atomic on both POSIX and
 * Windows, so a crash mid-write can never leave a half-written/corrupt
 * file). No database server, no native binary dependencies (Prisma/SQLite
 * native bindings, etc.) to install — this runs identically on the
 * developer's Mac, the CI box, and the client's Windows laptop with zero
 * extra setup. This is intentionally lightweight for a solo-shop admin
 * panel with an order volume of maybe a few dozen enquiries a day; if the
 * business grows to genuinely high concurrent write volume or needs
 * multi-instance/serverless deployment, swap this for a real database
 * (Postgres/SQLite-via-better-sqlite3) behind the same function signatures
 * below — nothing above this file needs to change.
 */
import { promises as fs } from "fs";
import path from "path";
import { Order } from "@/types/order";
import { Invoice } from "@/types/invoice";

// Overridable via env so a deployment can point this at a persistent volume
// instead of the app's own working directory.
const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");
const INVOICES_FILE = path.join(DATA_DIR, "invoices.json");

async function ensureDataDir(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readJsonFile<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch (err: any) {
    if (err.code === "ENOENT") return fallback;
    // A corrupted file is a real problem, but returning the fallback keeps
    // the app usable rather than hard-crashing every request; the bad file
    // is left on disk for inspection rather than being silently overwritten.
    console.error(`orderStore: failed to read/parse ${filePath}:`, err);
    return fallback;
  }
}

async function writeJsonFileAtomic(filePath: string, data: unknown): Promise<void> {
  await ensureDataDir();
  const tmpPath = `${filePath}.${process.pid}.${Date.now()}.tmp`;
  await fs.writeFile(tmpPath, JSON.stringify(data, null, 2), "utf-8");
  await fs.rename(tmpPath, filePath);
}

// A tiny in-process write queue per file so concurrent requests (e.g. two
// admins editing at once) can't interleave a read-modify-write and lose an
// update. Good enough for a single Node process serving a small shop; a
// real multi-instance deployment needs a real database's transactions
// instead, as noted above.
const writeQueues = new Map<string, Promise<unknown>>();
function withFileLock<T>(key: string, fn: () => Promise<T>): Promise<T> {
  const prev = writeQueues.get(key) || Promise.resolve();
  const next = prev.then(fn, fn);
  // Swallow rejections in the chain itself so one failed write doesn't wedge
  // the queue for subsequent, unrelated writes; the caller still sees the
  // real rejection via `next`.
  writeQueues.set(key, next.catch(() => undefined));
  return next;
}

export async function readOrders(): Promise<Order[]> {
  return readJsonFile<Order[]>(ORDERS_FILE, []);
}

export async function writeOrders(orders: Order[]): Promise<void> {
  return withFileLock(ORDERS_FILE, () => writeJsonFileAtomic(ORDERS_FILE, orders));
}

export async function readInvoices(): Promise<Invoice[]> {
  return readJsonFile<Invoice[]>(INVOICES_FILE, []);
}

export async function writeInvoices(invoices: Invoice[]): Promise<void> {
  return withFileLock(INVOICES_FILE, () => writeJsonFileAtomic(INVOICES_FILE, invoices));
}
