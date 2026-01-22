'use client';

import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

interface GlowingCardProps {
    children: React.ReactNode;
    className?: string;
    containerClassName?: string;
}

export const GlowingCard = ({
    children,
    className = '',
    containerClassName = '',
}: GlowingCardProps) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className={`group relative rounded-xl bg-neutral-900 p-px ${containerClassName}`}
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(14, 165, 233, 0.15),
              transparent 80%
            )
          `,
                }}
            />
            <div
                className={`relative rounded-xl bg-neutral-900 px-4 py-6 ${className}`}
            >
                {children}
            </div>
        </div>
    );
};
