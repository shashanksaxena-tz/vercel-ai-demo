'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GradientTextProps {
    children: React.ReactNode;
    className?: string;
    colors?: string[];
    animationDuration?: number;
}

export const GradientText = ({
    children,
    className = '',
    colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#ff6b6b'],
    animationDuration = 3,
}: GradientTextProps) => {
    return (
        <motion.span
            className={`inline-block font-bold bg-clip-text text-transparent ${className}`}
            style={{
                backgroundImage: `linear-gradient(90deg, ${colors.join(', ')})`,
                backgroundSize: '200% auto',
            }}
            animate={{
                backgroundPosition: ['0% center', '200% center'],
            }}
            transition={{
                duration: animationDuration,
                repeat: Infinity,
                ease: 'linear',
            }}
        >
            {children}
        </motion.span>
    );
};
