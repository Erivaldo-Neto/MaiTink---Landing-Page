"use client";

import { motion } from "framer-motion";
import ShinyButton from "@/components/ui/shiny-button";
import AnimatedBorderButton from "@/components/ui/animated-border-button";


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
   PRESETS & TOKENS
──────────────────────────────────────────────────────── */
const NEON_TURQUOISE = "0 0 0 1.5px #31ffce, 0 0 15px rgba(49, 255, 206, 0.5), 0 0 40px rgba(49, 255, 206, 0.25), 0 0 80px rgba(49, 255, 206, 0.1)";
const NEON_TURQUOISE_INTENSE = "0 0 0 2px #31ffce, 0 0 25px rgba(49, 255, 206, 0.7), 0 0 60px rgba(49, 255, 206, 0.4), 0 0 120px rgba(49, 255, 206, 0.2)";
const NEON_YELLOW = "0 0 0 1.5px #ffed00, 0 0 15px rgba(255, 237, 0, 0.5), 0 0 40px rgba(255, 237, 0, 0.25), 0 0 80px rgba(255, 237, 0, 0.1)";
const TEXT_NEON_TURQUOISE = "0 0 5px #31ffce, 0 0 10px rgba(49, 255, 206, 0.4)";

/* ────────────────────────────────────────────────────────
   CARD COMPONENT
──────────────────────────────────────────────────────── */
interface PriceCardProps {
  name: string;
  price: string;
  description: string;
  buttonText: string;

  neonColor: "turquoise" | "yellow";
  delay: number;
}

const PriceCard = ({ name, price, description, buttonText, neonColor, delay }: PriceCardProps) => {
  const isTurbo = name === "TURBO";
  const shadow = isTurbo ? NEON_TURQUOISE_INTENSE : neonColor === "turquoise" ? NEON_TURQUOISE : NEON_YELLOW;
  
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      custom={delay}
      whileHover={!isTurbo ? { scale: 1.03 } : { scale: 1.05 }}
      className={`relative flex flex-col items-center gap-5 rounded-[1.25rem] p-10 text-center transition-all duration-300
        ${isTurbo ? "lg:scale-105 z-10" : "hover:z-20"}
      `}
      style={{
        background: "rgba(10, 10, 10, 0.55)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        boxShadow: shadow,
      }}
    >
      <h3 className={`font-bebas text-[2.2rem] leading-none ${isTurbo ? "text-[#31ffce]" : "text-white"}`}
        style={isTurbo ? { textShadow: TEXT_NEON_TURQUOISE } : {}}
      >
        {name}
      </h3>

      <div className="flex items-baseline gap-1">
        <span className="font-mono text-[2.2rem] md:text-[3rem] font-bold text-white tracking-tighter">
          {price}
        </span>
        <span className="font-dm text-base text-white/60">/mês</span>
      </div>

      <p className="font-dm text-[0.875rem] leading-relaxed text-white/55 max-w-[200px]">
        {description}
      </p>

      {isTurbo ? (
        <a href="#contato" className="w-full mt-2">
          <ShinyButton className="w-full h-14 text-lg">
            {buttonText}
          </ShinyButton>
        </a>
      ) : (
        <a href="#contato" className="w-full mt-2">
          {neonColor === "yellow" ? (
             <AnimatedBorderButton className="w-full h-14 text-lg">
               {buttonText}
             </AnimatedBorderButton>
          ) : (
            <ShinyButton className="w-full h-14 text-lg">
              {buttonText}
            </ShinyButton>
          )}
        </a>
      )}

    </motion.div>
  );
};

/* ────────────────────────────────────────────────────────
   MAIN SECTION
──────────────────────────────────────────────────────── */
const Plans = () => {
  return (
    <section 
      id="planos"
      className="relative flex min-h-screen w-full flex-col items-center justify-center py-24 overflow-hidden"
      style={{
        backgroundImage: "url('/assets/background-PlanosSection.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#0e0e0e",
      }}
    >
      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6">
        
        {/* Header */}
        <div className="mb-16 text-center space-y-4">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            custom={0}
            className="font-bebas text-white uppercase tracking-tight"
            style={{ fontSize: "clamp(2.8rem, 5vw, 4.5rem)", lineHeight: 1.1 }}
          >
            ESCOLHA A VELOCIDADE<br />DO SEU CRESCIMENTO.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            custom={1}
            className="font-dm text-[1.1rem] text-white/70 max-w-2xl mx-auto"
          >
            Todos os planos incluem IA de ponta. A diferença é o quanto você quer escalar.
          </motion.p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:gap-6 mb-12">
          {/* BASE */}
          <div className="order-1 md:order-1 lg:order-1">
            <PriceCard 
              name="BASE"
              price="R$1.497"
              description="3 serviços · 2 canais · suporte chat"
              buttonText="ASSINAR PLANO BASE"
              neonColor="turquoise"
              delay={2}
            />
          </div>

          {/* TURBO - Centralized in grid for desktop, or separate row for mobile/tablet if needed */}
          <div className="order-2 md:order-3 lg:order-2 md:col-span-2 lg:col-span-1 flex justify-center lg:block">
            <div className="w-full md:w-[60%] lg:w-full">
              <PriceCard 
                name="TURBO"
                price="R$2.997"
                description="6 serviços · 5 canais · gestor exclusivo"
                buttonText="ASSINAR PLANO TURBO"

                neonColor="turquoise"
                delay={3}
              />
            </div>
          </div>

          {/* ILIMITADO */}
          <div className="order-3 md:order-2 lg:order-3">
            <PriceCard 
              name="ILIMITADO"
              price="R$4.500"
              description="tudo incluso · equipe dedicada 24/7"
              buttonText="ASSINAR PLANO ILIMITADO"
              neonColor="yellow"
              delay={4}
            />
          </div>
        </div>

        {/* Personalized Plan */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          custom={5}
          className="flex w-full flex-col gap-8 rounded-[1.25rem] p-8 lg:flex-row lg:items-center lg:justify-between text-center lg:text-left"
          style={{
            background: "rgba(10, 10, 10, 0.55)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow: NEON_YELLOW
          }}
        >
          <div className="space-y-2">
            <h3 className="font-bebas text-[2rem] text-white uppercase leading-none">
              PLANO PERSONALIZADO
            </h3>
            <p className="font-dm text-[0.9rem] text-white/60">
              "Sua empresa tem necessidades únicas. Sua estratégia também deve ter."
            </p>
          </div>

          <a href="#contato" className="w-full lg:w-auto">
            <ShinyButton className="w-full px-8 h-14 text-[clamp(0.85rem,2.5vw,1.1rem)]">
              QUERO UM PLANO PERSONALIZADO →
            </ShinyButton>
          </a>

        </motion.div>

      </div>
    </section>
  );
};

export default Plans;
