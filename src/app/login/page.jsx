// app/login/page.jsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { HiEye, HiEyeOff, HiUserCircle, HiLockClosed, HiInformationCircle } from "react-icons/hi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simple mock authentication (replace with real API call in production)
    if (email.trim() === "test@example.com" && password === "123456") {
      Cookies.set("auth", "true", { expires: 7, path: "/", sameSite: "strict" });
      toast.success("Welcome back! You're now logged in.", {
        icon: "👋",
        duration: 4000,
      });

      // Small delay for better UX + toast visibility
      setTimeout(() => {
        window.location.href = "/items";
        router.refresh(); // Refresh server components & Navbar state
      }, 800);
    } else {
      toast.error("Invalid email or password. Try the demo credentials below.");
    }

    setLoading(false);
  };
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full">
        {/* Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100/80 overflow-hidden animate-fade-up">
          {/* Header */}
          <div className="px-8 pt-10 pb-6 text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Welcome to ZIVORA
            </h1>
            <p className="mt-3 text-gray-600">
              Sign in to manage your items
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="px-8 pb-10 space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <div className="relative">
                <HiUserCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm"
                  placeholder="test@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <HiEyeOff size={22} /> : <HiEye size={22} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 hover:shadow-xl hover:scale-[1.02]"
              }`}
            >
              {loading ? (
                <>
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Demo Credentials (visible only for testing) */}
          <div className="px-8 pb-8 pt-4 border-t border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-2 text-sm text-indigo-700 mb-3">
              <HiInformationCircle size={18} />
              <span className="font-medium">Demo Credentials</span>
            </div>
            <div className="text-sm text-gray-600 space-y-1 bg-white/80 p-4 rounded-xl border border-gray-200">
              <p><strong>Email:</strong> test@example.com</p>
              <p><strong>Password:</strong> 123456</p>
            </div>
            <p className="mt-4 text-xs text-gray-500 text-center">
              Use these to explore the app (mock login)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}