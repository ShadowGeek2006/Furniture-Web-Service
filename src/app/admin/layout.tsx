import React from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-sand-100/60 flex flex-col">
      <header className="bg-espresso-900 text-linen-100 border-b border-espresso-800 sticky top-0 z-30 shadow-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-6">
              <Link href="/admin/orders" className="flex items-baseline space-x-2">
                <span className="font-serif text-xl font-bold tracking-wider text-linen-100">[CLIENT_NAME]</span>
                <span className="text-[10px] uppercase tracking-widest bg-brass-500/20 text-brass-300 px-2 py-0.5 rounded-sm font-semibold">
                  Staff Invoicing & Orders
                </span>
              </Link>

              <nav className="hidden md:flex items-center space-x-4 text-xs font-medium tracking-wide">
                <Link
                  href="/admin/orders"
                  className="text-sand-300 hover:text-white px-3 py-1.5 rounded-sm hover:bg-espresso-800 transition-colors"
                >
                  Orders & Inquiries
                </Link>
                <Link
                  href="/admin/invoices"
                  className="text-sand-300 hover:text-white px-3 py-1.5 rounded-sm hover:bg-espresso-800 transition-colors"
                >
                  GST Invoices
                </Link>
              </nav>
            </div>

            <div className="flex items-center space-x-4 text-xs">
              <Link
                href="/shop"
                target="_blank"
                className="text-sand-400 hover:text-white transition-colors flex items-center"
              >
                <span>View Storefront</span>
                <span className="ml-1 text-[10px]">↗</span>
              </Link>
              <div className="w-px h-4 bg-espresso-700" />
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-forest-500 animate-pulse" />
                <span className="text-sand-300 font-medium">Workshop Portal</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
