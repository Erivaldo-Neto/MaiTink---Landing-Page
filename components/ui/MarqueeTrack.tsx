"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MarqueeTrackProps {
  items: string[];
  duration?: number;
  className?: string;
}

const MarqueeTrack = ({ items, duration = 20, className }: MarqueeTrackProps) => {
  return (
    <div className={cn("overflow-hidden whitespace-nowrap", className)}>
      <motion.div
        className="inline-block"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        <div className="flex items-center gap-12 px-6">
          {/* Double items for seamless loop */}
          {[...items, ...items].map((item, i) => (
            <div key={i} className="flex items-center gap-12 font-bebas text-2xl text-white/40 uppercase tracking-widest">
              <span>{item}</span>
              <span className="text-turquoise">·</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default MarqueeTrack;
