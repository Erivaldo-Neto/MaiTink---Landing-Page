"use client";

import { useState, useEffect, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Início", href: "#" },
  { name: "Soluções", href: "#solucoes" },
  { name: "Sobre", href: "#sobre" },
  { name: "Planos", href: "#planos" },
  { name: "Contato", href: "#contato" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-400 ${
          scrolled
            ? "bg-black/85 backdrop-blur-xl border-b border-white/8 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "0 clamp(24px, 5vw, 96px)",
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
          }}
        >
          {/* ── Logo ── */}
          <motion.a
            href="#"
            className="flex items-center"
            style={{ textDecoration: "none" }}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span
              style={{
                fontFamily: "var(--font-poppins), Poppins, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(22px, 2vw, 28px)",
                letterSpacing: "-0.03em",
                lineHeight: 1,
              }}
            >
              <span style={{ color: "#31ffce" }}>MAI</span>
              <span style={{ color: "#ffffff" }}>tink</span>
            </span>
          </motion.a>

          {/* ── Desktop nav links ── */}
          <motion.div
            className="hidden lg:flex items-center"
            style={{ gap: "6px" }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {navLinks.map((link, index) => (
              <Fragment key={link.name}>
                <a
                  href={link.href}
                  style={{
                    color: "rgba(255,255,255,0.85)",
                    fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                    fontWeight: 500,
                    fontSize: "14px",
                    textDecoration: "none",
                    padding: "4px 10px",
                    borderRadius: "4px",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color = "#31ffce")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color =
                      "rgba(255,255,255,0.85)")
                  }
                >
                  {link.name}
                </a>
                {index < navLinks.length - 1 && (
                  <span
                    style={{
                      color: "rgba(255,255,255,0.25)",
                      fontSize: "16px",
                      lineHeight: 1,
                      userSelect: "none",
                    }}
                  >
                    ·
                  </span>
                )}
              </Fragment>
            ))}
          </motion.div>

          {/* ── Mobile hamburger ── */}
          <button
            className="lg:hidden text-white p-1"
            style={{ justifySelf: "end" }}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile overlay menu ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed",
              inset: 0,
              top: "64px",
              background: "rgba(4,10,16,0.97)",
              backdropFilter: "blur(20px)",
              zIndex: 40,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "32px",
              padding: "40px 24px",
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                style={{
                  color: "#ffffff",
                  fontFamily: "var(--font-poppins), Poppins, sans-serif",
                  fontWeight: 700,
                  fontSize: "28px",
                  textTransform: "uppercase",
                  letterSpacing: "-0.01em",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "#31ffce")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "#ffffff")
                }
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contato"
              onClick={() => setIsOpen(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(49,255,206,0.10)",
                color: "#31ffce",
                fontFamily: "var(--font-poppins), Poppins, sans-serif",
                fontWeight: 700,
                fontSize: "14px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                textDecoration: "none",
                padding: "0 32px",
                height: "48px",
                borderRadius: "8px",
                border: "1.5px solid rgba(49,255,206,0.60)",
                width: "100%",
                maxWidth: "320px",
              }}
            >
              Diagnóstico Gratuito
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
