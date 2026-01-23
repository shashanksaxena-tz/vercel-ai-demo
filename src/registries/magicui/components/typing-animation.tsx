'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ComponentRenderProps } from '@json-render/react';

export const TypingAnimation = ({ element }: ComponentRenderProps) => {
  const {
    text,
    duration = 100,
    delay = 0,
    className,
    cursor = true,
    cursorClassName,
    style
  } = element.props;

  const textContent = text as string || '';
  const [displayedText, setDisplayedText] = useState('');
  const [i, setI] = useState(0);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (i < textContent.length) {
          setDisplayedText(textContent.substring(0, i + 1));
          setI(i + 1);
        } else {
          clearInterval(typingInterval);
        }
      }, duration as number);

      return () => clearInterval(typingInterval);
    }, (delay as number) * 1000);

    return () => clearTimeout(startTimeout);
  }, [i, textContent, duration, delay]);

  return (
    <span className={className as string} style={style as React.CSSProperties}>
      {displayedText}
      {cursor && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className={cursorClassName as string || 'inline-block ml-1'}
        >
          |
        </motion.span>
      )}
    </span>
  );
};
