"use client";

import React, { useState } from "react";
import { useCart } from "@/lib/CartContext";
import { Drawer, Button } from "@/components/ui";
import { formatINR } from "@/lib/utils";
import { CheckoutModal } from "@/components/checkout/CheckoutModal";

export const CartDrawer: React.FC = () => {
  const { items, removeItem, updateQuantity, isCartOpen, setIsCartOpen, subtotal, totalItems } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleOpenCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const footer = items.length > 0 ? (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-sand-500">Estimated Total ({totalItems} items)</span>
        <span className="font-semibold text-espresso-900 text-lg">{formatINR(subtotal)}</span>
      </div>
      <p className="text-[11px] text-sand-500 leading-tight">
        *Taxes, custom polish requirements, and white-glove delivery are confirmed during our WhatsApp consultation.
      </p>
      <Button
        variant="primary"
        className="w-full py-3 text-sm font-semibold tracking-wide"
        onClick={handleOpenCheckout}
      >
        Submit Enquiry & Chat on WhatsApp
      </Button>
    </div>
  ) : null;

  return (
    <>
      <Drawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        title="Your Furniture Enquiry"
        subtitle={items.length > 0 ? `${totalItems} handcrafted items selected` : undefined}
        footer={footer}
      >
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center py-16 px-4">
            <div className="w-14 h-14 rounded-full bg-sand-100 flex items-center justify-center text-sand-400 mb-4">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="font-serif text-lg font-medium text-espresso-900 mb-1">
              Your inquiry list is empty
            </h3>
            <p className="text-xs text-sand-500 max-w-xs mb-6">
              Explore our solid wood collections and add pieces to your enquiry to receive customized quotes and wood samples.
            </p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsCartOpen(false)}
            >
              Continue Browsing
            </Button>
          </div>
        ) : (
          <div className="space-y-4 divide-y divide-sand-200">
            {items.map(({ product, quantity, selectedFinish, selectedWood }) => (
              <div key={product.id} className="pt-4 first:pt-0 flex space-x-3.5">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-20 h-20 object-cover object-center rounded-sm bg-linen-200 flex-shrink-0 border border-sand-200"
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <h4 className="font-serif text-sm font-medium text-espresso-900 line-clamp-1">
                        {product.name}
                      </h4>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="text-sand-400 hover:text-terracotta-500 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-[11px] text-sand-500 mt-0.5">
                      {selectedWood} &bull; {selectedFinish}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-sand-100">
                    <div className="inline-flex items-center border border-sand-300 rounded-sm bg-white">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="px-2 py-0.5 text-xs text-sand-600 hover:bg-linen-200"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-semibold text-espresso-900">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="px-2 py-0.5 text-xs text-sand-600 hover:bg-linen-200"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-xs font-semibold text-espresso-900">
                      {formatINR(product.price * quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Drawer>

      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </>
  );
};
