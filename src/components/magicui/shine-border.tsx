'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ShineBorderProps {
    children: React.ReactNode;
    className?: string;
    borderRadius?: number;
    borderWidth?: number;
    duration?: number;
    color?: string | string[];
}

export const ShineBorder = ({
    children,
    className = '',
    borderRadius = 12,
    borderWidth = 2,
    duration = 4,
    color = ['#A07CFE', '#FE8FB5', '#FFBE7B'],
}: ShineBorderProps) => {
    const colors = Array.isArray(color) ? color : [color];

    return (
        <div
            className={`relative p-[${borderWidth}px] ${className}`}
            style={{ borderRadius }}
        >
            {/* Animated border */}
            <motion.div
                className="absolute inset-0 rounded-[inherit]"
                style={{
                    background: `linear-gradient(90deg, ${colors.join(', ')}, ${colors[0]})`,
                    backgroundSize: '200% 100%',
                    borderRadius,
                }}
                animate={{
                    backgroundPosition: ['0% 0%', '200% 0%'],
                }}
                transition={{
                    duration,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            />
            {/* Inner content with background */}
            <div
                className="relative bg-white dark:bg-gray-900"
                style={{
                    borderRadius: borderRadius - borderWidth,
                    margin: borderWidth,
                }}
            >
                {children}
            </div>
        </div>
    );
};
