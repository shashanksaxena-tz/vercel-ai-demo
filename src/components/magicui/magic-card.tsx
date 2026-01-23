'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface MagicCardProps {
    children: React.ReactNode;
    className?: string;
    gradientColor?: string;
    gradientOpacity?: number;
}

export const MagicCard = ({
    children,
    className = '',
    gradientColor = '#D9D9D9',
    gradientOpacity = 0.8,
}: MagicCardProps) => {
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
    const cardRef = React.useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <motion.div
            ref={cardRef}
            className={`relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-900 ${className}`}
            onMouseMove={handleMouseMove}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
        >
            {/* Gradient spotlight effect */}
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${gradientColor}${Math.round(gradientOpacity * 255).toString(16).padStart(2, '0')}, transparent 40%)`,
                }}
            />
            {/* Content */}
            <div className="relative z-10">{children}</div>
        </motion.div>
    );
};
