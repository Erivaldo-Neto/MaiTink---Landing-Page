"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import ShinyButton from "@/components/ui/shiny-button";
import { cn } from "@/lib/utils";


/* ────────────────────────────────────────────────────────
   SCHEMA
──────────────────────────────────────────────────────── */
const formSchema = z.object({
  company: z.string().min(2, "Obrigatório, min 2 chars"),
  name: z.string().min(2, "Obrigatório, min 2 chars"),
  email: z.string().email("Formato de e-mail inválido"),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}(?:[ ]?\(?\d{1,3}?\)?[-. ]?\d{1,4}[-. ]?\d{1,4})?$/, "Formato: +55 (81) 99999-9999"),
  segment: z.string().min(1, "Selecione seu segmento"),
  revenue: z.string().min(1, "Selecione uma faixa"),
  challenge: z.string().min(20, "Mínimo 20 caracteres"),
});

type FormValues = z.infer<typeof formSchema>;

/* ────────────────────────────────────────────────────────
   ANIMATIONS
──────────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.8,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  }),
};

/* ────────────────────────────────────────────────────────
   MAIN COMPONENT
──────────────────────────────────────────────────────── */
export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (_data: FormValues) => {
    setStatus("loading");
    // Simulando envio
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // 10. (Form Log: Removido para produção)
    setStatus("success");
    reset();
    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <section
      id="contato"
      className="relative w-full py-24 px-6 overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% 50%, rgba(49,255,206,0.09) 0%, transparent 60%), #0a0a0a",
      }}
    >
      <div className="max-w-[780px] mx-auto">
        
        {/* HEADER */}
        <div className="mb-16 text-center space-y-4">
          <motion.span
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={0}
            viewport={{ once: true }}
            className="block font-dm text-[0.85rem] text-[#31ffce] uppercase tracking-[0.1em]"
          >
            Diagnóstico Gratuito
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
            SUA EMPRESA PRONTA<br />
            <span 
              className="text-[#31ffce]"
              style={{ 
                textShadow: "0 0 5px #31ffce, 0 0 10px rgba(49, 255, 206, 0.4)" 
              }}
            >
              PARA O PRÓXIMO NÍVEL.
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={2}
            viewport={{ once: true }}
            className="font-dm text-[1rem] text-white/65 max-w-xl mx-auto"
          >
            "A primeira conversa é gratuita — e já vem com um diagnóstico do seu marketing atual."
          </motion.p>
        </div>

        {/* FORM CONTAINER */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          custom={3}
          className="relative bg-[rgba(10,10,10,0.65)] backdrop-blur-[24px] rounded-[1.5rem] p-8 md:p-12"
          style={{
            boxShadow: "0 0 0 1.5px #31ffce, 0 0 20px rgba(49,255,206,0.3), 0 0 60px rgba(49,255,206,0.12)",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Nome Empresa */}
              <div className="space-y-2">
                <label className="block font-dm text-[0.8rem] text-white/60 uppercase tracking-widest ml-1">
                  Nome da Empresa
                </label>
                <input
                  {...register("company")}
                  placeholder="Ex: Vortex Store"
                  className={`w-full bg-white/[0.04] border-[1px] rounded-[0.6rem] px-5 py-3.5 text-white font-dm outline-none transition-all duration-300
                    ${errors.company ? "border-red-500/50" : "border-white/10 focus:border-[#31ffce99] focus:shadow-[0_0_0_3px_#31ffce1a]"}
                  `}
                />
                {errors.company && (
                  <p className="flex items-center gap-1.5 text-[0.75rem] text-[#ff6b6b] mt-1 ml-1">
                    <AlertCircle size={14} /> {errors.company.message}
                  </p>
                )}
              </div>

              {/* Nome Completo */}
              <div className="space-y-2">
                <label className="block font-dm text-[0.8rem] text-white/60 uppercase tracking-widest ml-1">
                  Seu Nome
                </label>
                <input
                  {...register("name")}
                  placeholder="Ex: Ricardo Alves"
                  className={`w-full bg-white/[0.04] border-[1px] rounded-[0.6rem] px-5 py-3.5 text-white font-dm outline-none transition-all duration-300
                    ${errors.name ? "border-red-500/50" : "border-white/10 focus:border-[#31ffce99] focus:shadow-[0_0_0_3px_#31ffce1a]"}
                  `}
                />
                {errors.name && (
                  <p className="flex items-center gap-1.5 text-[0.75rem] text-[#ff6b6b] mt-1 ml-1">
                    <AlertCircle size={14} /> {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Corporativo */}
              <div className="space-y-2 text-left">
                <label className="block font-dm text-[0.8rem] text-white/60 uppercase tracking-widest ml-1 text-left">
                  E-mail Corporativo
                </label>
                <input
                  {...register("email")}
                  placeholder="seu@empresa.com.br"
                  className={`w-full bg-white/[0.04] border-[1px] rounded-[0.6rem] px-5 py-3.5 text-white font-dm outline-none transition-all duration-300
                    ${errors.email ? "border-red-500/50" : "border-white/10 focus:border-[#31ffce99] focus:shadow-[0_0_0_3px_#31ffce1a]"}
                  `}
                />
                {errors.email && (
                  <p className="flex items-center gap-1.5 text-[0.75rem] text-[#ff6b6b] mt-1 ml-1">
                    <AlertCircle size={14} /> {errors.email.message}
                  </p>
                )}
              </div>

              {/* Telefone */}
              <div className="space-y-2">
                <label className="block font-dm text-[0.8rem] text-white/60 uppercase tracking-widest ml-1">
                  Telefone / WhatsApp
                </label>
                <input
                  {...register("phone")}
                  placeholder="(11) 99999-9999"
                  className={`w-full bg-white/[0.04] border-[1px] rounded-[0.6rem] px-5 py-3.5 text-white font-dm outline-none transition-all duration-300
                    ${errors.phone ? "border-red-500/50" : "border-white/10 focus:border-[#31ffce99] focus:shadow-[0_0_0_3px_#31ffce1a]"}
                  `}
                />
                {errors.phone && (
                  <p className="flex items-center gap-1.5 text-[0.75rem] text-[#ff6b6b] mt-1 ml-1">
                    <AlertCircle size={14} /> {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Segmento */}
              <div className="space-y-2 relative">
                <label className="block font-dm text-[0.8rem] text-white/60 uppercase tracking-widest ml-1">
                  Segmento de Atuação
                </label>
                <div className="relative group">
                  <select
                    {...register("segment")}
                    defaultValue=""
                    className={`w-full appearance-none bg-white/[0.04] border-[1px] rounded-[0.6rem] px-5 py-3.5 text-white font-dm outline-none transition-all duration-300 cursor-pointer
                      ${errors.segment ? "border-red-500/50" : "border-white/10 focus:border-[#31ffce99] focus:shadow-[0_0_0_3px_#31ffce1a]"}
                    `}
                  >
                    <option value="" disabled className="bg-[#0a0a0a]">Selecione seu segmento</option>
                    <option value="ecommerce" className="bg-[#0a0a0a]">E-commerce</option>
                    <option value="saude" className="bg-[#0a0a0a]">Saúde e Clínicas</option>
                    <option value="educacao" className="bg-[#0a0a0a]">Educação</option>
                    <option value="imobiliario" className="bg-[#0a0a0a]">Imobiliário</option>
                    <option value="b2b" className="bg-[#0a0a0a]">Serviços B2B</option>
                    <option value="varejo" className="bg-[#0a0a0a]">Varejo</option>
                    <option value="tecnologia" className="bg-[#0a0a0a]">Tecnologia</option>
                    <option value="outro" className="bg-[#0a0a0a]">Outro</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#31ffce] transition-transform duration-300 group-focus-within:rotate-180">
                    ▾
                  </div>
                </div>
                {errors.segment && (
                  <p className="flex items-center gap-1.5 text-[0.75rem] text-[#ff6b6b] mt-1 ml-1">
                    <AlertCircle size={14} /> {errors.segment.message}
                  </p>
                )}
              </div>

              {/* Faturamento */}
              <div className="space-y-2">
                <label className="block font-dm text-[0.8rem] text-white/60 uppercase tracking-widest ml-1">
                  Faturamento Mensal
                </label>
                <div className="relative group">
                  <select
                    {...register("revenue")}
                    defaultValue=""
                    className={`w-full appearance-none bg-white/[0.04] border-[1px] rounded-[0.6rem] px-5 py-3.5 text-white font-dm outline-none transition-all duration-300 cursor-pointer
                      ${errors.revenue ? "border-red-500/50" : "border-white/10 focus:border-[#31ffce99] focus:shadow-[0_0_0_3px_#31ffce1a]"}
                    `}
                  >
                    <option value="" disabled className="bg-[#0a0a0a]">Selecione uma faixa</option>
                    <option value="up-to-50k" className="bg-[#0a0a0a]">Até R$50k/mês</option>
                    <option value="50k-200k" className="bg-[#0a0a0a]">R$50k–R$200k/mês</option>
                    <option value="200k-500k" className="bg-[#0a0a0a]">R$200k–R$500k/mês</option>
                    <option value="above-500k" className="bg-[#0a0a0a]">Acima de R$500k/mês</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#31ffce] transition-transform duration-300 group-focus-within:rotate-180">
                    ▾
                  </div>
                </div>
                {errors.revenue && (
                  <p className="flex items-center gap-1.5 text-[0.75rem] text-[#ff6b6b] mt-1 ml-1">
                    <AlertCircle size={14} /> {errors.revenue.message}
                  </p>
                )}
              </div>

              {/* Desafio */}
              <div className="md:col-span-2 space-y-2">
                <label className="block font-dm text-[0.8rem] text-white/60 uppercase tracking-widest ml-1">
                  Maior desafio de marketing hoje
                </label>
                <textarea
                  {...register("challenge")}
                  placeholder="Descreva brevemente o que mais trava o crescimento da sua empresa..."
                  rows={4}
                  className={`w-full bg-white/[0.04] border-[1px] rounded-[0.6rem] px-5 py-3.5 text-white font-dm outline-none transition-all duration-300 resize-none
                    ${errors.challenge ? "border-red-500/50" : "border-white/10 focus:border-[#31ffce99] focus:shadow-[0_0_0_3px_#31ffce1a]"}
                  `}
                ></textarea>
                {errors.challenge && (
                  <p className="flex items-center gap-1.5 text-[0.75rem] text-[#ff6b6b] mt-1 ml-1">
                    <AlertCircle size={14} /> {errors.challenge.message}
                  </p>
                )}
              </div>

            </div>

            {/* BOTÃO */}
            <div className="w-full h-14 relative mt-4">
              {status === "idle" && (
                <ShinyButton
                  type="submit"
                  className="w-full h-14 text-[clamp(1rem,3vw,1.4rem)] flex items-center justify-center gap-2"
                >
                  <span className="whitespace-nowrap">EXECUTAR DIAGNÓSTICO</span>
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                </ShinyButton>
              )}
              
              {status === "loading" && (
                <div className="w-full h-14 rounded-[0.6rem] bg-white/10 text-white/40 flex items-center justify-center gap-3">
                  <Loader2 className="animate-spin text-[#31ffce]" size={24} />
                  Enviando...
                </div>
              )}

              {status === "success" && (
                <div className="w-full h-14 rounded-[0.6rem] bg-[#31ffce] text-[#0a0a0a] flex items-center justify-center gap-2 px-4 shadow-[0_0_20px_rgba(49,255,206,0.4)]">
                   <CheckCircle2 size={24} className="shrink-0" />
                   <span className="text-sm md:text-[1.2rem] leading-tight font-bold uppercase font-bebas">
                     ✓ Diagnóstico solicitado! Entraremos em contato em breve.
                   </span>
                </div>
              )}
            </div>

          </form>
        </motion.div>

      </div>
    </section>
  );
}
