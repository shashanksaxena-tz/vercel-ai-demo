# Animation Preview Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     User Interface Layer                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Chat Tab    │  │ Generate Tab │  │ Test Cases   │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                 │                  │                   │
│         └─────────────────┴──────────────────┘                   │
│                           ▼                                       │
└───────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                   UI Generation Layer                            │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  AI UI Generator (ui-generator.ts)                      │   │
│  │  • Analyzes user request                                │   │
│  │  • Identifies component requirements                    │   │
│  │  • Detects animation needs                              │   │
│  └─────────────────┬───────────────────────────────────────┘   │
└────────────────────┼───────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                MCP Component Discovery Layer                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Magic UI    │  │ Aceternity   │  │  Shadcn UI   │          │
│  │  MCP Server  │  │  MCP Server  │  │  MCP Server  │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                 │                  │                   │
│         └─────────────────┴──────────────────┘                   │
│                           ▼                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Component Metadata with Animation Info                 │   │
│  │  {                                                       │   │
│  │    animations: {                                         │   │
│  │      type: 'framer-motion',                              │   │
│  │      complexity: 'medium'                                │   │
│  │    },                                                    │   │
│  │    dependencies: {                                       │   │
│  │      npm: ['framer-motion@^11.0.0'],                     │   │
│  │      imports: ['motion', 'AnimatePresence']              │   │
│  │    }                                                     │   │
│  │  }                                                       │   │
│  └─────────────────┬───────────────────────────────────────┘   │
└────────────────────┼───────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Registry Build Layer                          │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Dynamic Registry Builder                                │   │
│  │  • Fetches component source code                        │   │
│  │  • Builds component registry                            │   │
│  │  • Includes animation dependencies                      │   │
│  └─────────────────┬───────────────────────────────────────┘   │
└────────────────────┼───────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                    UITree Generation Layer                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  JSON-Render UITree                                      │   │
│  │  {                                                       │   │
│  │    root: 'btn1',                                         │   │
│  │    elements: {                                           │   │
│  │      btn1: {                                             │   │
│  │        type: 'motion.button',  ← Motion component       │   │
│  │        props: {                                          │   │
│  │          whileHover: { scale: 1.05 },  ← Animation      │   │
│  │          whileTap: { scale: 0.95 }                       │   │
│  │        }                                                 │   │
│  │      }                                                   │   │
│  │    }                                                     │   │
│  │  }                                                       │   │
│  └─────────────────┬───────────────────────────────────────┘   │
└────────────────────┼───────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│              🎬 ANIMATION PREVIEW LAYER 🎬                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  UIRenderer with Framer Motion Support                  │   │
│  │                                                          │   │
│  │  <LazyMotion features={domAnimation} strict>            │   │
│  │    <AnimatePresence mode="wait">                        │   │
│  │      <DataProvider>                                     │   │
│  │        <VisibilityProvider>                             │   │
│  │          <ActionProvider>                               │   │
│  │            <Renderer                                    │   │
│  │              tree={tree}                                │   │
│  │              registry={registry}                        │   │
│  │            />                                           │   │
│  │          </ActionProvider>                              │   │
│  │        </VisibilityProvider>                            │   │
│  │      </DataProvider>                                    │   │
│  │    </AnimatePresence>                                   │   │
│  │  </LazyMotion>                                          │   │
│  │                                                          │   │
│  └─────────────────┬───────────────────────────────────────┘   │
└────────────────────┼───────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Preview Display Layer                         │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Preview Wrapper (preview-wrapper.tsx)                  │   │
│  │  • Scopes design system variables                       │   │
│  │  • Applies theme tokens                                 │   │
│  │  • Isolates preview environment                         │   │
│  │                                                          │   │
│  │  ┌──────────────────────────────────────────────────┐  │   │
│  │  │  🎨 Animated Component Preview                   │  │   │
│  │  │                                                  │  │   │
│  │  │  ┌────────────────────────┐                     │  │   │
│  │  │  │  Shimmer Button        │  ← Animations work! │  │   │
│  │  │  │  [Hover me!]           │                     │  │   │
│  │  │  └────────────────────────┘                     │  │   │
│  │  │                                                  │  │   │
│  │  │  • Smooth 60fps animations                      │  │   │
│  │  │  • GPU accelerated                              │  │   │
│  │  │  • Reduced motion support                       │  │   │
│  │  └──────────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## Component Flow

### 1. Animation Detection Flow
```
User Request
    ↓
"Create a shimmer button from Magic UI"
    ↓
AI Analyzer identifies:
  • Component: Button
  • Animation: Shimmer effect
  • Source: Magic UI
    ↓
MCP Discovery Query:
  • Server: magic-ui
  • Query: "shimmer button"
    ↓
Component Metadata Retrieved:
  {
    animations: {
      type: 'framer-motion',
      complexity: 'medium'
    }
  }
```

### 2. Registry Build Flow
```
Component Metadata
    ↓
Fetch Source Code from MCP
    ↓
Extract Dependencies:
  • framer-motion@^11.0.0
  • motion
  • AnimatePresence
    ↓
Build Registry Entry:
  {
    id: 'magic-ui:shimmer-button',
    component: ShimmerButton,
    dependencies: [...]
  }
```

