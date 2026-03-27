"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ShinyButton from "@/components/ui/shiny-button";
import AnimatedBorderButton from "@/components/ui/animated-border-button";


/* ─── Typewriter loop hook ────────────────────────────────────── */
function useTypewriter(
  text: string,
  {
    typeSpeed  = 48,   // ms por caractere ao digitar
    deleteSpeed = 28,  // ms por caractere ao apagar (mais rápido)
    holdEnd    = 1800, // pausa no final do texto completo
    holdStart  = 500,  // pausa antes de começar a digitar novamente
  } = {}
) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i      = 0;
    let phase  = "typing" as "typing" | "holding-end" | "deleting" | "holding-start";
    let timeout: ReturnType<typeof setTimeout>;

    function tick() {
      if (phase === "typing") {
        i += 1;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          phase = "holding-end";
          timeout = setTimeout(tick, holdEnd);
        } else {
          timeout = setTimeout(tick, typeSpeed);
        }
      } else if (phase === "holding-end") {
        phase = "deleting";
        timeout = setTimeout(tick, deleteSpeed);
      } else if (phase === "deleting") {
        i -= 1;
        setDisplayed(text.slice(0, i));
        if (i <= 0) {
          phase = "holding-start";
          timeout = setTimeout(tick, holdStart);
        } else {
          timeout = setTimeout(tick, deleteSpeed);
        }
      } else {
        // holding-start
        phase = "typing";
        timeout = setTimeout(tick, typeSpeed);
      }
    }

    timeout = setTimeout(tick, holdStart);
    return () => clearTimeout(timeout);
  }, [text, typeSpeed, deleteSpeed, holdEnd, holdStart]);

  return displayed;
}

