/**
 * SPDX-License-Identifier: MIT
 * Copyright (c) 2025 SnoozeScript
 */

import React, { memo } from 'react';
import { motion } from 'framer-motion';

export const ReactiveGridBackground: React.FC = memo(() => {
  // Reduced grid density for better performance (was 40x25 = 1000 elements, now 20x12 = 240 elements)
  const gridCols = 20;
  const gridRows = 12;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Static gradient background - no animation overhead */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900" />
      
      {/* Simplified grid with CSS animation instead of Framer Motion for better performance */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="grid-background"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(6, 182, 212, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: `${100 / gridCols}% ${100 / gridRows}%`,
            width: '100%',
            height: '100%'
          }}
        />
      </div>

      {/* Fewer animated dots - only create a sparse pattern */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => {
          const x = (i % 10) * 10;
          const y = Math.floor(i / 10) * 20;
          const delay = i * 0.08;
          
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
              style={{
                left: `${x}%`,
                top: `${y}%`,
              }}
              animate={{
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3,
                delay: delay,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "loop"
              }}
            />
          );
        })}
      </div>

      {/* Simple dock connection indicator */}
      <motion.div
        className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-px h-8 bg-gradient-to-t from-purple-400/40 to-transparent"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
});
