"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MOCK_PRODUCTS } from "@/data/mockProducts";
import { ProductCard } from "@/components/product/ProductCard";

export const FeaturedCollection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("All");

  const tabs = ["All", "Living Room", "Dining Room", "Bedroom", "Study & Office"];

  const filteredProducts = activeTab === "All"
    ? MOCK_PRODUCTS.slice(0, 6)
    : MOCK_PRODUCTS.filter((p) => p.category === activeTab);

  return (
    <section className="py-20 bg-linen-100 border-b border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-brass-600 font-semibold block mb-2">
              Featured Workshop Pieces
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-espresso-900 font-normal">
              Signature Creations
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs uppercase tracking-wider font-semibold px-4 py-2 rounded-sm transition-all ${
                  activeTab === tab
                    ? "bg-espresso-800 text-linen-100 shadow-subtle"
                    : "bg-white text-espresso-700 border border-sand-300 hover:bg-linen-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center text-sm font-semibold text-espresso-900 hover:text-brass-600 border-b-2 border-espresso-900 hover:border-brass-600 pb-1 transition-colors"
          >
            <span>View Full Furniture Catalog ({MOCK_PRODUCTS.length} Designs)</span>
            <span className="ml-2">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
