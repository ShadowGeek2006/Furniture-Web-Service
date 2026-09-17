/**
 * Order and invoice business logic — server-side only.
 *
 * Previously this module read/wrote everything via `localStorage`, which
 * only exists in a browser. Admin pages imported it directly as client
 * components, which meant every "order" and "invoice" only ever lived in
 * whichever single browser tab created it — a customer's checkout and the
 * shop owner's admin panel were looking at two completely separate,
 * invisible-to-each-other copies of the data. That was the core bug behind
 * "build the backend": there wasn't one.
 *
 * This module now owns all order/invoice reads and writes through
 * `orderStore.ts` (real server-side JSON-file persistence) and is only
 * ever imported from API routes (`src/app/api/**`), never from a "use
 * client" component. Admin pages talk to it exclusively over `fetch()`
 * against those routes — see `/admin/orders/page.tsx` etc.
 */
import { randomUUID } from "crypto";
import { Order, OrderItem, OrderStatus } from "@/types/order";
import { Invoice, InvoiceLineItem, TaxMode } from "@/types/invoice";
import { readOrders, writeOrders, readInvoices, writeInvoices } from "@/lib/orderStore";

// Real business details belong in the environment, not hardcoded in source —
// see .env.example. Falls back to a clearly-marked placeholder so an
// unconfigured deployment fails loudly on the printed invoice rather than
// silently shipping a wrong GSTIN.
function getStoreDetails() {
  return {
    name: process.env.STORE_NAME || "[CLIENT_NAME] Atelier",
    address: process.env.STORE_ADDRESS || "[CLIENT_ADDRESS — set STORE_ADDRESS in .env]",
    phone: process.env.STORE_PHONE || "[CLIENT_PHONE — set STORE_PHONE in .env]",
    email: process.env.STORE_EMAIL || "[CLIENT_EMAIL — set STORE_EMAIL in .env]",
    gstin: process.env.STORE_GSTIN || "[STORE_GSTIN — set STORE_GSTIN in .env]",
    state: process.env.STORE_STATE || "Uttar Pradesh",
    stateCode: process.env.STORE_STATE_CODE || "09",
  };
}

function nextOrderNumber(existing: Order[]): string {
  const year = new Date().getFullYear();
  const yearPrefix = `ORD-${year}-`;
  const maxSeq = existing
    .map((o) => o.orderNumber)
    .filter((n) => n.startsWith(yearPrefix))
    .map((n) => parseInt(n.slice(yearPrefix.length), 10))
    .filter((n) => Number.isFinite(n))
    .reduce((max, n) => Math.max(max, n), 1000);
  return `${yearPrefix}${maxSeq + 1}`;
}

function nextInvoiceNumber(existing: Invoice[]): string {
  const year = new Date().getFullYear();
  const yearPrefix = `INV-${year}-`;
  const maxSeq = existing
    .map((i) => i.invoiceNumber)
    .filter((n) => n.startsWith(yearPrefix))
    .map((n) => parseInt(n.slice(yearPrefix.length), 10))
    .filter((n) => Number.isFinite(n))
    .reduce((max, n) => Math.max(max, n), 0);
  return `${yearPrefix}${String(maxSeq + 1).padStart(4, "0")}`;
}

export interface CreateOrderParams {
  customer: Order["customer"];
  items: OrderItem[];
  subtotal: number;
  source: Order["source"];
}

/** Creates and persists a new order. Items/pricing must already be server-validated by the caller (see /api/orders). */
export async function createOrder(params: CreateOrderParams): Promise<Order> {
  const orders = await readOrders();
  const now = new Date().toISOString();
  const order: Order = {
    id: `ord-${randomUUID()}`,
    orderNumber: nextOrderNumber(orders),
    createdAt: now,
    updatedAt: now,
    status: "ENQUIRY_RECEIVED",
    customer: params.customer,
    items: params.items,
    subtotal: params.subtotal,
    discount: 0,
    deliveryFee: 0,
    totalAmount: params.subtotal,
    source: params.source,
  };
  orders.unshift(order);
  await writeOrders(orders);
  return order;
}

export async function listOrders(): Promise<Order[]> {
  return readOrders();
}

export async function getOrderById(id: string): Promise<Order | undefined> {
  const orders = await readOrders();
  return orders.find((o) => o.id === id || o.orderNumber === id);
}

export interface OrderEditableFields {
  items?: OrderItem[];
  discount?: number;
  deliveryFee?: number;
  status?: OrderStatus;
}

/** Applies a partial update to an order (used by the admin order workspace: item edits, discount/delivery fee, manual status changes). Recomputes subtotal/total server-side from whatever items ended up in the order — the admin can set arbitrary line-item prices (that's the intended negotiated-quote workflow), but the totals themselves are always derived, never taken as a raw client-supplied number. */
export async function updateOrder(id: string, patch: OrderEditableFields): Promise<Order> {
  const orders = await readOrders();
  const index = orders.findIndex((o) => o.id === id);
  if (index === -1) throw new Error("Order not found");

  const existing = orders[index];
  if (existing.status === "BILLED" && patch.status !== "CANCELLED") {
    // A billed order is a locked, immutable financial record — matches the
    // "This order has been finalized and locked" messaging already in the
    // admin UI. Cancelling a billed order is still allowed (real businesses
    // do issue cancellations), but re-editing its priced items is not.
    throw new Error("This order has been billed and is locked. It cannot be edited further.");
  }

  const items = patch.items ?? existing.items;
  const discount = patch.discount ?? existing.discount;
  const deliveryFee = patch.deliveryFee ?? existing.deliveryFee;
  const subtotal = items.reduce((sum, it) => sum + it.unitPrice * it.quantity, 0);

  const updated: Order = {
    ...existing,
    items: items.map((it) => ({ ...it, subtotal: it.unitPrice * it.quantity })),
    discount,
    deliveryFee,
    subtotal,
    totalAmount: Math.max(0, subtotal - discount) + deliveryFee,
    status: patch.status ?? existing.status,
    updatedAt: new Date().toISOString(),
  };

  orders[index] = updated;
  await writeOrders(orders);
  return updated;
}

