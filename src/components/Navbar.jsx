"use client";

import Link from "next/link";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  HiHome,
  HiOutlineViewGrid,
  HiPlusCircle,
  HiLogin,
  HiLogout,
  HiMenu,
  HiX,
  HiInformationCircle,
  HiMail,
} from "react-icons/hi";
import toast from "react-hot-toast";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const auth = Cookies.get("auth");
      setIsLoggedIn(!!auth);
    };

    checkAuth();

    // Optional: you can add a storage listener if you want to react to cookie changes from other tabs
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogout = () => {
    Cookies.remove("auth");
    setIsLoggedIn(false);
    setMenuOpen(false);
    toast.success("Logged out successfully");
    router.push("/login");
    // Optional: router.refresh() if you use server components that depend on cookies
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const navLinkClass =
    "flex items-center gap-2 py-2 px-3 rounded-md hover:bg-gray-100 hover:text-blue-700 transition-colors font-medium text-gray-700";

  const mobileButtonClass =
    "flex items-center justify-center gap-2 px-5 py-3 font-medium rounded-lg transition-all";

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-gray-900 hover:text-blue-700 transition-colors"
          >
            <HiHome size={26} className="text-blue-600" />
            <span>ZIVORA</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            <Link href="/" className={navLinkClass}>
              <HiHome size={20} />
              Home
            </Link>

            <Link href="/items" className={navLinkClass}>
              <HiOutlineViewGrid size={20} />
              Items
            </Link>

            {isLoggedIn && (
              <Link href="/add-item" className={navLinkClass}>
                <HiPlusCircle size={20} />
                Add Item
              </Link>
            )}

            <Link href="/about" className={navLinkClass}>
              <HiInformationCircle size={20} />
              About
            </Link>

            <Link href="/contact" className={navLinkClass}>
              <HiMail size={20} />
              Contact
            </Link>

            <div className="ml-4">
              {!isLoggedIn ? (
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 shadow-sm hover:shadow transition-all font-medium"
                >
                  <HiLogin size={20} />
                  Login
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-6 py-2.5 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-all shadow-sm hover:shadow font-medium"
                >
                  <HiLogout size={20} />
                  Logout
                </button>
              )}
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700 focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-[500px] py-5" : "max-h-0 py-0"
        }`}
      >
        <div className="px-5 flex flex-col gap-2">
          <Link
            href="/"
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            <HiHome size={22} />
            Home
          </Link>

          <Link
            href="/items"
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            <HiOutlineViewGrid size={22} />
            Items
          </Link>

          {isLoggedIn && (
            <Link
              href="/add-item"
              className={navLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              <HiPlusCircle size={22} />
              Add Item
            </Link>
          )}

          <Link
            href="/about"
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            <HiInformationCircle size={22} />
            About
          </Link>

          <Link
            href="/contact"
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            <HiMail size={22} />
            Contact
          </Link>

          <div className="pt-4 mt-2 border-t border-gray-100">
            {!isLoggedIn ? (
              <Link
                href="/login"
                className={`${mobileButtonClass} bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700`}
                onClick={() => setMenuOpen(false)}
              >
                <HiLogin size={22} />
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className={`${mobileButtonClass} bg-gray-800 text-white hover:bg-gray-900`}
              >
                <HiLogout size={22} />
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}