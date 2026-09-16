import React from "react";
import { Button } from "@/components/ui";

export const CustomFurnitureCTA: React.FC = () => {
  return (
    <section id="custom-furniture" className="py-20 bg-espresso-900 text-linen-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-espresso-800 border border-espresso-700/60 rounded-sm p-8 sm:p-12 lg:p-16">
          <div className="max-w-3xl space-y-6">
            <span className="text-xs uppercase tracking-widest text-brass-400 font-semibold block">
              Bespoke Carpentry & Custom Dimensions
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight">
              Have a Specific Architectural Layout or Pinterest Board in Mind?
            </h2>
            <p className="text-sm sm:text-base text-sand-300 leading-relaxed max-w-2xl">
              From extending dining tables to fit 12 guests, to crafting customized wall-to-wall library credenzas or bespoke fluted headboards — share your sketches, floor plans, or reference photos directly with our master carpenters on WhatsApp.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <a
                href="https://wa.me/919999999999?text=Hi%2C%20I%20have%20a%20custom%20furniture%20design%20I%20would%20like%20to%20discuss%20with%20your%20workshop."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="accent" size="lg" className="w-full sm:w-auto font-semibold">
                  <span className="mr-2">💬</span> Send Photos & Dimensions on WhatsApp
                </Button>
              </a>
              <span className="text-xs text-sand-400 sm:max-w-xs leading-normal">
                Direct consultation with our lead woodcraft technician. Free quotes provided within 24 hours.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
