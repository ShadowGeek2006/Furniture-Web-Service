"use client";

import React, { useState } from "react";
import { Modal, Input, Textarea, Button } from "@/components/ui";
import { useCart } from "@/lib/CartContext";
import { formatINR } from "@/lib/utils";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { items, subtotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<{
    orderNumber: string;
    waLink: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = "Full Name is required";
    if (!formData.phone.trim() || !/^[6-9]\d{9}$/.test(formData.phone.replace(/[^0-9]/g, "").slice(-10))) {
      errs.phone = "Enter a valid 10-digit mobile number";
    }
    if (!formData.city.trim()) errs.city = "Delivery City is required";
    if (!formData.address.trim()) errs.address = "Delivery address is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitError("");
    setIsSubmitting(true);

    try {
      const cleanPhone = formData.phone.replace(/[^0-9]/g, "").slice(-10);

      const payload = {
        customer: {
          fullName: formData.fullName.trim(),
          phone: cleanPhone,
          email: formData.email.trim(),
          city: formData.city.trim(),
          deliveryAddress: formData.address.trim(),
          notes: formData.notes.trim(),
        },
        notes: formData.notes.trim(),
        // Server re-derives price/name from the product catalog by ID — the
        // client only supplies the selection, never the price (Phase 9/35.1).
        items: items.map((it) => ({
          productId: it.product.id,
          quantity: it.quantity,
          woodType: it.selectedWood,
          finish: it.selectedFinish,
        })),
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data.error || "Something went wrong. Please try again.");
        return;
      }

      // Cache the server-validated order locally so the admin portal (in this
      // same browser) can find it under Orders & Inquiries. See README for
      // the current single-browser limitation of this storage approach.
      const existingOrders = JSON.parse(localStorage.getItem("artisan_furniture_orders") || "[]");
      localStorage.setItem(
        "artisan_furniture_orders",
        JSON.stringify([data.order, ...existingOrders])
      );

      setSubmittedOrder({ orderNumber: data.order.orderNumber, waLink: data.waLink });
      clearCart();
    } catch (err) {
      console.error("Order submission failed", err);
      setSubmitError("Could not submit your enquiry. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setSubmittedOrder(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleModalClose}
      title={submittedOrder ? "Enquiry Successfully Dispatched" : "Review & Submit Furniture Enquiry"}
      subtitle={
        submittedOrder
          ? "Our workshop team has been alerted via WhatsApp"
          : "Zero online payment required. Your order will be reviewed directly by our master craftsmen."
      }
      maxWidth="lg"
    >
      {submittedOrder ? (
        <div className="text-center py-4 space-y-5">
          <div className="w-14 h-14 bg-forest-50 text-forest-700 rounded-full flex items-center justify-center mx-auto text-2xl border border-forest-500/20">
            ✓
          </div>

          <div>
            <span className="text-xs uppercase font-semibold text-brass-600 tracking-wider">
              Enquiry Reference
            </span>
            <h3 className="font-serif text-2xl font-bold text-espresso-900 mt-0.5">
              {submittedOrder.orderNumber}
            </h3>
            <p className="text-xs text-sand-500 mt-2 max-w-sm mx-auto">
              Your inquiry has been logged into our workshop queue. An automated WhatsApp dispatch has been triggered to our staff.
            </p>
          </div>

          <div className="bg-linen-100 p-4 rounded-sm border border-sand-200 text-left text-xs space-y-1.5 text-espresso-800">
            <p className="font-semibold text-espresso-900">What happens next?</p>
            <p>1. Our furniture consultant reviews wood availability and grain patterns.</p>
            <p>2. We discuss your custom polish preferences and delivery logistics.</p>
            <p>3. Once approved, the admin generates your official GST Bill for review.</p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <a
              href={submittedOrder.waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center bg-espresso-800 hover:bg-espresso-900 text-linen-100 text-sm font-semibold py-3 px-4 rounded-sm transition-colors shadow-subtle"
            >
              <span className="mr-2">💬</span> Continue Chat on WhatsApp
            </a>
            <Button variant="secondary" onClick={handleModalClose}>
              Back to Catalog
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-linen-100 p-3.5 rounded-sm border border-sand-200 flex items-center justify-between text-xs">
            <div>
              <span className="text-sand-500 block">Enquiry Items:</span>
              <span className="font-semibold text-espresso-900">{items.length} pieces selected</span>
            </div>
            <div className="text-right">
              <span className="text-sand-500 block">Estimated Value:</span>
              <span className="font-semibold text-espresso-900 text-sm">{formatINR(subtotal)}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Your Full Name"
              name="fullName"
              placeholder="e.g. Rajiv Sharma"
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
              required
            />
            <Input
              label="WhatsApp Mobile Number"
              name="phone"
              placeholder="10-digit mobile number"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Email (For Formal Estimate)"
              name="email"
              type="email"
              placeholder="rajiv@example.com"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              label="Delivery City & State"
              name="city"
              placeholder="e.g. Lucknow, Uttar Pradesh"
              value={formData.city}
              onChange={handleChange}
              error={errors.city}
              required
            />
          </div>

          <Textarea
            label="Complete Delivery / Landmark Address"
            name="address"
            placeholder="House/Apartment #, Street, Locality, Pincode"
            value={formData.address}
            onChange={handleChange}
            error={errors.address}
            required
          />

          <Textarea
            label="Custom Requests or Notes (Optional)"
            name="notes"
            placeholder="Custom dimensions, fabric swatch preferences, or preferred delivery dates"
            value={formData.notes}
            onChange={handleChange}
          />

          {submitError && (
            <div className="p-3 bg-terracotta-50 border border-terracotta-500/20 text-terracotta-700 text-xs rounded-sm">
              {submitError}
            </div>
          )}

          <div className="pt-3 border-t border-sand-200 flex items-center justify-between">
            <span className="text-[11px] text-sand-500">
              🔒 100% Privacy. Never shared. No spam.
            </span>
            <div className="flex space-x-2">
              <Button type="button" variant="ghost" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" isLoading={isSubmitting}>
                Submit & Open WhatsApp
              </Button>
            </div>
          </div>
        </form>
      )}
    </Modal>
  );
};
