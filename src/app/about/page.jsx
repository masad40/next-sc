// app/about/page.jsx

"use client";

import { 
  HiInformationCircle, 
  HiHeart, 
  HiShieldCheck, 
  HiLightningBolt, 
  HiUserGroup, 
  HiStar 
} from "react-icons/hi";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-purple-50 to-white">

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/40 via-purple-100/30 to-transparent" />
        
        <div className="relative max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center justify-center gap-4 mb-8">
            <HiInformationCircle className="text-indigo-600" size={56} />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            About ZIVORA
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            A clean, fast, and beautiful way to organize, discover, and manage the things that matter to you.
          </p>
        </div>
      </section>

      {/* Mission & Story */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 flex items-center gap-4">
              <HiHeart className="text-red-500" size={36} />
              Our Purpose
            </h2>

            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                ZIVORA started with a simple realization: most people struggle to keep track of their belongings — whether it's gadgets, clothes, books, collectibles or resale items.
              </p>
              
              <p>
                We built a platform that feels effortless and joyful to use — no clutter, no complexity, just elegant organization that works on your phone, tablet, or laptop.
              </p>
              
              <p className="font-medium text-indigo-700 pt-4 border-t border-gray-200">
                Our goal is to help you spend less time searching and more time enjoying what you own.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
            What We Stand For
          </h2>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                icon: <HiLightningBolt className="text-amber-500" size={48} />,
                title: "Speed & Simplicity",
                description: "Fast loading, intuitive interface, zero bloat."
              },
              {
                icon: <HiShieldCheck className="text-green-600" size={48} />,
                title: "Privacy First",
                description: "Your data is yours. No tracking, no selling."
              },
              {
                icon: <HiUserGroup className="text-indigo-600" size={48} />,
                title: "Built for Everyone",
                description: "Clean design that feels good on every device."
              },
            ].map((value, index) => (
              <div
                key={value.title}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:scale-[1.03] transition-all duration-500"
              >
                <div className="flex justify-center mb-6">{value.icon}</div>
                <h3 className="text-2xl font-bold text-center mb-4">{value.title}</h3>
                <p className="text-gray-600 text-center">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 md:py-28 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Ready to get organized?
          </h2>
          
          <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
            Join users who finally have a beautiful place for all their items.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <a
              href="/items"
              className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-all duration-300"
            >
              Browse All Items
            </a>
            <a
              href="/add-item"
              className="inline-flex items-center gap-3 px-8 py-4 border-2 border-indigo-600 text-indigo-700 font-semibold rounded-xl hover:bg-indigo-50 transition-all duration-300"
            >
              Add Your First Item
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}