# Testing Animation Preview Support

## Quick Start Guide

### 1. Start the Application
```bash
npm run dev
```

Navigate to `http://localhost:3000`

### 2. Test Scenarios

#### Scenario A: Magic UI Shimmer Button
1. Open the **Generate** tab
2. Enter prompt: `"Create a shimmer button from Magic UI"`
3. Click **Analyze**
4. View the discovered component with animation metadata
5. The preview should show a button with shimmer animation

**Expected Result:**
- Button renders in preview pane
- Shimmer animation plays continuously
- No console errors
- Smooth hover effects

#### Scenario B: Aceternity UI Animated Card
1. Open the **Generate** tab
2. Enter prompt: `"Create an animated card with hover effects from Aceternity UI"`
3. Click **Analyze**
4. Preview should show card with animations

**Expected Result:**
- Card renders with entrance animation
- Hover effects work smoothly
- Transition animations are fluid
- LazyMotion loads animation features

#### Scenario C: Multiple Animated Components
1. Open the **Chat** tab
2. Enter prompt: `"Create a landing page with animated hero section, features grid with hover cards, and animated CTA button using Magic UI"`
3. Wait for generation
4. Preview should show multiple animated components

**Expected Result:**
- All animations work simultaneously
- No performance degradation
- Smooth 60fps animation
- Proper stacking and z-index handling

## Verification Checklist

### Visual Tests
- [ ] Animations play smoothly
- [ ] Hover effects respond immediately
- [ ] No jank or stutter
- [ ] Proper timing and easing
- [ ] Components enter/exit gracefully

### Console Tests
Open browser DevTools and verify:
- [ ] No Framer Motion errors
- [ ] No missing feature warnings
- [ ] LazyMotion logs show domAnimation loaded
- [ ] AnimatePresence handles transitions

### Performance Tests
Open Chrome DevTools Performance tab:
- [ ] FPS stays above 55fps
- [ ] No layout thrashing
- [ ] Smooth animation curves
- [ ] Efficient repaints

## Component Animation Examples

### Example 1: Shimmer Button (Magic UI)
```typescript
{
  id: 'magic-ui:shimmer-button',
  name: 'ShimmerButton',
  displayName: 'Shimmer Button',
  category: 'feedback',
  source: 'magic-ui',
  dependencies: {
    npm: ['framer-motion@^11.0.0'],
    imports: ['motion']
  },
  animations: {
    type: 'framer-motion',
    complexity: 'medium'
  }
}
```

**UITree Representation:**
```json
{
  "root": "shimmer1",
  "elements": {
    "shimmer1": {
      "type": "motion.button",
      "props": {
        "whileHover": { "scale": 1.05 },
        "whileTap": { "scale": 0.95 },
        "className": "shimmer-button px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600",
        "children": "Click Me"
      }
    }
  }
}
```

### Example 2: Fade In Card (Aceternity UI)
```typescript
{
  id: 'aceternity-ui:fade-in-card',
  name: 'FadeInCard',
  displayName: 'Fade In Card',
  category: 'cards',
  source: 'aceternity-ui',
  dependencies: {
    npm: ['framer-motion@^11.0.0'],
    imports: ['motion', 'AnimatePresence']
  },
  animations: {
    type: 'framer-motion',
    complexity: 'simple'
  }
}
```

**UITree Representation:**
```json
{
  "root": "card1",
  "elements": {
    "card1": {
      "type": "motion.div",
      "props": {
        "initial": { "opacity": 0, "y": 20 },
        "animate": { "opacity": 1, "y": 0 },
        "transition": { "duration": 0.5 },
        "className": "card p-6 rounded-xl shadow-lg",
        "children": ["heading1", "text1"]
      }
    },
    "heading1": {
      "type": "Heading",
      "props": {
        "level": 3,
        "children": "Animated Card"
      }
    },
    "text1": {
      "type": "Text",
      "props": {
        "children": "This card fades in smoothly"
      }
    }
  }
}
```

## Browser Console Debugging

### Check Animation Support
Open browser console and run:
```javascript
// Check if Framer Motion is loaded
console.log('Framer Motion:', typeof motion !== 'undefined' ? 'Loaded' : 'Not loaded');

// Check LazyMotion
console.log('LazyMotion features:', document.querySelector('[data-projection-id]') ? 'Active' : 'Inactive');

// Monitor animation frames
let frameCount = 0;
const countFrames = () => {
  frameCount++;
  requestAnimationFrame(countFrames);
};
countFrames();
setTimeout(() => console.log('FPS:', frameCount / 5), 5000);
```

