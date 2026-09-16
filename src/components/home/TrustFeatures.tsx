import React from "react";

export const TrustFeatures: React.FC = () => {
  const features = [
    {
      icon: "🌳",
      title: "100% Solid Seasoned Timber",
      desc: "Grade-A Burma Teak and FSC-certified Indian Sheesham. Zero particle board, no hollow honeycomb cores.",
    },
    {
      icon: "🛡️",
      title: "10-Year Structural Guarantee",
      desc: "Every joint, plank, and framework is guaranteed against wood-borers, termites, and structural warping.",
    },
    {
      icon: "🚚",
      title: "White-Glove In-Home Assembly",
      desc: "Delivered directly into your room of choice, unpacked, inspected, and assembled by our workshop technicians.",
    },
    {
      icon: "✨",
      title: "Artisanal Polish Customization",
      desc: "Choose between Natural Honey Teak, Matte Walnut, or Deep Charcoal with food-safe organic oil finishes.",
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat) => (
            <div key={feat.title} className="p-6 border border-sand-200 rounded-sm bg-linen-100/50">
              <span className="text-2xl mb-3 block">{feat.icon}</span>
              <h3 className="font-serif text-base font-semibold text-espresso-900 mb-2">
                {feat.title}
              </h3>
              <p className="text-xs text-sand-500 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
