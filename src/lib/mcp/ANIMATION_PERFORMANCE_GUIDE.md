# Animation Performance Guide

Complete guide to using animated components with performance optimization strategies.

## Table of Contents

- [Overview](#overview)
- [Animation Complexity Levels](#animation-complexity-levels)
- [Performance Scoring](#performance-scoring)
- [Best Practices](#best-practices)
- [Optimization Strategies](#optimization-strategies)
- [Testing Guidelines](#testing-guidelines)
- [Framework-Specific Tips](#framework-specific-tips)

## Overview

The MCP Dynamic Component Discovery system includes animated components from Magic UI and Aceternity UI. These components use various animation techniques including CSS transitions, Framer Motion, and advanced effects. This guide helps you use animations effectively while maintaining optimal performance.

## Animation Complexity Levels

### Simple (Score: 1-3)

**Characteristics:**
- CSS transitions and basic keyframes
- Opacity and basic transform animations
- Minimal JavaScript involvement
- Negligible performance impact

**Examples:**
- Fade in/out effects
- Simple slide animations
- Basic text reveals
- Opacity transitions

**Performance Impact:** ✅ Excellent
- CPU: Very low
- GPU: Minimal
- Memory: Negligible
- Bundle size: None (pure CSS)

**When to Use:**
- Loading states
- Hover effects
- Basic UI feedback
- Mobile-first designs

### Medium (Score: 4-6)

**Characteristics:**
- Framer Motion animations
- Transform-based effects (scale, rotate, translate)
- Spring physics
- Moderate JavaScript calculations

**Examples:**
- Shimmer effects
- Card flips
- Stagger animations
- Modal transitions

**Performance Impact:** ⚠️ Good
- CPU: Moderate
- GPU: Moderate (transform/opacity)
- Memory: Low-moderate
- Bundle size: ~52KB (Framer Motion)

**When to Use:**
- Landing pages
- Hero sections
- Interactive cards
- Feature showcases

### Complex (Score: 7-10)

**Characteristics:**
- 3D transforms and perspective
- Canvas/WebGL rendering
- Particle effects
- Heavy JavaScript calculations

**Examples:**
- 3D card effects
- Parallax backgrounds
- Particle systems
- Animated backgrounds

**Performance Impact:** ⛔ Use with Caution
- CPU: High
- GPU: High
- Memory: High
- Bundle size: 50-100KB+

**When to Use:**
- Hero sections (single instance)
- Premium landing pages
- Desktop-first experiences
- Marketing pages

## Performance Scoring

### Using the Scoring System

```typescript
import { scoreAnimationPerformance } from '@/lib/mcp';

// Analyze your components
const components = [
  shimmerButton,
  fadeInText,
  threeDCard,
];

const score = scoreAnimationPerformance(components);

console.log(score);
// {
//   complexity: 'complex',
//   score: 7,
//   warning: 'Complex animations detected...',
//   recommendations: [...],
//   breakdown: { simple: 1, medium: 1, complex: 1 },
//   totalAnimations: 3
// }
```

### Score Interpretation

| Score | Tier | Description | Action |
|-------|------|-------------|--------|
| 1-3 | Excellent | Simple animations, minimal overhead | ✅ Safe to use freely |
| 4-5 | Good | Moderate animations, acceptable overhead | ⚠️ Use thoughtfully |
| 6-7 | Fair | Complex animations, noticeable overhead | 🔶 Limit quantity |
| 8-10 | Poor | Very complex, significant overhead | ⛔ Use sparingly |

## Best Practices

### 1. Respect User Preferences

Always implement `prefers-reduced-motion`:

```css
/* CSS approach */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

```typescript
// Framer Motion approach
import { useReducedMotion } from 'framer-motion';

function AnimatedComponent() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={shouldReduceMotion ? {} : { opacity: 1 }}
    >
      Content
    </motion.div>
  );
}
```

### 2. Lazy Load Complex Animations

```typescript
// Lazy load complex components
const ParticleBackground = lazy(() => import('./ParticleBackground'));

function Hero() {
  return (
    <Suspense fallback={<StaticBackground />}>
      <ParticleBackground />
    </Suspense>
  );
}
```

### 3. Use Intersection Observer

Only animate when visible:

```typescript
import { useInView } from 'framer-motion';

function AnimatedSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
    >
      Content
    </motion.div>
  );
}
```

### 4. Optimize Animation Properties

**GPU-Accelerated (Fast):**
- `transform` (translate, scale, rotate)
- `opacity`

**CPU-Heavy (Slow):**
- `width`, `height`
- `top`, `left`, `right`, `bottom`
- `box-shadow`
- `filter`
- `background`

```typescript
// ✅ Good - GPU accelerated
<motion.div
  animate={{
    x: 100,        // transform: translateX
    scale: 1.2,    // transform: scale
    opacity: 1
  }}
/>

// ❌ Bad - triggers layout recalculation
<motion.div
  animate={{
    width: 200,
    height: 300,
    boxShadow: '0 10px 20px rgba(0,0,0,0.5)'
  }}
/>
```

### 5. Limit Simultaneous Animations

**Guidelines:**
- Mobile: Max 2-3 simultaneous animations
- Desktop: Max 5-6 simultaneous animations
- Complex animations: Max 1 at a time

```typescript
// ✅ Good - staggered animations
<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="show"
>
  {items.map((item, i) => (
    <motion.div
      key={i}
      variants={itemVariants}
      custom={i} // Stagger delay
    />
  ))}
</motion.div>

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1 // Delay between children
    }
  }
};
```

## Optimization Strategies

### Bundle Size Optimization

#### Framer Motion - LazyMotion

Reduce Framer Motion bundle size by 50%:

```typescript
import { LazyMotion, domAnimation, m } from 'framer-motion';