### Expected Console Output
```
[UIRenderer] LazyMotion initialized with domAnimation
[AnimatePresence] Mode: wait
[Animation] Rendering component: ShimmerButton
[Animation] Animation complexity: medium
[Performance] FPS: 60
```

## Common Issues and Solutions

### Issue 1: Animations Not Playing
**Symptoms:**
- Components render but don't animate
- No motion effects on hover

**Solutions:**
1. Check browser console for Framer Motion errors
2. Verify LazyMotion wrapper is present
3. Ensure domAnimation features are loaded
4. Check component props include animation properties

**Debug:**
```javascript
// Check if motion components are registered
console.log('Motion div:', document.querySelector('[data-projection-id]'));
```

### Issue 2: Poor Performance
**Symptoms:**
- Choppy animations
- Low FPS
- Browser lag

**Solutions:**
1. Reduce number of simultaneous animations
2. Use `will-change` CSS property
3. Enable GPU acceleration
4. Lower animation complexity

**Debug:**
```javascript
// Monitor performance
performance.mark('animation-start');
setTimeout(() => {
  performance.mark('animation-end');
  performance.measure('animation-duration', 'animation-start', 'animation-end');
  console.log(performance.getEntriesByName('animation-duration'));
}, 1000);
```

### Issue 3: Missing Animation Features
**Symptoms:**
- Console warnings about missing features
- Some animations work, others don't

**Solutions:**
1. Check if component needs additional features beyond domAnimation
2. For SVG animations, load additional features
3. For 3D transforms, include transform3D features

**Example Fix:**
```typescript
// If SVG animations needed
import { domMax } from 'framer-motion';

<LazyMotion features={domMax}>
  {/* Components with SVG animations */}
</LazyMotion>
```

### Issue 4: Animation Conflicts
**Symptoms:**
- Multiple animations fighting each other
- Unexpected animation behavior
- Components jumping around

**Solutions:**
1. Use AnimatePresence with mode="wait"
2. Add unique keys to animated components
3. Use layout animations for position changes

**Example Fix:**
```typescript
<AnimatePresence mode="wait">
  <motion.div key={uniqueKey}>
    {/* Component content */}
  </motion.div>
</AnimatePresence>
```

## Performance Benchmarks

### Target Metrics
- **FPS:** 60fps sustained
- **Time to Interactive:** < 2s
- **Animation Start Delay:** < 100ms
- **Memory Usage:** < 50MB increase

### Test Configuration
- **Device:** Modern desktop/laptop
- **Browser:** Chrome 120+
- **Components:** 5 animated components
- **Animation Type:** Medium complexity

### Measurement Tools
1. Chrome DevTools Performance tab
2. React DevTools Profiler
3. Lighthouse performance audit
4. Custom FPS counter

## Accessibility Testing

### Reduced Motion Support
Test with reduced motion preference:

**macOS:**
System Preferences → Accessibility → Display → Reduce motion

**Windows:**
Settings → Ease of Access → Display → Show animations

**Expected Behavior:**
- Animations should be minimal or disabled
- Instant transitions instead of animated
- Focus indicators remain visible
- No motion sickness triggers

### Keyboard Navigation
- [ ] Tab navigation works through animated components
- [ ] Focus states visible during animations
- [ ] No keyboard traps in animated sections

### Screen Reader Testing
- [ ] Animations don't interfere with screen reader
- [ ] ARIA labels remain accessible
- [ ] Dynamic content updates announced

## Automated Testing

### Unit Tests
Create tests in `/src/components/builder/__tests__/`:

```typescript
import { render } from '@testing-library/react';
import { UIRenderer } from '../ui-renderer';

test('renders animated component', () => {
  const tree = {
    root: 'btn1',
    elements: {
      btn1: {
        type: 'motion.button',
        props: { whileHover: { scale: 1.1 } }
      }
    }
  };

  const { container } = render(<UIRenderer tree={tree} />);
  expect(container.querySelector('[data-projection-id]')).toBeInTheDocument();
});
```

### Integration Tests
Test full animation flow:

```typescript
test('animation plays on component mount', async () => {
  // Render component
  // Wait for animation
  // Verify animation completed
});
```

## Next Steps

After successful testing:
1. ✅ Mark Task #7 as completed
2. Move to Task #8: Enhance Export Code with Animation Dependencies
3. Document any issues found
4. Gather performance metrics
5. Create user feedback mechanism

---

**Testing Guide Version:** 1.0
**Last Updated:** 2026-02-03
**Status:** Ready for Testing
