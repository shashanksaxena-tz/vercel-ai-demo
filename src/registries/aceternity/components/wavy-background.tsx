'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ComponentRenderProps } from '@json-render/react';

export const WavyBackground = ({ element, children }: ComponentRenderProps) => {
  const {
    colors = ['#38bdf8', '#818cf8', '#c084fc', '#e879f9', '#22d3ee'],
    waveWidth = 50,
    backgroundFill = 'rgb(9, 9, 11)',
    blur = 10,
    speed = 'fast',
    waveOpacity = 0.5,
    className,
    style
  } = element.props;

  const speedMultiplier = speed === 'slow' ? 0.5 : speed === 'fast' ? 1.5 : 1;

  return (
    <div
      className={className as string}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        overflow: 'hidden',
        backgroundColor: backgroundFill as string,
        ...style as React.CSSProperties
      }}
    >
      <svg
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: 0,
          filter: `blur(${blur}px)`,
        }}
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        {(colors as string[]).map((color, idx) => (
          <motion.path
            key={idx}
            fill={color}
            fillOpacity={waveOpacity as number}
            animate={{
              d: [
                `M0,${160 + idx * 20}L48,${170 + idx * 20}C96,${180 + idx * 20},192,${200 + idx * 20},288,${186 + idx * 20}C384,${173 + idx * 20},480,${127 + idx * 20},576,${128 + idx * 20}C672,${128 + idx * 20},768,${176 + idx * 20},864,${186 + idx * 20}C960,${197 + idx * 20},1056,${171 + idx * 20},1152,${160 + idx * 20}C1248,${149 + idx * 20},1344,${155 + idx * 20},1392,${157 + idx * 20}L1440,${160 + idx * 20}L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z`,
                `M0,${128 + idx * 20}L48,${138 + idx * 20}C96,${149 + idx * 20},192,${171 + idx * 20},288,${186 + idx * 20}C384,${200 + idx * 20},480,${208 + idx * 20},576,${186 + idx * 20}C672,${165 + idx * 20},768,${117 + idx * 20},864,${106 + idx * 20}C960,${96 + idx * 20},1056,${128 + idx * 20},1152,${144 + idx * 20}C1248,${160 + idx * 20},1344,${160 + idx * 20},1392,${160 + idx * 20}L1440,${160 + idx * 20}L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z`,
              ],
            }}
            transition={{
              duration: 5 / speedMultiplier,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: idx * 0.2,
            }}
          />
        ))}
      </svg>
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};
