"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Order, OrderItem } from "@/types/order";
import { formatINR, formatDate } from "@/lib/utils";
import { Button, Input, Select, Badge } from "@/components/ui";
import { TaxMode } from "@/types/invoice";

export default function AdminOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [taxMode, setTaxMode] = useState<TaxMode>("EXCLUSIVE");
  const [isInterState, setIsInterState] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"PAID" | "PENDING" | "PARTIAL">("PAID");
  const [paymentMethod, setPaymentMethod] = useState<"CASH" | "UPI" | "BANK_TRANSFER" | "NEFT">("UPI");
  const [discount, setDiscount] = useState<number>(0);
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState(false);

  // Custom Item Modal State
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState<number>(5000);
  const [newItemQty, setNewItemQty] = useState<number>(1);

  useEffect(() => {
    fetch(`/api/admin/orders/${id}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => {
        const found: Order = data.order;
        setOrder(found);
        setDiscount(found.discount || 0);
        setDeliveryFee(found.deliveryFee || 0);
        // If customer city does not mention Uttar Pradesh, preselect Inter-State IGST
        if (!found.customer.city.toLowerCase().includes("pradesh") && !found.customer.city.toLowerCase().includes("up")) {
          setIsInterState(true);
        }
      })
      .catch(() => setOrder(null));
  }, [id]);

  // Persists an item/discount/delivery-fee/status change to the server.
  // Totals are always recomputed server-side (see updateOrder in
  // orderService.ts) — this just sends the admin's intended edits.
  async function persistOrderUpdate(patch: {
    items?: OrderItem[];
    discount?: number;
    deliveryFee?: number;
    status?: Order["status"];
  }) {
    const res = await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Failed to update order");
    }
    setOrder(data.order);
    return data.order as Order;
  }

  if (!order) {
    return (
      <div className="bg-white p-12 text-center rounded-sm border border-sand-200">
        <h2 className="font-serif text-xl font-medium text-espresso-900">Order not found</h2>
        <Link href="/admin/orders" className="text-xs text-brass-600 underline mt-2 block">
          Back to Orders List
        </Link>
      </div>
    );
  }

  const handleQtyChange = async (itemId: string, delta: number) => {
    const updatedItems = order.items.map((it) => {
      if (it.id === itemId) {
        const newQty = Math.max(1, it.quantity + delta);
        return { ...it, quantity: newQty, subtotal: it.unitPrice * newQty };
      }
      return it;
    });
    try {
      await persistOrderUpdate({ items: updatedItems });
    } catch (err: any) {
      alert(err.message || "Failed to update item quantity");
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    if (order.items.length <= 1) {
      alert("Order must contain at least one item.");
      return;
    }
    const updatedItems = order.items.filter((it) => it.id !== itemId);
    try {
      await persistOrderUpdate({ items: updatedItems });
    } catch (err: any) {
      alert(err.message || "Failed to remove item");
    }
  };

  const handleAddCustomItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const newItem: OrderItem = {
      id: `custom-${Date.now()}`,
      productId: "custom-build",
      productName: newItemName.trim(),
      unitPrice: Number(newItemPrice),
      quantity: Number(newItemQty),
      subtotal: Number(newItemPrice) * Number(newItemQty),
      woodType: "Bespoke Specification",
      finish: "Client Approved",
    };

    const updatedItems = [...order.items, newItem];
    try {
      await persistOrderUpdate({ items: updatedItems });
      setIsAddingItem(false);
      setNewItemName("");
      setNewItemPrice(5000);
      setNewItemQty(1);
    } catch (err: any) {
      alert(err.message || "Failed to add item");
    }
  };

  const handleFinancialAdjust = async (newDiscount: number, newDelivery: number) => {
    setDiscount(newDiscount);
    setDeliveryFee(newDelivery);
    try {
      await persistOrderUpdate({ discount: newDiscount, deliveryFee: newDelivery });
    } catch (err: any) {
      alert(err.message || "Failed to update pricing");
    }
  };

  const handleGenerateInvoice = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/admin/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: order.id,
          taxMode,
          isInterState,
          paymentStatus,
          paymentMethod,
          notes: `Confirmed order from WhatsApp. Payment confirmed via ${paymentMethod}.`,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate invoice");

      router.push(`/admin/invoices/${data.invoice.id}`);
    } catch (err: any) {
      alert(err.message || "Failed to generate invoice");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sand-200 pb-5">
        <div className="flex items-center space-x-3">
          <Link href="/admin/orders" className="text-sand-400 hover:text-espresso-900 text-sm">
            &larr; Back
          </Link>
          <h1 className="font-serif text-2xl font-bold text-espresso-900">
            Order Workspace: <span className="font-mono text-brass-600">{order.orderNumber}</span>
          </h1>
          {order.status === "BILLED" ? (
            <Badge variant="success">Billed</Badge>
          ) : (
            <Badge variant="warning">Draft Enquiry</Badge>
          )}
        </div>

        {order.invoiceId && (
          <Link href={`/admin/invoices/${order.invoiceId}`}>
            <Button variant="accent" size="sm">
              📄 View Finalized Tax Invoice ({order.invoiceId}) &rarr;
            </Button>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Customer Details & Items Workspace */}
        <div className="lg:col-span-8 space-y-6">
          {/* Customer Card */}
          <div className="bg-white p-6 rounded-sm border border-sand-200 shadow-subtle space-y-4">
            <h3 className="font-serif text-base font-semibold text-espresso-900 border-b border-sand-100 pb-2">
              Customer Contact & Delivery Info
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-sand-500 block uppercase">Client Name</span>
                <span className="font-semibold text-espresso-900 text-sm">{order.customer.fullName}</span>
              </div>
              <div>
                <span className="text-sand-500 block uppercase">WhatsApp Mobile</span>
                <a
                  href={`https://wa.me/91${order.customer.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-forest-700 hover:underline inline-flex items-center text-sm"
                >
                  <span className="mr-1">💬</span> +91 {order.customer.phone}
                </a>
              </div>
              <div className="sm:col-span-2">
                <span className="text-sand-500 block uppercase">Delivery Location</span>
                <span className="text-espresso-800 font-medium">
                  {order.customer.deliveryAddress}, {order.customer.city}
                </span>
              </div>
              {order.customer.notes && (
                <div className="sm:col-span-2 bg-linen-100 p-3 rounded-sm border border-sand-200">
                  <span className="text-sand-500 block uppercase text-[10px] font-bold">Client Notes</span>
                  <p className="text-espresso-800 mt-0.5">{order.customer.notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Editable Items Table */}
          <div className="bg-white p-6 rounded-sm border border-sand-200 shadow-subtle space-y-4">
            <div className="flex items-center justify-between border-b border-sand-100 pb-3">
              <div>
                <h3 className="font-serif text-base font-semibold text-espresso-900">
                  Itemized Furniture Pieces
                </h3>
                <p className="text-[11px] text-sand-500">
                  Adjust quantities, remove items, or add custom charges negotiated with the client.
                </p>
              </div>
              {order.status !== "BILLED" && (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setIsAddingItem(true)}
                  className="text-xs"
                >
                  + Add Custom Line Item
                </Button>
              )}
            </div>

            {/* Custom Item Form */}
            {isAddingItem && (
              <form onSubmit={handleAddCustomItem} className="bg-linen-100 p-4 rounded-sm border border-sand-300 space-y-3">
                <div className="font-semibold text-xs text-espresso-900 uppercase">Add Custom Specification or Surcharge</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-1">
                    <Input
                      label="Item Description"
                      placeholder="e.g. Custom Cushioning / Extra Bench"
                      value={newItemName}
                      onChange={(e) => setNewItemName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      label="Unit Price (₹)"
                      type="number"
                      value={newItemPrice}
                      onChange={(e) => setNewItemPrice(Number(e.target.value))}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      label="Quantity"
                      type="number"
                      value={newItemQty}
                      onChange={(e) => setNewItemQty(Number(e.target.value))}
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2 pt-1">
                  <Button size="sm" variant="ghost" type="button" onClick={() => setIsAddingItem(false)}>
                    Cancel
                  </Button>
                  <Button size="sm" variant="primary" type="submit">
                    Add to Order
                  </Button>
                </div>
              </form>
            )}

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs divide-y divide-sand-200">
                <thead className="bg-linen-100 text-sand-500 font-semibold text-[10px] uppercase">
                  <tr>
                    <th className="py-2.5 px-3">Item Description</th>
                    <th className="py-2.5 px-3">Unit Price</th>
                    <th className="py-2.5 px-3 text-center">Qty</th>
                    <th className="py-2.5 px-3 text-right">Line Total</th>
                    {order.status !== "BILLED" && <th className="py-2.5 px-3 text-center">Action</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-100 text-espresso-900">
                  {order.items.map((item) => (
                    <tr key={item.id}>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-espresso-900">{item.productName}</div>
                        {item.woodType && (
                          <div className="text-[11px] text-sand-500">
                            {item.woodType} &bull; {item.finish}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-3 font-mono">{formatINR(item.unitPrice)}</td>
                      <td className="py-3 px-3 text-center">
                        {order.status === "BILLED" ? (
                          <span className="font-bold">{item.quantity}</span>
                        ) : (
                          <div className="inline-flex items-center border border-sand-300 rounded-sm">
                            <button
                              onClick={() => handleQtyChange(item.id, -1)}
                              className="px-2 py-0.5 text-sand-600 hover:bg-linen-200"
                            >
                              -
                            </button>
                            <span className="px-2 font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => handleQtyChange(item.id, 1)}
                              className="px-2 py-0.5 text-sand-600 hover:bg-linen-200"
                            >
                              +
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold">
                        {formatINR(item.subtotal)}
                      </td>
                      {order.status !== "BILLED" && (
                        <td className="py-3 px-3 text-center">
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-sand-400 hover:text-terracotta-500 transition-colors p-1"
                            title="Remove line item"
                          >
                            ✕
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Billing & 1-Click Invoice Controls */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-sm border border-sand-200 shadow-subtle space-y-5">
            <h3 className="font-serif text-base font-semibold text-espresso-900 border-b border-sand-100 pb-2">
              Billing & Tax Calculation
            </h3>

            {/* Financial Adjustments */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-sand-500">Item Subtotal</span>
                <span className="font-mono font-semibold text-espresso-900">{formatINR(order.subtotal)}</span>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-sand-500 mb-1">
                  Negotiated Discount (₹)
                </label>
                <input
                  type="number"
                  disabled={order.status === "BILLED"}
                  value={discount}
                  onChange={(e) => handleFinancialAdjust(Number(e.target.value), deliveryFee)}
                  className="w-full border border-sand-300 rounded-sm px-3 py-1.5 text-xs text-espresso-900 focus:outline-none focus:border-brass-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-sand-500 mb-1">
                  Delivery / Assembly Fee (₹)
                </label>
                <input
                  type="number"
                  disabled={order.status === "BILLED"}
                  value={deliveryFee}
                  onChange={(e) => handleFinancialAdjust(discount, Number(e.target.value))}
                  className="w-full border border-sand-300 rounded-sm px-3 py-1.5 text-xs text-espresso-900 focus:outline-none focus:border-brass-500"
                />
              </div>
            </div>

            {/* GST Settings */}
            <div className="pt-3 border-t border-sand-100 space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-sand-500 mb-1">
                  GST Calculation Mode
                </label>
                <select
                  disabled={order.status === "BILLED"}
                  value={taxMode}
                  onChange={(e) => setTaxMode(e.target.value as TaxMode)}
                  className="w-full border border-sand-300 rounded-sm px-3 py-2 text-xs focus:outline-none focus:border-brass-500"
                >
                  <option value="EXCLUSIVE">Exclusive (+18% GST on top of items)</option>
                  <option value="INCLUSIVE">Inclusive (Prices already include 18% GST)</option>
                  <option value="EXEMPT">Exempt / Composition (0% Tax)</option>
                </select>
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="interstate"
                  disabled={order.status === "BILLED"}
                  checked={isInterState}
                  onChange={(e) => setIsInterState(e.target.checked)}
                  className="rounded-sm border-sand-300 text-brass-600 focus:ring-brass-500/20"
                />
                <label htmlFor="interstate" className="text-xs text-espresso-800 cursor-pointer">
                  Inter-State Sale (Charge 18% IGST instead of 9% CGST + 9% SGST)
                </label>
              </div>
            </div>

            {/* Payment Record */}
            <div className="pt-3 border-t border-sand-100 space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-sand-500 mb-1">
                  Payment Status
                </label>
                <select
                  disabled={order.status === "BILLED"}
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value as any)}
                  className="w-full border border-sand-300 rounded-sm px-3 py-2 text-xs focus:outline-none focus:border-brass-500"
                >
                  <option value="PAID">PAID (Client completed payment)</option>
                  <option value="PARTIAL">PARTIAL (Advance deposit received)</option>
                  <option value="PENDING">PENDING (Payment on delivery / Unpaid)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-sand-500 mb-1">
                  Payment Method
                </label>
                <select
                  disabled={order.status === "BILLED"}
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className="w-full border border-sand-300 rounded-sm px-3 py-2 text-xs focus:outline-none focus:border-brass-500"
                >
                  <option value="UPI">UPI (Google Pay / PhonePe / Paytm)</option>
                  <option value="BANK_TRANSFER">Direct Bank Transfer / NEFT</option>
                  <option value="CASH">Cash</option>
                  <option value="NEFT">Cheque / Demand Draft</option>
                </select>
              </div>
            </div>

            {/* Estimated Total */}
            <div className="pt-4 border-t border-sand-200">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-semibold text-sand-500 uppercase">Grand Total:</span>
                <span className="font-serif text-2xl font-bold text-espresso-900">
                  {formatINR(
                    taxMode === "EXCLUSIVE"
                      ? Math.round((order.subtotal - discount) * 1.18) + deliveryFee
                      : order.subtotal - discount + deliveryFee
                  )}
                </span>
              </div>
            </div>

            {/* THE ONE-CLICK GENERATE BILL ACTION */}
            {order.status !== "BILLED" ? (
              <Button
                variant="primary"
                size="lg"
                className="w-full py-3.5 font-bold tracking-wide shadow-card"
                onClick={handleGenerateInvoice}
                isLoading={isGenerating}
              >
                ✓ Generate Official GST Bill in 1-Click
              </Button>
            ) : (
              <div className="p-3 bg-forest-50 border border-forest-500/20 text-forest-700 text-xs rounded-sm text-center font-medium">
                ✓ This order has been finalized and locked as an official invoice.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
