import type { Metadata } from "next";
import "../globals.css";
import { CartProvider } from "@/lib/CartContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";

export const metadata: Metadata = {
  title: "[CLIENT_NAME] — Artisanal Solid Wood Furniture Studio",
  description: "Handcrafted generational furniture in solid plantation teak and seasoned Sheesham wood. Built with traditional mortise-and-tenon joinery and organic finishes. Zero MDF.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-linen-100 text-espresso-900 selection:bg-brass-200 selection:text-espresso-950">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
