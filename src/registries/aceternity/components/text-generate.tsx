'use client';

import React, { useEffect, useState } from 'react';
import { motion, stagger, useAnimate } from 'framer-motion';
import { ComponentRenderProps } from '@json-render/react';

export const TextGenerate = ({ element }: ComponentRenderProps) => {
  const {
    words,
    className,
    duration = 0.5,
    filter = true,
    style
  } = element.props;

  const [scope, animate] = useAnimate();
  const [hasAnimated, setHasAnimated] = useState(false);
  const wordsArray = (words as string)?.split(' ') || [];

  useEffect(() => {
    if (scope.current && !hasAnimated) {
      animate(
        'span',
        {
          opacity: 1,
          filter: filter ? 'blur(0px)' : 'none',
        },
        {
          duration: duration as number,
          delay: stagger(0.1),
        }
      );
      setHasAnimated(true);
    }
  }, [scope, animate, hasAnimated, duration, filter]);

  return (
    <motion.div
      ref={scope}
      className={className as string}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.25rem',
        ...style as React.CSSProperties
      }}
    >
      {wordsArray.map((word, idx) => (
        <motion.span
          key={`${word}-${idx}`}
          style={{
            opacity: 0,
            filter: filter ? 'blur(10px)' : 'none',
            color: 'white',
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};
