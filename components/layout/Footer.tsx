"use client";

import { Zap, Github, Twitter, Linkedin, Instagram } from "lucide-react";

const footerLinks = {
  SISTEMA: [
    { name: "PERDAS", href: "#perdas" },
    { name: "SOLUÇÕES", href: "#solucoes" },
  ],
  EMPRESA: [
    { name: "SOBRE", href: "#sobre" },
    { name: "PLANOS", href: "#planos" },
    { name: "FAQ", href: "#faq" },
  ],
  LEGAL: [
    { name: "PRIVACIDADE", href: "/privacidade" },
    { name: "TERMOS", href: "/termos" },
  ],
};

const Footer = () => {
  return (
    <footer className="relative bg-black border-t border-white/5 py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 pb-20">
          <div className="space-y-8">
            <div className="space-y-4">
              <a href="#" className="flex items-center gap-3 transition-opacity hover:opacity-80">
                <div className="w-8 h-8 bg-yellow rounded-full flex items-center justify-center text-black">
                  <Zap size={16} className="fill-black" />
                </div>
                <span className="text-white font-bebas text-3xl tracking-widest">MAITINK</span>
              </a>
              <p className="text-white/40 font-dm text-base max-w-sm leading-relaxed">
                A primeira agência de orquestração de IA do Brasil. 
                Escalando o presente, automatizando o futuro.
              </p>
            </div>

            <div className="flex gap-4">
              {[Twitter, Github, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 border border-white/5 rounded-full flex items-center justify-center text-white/20 hover:text-white hover:border-turquoise transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="space-y-6">
                <h4 className="text-turquoise font-mono text-[9px] tracking-widest font-bold uppercase">{title}</h4>
                <div className="flex flex-col gap-4">
                  {links.map((link) => (
                    <a 
                      key={link.name} 
                      href={link.href} 
                      className="text-white font-bebas text-xl tracking-widest hover:text-yellow transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-8 text-white/20 font-mono text-[9px] uppercase tracking-widest font-bold">
             <span>&copy; 2026_MAITINK_LABS</span>
             <span className="hidden sm:inline-block">/</span>
             <span className="hidden sm:inline-block">FEITO_COM_IA_NO_BRASIL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
