"use client";

import React from "react";
import Link from "next/link";
import { Drawer } from "@/components/ui";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose, links }) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="माँ समय शीतला फर्नीचर" subtitle="Furniture & Electronics" position="left">
      <div className="flex flex-col space-y-6">
        <nav className="flex flex-col space-y-4">
          <Link
            href="/"
            onClick={onClose}
            className="text-base font-serif font-medium text-espresso-900 hover:text-brass-600 py-1 border-b border-sand-200"
          >
            Home
          </Link>
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={onClose}
              className="text-base font-medium text-espresso-800 hover:text-brass-600 py-1 border-b border-sand-200 flex items-center justify-between"
            >
              <span>{link.label}</span>
              <svg className="w-4 h-4 text-sand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
          <Link
            href="/about"
            onClick={onClose}
            className="text-sm text-sand-500 hover:text-espresso-900 py-1"
          >
            Our Workshop & Heritage
          </Link>
          <Link
            href="/contact"
            onClick={onClose}
            className="text-sm text-sand-500 hover:text-espresso-900 py-1"
          >
            Showroom Location & Contact
          </Link>
        </nav>

        <div className="pt-6 border-t border-sand-200">
          <p className="text-xs uppercase font-semibold text-sand-500 tracking-wider mb-3">Direct Workshop Assistance</p>
          <a
            href="https://wa.me/919999999999?text=Hi%2C%20I%20am%20browsing%20your%20website%20and%20would%20like%20to%20speak%20with%20a%20craftsman."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center bg-espresso-800 text-linen-100 text-sm font-medium py-3 px-4 rounded-sm hover:bg-espresso-900 transition-colors shadow-subtle"
          >
            <span className="mr-2">💬</span> Chat on WhatsApp
          </a>
          <p className="text-xs text-sand-500 text-center mt-3">
            Open Monday – Saturday: 10:00 AM – 8:00 PM
          </p>
        </div>
      </div>
    </Drawer>
  );
};
