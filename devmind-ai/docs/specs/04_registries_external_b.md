# Phase 4 Specification: External Libraries B (Ant Design & Premium)

> **Objective**: Implement `json-render` registries for Ant Design (Enterprise) and Magic/Aceternity UI (Premium/Animated).
> **Estimated Time**: 4 hours
> **Sessions**: 4.1 (AntD), 4.2 (Premium)

---

## Session 4.1: Ant Design Registry

### 4.1.1 Registry Structure
Create `src/registries/antd/index.tsx`.

### 4.1.2 Implementation
Ant Design works a bit differently (e.g., `type` instead of `variant` for buttons, different grid system).

**Imports:**
```typescript
import { ComponentRegistry } from '@json-render/react';
import { Button, Tag, Typography, Avatar, Card, Table, Input, Select, Row, Col, Alert } from 'antd';
import { UserOutlined } from '@ant-design/icons';
```

**Mappings:**

1.  **Grid System**: Ant uses `<Row>` and `<Col>`. Map our `Grid` catalog component to this.
    ```typescript
    Grid: ({ element, children }) => (
      <Row gutter={[16, 16]}>
        {React.Children.map(children, child => (
          <Col span={24 / (element.props.columns || 1)}>
            {child}
          </Col>
        ))}
      </Row>
    )
    ```
2.  **Table**: Ant's Table is powerful. Map `props.columns` and `props.dataPath` directly.

---

## Session 4.2: Premium Registries (Magic & Aceternity)

These libraries often prioritize aesthetics (animations, gradients, glassmorphism).

### 4.2.1 Magic UI Registry (`src/registries/magicui/index.tsx`)

**Concept**: Use shadcn/ui base but add Framer Motion or Magic UI specific wrappers found in `src/components/magicui/*` (you may need to create these wrappers based on open-source examples if npm packages aren't available).

**Key Components to "Magic-ify":**
- **Card**: Use a "Shine Border" or "Neon Gradient" card.
- **Button**: Use a "Magnetic Button" or "Shimmer Button".
- **Text**: Use "Typing Animation" or "Gradient Text".

**Implementation Strategy:**
1.  Since Magic UI is often copy-paste, create a folder `src/components/magicui`.
2.  Add 3-4 key magic components (e.g., `ShimmerButton.tsx`, `MagicCard.tsx`).
3.  In the registry, use these instead of standard HTML.

```typescript
import ShimmerButton from '@/components/magicui/shimmer-button';
import { MagicCard } from '@/components/magicui/magic-card';

export const magicuiRegistry: ComponentRegistry = {
  Button: ({ element, onAction }) => (
    <ShimmerButton onClick={() => ...}>
      {element.props.label}
    </ShimmerButton>
  ),
  Card: ({ element, children }) => (
    <MagicCard gradientColor="#D9D9D955">
      {children}
    </MagicCard>
  )
};
```

### 4.2.2 Aceternity UI Registry (`src/registries/aceternity/index.tsx`)

**Concept**: 3D effects, dark mode centric.

**Key Components:**
- **Card**: 3D Pin Card or Glowing Card.
- **Grid**: Bento Grid.

**Implementation:**
Similar to Magic UI, create `src/components/aceternity`.

```typescript
import { BentoGrid, BentoGridItem } from '@/components/aceternity/bento-grid';

export const aceternityRegistry: ComponentRegistry = {
  Grid: ({ element, children }) => (
    <BentoGrid className="max-w-4xl mx-auto">
      {children}
    </BentoGrid>
  )
};
```

---

## Definition of Done (Phase 4)
- [ ] `src/registries/antd/index.tsx` complete.
- [ ] `src/components/magicui` populated with 3-4 components.
- [ ] `src/registries/magicui/index.tsx` mapping created.
- [ ] `src/components/aceternity` populated with 2-3 components.
- [ ] `src/registries/aceternity/index.tsx` mapping created.
