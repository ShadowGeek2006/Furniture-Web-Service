"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { MobileNav } from "./MobileNav";

export const Navbar: React.FC = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Living Room", href: "/shop?category=Living+Room" },
    { label: "Dining", href: "/shop?category=Dining+Room" },
    { label: "Bedroom", href: "/shop?category=Bedroom" },
    { label: "Study & Office", href: "/shop?category=Study+%26+Office" },
    { label: "Custom Craft", href: "/#custom-furniture" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-linen-100/95 backdrop-blur-md border-b border-sand-200 transition-all">
        <div className="bg-espresso-800 text-linen-100 text-[11px] uppercase tracking-widest py-1.5 px-4 text-center">
          Handcrafted in Solid Teak & Sheesham &bull; White-Glove Delivery Across India &bull; 10-Year Craftsmanship Guarantee
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 text-espresso-800 hover:text-brass-600 transition-colors"
                aria-label="Open mobile navigation"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="group text-left">
                <span className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-espresso-900 block group-hover:text-brass-600 transition-colors">
                  [CLIENT_NAME]
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-sand-500 block -mt-1 font-medium">
                  Atelier &bull; Solid Wood Craft
                </span>
              </Link>
            </div>

            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-espresso-800 hover:text-brass-500 transition-colors py-1 tracking-wide relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brass-500 transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-4 sm:space-x-6">
              <a
                href="https://wa.me/919999999999?text=Hi%2C%20I%20am%20interested%20in%20your%20solid%20wood%20furniture%20collection."
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center text-xs font-semibold text-espresso-800 hover:text-brass-600 transition-colors border border-sand-300 rounded-sm px-3 py-1.5 bg-white/60 hover:bg-white"
              >
                <span className="mr-1.5 text-forest-500 font-bold">💬</span>
                WhatsApp Us
              </a>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-espresso-900 hover:text-brass-600 transition-colors flex items-center"
                aria-label={`View Cart (${totalItems} items)`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brass-500 text-linen-100 text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-linen-100 shadow-sm animate-pulse">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={navLinks}
      />
    </>
  );
};
