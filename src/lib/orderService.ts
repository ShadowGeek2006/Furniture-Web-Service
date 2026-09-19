import { Order, OrderItem } from "@/types/order";
import { Invoice, InvoiceLineItem, TaxMode } from "@/types/invoice";

const ORDERS_KEY = "artisan_furniture_orders";
const INVOICES_KEY = "artisan_furniture_invoices";

const SEED_ORDERS: Order[] = [
  {
    id: "ord-001",
    orderNumber: "ORD-2026-1042",
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    status: "ENQUIRY_RECEIVED",
    customer: {
      fullName: "Vikram Malhotra",
      phone: "9876543210",
      email: "vikram.malhotra@example.com",
      city: "Lucknow, Uttar Pradesh",
      deliveryAddress: "Villa 14, Gomti Nagar Extension, Lucknow - 226010",
      notes: "Need the Honey Teak polish to match existing dining chairs.",
    },
    items: [
      {
        id: "item-1",
        productId: "prod-001",
        productName: "Malabar 6-Seater Dining Table",
        woodType: "Solid Teak",
        finish: "Honey Teak",
        unitPrice: 48500,
        quantity: 1,
        subtotal: 48500,
      },
      {
        id: "item-2",
        productId: "prod-003",
        productName: "Mysore Cane-Back Accent Chair",
        woodType: "Solid Teak",
        finish: "Honey Teak",
        unitPrice: 18500,
        quantity: 2,
        subtotal: 37000,
      },
    ],
    subtotal: 85500,
    discount: 3500,
    deliveryFee: 1500,
    totalAmount: 83500,
    source: "WEBSITE_ENQUIRY",
  },
  {
    id: "ord-002",
    orderNumber: "ORD-2026-1039",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    status: "BILLED",
    invoiceId: "inv-001",
    customer: {
      fullName: "Ananya Roy",
      phone: "9811223344",
      email: "ananya.roy@example.com",
      city: "New Delhi",
      deliveryAddress: "Flat 402, Green Park Main, New Delhi - 110016",
      notes: "Please pack with extra corner foam protectors for transit.",
    },
    items: [
      {
        id: "item-3",
        productId: "prod-002",
        productName: "Chola King Platform Bed with Fluted Headboard",
        woodType: "Sheesham (Indian Rosewood)",
        finish: "Natural Walnut",
        unitPrice: 62000,
        quantity: 1,
        subtotal: 62000,
      },
    ],
    subtotal: 62000,
    discount: 2000,
    deliveryFee: 3000,
    totalAmount: 63000,
    source: "WEBSITE_ENQUIRY",
  },
];

const SEED_INVOICE: Invoice = {
  id: "inv-001",
  invoiceNumber: "INV-2026-0001",
  orderId: "ord-002",
  orderNumber: "ORD-2026-1039",
  issueDate: new Date(Date.now() - 86400000 * 1).toISOString(),
  storeDetails: {
    name: "Maa Samay Sitla Furniture and Electronics",
    address: "Dubari, Madhuban, Mau, Uttar Pradesh, India - 221601",
    phone: "YOUR_PHONE",
    email: "ayushayadav9621@gmail.com",
    gstin: "",
    state: "Uttar Pradesh",
    stateCode: "09",
  },
  customerDetails: {
    fullName: "Ananya Roy",
    phone: "9811223344",
    email: "ananya.roy@example.com",
    billingAddress: "Flat 402, Green Park Main, New Delhi - 110016",
    shippingAddress: "Flat 402, Green Park Main, New Delhi - 110016",
    state: "Delhi",
  },
  items: [
    {
      id: "line-1",
      productName: "Chola King Platform Bed with Fluted Headboard (Sheesham / Walnut)",
      hsnCode: "9403",
      quantity: 1,
      unitPrice: 60000,
      discount: 0,
      taxableValue: 60000,
      gstRate: 18,
      cgstAmount: 0,
      sgstAmount: 0,
      igstAmount: 10800,
      totalAmount: 70800,
    },
  ],
  subtotal: 60000,
  totalDiscount: 0,
  taxableAmount: 60000,
  totalCgst: 0,
  totalSgst: 0,
  totalIgst: 10800,
  deliveryCharges: 3000,
  grandTotal: 73800,
  paymentStatus: "PAID",
  paymentMethod: "UPI",
  notes: "Full payment received via UPI. White-glove installation scheduled.",
};

