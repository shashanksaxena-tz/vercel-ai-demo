'use client';

/**
 * Aceternity UI Registry
 * Dark-mode components with stunning animations powered by framer-motion.
 * Maps json-render catalog components to Aceternity-style implementations.
 */

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ComponentRegistry, ComponentRenderProps } from '@json-render/react';
import type { RegistryDefinition, RegistryTheme } from '@/lib/registry';

// Aceternity Theme - Deep dark mode with purple/violet accents
const aceternityTheme: RegistryTheme = {
  name: 'Aceternity UI',
  colors: {
    primary: 'hsl(270 70% 60%)',
    secondary: 'hsl(220 30% 20%)',
    accent: 'hsl(270 70% 70%)',
    background: 'hsl(220 20% 5%)',
    foreground: 'hsl(0 0% 95%)',
    muted: 'hsl(220 20% 15%)',
    success: 'hsl(142 76% 36%)',
    warning: 'hsl(45 93% 47%)',
    error: 'hsl(0 84% 60%)',
    info: 'hsl(217 91% 60%)',
  },
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
    mono: 'JetBrains Mono, monospace',
  },
  borderRadius: '0.75rem',
  shadows: true,
};

// ─── Aceternity-Specific Animated Components ────────────────────────────

/**
 * BackgroundBeams — SVG-based animated beam lines in background
 */
