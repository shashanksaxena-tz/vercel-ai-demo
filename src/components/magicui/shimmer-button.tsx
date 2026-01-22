'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ShimmerButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    shimmerColor?: string;
    backgroundColor?: string;
}

export const ShimmerButton = ({
    children,
    onClick,
    disabled = false,
    className = '',
    shimmerColor = 'rgba(255, 255, 255, 0.3)',
    backgroundColor = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
}: ShimmerButtonProps) => {
    return (
        <motion.button
            className={`relative overflow-hidden px-6 py-3 rounded-lg font-medium text-white ${className}`}
            style={{ background: backgroundColor }}
            onClick={onClick}
            disabled={disabled}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            {/* Shimmer effect */}
            <motion.div
                className="absolute inset-0"
                style={{
                    background: `linear-gradient(90deg, transparent 0%, ${shimmerColor} 50%, transparent 100%)`,
                }}
                animate={{
                    x: ['-100%', '100%'],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            />
            <span className="relative z-10">{children}</span>
        </motion.button>
    );
};
