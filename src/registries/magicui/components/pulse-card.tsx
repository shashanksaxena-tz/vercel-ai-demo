'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ComponentRenderProps } from '@json-render/react';

export const PulseCard = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    description,
    pulseColor = 'rgba(99, 102, 241, 0.5)',
    borderRadius = 12,
    className,
    style
  } = element.props;

  return (
    <motion.div
      className={className as string}
      style={{
        position: 'relative',
        padding: '24px',
        borderRadius: borderRadius as number,
        backgroundColor: 'white',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        ...style as React.CSSProperties
      }}
    >
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: borderRadius as number,
          backgroundColor: pulseColor as string,
          zIndex: 0,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {Boolean(title) && <h3 className="text-lg font-semibold mb-2">{title as string}</h3>}
        {Boolean(description) && <p className="text-gray-500 mb-4">{description as string}</p>}
        {children}
      </div>
    </motion.div>
  );
};
