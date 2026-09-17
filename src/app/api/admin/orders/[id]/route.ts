import { NextRequest, NextResponse } from "next/server";
import { getOrderById, updateOrder } from "@/lib/orderService";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await getOrderById(id);
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }
  return NextResponse.json({ order });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = await req.json();
    // Admin is authenticated (middleware-enforced) and this is the
    // legitimate negotiated-quote workflow: the admin may set arbitrary
    // line-item prices, discounts and a delivery fee. What's never trusted
    // from the client is the *derived* totals — updateOrder() always
    // recomputes subtotal/totalAmount from the items it's given rather than
    // accepting a raw client-supplied total.
    const order = await updateOrder(id, {
      items: body.items,
      discount: typeof body.discount === "number" ? body.discount : undefined,
      deliveryFee: typeof body.deliveryFee === "number" ? body.deliveryFee : undefined,
      status: body.status,
    });
    return NextResponse.json({ success: true, order });
  } catch (err: any) {
    console.error("Order update error:", err);
    const message = err.message || "Failed to update order";
    const status = message.includes("not found") ? 404 : message.includes("locked") ? 409 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
