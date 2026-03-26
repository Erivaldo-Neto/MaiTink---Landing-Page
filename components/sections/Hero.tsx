"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

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
        <Image
          src="/assets/AI_Robotic_Hand-HeroSection.webp"
          alt="Mão robótica segurando cérebro de IA"
          fill
          priority
          quality={90}
          style={{ objectFit: "contain", objectPosition: "center bottom" }}
        />
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
          <motion.div variants={fadeUp} className="hs-ctas">
            <a href="#contato" className="cta-a">Agendar uma reunião</a>
            <a href="#contato" className="cta-b">Solicitar diagnóstico gratuito</a>
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
           Grande, ancorado à direita/baixo.
           A mão fica perto da borda inferior mas sem encostar.
        ─────────────────────────────────────── */
        .hs-graphic {
          position: absolute;
          z-index: 2;
          /*
            Âncora à esquerda no ponto médio da página (50%).
            Largura de 58% → ocupa de 50% até 108%, centrado na metade direita.
            objectPosition: center bottom mantém a imagem centrada no container.
          */
          left: 50%;
          right: -8%;
          bottom: -4%;          /* mais próximo da borda inferior, sem encostar */
          top: 0;
          pointer-events: none;
          filter:
            drop-shadow(0 0 52px rgba(49,255,206,0.48))
            drop-shadow(0 0 110px rgba(49,255,206,0.20));
        }

        /* ───────────────────────────────────────
           CONTENT WRAPPER — grade invisível 12-col
        ─────────────────────────────────────── */
        .hs-wrap {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 clamp(28px, 6vw, 100px);
          padding-top: 84px;   /* navbar offset */
          height: 100%;
          display: flex;
          align-items: center;
        }

        /* Content: colunas 1-6 de 12 (~50%) */
        .hs-content {
          width: 50%;
          display: flex;
          flex-direction: column;
        }

        /* ───────────────────────────────────────
           TITLE STACK
        ─────────────────────────────────────── */
        .hs-titles { margin-bottom: 18px; }

        .ht {
          font-family: var(--font-poppins), Poppins, sans-serif;
          font-weight: 700;           /* 700 = bold mas não excessivo */
          text-transform: uppercase;
          line-height: 1.06;
          letter-spacing: -0.015em;
          margin: 0;
          white-space: nowrap;        /* impede quebra de linha em todas as linhas */
          /*
            clamp menor que antes: max 64px (era 80px).
            Garante que "ESCALE RESULTADOS" não quebre
            e deixa espaço para subtítulo + parágrafo + botões.
          */
          font-size: clamp(28px, 4.2vw, 64px);
        }

        .ht-w { color: #ffffff; }
        .ht-t { color: #31ffce; }
        .ht-y { color: #ffed00; }

        /* ───────────────────────────────────────
           TAGLINE
        ─────────────────────────────────────── */
        .hs-tag {
          font-family: var(--font-poppins), Poppins, sans-serif;
          font-weight: 600;
          font-size: clamp(15px, 1.35vw, 20px);
          color: #31ffce;
          margin: 0 0 12px 0;
          line-height: 1.4;
          letter-spacing: -0.01em;
        }

        /* ───────────────────────────────────────
           BODY TEXT
        ─────────────────────────────────────── */
        .hs-body {
          font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
          font-size: clamp(12.5px, 0.95vw, 15px);
          color: rgba(255,255,255,0.66);
          line-height: 1.70;
          max-width: 420px;
          margin: 0 0 24px 0;
        }

        /* ───────────────────────────────────────
           CTA BUTTONS
        ─────────────────────────────────────── */
        .hs-ctas {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
        }

        /* Primary — amarelo, borda-radius 8px, glow hover */
        .cta-a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #ffed00;
          color: #0a0a0a;
          font-family: var(--font-poppins), Poppins, sans-serif;
          font-weight: 700;
          font-size: clamp(11px, 0.88vw, 13px);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 0 22px;
          height: 44px;
          border-radius: 8px;
          text-decoration: none;
          border: 2px solid transparent;
          box-shadow: 0 4px 18px rgba(255,237,0,0.22);
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
          cursor: pointer;
          white-space: nowrap;
        }
        .cta-a:hover {
          transform: translateY(-2px);
          background: #ffe200;
          box-shadow: 0 0 0 3px rgba(255,237,0,0.28), 0 8px 28px rgba(255,237,0,0.38);
        }
        .cta-a:active { transform: translateY(0); }

        /* Secondary — outline turquesa */
        .cta-b {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(49,255,206,0.06);
          color: #ffffff;
          font-family: var(--font-poppins), Poppins, sans-serif;
          font-weight: 700;
          font-size: clamp(11px, 0.88vw, 13px);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 0 22px;
          height: 44px;
          border-radius: 8px;
          border: 1.5px solid rgba(49,255,206,0.60);
          text-decoration: none;
          box-shadow: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
          cursor: pointer;
          white-space: nowrap;
        }
        .cta-b:hover {
          transform: translateY(-2px);
          background: rgba(49,255,206,0.12);
          color: #31ffce;
          border-color: #31ffce;
          box-shadow: 0 0 0 3px rgba(49,255,206,0.16), 0 8px 24px rgba(49,255,206,0.20);
        }
        .cta-b:active { transform: translateY(0); }


        /* ═══════════════════════════════════════
           TABLET  768 – 1023px
        ═══════════════════════════════════════ */
        @media (max-width: 1023px) and (min-width: 768px) {
          .hs-content { width: 56%; }

          .ht { font-size: clamp(24px, 3.8vw, 46px); white-space: nowrap; }

          .hs-graphic {
            left: 48%;
            right: -6%;
            bottom: -3%;
            top: 0;
          }
        }


        /* ═══════════════════════════════════════
           MOBILE  < 768px
           
           Estrutura:
           - Gráfico: absolute, topo da tela, grande, visível
           - Texto: ancorado na parte de baixo
           - Só a base/palma da mão fica ligeiramente
             atrás do início do título (z-index da imagem < z-index do texto)
        ═══════════════════════════════════════ */
        @media (max-width: 767px) {

          /* Shell sem scroll */
          .hs {
            height: 100vh;
            overflow: hidden;
            align-items: flex-end;   /* ancora conteúdo na base */
          }

          /* Overlay no mobile: gradiente de baixo p/ cima
             deixa topo transparente (imagem visível) e
             escurece embaixo (texto legível) */
          .hs-overlay {
            background: linear-gradient(
              to top,
              rgba(3, 9, 16, 0.96) 0%,
              rgba(3, 9, 16, 0.85) 30%,
              rgba(3, 9, 16, 0.50) 55%,
              rgba(3, 9, 16, 0.10) 80%,
              rgba(3, 9, 16, 0.00) 100%
            );
          }

          /*
            Gráfico: inicia no topo da seção.
            z-index: 3 → fica ATRÁS do texto (z-10), mas na frente do overlay (z-1).
            A base da mão (bottom: 40%) alcança o início da área de texto,
            criando o efeito de sobreposição parcial desejado.
          */
          .hs-graphic {
            right: -8%;
            top: 0;
            bottom: auto;
            width: 118%;         /* era 108%, aumentado */
            height: 68vh;
            z-index: 3;
            filter:
              drop-shadow(0 0 36px rgba(49,255,206,0.42))
              drop-shadow(0 0 70px rgba(49,255,206,0.18));
          }

          /* Wrapper: tudo na base, sem padding-top grande */
          .hs-wrap {
            padding: 0 20px 36px;
            padding-top: 0;
            align-items: flex-end;
            height: 100%;
          }

          /* Conteúdo ocupa largura total */
          .hs-content {
            width: 100%;
            z-index: 10;  /* texto sobre a imagem */
          }

          /* Títulos: menores no mobile, mas ainda impactantes */
          .ht {
            font-size: clamp(30px, 9.5vw, 46px);
            white-space: nowrap;
            letter-spacing: -0.02em;
          }

          .hs-titles { margin-bottom: 10px; }

          .hs-tag {
            font-size: 15px;
            margin-bottom: 8px;
          }

          .hs-body {
            font-size: 12.5px;
            max-width: 100%;
            margin-bottom: 18px;
            line-height: 1.60;
          }

          .hs-ctas {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 10px;
          }

          .cta-a, .cta-b {
            flex: 1 1 auto;
            min-width: 130px;
            font-size: 11.5px;
            height: 42px;
            padding: 0 14px;
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
