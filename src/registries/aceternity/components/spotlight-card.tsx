'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ComponentRenderProps } from '@json-render/react';

export const SpotlightCard = ({ element, children }: ComponentRenderProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const {
    title,
    description,
    spotlightColor = 'rgba(14, 165, 233, 0.15)',
    className,
    style
  } = element.props;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className as string}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 12,
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backgroundColor: 'rgb(17, 24, 39)',
        padding: 24,
        ...style as React.CSSProperties
      }}
    >
      <div
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          inset: 0,
          opacity,
          transition: 'opacity 300ms',
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {Boolean(title) && <h3 className="text-lg font-semibold text-white mb-2">{title as string}</h3>}
        {Boolean(description) && <p className="text-gray-400 mb-4">{description as string}</p>}
        {children}
      </div>
    </div>
  );
};
