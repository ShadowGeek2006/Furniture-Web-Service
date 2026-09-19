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
              Our Promise / हमारा वादा
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-espresso-900 font-normal leading-snug">
              Quality You Can Trust, Prices You Can Afford
            </h2>
            <p className="text-sm sm:text-base text-espresso-700/80 leading-relaxed">
              हम आपके लिए सही क्वालिटी और सही दाम में फर्नीचर व इलेक्ट्रॉनिक्स लाते हैं। At <strong>Maa Samay Sitla Furniture and Electronics</strong>, we believe good quality shouldn't cost a fortune — every product is checked before it reaches your home.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start space-x-3.5">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brass-50 text-brass-700 text-xs font-bold flex items-center justify-center border border-brass-200 mt-0.5">
                  1
                </span>
                <div>
                  <h4 className="font-serif text-base font-semibold text-espresso-900">Assured Quality & Durability (भरोसेमंद मजबूती)</h4>
                  <p className="text-xs text-sand-500 mt-0.5 leading-relaxed">
                    हर फर्नीचर और इलेक्ट्रॉनिक्स प्रोडक्ट की सख्त गुणवत्ता जांच की जाती है, ताकि आपके घर को मिले टिकाऊ और मजबूत सामान। Every item is inspected for structural durability and authentic manufacturer standards.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brass-50 text-brass-700 text-xs font-bold flex items-center justify-center border border-brass-200 mt-0.5">
                  2
                </span>
                <div>
                  <h4 className="font-serif text-base font-semibold text-espresso-900">Safe Home Delivery Across Mau (मऊ व आसपास डिलीवरी)</h4>
                  <p className="text-xs text-sand-500 mt-0.5 leading-relaxed">
                    दुबारी, मधुबन, मऊ और आसपास के क्षेत्रों में सुरक्षित होम डिलीवरी और अनपैकिंग सुविधा उपलब्ध कराई जाती है। Direct doorstep delivery and assistance to your home with careful handling.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brass-50 text-brass-700 text-xs font-bold flex items-center justify-center border border-brass-200 mt-0.5">
                  3
                </span>
                <div>
                  <h4 className="font-serif text-base font-semibold text-espresso-900">Best Budget Guarantee & Easy Payments (सही दाम, आसान पेमेंट)</h4>
                  <p className="text-xs text-sand-500 mt-0.5 leading-relaxed">
                    हर परिवार के बजट के अनुकूल सही और पारदर्शी दाम। नकद (Cash), UPI और बैंक ट्रांसफर के आसान भुगतान विकल्प। Transparent showroom prices with flexible payment options.
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
