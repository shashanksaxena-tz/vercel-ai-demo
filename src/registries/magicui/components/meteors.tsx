'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ComponentRenderProps } from '@json-render/react';

export const Meteors = ({ element, children }: ComponentRenderProps) => {
  const {
    number = 20,
    className,
    style
  } = element.props;

  const meteors = React.useMemo(() => {
    return Array.from({ length: number as number }, (_, idx) => ({
      id: idx,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 5,
    }));
  }, [number]);

  return (
    <div
      className={className as string}
      style={{
        position: 'relative',
        overflow: 'hidden',
        ...style as React.CSSProperties
      }}
    >
      {meteors.map((meteor) => (
        <motion.span
          key={meteor.id}
          style={{
            position: 'absolute',
            top: meteor.top,
            left: meteor.left,
            width: 1,
            height: Math.random() * 80 + 40,
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.8), transparent)',
            borderRadius: 9999,
            transform: 'rotate(215deg)',
          }}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 500, opacity: [0, 1, 0] }}
          transition={{
            duration: meteor.duration,
            delay: meteor.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};
