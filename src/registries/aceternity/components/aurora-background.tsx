'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ComponentRenderProps } from '@json-render/react';

export const AuroraBackground = ({ element, children }: ComponentRenderProps) => {
  const {
    showRadialGradient = true,
    className,
    style
  } = element.props;

  return (
    <div
      className={className as string}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'rgb(9, 9, 11)',
        overflow: 'hidden',
        ...style as React.CSSProperties
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
        }}
      >
        <motion.div
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: 0.7, scale: 1.1 }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            position: 'absolute',
            inset: '-50%',
            background: `
              conic-gradient(from 180deg at 50% 50%,
                rgb(16, 185, 129) 0deg,
                rgb(59, 130, 246) 60deg,
                rgb(147, 51, 234) 120deg,
                rgb(236, 72, 153) 180deg,
                rgb(239, 68, 68) 240deg,
                rgb(251, 191, 36) 300deg,
                rgb(16, 185, 129) 360deg
              )
            `,
            filter: 'blur(100px)',
            opacity: 0.3,
          }}
        />
      </div>
      {Boolean(showRadialGradient) && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at center, transparent 0%, rgb(9, 9, 11) 70%)',
          }}
        />
      )}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};
