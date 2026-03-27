"use client";

import React, { useRef, useEffect, useState, useId } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Target,
  Search,
  AtSign,
  Sparkles,
  LayoutGrid,
  BarChart2,
  Asterisk,
  Share2,
} from "lucide-react";

/* ────────────────────────────────────────────────────────
   ANIMATED METRIC — count-up with spring
──────────────────────────────────────────────────────── */
function AnimatedMetric({
  value,
  suffix = "",
  prefix = "",
  color,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  color: string;
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
      className="font-[var(--font-poppins)] font-bold leading-none"
      style={{
        fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
        color,
        filter: `drop-shadow(0 0 5px ${color}66)`,
      }}
    >
      {display}
    </motion.span>
  );
}

/* ────────────────────────────────────────────────────────
   ANIMATED "Secs" — letter fade-in
──────────────────────────────────────────────────────── */
function AnimatedSecs({ color }: { color: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.span
      ref={ref}
      animate={isInView ? { opacity: 1, letterSpacing: "0.02em" } : { opacity: 0, letterSpacing: "0.5em" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="font-[var(--font-poppins)] font-bold leading-none"
      style={{
        fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
        color,
        filter: `drop-shadow(0 0 5px ${color}66)`,
      }}
    >
      Secs
    </motion.span>
  );
}

/* ────────────────────────────────────────────────────────
   CARD DATA
──────────────────────────────────────────────────────── */
const ROW1 = [
  {
    icon: Target,
    label: "LAYER 03: GROWTH",
    metricNum: 3,
    metricPrefix: "+",
    metricSuffix: "x",
    metricColor: "#ffed00",
    name: "TRÁFEGO PAGO COM IA",
    desc: "Mais conversões com precisão",
    accentColor: "#ffed00",
  },
  {
    icon: Search,
    label: "LAYER 03: GROWTH",
    metricNum: 2,
    metricPrefix: "",
    metricSuffix: "x",
    metricColor: "#ffed00",
    name: "SEO INTELIGENTE",
    desc: "Tráfego orgânico",
    accentColor: "#ffed00",
  },
  {
    icon: AtSign,
    label: "LAYER 03: GROWTH",
    metricNum: 60,
    metricPrefix: "",
    metricSuffix: "%",
    metricColor: "#ffed00",
    name: "E-MAIL MARKETING",
    desc: "Mais abertura",
    accentColor: "#ffed00",
  },
  {
    icon: Sparkles,
    label: "LAYER 02: EXECUTION",
    metricNum: 10,
    metricPrefix: "",
    metricSuffix: "x",
    metricColor: "#ffed00",
    name: "CRIAÇÃO DE CONTEÚDO",
    desc: "10x mais conteúdo",
    accentColor: "#ffed00",
  },
];

const ROW2 = [
  {
    icon: LayoutGrid,
    label: "LAYER 01: DATA",
    metricNum: 80,
    metricPrefix: "",
    metricSuffix: "%",
    metricColor: "#31ffce",
    metricSpecial: null,
    name: "AUTOMAÇÃO DE MKT",
    desc: "Menos operacional",
    accentColor: "#31ffce",
  },
  {
    icon: BarChart2,
    label: "LAYER 01: DATA",
    metricNum: 0,
    metricPrefix: "",
    metricSuffix: "",
    metricColor: "#31ffce",
    metricSpecial: "secs",
    name: "ANÁLISE DE DADOS",
    desc: "Relatórios em segundos",
    accentColor: "#31ffce",
  },
  {
    icon: Asterisk,
    label: "LAYER 01: DATA",
    metricNum: 45,
    metricPrefix: "+",
    metricSuffix: "%",
    metricColor: "#31ffce",
    metricSpecial: null,
    name: "CRM E VENDAS",
    desc: "Fechamentos",
    accentColor: "#31ffce",
  },
  {
    icon: Share2,
    label: "LAYER 02: EXECUTION",
    metricNum: 3,
    metricPrefix: "",
    metricSuffix: "h",
    metricColor: "#31ffce",
    metricSpecial: null,
    name: "GESTÃO DE REDES",
    desc: "Dia economizados",
    accentColor: "#31ffce",
  },
];

/* ────────────────────────────────────────────────────────
   GLASS CARD
──────────────────────────────────────────────────────── */
function GlassCard({
  card,
  cardRef,
}: {
  card: (typeof ROW1)[0] | (typeof ROW2)[0];
  cardRef?: React.RefObject<HTMLDivElement>;
}) {
  const Icon = card.icon;
  const isSpecial = (card as any).metricSpecial === "secs";

  return (
    <motion.div
      ref={cardRef}
      className="relative flex flex-col justify-between rounded-xl p-6 h-full transition-colors duration-300"
      whileHover={{
        scale: 1.05,
        zIndex: 30,
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        borderColor: "rgba(255, 255, 255, 0.2)",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      style={{
        background: "rgba(255, 255, 255, 0.04)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0px 20px 40px rgba(0,0,0,0.6)",
        minHeight: "220px",
      }}
    >
      {/* Top row: icon + label */}
      <div className="flex items-center justify-between mb-4">
        <Icon size={20} color="#31ffce" />
        <span
          className="font-[var(--font-poppins)] uppercase text-white/40 tracking-widest"
          style={{ fontSize: "0.6rem" }}
        >
          {card.label}
        </span>
      </div>

      {/* Metric */}
      <div className="my-3">
        {isSpecial ? (
          <AnimatedSecs color={card.metricColor} />
        ) : (
          <AnimatedMetric
            value={(card as any).metricNum}
            prefix={(card as any).metricPrefix}
            suffix={(card as any).metricSuffix}
            color={card.metricColor}
          />
        )}
      </div>

      {/* Name + desc */}
      <div className="mt-auto">
        <p
          className="font-[var(--font-poppins)] font-bold uppercase text-white mb-1"
          style={{ fontSize: "0.8rem", letterSpacing: "0.04em" }}
        >
          {card.name}
        </p>
        <p className="text-white/50" style={{ fontSize: "0.8rem", fontFamily: "var(--font-dm-sans)" }}>
          {card.desc}
        </p>

        {/* Accent line */}
        <div
          className="mt-4 rounded-full"
          style={{
            width: "40%",
            height: "2px",
            backgroundColor: card.accentColor,
            boxShadow: `0 0 8px ${card.accentColor}80`,
          }}
        />
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────
   BEZIER CONNECTION LINES
──────────────────────────────────────────────────────── */
// Connection map: [row1CardIndex, row2CardIndex, color]
const CONNECTIONS: [number, number, string][] = [
  [0, 0, "#31ffce"],
  [0, 2, "#31ffce"],
  [1, 1, "#ffed00"],
  [2, 1, "#ffed00"],
  [2, 3, "#ffed00"],
  [3, 2, "#31ffce"],
  [3, 3, "#31ffce"],
];

interface CardPos {
  x: number;
  y: number;
  w: number;
}

function BezierConnections({
  row1Refs,
  row2Refs,
  containerRef,
  isInView,
}: {
  row1Refs: React.RefObject<HTMLDivElement>[];
  row2Refs: React.RefObject<HTMLDivElement>[];
  containerRef: React.RefObject<HTMLDivElement>;
  isInView: boolean;
}) {
  const [paths, setPaths] = useState<{ d: string; color: string; id: string }[]>([]);
  const [svgHeight, setSvgHeight] = useState(200);
  const uid = useId();

  useEffect(() => {
    const compute = () => {
      const container = containerRef.current;
      if (!container) return;

      const cRect = container.getBoundingClientRect();

      const getPos = (el: HTMLDivElement | null): CardPos | null => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          x: r.left - cRect.left + r.width / 2,
          y: r.top - cRect.top,
          w: r.width,
        };
      };

      const r1 = row1Refs.map((r) => getPos(r.current));
      const r2 = row2Refs.map((r) => getPos(r.current));

      if (r1.some((p) => !p) || r2.some((p) => !p)) return;

      // The SVG fills the gap between the two rows
      // startY: bottom of row1 cards, endY: top of row2 cards (relative to container top)
      const row1Bottom = (r1[0]!.y) + row1Refs[0].current!.offsetHeight;
      const row2Top = r2[0]!.y;

      setSvgHeight(row2Top); // SVG spans from container top to row2 top

      const result: { d: string; color: string; id: string }[] = [];

      CONNECTIONS.forEach(([i1, i2, color], idx) => {
        const from = r1[i1]!;
        const to = r2[i2]!;

        // startX = center of row1 card, startY = bottom of row1 card
        const sx = from.x;
        const sy = row1Bottom;
        // endX = center of row2 card, endY = top of row2 card
        const ex = to.x;
        const ey = row2Top;

        // Control points: both at midY for smooth S-curve
        const cy1 = sy + (ey - sy) * 0.4;
        const cy2 = sy + (ey - sy) * 0.6;

        const d = `M ${sx} ${sy} C ${sx} ${cy1}, ${ex} ${cy2}, ${ex} ${ey}`;
        result.push({ d, color, id: `${uid}-conn-${idx}` });
      });

      setPaths(result);
    };

    const timer = setTimeout(compute, 400);
    window.addEventListener("resize", compute);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", compute);
    };
  }, [containerRef, row1Refs, row2Refs, uid]);

  return (
    <svg
      className="absolute left-0 top-0 w-full pointer-events-none hidden md:block"
      style={{ height: svgHeight || "100%", overflow: "visible", zIndex: 10 }}
    >

      <defs>
        {/* Arrow markers */}
        <marker
          id={`${uid}-arrow-tq`}
          markerWidth="6"
          markerHeight="6"
          refX="5"
          refY="3"
          orient="auto"
        >
          <path d="M 0 0 L 6 3 L 0 6 z" fill="#31ffce" opacity="0.8" />
        </marker>
        <marker
          id={`${uid}-arrow-yw`}
          markerWidth="6"
          markerHeight="6"
          refX="5"
          refY="3"
          orient="auto"
        >
          <path d="M 0 0 L 6 3 L 0 6 z" fill="#ffed00" opacity="0.8" />
        </marker>
      </defs>

      {paths.map(({ d, color, id }, i) => {
        const markerId = color === "#31ffce"
          ? `url(#${uid}-arrow-tq)`
          : `url(#${uid}-arrow-yw)`;
        const glowId = `${uid}-glow-${i}`;
        const delay = i * 0.12;

        return (
          <g key={id}>
            <defs>
              <filter id={glowId}>
                <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor={color} floodOpacity="0.7" />
                <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor={color} floodOpacity="0.3" />
              </filter>
            </defs>

            {/* Glow layer */}
            <motion.path
              d={d}
              fill="none"
              stroke={color}
              strokeWidth={2}
              strokeLinecap="round"
              filter={`url(#${glowId})`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay }}
            />

            {/* Core line */}
            <motion.path
              d={d}
              fill="none"
              stroke={color}
              strokeWidth={1.5}
              strokeLinecap="round"
              markerEnd={markerId}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 0.9 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay }}
            />

            {/* Traveling particle */}
            {isInView && (
              <circle r="2.5" fill={color} opacity="0.9">
                <animateMotion
                  dur={`${2 + (i % 3) * 0.5}s`}
                  repeatCount="indefinite"
                  begin={`${1.5 + delay}s`}
                >
                  <mpath href={`#${id}-pathref`} />
                </animateMotion>
              </circle>
            )}

            {/* Hidden path reference for animateMotion */}
            <path id={`${id}-pathref`} d={d} fill="none" stroke="none" />
          </g>
        );
      })}
    </svg>
  );
}

