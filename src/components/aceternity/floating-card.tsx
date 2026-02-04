'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface FloatingCardProps {
    children: React.ReactNode;
    className?: string;
}

export const FloatingCard = ({
    children,
    className = '',
}: FloatingCardProps) => {
    return (
        <motion.div
            className={`relative rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-800 p-6 shadow-2xl ${className}`}
            initial={{ y: 0 }}
            animate={{
                y: [0, -10, 0],
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
            whileHover={{
                scale: 1.02,
                rotateY: 5,
                rotateX: -5,
            }}
            style={{
                transformStyle: 'preserve-3d',
                perspective: 1000,
            }}
        >
            {/* Inner glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 blur-xl" />
            {/* Content */}
            <div className="relative z-10">{children}</div>
        </motion.div>
    );
};