function App() {
  return (
    <LazyMotion features={domAnimation}>
      <m.div animate={{ opacity: 1 }} />
    </LazyMotion>
  );
}
```

#### Tree Shaking

Import only what you need:

```typescript
// ❌ Bad - imports entire library
import * as motion from 'framer-motion';

// ✅ Good - tree-shakeable
import { motion, AnimatePresence } from 'framer-motion';
```

### Memory Management

#### Cleanup Animations

```typescript
useEffect(() => {
  const animation = element.animate(...);

  return () => {
    animation.cancel(); // Cleanup on unmount
  };
}, []);
```

#### Avoid Memory Leaks

```typescript
// ✅ Good - proper cleanup
const controls = useAnimation();

useEffect(() => {
  controls.start({ opacity: 1 });

  return () => {
    controls.stop(); // Stop on unmount
  };
}, [controls]);
```

### GPU Acceleration

#### Force GPU Acceleration

```css
.animated {
  will-change: transform, opacity;
  /* Use sparingly - only on elements that WILL animate */
}
```

```typescript
// Or with Framer Motion
<motion.div
  style={{ willChange: 'transform' }}
  animate={{ x: 100 }}
/>
```

**Warning:** Don't overuse `will-change`. It consumes memory and can harm performance if used on too many elements.

## Testing Guidelines

### Performance Checklist

- [ ] Test on low-end mobile devices (not just flagship phones)
- [ ] Test on devices with 4x CPU throttling (Chrome DevTools)
- [ ] Monitor frame rate (should stay above 60fps)
- [ ] Check memory usage (shouldn't grow unbounded)
- [ ] Test with reduced motion preference enabled
- [ ] Verify animations don't block user interactions
- [ ] Test on slow 3G network conditions

### Tools

#### Chrome DevTools Performance Tab

1. Open DevTools → Performance
2. Start recording
3. Trigger animations
4. Stop recording
5. Analyze:
   - FPS (should be 60fps)
   - CPU usage
   - Layout shifts
   - Paint events

#### Lighthouse

```bash
# Run Lighthouse audit
npx lighthouse <url> --view
```

Check:
- Performance score
- Total Blocking Time (TBT)
- Cumulative Layout Shift (CLS)

#### React DevTools Profiler

Monitor component render times:

```typescript
<Profiler id="AnimatedSection" onRender={onRenderCallback}>
  <AnimatedSection />
</Profiler>
```

### Performance Budgets

Recommended limits:

| Metric | Budget |
|--------|--------|
| Animation library bundle | < 60KB gzipped |
| Total animations per page | < 10 |
| Simultaneous animations | < 5 |
| Animation duration | < 500ms |
| Frame rate (FPS) | > 60 |

## Framework-Specific Tips

### Framer Motion

#### Optimize with `layout`

```typescript
// Automatic layout animations
<motion.div layout>
  <motion.div layout />
