import { NextRequest, NextResponse } from "next/server";
import { MOCK_PRODUCTS } from "@/data/mockProducts";
import { WhatsAppService } from "@/lib/whatsappService";
import { createOrder } from "@/lib/orderService";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  try {
    // Spam/abuse protection on the public enquiry endpoint — 10 enquiries
    // per IP per 10 minutes is generous for a real customer, tight enough to
    // blunt a scripted flood.
    const ip = getClientIp(req);
    const rl = checkRateLimit(`orders:${ip}`, 10, 10 * 60 * 1000);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again shortly." },
        { status: 429, headers: { "Retry-After": String(rl.retryAfterSeconds) } }
      );
    }

    const body = await req.json();
    const { customer, items, notes } = body;

    // 1. Validate customer input
    if (!customer?.fullName || !customer?.phone || !customer?.city || !customer?.deliveryAddress) {
      return NextResponse.json(
        { error: "Full Name, Phone, City, and Delivery Address are required." },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Cart cannot be empty." },
        { status: 400 }
      );
    }

    // 2. Server-side price validation. Every item must resolve to a real
    // catalog entry — price and name always come from MOCK_PRODUCTS, never
    // from the request body. An item whose productId isn't a real product is
    // rejected outright rather than falling back to any client-supplied
    // price/name, which previously let a request with a fake productId name
    // its own price (e.g. `{"productId":"anything","unitPrice":1}` would
    // have been accepted at ₹1 — confirmed and closed here).
    let validatedSubtotal = 0;
    const validatedItems: any[] = [];
    for (const item of items) {
      const catalogItem = MOCK_PRODUCTS.find((p) => p.id === item?.productId);
      if (!catalogItem) {
        return NextResponse.json(
          { error: `Invalid product in cart: "${item?.productId}" is not a recognized item.` },
          { status: 400 }
        );
      }
      const quantity = Math.max(1, Math.min(50, parseInt(item.quantity, 10) || 1));
      const unitPrice = catalogItem.price;
      const lineTotal = unitPrice * quantity;
      validatedSubtotal += lineTotal;

      validatedItems.push({
        id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        productId: catalogItem.id,
        productName: catalogItem.name,
        woodType: item.woodType || catalogItem.woodType,
        finish: item.finish || catalogItem.finish,
        unitPrice,
        quantity,
        subtotal: lineTotal,
      });
    }

    // 3. Persist the order server-side — this is the real fix: previously
    // this route built an order object and handed it back in the response,
    // but never saved it anywhere, so it only ever existed in that one HTTP
    // response. The admin dashboard (reading from the same store via
    // orderService) can now actually see it.
    const newOrder = await createOrder({
      customer: {
        fullName: customer.fullName.trim(),
        phone: customer.phone.replace(/[^0-9]/g, "").slice(-10),
        email: customer.email?.trim() || "",
        city: customer.city.trim(),
        deliveryAddress: customer.deliveryAddress.trim(),
        notes: notes?.trim() || customer.notes?.trim() || "",
      },
      items: validatedItems,
      subtotal: validatedSubtotal,
      source: "WEBSITE_ENQUIRY",
    });

    // 4. Automated WhatsApp Cloud API Dispatch to Admin and Customer
    await Promise.allSettled([
      WhatsAppService.notifyAdminNewOrder({
        orderNumber: newOrder.orderNumber,
        customerName: newOrder.customer.fullName,
        customerPhone: newOrder.customer.phone,
        deliveryCity: newOrder.customer.city,
        deliveryAddress: newOrder.customer.deliveryAddress,
        items: validatedItems.map((i) => ({
          name: i.productName,
          quantity: i.quantity,
          price: i.unitPrice,
        })),
        totalAmount: newOrder.totalAmount,
      }),
      WhatsAppService.sendCustomerConfirmation({
        orderNumber: newOrder.orderNumber,
        customerName: newOrder.customer.fullName,
        customerPhone: newOrder.customer.phone,
        deliveryCity: newOrder.customer.city,
        deliveryAddress: newOrder.customer.deliveryAddress,
        items: validatedItems.map((i) => ({
          name: i.productName,
          quantity: i.quantity,
          price: i.unitPrice,
        })),
        totalAmount: newOrder.totalAmount,
      }),
    ]);

    // 5. Pre-formatted WhatsApp fallback link for immediate customer reassurance
    const shopPhoneNumber = process.env.ADMIN_WHATSAPP_NUMBER || "919999999999";
    const waText = `*Enquiry Reference: ${newOrder.orderNumber}*\nName: ${newOrder.customer.fullName}\nItems: ${validatedItems.length} pieces selected\nEstimated Value: ₹${validatedSubtotal.toLocaleString("en-IN")}`;
    const waLink = `https://wa.me/${shopPhoneNumber}?text=${encodeURIComponent(waText)}`;

    return NextResponse.json(
      {
        success: true,
        order: newOrder,
        waLink,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Internal server error while processing your furniture enquiry." },
      { status: 500 }
    );
  }
}
