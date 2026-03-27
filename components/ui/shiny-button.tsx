"use client";

import React from "react";
import { motion, type HTMLMotionProps, type AnimationProps } from "framer-motion";
import { cn } from "@/lib/utils";

const animationProps = {
  initial: { "--x": "100%", scale: 0.8 },
  animate: { "--x": "-100%", scale: 1 },
  whileTap: { scale: 0.95 },
  transition: {
    repeat: Infinity,
    repeatType: "loop",
    repeatDelay: 1,
    type: "spring",
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: "spring",
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
} as AnimationProps & HTMLMotionProps<"button">;

interface ShinyButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
}

const ShinyButton = ({
  children,
  className,
  variant = "primary",
  ...props
}: ShinyButtonProps) => {
  const styles = {
    primary: {
      bg: "bg-[linear-gradient(325deg,#e6d400_0%,#ffed00_55%,#e6d400_90%)]",
      shadow: "shadow-[0px_0px_20px_rgba(255,237,0,0.4),0px_5px_5px_-1px_rgba(230,212,0,0.25),inset_4px_4px_8px_rgba(255,250,150,0.4),inset_-4px_-4px_8px_rgba(180,160,0,0.3)]",
      text: "text-[#0a0a0a]",
      shine: "rgba(255,255,255,0.7)",
    },
    secondary: {
      bg: "bg-[linear-gradient(325deg,#00d4a8_0%,#31ffce_55%,#00d4a8_90%)]",
      shadow: "shadow-[0px_0px_20px_rgba(49,255,206,0.4),0px_5px_5px_-1px_rgba(0,180,140,0.25),inset_4px_4px_8px_rgba(150,255,230,0.4),inset_-4px_-4px_8px_rgba(0,150,110,0.3)]",
      text: "text-[#0a0a0a]",
      shine: "rgba(255,255,255,0.7)",
    },
  }[variant];

  return (
    <motion.button
      {...animationProps}
      {...props}
      className={cn(
        "relative rounded-lg px-6 py-2 font-bold backdrop-blur-xl transition-shadow duration-300 hover:shadow-lg dark:bg-radial-gradient",
        styles.bg,
        styles.shadow,
        styles.text,
        className,
      )}
    >
      <span
        className="relative block size-full text-sm uppercase tracking-wide"
        style={{
          maskImage:
            "linear-gradient(-75deg,white calc(var(--x) + 20%),transparent calc(var(--x) + 30%),white calc(var(--x) + 100%))",
        }}
      >
        {children}
      </span>
      <span
        style={{
          mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
          maskComposite: "exclude",
        }}
        className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,rgba(255,255,255,0.1)_calc(var(--x)+20%),rgba(255,255,255,0.5)_calc(var(--x)+25%),rgba(255,255,255,0.1)_calc(var(--x)+100%))] p-px"
      ></span>
    </motion.button>
  );
};

export default ShinyButton;
