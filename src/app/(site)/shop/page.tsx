"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MOCK_PRODUCTS } from "@/data/mockProducts";
import { ProductCard } from "@/components/product/ProductCard";
import { Input } from "@/components/ui";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedWood, setSelectedWood] = useState<string>("All");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<string>("featured");

  const categories = ["All", "Living Room", "Dining Room", "Bedroom", "Study & Office"];
  const woodTypes = ["All", "Solid Teak", "Sheesham (Indian Rosewood)", "Solid Oak"];

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.woodType.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      const matchesWood =
        selectedWood === "All" || product.woodType === selectedWood;

      const matchesStock = !inStockOnly || product.inStock;

      return matchesSearch && matchesCategory && matchesWood && matchesStock;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [searchQuery, selectedCategory, selectedWood, inStockOnly, sortBy]);

  return (
    <div className="bg-linen-100 min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-sand-200 pb-8 mb-10 text-left">
          <div className="text-xs uppercase tracking-widest text-brass-600 font-semibold mb-2">
            The Complete Atelier Collection
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-espresso-900 font-normal">
            Handcrafted Solid Wood Catalog
          </h1>
          <p className="text-sm text-sand-500 mt-2 max-w-2xl">
            Filter our ready-to-ship and custom-crafted timber pieces. Every design can be customized in dimensions, fabric, and polish finish.
          </p>
        </div>

        <div className="bg-white p-5 rounded-sm border border-sand-200 shadow-subtle mb-10 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-1">
              <Input
                label="Search Pieces"
                placeholder="Table, chair, credenza..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-espresso-700 mb-1.5">
                Room Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-white border border-sand-300 text-espresso-900 text-sm rounded-sm px-3.5 py-2.5 transition-colors focus:outline-none focus:border-brass-500 focus:ring-2 focus:ring-brass-500/20"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-espresso-700 mb-1.5">
                Timber Variety
              </label>
              <select
                value={selectedWood}
                onChange={(e) => setSelectedWood(e.target.value)}
                className="w-full bg-white border border-sand-300 text-espresso-900 text-sm rounded-sm px-3.5 py-2.5 transition-colors focus:outline-none focus:border-brass-500 focus:ring-2 focus:ring-brass-500/20"
              >
                {woodTypes.map((wood) => (
                  <option key={wood} value={wood}>{wood}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-espresso-700 mb-1.5">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-white border border-sand-300 text-espresso-900 text-sm rounded-sm px-3.5 py-2.5 transition-colors focus:outline-none focus:border-brass-500 focus:ring-2 focus:ring-brass-500/20"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-sand-100 text-xs">
            <label className="flex items-center space-x-2 text-espresso-800 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded-sm border-sand-300 text-brass-600 focus:ring-brass-500/20"
              />
              <span>Show only Ready-to-Ship inventory</span>
            </label>

            <span className="text-sand-500">
              Showing <strong>{filteredProducts.length}</strong> of {MOCK_PRODUCTS.length} furniture designs
            </span>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-white p-16 text-center border border-sand-200 rounded-sm">
            <h3 className="font-serif text-xl font-medium text-espresso-900 mb-2">
              No matching furniture designs found
            </h3>
            <p className="text-xs text-sand-500 max-w-sm mx-auto mb-6">
              Try adjusting your wood type, category, or search keywords. You can also consult our workshop directly on WhatsApp for bespoke requirements.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sand-500">Loading furniture catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
