"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "turquoise";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const Button = ({ 
  variant = "primary", 
  size = "md",
  children, 
  className,
  ...props 
}: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center font-bebas tracking-widest uppercase transition-all duration-300 rounded-[2px] active:scale-95 whitespace-nowrap";
  
  const sizes = {
    sm: "h-10 px-4 text-sm",
    md: "h-12 px-6 text-lg",
    lg: "h-14 px-10 text-xl",
  };

  const variants = {
    primary: "bg-yellow text-black hover:bg-yellow/90",
    secondary: "bg-white text-black hover:bg-white/90",
    turquoise: "bg-turquoise text-black hover:bg-turquoise/90",
    ghost: "text-white/60 hover:text-white border border-white/10 hover:border-white/20",
  };

  return (
    <button 
      className={cn(baseStyles, sizes[size], variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
