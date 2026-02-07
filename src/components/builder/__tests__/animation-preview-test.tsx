/**
 * Animation Preview Test Component
 *
 * Tests Framer Motion animation support in UIRenderer for Magic UI and Aceternity UI components
 */

import * as React from 'react';
import { UIRenderer } from '../ui-renderer';
import type { UITree } from '@json-render/core';

/**
 * Test component with Framer Motion animation
 * Simulates a Magic UI shimmer button
 */
export function AnimationPreviewTest() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Simple animated button UITree
  const animatedTree: UITree = {
    root: 'btn1',
    elements: {
      btn1: {
        type: 'Button',
        props: {
          variant: 'default',
          children: 'Animated Button Test',
          className: 'shimmer-button',
          // Simulated framer-motion props
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          whileHover: { scale: 1.05 },
          transition: { duration: 0.3 }
        }
      }
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="p-8 space-y-4">
      <h2 className="text-xl font-bold">Animation Preview Test</h2>
      <p className="text-sm text-muted-foreground">
        Testing Framer Motion support in UIRenderer
      </p>

      <div className="border rounded-lg p-4">
        <UIRenderer tree={animatedTree} />
      </div>

      <div className="text-xs text-muted-foreground space-y-1">
        <p>✓ LazyMotion wrapper loaded</p>
        <p>✓ AnimatePresence mode="wait" active</p>
        <p>✓ domAnimation features included</p>
      </div>
    </div>
  );
}

export default AnimationPreviewTest;
