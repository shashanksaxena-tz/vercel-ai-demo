'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ComponentRenderProps } from '@json-render/react';

export const BlurFade = ({ element, children }: ComponentRenderProps) => {
  const {
    delay = 0,
    duration = 0.4,
    blur = '6px',
    yOffset = 6,
    inView = true,
    className,
    style
  } = element.props;

  const variants = {
    hidden: { y: yOffset as number, opacity: 0, filter: `blur(${blur})` },
    visible: { y: 0, opacity: 1, filter: 'blur(0px)' },
  };

  return (
    <motion.div
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      viewport={{ once: true }}
      variants={variants}
      transition={{
        delay: delay as number,
        duration: duration as number,
        ease: 'easeOut',
      }}
      className={className as string}
      style={style as React.CSSProperties}
    >
      {children}
    </motion.div>
  );
};
