"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";
import { X, Check } from "lucide-react";

const withoutAI = [
  "Processos manuais lentos",
  "Gasto excessivo com pessoal",
  "Decisões baseadas em 'achismo'",
  "Campanhas que não escalam",
];

const withAI = [
  "Automação instantânea",
  "Custo operacional reduzido em 60%",
  "Análise preditiva de dados",
  "Escala global sem fricção",
];

const WhatYoureMissing = () => {
  return (
    <SectionWrapper 
      id="perdas"
      variant="yellow"
      containerClassName="space-y-24"
      animateIn={false}
    >
      <div className="text-center space-y-6">
        <motion.h2 
          variants={fadeUp}
          className="text-black leading-tight uppercase h2-section"
        >
          CADA DIA SEM IA CUSTA MAIS<br />
          <span className="text-black/40">DO QUE VOCÊ IMAGINA.</span>
        </motion.h2>
        <motion.p 
          variants={fadeUp} 
          className="text-black/70 font-dm text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          Enquanto seus competidores automatizam, sua empresa ainda depende de processos 
          que a inteligência artificial resolve em segundos.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Left: Without AI */}
        <motion.div 
          variants={staggerContainer}
          className="space-y-3"
        >
          <div className="flex items-center gap-2 mb-4">
            <X className="text-black/20" size={16} />
            <span className="font-mono text-[10px] uppercase tracking-widest text-black/40 font-bold">HOJE (SEM IA)</span>
          </div>
          {withoutAI.map((item, i) => (
            <motion.div 
              key={i} 
              variants={fadeUp}
              className="bg-black/5 p-5 border border-black/5"
            >
              <span className="text-black/80 font-dm text-base">{item}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Right: With AI */}
        <motion.div 
          variants={staggerContainer}
          className="space-y-3"
        >
          <div className="flex items-center gap-2 mb-4">
            <Check className="text-turquoise" size={16} />
            <span className="font-mono text-[10px] uppercase tracking-widest text-turquoise font-bold">AMANHÃ (COM IA)</span>
          </div>
          {withAI.map((item, i) => (
            <motion.div 
              key={i} 
              variants={fadeUp}
              className="bg-black p-5 border border-turquoise/20"
            >
              <span className="text-white font-dm text-base">{item}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="text-center pt-8">
        <Button className="bg-black text-white px-12">Quero automatizar agora</Button>
      </div>
    </SectionWrapper>
  );
};

export default WhatYoureMissing;