const BackgroundBeams: React.FC<ComponentRenderProps> = ({ element, children }) => {
  const { className = '' } = element.props as { className?: string };
  const beamCount = 6;
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {Array.from({ length: beamCount }).map((_, i) => (
          <motion.line
            key={i}
            x1={`${(i / beamCount) * 100}%`}
            y1="0%"
            x2={`${((i + 2) / beamCount) * 100}%`}
            y2="100%"
            stroke="url(#beam-gradient)"
            strokeWidth="0.5"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: [0, 0.4, 0], pathLength: [0, 1, 0] }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: 'easeInOut',
            }}
          />
        ))}
        <defs>
          <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(270 70% 60%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(270 70% 70%)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="hsl(270 70% 60%)" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

/**
 * SparklesCore — Random sparkle dots with scale/opacity animation
 */
const SparklesCore: React.FC<ComponentRenderProps> = ({ element, children }) => {
  const { className = '', particleCount = 20 } = element.props as { className?: string; particleCount?: number };
  const sparkles = React.useMemo(
    () =>
      Array.from({ length: particleCount }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 3,
        duration: Math.random() * 2 + 1.5,
      })),
    [particleCount]
  );
  return (
    <div className={`relative ${className}`}>
      {sparkles.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full bg-purple-400"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

/**
 * TextGenerateEffect — Text that appears word by word with staggered animation
 */
const TextGenerateEffect: React.FC<ComponentRenderProps> = ({ element }) => {
  const { words = '', className = '' } = element.props as { words?: string; className?: string };
  const wordArray = words.split(' ');
  return (
    <p className={`text-lg font-medium text-gray-100 ${className}`}>
      {wordArray.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-1"
          initial={{ opacity: 0, filter: 'blur(4px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
};

/**
 * HeroHighlight — Container with animated gradient highlight effect
 */
const HeroHighlight: React.FC<ComponentRenderProps> = ({ element, children }) => {
  const { className = '' } = element.props as { className?: string };
  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl p-8 ${className}`}
      style={{
        background: 'linear-gradient(135deg, hsl(220 20% 8%) 0%, hsl(270 30% 12%) 50%, hsl(220 20% 8%) 100%)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 50% 50%, hsl(270 70% 60% / 0.3), transparent 60%)',
        }}
        animate={{
          background: [
            'radial-gradient(circle at 30% 30%, hsl(270 70% 60% / 0.3), transparent 60%)',
            'radial-gradient(circle at 70% 70%, hsl(270 70% 60% / 0.3), transparent 60%)',
            'radial-gradient(circle at 30% 30%, hsl(270 70% 60% / 0.3), transparent 60%)',
          ],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

/**
 * BackgroundGradient — Animated multi-color gradient background
 */
const BackgroundGradient: React.FC<ComponentRenderProps> = ({ element, children }) => {
  const { className = '' } = element.props as { className?: string };
  return (
    <motion.div
      className={`relative rounded-xl p-[2px] overflow-hidden ${className}`}
      style={{
        background: 'linear-gradient(135deg, hsl(270 70% 60%), hsl(200 80% 50%), hsl(330 70% 50%), hsl(270 70% 60%))',
        backgroundSize: '300% 300%',
      }}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
    >
      <div className="rounded-xl bg-[hsl(220,20%,5%)] p-4">{children}</div>
    </motion.div>
  );
};

/**
 * CardHoverEffect — Card with 3D rotateX/rotateY on mouse move
 */
const CardHoverEffect: React.FC<ComponentRenderProps> = ({ element, children }) => {
  const { className = '' } = element.props as { className?: string };
  const ref = React.useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = React.useState(0);
  const [rotateY, setRotateY] = React.useState(0);

  const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotateX(-y * 20);
    setRotateY(x * 20);
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    setRotateX(0);
    setRotateY(0);
  }, []);

  return (
    <div
      ref={ref}
      className={`${className}`}
      style={{ perspective: '1000px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="rounded-xl border border-white/10 bg-[hsl(220,20%,8%)] p-6 transition-shadow hover:shadow-2xl hover:shadow-purple-500/10"
        animate={{ rotateX, rotateY }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </motion.div>
    </div>
  );
};

/**
 * FloatingDock — Horizontal dock with items that scale on hover
 */
const FloatingDock: React.FC<ComponentRenderProps> = ({ element }) => {
  const { items = [], className = '' } = element.props as {
    items?: { label: string; icon?: string; href?: string }[];
    className?: string;
  };
  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 ${className}`}>
      <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-[hsl(220,20%,8%)/0.9] backdrop-blur-md px-4 py-3">
        {items.map((item, i) => (
          <motion.a
            key={i}
            href={item.href || '#'}
            className="flex flex-col items-center gap-1 px-2"
            whileHover={{ scale: 1.4, y: -8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <span className="text-xl">{item.icon || '[ ]'}</span>
            <span className="text-[10px] text-gray-400">{item.label}</span>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

/**
 * MovingBorder — Element with animated border using conic-gradient rotation
 */
const MovingBorder: React.FC<ComponentRenderProps> = ({ element, children }) => {
  const { className = '', duration = 3 } = element.props as { className?: string; duration?: number };
  return (
    <div className={`relative rounded-xl p-[2px] overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'conic-gradient(from 0deg, transparent, hsl(270 70% 60%), transparent, transparent)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      />
      <div className="relative rounded-xl bg-[hsl(220,20%,5%)] p-4 z-10">{children}</div>
    </div>
  );
};

/**
 * GlareCard — Card with glare/shine effect on hover
 */
const GlareCard: React.FC<ComponentRenderProps> = ({ element, children }) => {
  const { className = '' } = element.props as { className?: string };
  const ref = React.useRef<HTMLDivElement>(null);
  const [glarePos, setGlarePos] = React.useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setGlarePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-xl border border-white/10 bg-[hsl(220,20%,8%)] p-6 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.15), transparent 50%)`,
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

/**
 * InfiniteMovingCards — Horizontally scrolling card row, seamless loop
 */
const InfiniteMovingCards: React.FC<ComponentRenderProps> = ({ element }) => {
  const {
    items = [],
    speed = 30,
    direction = 'left',
  } = element.props as {
    items?: { title?: string; content?: string; author?: string }[];
    speed?: number;
    direction?: 'left' | 'right';
  };
  const duplicated = [...items, ...items];
  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex gap-4 w-max"
        animate={{ x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {duplicated.map((item, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-72 rounded-xl border border-white/10 bg-[hsl(220,20%,8%)] p-6"
          >
            {item.title && <h4 className="font-semibold text-gray-100 mb-2">{item.title}</h4>}
            {item.content && <p className="text-sm text-gray-400">{item.content}</p>}
            {item.author && <p className="mt-3 text-xs text-purple-400">-- {item.author}</p>}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

/**
 * LampEffect — Spotlight/lamp cone shape with gradient
 */
const LampEffect: React.FC<ComponentRenderProps> = ({ element, children }) => {
  const { className = '' } = element.props as { className?: string };
  return (
    <div className={`relative flex flex-col items-center overflow-hidden ${className}`}>
      <motion.div
        className="absolute top-0 w-[40rem] h-[20rem]"
        style={{
          background: 'conic-gradient(from 270deg at 50% 0%, hsl(270 70% 60% / 0.4), transparent 60%)',
          clipPath: 'polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)',
        }}
        initial={{ opacity: 0, scaleX: 0.5 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 rounded-full bg-purple-500 blur-md" />
      <div className="relative z-10 mt-24">{children}</div>
    </div>
  );
};

/**
 * Spotlight — Radial gradient spotlight that pulses
 */
const Spotlight: React.FC<ComponentRenderProps> = ({ element, children }) => {
  const { className = '', fill = 'hsl(270 70% 60%)' } = element.props as { className?: string; fill?: string };
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${fill}33, transparent 60%)`,
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

/**
 * WavyBackground — Animated wavy SVG paths
 */
const WavyBackground: React.FC<ComponentRenderProps> = ({ element, children }) => {
  const { className = '', colors = ['hsl(270 70% 60%)', 'hsl(200 80% 50%)', 'hsl(330 70% 50%)'] } = element.props as {
    className?: string;
    colors?: string[];
  };
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <svg className="absolute bottom-0 left-0 w-full h-32 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1200 120">
        {colors.map((color, i) => (
          <motion.path
            key={i}
            d={`M0,${60 + i * 15} C300,${40 + i * 10} 600,${80 + i * 10} 900,${50 + i * 15} L1200,${70 + i * 10} L1200,120 L0,120 Z`}
            fill={color}
            fillOpacity={0.15}
            animate={{
              d: [
                `M0,${60 + i * 15} C300,${40 + i * 10} 600,${80 + i * 10} 900,${50 + i * 15} L1200,${70 + i * 10} L1200,120 L0,120 Z`,
                `M0,${50 + i * 15} C300,${70 + i * 10} 600,${35 + i * 10} 900,${65 + i * 15} L1200,${45 + i * 10} L1200,120 L0,120 Z`,
                `M0,${60 + i * 15} C300,${40 + i * 10} 600,${80 + i * 10} 900,${50 + i * 15} L1200,${70 + i * 10} L1200,120 L0,120 Z`,
              ],
            }}
            transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </svg>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

/**
 * TracingBeam — Vertical line that traces scroll position
 */
const TracingBeam: React.FC<ComponentRenderProps> = ({ element, children }) => {
  const { className = '' } = element.props as { className?: string };
  return (
    <div className={`relative flex gap-6 ${className}`}>
      <div className="relative flex flex-col items-center">
        <div className="w-px h-full bg-gradient-to-b from-purple-500 via-purple-300 to-transparent" />
        <motion.div
          className="absolute top-0 w-1 rounded-full bg-purple-500"
          style={{ boxShadow: '0 0 8px hsl(270 70% 60%)' }}
          initial={{ height: 0 }}
          animate={{ height: '100%' }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
};

/**
 * ThreeDCard — Card with CSS perspective transform on hover
 */
const ThreeDCard: React.FC<ComponentRenderProps> = ({ element, children }) => {
  const { className = '' } = element.props as { className?: string };
  const ref = React.useRef<HTMLDivElement>(null);
  const [transform, setTransform] = React.useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform({ rotateX: -y * 15, rotateY: x * 15 });
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    setTransform({ rotateX: 0, rotateY: 0 });
  }, []);

  return (
    <div
      ref={ref}
      className={`group ${className}`}
      style={{ perspective: '1200px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="rounded-xl border border-white/10 bg-[hsl(220,20%,8%)] p-6 transition-shadow group-hover:shadow-xl group-hover:shadow-purple-500/10"
        animate={transform}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </motion.div>
    </div>
  );
};


// ─── Core Components (Dark-Themed) ──────────────────────────────────────

const aceternityComponents: ComponentRegistry = {
  // ── Aceternity-Specific Animated Components ──────────────────────────
  BackgroundBeams,
  SparklesCore,
  TextGenerateEffect,
  HeroHighlight,
  BackgroundGradient,
  CardHoverEffect,
  FloatingDock,
  MovingBorder,
  GlareCard,
  InfiniteMovingCards,
  LampEffect,
  Spotlight,
  WavyBackground,
  TracingBeam,
  ThreeDCard,

  // ── Layout Components ────────────────────────────────────────────────
  Container: ({ element, children }) => {
    const { maxWidth = 'xl', centered } = element.props as { maxWidth?: string; centered?: boolean };
    return (
      <div className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${
        maxWidth === 'sm' ? 'max-w-screen-sm' :
        maxWidth === 'md' ? 'max-w-screen-md' :
        maxWidth === 'lg' ? 'max-w-screen-lg' :
        maxWidth === 'xl' ? 'max-w-screen-xl' : 'max-w-full'
      } ${centered ? 'flex flex-col items-center' : ''}`}>
        {children}
      </div>
    );
  },

  Row: ({ element, children }) => {
    const { align = 'center', justify = 'start', gap = 'md', wrap, reverse } = element.props as { align?: string; justify?: string; gap?: string; wrap?: boolean; reverse?: boolean };
    return (
      <div className={`flex ${reverse ? 'flex-row-reverse' : ''} ${wrap ? 'flex-wrap' : ''} ${
        align === 'start' ? 'items-start' : align === 'end' ? 'items-end' : align === 'stretch' ? 'items-stretch' : 'items-center'
      } ${
        justify === 'center' ? 'justify-center' : justify === 'end' ? 'justify-end' : justify === 'between' ? 'justify-between' : 'justify-start'
      } ${
        gap === 'xs' ? 'gap-1' : gap === 'sm' ? 'gap-2' : gap === 'lg' ? 'gap-6' : 'gap-4'
      }`}>
        {children}
      </div>
    );
  },

  Column: ({ element, children }) => {
    const { align = 'stretch', justify = 'start', gap = 'md' } = element.props as { align?: string; justify?: string; gap?: string };
    return (
      <div className={`flex flex-col ${
        align === 'start' ? 'items-start' : align === 'center' ? 'items-center' : align === 'end' ? 'items-end' : 'items-stretch'
      } ${
        justify === 'center' ? 'justify-center' : justify === 'end' ? 'justify-end' : justify === 'between' ? 'justify-between' : 'justify-start'
      } ${
        gap === 'xs' ? 'gap-1' : gap === 'sm' ? 'gap-2' : gap === 'lg' ? 'gap-6' : 'gap-4'
      }`}>
        {children}
      </div>
    );
  },

  Grid: ({ element, children }) => {
    const { columns = 3, gap = 'md' } = element.props as { columns?: number; gap?: string };
    const responsiveColumns = columns >= 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
      columns === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1';
    return (
      <div className={`grid ${responsiveColumns} ${
        gap === 'xs' ? 'gap-1 md:gap-1.5' : gap === 'sm' ? 'gap-2 md:gap-3' : gap === 'lg' ? 'gap-4 md:gap-6' : 'gap-3 md:gap-4'
      }`}>
        {children}
      </div>
    );
  },

  Stack: ({ element, children }) => {
    const { direction = 'vertical', spacing = 'md', responsive = true } = element.props as { direction?: string; spacing?: string; responsive?: boolean };
    const flexDirection = responsive && direction === 'horizontal' ? 'flex-col md:flex-row' : direction === 'horizontal' ? 'flex-row' : 'flex-col';
    return (
      <div className={`flex ${flexDirection} ${
        spacing === 'xs' ? 'gap-1 md:gap-1.5' : spacing === 'sm' ? 'gap-2 md:gap-3' : spacing === 'lg' ? 'gap-4 md:gap-6' : 'gap-3 md:gap-4'
      }`}>
        {children}
      </div>
    );
  },

  Spacer: ({ element }) => {
    const { size = 'md', flexible } = element.props as { size?: string; flexible?: boolean };
    return <div className={flexible ? 'flex-1' : `${size === 'xs' ? 'w-1 h-1' : size === 'sm' ? 'w-2 h-2' : size === 'lg' ? 'w-6 h-6' : 'w-4 h-4'}`} />;
  },

  Divider: ({ element }) => {
    const { orientation = 'horizontal', label } = element.props as { orientation?: string; label?: string };
    if (label) {
      return (
        <div className="flex items-center">
          <div className="flex-1 h-px bg-white/10" />
          <span className="px-3 text-sm text-gray-500">{label}</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>
      );
    }
    return <div className={orientation === 'horizontal' ? 'h-px w-full bg-white/10' : 'w-px h-full bg-white/10'} />;
  },

  // ── Card Components ──────────────────────────────────────────────────
  Card: ({ element, children }) => {
    const { variant = 'elevated', padding = 'md', hoverable } = element.props as { variant?: string; padding?: string; hoverable?: boolean };
    return (
      <div className={`${
        variant === 'elevated' ? 'bg-[hsl(220,20%,8%)] shadow-lg shadow-black/30 border border-white/5' :
        variant === 'outlined' ? 'bg-[hsl(220,20%,6%)] border border-white/10' :
        'bg-[hsl(220,20%,10%)]'
      } ${
        padding === 'none' ? '' : padding === 'sm' ? 'p-4' : padding === 'lg' ? 'p-8' : 'p-5'
      } rounded-xl ${hoverable ? 'hover:shadow-xl hover:shadow-purple-500/5 hover:border-purple-500/20 transition-all cursor-pointer' : ''}`}>
        {children}
      </div>
    );
  },

  CardHeader: ({ element }) => {
    const { title, subtitle, avatar } = element.props as { title?: string; subtitle?: string; avatar?: string };
    return (
      <div className="flex items-start gap-4 p-5 pb-0">
        {avatar && <img src={avatar} alt="" className="h-12 w-12 rounded-full ring-2 ring-purple-500/20" />}
        <div className="flex-1">
          {title && <h3 className="text-lg font-semibold text-gray-100">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      </div>
    );
  },

  CardBody: ({ element, children }) => {
    const { padding = 'md' } = element.props as { padding?: string };
    return <div className={padding === 'none' ? '' : padding === 'sm' ? 'p-4' : padding === 'lg' ? 'p-8' : 'p-5'}>{children}</div>;
  },

  CardFooter: ({ element, children }) => {
    const { align = 'end' } = element.props as { align?: string };
    return (
      <div className={`flex items-center gap-3 p-5 pt-0 ${
        align === 'start' ? 'justify-start' : align === 'center' ? 'justify-center' : 'justify-end'
      }`}>
        {children}
      </div>
    );
  },

  // ── Typography ───────────────────────────────────────────────────────
  Heading: ({ element }) => {
    const { level = '2', text, color = 'default', align = 'left' } = element.props as { level?: string; text: string; color?: string; align?: string };
    const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
    const sizes: Record<string, string> = {
      '1': 'text-3xl md:text-4xl lg:text-5xl',
      '2': 'text-2xl md:text-3xl lg:text-4xl',
      '3': 'text-xl md:text-2xl lg:text-3xl',
      '4': 'text-lg md:text-xl lg:text-2xl',
      '5': 'text-base md:text-lg',
      '6': 'text-sm md:text-base',
    };
    return (
      <Tag className={`${sizes[level]} font-bold tracking-tight ${
        color === 'primary' ? 'text-purple-400' : color === 'muted' ? 'text-gray-500' : 'text-gray-100'
      } ${align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'}`}>
        {text}
      </Tag>
    );
  },

  Text: ({ element }) => {
    const { content, size = 'md', color = 'default', align = 'left' } = element.props as { content: string; size?: string; color?: string; align?: string };
    return (
      <p className={`${
        size === 'xs' ? 'text-xs' : size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base'
      } ${color === 'muted' ? 'text-gray-500' : color === 'primary' ? 'text-purple-400' : 'text-gray-300'} ${
        align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'
      }`}>
        {content}
      </p>
    );
  },

  Link: ({ element }) => {
    const { text, href, external } = element.props as { text: string; href: string; external?: boolean };
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="text-purple-400 hover:text-purple-300 hover:underline underline-offset-4 transition-colors"
      >
        {text}
      </a>
    );
  },

  // ── Buttons ──────────────────────────────────────────────────────────
  Button: ({ element }) => {
    const { label, variant = 'solid', size = 'md', fullWidth, disabled, loading } = element.props as { label: string; variant?: string; size?: string; fullWidth?: boolean; disabled?: boolean; loading?: boolean };
    return (
      <button
        disabled={disabled || loading}
        className={`inline-flex items-center justify-center gap-2 font-medium transition-all focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50 ${
          size === 'xs' ? 'px-3 py-1.5 text-xs rounded-lg' :
          size === 'sm' ? 'px-4 py-2 text-sm rounded-lg' :
          size === 'lg' ? 'px-6 py-3 text-base rounded-xl' :
          'px-5 py-2.5 text-sm rounded-lg'
        } ${fullWidth ? 'w-full' : ''} ${
          variant === 'solid' ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:from-purple-500 hover:to-violet-500 shadow-lg shadow-purple-500/20' :
          variant === 'outline' ? 'border border-purple-500/50 text-purple-400 hover:bg-purple-500/10' :
          variant === 'ghost' ? 'text-purple-400 hover:bg-purple-500/10' :
          'text-purple-400 hover:underline'
        }`}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {label}
      </button>
    );
  },

  IconButton: ({ element }) => {
    const { icon, label, variant = 'ghost', size = 'md' } = element.props as { icon: string; label: string; variant?: string; size?: string };
    return (
      <button
        aria-label={label}
        className={`inline-flex items-center justify-center rounded-lg transition-colors ${
          size === 'sm' ? 'h-8 w-8' : size === 'lg' ? 'h-12 w-12' : 'h-10 w-10'
        } ${variant === 'solid' ? 'bg-purple-600 text-white hover:bg-purple-500' : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'}`}
      >
        [{icon}]
      </button>
    );
  },

  ButtonGroup: ({ children }) => <div className="inline-flex rounded-lg border border-white/10">{children}</div>,

  // ── Form Components ──────────────────────────────────────────────────
  Input: ({ element }) => {
    const { label, placeholder, type = 'text', size = 'md', disabled, error, hint } = element.props as { label?: string; placeholder?: string; type?: string; size?: string; disabled?: boolean; error?: string; hint?: string };
    return (
      <div className="w-full space-y-2">
        {label && <label className="text-sm font-medium text-gray-300">{label}</label>}
        <input
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-4 ${
            size === 'sm' ? 'py-2 text-sm' : size === 'lg' ? 'py-3.5' : 'py-2.5'
          } bg-[hsl(220,20%,8%)] border border-white/10 text-gray-100 placeholder-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 disabled:opacity-50 ${
            error ? 'border-red-500/50 focus:ring-red-500/50' : ''
          }`}
        />
        {(hint || error) && <p className={`text-sm ${error ? 'text-red-400' : 'text-gray-500'}`}>{error || hint}</p>}
      </div>
    );
  },

  TextArea: ({ element }) => {
    const { label, placeholder, rows = 4, disabled, error } = element.props as { label?: string; placeholder?: string; rows?: number; disabled?: boolean; error?: string };
    return (
      <div className="w-full space-y-2">
        {label && <label className="text-sm font-medium text-gray-300">{label}</label>}
        <textarea
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
          className={`w-full px-4 py-2.5 bg-[hsl(220,20%,8%)] border border-white/10 text-gray-100 placeholder-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 disabled:opacity-50 ${
            error ? 'border-red-500/50' : ''
          }`}
        />
      </div>
    );
  },

  Select: ({ element }) => {
    const { label, placeholder, options = [], disabled } = element.props as { label?: string; placeholder?: string; options?: { value: string; label: string }[]; disabled?: boolean };
    return (
      <div className="w-full space-y-2">
        {label && <label className="text-sm font-medium text-gray-300">{label}</label>}
        <select
          disabled={disabled}
          className="w-full px-4 py-2.5 bg-[hsl(220,20%,8%)] border border-white/10 text-gray-100 rounded-lg focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    );
  },

  Checkbox: ({ element }) => {
    const { label, checked, disabled } = element.props as { label?: string; checked?: boolean; disabled?: boolean };
    return (
      <label className="inline-flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          className="w-4 h-4 text-purple-600 bg-[hsl(220,20%,8%)] border-white/20 rounded focus:ring-purple-500/50 focus:ring-2"
          readOnly
        />
        <span className="text-sm text-gray-300">{label}</span>
      </label>
    );
  },

  Radio: ({ element }) => {
    const { label, value, disabled } = element.props as { label?: string; value?: string; disabled?: boolean };
    return (
      <label className="inline-flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          value={value}
          disabled={disabled}
          className="w-4 h-4 text-purple-600 bg-[hsl(220,20%,8%)] border-white/20 focus:ring-purple-500/50 focus:ring-2"
          readOnly
        />
        <span className="text-sm text-gray-300">{label}</span>
      </label>
    );
  },

  RadioGroup: ({ element, children }) => {
    const { label, orientation = 'vertical' } = element.props as { label?: string; orientation?: string };
    return (
      <fieldset className="space-y-2">
        {label && <legend className="text-sm font-medium text-gray-300">{label}</legend>}
        <div className={orientation === 'horizontal' ? 'flex gap-4' : 'space-y-2'}>{children}</div>
      </fieldset>
    );
  },

  Switch: ({ element }) => {
    const { label, checked, disabled } = element.props as { label?: string; checked?: boolean; disabled?: boolean };
    return (
      <label className="inline-flex items-center gap-3 cursor-pointer">
        <span
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            checked ? 'bg-purple-600' : 'bg-white/10'
          } ${disabled ? 'opacity-50' : ''}`}
        >
          <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0.5'
          }`} />
        </span>
        {label && <span className="text-sm text-gray-300">{label}</span>}
      </label>
    );
  },

  Slider: ({ element }) => {
    const { label, min = 0, max = 100 } = element.props as { label?: string; min?: number; max?: number };
    return (
      <div className="w-full space-y-2">
        {label && <label className="text-sm font-medium text-gray-300">{label}</label>}
        <input type="range" min={min} max={max} className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-600" />
      </div>
    );
  },

  // ── Data Display ─────────────────────────────────────────────────────
  Badge: ({ element }) => {
    const { text, variant = 'solid', color = 'default', size = 'md' } = element.props as { text: string; variant?: string; color?: string; size?: string };
    return (
      <span className={`inline-flex items-center font-medium rounded-full ${
        size === 'xs' ? 'px-2 py-0.5 text-xs' : size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm'
      } ${
        variant === 'solid' ? (
          color === 'success' ? 'bg-green-500/20 text-green-400' :
          color === 'error' ? 'bg-red-500/20 text-red-400' :
          color === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
          'bg-purple-500/20 text-purple-400'
        ) : (
          color === 'success' ? 'border border-green-500/50 text-green-400' :
          color === 'error' ? 'border border-red-500/50 text-red-400' :
          'border border-purple-500/50 text-purple-400'
        )
      }`}>
        {text}
      </span>
    );
  },

  Avatar: ({ element }) => {
    const { src, name, size = 'md', status } = element.props as { src?: string; name?: string; size?: string; status?: string };
    const initials = name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?';
    const sizeClass = size === 'xs' ? 'h-6 w-6 text-xs' : size === 'sm' ? 'h-8 w-8 text-sm' : size === 'lg' ? 'h-14 w-14 text-lg' : 'h-10 w-10';
    return (
      <div className="relative inline-flex">
        {src ? (
          <img src={src} alt={name || 'Avatar'} className={`${sizeClass} rounded-full object-cover ring-2 ring-purple-500/20`} />
        ) : (
          <div className={`${sizeClass} rounded-full bg-purple-500/20 flex items-center justify-center font-medium text-purple-300`}>
            {initials}
          </div>
        )}
        {status && (
          <span className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-[hsl(220,20%,5%)] ${
            status === 'online' ? 'bg-green-400' : status === 'busy' ? 'bg-red-400' : 'bg-gray-500'
          }`} />
        )}
      </div>
    );
  },

  AvatarGroup: ({ element, children }) => {
    const { max = 4 } = element.props as { max?: number };
    const items = React.Children.toArray(children);
    const visible = items.slice(0, max);
    const remaining = items.length - max;
    return (
      <div className="flex -space-x-3">
        {visible.map((child, i) => <div key={i} className="ring-2 ring-[hsl(220,20%,5%)] rounded-full">{child}</div>)}
        {remaining > 0 && (
          <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center text-sm font-medium text-purple-300 ring-2 ring-[hsl(220,20%,5%)]">
            +{remaining}
          </div>
        )}
      </div>
    );
  },

  Icon: ({ element }) => {
    const { name, size = 'md' } = element.props as { name: string; size?: string };
    return (
      <span className={`inline-flex text-gray-400 ${size === 'xs' ? 'h-3 w-3' : size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'}`}>
        [{name}]
      </span>
    );
  },

  Image: ({ element }) => {
    const { src, alt, rounded = 'md', width, height } = element.props as { src: string; alt: string; rounded?: string; width?: number; height?: number };
    return (
      <img
        src={src}
        alt={alt}
        style={{ width, height }}
        className={`object-cover ${rounded === 'none' ? '' : rounded === 'full' ? 'rounded-full' : 'rounded-lg'}`}
      />
    );
  },

  List: ({ element, children }) => {
    const { variant = 'unordered' } = element.props as { variant?: string };
    const Tag = variant === 'ordered' ? 'ol' : 'ul';
    return <Tag className={`${variant === 'ordered' ? 'list-decimal' : 'list-disc'} pl-5 space-y-1 text-gray-300`}>{children}</Tag>;
  },

  ListItem: ({ children }) => <li className="text-gray-300">{children}</li>,

  Table: ({ element, children }) => {
    const { variant = 'simple' } = element.props as { variant?: string };
    return (
      <div className="relative overflow-x-auto rounded-lg border border-white/10">
        <table className={`w-full text-sm text-left text-gray-300 ${variant === 'striped' ? '[&_tbody_tr:nth-child(odd)]:bg-white/[0.02]' : ''}`}>
          {children}
        </table>
      </div>
    );
  },

  TableHeader: ({ children }) => <thead className="text-xs text-gray-400 uppercase bg-white/5">{children}</thead>,
  TableBody: ({ children }) => <tbody>{children}</tbody>,
  TableRow: ({ element, children }) => {
    const { hoverable } = element.props as { hoverable?: boolean };
    return <tr className={`border-b border-white/5 ${hoverable ? 'hover:bg-white/5' : ''}`}>{children}</tr>;
  },
  TableCell: ({ element, children }) => {
    const { header, align = 'left' } = element.props as { header?: boolean; align?: string };
    const Tag = header ? 'th' : 'td';
    return <Tag className={`px-6 py-4 ${align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : ''} ${header ? 'font-medium text-gray-200' : ''}`}>{children}</Tag>;
  },

  Metric: ({ element }) => {
    const { label, value, change, changeType = 'neutral' } = element.props as { label: string; value: string; change?: string; changeType?: string };
    return (
      <div className="space-y-1">
        <p className="text-sm text-gray-500">{label}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-gray-100">{value}</span>
          {change && (
            <span className={`text-sm font-medium ${changeType === 'positive' ? 'text-green-400' : changeType === 'negative' ? 'text-red-400' : 'text-gray-500'}`}>
              {changeType === 'positive' ? '\u2191' : changeType === 'negative' ? '\u2193' : ''}{change}
            </span>
          )}
        </div>
      </div>
    );
  },

  Progress: ({ element }) => {
    const { value = 0, max = 100, size = 'md', color = 'primary', showValue } = element.props as { value?: number; max?: number; size?: string; color?: string; showValue?: boolean };
    const pct = Math.min(100, (value / max) * 100);
    return (
      <div className="w-full">
        <div className={`w-full bg-white/10 rounded-full ${size === 'sm' ? 'h-2' : size === 'lg' ? 'h-4' : 'h-2.5'}`}>
          <motion.div
            className={`rounded-full ${color === 'success' ? 'bg-green-500' : color === 'error' ? 'bg-red-500' : 'bg-gradient-to-r from-purple-600 to-violet-500'}`}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ height: '100%' }}
          />
        </div>
        {showValue && <p className="mt-1 text-sm text-gray-500">{Math.round(pct)}%</p>}
      </div>
    );
  },

  // ── Feedback ─────────────────────────────────────────────────────────
  Alert: ({ element }) => {
    const { title, description, status = 'info', closable } = element.props as { title?: string; description: string; status?: string; closable?: boolean };
    return (
      <div className={`p-4 rounded-lg border ${
        status === 'success' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
        status === 'error' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
        status === 'warning' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
        'bg-blue-500/10 text-blue-400 border-blue-500/20'
      }`}>
        {title && <h5 className="font-medium mb-1">{title}</h5>}
        <p className="text-sm">{description}</p>
        {closable && <button className="float-right font-bold opacity-60 hover:opacity-100">x</button>}
      </div>
    );
  },

  Toast: ({ element }) => {
    const { title, description, status = 'info' } = element.props as { title: string; description?: string; status?: string };
    return (
      <motion.div
        className={`p-4 rounded-lg shadow-lg border ${
          status === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
          status === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
          'bg-[hsl(220,20%,10%)] border-white/10 text-gray-200'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="font-medium">{title}</p>
        {description && <p className="text-sm opacity-80">{description}</p>}
      </motion.div>
    );
  },

  Skeleton: ({ element }) => {
    const { variant = 'text', width, height } = element.props as { variant?: string; width?: number; height?: number };
    return (
      <motion.div
        className={`bg-white/5 ${variant === 'circular' ? 'rounded-full' : 'rounded-lg'}`}
        style={{ width, height: height || (variant === 'text' ? '1rem' : undefined) }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    );
  },

  Spinner: ({ element }) => {
    const { size = 'md', label } = element.props as { size?: string; label?: string };
    return (
      <div className="inline-flex items-center gap-2">
        <svg
          className={`animate-spin text-purple-500 ${size === 'sm' ? 'h-5 w-5' : size === 'lg' ? 'h-10 w-10' : 'h-8 w-8'}`}
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        {label && <span className="text-sm text-gray-400">{label}</span>}
      </div>
    );
  },

  EmptyState: ({ element }) => {
    const { title, description, actionLabel } = element.props as { title: string; description?: string; actionLabel?: string };
    return (
      <div className="flex flex-col items-center py-12 text-center">
        <h3 className="text-lg font-semibold text-gray-200">{title}</h3>
        {description && <p className="mt-2 text-sm text-gray-500 max-w-sm">{description}</p>}
        {actionLabel && (
          <button className="mt-4 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-lg text-sm font-medium hover:from-purple-500 hover:to-violet-500 shadow-lg shadow-purple-500/20">
            {actionLabel}
          </button>
        )}
      </div>
    );
  },

  // ── Navigation ───────────────────────────────────────────────────────
  Tabs: ({ element, children }) => {
    const { defaultValue } = element.props as { defaultValue?: string };
    return <div className="w-full" data-default-value={defaultValue}>{children}</div>;
  },

  TabList: ({ children }) => <div className="inline-flex border-b border-white/10">{children}</div>,

  Tab: ({ element }) => {
    const { value, label, disabled } = element.props as { value: string; label: string; disabled?: boolean };
    return (
      <button
        data-value={value}
        disabled={disabled}
        className="px-4 py-3 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:text-purple-400 hover:border-purple-400 disabled:opacity-50 transition-colors"
      >
        {label}
      </button>
    );
  },

  TabPanel: ({ element, children }) => {
    const { value } = element.props as { value: string };
    return <div data-value={value} className="mt-4">{children}</div>;
  },

  Breadcrumb: ({ element, children }) => {
    const { separator = '/' } = element.props as { separator?: string };
    const items = React.Children.toArray(children);
    return (
      <nav className="flex items-center text-sm">
        {items.map((item, i) => (
          <React.Fragment key={i}>
            {item}
            {i < items.length - 1 && <span className="mx-2 text-gray-600">{separator}</span>}
          </React.Fragment>
        ))}
      </nav>
    );
  },

  BreadcrumbItem: ({ element }) => {
    const { label, href, current } = element.props as { label: string; href?: string; current?: boolean };
    return current ? (
      <span className="font-medium text-gray-200">{label}</span>
    ) : href ? (
      <a href={href} className="text-gray-500 hover:text-purple-400 transition-colors">{label}</a>
    ) : (
      <span className="text-gray-500">{label}</span>
    );
  },

  Pagination: ({ element }) => {
    const { totalPages, currentPage = 1 } = element.props as { totalPages: number; currentPage?: number };
    return (
      <nav className="flex items-center gap-1">
        <button className="px-3 py-2 rounded-lg border border-white/10 text-gray-400 hover:bg-white/5 disabled:opacity-50" disabled={currentPage === 1}>Prev</button>
        {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => (
          <button
            key={i}
            className={`px-3 py-2 rounded-lg ${
              currentPage === i + 1
                ? 'bg-purple-600 text-white'
                : 'border border-white/10 text-gray-400 hover:bg-white/5'
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button className="px-3 py-2 rounded-lg border border-white/10 text-gray-400 hover:bg-white/5 disabled:opacity-50" disabled={currentPage === totalPages}>Next</button>
      </nav>
    );
  },

  NavMenu: ({ element, children }) => {
    const { orientation = 'horizontal' } = element.props as { orientation?: string };
    return <nav className={`flex gap-2 ${orientation === 'vertical' ? 'flex-col' : 'items-center'}`}>{children}</nav>;
  },

  NavItem: ({ element }) => {
    const { label, href = '#', active, badge } = element.props as { label: string; href?: string; active?: boolean; badge?: string };
    return (
      <a
        href={href}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          active ? 'bg-purple-500/20 text-purple-400' : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
        }`}
      >
        {label}
        {badge && <span className="ml-2 px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 text-xs">{badge}</span>}
      </a>
    );
  },

  // ── Overlays ─────────────────────────────────────────────────────────
  Modal: ({ element, children }) => {
    const { title } = element.props as { title?: string };
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
        <motion.div
          className="bg-[hsl(220,20%,8%)] border border-white/10 rounded-xl shadow-2xl shadow-purple-500/10 max-w-lg w-full p-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {title && <h2 className="text-lg font-semibold text-gray-100 mb-4">{title}</h2>}
          {children}
        </motion.div>
      </div>
    );
  },

  Drawer: ({ element, children }) => {
    const { title, placement = 'right' } = element.props as { title?: string; placement?: string };
    return (
      <motion.div
        className={`fixed inset-y-0 ${placement === 'left' ? 'left-0' : 'right-0'} z-50 w-80 bg-[hsl(220,20%,6%)] border-l border-white/10 shadow-2xl p-6`}
        initial={{ x: placement === 'left' ? -320 : 320 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        {title && <h2 className="text-lg font-semibold text-gray-100 mb-4">{title}</h2>}
        {children}
      </motion.div>
    );
  },

  Tooltip: ({ element, children }) => {
    const { content } = element.props as { content: string };
    return (
      <span className="relative group">
        {children}
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-[hsl(220,20%,15%)] border border-white/10 text-gray-200 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {content}
        </span>
      </span>
    );
  },

  Popover: ({ children }) => <div className="relative">{children}</div>,

  Dropdown: ({ element, children }) => {
    const { trigger } = element.props as { trigger: string };
    return (
      <div className="relative group">
        <button className="px-4 py-2 text-gray-300">{trigger}</button>
        <div className="absolute z-50 mt-1 bg-[hsl(220,20%,8%)] border border-white/10 rounded-lg shadow-xl hidden group-hover:block min-w-[160px]">
          {children}
        </div>
      </div>
    );
  },

  DropdownItem: ({ element }) => {
    const { label, disabled, destructive } = element.props as { label: string; disabled?: boolean; destructive?: boolean };
    return (
      <button
        disabled={disabled}
        className={`w-full px-4 py-2 text-sm text-left hover:bg-white/5 transition-colors ${
          destructive ? 'text-red-400' : 'text-gray-300'
        } ${disabled ? 'opacity-50' : ''}`}
      >
        {label}
      </button>
    );
  },

  // ── Accordion & Collapsible ──────────────────────────────────────────
  Accordion: ({ children }) => <div className="divide-y divide-white/5 rounded-xl border border-white/10">{children}</div>,

  AccordionItem: ({ element, children }) => {
    const { title } = element.props as { title: string };
    const [isOpen, setIsOpen] = React.useState(false);
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between px-5 py-4 text-left font-medium text-gray-200 hover:bg-white/5 transition-colors"
        >
          {title}
          <motion.svg
            className="h-4 w-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-4 text-sm text-gray-400">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  },

  Collapsible: ({ element, children }) => {
    const { title, defaultOpen = false } = element.props as { title: string; defaultOpen?: boolean };
    const [isOpen, setIsOpen] = React.useState(defaultOpen);
    return (
      <div className="rounded-xl border border-white/10">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between px-5 py-4 font-medium text-gray-200 hover:bg-white/5 transition-colors"
        >
          {title}
          <motion.svg
            className="h-4 w-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-4">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  },

  // ── Specialized Components ───────────────────────────────────────────
  Hero: ({ element }) => {
    const { title, subtitle, description, primaryAction, secondaryAction, image, align = 'center' } = element.props as {
      title?: string;
      subtitle?: string;
      description?: string;
      primaryAction?: { label: string; href?: string };
      secondaryAction?: { label: string; href?: string };
      image?: string;
      align?: 'left' | 'center' | 'right';
    };
    const alignClass = align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center';
    const justifyClass = align === 'left' ? 'justify-start' : align === 'right' ? 'justify-end' : 'justify-center';
    return (
      <div className={`py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8 ${alignClass}`}>
        <motion.div
          className="max-w-3xl mx-auto space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {subtitle && <p className="text-sm text-purple-400 uppercase tracking-widest">{subtitle}</p>}
          {title && (
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-100 bg-clip-text">
              {title}
            </h1>
          )}
          {description && <p className="text-lg text-gray-400">{description}</p>}
          <div className={`flex flex-wrap gap-4 ${justifyClass}`}>
            {primaryAction && (
              <a
                href={primaryAction.href}
                className="px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-purple-600 to-violet-600 rounded-lg hover:from-purple-500 hover:to-violet-500 shadow-lg shadow-purple-500/20 transition-all"
              >
                {primaryAction.label}
              </a>
            )}
            {secondaryAction && (
              <a
                href={secondaryAction.href}
                className="px-6 py-3 text-base font-medium text-gray-300 border border-white/10 rounded-lg hover:bg-white/5 transition-all"
              >
                {secondaryAction.label}
              </a>
            )}
          </div>
          {image && (
            <div className="mt-8">
              <img
                src={image}
                alt={title || 'Hero image'}
                className="w-full max-w-2xl mx-auto rounded-lg shadow-2xl shadow-purple-500/10 border border-white/5"
              />
            </div>
          )}
        </motion.div>
      </div>
    );
  },

  Chart: ({ element }) => {
    const { type, height = 200 } = element.props as { type: string; height?: number };
    return (
      <div className="w-full bg-[hsl(220,20%,8%)] border border-white/10 rounded-xl flex items-center justify-center" style={{ height }}>
        <span className="text-gray-500">Chart: {type}</span>
      </div>
    );
  },

  Calendar: () => (
    <div className="p-4 border border-white/10 rounded-xl bg-[hsl(220,20%,8%)] text-gray-400">Calendar</div>
  ),

  DatePicker: ({ element }) => {
    const { label, placeholder } = element.props as { label?: string; placeholder?: string };
    return (
      <div className="space-y-2">
        {label && <label className="text-sm font-medium text-gray-300">{label}</label>}
        <input
          type="date"
          placeholder={placeholder}
          className="w-full px-4 py-2.5 bg-[hsl(220,20%,8%)] border border-white/10 text-gray-100 rounded-lg focus:ring-2 focus:ring-purple-500/50"
        />
      </div>
    );
  },

  FileUpload: ({ element }) => {
    const { label, accept } = element.props as { label?: string; accept?: string };
    return (
      <div className="space-y-2">
        {label && <label className="text-sm font-medium text-gray-300">{label}</label>}
        <input
          type="file"
          accept={accept}
          className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white hover:file:bg-purple-500"
        />
      </div>
    );
  },

  Rating: ({ element }) => {
    const { max = 5, value = 0, readonly } = element.props as { max?: number; value?: number; readonly?: boolean };
    return (
      <div className="flex gap-1">
        {Array.from({ length: max }).map((_, i) => (
          <button key={i} disabled={readonly} className={`text-xl transition-colors ${i < value ? 'text-purple-400' : 'text-gray-700'}`}>
            {'\u2605'}
          </button>
        ))}
      </div>
    );
  },

  TagInput: ({ element }) => {
    const { label, placeholder } = element.props as { label?: string; placeholder?: string };
    return (
      <div className="space-y-2">
        {label && <label className="text-sm font-medium text-gray-300">{label}</label>}
        <div className="flex flex-wrap gap-1 p-2 border border-white/10 bg-[hsl(220,20%,8%)] rounded-lg min-h-[44px]">
          <input placeholder={placeholder} className="flex-1 min-w-[100px] outline-none bg-transparent text-gray-100 placeholder-gray-600" />
        </div>
      </div>
    );
  },

  ColorPicker: ({ element }) => {
    const { label } = element.props as { label?: string };
    return (
      <div className="space-y-2">
        {label && <label className="text-sm font-medium text-gray-300">{label}</label>}
        <input type="color" className="h-10 w-20 rounded-lg cursor-pointer bg-transparent" />
      </div>
    );
  },

  Timeline: ({ element, children }) => {
    const { orientation = 'vertical' } = element.props as { orientation?: string };
    return <div className={`relative ${orientation === 'horizontal' ? 'flex' : 'space-y-4'}`}>{children}</div>;
  },

  TimelineItem: ({ element }) => {
    const { title, description, time, status = 'upcoming' } = element.props as { title: string; description?: string; time?: string; status?: string };
    return (
      <div className="relative flex gap-4">
        <div className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full ${
          status === 'completed' ? 'bg-green-500 text-white' :
          status === 'current' ? 'bg-purple-600 text-white ring-4 ring-purple-500/20' :
          'bg-white/10 text-gray-500'
        }`}>
          <span className="h-2 w-2 rounded-full bg-current" />
        </div>
        <div className="flex-1 pb-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-200">{title}</h4>
            {time && <span className="text-xs text-gray-500">{time}</span>}
          </div>
          {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
        </div>
      </div>
    );
  },

  Stepper: ({ element, children }) => {
    const { currentStep = 0, orientation = 'horizontal' } = element.props as { currentStep?: number; orientation?: string };
    const steps = React.Children.toArray(children);
    return (
      <div className={`flex ${orientation === 'horizontal' ? 'items-center' : 'flex-col'}`}>
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            {React.isValidElement(step) && React.cloneElement(step as React.ReactElement<{ stepIndex: number; currentStep: number }>, { stepIndex: i, currentStep })}
            {i < steps.length - 1 && <div className={`bg-white/10 ${orientation === 'horizontal' ? 'h-0.5 flex-1 mx-2' : 'w-0.5 h-8 ml-4 my-1'}`} />}
          </React.Fragment>
        ))}
      </div>
    );
  },

  Step: ({ element }) => {
    const { title, stepIndex = 0, currentStep = 0 } = element.props as { title: string; stepIndex?: number; currentStep?: number };
    const isCompleted = stepIndex < currentStep;
    const isCurrent = stepIndex === currentStep;
    return (
      <div className="flex items-center gap-3">
        <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
          isCompleted ? 'bg-purple-600 text-white' :
          isCurrent ? 'bg-purple-600 text-white ring-4 ring-purple-500/20' :
          'bg-white/10 text-gray-500'
        }`}>
          {isCompleted ? '\u2713' : stepIndex + 1}
        </div>
        <p className={`text-sm font-medium ${isCurrent ? 'text-gray-200' : 'text-gray-500'}`}>{title}</p>
      </div>
    );
  },

  Code: ({ element }) => {
    const { code, showLineNumbers } = element.props as { code: string; showLineNumbers?: boolean };
    return (
      <pre className="overflow-x-auto rounded-xl bg-[hsl(220,20%,6%)] border border-white/5 p-4 text-sm text-gray-300">
        <code>
          {showLineNumbers ? code.split('\n').map((line: string, i: number) => (
            <div key={i} className="flex">
              <span className="w-8 text-right pr-4 text-gray-600 select-none">{i + 1}</span>
              <span>{line}</span>
            </div>
          )) : code}
        </code>
      </pre>
    );
  },

  Kbd: ({ element }) => {
    const { keys } = element.props as { keys: string[] };
    return (
      <span className="inline-flex items-center gap-1">
        {keys.map((key, i) => (
          <React.Fragment key={i}>
            <kbd className="px-2 py-1 text-xs font-mono bg-white/5 border border-white/10 text-gray-300 rounded-lg">{key}</kbd>
            {i < keys.length - 1 && <span className="text-gray-600">+</span>}
          </React.Fragment>
        ))}
      </span>
    );
  },

  Quote: ({ element }) => {
    const { text, author, source } = element.props as { text: string; author?: string; source?: string };
    return (
      <figure>
        <blockquote className="border-l-4 border-purple-500 pl-4 italic text-gray-400">{text}</blockquote>
        {(author || source) && (
          <figcaption className="mt-2 text-sm">
            {author && <span className="font-medium text-gray-300">{author}</span>}
            {author && source && <span className="mx-1 text-gray-600">&mdash;</span>}
            {source && <cite className="text-gray-500">{source}</cite>}
          </figcaption>
        )}
      </figure>
    );
  },

  Stat: ({ element }) => {
    const { label, value, helpText, trend } = element.props as { label: string; value: string; helpText?: string; trend?: { direction: string; value: string } };
    return (
      <div className="rounded-xl border border-white/10 bg-[hsl(220,20%,8%)] p-5">
        <span className="text-sm font-medium text-gray-500">{label}</span>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-3xl font-bold text-gray-100">{value}</span>
          {trend && (
            <span className={`text-sm font-medium ${trend.direction === 'up' ? 'text-green-400' : 'text-red-400'}`}>
              {trend.direction === 'up' ? '\u2191' : '\u2193'} {trend.value}
            </span>
          )}
        </div>
        {helpText && <p className="mt-1 text-xs text-gray-500">{helpText}</p>}
      </div>
    );
  },

  Tag: ({ element }) => {
    const { label, variant = 'subtle', closable } = element.props as { label: string; variant?: string; closable?: boolean };
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 text-sm rounded-full font-medium ${
        variant === 'solid' ? 'bg-purple-600 text-white' :
        variant === 'outline' ? 'border border-white/20 text-gray-300' :
        'bg-white/5 text-gray-300'
      }`}>
        {label}
        {closable && <button className="ml-0.5 hover:opacity-70 text-gray-400">x</button>}
      </span>
    );
  },
};

// Registry Definition
export const aceternityRegistry: RegistryDefinition = {
  name: 'aceternity',
  displayName: 'Aceternity UI',
  description: 'Modern dark-mode components with stunning animations',
  framework: 'aceternity',
  components: aceternityComponents,
  theme: aceternityTheme,
};

export { aceternityComponents, aceternityTheme };
