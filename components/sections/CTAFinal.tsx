"use client";

import React from "react";
import { motion } from "framer-motion";

/* ────────────────────────────────────────────────────────
   ANIMATIONS
──────────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  }),
};

/* ────────────────────────────────────────────────────────
   MAIN COMPONENT
──────────────────────────────────────────────────────── */
export default function CTAFinal() {
  return (
    <section
      id="cta-final"
      className="relative w-full min-h-[60vh] py-24 px-6 flex items-center bg-[#ffed00] overflow-hidden"
    >
      {/* Background Decorator Lines */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.06]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="diagonal-lines" patternUnits="userSpaceOnUse" width="40" height="40" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="40" stroke="#0a0a0a" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonal-lines)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[900px] mx-auto text-center space-y-12">
        
        {/* TITLES */}
        <div className="space-y-4">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="font-bebas text-[#0a0a0a] uppercase leading-[0.95] flex flex-col"
            style={{ fontSize: "clamp(3.5rem, 8vw, 6.5rem)" }}
          >
            <span className="block">O MERCADO NÃO ESPERA.</span>
            <span className="block">SUA EMPRESA TAMBÉM</span>
            <span 
              className="block"
              style={{
                WebkitTextStroke: "2px #0a0a0a",
                color: "transparent",
              }}
            >
              NÃO DEVERIA.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={4}
            className="font-dm text-[1.1rem] md:text-[1.25rem] text-[#0a0a0a]/70 max-w-2xl mx-auto"
          >
            "Cada dia sem automação é receita deixada na mesa. Comece agora."
          </motion.p>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <motion.a
            href="#contato"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={5}
            whileHover={{ scale: 1.03, translateY: -3, boxShadow: "0 10px 30px rgba(49,255,206,0.3)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full md:w-auto px-10 py-5 bg-[#31ffce] text-[#0a0a0a] font-bebas text-[1.4rem] uppercase tracking-wider rounded-[0.5rem] shadow-[0_4px_20px_rgba(49,255,206,0.2)] transition-all flex items-center justify-center"
          >
            Agendar uma reunião
          </motion.a>

          <motion.a
            href="#planos"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={6}
            whileHover={{ scale: 1.03, translateY: -3, backgroundColor: "rgba(0,0,0,0.06)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full md:w-auto px-10 py-5 border-2 border-[#0a0a0a] text-[#0a0a0a] font-bebas text-[1.4rem] uppercase tracking-wider rounded-[0.5rem] transition-all flex items-center justify-center"
          >
            Ver os Planos
          </motion.a>
        </div>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={7}
          className="font-dm italic text-[0.95rem] text-[#0a0a0a]/50"
        >
          "Sem fidelidade. Sem burocracia. Só resultado."
        </motion.p>

      </div>
    </section>
  );
}
