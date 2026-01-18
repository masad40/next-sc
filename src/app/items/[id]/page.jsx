"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  HiShoppingCart,
  HiCheckCircle,
  HiArrowLeft,
  HiShare,
  HiHeart,
} from "react-icons/hi";

export default function ItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBought, setIsBought] = useState(false);

  useEffect(() => {
    async function fetchItem() {
      try {
        setLoading(true);
        const res = await fetch(`https://item-app-server.vercel.app/items/${id}`, {
          next: { revalidate: 3600 }, // ISR: revalidate every hour
          cache: "force-cache",
        });

        if (!res.ok) throw new Error("Item not found");

        const data = await res.json();
        setItem(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load item details. It may not exist.");
      } finally {
        setLoading(false);
      }
    }

    fetchItem();
  }, [id]);

  const handleBuy = () => {
    // In real app → call API to create order / update user purchases
    toast.success("Purchase successful! 🎉", {
      icon: "🛒",
      duration: 4000,
    });
    setIsBought(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse flex flex-col md:flex-row gap-12">
            <div className="w-full md:w-1/2 h-96 bg-gray-200 rounded-2xl" />
            <div className="flex-1 space-y-6">
              <div className="h-10 bg-gray-200 rounded w-3/4" />
              <div className="h-6 bg-gray-200 rounded w-full" />
              <div className="h-6 bg-gray-200 rounded w-5/6" />
              <div className="h-12 bg-gray-200 rounded w-1/3 mt-8" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="text-center max-w-md px-6">
          <div className="text-red-500 text-7xl mb-6">404</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Item Not Found</h2>
          <p className="text-gray-600 mb-8">{error || "The item you're looking for doesn't exist."}</p>
          <Link
            href="/items"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
          >
            <HiArrowLeft size={20} />
            Back to Items
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back & Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <Link
            href="/items"
            className="inline-flex items-center gap-2 text-indigo-700 hover:text-indigo-900 font-medium transition group"
          >
            <HiArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to All Items
          </Link>

          <div className="flex items-center gap-4">
            <button
              aria-label="Add to wishlist"
              className="p-3 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-pink-50 hover:border-pink-300 transition"
            >
              <HiHeart size={22} className="text-gray-600 hover:text-pink-600 transition" />
            </button>
            <button
              aria-label="Share"
              className="p-3 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition"
            >
              <HiShare size={22} className="text-gray-600 hover:text-blue-600 transition" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-100/80 p-8 lg:p-12 animate-fade-up">
          {/* Image Section */}
          <div className="relative overflow-hidden rounded-2xl group shadow-inner">
            <img
              src={
                item.image ||
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80"
              }
              alt={item.name || "Product image"}
              className="w-full h-[500px] md:h-[600px] object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4 animate-fade-up [animation-delay:150ms]">
                {item.name}
              </h1>

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium mb-6 animate-fade-up [animation-delay:250ms]">
                <HiCheckCircle size={18} />
                In Stock
              </div>

              <p className="text-lg text-gray-700 leading-relaxed mb-10 animate-fade-up [animation-delay:350ms]">
                {item.description || "No description available for this item."}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-baseline gap-3 animate-fade-up [animation-delay:450ms]">
                <span className="text-5xl font-bold text-indigo-700">
                  {Number(item.price).toLocaleString()}
                </span>
                <span className="text-2xl font-semibold text-gray-600">BDT</span>
              </div>

              <button
                onClick={handleBuy}
                disabled={isBought}
                className={`w-full md:w-auto px-10 py-5 rounded-2xl font-bold text-lg shadow-xl transition-all duration-300 flex items-center justify-center gap-3 animate-fade-up [animation-delay:550ms] ${
                  isBought
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 hover:scale-[1.02] hover:shadow-2xl text-white"
                }`}
              >
                {isBought ? (
                  <>
                    Purchased <HiCheckCircle size={24} />
                  </>
                ) : (
                  <>
                    Buy Now <HiShoppingCart size={24} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}