"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

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

const accordionAnim = {
  hidden: { height: 0, opacity: 0 },
  visible: { 
    height: "auto", 
    opacity: 1,
    transition: {
      height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
      opacity: { duration: 0.25, delay: 0.15 }
    }
  },
  exit: { 
    height: 0, 
    opacity: 0,
    transition: {
      height: { duration: 0.3, ease: "easeIn" },
      opacity: { duration: 0.2 }
    }
  }
};

/* ────────────────────────────────────────────────────────
   DATA
──────────────────────────────────────────────────────── */
const faqData = [
  {
    q: "Preciso entender de IA para contratar?",
    a: "Não. Você cuida do negócio, nós da inteligência.",
  },
  {
    q: "Quanto tempo para ver resultados?",
    a: "Primeiros sinais em 2 semanas. Resultados sólidos em 30–60 dias.",
  },
  {
    q: "As IAs mudam com o tempo?",
    a: "Sim. Sempre usamos as mais avançadas disponíveis.",
  },
  {
    q: "Funciona para meu segmento?",
    a: "Se precisa de mais clientes e menos custo — funciona.",
  },
  {
    q: "E se quiser cancelar?",
    a: "Sem fidelidade nos planos mensais.",
  },
  {
    q: "O personalizado é muito mais caro?",
    a: "Muitas vezes sai mais barato — pagamos só pelo necessário.",
  },
];

/* ────────────────────────────────────────────────────────
   FA ITEM
──────────────────────────────────────────────────────── */
function FAQItem({ item, i, isOpen, setOpen }: { item: typeof faqData[0], i: number, isOpen: boolean, setOpen: (v: number | null) => void }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={i}
      className={`relative group border-[1.5px] rounded-[0.75rem] transition-all duration-300 overflow-hidden cursor-pointer
        ${isOpen ? "bg-[#31ffce12] border-[#31ffce66] shadow-[0_0_20px_#31ffce14]" : "bg-white/[0.03] border-white/10 hover:border-[#31ffce4d]"}
      `}
      onClick={() => setOpen(isOpen ? null : i)}
    >
      {/* Header */}
      <div className="p-6 md:px-8 py-5 md:py-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <span className="font-mono text-[0.75rem] text-[#ffed00]/70">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="font-dm font-semibold text-[1rem] md:text-[1.1rem] text-white/90 group-hover:text-white transition-colors">
            {item.q}
          </h3>
        </div>
        
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="text-[#31ffce] shrink-0"
        >
          <Plus size={22} />
        </motion.div>
      </div>

      {/* Body */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={accordionAnim}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="px-8 md:pl-20 pb-6">
              <div className="h-[1px] w-full bg-[#31ffce]/10 mb-4" />
              <p className="font-dm text-[0.95rem] text-white/65 leading-relaxed">
                {item.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────
   MAIN SECTION
──────────────────────────────────────────────────────── */
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative w-full py-24 px-6 overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% 100%, rgba(255,237,0,0.05) 0%, transparent 60%), #111111",
      }}
    >
      <div className="max-w-[860px] mx-auto">
        
        {/* HEADER */}
        <div className="mb-16 text-center space-y-4">
          <motion.span
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={0}
            viewport={{ once: true }}
            className="block font-dm text-[0.85rem] text-[#ffed00] uppercase tracking-[0.1em] mb-2"
          >
            Dúvidas Frequentes
          </motion.span>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={1}
            viewport={{ once: true }}
            className="font-bebas text-white uppercase leading-[1.05]"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            VOCÊ TEM DÚVIDAS.<br />
            <span 
              className="text-[#31ffce]"
              style={{ 
                textShadow: "0 0 5px #31ffce, 0 0 10px rgba(49, 255, 206, 0.4)" 
              }}
            >
              A IA TEM RESPOSTAS.
            </span>
          </motion.h2>
        </div>

        {/* LIST */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-4"
        >
          {faqData.map((item, i) => (
            <FAQItem 
              key={i} 
              item={item} 
              i={i} 
              isOpen={openIndex === i} 
              setOpen={setOpenIndex} 
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