/* ────────────────────────────────────────────────────────
   MARQUEE
──────────────────────────────────────────────────────── */
const IA_NAMES = [
  "Claude 3.5",
  "Gemini Pro",
  "OpenAI o1",
  "Llama 3",
  "Mistral AI",
  "Perplexity AI",
  "Grok 2",
  "Cohere",
  "Anthropic",
  "DeepSeek",
];

function Marquee() {
  const items = [...IA_NAMES, ...IA_NAMES]; // duplicate for seamless loop

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <motion.div
        className="flex gap-12 items-center"
        style={{ whiteSpace: "nowrap" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        whileHover={{ animationPlayState: "paused" as any }}
      >
        {items.map((name, i) => (
          <React.Fragment key={`${name}-${i}`}>
            <span
              className="font-[var(--font-poppins)] font-medium shrink-0"
              style={{ fontSize: "1.1rem", color: "#ffed00" }}
            >
              {name}
            </span>
            <span className="text-white/30 shrink-0 text-xl">·</span>
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   MAIN SECTION
──────────────────────────────────────────────────────── */
export default function Solutions() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Card refs for bezier calculation
  const row1Refs = useRef([
    React.createRef<HTMLDivElement>(),
    React.createRef<HTMLDivElement>(),
    React.createRef<HTMLDivElement>(),
    React.createRef<HTMLDivElement>(),
  ] as React.RefObject<HTMLDivElement>[]);

  const row2Refs = useRef([
    React.createRef<HTMLDivElement>(),
    React.createRef<HTMLDivElement>(),
    React.createRef<HTMLDivElement>(),
    React.createRef<HTMLDivElement>(),
  ] as React.RefObject<HTMLDivElement>[]);

  return (
    <section
      ref={sectionRef}
      id="solucoes"
      className="relative w-full overflow-hidden py-24 md:py-32"
      style={{
        backgroundImage: "url('/assets/background-SolutionsSection.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#0e0e0e",
      }}
    >
      {/* Overlay for depth */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(180deg,rgba(14,14,14,0.55) 0%,rgba(14,14,14,0.2) 40%,rgba(14,14,14,0.2) 60%,rgba(14,14,14,0.6) 100%)",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">

        {/* ── HEADER ── */}
        <div className="mb-16 md:mb-20">
          {/* Title */}
          <h2
            className="font-[var(--font-poppins)] font-bold uppercase leading-tight mb-6"
            style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}
          >
            <span className="text-white block">UMA INTELIGÊNCIA.</span>
            <span className="block">
              <span style={{ color: "#31ffce" }}>SOLUÇÕES</span>{" "}
              <span className="text-white">SEM</span>{" "}
              <span style={{ color: "#ffed00" }}>LIMITE.</span>
            </span>
          </h2>

          {/* Paragraph */}
          <p
            className="text-white/60 leading-relaxed max-w-xl"
            style={{ fontSize: "1rem", fontFamily: "var(--font-dm-sans)" }}
          >
            Tecnologia que trabalha. Resultado sem limite. A Maitink usa Claude, Gemini e as
            melhores IAs — aplicadas estrategicamente para cada cliente.
          </p>
        </div>

        {/* ── CARDS + BEZIER LINES CONTAINER ── */}
        <div ref={containerRef} className="relative">

          {/* Bezier lines SVG (absolute, spans from top of row1 to bottom of row2 area) */}
          <BezierConnections
            row1Refs={row1Refs.current}
            row2Refs={row2Refs.current}
            containerRef={containerRef}
            isInView={isInView}
          />

          {/* ROW 1 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24 md:mb-40">
            {ROW1.map((card, i) => (
              <GlassCard key={card.name} card={card} cardRef={row1Refs.current[i]} />
            ))}
          </div>

          {/* ROW 2 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ROW2.map((card, i) => (
              <GlassCard key={card.name} card={card} cardRef={row2Refs.current[i]} />
            ))}
          </div>
        </div>

        {/* ── MARQUEE ── */}
        <div className="mt-20 md:mt-24">
          <Marquee />
        </div>

      </div>
    </section>
  );
}
