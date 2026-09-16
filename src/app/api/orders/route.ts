import { NextRequest, NextResponse } from "next/server";
import { MOCK_PRODUCTS } from "@/data/mockProducts";
import { WhatsAppService } from "@/lib/whatsappService";

export async function POST(req: NextRequest) {
  try {
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

    // 2. Server-side price validation (Phase 35.1)
    let validatedSubtotal = 0;
    const validatedItems = items.map((item: any) => {
      const catalogItem = MOCK_PRODUCTS.find((p) => p.id === item.productId);
      const unitPrice = catalogItem ? catalogItem.price : item.unitPrice || 0;
      const quantity = Math.max(1, parseInt(item.quantity, 10) || 1);
      const lineTotal = unitPrice * quantity;
      validatedSubtotal += lineTotal;

      return {
        id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        productId: item.productId,
        productName: catalogItem ? catalogItem.name : item.productName,
        woodType: item.woodType || catalogItem?.woodType,
        finish: item.finish || catalogItem?.finish,
        unitPrice,
        quantity,
        subtotal: lineTotal,
      };
    });

    // 3. Unique server-generated order reference
    const orderNumber = `ORD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder = {
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "ENQUIRY_RECEIVED",
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
      discount: 0,
      deliveryFee: 0,
      totalAmount: validatedSubtotal,
      source: "WEBSITE_ENQUIRY",
    };

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
    const waText = `*Enquiry Reference: ${orderNumber}*\nName: ${newOrder.customer.fullName}\nItems: ${validatedItems.length} pieces selected\nEstimated Value: ₹${validatedSubtotal.toLocaleString("en-IN")}`;
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