export function getStoredOrders(): Order[] {
  if (typeof window === "undefined") return SEED_ORDERS;
  const raw = localStorage.getItem(ORDERS_KEY);
  if (!raw) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(SEED_ORDERS));
    return SEED_ORDERS;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return SEED_ORDERS;
  }
}

export function saveStoredOrders(orders: Order[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function getOrderById(id: string): Order | undefined {
  const orders = getStoredOrders();
  return orders.find((o) => o.id === id || o.orderNumber === id);
}

export function updateOrder(updated: Order): void {
  const orders = getStoredOrders();
  const index = orders.findIndex((o) => o.id === updated.id);
  if (index > -1) {
    orders[index] = { ...updated, updatedAt: new Date().toISOString() };
  } else {
    orders.unshift(updated);
  }
  saveStoredOrders(orders);
}

export function getStoredInvoices(): Invoice[] {
  if (typeof window === "undefined") return [SEED_INVOICE];
  const raw = localStorage.getItem(INVOICES_KEY);
  if (!raw) {
    localStorage.setItem(INVOICES_KEY, JSON.stringify([SEED_INVOICE]));
    return [SEED_INVOICE];
  }
  try {
    return JSON.parse(raw);
  } catch {
    return [SEED_INVOICE];
  }
}

export function saveStoredInvoices(invoices: Invoice[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(INVOICES_KEY, JSON.stringify(invoices));
}

export function getInvoiceById(id: string): Invoice | undefined {
  const invoices = getStoredInvoices();
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

export function generateInvoiceForOrder(params: GenerateInvoiceParams): Invoice {
  const order = getOrderById(params.orderId);
  if (!order) throw new Error("Order not found");

  const invoices = getStoredInvoices();
  const nextSeq = (invoices.length + 1).toString().padStart(4, "0");
  const invoiceNumber = `INV-${new Date().getFullYear()}-${nextSeq}`;

  // GST Calculations per Phase 35
  const gstRate = 18; // Standard furniture GST rate
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
      taxable = Math.round((rawTotal * 100) / (100 + gstRate));
      const taxPart = rawTotal - taxable;
      if (params.isInterState) {
        igst = taxPart;
      } else {
        cgst = Math.round(taxPart / 2);
        sgst = taxPart - cgst;
      }
    } else if (params.taxMode === "EXCLUSIVE") {
      taxable = rawTotal;
      const taxPart = Math.round((taxable * gstRate) / 100);
      if (params.isInterState) {
        igst = taxPart;
      } else {
        cgst = Math.round(taxPart / 2);
        sgst = taxPart - cgst;
      }
    } // If EXEMPT, tax remains 0

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
      gstRate: params.taxMode === "EXEMPT" ? 0 : gstRate,
      cgstAmount: cgst,
      sgstAmount: sgst,
      igstAmount: igst,
      totalAmount: taxable + cgst + sgst + igst,
    };
  });

  const grandTotal = totalTaxable + totalCgst + totalSgst + totalIgst - order.discount + order.deliveryFee;

  const newInvoice: Invoice = {
    id: `inv-${Date.now()}`,
    invoiceNumber,
    orderId: order.id,
    orderNumber: order.orderNumber,
    issueDate: new Date().toISOString(),
    storeDetails: {
      name: "Maa Samay Sitla Furniture and Electronics",
      address: "Dubari, Madhuban, Mau, Uttar Pradesh, India - 221601",
      phone: "YOUR_PHONE",
      email: "ayushayadav9621@gmail.com",
      gstin: "",
      state: "Uttar Pradesh",
      stateCode: "09",
    },
    customerDetails: {
      fullName: order.customer.fullName,
      phone: order.customer.phone,
      email: order.customer.email,
      billingAddress: order.customer.deliveryAddress,
      shippingAddress: order.customer.deliveryAddress,
      state: order.customer.city.split(",").pop()?.trim() || "Uttar Pradesh",
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

  // Save new invoice
  invoices.unshift(newInvoice);
  saveStoredInvoices(invoices);

  // Lock order state
  order.status = "BILLED";
  order.invoiceId = newInvoice.id;
  updateOrder(order);

  return newInvoice;
}
