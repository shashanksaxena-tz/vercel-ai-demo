# Phase 3 Specification: External Libraries A (MUI & Chakra)

> **Objective**: Implement `json-render` registries for Material UI (MUI) and Chakra UI to demonstrate multi-theme capabilities.
> **Estimated Time**: 4 hours
> **Sessions**: 3.1 (MUI), 3.2 (Chakra)

---

## Session 3.1: Material UI Registry

### 3.1.1 Registry Structure
Create `src/registries/mui/index.tsx`.

### 3.1.2 Implementation Details
Map the 20 catalog components to MUI v5 components.

**Imports:**
```typescript
import { ComponentRegistry } from '@json-render/react';
import { 
  Button, Chip, Typography, Avatar, Card, CardContent, CardHeader,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TextField, Select, MenuItem, FormControl, InputLabel,
  Stack, Grid, Alert
} from '@mui/material';
```

**Mappings:**

1.  **Button**: Map `variant` (primary -> contained, secondary -> outlined, ghost -> text).
2.  **Badge**: Map to `<Chip>`. `variant="success"` -> `color="success"`.
3.  **Card**: Map `variant="elevated"` -> `elevation={3}` vs `variant="outlined"` -> `variant="outlined"`.
4.  **Input**: Map to `<TextField fullWidth />`.

**Code Example (src/registries/mui/index.tsx):**
```typescript
export const muiRegistry: ComponentRegistry = {
  Button: ({ element, onAction }) => (
    <Button 
      variant={element.props.variant === 'primary' ? 'contained' : element.props.variant === 'secondary' ? 'outlined' : 'text'} 
      color={element.props.variant === 'danger' ? 'error' : 'primary'}
      onClick={() => element.props.action && onAction(element.props.action)}
    >
      {element.props.label}
    </Button>
  ),
  Alert: ({ element }) => (
    <Alert severity={element.props.variant || 'info'}>
      {element.props.title && <AlertTitle>{element.props.title}</AlertTitle>}
      {element.props.message}
    </Alert>
  ),
  // ... implement remaining 18 components
};
```

---

## Session 3.2: Chakra UI Registry

### 3.2.1 Setup
Chakra requires a `ChakraProvider` at the root. We will wrap our registry components or the renderer in a provider if needed, but ideally, the main `layout.tsx` or a wrapper in `src/app/playground/page.tsx` handles this. *Decision:* Since we switch themes dynamically, we might need a `ThemeWrapper` component that conditionally wraps children.

### 3.2.2 Registry Structure
Create `src/registries/chakra/index.tsx`.

### 3.2.3 Implementation Details

**Imports:**
```typescript
import { 
  Button, Badge, Text, Avatar, Card, CardHeader, CardBody, 
  Table, Thead, Tbody, Tr, Th, Td, 
  Input, Select, Stack, SimpleGrid, Alert, AlertIcon 
} from '@chakra-ui/react';
```

**Mappings:**

1.  **Button**: `colorScheme` is key here. Primary -> `blue`, Danger -> `red`.
2.  **Layouts**: Chakra's `<Stack>` and `<SimpleGrid>` are perfect matches for our Catalog's `Stack` and `Grid`.

**Code Example:**
```typescript
export const chakraRegistry: ComponentRegistry = {
  Stack: ({ element, children }) => (
    <Stack 
      direction={element.props.direction === 'horizontal' ? 'row' : 'column'} 
      spacing={element.props.gap === 'lg' ? 6 : 4}
    >
      {children}
    </Stack>
  ),
  Metric: ({ element }) => (
    <Stat>
      <StatLabel>{element.props.label}</StatLabel>
      <StatNumber>{formatValue(element.props.valuePath)}</StatNumber>
      {element.props.trend && (
        <StatHelpText>
          <StatArrow type={element.props.trend === 'up' ? 'increase' : 'decrease'} />
          {element.props.trendValue}
        </StatHelpText>
      )}
    </Stat>
  )
};
```

---

## Definition of Done (Phase 3)
- [x] `src/registries/mui/index.tsx` complete with 20 components.
- [x] `src/registries/chakra/index.tsx` complete with 20 components.
- [x] Verify that swizzling between shadcn, mui, and chakra works in a test harness.