</motion.div>
```

#### Use `variants` for Complex Animations

```typescript
const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100
    }
  }
};

<motion.div
  variants={variants}
  initial="hidden"
  animate="visible"
/>
```

#### Shared Layout Animations

```typescript
<AnimatePresence>
  {items.map(item => (
    <motion.div
      layoutId={item.id} // Shared layout animation
      key={item.id}
    />
  ))}
</AnimatePresence>
```

### CSS Animations

#### Hardware Acceleration

```css
@keyframes slide-in {
  from {
    transform: translateX(-100%);
    /* Use transform instead of left */
  }
  to {
    transform: translateX(0);
  }
}
```

#### Reduce Repaints

```css
/* ✅ Good - only affects transform layer */
.animated {
  transform: translateX(100px);
}

/* ❌ Bad - triggers full repaint */
.animated {
  left: 100px;
}
```

## Performance Score Examples

### Example 1: Simple Landing Page

```typescript
const components = [
  { name: 'FadeIn', animations: { type: 'css', complexity: 'simple' } },
  { name: 'SlideIn', animations: { type: 'css', complexity: 'simple' } },
];

const score = scoreAnimationPerformance(components);
// Score: 2/10 (Excellent)
// No warnings
```

### Example 2: Feature-Rich Dashboard

```typescript
const components = [
  { name: 'ShimmerButton', animations: { type: 'framer-motion', complexity: 'medium' } },
  { name: 'CardFlip', animations: { type: 'framer-motion', complexity: 'medium' } },
  { name: 'StatsCounter', animations: { type: 'framer-motion', complexity: 'medium' } },
];

const score = scoreAnimationPerformance(components);
// Score: 5/10 (Good)
// Recommendation: Test on mobile devices
```

### Example 3: Premium Marketing Page

```typescript
const components = [
  { name: 'ParticleBackground', animations: { type: 'framer-motion', complexity: 'complex' } },
  { name: '3DCard', animations: { type: 'framer-motion', complexity: 'complex' } },
  { name: 'ShimmerText', animations: { type: 'framer-motion', complexity: 'medium' } },
];

const score = scoreAnimationPerformance(components);
// Score: 8/10 (Poor)
// Warning: Multiple complex animations may impact performance
// Recommendations: Lazy load, use Intersection Observer, test on mobile
```

## Dependency Analysis

### Analyzing Animation Libraries

```typescript
import { analyzeAnimationDependencies, estimateBundleImpact } from '@/lib/mcp';

const components = [...yourComponents];

const { libraries, suggestions } = analyzeAnimationDependencies(components);
console.log('Animation libraries:', libraries);
// Set { 'framer-motion', 'react-spring' }

console.log('Suggestions:', suggestions);
// ["Multiple animation libraries detected..."]

const { estimatedKB, breakdown } = estimateBundleImpact(components);
console.log('Estimated bundle impact:', estimatedKB, 'KB');
console.log('Breakdown:', breakdown);
// { 'framer-motion': 52, 'react-spring': 28 }
```

## Summary

### Quick Reference

| Task | Recommendation |
|------|----------------|
| Simple transitions | Use CSS animations |
| Interactive elements | Use Framer Motion |
| 3D effects | Limit to hero sections only |
| Mobile-first | Keep complexity to simple/medium |
| Desktop-first | Can use medium/complex sparingly |
| Accessibility | Always implement reduced motion |
| Performance budget | < 60KB for animation libraries |
| Testing | Test on low-end devices |

### Common Mistakes to Avoid

1. ❌ Animating `width`, `height`, `top`, `left`
2. ❌ Using `will-change` on everything
3. ❌ Ignoring `prefers-reduced-motion`
4. ❌ Running multiple complex animations simultaneously
5. ❌ Not testing on mobile devices
6. ❌ Animating off-screen elements
7. ❌ Using large animation libraries for simple effects
8. ❌ Blocking user interactions during animations

### Resources

- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)
- [CSS Triggers](https://csstriggers.com/)
- [High Performance Animations](https://web.dev/animations/)
- [Reduced Motion Media Query](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
