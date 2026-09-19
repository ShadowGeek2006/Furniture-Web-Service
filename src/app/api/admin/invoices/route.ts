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
