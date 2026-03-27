"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Cpu, Layers, RefreshCcw, Building2, CircleDollarSign, FileText, ShieldCheck } from "lucide-react";

/* ────────────────────────────────────────────────────────
   ANIMATED METRIC (Reused logic)
──────────────────────────────────────────────────────── */
function AnimatedMetric({
  value,
  suffix = "",
  prefix = "",
  color = "#31ffce",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  color?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(0);
  const spring = useSpring(count, { stiffness: 60, damping: 15 });
  const display = useTransform(spring, (v) => `${prefix}${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (isInView) count.set(value);
  }, [isInView, count, value]);

  return (
    <motion.span
      ref={ref}
      style={{
        color,
        filter: `drop-shadow(0 0 10px ${color}) drop-shadow(0 0 20px ${color}40)`,
      }}
      className="font-[var(--font-poppins)] font-bold text-3xl md:text-4xl leading-none"
    >
      {display}
    </motion.span>
  );
}

/* ────────────────────────────────────────────────────────
   ANIMATIONS
──────────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.215, 0.61, 0.355, 1] },
  }),
};

const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay: 0.3, duration: 0.8, ease: "easeOut" },
  },
};

/* ────────────────────────────────────────────────────────
   MAIN COMPONENT
──────────────────────────────────────────────────────── */
export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const neonText = {
    color: "#ffed00",
    textShadow: "0 0 5px rgba(255, 237, 0, 0.4)",
  };

  const pillStyle = {
    background: "rgba(49, 255, 206, 0.08)",
    border: "1px solid rgba(49, 255, 206, 0.4)",
    borderRadius: "4px",
    padding: "1px 8px",
    color: "#31ffce",
    textShadow: "0 0 5px rgba(49, 255, 206, 0.4)",
  };

  return (
    <section
      ref={ref}
      id="sobre"
      className="relative w-full min-h-screen py-32 overflow-hidden flex items-center"
      style={{
        backgroundImage: 'url("/assets/background-SobreSection.webp")',
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#0e0e0e",
      }}
    >
      {/* Background Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0e0e0e]/50 via-transparent to-[#0e0e0e]/80 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-16 items-center">
          
          {/* ───────────────── LEFT COLUMN ───────────────── */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col space-y-8"
          >
            {/* Label */}
            <motion.span
              custom={0}
              variants={fadeUp}
              className="font-[var(--font-poppins)] text-xs md:text-sm text-[#ffed00] uppercase tracking-[0.2em] font-medium"
            >
              Sobre a Maitink
            </motion.span>

            {/* Main Title */}
            <h2 className="font-[var(--font-poppins)] font-bold text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] uppercase">
              <motion.span custom={1} variants={fadeUp} className="text-white block">
                Nascemos para
              </motion.span>
              <motion.span custom={2} variants={fadeUp} className="block mt-1">
                <span style={neonText}>Automatizar</span> <span className="text-white">o que</span>
              </motion.span>
              <motion.span custom={3} variants={fadeUp} className="text-white block mt-1">
                Trava seu crescimento.
              </motion.span>
            </h2>

            {/* Paragraphs */}
            <div className="space-y-6 max-w-2xl">
              <motion.p custom={4} variants={fadeUp} className="text-white font-[var(--font-dm-sans)] text-lg leading-relaxed">

                A Maitink nasceu da frustração com agências tradicionais que entregam pouco,
                cobram muito e demoram demais.
              </motion.p>
              <motion.p custom={5} variants={fadeUp} className="text-white font-[var(--font-dm-sans)] text-lg leading-relaxed">

                Nossa missão é colocar as <span style={pillStyle}>IAs mais poderosas</span> do mundo
                a serviço da sua empresa.
              </motion.p>
              <motion.p custom={6} variants={fadeUp} className="text-white font-[var(--font-dm-sans)] font-semibold text-xl">
                Sem burocracia. Sem desperdício. Sem limite.
              </motion.p>
            </div>

            {/* Differentials */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
              {[
                { icon: Cpu, text: <>Usamos as <span style={{ ...neonText, fontSize: 'inherit' }}>IAs mais avançadas</span> — e evoluímos com a tecnologia</> },
                { icon: Layers, text: <>Cada cliente recebe uma <span style={{ ...neonText, fontSize: 'inherit' }}>stack de IA</span> personalizada</> },
                { icon: RefreshCcw, text: <>Ciclos contínuos de <span style={{ ...neonText, fontSize: 'inherit' }}>otimização</span> — seu marketing nunca para</> },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  custom={7 + i}
                  variants={fadeUp}
                  className="flex flex-col space-y-4"
                >
                  <item.icon size={28} style={{ color: "#31ffce", filter: "drop-shadow(0 0 10px rgba(49, 255, 206, 0.6))" }} />
                  <p className="text-white text-sm leading-relaxed font-[var(--font-dm-sans)]">
                    {item.text}
                  </p>

                </motion.div>
              ))}
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-white/5">
              {[
                { icon: Building2, val: 150, suffix: "+", label: "empresas" },
                { icon: CircleDollarSign, val: 12, prefix: "R$", suffix: "M+", label: "em receita gerada" },
                { icon: FileText, val: 450, suffix: "+", label: "projetos" },
                { icon: ShieldCheck, val: 99, suffix: "%", label: "retenção" },
              ].map((metric, i) => (
                <motion.div
                  key={i}
                  custom={10 + i}
                  variants={fadeUp}
                  className="flex flex-col items-start space-y-2"
                >
                  <metric.icon size={20} className="text-[#31ffce]" style={{ filter: "drop-shadow(0 0 8px #31ffce)" }} />
                  <div className="flex items-baseline">
                    <AnimatedMetric
                      value={metric.val}
                      prefix={metric.prefix}
                      suffix={metric.suffix}
                      color="#31ffce"
                    />
                  </div>
                  <span className="font-[var(--font-poppins)] uppercase text-[10px] tracking-widest text-white font-bold">
                    {metric.label}
                  </span>

                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ───────────────── RIGHT COLUMN ───────────────── */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeRight}
            className="relative w-full aspect-[4/5] lg:aspect-auto h-[400px] lg:h-[600px] flex items-center justify-center"
          >
            {/* Orb behind image */}
            <div className="absolute w-[120%] h-[120%] bg-[#ffed00]/10 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_0_0_1.5px_#31ffce,0_0_20px_rgba(49,255,206,0.4),0_0_60px_rgba(49,255,206,0.15),0_0_120px_rgba(49,255,206,0.08)]">
              {/* Fallback pattern if image is missing, but user says it exists correctly in public/assets or unsplash */}
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
                alt="Equipe Maitink"
                fill
                priority
                className="object-cover"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
