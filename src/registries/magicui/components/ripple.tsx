'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ComponentRenderProps } from '@json-render/react';

export const Ripple = ({ element, children }: ComponentRenderProps) => {
  const {
    mainCircleSize = 210,
    mainCircleOpacity = 0.24,
    numCircles = 8,
    className,
    style
  } = element.props;

  return (
    <div
      className={className as string}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        ...style as React.CSSProperties
      }}
    >
      {Array.from({ length: numCircles as number }).map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            borderRadius: '50%',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            width: (mainCircleSize as number) + i * 70,
            height: (mainCircleSize as number) + i * 70,
            opacity: (mainCircleOpacity as number) - i * 0.03,
          }}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [(mainCircleOpacity as number) - i * 0.03, (mainCircleOpacity as number) - i * 0.03 - 0.05, (mainCircleOpacity as number) - i * 0.03],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.2,
          }}
        />
      ))}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};
