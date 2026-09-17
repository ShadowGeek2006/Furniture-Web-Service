import { NextRequest, NextResponse } from "next/server";
import { listInvoices, generateInvoiceForOrder } from "@/lib/orderService";

export async function GET() {
  try {
    const invoices = await listInvoices();
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

    const invoice = await generateInvoiceForOrder({
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
    const message = err.message || "Failed to generate invoice";
    // "Order not found" -> 404; "already has a finalized invoice" / empty
    // cart -> 409 Conflict (the request is well-formed but the order's
    // current state doesn't allow it); anything else -> 500.
    const status = message.includes("not found")
      ? 404
      : message.includes("already") || message.includes("no items")
      ? 409
      : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
