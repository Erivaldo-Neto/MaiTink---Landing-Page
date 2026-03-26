"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  MotionValue,
} from "framer-motion";
import {
  Clock,
  Rocket,
  Users,
  Wallet,
  Ban,
  Zap,
  TrendingUp,
  Asterisk,
  AlertTriangle,
  Sparkles,
} from "lucide-react";

/* ────────────────────────────────────────────────────────
   TYPES & DATA
──────────────────────────────────────────────────────── */
type PairData = {
  id: number;
  type: "right-turq" | "left-yell";
  color: string;
  problem: {
    icon: React.ElementType;
    label: string;
    text: string;
  };
  solution: {
    icon: React.ElementType;
    metric: string;
    isPercent?: boolean;
    isX?: boolean;
    isPlusPercent?: boolean;
    title: string;
    desc: string;
  };
};

const PAIRS: PairData[] = [
  {
    id: 1,
    type: "right-turq",
    color: "#31ffce",
    problem: { icon: Clock, label: "O GARGALO", text: "Horas perdidas em tarefas manuais" },
    solution: { icon: Rocket, metric: "80", isPercent: true, title: "Processos automáticos 24h", desc: "Redução imediata em esforço operacional" },
  },
  {
    id: 2,
    type: "left-yell",
    color: "#ffed00",
    problem: { icon: Users, label: "O CUSTO", text: "Equipes grandes, resultados pequenos" },
    solution: { icon: Wallet, metric: "60", isPercent: true, title: "Reduza 60% do custo operacional", desc: "Eficiência financeira em escala neural" },
  },
  {
    id: 3,
    type: "right-turq",
    color: "#31ffce",
    problem: { icon: Ban, label: "A LENTIDÃO", text: "Campanhas lentas, dias para sair do papel" },
    solution: { icon: Zap, metric: "10", isX: true, title: "Campanhas no ar em minutos", desc: "Velocidade de execução exponencial" },
  },
  {
    id: 4,
    type: "left-yell",
    color: "#ffed00",
    problem: { icon: Asterisk, label: "A PERDA", text: "Leads esfriando sem acompanhamento" },
    solution: { icon: TrendingUp, metric: "45", isPlusPercent: true, title: "Mais fechamentos automáticos", desc: "Follow-up inteligente sem intervenção humana" },
  },
  {
    id: 5,
    type: "right-turq",
    color: "#31ffce",
    problem: { icon: AlertTriangle, label: "O RISCO", text: "Concorrentes escalando mais rápido" },
    solution: { icon: Sparkles, metric: "3", isX: true, title: "Escale na velocidade do mercado", desc: "Domínio tecnológico e vantagem competitiva" },
  },
];

/* ────────────────────────────────────────────────────────
   COUNT UP
──────────────────────────────────────────────────────── */
function NumberCountUp({ finalVal, active, suffix, prefix }: {
  finalVal: string; active: boolean; suffix?: string; prefix?: string;
}) {
  const [val, setVal] = useState(0);
  const targetNum = parseInt(finalVal.replace(/\D/g, ""), 10);

  useEffect(() => {
    if (!active) { setVal(0); return; }
    const start = performance.now();
    let rAF: number;
    const update = (now: number) => {
      const p = Math.min((now - start) / 800, 1);
      const easeOut = 1 - Math.pow(1 - p, 4);
      setVal(Math.floor(easeOut * targetNum));
      if (p < 1) rAF = requestAnimationFrame(update);
    };
    rAF = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rAF);
  }, [active, targetNum]);

  return <span>{prefix}{val}{suffix}</span>;
}

