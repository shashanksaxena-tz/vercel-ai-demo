import React from 'react';
import { ComponentRegistry } from '@json-render/react';
import { BentoGrid } from '@/components/aceternity/bento-grid';
import { GlowingCard } from '@/components/aceternity/glowing-card';
import { FloatingCard } from '@/components/aceternity/floating-card';

// Use shadcn base for non-aceternity components
import { shadcnRegistry } from '../shadcn';

// Aceternity Grid - Bento style
const Grid = ({ element, children }: any) => {
    return <BentoGrid>{children}</BentoGrid>;
};

// Aceternity Card - Glowing/Floating effect
const Card = ({ element, children }: any) => {
    const { title, description } = element.props;

    return (
        <GlowingCard>
            <div className="text-white">
                {title && <h3 className="text-lg font-semibold mb-2">{title as string}</h3>}
                {description && <p className="text-gray-400 mb-4">{description as string}</p>}
                {children}
            </div>
        </GlowingCard>
    );
};

// Aceternity Button - Dark theme style
const Button = ({ element, onAction }: any) => {
    const { children, label, action, style } = element.props;

    return (
        <button
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium
                 hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 shadow-lg
                 hover:shadow-cyan-500/25"
            onClick={() => action && onAction?.({ name: action as string })}
            style={style as React.CSSProperties}
        >
            {(label || children) as React.ReactNode}
        </button>
    );
};

// Aceternity Alert - Floating style
const Alert = ({ element }: any) => {
    const { title, description } = element.props;

    return (
        <FloatingCard>
            <div className="text-white">
                {title && <h4 className="font-semibold">{title as string}</h4>}
                {description && <p className="text-sm text-gray-300">{description as string}</p>}
            </div>
        </FloatingCard>
    );
};

// Aceternity Text - Gradient style for headings
const Text = ({ element }: any) => {
    const { variant = 'p', children, style } = element.props;

    if (variant === 'h1' || variant === 'h2') {
        return (
            <h1
                className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 font-bold"
                style={{
                    fontSize: variant === 'h1' ? '3rem' : '2rem',
                    ...style as React.CSSProperties,
                }}
            >
                {children as React.ReactNode}
            </h1>
        );
    }

    return <p className="text-gray-300" style={style as React.CSSProperties}>{children as React.ReactNode}</p>;
};

// Simple fallback components
const Stack = ({ element, children }: any) => {
    const { direction = 'column', gap = 4, style } = element.props;
    return (
        <div
            className={`flex ${direction === 'row' ? 'flex-row' : 'flex-col'}`}
            style={{ gap: `${gap * 4}px`, ...style as React.CSSProperties }}
        >
            {children}
        </div>
    );
};

const Container = ({ element, children }: any) => {
    const { maxWidth = '1200px', style } = element.props;
    return (
        <div className="bg-neutral-900" style={{ maxWidth, margin: '0 auto', padding: '16px', ...style as React.CSSProperties }}>
            {children}
        </div>
    );
};

export const aceternityRegistry: ComponentRegistry = {
    // Aceternity-styled components
    Button,
    Text,
    Card,
    Alert,
    Grid,
    Stack,
    Container,

    // Fall back to shadcn for the rest
    Badge: shadcnRegistry.Badge,
    Avatar: shadcnRegistry.Avatar,
    Icon: shadcnRegistry.Icon,
    Input: shadcnRegistry.Input,
    Select: shadcnRegistry.Select,
    Checkbox: shadcnRegistry.Checkbox,
    Table: shadcnRegistry.Table,
    Chart: shadcnRegistry.Chart,
};
