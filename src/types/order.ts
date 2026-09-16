export type OrderStatus = "ENQUIRY_RECEIVED" | "UNDER_DISCUSSION" | "CONFIRMED" | "BILLED" | "CANCELLED";

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  woodType?: string;
  finish?: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
}

export interface CustomerDetails {
  fullName: string;
  phone: string;
  email?: string;
  city: string;
  deliveryAddress: string;
  pincode?: string;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. ORD-2026-0042
  createdAt: string;
  updatedAt: string;
  status: OrderStatus;
  customer: CustomerDetails;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  totalAmount: number;
  invoiceId?: string;
  source: "WEBSITE_ENQUIRY" | "DIRECT_CALL";
}
