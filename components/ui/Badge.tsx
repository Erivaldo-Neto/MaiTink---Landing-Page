"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "turquoise" | "yellow" | "outline";
  className?: string;
}

const Badge = ({ children, variant = "turquoise", className }: BadgeProps) => {
  const variants = {
    turquoise: "bg-turquoise/10 text-turquoise border-turquoise/30",
    yellow: "bg-yellow/10 text-yellow border-yellow/30",
    outline: "bg-transparent text-white/60 border-white/20",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 text-[10px] font-mono font-bold tracking-[0.1em] uppercase border rounded-[2px]",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
