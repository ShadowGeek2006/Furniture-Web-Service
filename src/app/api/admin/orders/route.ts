import { NextResponse } from "next/server";
import { listOrders } from "@/lib/orderService";

// Protected by middleware.ts (matcher includes /api/admin/:path*) — only
// reachable with a valid admin session cookie.
export async function GET() {
  try {
    const orders = await listOrders();
    return NextResponse.json({ orders });
  } catch (err) {
    console.error("Failed to list orders:", err);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