/* ────────────────────────────────────────────────────────
   PROBLEM CARD
──────────────────────────────────────────────────────── */
const ProblemCard = React.forwardRef<HTMLDivElement, { data: PairData }>(
  ({ data }, ref) => {
    const Icon = data.problem.icon;
    return (
      <div
        ref={ref}
        className="w-full rounded-xl p-6 relative"
        style={{ backgroundColor: "#1a1a1a", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-3 mb-4">
          <Icon size={16} className="text-red-500/80" />
          <span className="text-[10px] font-bold text-white/40 tracking-[0.1em] uppercase font-[var(--font-jetbrains-mono)]">
            {data.problem.label}
          </span>
        </div>
        <p className="text-white/90 font-medium text-lg leading-snug">{data.problem.text}</p>
      </div>
    );
  }
);
ProblemCard.displayName = "ProblemCard";

/* ────────────────────────────────────────────────────────
   SOLUTION CARD
──────────────────────────────────────────────────────── */
const SolutionCard = React.forwardRef<HTMLDivElement, { data: PairData; isActive: boolean }>(
  ({ data, isActive }, ref) => {
    const Icon = data.solution.icon;
    const glowShadow = `0 0 20px ${data.color}80, 0 0 60px ${data.color}33`;
    const suffix = data.solution.isPercent ? "%" : data.solution.isX ? "x" : "";
    const prefix = data.solution.isPlusPercent ? "+" : "";

    return (
      <motion.div
        ref={ref}
        className="w-full rounded-xl p-8 relative z-10"
        animate={{
          borderColor: isActive ? data.color : "rgba(255,255,255,0.08)",
          backgroundColor: isActive ? `${data.color}14` : "rgba(255,255,255,0.02)",
          boxShadow: isActive ? glowShadow : "0 0 0px transparent",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{ border: "1.5px solid rgba(255,255,255,0.08)" }}
      >
        <div className="flex justify-between items-start mb-6">
          <motion.div animate={isActive ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.4 }}>
            <Icon size={24} color={isActive ? data.color : "#ffffff40"} />
          </motion.div>
          <div className="font-[var(--font-poppins)] font-bold text-4xl leading-none" style={{ color: isActive ? data.color : "#ffffff40" }}>
            {isActive ? (
              <NumberCountUp finalVal={data.solution.metric} active={isActive} suffix={suffix} prefix={prefix} />
            ) : (
              `0${suffix}`
            )}
          </div>
        </div>
        <h3 className="text-white font-bold text-xl mb-2 transition-opacity duration-300" style={{ opacity: isActive ? 1 : 0.4 }}>
          {data.solution.title}
        </h3>
        <p className="text-white/50 text-sm transition-opacity duration-300" style={{ opacity: isActive ? 1 : 0.4 }}>
          {data.solution.desc}
        </p>
      </motion.div>
    );
  }
);
SolutionCard.displayName = "SolutionCard";

/* ────────────────────────────────────────────────────────
   ANIMATED PATH SEGMENT (SVG neon line)
──────────────────────────────────────────────────────── */
function AnimatedPath({ d, color, progress, glow = 6 }: {
  d: string; color: string; progress: MotionValue<number>; glow?: number;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const [len, setLen] = useState(0);

  useEffect(() => {
    if (pathRef.current) setLen(pathRef.current.getTotalLength());
  }, [d]);

  const dashOffset = useTransform(progress, [0, 1], [len, 0]);

  if (!d || len === 0) return (
    // Hidden path just to measure length
    <path ref={pathRef} d={d} fill="none" stroke="none" />
  );

  return (
    <>
      {/* Glow layer */}
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: len,
          strokeDashoffset: dashOffset,
          filter: `drop-shadow(0 0 ${glow}px ${color}) drop-shadow(0 0 ${glow * 2}px ${color}40)`,
        }}
      />
      {/* Core sharp line */}
      <motion.path
        ref={pathRef}
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: len,
          strokeDashoffset: dashOffset,
        }}
      />
    </>
  );
}

