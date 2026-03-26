"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { SITE_DATA } from "@/lib/constants";
import Button from "@/components/ui/Button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-turquoise/20 py-4"
          : "bg-transparent border-b border-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <motion.span 
            className="w-3 h-3 rounded-full bg-turquoise"
            animate={{ 
              boxShadow: ["0 0 10px rgba(49,255,206,0.3)", "0 0 20px rgba(49,255,206,0.8)", "0 0 10px rgba(49,255,206,0.3)"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <h1 className="text-2xl tracking-wide font-bebas">
            <span className="text-turquoise">MAI</span>
            <span className="text-white">tink</span>
          </h1>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {SITE_DATA.navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="relative text-white/60 hover:text-white transition-colors duration-300 font-dm text-sm group"
            >
              {link.label}
              <span className="absolute bottom-[-4px] left-0 w-full h-[1px] bg-turquoise scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Button variant="primary" size="sm" className="hidden sm:flex">
          Falar com a Maitink
        </Button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
