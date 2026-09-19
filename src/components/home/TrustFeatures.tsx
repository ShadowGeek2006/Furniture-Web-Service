import React from "react";

export const TrustFeatures: React.FC = () => {
  const features = [
    {
      icon: "💰",
      title: "Best Budget Prices",
      desc: "अच्छी क्वालिटी, सही दाम — quality furniture and electronics at prices that fit your budget.",
    },
    {
      icon: "🛋️",
      title: "Wide Range of Furniture",
      desc: "From living room to bedroom — a full range of home furniture to choose from.",
    },
    {
      icon: "📺",
      title: "Electronics Too",
      desc: "TVs, appliances and more — everything for your home under one roof.",
    },
    {
      icon: "🚚",
      title: "Home Delivery",
      desc: "Delivered to your doorstep in Mau and nearby areas.",
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
