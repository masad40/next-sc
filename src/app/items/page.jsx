"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  HiCurrencyBangladeshi,
  HiOutlineInformationCircle,
  HiSearch,
  HiX,
} from "react-icons/hi";

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchItems() {
      try {
        setLoading(true);
        const res = await fetch("https://item-app-server.vercel.app/items", {
          next: { revalidate: 1800 }, // ISR: revalidate every 30 min (good for semi-static data)
          cache: "force-cache",
        });

        if (!res.ok) throw new Error("Failed to load items");

        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error(err);
        setError("Couldn't load items. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, []);

  // Memoized filtered items (efficient for large lists)
  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return items;

    const term = searchTerm.toLowerCase().trim();
    return items.filter(
      (item) =>
        item.name?.toLowerCase().includes(term) ||
        item.description?.toLowerCase().includes(term)
    );
  }, [items, searchTerm]);

  const clearSearch = () => setSearchTerm("");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700">Loading beautiful items...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="text-center max-w-md px-6">
          <div className="text-red-500 text-6xl mb-4">!</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header + Search */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 flex items-center gap-3">
            <HiOutlineInformationCircle className="text-indigo-600" size={40} />
            <span>Explore Items</span>
          </h1>

          {/* Animated Search Bar */}
          <div className="relative w-full sm:w-96 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <HiSearch className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
            </div>

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or description..."
              className="block w-full pl-11 pr-12 py-3.5 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm transition-all duration-300 hover:shadow-md"
            />

            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-700 transition"
                aria-label="Clear search"
              >
                <HiX className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Results count */}
        {!loading && (
          <p className="text-gray-600 mb-8">
            Showing {filteredItems.length} {filteredItems.length === 1 ? "item" : "items"}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        )}

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl text-gray-300 mb-6">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-3">
              No items found
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Try adjusting your search or browse all categories.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-gray-100/80 hover:shadow-2xl hover:scale-[1.03] transition-all duration-500 animate-fade-up flex flex-col"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={
                      item.image ||
                      `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80`
                    }
                    alt={item.name || "Item"}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-700 transition-colors">
                    {item.name}
                  </h3>

                  <p className="text-indigo-600 font-bold text-xl mb-6 flex items-center gap-1.5">
                    <HiCurrencyBangladeshi size={22} />
                    {Number(item.price).toLocaleString()} BDT
                  </p>

                  <Link
                    href={`/items/${item.id}`}
                    className="mt-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-indigo-800 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    View Details
                    <HiOutlineInformationCircle size={20} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}