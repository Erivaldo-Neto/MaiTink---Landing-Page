'use client'

import React from "react";
import { cn } from "@/lib/utils";

export default function AnimatedBorderButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "relative overflow-hidden rounded-lg border border-[#31ffce]/40 bg-transparent px-6 py-3 font-bebas text-lg uppercase tracking-wide text-[#31ffce] transition-all duration-300 hover:bg-[rgba(49,255,206,0.08)] hover:border-[#31ffce] hover:shadow-[0_0_15px_#31ffce1a]",
        className
      )}
      {...props}
    >
      {/* Luz percorrendo o contorno */}
      <span
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(49,255,206,0.4), transparent)',
          backgroundSize: '200% 100%',
          animation: 'borderSlide 3s linear infinite',
        }}
      />
      <span className="relative z-10">{children}</span>

      <style jsx>{`
        @keyframes borderSlide {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </button>
  )
}
