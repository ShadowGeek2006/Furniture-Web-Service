"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import { formatINR } from "@/lib/utils";
import { Badge, Button } from "@/components/ui";
import { useCart } from "@/lib/CartContext";

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addItem } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1);
  };

  const dimString = `${product.dimensions.length}"L × ${product.dimensions.width}"W × ${product.dimensions.height}"H`;

  return (
    <div className="group flex flex-col bg-white border border-sand-200 rounded-sm overflow-hidden hover:border-sand-300 hover:shadow-card transition-all duration-300">
      <Link href={`/shop/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-linen-200">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 pointer-events-none">
          {product.bestseller && <Badge variant="brass">Bestseller</Badge>}
          <Badge variant="sand">{product.category === "Electronics" ? "Electronics" : product.woodType}</Badge>
        </div>
        <div className="absolute top-3 right-3 pointer-events-none">
          {product.inStock ? (
            <span className="inline-flex items-center text-[10px] font-semibold tracking-wider text-forest-700 bg-forest-50/90 px-2 py-0.5 rounded-sm border border-forest-500/20">
              Ready to Ship
            </span>
          ) : (
            <span className="inline-flex items-center text-[10px] font-semibold tracking-wider text-amber-800 bg-amber-50/90 px-2 py-0.5 rounded-sm border border-amber-200">
              Made to Order ({product.leadTimeDays}d)
            </span>
          )}
        </div>
      </Link>

      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-sand-500 mb-1.5 font-medium">
            <span>{product.category}</span>
            <span className="tracking-tight text-[11px] text-sand-400">{dimString}</span>
          </div>
          <Link href={`/shop/${product.slug}`} className="block group-hover:text-brass-600 transition-colors">
            <h3 className="font-serif text-lg font-medium text-espresso-900 line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-sand-500 mt-1 line-clamp-1">{product.subtitle}</p>
        </div>

        <div className="pt-5 mt-3 border-t border-sand-200 flex items-center justify-between">
          <div>
            <div className="text-xs text-sand-400 font-medium">Starting from</div>
            <div className="flex items-baseline space-x-2">
              <span className="text-base font-semibold text-espresso-900 tracking-tight">
                {formatINR(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-sand-400 line-through">
                  {formatINR(product.originalPrice)}
                </span>
              )}
            </div>
          </div>
          <Button
            size="sm"
            variant="secondary"
            onClick={handleQuickAdd}
            className="text-xs py-2 px-3.5 hover:bg-espresso-800 hover:text-white transition-colors"
          >
            + Add to Enquiry
          </Button>
        </div>
      </div>
    </div>
  );
};
