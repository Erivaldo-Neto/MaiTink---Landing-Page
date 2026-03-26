"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

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
   DATA
──────────────────────────────────────────────────────── */
const testimonials = [
  {
    metric: "+187% receita",
    name: "Ricardo Alves",
    company: "Vortex Store",
    text: "Em 60 dias nossa conversão triplicou. Parei de perder tempo com relatórios manuais.",
    color: "#31ffce",
  },
  {
    metric: "-40% custo",
    name: "Dra. Fernanda Costa",
    company: "CliniVida",
    text: "Nossa agenda está sempre cheia e o custo por paciente caiu 40%.",
    color: "#ffed00",
  },
  {
    metric: "R$380k em 7 dias",
    name: "Bruno Mendes",
    company: "Masterclass Digital",
    text: "Automação total de e-mail e tráfego. A Maitink transformou nossa operação.",
    color: "#31ffce",
  },
  {
    metric: "+3x leads",
    name: "Marcos Vieira",
    company: "Urbana Construtora",
    text: "Leads qualificados para alto padrão. Resolvido em semanas.",
    color: "#ffed00",
  },
  {
    metric: "3 contratos em 4 meses",
    name: "Patrícia Lima",
    company: "LogixPro",
    text: "B2B que 'não precisava de digital'. Em 4 meses, 3 contratos corporativos.",
    color: "#31ffce",
  },
];

// Double the items for seamless loop
const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];

/* ────────────────────────────────────────────────────────
   MAIN SECTION
──────────────────────────────────────────────────────── */
export default function Testimonials() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section
      ref={sectionRef}
      id="depoimentos"
      className="relative w-full py-24 overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% 0%, rgba(49,255,206,0.06) 0%, transparent 65%), #0a0a0a",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        
        {/* HEADER */}
        <div className="mb-16">
          <motion.span
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0}
            className="block font-dm text-[0.85rem] text-[#ffed00] uppercase tracking-[0.1em] mb-4"
          >
            Prova Social
          </motion.span>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={1}
            className="font-bebas text-white uppercase leading-[1.05]"
            style={{ fontSize: "clamp(2.8rem, 5vw, 4.5rem)" }}
          >
            EMPRESAS QUE PARARAM DE ADIVINHAR<br />
            <span 
              className="text-[#31ffce]"
              style={{ 
                textShadow: "0 0 5px #31ffce, 0 0 10px rgba(49, 255, 206, 0.4)" 
              }}
            >
              E COMEÇARAM A ESCALAR.
            </span>
          </motion.h2>
        </div>

        {/* MARQUEE CONTAINER */}
        <div className="relative pt-12 pb-12"> {/* Added top/bottom padding to fix clipping */}
          <motion.div
            className="flex gap-6 w-max"
            animate={{ x: isPaused ? undefined : ["0%", "-33.33%"] }}
            transition={{
              duration: 35,
              ease: "linear",
              repeat: Infinity,
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {extendedTestimonials.map((t, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, zIndex: 50 }}
                className="relative flex-shrink-0 w-[340px] md:w-[380px] bg-[rgba(10,10,10,0.6)] backdrop-blur-[24px] rounded-[1.25rem] p-8 transition-shadow duration-300"
                style={{
                  boxShadow: `0 0 0 1.5px ${t.color}40, 0 0 15px ${t.color}20`,
                }}
              >
                {/* Metric with softened neon */}
                <div className="mb-6">
                  <span
                    className="font-mono font-bold text-[1.6rem]"
                    style={{ 
                      color: t.color,
                      textShadow: `0 0 5px ${t.color}66` 
                    }}
                  >
                    {t.metric}
                  </span>
                </div>

                {/* Quote */}
                <div className="relative mb-8 min-h-[140px]">
                  <span className="absolute -top-4 -left-2 font-bebas text-[5rem] leading-none" style={{ color: `${t.color}33` }}>"</span>
                  <p className="font-dm italic text-[1rem] text-white/80 leading-relaxed relative z-10 pt-4">
                    "{t.text}"
                  </p>
                </div>

                {/* Separator */}
                <div className="h-[1px] w-full bg-white/10 my-6" />

                {/* Footer */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 border font-dm font-bold text-white text-lg backdrop-blur-md" style={{ borderColor: `${t.color}66` }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-dm font-semibold text-white leading-tight">{t.name}</h4>
                    <p className="font-dm text-[0.8rem] text-white/50">{t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Faded edges */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        </div>

      </div>
    </section>
  );
}
