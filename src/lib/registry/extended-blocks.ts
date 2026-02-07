import type { BlockDefinition, PropDefinition } from './block-registry';

function prop(name: string, type: string, required = false, description = ''): PropDefinition {
  return { name, type, required, description };
}

function extendedBlock(
  name: string,
  source: string,
  kind: BlockDefinition['kind'],
  category: BlockDefinition['category'],
  description: string,
  props: PropDefinition[],
  tags: string[] = [],
  defaultProps: Record<string, unknown> = {}
): BlockDefinition {
  return {
    type: `mcp::${name}`,
    kind,
    tier: 'extended',
    source,
    renderer: null,
    category,
    description,
    props,
    defaultProps,
    tags: ['animated', 'framer-motion', source, ...tags],
  };
}

export const MAGIC_UI_BLOCK_DEFINITIONS: BlockDefinition[] = [
  extendedBlock('ShimmerButton', 'magic-ui', 'interactive', 'forms', 'Button with shimmer animation', [
    prop('label', 'string', true, 'Button text'), prop('className', 'string'),
  ], [], { label: 'Shimmer Button', className: 'px-6 py-3' }),
  extendedBlock('MagicCard', 'magic-ui', 'content', 'cards', 'Card with spotlight hover effect', [
    prop('className', 'string'),
  ], [], { className: 'p-6 min-h-[120px]' }),
  extendedBlock('BorderBeam', 'magic-ui', 'content', 'other', 'Animated border beam effect', [
    prop('size', 'number'), prop('duration', 'number'),
  ], [], { size: 250, duration: 12 }),
  extendedBlock('Meteors', 'magic-ui', 'media', 'other', 'Meteor shower background', [
    prop('count', 'number', false, 'Number of meteors'),
  ], [], { count: 20 }),
  extendedBlock('DotPattern', 'magic-ui', 'layout', 'layout', 'Dot grid background pattern', [
    prop('className', 'string'),
  ], [], { className: 'h-[200px] w-full' }),
  extendedBlock('GridPattern', 'magic-ui', 'layout', 'layout', 'Grid line background', [
    prop('className', 'string'),
  ], [], { className: 'h-[200px] w-full' }),
  extendedBlock('SparklesText', 'magic-ui', 'content', 'typography', 'Text with sparkle effects', [
    prop('text', 'string', true), prop('className', 'string'),
  ], [], { text: 'Sparkle Text', className: 'text-2xl font-bold' }),
  extendedBlock('NumberTicker', 'magic-ui', 'data', 'data-display', 'Animated number counter', [
    prop('value', 'number', true), prop('className', 'string'),
  ], [], { value: 1234, className: 'text-4xl font-bold' }),
  extendedBlock('AnimatedGradientText', 'magic-ui', 'content', 'typography', 'Gradient animated text', [
    prop('text', 'string', true), prop('className', 'string'),
  ], [], { text: 'Gradient Text', className: 'text-xl font-semibold' }),
  extendedBlock('BlurIn', 'magic-ui', 'layout', 'other', 'Blur-in animation wrapper', [
    prop('className', 'string'),
  ], [], { className: 'p-4 min-h-[80px] border border-dashed border-indigo-300 rounded' }),
  extendedBlock('FadeIn', 'magic-ui', 'layout', 'other', 'Fade-in animation wrapper', [
    prop('direction', 'string', false, 'up|down|left|right'), prop('className', 'string'),
  ], [], { direction: 'up', className: 'p-4 min-h-[80px] border border-dashed border-indigo-300 rounded' }),
  extendedBlock('Marquee', 'magic-ui', 'content', 'marketing', 'Infinite scrolling marquee', [
    prop('speed', 'number'), prop('direction', 'string'),
  ], [], { speed: 40, direction: 'left' }),
  extendedBlock('BentoGrid', 'magic-ui', 'layout', 'layout', 'Bento grid layout', [
    prop('className', 'string'),
  ], [], { className: 'grid grid-cols-3 gap-4 p-4 min-h-[200px]' }),
  extendedBlock('Ripple', 'magic-ui', 'media', 'other', 'Ripple animation effect', [
    prop('color', 'string'), prop('count', 'number'),
  ], [], { color: '#6366f1', count: 3 }),
  extendedBlock('Particles', 'magic-ui', 'media', 'other', 'Particle background', [
    prop('count', 'number'),
  ], [], { count: 50 }),
  extendedBlock('Dock', 'magic-ui', 'navigation', 'navigation', 'macOS-style dock', [
    prop('className', 'string'),
  ], [], { className: 'p-2' }),
];

