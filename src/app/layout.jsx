// src/app/layout.jsx
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Navbar />
        {children}

        <Toaster position="top-right" />
       <Footer></Footer>
      </body>
    </html>
  );
}
