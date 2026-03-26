"use client";

import { motion } from "framer-motion";
import { Linkedin, Instagram, Phone, Mail } from "lucide-react";

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
const navigation = ["Início", "Soluções", "Planos", "Sobre", "Contato"];
const services = ["Tráfego Pago", "Automação", "Conteúdo com IA", "SEO Inteligente", "CRM e Vendas", "E-mail Marketing"];

/* ────────────────────────────────────────────────────────
   MAIN COMPONENT
──────────────────────────────────────────────────────── */
export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0a] border-t border-white/5 py-16 px-6 relative overflow-hidden">
      
      <div className="max-w-[1280px] mx-auto">
        
        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20 lg:mb-24">
          
          {/* Brand */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="space-y-6 text-center lg:text-left"
          >
            <div className="font-bebas text-[2.5rem] tracking-tight leading-none text-white">
              MAI<span className="text-[#31ffce]" style={{ textShadow: "0 0 10px #31ffce50" }}>tink</span>
            </div>
            <p className="font-dm text-[0.875rem] text-white/50 max-w-[240px] mx-auto lg:mx-0 leading-relaxed">
              "Marketing com inteligência. Resultado sem limite."
            </p>
            
            {/* Social Icons */}
            <div className="flex justify-center lg:justify-start gap-3">
              {[
                { icon: Linkedin, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Phone, href: "#" },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ scale: 1.15, borderColor: "#31ffce", boxShadow: "0 0 15px rgba(49,255,206,0.3)" }}
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 text-white/60 hover:text-[#31ffce]"
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="space-y-8"
          >
            <h4 className="font-dm text-[0.75rem] text-white/40 uppercase tracking-[0.1em]">Navegação</h4>
            <ul className="space-y-4">
              {navigation.map((item, i) => (
                <li key={i}>
                  <a href={`#${item.toLowerCase()}`} className="font-dm text-[0.875rem] text-white/60 hover:text-[#31ffce] transition-all decoration-[#31ffce]/40 hover:underline underline-offset-4 decoration-2">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="space-y-8"
          >
            <h4 className="font-dm text-[0.75rem] text-white/40 uppercase tracking-[0.1em]">Serviços</h4>
            <ul className="space-y-4">
              {services.map((service, i) => (
                <li key={i}>
                  <a href="#" className="font-dm text-[0.875rem] text-white/60 hover:text-[#31ffce] transition-all decoration-[#31ffce]/40 hover:underline underline-offset-4 decoration-2">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & CTA */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
            className="space-y-8"
          >
            <h4 className="font-dm text-[0.75rem] text-white/40 uppercase tracking-[0.1em]">Contato</h4>
            <div className="space-y-4">
              <a href="mailto:contato@maitink.com.br" className="flex items-center gap-3 font-dm text-[0.875rem] text-white/60 hover:text-[#31ffce] transition-all group">
                <Mail size={16} className="text-[#31ffce]" />
                contato@maitink.com.br
              </a>
              <div className="flex items-center gap-3 font-dm text-[0.875rem] text-white/60 transition-all">
                < Phone size={16} className="text-[#31ffce]" />
                (11) 99999-9999
              </div>
            </div>

            <motion.a
              href="#contato"
              whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(49,255,206,0.3)" }}
              className="inline-block mt-4 px-6 py-3 border border-[#31ffce]/50 rounded-[0.5rem] bg-[#31ffce1a] backdrop-blur-md text-[#31ffce] font-dm text-[0.875rem] font-medium transition-all"
            >
              Solicitar diagnóstico →
            </motion.a>
          </motion.div>

        </div>

        {/* BOTTOM LINE */}
        <div className="pt-8 border-t border-white/5 flex flex-col lg:flex-row items-center justify-between gap-6">
          <p className="font-dm text-[0.8rem] text-white/30 text-center lg:text-left">
            © 2025 Maitink. Todos os direitos reservados.
          </p>
          <div className="flex gap-8">
            <a href="#" className="font-dm text-[0.8rem] text-white/30 hover:text-[#31ffce] transition-colors">Política de Privacidade</a>
            <a href="#" className="font-dm text-[0.8rem] text-white/30 hover:text-[#31ffce] transition-colors">Termos de Uso</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