/* ─── Float animation ─────────────────────────────────────────── */
const floatAnim = {
  y: [0, -18, 0],
  transition: {
    duration: 5,
    ease: "easeInOut",
    repeat: Infinity,
    repeatType: "loop" as const,
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
};

const TAGLINE = "Uma agência. Uma IA. Resultado sem limite.";

const Hero = () => {
  const displayed = useTypewriter(TAGLINE);
  return (
    <section id="hero" className="hs" aria-label="Hero MAItink">

      {/* ── Background ── */}
      <div className="hs-bg" aria-hidden="true">
        <Image
          src="/assets/background-heroSection.webp"
          alt=""
          fill
          priority
          quality={90}
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div className="hs-overlay" />
      </div>

      {/* ── Graphic — floater ── */}
      <motion.div
        className="hs-graphic"
        aria-hidden="true"
        animate={floatAnim}
      >
        <div className="hs-graphic-inner">
          <Image
            src="/assets/AI_Robotic_Hand-HeroSection.webp"
            alt="Mão robótica segurando cérebro de IA"
            width={480}
            height={560}
            priority
            quality={90}
            className="hs-img"
          />
        </div>
      </motion.div>


      {/* ── Main content ── */}
      <div className="hs-wrap">
        <motion.div
          className="hs-content"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {/* Title stack */}
          <div className="hs-titles">
            <motion.h1 variants={fadeUp} className="ht ht-w">CORTE CUSTOS</motion.h1>
            <motion.h1 variants={fadeUp} className="ht ht-t">ESCALE RESULTADOS</motion.h1>
            <motion.h1 variants={fadeUp} className="ht ht-y">AUTOMATIZE TUDO</motion.h1>
          </div>

          {/* Tagline — efeito digitação em loop */}
          <motion.p variants={fadeUp} className="hs-tag" aria-label={TAGLINE}>
            <span aria-hidden="true">
              {displayed}
              {/* cursor sempre piscando via CSS keyframe */}
              <span className="hs-cursor">|</span>
            </span>
          </motion.p>

          {/* Body text */}
          <motion.p variants={fadeUp} className="hs-body">
            A Maitink usa inteligência artificial para transformar o marketing
            da sua empresa em uma máquina autônoma de resultados — mais rápida,
            mais barata e mais inteligente que qualquer time tradicional.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="hs-ctas text-center md:text-left">
            <a href="#contato" className="block md:inline-block w-full md:w-auto">
              <ShinyButton className="w-full md:w-auto px-10 h-[52px] text-sm md:text-base">
                Agendar uma reunião
              </ShinyButton>
            </a>
            <a href="#contato" className="block md:inline-block w-full md:w-auto">
              <AnimatedBorderButton className="w-full md:w-auto px-10 h-[52px] text-sm md:text-base">
                Solicitar diagnóstico gratuito
              </AnimatedBorderButton>
            </a>
          </motion.div>

        </motion.div>
      </div>

      <style>{`
        /* ───────────────────────────────────────
           BASE SHELL
        ─────────────────────────────────────── */
        .hs {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        /* ───────────────────────────────────────
           TYPEWRITER CURSOR
        ─────────────────────────────────────── */
        .hs-cursor {
          display: inline-block;
          color: #31ffce;
          font-weight: 300;
          margin-left: 1px;
          animation: blink 1.06s infinite;
        }
        @keyframes blink {
          0%, 40% { opacity: 1; }
          60%, 100% { opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hs-cursor { animation: none; opacity: 1; }
        }

        /* ───────────────────────────────────────
           FLOAT — respeita prefers-reduced-motion
        ─────────────────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          .hs-graphic { animation: none !important; }
        }

        /* ───────────────────────────────────────
           BACKGROUND
        ─────────────────────────────────────── */
        .hs-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .hs-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            108deg,
            rgba(3, 9, 16, 0.93) 0%,
            rgba(3, 9, 16, 0.82) 38%,
            rgba(3, 9, 16, 0.48) 62%,
            rgba(3, 9, 16, 0.12) 100%
          );
        }

        /* ───────────────────────────────────────
           GRAPHIC — DESKTOP
        ─────────────────────────────────────── */
        .hs-graphic {
          position: absolute;
          z-index: 2;
          left: 54%;
          right: -4%;
          bottom: 0px;
          top: 0;
          pointer-events: none;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }

        .hs-graphic-inner {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          filter:
            drop-shadow(0 0 52px rgba(49,255,206,0.48))
            drop-shadow(0 0 110px rgba(49,255,206,0.20));
        }

        .hs-img {
          width: auto;
          height: 90%;
          max-height: 85vh;
          object-fit: contain;
          object-position: bottom;
        }

        /* ───────────────────────────────────────
           CONTENT WRAPPER
        ─────────────────────────────────────── */
        .hs-wrap {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 clamp(28px, 6vw, 100px);
          padding-top: 84px;
          height: 100%;
          display: flex;
          align-items: center;
        }

        .hs-content {
          width: 55%;
          display: flex;
          flex-direction: column;
        }
        
        .hs-titles { margin-bottom: 24px; }

        .ht {
          font-family: var(--font-poppins), Poppins, sans-serif;
          font-weight: 700;
          text-transform: uppercase;
          line-height: 1.02;
          letter-spacing: -0.02em;
          margin: 0;
          white-space: nowrap;
          font-size: clamp(32px, 4.8vw, 76px);
        }

        .ht-w { color: #ffffff; }
        .ht-t { color: #31ffce; }
        .ht-y { color: #ffed00; }

        .hs-tag {
          font-family: var(--font-poppins), Poppins, sans-serif;
          font-weight: 600;
          font-size: clamp(16px, 1.4vw, 22px);
          color: #31ffce;
          margin: 0 0 14px 0;
          line-height: 1.4;
          letter-spacing: -0.01em;
        }

        .hs-body {
          font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
          font-size: clamp(14px, 1vw, 16px);
          color: rgba(255,255,255,0.7);
          line-height: 1.7;
          max-width: 480px;
          margin: 0 0 32px 0;
        }

        .hs-ctas {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          gap: 16px;
          align-items: center;
        }

        /* ═══════════════════════════════════════
           TABLET  768 – 1023px
        ═══════════════════════════════════════ */
        @media (max-width: 1023px) and (min-width: 768px) {
          .hs-content { width: 60%; }
          .ht { font-size: clamp(28px, 4vw, 54px); }
          .hs-graphic { left: 45%; }
        }

        /* ═══════════════════════════════════════
           MOBILE  < 768px
        ═══════════════════════════════════════ */
        @media (max-width: 767px) {
          .hs {
            height: auto;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            padding-top: 100px;
            padding-bottom: 60px;
            overflow-y: auto;
            overflow-x: hidden;
          }

          .hs-bg { position: fixed; inset: 0; }
          
          .hs-overlay {
            background: linear-gradient(
              to bottom,
              rgba(3, 9, 16, 0.4) 0%,
              rgba(3, 9, 16, 0.8) 40%,
              rgba(3, 9, 16, 0.95) 70%,
              rgba(3, 9, 16, 1) 100%
            );
          }

          .hs-graphic {
            position: relative;
            left: 0;
            right: 0;
            top: 0;
            bottom: auto;
            width: 100%;
            max-width: 320px;
            height: auto;
            margin: 0 auto 20px;
            z-index: 2;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .hs-graphic-inner {
            filter: drop-shadow(0 0 30px rgba(49,255,206,0.4));
          }

          .hs-img {
            width: 100%;
            height: auto;
            max-height: 40vh;
          }

          .hs-wrap {
            padding: 0 24px;
            padding-top: 0;
            align-items: flex-end;
            height: auto;
            display: block;
          }

          .hs-content {
            width: 100%;
            text-align: center;
            align-items: center;
          }

          .ht {
            font-size: clamp(34px, 10vw, 52px);
            white-space: normal;
            line-height: 1.1;
          }

          .hs-titles { margin-bottom: 20px; }

          .hs-tag {
            font-size: 16px;
            margin-bottom: 12px;
          }

          .hs-body {
            font-size: 14px;
            max-width: 100%;
            margin-bottom: 32px;
            line-height: 1.6;
          }

          .hs-ctas {
            flex-direction: column;
            width: 100%;
            max-width: 320px;
            gap: 12px;
          }
          
          .hs-ctas > a {
            width: 100%;
          }
          :global(.hs-ctas button) {
            width: 100% !important;
          }
        }

        /* Telas muito pequenas (375px) */
        @media (max-width: 400px) {
          .ht { font-size: 28px; }
          .hs-tag { font-size: 14px; }
          .hs-body { font-size: 12px; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
