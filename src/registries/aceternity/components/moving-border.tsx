'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ComponentRenderProps } from '@json-render/react';

export const MovingBorder = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    action,
    borderRadius = 12,
    duration = 2,
    className,
    containerClassName,
    style
  } = element.props;

  const handleClick = () => {
    if (action && onAction) {
      onAction({ name: action as string });
    }
  };

  return (
    <button
      onClick={handleClick}
      className={containerClassName as string}
      style={{
        position: 'relative',
        display: 'inline-flex',
        overflow: 'hidden',
        borderRadius: borderRadius as number,
        padding: 2,
        background: 'transparent',
        ...style as React.CSSProperties
      }}
    >
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: duration as number,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          position: 'absolute',
          inset: -100,
          background: 'conic-gradient(from 0deg, transparent, rgb(59, 130, 246), transparent 30%)',
        }}
      />
      <div
        className={className as string}
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          padding: '12px 24px',
          borderRadius: (borderRadius as number) - 2,
          backgroundColor: 'rgb(17, 24, 39)',
          color: 'white',
          fontWeight: 500,
        }}
      >
        {children}
      </div>
    </button>
  );
};
