import React from 'react';
import { ComponentRegistry } from '@json-render/react';
import { ShimmerButton } from '@/components/magicui/shimmer-button';
import { MagicCard } from '@/components/magicui/magic-card';
import { GradientText } from '@/components/magicui/gradient-text';
import { ShineBorder } from '@/components/magicui/shine-border';

// Use shadcn base components for non-magic ones
import { shadcnRegistry } from '../shadcn';

// Magic Button - Shimmer effect
const Button = ({ element, onAction }: any) => {
    const { children, label, action, disabled, style } = element.props;

    return (
        <ShimmerButton
            onClick={() => action && onAction?.({ name: action as string })}
            disabled={disabled as boolean}
            className={style as string}
        >
            {(label || children) as React.ReactNode}
        </ShimmerButton>
    );
};

// Magic Text - Gradient animation
const Text = ({ element }: any) => {
    const { variant = 'p', children, style } = element.props;

    if (variant === 'h1' || variant === 'h2') {
        return (
            <GradientText
                className={variant === 'h1' ? 'text-4xl' : 'text-3xl'}
            >
                {children as React.ReactNode}
            </GradientText>
        );
    }

    // Fall back to plain text for normal variants
    return <p style={style as React.CSSProperties}>{children as React.ReactNode}</p>;
};

// Magic Card - Spotlight effect
const Card = ({ element, children }: any) => {
    const { title, description } = element.props;

    return (
        <MagicCard>
            {Boolean(title) && <h3 className="text-lg font-semibold mb-2">{title as string}</h3>}
            {Boolean(description) && <p className="text-gray-500 mb-4">{description as string}</p>}
            {children}
        </MagicCard>
    );
};

// Magic Alert - Shine border effect
const Alert = ({ element }: any) => {
    const { title, description } = element.props;

    return (
        <ShineBorder borderRadius={12}>
            <div className="p-4">
                {Boolean(title) && <h4 className="font-semibold">{title as string}</h4>}
                {Boolean(description) && <p className="text-sm text-gray-600">{description as string}</p>}
            </div>
        </ShineBorder>
    );
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

const Grid = ({ element, children }: any) => {
    const { columns = 2, gap = 4, style } = element.props;
    return (
        <div
            className="grid"
            style={{
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gap: `${gap * 4}px`,
                ...style as React.CSSProperties
            }}
        >
            {children}
        </div>
    );
};

const Container = ({ element, children }: any) => {
    const { maxWidth = '1200px', style } = element.props;
    return (
        <div style={{ maxWidth, margin: '0 auto', padding: '0 16px', ...style as React.CSSProperties }}>
            {children}
        </div>
    );
};

// Animation components
import { AnimatedText } from './components/animated-text';
import { BlurFade } from './components/blur-fade';
import { TypingAnimation } from './components/typing-animation';
import { PulseCard } from './components/pulse-card';
import { BorderBeam } from './components/border-beam';
import { Meteors } from './components/meteors';
import { RetroGrid } from './components/retro-grid';
import { Ripple } from './components/ripple';

export const magicuiRegistry: ComponentRegistry = {
    // Magic-enhanced components
    Button,
    Text,
    Card,
    Alert,
    Stack,
    Grid,
    Container,

    // Animation components
    AnimatedText,
    BlurFade,
    TypingAnimation,
    PulseCard,
    BorderBeam,
    Meteors,
    RetroGrid,
    Ripple,

    // Fall back to shadcn for the rest
    Badge: shadcnRegistry.Badge,
    Avatar: shadcnRegistry.Avatar,
    Icon: shadcnRegistry.Icon,
    Input: shadcnRegistry.Input,
    Select: shadcnRegistry.Select,
    Checkbox: shadcnRegistry.Checkbox,
    Switch: shadcnRegistry.Switch,
    Table: shadcnRegistry.Table,
    Chart: shadcnRegistry.Chart,
    Metric: shadcnRegistry.Metric,
    Tabs: shadcnRegistry.Tabs,
};