/* ────────────────────────────────────────────────────────
   MAIN TIMELINE SECTION
──────────────────────────────────────────────────────── */
export default function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const solutionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [paths, setPaths] = useState<{ d: string; color: string }[]>([]);
  const [mobilePaths, setMobilePaths] = useState<{ d: string; color: string }[]>([]);
  const [activeCards, setActiveCards] = useState<boolean[]>(new Array(5).fill(false));
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ── SCROLL PROGRESS ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 15%"],
  });

  /* ── DESKTOP: 5 path segments (one L-shape per solution card) ── */
  // Seg 0-2: normal pacing. Seg 3-4: compressed range = faster draw
  const seg0 = useTransform(scrollYProgress, [0.00, 0.18], [0, 1]);
  const seg1 = useTransform(scrollYProgress, [0.16, 0.36], [0, 1]);
  const seg2 = useTransform(scrollYProgress, [0.34, 0.54], [0, 1]);
  const seg3 = useTransform(scrollYProgress, [0.52, 0.65], [0, 1]); // faster
  const seg4 = useTransform(scrollYProgress, [0.63, 0.78], [0, 1]); // faster
  const desktopSegs = [seg0, seg1, seg2, seg3, seg4];

  /* ── MOBILE: 10 segments (vert+branch per pair × 5) ── */
  const mseg0 = useTransform(scrollYProgress, [0.00, 0.10], [0, 1]);
  const mseg1 = useTransform(scrollYProgress, [0.08, 0.18], [0, 1]);
  const mseg2 = useTransform(scrollYProgress, [0.18, 0.28], [0, 1]);
  const mseg3 = useTransform(scrollYProgress, [0.26, 0.36], [0, 1]);
  const mseg4 = useTransform(scrollYProgress, [0.36, 0.46], [0, 1]);
  const mseg5 = useTransform(scrollYProgress, [0.44, 0.54], [0, 1]);
  const mseg6 = useTransform(scrollYProgress, [0.54, 0.62], [0, 1]); // faster
  const mseg7 = useTransform(scrollYProgress, [0.60, 0.68], [0, 1]); // faster
  const mseg8 = useTransform(scrollYProgress, [0.67, 0.75], [0, 1]); // faster
  const mseg9 = useTransform(scrollYProgress, [0.73, 0.82], [0, 1]); // faster
  const mobileSegs = [mseg0, mseg1, mseg2, mseg3, mseg4, mseg5, mseg6, mseg7, mseg8, mseg9];

  /* ── CARD ACTIVATION thresholds ── */
  // Desktop: card activates when its path segment finishes
  const act0 = useTransform(scrollYProgress, [0.14, 0.18], [0, 1]);
  const act1 = useTransform(scrollYProgress, [0.32, 0.36], [0, 1]);
  const act2 = useTransform(scrollYProgress, [0.50, 0.54], [0, 1]);
  const act3 = useTransform(scrollYProgress, [0.61, 0.65], [0, 1]); // synced with seg3
  const act4 = useTransform(scrollYProgress, [0.74, 0.78], [0, 1]); // synced with seg4
  const desktopActs = [act0, act1, act2, act3, act4];

  // Mobile: card activates when its solution segment (~odd index) reaches end
  const mact0 = useTransform(scrollYProgress, [0.15, 0.20], [0, 1]);
  const mact1 = useTransform(scrollYProgress, [0.33, 0.38], [0, 1]);
  const mact2 = useTransform(scrollYProgress, [0.51, 0.56], [0, 1]);
  const mact3 = useTransform(scrollYProgress, [0.64, 0.68], [0, 1]); // synced with mseg7
  const mact4 = useTransform(scrollYProgress, [0.78, 0.82], [0, 1]); // synced with mseg9
  const mobileActs = [mact0, mact1, mact2, mact3, mact4];

  const acts = isMobile ? mobileActs : desktopActs;

  // Listen to activation motion values
  useMotionValueEvent(acts[0], "change", (v) =>
    setActiveCards((p) => { const n = [...p]; n[0] = v >= 0.85; return n; })
  );
  useMotionValueEvent(acts[1], "change", (v) =>
    setActiveCards((p) => { const n = [...p]; n[1] = v >= 0.85; return n; })
  );
  useMotionValueEvent(acts[2], "change", (v) =>
    setActiveCards((p) => { const n = [...p]; n[2] = v >= 0.85; return n; })
  );
  useMotionValueEvent(acts[3], "change", (v) =>
    setActiveCards((p) => { const n = [...p]; n[3] = v >= 0.85; return n; })
  );
  useMotionValueEvent(acts[4], "change", (v) =>
    setActiveCards((p) => { const n = [...p]; n[4] = v >= 0.85; return n; })
  );

  /* ── COMPUTE DESKTOP PATHS ── */
  const computeDesktopPaths = useCallback(() => {
    const container = cardsContainerRef.current;
    if (!container || isMobile) return;

    const cRect = container.getBoundingClientRect();
    const centerX = cRect.width / 2;
    const result: { d: string; color: string }[] = [];

    for (let i = 0; i < PAIRS.length; i++) {
      const solEl = solutionRefs.current[i];
      if (!solEl) continue;

      const solRect = solEl.getBoundingClientRect();
      const isRight = PAIRS[i].type === "right-turq"; // solution on right

      // Y midpoint of this solution card relative to container
      const solMidY = solRect.top - cRect.top + solRect.height / 2;

      // X edge: left edge if solution is on right, right edge if solution is on left
      const solEdgeX = isRight
        ? solRect.left - cRect.left       // left edge of card (line approaches from center on the left)
        : solRect.right - cRect.left;     // right edge of card (line approaches from center on the right)

      // Previous Y (start of vertical segment): top of container for first, or previous solution's midY
      let prevY: number;
      if (i === 0) {
        prevY = solMidY - 60; // start slightly above first card
      } else {
        const prevSolEl = solutionRefs.current[i - 1];
        if (prevSolEl) {
          const prevRect = prevSolEl.getBoundingClientRect();
          prevY = prevRect.top - cRect.top + prevRect.height / 2;
        } else {
          prevY = solMidY - 100;
        }
      }

      // L-shaped path: vertical from prevY → solMidY, then horizontal to card edge
      const d = `M ${centerX} ${prevY} L ${centerX} ${solMidY} L ${solEdgeX} ${solMidY}`;
      result.push({ d, color: PAIRS[i].color });
    }

    setPaths(result);
  }, [isMobile]);

  /* ── COMPUTE MOBILE PATHS ── */
  const computeMobilePaths = useCallback(() => {
    const container = cardsContainerRef.current;
    if (!container || !isMobile) return;

    const cRect = container.getBoundingClientRect();
    const lineX = 16;
    const branchEndX = 44;
    const result: { d: string; color: string }[] = [];

    for (let i = 0; i < PAIRS.length; i++) {
      const probEl = mobileCardRefs.current[i * 2];
      const solEl = mobileCardRefs.current[i * 2 + 1];
      if (!probEl || !solEl) continue;

      const probRect = probEl.getBoundingClientRect();
      const solRect = solEl.getBoundingClientRect();
      const probMidY = probRect.top - cRect.top + probRect.height / 2;
      const solMidY = solRect.top - cRect.top + solRect.height / 2;

      // Start Y: previous solution's midpoint, or above first problem
      let startY: number;
      if (i === 0) {
        startY = probMidY - 30;
      } else {
        const prevSolEl = mobileCardRefs.current[(i - 1) * 2 + 1];
        if (prevSolEl) {
          const prevRect = prevSolEl.getBoundingClientRect();
          startY = prevRect.top - cRect.top + prevRect.height / 2;
        } else {
          startY = probMidY - 30;
        }
      }

      // Path 1: vertical line with branch to problem card (dim/white)
      result.push({
        d: `M ${lineX} ${startY} L ${lineX} ${probMidY} L ${branchEndX} ${probMidY}`,
        color: "rgba(255,255,255,0.12)",
      });

      // Path 2: vertical line with branch to solution card (colored)
      result.push({
        d: `M ${lineX} ${probMidY} L ${lineX} ${solMidY} L ${branchEndX} ${solMidY}`,
        color: PAIRS[i].color,
      });
    }

    setMobilePaths(result);
  }, [isMobile]);

  /* ── MEASURE ON MOUNT + RESIZE ── */
  useEffect(() => {
    const measure = () => {
      if (isMobile) computeMobilePaths();
      else computeDesktopPaths();
    };

    // Initial delay for layout
    const timer = setTimeout(measure, 300);

    const observer = new ResizeObserver(() => requestAnimationFrame(measure));
    if (cardsContainerRef.current) observer.observe(cardsContainerRef.current);
    window.addEventListener("resize", measure);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [computeDesktopPaths, computeMobilePaths, isMobile]);

  /* ── REF SETTERS ── */
  const setSolRef = useCallback(
    (i: number) => (el: HTMLDivElement | null) => { solutionRefs.current[i] = el; },
    []
  );
  const setMobRef = useCallback(
    (i: number) => (el: HTMLDivElement | null) => { mobileCardRefs.current[i] = el; },
    []
  );

  /* ── RENDER ── */
  return (
    <section
      ref={sectionRef}
      id="cada-dia-sem-ia"
      className="relative w-full min-h-screen overflow-hidden py-32"
      style={{
        backgroundImage: "url('/assets/background-Section2-DorCliente.webp')",
        backgroundSize: "100% 100%",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#0e0e0e",
      }}
    >
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 z-0" style={{
        background: "linear-gradient(180deg, rgba(14,14,14,0.2) 0%, rgba(14,14,14,0.05) 50%, rgba(14,14,14,0.2) 100%)",
      }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">

        {/* ─── HEADER ─── */}
        <div className="mb-24 flex flex-col items-start text-left">
          <h2 className="font-[var(--font-poppins)] font-bold text-[clamp(32px,5.5vw,72px)] leading-[1.05] tracking-tight uppercase mb-8">
            <span className="text-white block">CADA DIA SEM IA</span>
            <span className="block mt-1">
              <span className="text-[#ffed00] font-black">CUSTA MAIS</span>
            </span>
            <span className="text-white block mt-1">DO QUE VOCÊ IMAGINA.</span>
          </h2>

          <div className="flex gap-4 items-stretch max-w-2xl">
            <div className="w-[3px] rounded-full bg-[#31ffce] shrink-0" />
            <p className="text-white/60 text-lg md:text-xl text-left font-medium leading-relaxed">
              Enquanto sua equipe perde horas em tarefas que uma IA faz em segundos, seu mercado não para.
            </p>
          </div>
        </div>

        {/* ─── CARDS + LINES ─── */}
        <div ref={cardsContainerRef} className="relative flex flex-col w-full">

          {/* ── DESKTOP SVG (L-shaped neon lines through center gap) ── */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-20 hidden md:block"
            style={{ overflow: "visible" }}
          >
            {paths.map((seg, i) => (
              <AnimatedPath
                key={`dp-${i}`}
                d={seg.d}
                color={seg.color}
                progress={desktopSegs[i]}
              />
            ))}
          </svg>

          {/* ── MOBILE SVG (Left vertical line with branches) ── */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-20 block md:hidden"
            style={{ overflow: "visible" }}
          >
            {mobilePaths.map((seg, i) => (
              <AnimatedPath
                key={`mp-${i}`}
                d={seg.d}
                color={seg.color}
                progress={mobileSegs[i]}
                glow={4}
              />
            ))}
          </svg>

          {/* ── DESKTOP ROWS (zigzag layout) ── */}
          <div className="hidden md:flex flex-col gap-16 lg:gap-20">
            {PAIRS.map((pair, idx) => {
              const isRightSol = pair.type === "right-turq";
              return (
                <div key={pair.id} className="flex flex-row items-center gap-8 lg:gap-12 w-full">
                  {/* Left column */}
                  <div className="flex-1 flex justify-end">
                    <div className="w-full max-w-[420px]">
                      {isRightSol
                        ? <ProblemCard data={pair} />
                        : <SolutionCard ref={setSolRef(idx)} data={pair} isActive={activeCards[idx]} />
                      }
                    </div>
                  </div>

                  {/* Center gap (where the line passes) */}
                  <div className="w-8 lg:w-16 shrink-0" />

                  {/* Right column */}
                  <div className="flex-1 flex justify-start">
                    <div className="w-full max-w-[420px]">
                      {isRightSol
                        ? <SolutionCard ref={setSolRef(idx)} data={pair} isActive={activeCards[idx]} />
                        : <ProblemCard data={pair} />
                      }
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── MOBILE LAYOUT (single column, left line) ── */}
          <div className="flex md:hidden flex-col gap-8 pl-12 pr-2">
            {PAIRS.map((pair, idx) => (
              <React.Fragment key={pair.id}>
                <div ref={setMobRef(idx * 2)} className="w-full">
                  <ProblemCard data={pair} />
                </div>
                <div ref={setMobRef(idx * 2 + 1)} className="w-full">
                  <SolutionCard data={pair} isActive={activeCards[idx]} />
                </div>
              </React.Fragment>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