export const ACETERNITY_BLOCK_DEFINITIONS: BlockDefinition[] = [
  extendedBlock('BackgroundBeams', 'aceternity-ui', 'media', 'other', 'Animated beam background', [
    prop('className', 'string'),
  ], [], { className: 'h-[300px] w-full' }),
  extendedBlock('SparklesCore', 'aceternity-ui', 'media', 'other', 'Sparkle particle effect', [
    prop('className', 'string'), prop('particleCount', 'number'),
  ], [], { className: 'h-[200px] w-full', particleCount: 30 }),
  extendedBlock('TextGenerateEffect', 'aceternity-ui', 'content', 'typography', 'Typewriter text reveal', [
    prop('words', 'string', true), prop('className', 'string'),
  ], [], { words: 'The quick brown fox jumps over the lazy dog', className: 'text-xl' }),
  extendedBlock('HeroHighlight', 'aceternity-ui', 'content', 'marketing', 'Hero text highlight effect', [
    prop('className', 'string'),
  ], [], { className: 'p-8 min-h-[200px]' }),
  extendedBlock('BackgroundGradient', 'aceternity-ui', 'layout', 'other', 'Animated gradient background', [
    prop('className', 'string'),
  ], [], { className: 'p-6 rounded-xl min-h-[150px]' }),
  extendedBlock('CardHoverEffect', 'aceternity-ui', 'content', 'cards', '3D hover effect card', [
    prop('className', 'string'),
  ], [], { className: 'p-6 min-h-[120px]' }),
  extendedBlock('FloatingDock', 'aceternity-ui', 'navigation', 'navigation', 'Floating dock navigation', [
    prop('items', 'array'), prop('className', 'string'),
  ], [], { items: [{ label: 'Home', href: '#' }, { label: 'About', href: '#' }], className: 'p-2' }),
  extendedBlock('MovingBorder', 'aceternity-ui', 'content', 'other', 'Animated moving border', [
    prop('className', 'string'), prop('duration', 'number'),
  ], [], { className: 'p-4 min-h-[80px]', duration: 3 }),
  extendedBlock('GlareCard', 'aceternity-ui', 'content', 'cards', 'Card with glare effect', [
    prop('className', 'string'),
  ], [], { className: 'p-6 min-h-[120px]' }),
  extendedBlock('InfiniteMovingCards', 'aceternity-ui', 'content', 'marketing', 'Auto-scrolling card carousel', [
    prop('items', 'array'), prop('speed', 'string'), prop('direction', 'string'),
  ], [], { items: [{ quote: 'Amazing product!', name: 'John', title: 'CEO' }], speed: 'normal', direction: 'left' }),
  extendedBlock('LampEffect', 'aceternity-ui', 'media', 'marketing', 'Lamp/spotlight effect', [
    prop('className', 'string'),
  ], [], { className: 'h-[300px] w-full' }),
  extendedBlock('Spotlight', 'aceternity-ui', 'media', 'other', 'Spotlight animation', [
    prop('className', 'string'), prop('fill', 'string'),
  ], [], { className: 'h-[250px] w-full', fill: '#8b5cf6' }),
  extendedBlock('WavyBackground', 'aceternity-ui', 'media', 'other', 'Animated wavy background', [
    prop('className', 'string'), prop('colors', 'array'),
  ], [], { className: 'h-[300px] w-full', colors: ['#6366f1', '#8b5cf6', '#a78bfa'] }),
  extendedBlock('TracingBeam', 'aceternity-ui', 'content', 'other', 'Scroll-following beam', [
    prop('className', 'string'),
  ], [], { className: 'p-6 min-h-[200px]' }),
  extendedBlock('ThreeDCard', 'aceternity-ui', 'content', 'cards', '3D perspective card', [
    prop('className', 'string'),
  ], [], { className: 'p-6 min-h-[150px]' }),
];
