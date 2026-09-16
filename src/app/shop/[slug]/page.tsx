"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { MOCK_PRODUCTS } from "@/data/mockProducts";
import { formatINR } from "@/lib/utils";
import { Badge, Button } from "@/components/ui";
import { useCart } from "@/lib/CartContext";
import { ProductCard } from "@/components/product/ProductCard";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return notFound();
  }

  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedWood, setSelectedWood] = useState(product.woodType);
  const [selectedFinish, setSelectedFinish] = useState(product.finish);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToast, setIsAddedToast] = useState(false);

  const finishes = [
    { name: "Honey Teak", hex: "#C68B59" },
    { name: "Natural Walnut", hex: "#5D4037" },
    { name: "Dark Mahogany", hex: "#3E2723" },
    { name: "Matte Oak", hex: "#D7CCC8" },
  ];

  const handleAddToCart = () => {
    addItem(product, quantity, selectedFinish, selectedWood);
    setIsAddedToast(true);
    setTimeout(() => setIsAddedToast(false), 2500);
  };

  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  const customWaMessage = `*Custom Inquiry for ${product.name}*\n\nHello, I am looking at this piece on your website. I have a question regarding custom sizing / fabric options.\nProduct Link: /shop/${product.slug}`;
  const customWaUrl = `https://wa.me/919999999999?text=${encodeURIComponent(customWaMessage)}`;

  return (
    <div className="bg-linen-100 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center space-x-2 text-xs text-sand-500 mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-espresso-900 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-espresso-900 transition-colors">Shop</Link>
          <span>/</span>
          <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-espresso-900 transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-espresso-900 font-medium truncate max-w-xs">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-white p-6 sm:p-10 rounded-sm border border-sand-200 shadow-subtle mb-16">
          <div className="lg:col-span-7 space-y-4">
            <div className="aspect-[4/3] rounded-sm overflow-hidden bg-linen-200 border border-sand-300 relative shadow-subtle">
              <img
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge variant="brass">{product.woodType}</Badge>
                {product.bestseller && <Badge variant="espresso">Bestseller</Badge>}
              </div>
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-20 aspect-square rounded-sm overflow-hidden border-2 transition-all ${
                      selectedImage === idx
                        ? "border-brass-500 scale-105"
                        : "border-sand-200 hover:border-sand-400 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="mt-8 p-5 bg-linen-100 rounded-sm border border-sand-200 text-xs space-y-2">
              <div className="font-semibold uppercase tracking-wider text-espresso-900 flex items-center">
                <span className="text-brass-600 mr-2 text-base">🛡️</span> 10-Year Master Joiner Guarantee
              </div>
              <p className="text-sand-500 leading-relaxed">
                Handcrafted strictly with seasoned timber seasoned under 10% moisture. Backed by full replacement protection against timber shrinkage, joint loosening, and wood-boring pests.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-brass-600 font-semibold">{product.category}</span>
                <span className="text-xs font-medium text-forest-700 bg-forest-50 px-2.5 py-0.5 rounded-sm border border-forest-500/20">
                  {product.inStock ? "Ready in Showroom" : `Built to Order (${product.leadTimeDays}d)`}
                </span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl font-medium text-espresso-900 leading-tight">
                {product.name}
              </h1>
              <p className="text-sm text-sand-500">{product.subtitle}</p>

              <div className="py-2 border-y border-sand-200 flex items-baseline space-x-3">
                <span className="text-2xl font-bold text-espresso-900 tracking-tight">{formatINR(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-sm text-sand-400 line-through">{formatINR(product.originalPrice)}</span>
                )}
                <span className="text-xs text-sand-500">(Estimated ex-workshop price)</span>
              </div>

              <div className="bg-linen-100 p-4 rounded-sm border border-sand-200">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-espresso-800 block mb-2">
                  Architectural Dimensions
                </span>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white p-2 rounded-sm border border-sand-200">
                    <span className="text-[10px] text-sand-400 block uppercase">Length</span>
                    <span className="font-semibold text-espresso-900 text-sm">{product.dimensions.length}" ({Math.round(product.dimensions.length * 2.54)} cm)</span>
                  </div>
                  <div className="bg-white p-2 rounded-sm border border-sand-200">
                    <span className="text-[10px] text-sand-400 block uppercase">Width</span>
                    <span className="font-semibold text-espresso-900 text-sm">{product.dimensions.width}" ({Math.round(product.dimensions.width * 2.54)} cm)</span>
                  </div>
                  <div className="bg-white p-2 rounded-sm border border-sand-200">
                    <span className="text-[10px] text-sand-400 block uppercase">Height</span>
                    <span className="font-semibold text-espresso-900 text-sm">{product.dimensions.height}" ({Math.round(product.dimensions.height * 2.54)} cm)</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-espresso-800 mb-2">
                  Select Polish Finish: <span className="text-brass-600 font-bold">{selectedFinish}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {finishes.map((f) => (
                    <button
                      key={f.name}
                      onClick={() => setSelectedFinish(f.name)}
                      className={`flex items-center space-x-2 text-xs px-3 py-1.5 rounded-sm border transition-all ${
                        selectedFinish === f.name
                          ? "border-brass-600 bg-brass-50 text-espresso-900 font-semibold shadow-xs"
                          : "border-sand-300 bg-white text-sand-600 hover:border-sand-400"
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full border border-sand-300" style={{ backgroundColor: f.hex }} />
                      <span>{f.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-xs text-sand-600 leading-relaxed pt-2">{product.description}</p>
            </div>

            <div className="pt-4 border-t border-sand-200 space-y-3">
              <div className="flex items-center space-x-3">
                <div className="inline-flex items-center border border-sand-300 rounded-sm bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-sm text-sand-600 hover:bg-linen-200"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-4 text-sm font-semibold text-espresso-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-sm text-sand-600 hover:bg-linen-200"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleAddToCart}
                  className="flex-1 py-3 text-sm font-semibold tracking-wide"
                >
                  Add to Furniture Enquiry ({formatINR(product.price * quantity)})
                </Button>
              </div>

              {isAddedToast && (
                <div className="p-2.5 bg-forest-50 border border-forest-500/20 text-forest-700 text-xs rounded-sm text-center font-medium animate-fadeIn">
                  ✓ Added to your enquiry. Drawer opened on right.
                </div>
              )}

              <a
                href={customWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center text-xs font-semibold text-espresso-800 hover:text-brass-600 border border-sand-300 hover:border-sand-400 bg-white py-2.5 px-4 rounded-sm transition-colors"
              >
                <span className="mr-2">💬</span> Ask About Custom Dimensions on WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 sm:p-10 rounded-sm border border-sand-200 shadow-subtle mb-16 text-left">
          <h3 className="font-serif text-xl font-medium text-espresso-900 mb-6 pb-3 border-b border-sand-200">
            Artisanal Specifications & Timber Origin
          </h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-xs">
            {Object.entries(product.specifications).map(([key, val]) => (
              <div key={key} className="flex justify-between py-2 border-b border-sand-100">
                <dt className="font-semibold text-sand-500 uppercase tracking-wider">{key}</dt>
                <dd className="font-medium text-espresso-900 text-right">{val}</dd>
              </div>
            ))}
          </dl>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mb-12 text-left">
            <h3 className="font-serif text-2xl font-medium text-espresso-900 mb-6">
              Complementary Furniture for {product.category}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
