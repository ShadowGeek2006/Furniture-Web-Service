import React from "react";

export const CraftsmanshipStory: React.FC = () => {
  return (
    <section className="py-24 bg-white border-b border-sand-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] rounded-sm overflow-hidden border border-sand-300 bg-linen-200 shadow-card">
              <img
                src="https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=1000&q=80"
                alt="Woodworking joinery and grain texture"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="text-xs uppercase tracking-widest text-brass-600 font-semibold block">
              The Atelier Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-espresso-900 font-normal leading-snug">
              Why Real Solid Wood Matters in a World of Disposable Furniture
            </h2>
            <p className="text-sm sm:text-base text-espresso-700/80 leading-relaxed">
              Most commercial furniture today is manufactured from compressed sawdust and synthetic glues designed to degrade within 3 to 5 years. At <strong>[CLIENT_NAME]</strong>, we believe furniture should be an heirloom, not a landfill liability.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start space-x-3.5">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brass-50 text-brass-700 text-xs font-bold flex items-center justify-center border border-brass-200 mt-0.5">
                  1
                </span>
                <div>
                  <h4 className="font-serif text-base font-semibold text-espresso-900">Kiln-Dried Seasoned Timber</h4>
                  <p className="text-xs text-sand-500 mt-0.5 leading-relaxed">
                    Our wood is conditioned over 45 days in climate-controlled kilns to lower moisture content below 10%, ensuring zero warping, cracking, or seasonal expansion.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brass-50 text-brass-700 text-xs font-bold flex items-center justify-center border border-brass-200 mt-0.5">
                  2
                </span>
                <div>
                  <h4 className="font-serif text-base font-semibold text-espresso-900">Mortise & Tenon Architecture</h4>
                  <p className="text-xs text-sand-500 mt-0.5 leading-relaxed">
                    We rely on interlocking wood joints and concealed wooden dowels rather than superficial nails or plastic brackets.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brass-50 text-brass-700 text-xs font-bold flex items-center justify-center border border-brass-200 mt-0.5">
                  3
                </span>
                <div>
                  <h4 className="font-serif text-base font-semibold text-espresso-900">Natural Breathable Finishes</h4>
                  <p className="text-xs text-sand-500 mt-0.5 leading-relaxed">
                    Hand-applied cold-pressed linseed oils, organic shellac, and beeswax that nourish the grain without releasing toxic VOC fumes into your living space.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
