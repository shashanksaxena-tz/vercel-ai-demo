'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ComponentRenderProps } from '@json-render/react';

export const GlowingStars = ({ element, children }: ComponentRenderProps) => {
  const {
    starCount = 50,
    className,
    style
  } = element.props;

  const stars = useMemo(() => {
    return Array.from({ length: starCount as number }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 2,
      duration: Math.random() * 2 + 1,
    }));
  }, [starCount]);

  return (
    <div
      className={className as string}
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'rgb(9, 9, 11)',
        ...style as React.CSSProperties
      }}
    >
      <div style={{ position: 'absolute', inset: 0 }}>
        {stars.map((star) => (
          <motion.div
            key={star.id}
            style={{
              position: 'absolute',
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              borderRadius: '50%',
              backgroundColor: 'white',
              boxShadow: `0 0 ${star.size * 2}px ${star.size}px rgba(255, 255, 255, 0.5)`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};
