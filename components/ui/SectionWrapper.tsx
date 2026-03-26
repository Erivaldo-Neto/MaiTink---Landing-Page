"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  variant?: "dark" | "yellow";
  className?: string;
  containerClassName?: string;
  animateIn?: boolean;
}

const SectionWrapper = ({
  children,
  id,
  variant = "dark",
  className,
  containerClassName,
  animateIn = true,
}: SectionWrapperProps) => {
  return (
    <section 
      id={id}
      className={cn(
        "relative py-20 lg:py-24", // Max 80-96px padding
        variant === "dark" ? "bg-black text-white" : "bg-yellow text-black",
        className
      )}
    >
      <motion.div
        className={cn("container mx-auto px-6 relative z-10", containerClassName)}
        initial={animateIn ? { opacity: 0, y: 15 } : undefined}
        whileInView={animateIn ? { opacity: 1, y: 0 } : undefined}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </section>
  );
};

export default SectionWrapper;
