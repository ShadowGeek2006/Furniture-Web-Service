import React from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-espresso-900 text-linen-200 border-t border-espresso-700/50 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-14 border-b border-espresso-700/40">
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif text-2xl font-bold tracking-wider text-linen-100 block">
              [CLIENT_NAME]
            </span>
            <p className="text-xs tracking-[0.25em] uppercase text-brass-400 font-medium">
              Bespoke Solid Wood Atelier
            </p>
            <p className="text-sm text-sand-300 leading-relaxed max-w-sm pt-2">
              We design and handcraft generational furniture in Grade-A Solid Teak and Seasoned Sheesham. 
              Zero MDF. Zero particle board. Crafted with traditional mortise-and-tenon joinery to endure for decades.
            </p>
            <div className="pt-2 flex items-center space-x-3 text-xs text-sand-400">
              <span className="flex items-center"><span className="text-brass-400 mr-1.5">✓</span> 10-Year Structural Warranty</span>
              <span className="flex items-center"><span className="text-brass-400 mr-1.5">✓</span> White-Glove Installation</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-linen-100 font-semibold mb-4">
              Curated Rooms
            </h4>
            <ul className="space-y-2.5 text-sm text-sand-300">
              <li><Link href="/shop?category=Living+Room" className="hover:text-brass-400 transition-colors">Living Room</Link></li>
              <li><Link href="/shop?category=Dining+Room" className="hover:text-brass-400 transition-colors">Dining Suites</Link></li>
              <li><Link href="/shop?category=Bedroom" className="hover:text-brass-400 transition-colors">Solid Wood Beds</Link></li>
              <li><Link href="/shop?category=Study+%26+Office" className="hover:text-brass-400 transition-colors">Study Desks & Bookshelves</Link></li>
              <li><Link href="/#custom-furniture" className="hover:text-brass-400 transition-colors">Custom Carpentry</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-linen-100 font-semibold mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-sm text-sand-300">
              <li><Link href="/about" className="hover:text-brass-400 transition-colors">Wood & Material Care</Link></li>
              <li><Link href="/about#delivery" className="hover:text-brass-400 transition-colors">Shipping & Assembly</Link></li>
              <li><Link href="/about#warranty" className="hover:text-brass-400 transition-colors">10-Year Warranty Terms</Link></li>
              <li><Link href="/contact" className="hover:text-brass-400 transition-colors">Architect & Designer Inquiries</Link></li>
              <li><Link href="/admin/orders" className="text-xs text-sand-500 hover:text-sand-300 transition-colors">Staff Invoicing Portal</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-linen-100 font-semibold mb-4">
              Workshop & Showroom
            </h4>
            <p className="text-sm text-sand-300 leading-normal">[CLIENT_ADDRESS]</p>
            <p className="text-sm text-sand-300"><span className="text-xs text-sand-400 block">Direct Line:</span>[CLIENT_PHONE]</p>
            <p className="text-sm text-sand-300"><span className="text-xs text-sand-400 block">Email:</span>[CLIENT_EMAIL]</p>
            <div className="pt-2">
              <a
                href="https://wa.me/919999999999?text=Hi%2C%20I%20would%20like%20to%20consult%20with%20your%20furniture%20studio."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full bg-brass-500 hover:bg-brass-600 text-linen-100 text-xs font-semibold uppercase tracking-wider py-2.5 px-4 rounded-sm transition-colors shadow-sm"
              >
                💬 Instant WhatsApp Help
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-sand-400 gap-4">
          <p>&copy; {new Date().getFullYear()} [CLIENT_NAME]. All rights reserved.</p>
          <p className="text-[11px] text-sand-500">
            GST Compliant Invoicing &bull; Handcrafted in India
          </p>
        </div>
      </div>
    </footer>
  );
};
