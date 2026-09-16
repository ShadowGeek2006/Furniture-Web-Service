import React from "react";
import Link from "next/link";

export const RoomCategories: React.FC = () => {
  const categories = [
    {
      title: "Living Room",
      subtitle: "Lounge Chairs, Coffee Tables & Slatted Credenzas",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
      href: "/shop?category=Living+Room",
    },
    {
      title: "Dining Suites",
      subtitle: "6 & 8-Seater Solid Teak Planks and Rattan Chairs",
      image: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80",
      href: "/shop?category=Dining+Room",
    },
    {
      title: "Solid Wood Beds",
      subtitle: "Platform Frames, Fluted Headboards & Hydraulic Storage",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
      href: "/shop?category=Bedroom",
    },
    {
      title: "Study & Library",
      subtitle: "Executive Writing Desks and Bookcases",
      image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80",
      href: "/shop?category=Study+%26+Office",
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-brass-600 font-semibold block mb-2">
            Curated Collections
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-espresso-900 font-normal">
            Designed for Every Living Space
          </h2>
          <p className="text-sm text-sand-500 mt-3">
            Each collection is scaled proportionally with timeless silhouettes that allow the natural wood grain to take center stage.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="group block relative aspect-[3/4] overflow-hidden rounded-sm border border-sand-200 bg-linen-200 shadow-subtle hover:shadow-card transition-all"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/85 via-espresso-950/30 to-transparent transition-opacity" />
              
              <div className="absolute inset-x-0 bottom-0 p-6 text-left text-white">
                <h3 className="font-serif text-xl font-medium text-linen-100 group-hover:text-brass-300 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-sand-300 mt-1 line-clamp-2 leading-relaxed">
                  {cat.subtitle}
                </p>
                <span className="inline-flex items-center text-xs font-semibold text-brass-300 mt-3 group-hover:translate-x-1 transition-transform">
                  Explore Collection &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
