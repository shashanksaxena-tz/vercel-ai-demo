'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ComponentRenderProps } from '@json-render/react';

export const AnimatedText = ({ element }: ComponentRenderProps) => {
  const {
    text,
    variant = 'h1',
    animation = 'fadeIn',
    duration = 0.5,
    delay = 0,
    staggerChildren = 0.05,
    className,
    style
  } = element.props;

  const textContent = text as string || '';
  const words = textContent.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerChildren as number,
        delayChildren: delay as number,
      },
    },
  };

  const wordVariants = {
    fadeIn: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: duration as number } },
    },
    slideUp: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { duration: duration as number } },
    },
    blur: {
      hidden: { opacity: 0, filter: 'blur(10px)' },
      visible: { opacity: 1, filter: 'blur(0px)', transition: { duration: duration as number } },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.5 },
      visible: { opacity: 1, scale: 1, transition: { duration: duration as number } },
    },
  };

  const selectedVariant = wordVariants[animation as keyof typeof wordVariants] || wordVariants.fadeIn;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component = (motion as any)[variant as string] || motion.p;

  return (
    <Component
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className as string}
      style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', ...style as React.CSSProperties }}
    >
      {words.map((word, index) => (
        <motion.span key={index} variants={selectedVariant}>
          {word}
        </motion.span>
      ))}
    </Component>
  );
};
