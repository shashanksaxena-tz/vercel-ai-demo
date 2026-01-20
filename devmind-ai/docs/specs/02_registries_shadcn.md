# Phase 2 Specification: shadcn/ui Registry

> **Objective**: Implement the `json-render` registry for `shadcn/ui`, mapping abstract catalog components to concrete shadcn implementation.
> **Estimated Time**: 3-4 hours
> **Sessions**: 2.1, 2.2

---

## Session 2.1: Basic Components (Atoms)

### 2.1.1 Registry Structure
Create the directory structure:
```bash
mkdir -p src/registries/shadcn
```

Create `src/registries/shadcn/index.tsx` which will export the `registry` object.

### 2.1.2 Component Mapping (Atoms)

You will import shadcn components (which were installed in Phase 1 via `npx shadcn init`) and map them.

**File:** `src/registries/shadcn/index.tsx`

```typescript
import { ComponentRegistry } from '@json-render/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
// ... imports

export const shadcnRegistry: ComponentRegistry = {
  // 1. BUTTON
  Button: ({ element, onAction }) => {
    // Map abstract variants to shadcn variants
    const variantMap: Record<string, any> = {
      primary: 'default',
      secondary: 'secondary',
      danger: 'destructive',
      ghost: 'ghost',
      outline: 'outline'
    };
    
    return (
      <Button 
        variant={variantMap[element.props.variant || 'primary']}
        size={element.props.size || 'default'}
        onClick={() => element.props.action && onAction(element.props.action)}
        className="w-full sm:w-auto"
      >
        {element.props.label}
      </Button>
    );
  },

  // 2. BADGE
  Badge: ({ element }) => {
    const variantMap: Record<string, any> = {
      default: 'default',
      success: 'secondary', // customizable
      warning: 'outline',
      error: 'destructive'
    };
    return (
      <Badge variant={variantMap[element.props.variant || 'default']}>
        {element.props.label}
      </Badge>
    );
  },

  // 3. TEXT
  Text: ({ element }) => {
    const styles = {
      h1: "text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "text-3xl font-semibold tracking-tight",
      h3: "text-2xl font-semibold tracking-tight",
      body: "leading-7 [&:not(:first-child)]:mt-6",
      caption: "text-sm text-muted-foreground"
    };
    return (
      <div className={styles[element.props.variant as keyof typeof styles] || styles.body}>
        {element.props.content}
      </div>
    );
  },

  // 4. AVATAR
  Avatar: ({ element }) => (
    <Avatar>
      <AvatarImage src={element.props.src} alt={element.props.name} />
      <AvatarFallback>{element.props.name.charAt(0)}</AvatarFallback>
    </Avatar>
  ),
  
  // 5. STACK (Layout)
  Stack: ({ element, children }) => (
    <div className={`flex ${element.props.direction === 'horizontal' ? 'flex-row' : 'flex-col'} gap-${element.props.gap === 'lg' ? '6' : element.props.gap === 'sm' ? '2' : '4'}`}>
      {children}
    </div>
  )
};
```

---

## Session 2.2: Complex Components (Molecules)

Extend `src/registries/shadcn/index.tsx` to include complex structures.

### 2.2.1 Card
Refers to `@/components/ui/card`.

```typescript
Card: ({ element, children }) => (
  <Card className={element.props.variant === 'elevated' ? 'shadow-lg' : ''}>
    <CardHeader>
      <CardTitle>{element.props.title}</CardTitle>
      {element.props.description && <CardDescription>{element.props.description}</CardDescription>}
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
),
```

### 2.2.2 Table
Refers to `@/components/ui/table`. Logic is needed to render columns dynamically.

```typescript
Table: ({ element }) => {
  // Mock data access - in real app useData() hook from json-render context
  const data = useData(element.props.dataPath) || []; 
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {element.props.columns.map((col: any) => (
              <TableHead key={col.key}>{col.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row: any, i: number) => (
            <TableRow key={i}>
              {element.props.columns.map((col: any) => (
                <TableCell key={col.key}>{row[col.key]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
},
```

### 2.2.3 Inputs/Forms
Refers to `@/components/ui/input`, `select`, etc.
*Crucial*: These must bind to state.

```typescript
Input: ({ element }) => {
  const [value, setValue] = useDataState(element.props.valuePath);
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label>{element.props.label}</Label>
      <Input 
        type={element.props.type || 'text'} 
        value={value || ''}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
},
```

### 2.2.4 Charts
Install `recharts` first (standard for shadcn).
Create a wrapper `src/components/ui/chart-wrapper.tsx` that adapts `json-render` props to Recharts.

---

## Definition of Done (Phase 2)
- [ ] `src/registries/shadcn/index.tsx` exports a complete registry.
- [ ] Manual test page created at `src/app/test-shadcn/page.tsx` that hardcodes a JSON tree and renders it using `<Renderer tree={mockTree} component={shadcnRegistry} />`.
- [ ] All 20 components render correct styles.
