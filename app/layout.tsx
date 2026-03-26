import type { Metadata } from "next";
import { Poppins, DM_Sans, JetBrains_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

// Bebas Neue: Impactful headings
const bebasNeue = Bebas_Neue({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
});

// Poppins: display/headings – 700 Bold (impacto sem ser pesado demais)
const poppins = Poppins({
  weight: ["400", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: 'MAItink — Marketing com Inteligência. Resultado sem Limite.',
  description: 'A Maitink usa IA para transformar o marketing da sua empresa em uma máquina autônoma de resultados — mais rápida, mais barata e mais inteligente.',
  keywords: ['marketing digital', 'inteligência artificial', 'automação de marketing', 'agência de IA'],
  authors: [{ name: 'Maitink' }],
  openGraph: {
    title: 'MAItink — Marketing com Inteligência',
    description: 'Automatize seu marketing com as melhores IAs do mercado.',
    url: 'https://maitink.com.br',
    siteName: 'Maitink',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MAItink — Marketing com Inteligência',
    description: 'Automatize seu marketing com as melhores IAs do mercado.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${dmSans.variable} ${jetBrainsMono.variable} ${bebasNeue.variable} antialiased selection:bg-turquoise selection:text-black`}
        suppressHydrationWarning
      >
        <SmoothScrollProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
