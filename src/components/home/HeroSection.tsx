import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-linen-100 overflow-hidden border-b border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 bg-brass-50 border border-brass-200/80 px-3 py-1 rounded-sm">
              <span className="w-2 h-2 rounded-full bg-brass-500 animate-pulse" />
              <span className="text-[11px] uppercase tracking-widest text-brass-700 font-semibold">
                Solid Wood Atelier &bull; Zero MDF
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-espresso-900 leading-[1.15] tracking-tight">
              Generational Furniture, <br />
              <span className="italic font-light text-brass-700">Crafted to Outlast Trends.</span>
            </h1>

            <p className="text-base sm:text-lg text-espresso-700/80 max-w-xl leading-relaxed font-normal">
              Hand-planed plantation teak and seasoned Sheesham rosewood. Built with traditional 
              mortise-and-tenon joinery and organic finishes to bring warmth, permanence, and dignity to your home.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <Link href="/shop">
                <Button size="lg" variant="primary" className="w-full sm:w-auto shadow-card">
                  Explore Curated Catalog
                </Button>
              </Link>
              <a href="#custom-furniture">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Custom Build Consultation
                </Button>
              </a>
            </div>

            <div className="pt-8 border-t border-sand-200/80 grid grid-cols-3 gap-6 text-espresso-800">
              <div>
                <span className="font-serif text-2xl font-bold block text-espresso-900">100%</span>
                <span className="text-xs text-sand-500 uppercase tracking-wider block mt-0.5">Kiln-Dried Hardwood</span>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold block text-espresso-900">10 Yrs</span>
                <span className="text-xs text-sand-500 uppercase tracking-wider block mt-0.5">Structural Warranty</span>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold block text-espresso-900">0%</span>
                <span className="text-xs text-sand-500 uppercase tracking-wider block mt-0.5">MDF or Veneer</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="aspect-[4/5] rounded-sm overflow-hidden border border-sand-300 shadow-elevated bg-linen-200">
                <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85"
                  alt="Minimalist Living Room with Handcrafted Solid Teak Furniture"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-sm border border-sand-200 shadow-card max-w-xs hidden sm:block">
                <p className="text-xs font-serif font-medium text-espresso-900">
                  “The grain of real timber breathes and matures with every passing season.”
                </p>
                <span className="text-[10px] tracking-wider uppercase text-brass-600 font-bold block mt-1">
                  Master Joiner Guarantee
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
