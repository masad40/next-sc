"use client";

import { useEffect, useState } from "react";
import {
  HiLightningBolt,
  HiLockClosed,
  HiAdjustments,
  HiDeviceTablet,
  HiTag,
  HiShoppingCart,
  HiCheckCircle,
  HiUserGroup,
  HiArrowRight,
} from "react-icons/hi";

export default function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await fetch("https://item-app-server.vercel.app/items", {
          next: { revalidate: 3600 }, 
        });
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        setItems(data.slice(0, 6)); 
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchItems();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">

      {/* Hero - Premium with overlay gradient + image */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1556740714-a8395b3a74dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Modern tech workspace"
            className="w-full h-full object-cover brightness-75 scale-105 transition-transform duration-10000"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/65 via-purple-900/55 to-blue-950/60" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex mb-8 animate-float">
            <HiDeviceTablet className="text-blue-400" size={72} />
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 animate-fade-up">
            Discover & Manage
            <span className="block bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
              Your Items Elegantly
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-12 animate-fade-up [animation-delay:200ms]">
            A modern, fast and beautiful item management platform built with Next.js
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/login"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-indigo-700 font-semibold rounded-xl shadow-2xl hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg animate-pulse-scale"
            >
              Get Started
              <HiArrowRight size={22} />
            </a>
            <a
              href="/items"
              className="inline-flex items-center gap-3 px-8 py-4 border-2 border-white/50 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 text-lg"
            >
              Explore Items
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900 animate-fade-up">
            Powerful Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { icon: <HiLightningBolt className="text-amber-500" size={48} />, title: "Lightning Fast", desc: "Instant performance & smooth experience" },
              { icon: <HiLockClosed className="text-red-500" size={48} />, title: "Secure by Design", desc: "Protected data with modern auth" },
              { icon: <HiAdjustments className="text-emerald-500" size={48} />, title: "Intuitive UI", desc: "Clean, beautiful & easy to use" },
            ].map((f, i) => (
              <div
                key={f.title}
                className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-500 animate-fade-up"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="flex justify-center mb-6">{f.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-center">{f.title}</h3>
                <p className="text-gray-600 text-center">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-gradient-to-br from-gray-100 to-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 animate-fade-up">
            Popular Categories
          </h2>
          <div className="flex flex-wrap justify-center gap-5">
            {["Electronics", "Fashion", "Books", "Accessories", "Home", "Collectibles"].map((cat, i) => (
              <div
                key={cat}
                className="px-7 py-4 bg-white rounded-full shadow-md border border-gray-200 hover:border-blue-400 hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-3 animate-fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <HiShoppingCart className="text-blue-600" size={24} />
                <span className="font-medium text-gray-800">{cat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 animate-fade-up">
            Featured Items
          </h2>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-2xl h-96 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {items.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="group bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-2xl hover:scale-[1.03] transition-all duration-500 animate-fade-up"
                  style={{ animationDelay: `${idx * 120}ms` }}
                >
                  <div className="h-64 overflow-hidden relative">
                    <img
                      src={item.image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                      alt={item.name || "Item"}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 line-clamp-1">{item.name}</h3>
                    <p className="text-gray-600 line-clamp-3">{item.description || "No description available"}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="py-16 md:py-24">
    <div className="text-center mb-12 md:mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 animate-fade-up">
        <HiUserGroup className="inline-block mr-3 text-indigo-600" size={36} />
        Loved by Real Users
      </h2>
      <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto animate-fade-up [animation-delay:150ms]">
        See what people are saying about managing their items with ZIVORA
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        {
          quote: "Finally an easy way to track all my gadgets and books. The add-item form is super clean!",
          author: "Sarah K.",
          role: "Freelance Designer",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
        },
        {
          quote: "Used it for my small resale business — saved me hours every week. Highly recommend!",
          author: "Rahim M.",
          role: "Online Seller",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
        },
        {
          quote: "The interface is beautiful and it actually loads fast even with many items. Great job!",
          author: "Ayesha R.",
          role: "Tech Enthusiast",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
        },
      ].map((testimonial, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 animate-fade-up hover:-translate-y-1"
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <div className="flex items-center gap-4 mb-5">
            <img
              src={testimonial.avatar}
              alt={testimonial.author}
              className="w-14 h-14 rounded-full object-cover border-2 border-indigo-100"
            />
            <div>
              <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
            </div>
          </div>
          <p className="text-gray-700 italic leading-relaxed">“{testimonial.quote}”</p>
        </div>
      ))}
    </div>
  </section>

  {/* ==================== NEW SECTION 2: FAQ ==================== */}
  <section className="py-16 md:py-24 bg-gray-50 rounded-3xl">
    <div className="text-center mb-12 md:mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 animate-fade-up">
        Frequently Asked Questions
      </h2>
      <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto animate-fade-up [animation-delay:150ms]">
        Got questions? We've got clear answers.
      </p>
    </div>

    <div className="max-w-4xl mx-auto space-y-6 px-4">
      {[
        {
          q: "Is ZIVORA free to use?",
          a: "Yes! Basic features are completely free. Premium features (like unlimited storage, advanced search, export) are coming soon with optional paid plans."
        },
        {
          q: "Can I add photos to my items?",
          a: "Absolutely. You can upload images directly when adding or editing an item. We also support image URLs from anywhere."
        },
        {
          q: "Is my data secure?",
          a: "Yes — we use secure authentication and your data is stored safely. We never sell or share your personal information."
        },
        {
          q: "Can I access it on mobile?",
          a: "Fully responsive — works great on phones, tablets, and desktops. No separate app needed (yet!)."
        },
      ].map((faq, index) => (
        <details
          key={index}
          className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-fade-up"
          style={{ animationDelay: `${index * 120}ms` }}
        >
          <summary className="flex justify-between items-center cursor-pointer p-6 text-lg font-medium text-gray-900 hover:bg-gray-50 transition-colors">
            {faq.q}
            <span className="ml-4 text-indigo-600 group-open:rotate-180 transition-transform">
              ▼
            </span>
          </summary>
          <div className="px-6 pb-6 pt-2 text-gray-700">
            {faq.a}
          </div>
        </details>
      ))}
    </div>
  </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-indigo-600 to-blue-700 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 animate-fade-up">
            Ready to Get Organized?
          </h2>
          <p className="text-xl md:text-2xl opacity-90 mb-10">
            Start managing your items smarter today.
          </p>
          <a
            href="/login"
            className="inline-flex items-center gap-4 px-10 py-5 bg-white text-indigo-700 font-bold text-xl rounded-xl shadow-2xl hover:bg-gray-100 hover:scale-105 transition-all duration-300 animate-pulse-scale"
          >
            Begin Now
            <HiArrowRight size={28} />
          </a>
        </div>
      </section>
    </main>
  );
}