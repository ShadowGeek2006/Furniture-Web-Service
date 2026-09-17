/**
 * ⚠️ KNOWN LIMITATION — not currently used by the admin UI.
 *
 * `orderService.ts` reads/writes orders and invoices via `localStorage`,
 * which only exists in the browser. This route runs as a Vercel serverless
 * function (no `window`), so `getStoredInvoices()` / `generateInvoiceForOrder()`
 * can only ever see the hardcoded seed data here — never a real order placed
 * through the site. The admin pages (`/admin/orders/[id]`, `/admin/invoices`)
 * bypass this route entirely and call `orderService.ts` directly client-side,
 * which is why invoice generation works there today.
 *
 * Wiring this endpoint up for real (e.g. for a future mobile app or external
 * integration) requires a real datastore — e.g. Vercel Postgres, Vercel KV,
 * or Supabase — behind `orderService.ts`, replacing the `localStorage` calls
 * with reads/writes to that store. Until then, treat this route as a stub.
 */
import { NextRequest, NextResponse } from "next/server";
import { getStoredInvoices, generateInvoiceForOrder } from "@/lib/orderService";

export async function GET() {
  try {
    const invoices = getStoredInvoices();
    return NextResponse.json({ invoices });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch invoices" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId, taxMode, isInterState, paymentStatus, paymentMethod, notes } = body;

    if (!orderId) {
      return NextResponse.json({ error: "orderId is required" }, { status: 400 });
    }

    const invoice = generateInvoiceForOrder({
      orderId,
      taxMode: taxMode || "EXCLUSIVE",
      isInterState: Boolean(isInterState),
      paymentStatus: paymentStatus || "PAID",
      paymentMethod: paymentMethod || "UPI",
      notes,
    });

    return NextResponse.json({ success: true, invoice }, { status: 201 });
  } catch (err: any) {
    console.error("Invoice creation error:", err);
    return NextResponse.json({ error: err.message || "Failed to generate invoice" }, { status: 500 });
  }
}
