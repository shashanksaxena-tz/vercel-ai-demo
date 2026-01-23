'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ComponentRenderProps } from '@json-render/react';

export const BorderBeam = ({ element, children }: ComponentRenderProps) => {
  const {
    size = 200,
    duration = 15,
    anchor = 90,
    borderWidth = 1.5,
    colorFrom = '#ffaa40',
    colorTo = '#9c40ff',
    delay = 0,
    className,
    style
  } = element.props;

  return (
    <div
      className={className as string}
      style={{
        position: 'relative',
        borderRadius: 8,
        overflow: 'hidden',
        ...style as React.CSSProperties
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 8,
          border: `${borderWidth}px solid transparent`,
          backgroundClip: 'padding-box',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
        }}
        animate={{
          background: [
            `linear-gradient(${anchor}deg, transparent 0%, ${colorFrom} 50%, transparent 100%)`,
            `linear-gradient(${(anchor as number) + 360}deg, transparent 0%, ${colorTo} 50%, transparent 100%)`,
          ],
        }}
        transition={{
          duration: duration as number,
          repeat: Infinity,
          delay: delay as number,
          ease: 'linear',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};
