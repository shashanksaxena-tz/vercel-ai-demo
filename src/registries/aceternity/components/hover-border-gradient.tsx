'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ComponentRenderProps } from '@json-render/react';

export const HoverBorderGradient = ({ element, children, onAction }: ComponentRenderProps) => {
  const [hovered, setHovered] = useState(false);

  const {
    containerClassName,
    as = 'button',
    className,
    action,
    duration = 1,
    style
  } = element.props;

  const handleClick = () => {
    if (action && onAction) {
      onAction({ name: action as string });
    }
  };

  return (
    <div
      className={containerClassName as string}
      style={{
        position: 'relative',
        display: 'inline-block',
        borderRadius: 9999,
        padding: 1,
        background: hovered
          ? 'linear-gradient(90deg, #ff0080, #ff8c00, #40e0d0, #ff0080)'
          : 'linear-gradient(90deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))',
        backgroundSize: hovered ? '200% 100%' : '100% 100%',
        transition: 'all 0.3s ease',
        animation: hovered ? `gradient ${duration}s linear infinite` : 'none',
        ...style as React.CSSProperties
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        onClick={handleClick}
        className={className as string}
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '12px 24px',
          borderRadius: 9999,
          backgroundColor: 'rgb(23, 23, 23)',
          color: 'white',
          fontWeight: 500,
        }}
      >
        {children}
      </button>
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </div>
  );
};
