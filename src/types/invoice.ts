export type TaxMode = "INCLUSIVE" | "EXCLUSIVE" | "EXEMPT";

export interface InvoiceLineItem {
  id: string;
  productName: string;
  hsnCode: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  taxableValue: number;
  gstRate: number; // e.g. 18
  cgstAmount: number;
  sgstAmount: number;
  igstAmount: number;
  totalAmount: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string; // e.g. INV-2026-0001
  orderId: string;
  orderNumber: string;
  issueDate: string;
  storeDetails: {
    name: string;
    address: string;
    phone: string;
    email: string;
    gstin: string;
    state: string;
    stateCode: string;
  };
  customerDetails: {
    fullName: string;
    phone: string;
    email?: string;
    billingAddress: string;
    shippingAddress: string;
    gstin?: string;
    state: string;
  };
  items: InvoiceLineItem[];
  subtotal: number;
  totalDiscount: number;
  taxableAmount: number;
  totalCgst: number;
  totalSgst: number;
  totalIgst: number;
  deliveryCharges: number;
  grandTotal: number;
  paymentStatus: "PAID" | "PENDING" | "PARTIAL";
  paymentMethod: "CASH" | "UPI" | "BANK_TRANSFER" | "NEFT";
  notes?: string;
}
