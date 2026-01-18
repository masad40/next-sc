// components/Footer.jsx

import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-950 to-black text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
          {/* Brand & About */}
          <div className="space-y-5">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              ZIVORA
            </h3>
            <p className="text-gray-400 leading-relaxed text-base">
              A modern platform to discover, organize and manage your items with
              elegance and ease. Built for simplicity, speed, and privacy.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition-colors duration-200 flex items-center gap-2"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/items"
                  className="hover:text-white transition-colors duration-200 flex items-center gap-2"
                >
                  All Items
                </Link>
              </li>
              <li>
                <Link
                  href="/add-item"
                  className="hover:text-white transition-colors duration-200 flex items-center gap-2"
                >
                  Add New Item
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="hover:text-white transition-colors duration-200 flex items-center gap-2"
                >
                  Login / Register
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors duration-200 flex items-center gap-2"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Contact Us</h4>
            <ul className="space-y-5 text-gray-400">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-indigo-400 mt-1 flex-shrink-0" size={18} />
                <span>Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-indigo-400 flex-shrink-0" size={18} />
                <a
                  href="tel:+880 1616 259 928"
                  className="hover:text-white transition-colors duration-200"
                >
                  +880 1616 259 928
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-indigo-400 flex-shrink-0" size={18} />
                <a
                  href="mailto:tasnifmasad40@gmail.com"
                  className="hover:text-white transition-colors duration-200"
                >
                  tasnifmasad40@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media & Newsletter */}
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Follow Us</h4>
              <div className="flex gap-5">
                <a
                  href="https://www.facebook.com/tasnif.masad1"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 text-xl"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://x.com/tasnifmasad40"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="text-gray-400 hover:text-sky-400 transition-colors duration-300 text-xl"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://github.com/masad40"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-xl"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://www.linkedin.com/in/masad-webdev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-gray-400 hover:text-blue-500 transition-colors duration-300 text-xl"
                >
                  <FaLinkedinIn />
                </a>
              </div>
            </div>

            {/* Optional small newsletter teaser */}
            <div className="pt-2">
              <p className="text-sm text-gray-500">
                Stay updated with new features & items.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-gray-800 bg-black/40">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-gray-500">
          © {currentYear} ZIVORA. All rights reserved.  
          <span className="mx-2">•</span>
          Crafted with ♥ in Dhaka
        </div>
      </div>
    </footer>
  );
}