### 3. Render Flow
```
UITree with Animation Props
    ↓
UIRenderer receives tree
    ↓
LazyMotion initializes:
  • Load domAnimation features
  • Enable GPU acceleration
  • Setup motion context
    ↓
AnimatePresence prepares:
  • Track component lifecycle
  • Manage enter/exit animations
  • Handle mode="wait" sequencing
    ↓
Renderer creates components:
  • motion.button with whileHover
  • motion.div with initial/animate
  • Standard components (no animation)
    ↓
Browser displays:
  • Animated preview at 60fps
  • Interactive hover effects
  • Smooth transitions
```

## Animation Provider Hierarchy

```
┌────────────────────────────────────────────┐
│  LazyMotion (Optimization Layer)           │
│  • Features: domAnimation                  │
│  • Strict: true                            │
│  • Bundle: 20KB vs 40KB full motion        │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │  AnimatePresence (Lifecycle Layer)   │ │
│  │  • Mode: wait                        │ │
│  │  • Manages enter/exit animations     │ │
│  │                                      │ │
│  │  ┌────────────────────────────────┐ │ │
│  │  │  DataProvider (State Layer)    │ │ │
│  │  │  • Component data              │ │ │
│  │  │                                │ │ │
│  │  │  ┌──────────────────────────┐ │ │ │
│  │  │  │  VisibilityProvider      │ │ │ │
│  │  │  │  • Show/hide state       │ │ │ │
│  │  │  │                          │ │ │ │
│  │  │  │  ┌────────────────────┐ │ │ │ │
│  │  │  │  │  ActionProvider    │ │ │ │ │
│  │  │  │  │  • Event handlers  │ │ │ │ │
│  │  │  │  │                    │ │ │ │ │
│  │  │  │  │  ┌──────────────┐ │ │ │ │ │
│  │  │  │  │  │  Renderer    │ │ │ │ │ │
│  │  │  │  │  │  • UITree    │ │ │ │ │ │
│  │  │  │  │  │  • Registry  │ │ │ │ │ │
│  │  │  │  │  └──────────────┘ │ │ │ │ │
│  │  │  │  └────────────────────┘ │ │ │ │
│  │  │  └──────────────────────────┘ │ │ │
│  │  └────────────────────────────────┘ │ │
│  └──────────────────────────────────────┘ │
└────────────────────────────────────────────┘
```

## Animation Types Support Matrix

### Framer Motion Features

| Feature | Supported | Notes |
|---------|-----------|-------|
| Transforms (x, y, scale, rotate) | ✅ | Via domAnimation |
| Opacity | ✅ | Via domAnimation |
| Layout animations | ✅ | Via domAnimation |
| Spring physics | ✅ | Via domAnimation |
| Keyframes | ✅ | Via domAnimation |
| Gestures (hover, tap, drag) | ✅ | Via domAnimation |
| SVG animations | ❌ | Need domMax |
| 3D transforms | ❌ | Need additional features |
| Path animations | ❌ | Need domMax |

### Animation Complexity Levels

```
Simple (< 3 properties)
├── Fade in/out
├── Slide in/out
└── Scale

Medium (3-6 properties)
├── Combined transforms
├── Spring animations
├── Hover effects
└── Gesture interactions

Complex (6+ properties)
├── Keyframe sequences
├── Stagger children
├── Layout animations
└── Physics-based motion
```

## Performance Architecture

### Optimization Layers

```
┌────────────────────────────────────────────┐
│  Browser Layer                             │
│  • GPU acceleration                        │
│  • Hardware compositing                    │
│  • 60fps target                            │
└────────────────┬───────────────────────────┘
                 │
                 ▼
┌────────────────────────────────────────────┐
│  Framer Motion Layer                       │
│  • LazyMotion: On-demand feature loading   │
│  • MotionValue: Efficient state management │
│  • Transform optimization                  │
└────────────────┬───────────────────────────┘
                 │
                 ▼
┌────────────────────────────────────────────┐
│  React Layer                               │
│  • Virtual DOM diffing                     │
│  • Component memoization                   │
│  • Effect batching                         │
└────────────────┬───────────────────────────┘
                 │
                 ▼
┌────────────────────────────────────────────┐
│  Application Layer                         │
│  • UIRenderer optimization                 │
│  • Registry caching                        │
│  • Tree state management                   │
└────────────────────────────────────────────┘
```

### Memory Management

```
Component Mount
    ↓
LazyMotion loads domAnimation (~20KB)
    ↓
Animation context created (~5KB)
    ↓
MotionValue instances (~1KB per animated prop)
    ↓
Total: ~26KB + (1KB × num_animated_props)
    ↓
Component Unmount
    ↓
Animation cleanup
    ↓
Memory released
```

## Error Handling Flow

```
UIRenderer receives tree
    ↓
Validate tree structure
    ↓
Check registry availability
    ↓
LazyMotion initialization
    ├─ Success → Render with animations
    └─ Failure → Fallback to CSS animations
         ↓
    Console warning
         ↓
    Render without motion features
```

## Accessibility Flow

```
User has reduced motion preference
    ↓
Browser sets prefers-reduced-motion: reduce
    ↓
Framer Motion detects preference
    ↓
Animations automatically simplified:
  • Duration: 0.01ms
  • Transitions: instant
  • Effects: minimal
    ↓
Component renders with accessibility
```

---

**Architecture Version:** 1.0
**Last Updated:** 2026-02-03
**Status:** Production Ready