export async function listInvoices(): Promise<Invoice[]> {
  return readInvoices();
}

export async function getInvoiceById(id: string): Promise<Invoice | undefined> {
  const invoices = await readInvoices();
  return invoices.find((inv) => inv.id === id || inv.invoiceNumber === id);
}

export interface GenerateInvoiceParams {
  orderId: string;
  taxMode: TaxMode;
  isInterState: boolean;
  paymentStatus: "PAID" | "PENDING" | "PARTIAL";
  paymentMethod: "CASH" | "UPI" | "BANK_TRANSFER" | "NEFT";
  notes?: string;
}

const GST_RATE = 18; // Standard furniture (HSN 9403) GST rate.

/** Generates and persists a GST invoice for an order, then locks the order as BILLED. All tax math happens here, server-side, from the order's own stored item prices — never from a client-supplied total. */
export async function generateInvoiceForOrder(params: GenerateInvoiceParams): Promise<Invoice> {
  const orders = await readOrders();
  const orderIndex = orders.findIndex((o) => o.id === params.orderId || o.orderNumber === params.orderId);
  if (orderIndex === -1) throw new Error("Order not found");
  const order = orders[orderIndex];

  if (order.status === "BILLED" && order.invoiceId) {
    throw new Error("This order already has a finalized invoice.");
  }
  if (order.items.length === 0) {
    throw new Error("Cannot bill an order with no items.");
  }

  const invoices = await readInvoices();
  const invoiceNumber = nextInvoiceNumber(invoices);

  let totalTaxable = 0;
  let totalCgst = 0;
  let totalSgst = 0;
  let totalIgst = 0;

  const invoiceItems: InvoiceLineItem[] = order.items.map((item, idx) => {
    const rawTotal = item.unitPrice * item.quantity;
    let taxable = rawTotal;
    let cgst = 0;
    let sgst = 0;
    let igst = 0;

    if (params.taxMode === "INCLUSIVE") {
      taxable = Math.round((rawTotal * 100) / (100 + GST_RATE));
      const taxPart = rawTotal - taxable;
      if (params.isInterState) {
        igst = taxPart;
      } else {
        cgst = Math.round(taxPart / 2);
        sgst = taxPart - cgst;
      }
    } else if (params.taxMode === "EXCLUSIVE") {
      taxable = rawTotal;
      const taxPart = Math.round((taxable * GST_RATE) / 100);
      if (params.isInterState) {
        igst = taxPart;
      } else {
        cgst = Math.round(taxPart / 2);
        sgst = taxPart - cgst;
      }
    } // EXEMPT: tax remains 0.

    totalTaxable += taxable;
    totalCgst += cgst;
    totalSgst += sgst;
    totalIgst += igst;

    return {
      id: `line-${idx + 1}`,
      productName: `${item.productName}${item.woodType ? ` (${item.woodType}, ${item.finish})` : ""}`,
      hsnCode: "9403",
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      discount: 0,
      taxableValue: taxable,
      gstRate: params.taxMode === "EXEMPT" ? 0 : GST_RATE,
      cgstAmount: cgst,
      sgstAmount: sgst,
      igstAmount: igst,
      totalAmount: taxable + cgst + sgst + igst,
    };
  });

  const grandTotal =
    totalTaxable + totalCgst + totalSgst + totalIgst - order.discount + order.deliveryFee;

  const newInvoice: Invoice = {
    id: `inv-${randomUUID()}`,
    invoiceNumber,
    orderId: order.id,
    orderNumber: order.orderNumber,
    issueDate: new Date().toISOString(),
    storeDetails: getStoreDetails(),
    customerDetails: {
      fullName: order.customer.fullName,
      phone: order.customer.phone,
      email: order.customer.email,
      billingAddress: order.customer.deliveryAddress,
      shippingAddress: order.customer.deliveryAddress,
      state: order.customer.city.split(",").pop()?.trim() || getStoreDetails().state,
    },
    items: invoiceItems,
    subtotal: order.subtotal,
    totalDiscount: order.discount,
    taxableAmount: totalTaxable,
    totalCgst,
    totalSgst,
    totalIgst,
    deliveryCharges: order.deliveryFee,
    grandTotal,
    paymentStatus: params.paymentStatus,
    paymentMethod: params.paymentMethod,
    notes: params.notes || "Official Tax Invoice. Timber guaranteed under warranty.",
  };

  invoices.unshift(newInvoice);
  await writeInvoices(invoices);

  orders[orderIndex] = {
    ...order,
    status: "BILLED",
    invoiceId: newInvoice.id,
    updatedAt: new Date().toISOString(),
  };
  await writeOrders(orders);

  return newInvoice;
}
