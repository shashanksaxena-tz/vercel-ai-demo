# Generative UI Builder - Complete Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a fully functional Generative UI Builder where users can create UIs via prompts, switch between frameworks (Shadcn, MUI, Chakra, Magic UI, Aceternity), edit iteratively via chat, apply Tailwind styling, and export working React code.

**Architecture:**
- LLM-powered generation using AI SDK for semantic understanding
- Framework-agnostic UITree that renders through switchable registries
- Chat-based iterative editing with conversation state
- MCP integration for assets, icons, and styling utilities
- Code export with clean React components

**Tech Stack:** Next.js 16, React 19, AI SDK, @json-render/react, @mui/material, @chakra-ui/react, framer-motion, Tailwind CSS, MCP SDK

---

## Phase 1: Fix Core Rendering (Tasks 1-4)

### Task 1: Create MUI Registry

**Files:**
- Create: `src/components/registries/mui/registry.tsx`
- Create: `src/components/registries/mui/index.ts`
- Modify: `src/components/registries/index.ts`
- Modify: `src/types/index.ts`

**Step 1: Create MUI registry file**

```tsx
// src/components/registries/mui/registry.tsx
'use client';

import * as React from 'react';
import type { ComponentRegistry, ComponentRenderProps } from '@json-render/react';
import type { RegistryDefinition, RegistryTheme } from '@/lib/registry';

// MUI Imports
import {
  Box, Container as MuiContainer, Stack as MuiStack, Grid2 as MuiGrid,
  Card as MuiCard, CardHeader as MuiCardHeader, CardContent, CardActions,
  Typography, Link as MuiLink, Button as MuiButton, IconButton as MuiIconButton,
  TextField, Select as MuiSelect, MenuItem, Checkbox as MuiCheckbox,
  Radio as MuiRadio, RadioGroup as MuiRadioGroup, Switch as MuiSwitch,
  Slider as MuiSlider, FormControlLabel, FormControl, InputLabel,
  Avatar as MuiAvatar, AvatarGroup as MuiAvatarGroup, Chip, Badge as MuiBadge,
  Table as MuiTable, TableHead, TableBody as MuiTableBody, TableRow as MuiTableRow,
  TableCell as MuiTableCell, LinearProgress, CircularProgress,
  Alert as MuiAlert, Skeleton as MuiSkeleton, Tabs as MuiTabs, Tab as MuiTab,
  Breadcrumbs, Pagination as MuiPagination, Dialog, DialogTitle, DialogContent,
  Drawer as MuiDrawer, Tooltip as MuiTooltip, Menu, Accordion as MuiAccordion,
  AccordionSummary, AccordionDetails, Divider as MuiDivider, Rating as MuiRating,
  Stepper as MuiStepper, Step as MuiStep, StepLabel,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const muiTheme: RegistryTheme = {
  name: 'Material Design',
  colors: {
    primary: '#1976d2',
    secondary: '#9c27b0',
    accent: '#ff4081',
    background: '#ffffff',
    foreground: '#212121',
    muted: '#f5f5f5',
    success: '#2e7d32',
    warning: '#ed6c02',
    error: '#d32f2f',
    info: '#0288d1',
  },
  fonts: {
    heading: 'Roboto, sans-serif',
    body: 'Roboto, sans-serif',
    mono: 'Roboto Mono, monospace',
  },
  borderRadius: '4px',
  shadows: true,
};

const theme = createTheme({
  palette: {
    primary: { main: muiTheme.colors.primary },
    secondary: { main: muiTheme.colors.secondary },
  },
});

const muiComponents: ComponentRegistry = {
  // Layout
  Container: ({ element, children }) => (
    <MuiContainer maxWidth={(element.props.maxWidth as 'xs' | 'sm' | 'md' | 'lg' | 'xl') || 'lg'} sx={element.props.sx}>
      {children}
    </MuiContainer>
  ),
  Row: ({ element, children }) => (
    <MuiStack direction="row" spacing={element.props.gap || 2} sx={element.props.sx}>
      {children}
    </MuiStack>
  ),
  Column: ({ element, children }) => (
    <MuiStack direction="column" spacing={element.props.gap || 2} sx={element.props.sx}>
      {children}
    </MuiStack>
  ),
  Grid: ({ element, children }) => (
    <MuiGrid container spacing={element.props.gap || 2} columns={element.props.columns || 12}>
      {React.Children.map(children, (child) => (
        <MuiGrid size={{ xs: 12, md: 12 / (element.props.columns || 3) }}>{child}</MuiGrid>
      ))}
    </MuiGrid>
  ),
  Stack: ({ element, children }) => (
    <MuiStack
      direction={element.props.direction === 'horizontal' ? 'row' : 'column'}
      spacing={element.props.gap || 2}
    >
      {children}
    </MuiStack>
  ),
  Spacer: ({ element }) => <Box sx={{ height: element.props.size || 16 }} />,
  Divider: ({ element }) => <MuiDivider sx={element.props.sx} />,

  // Cards
  Card: ({ element, children }) => (
    <MuiCard variant={element.props.variant as 'outlined' | 'elevation' || 'elevation'} sx={element.props.sx}>
      {element.props.title && (
        <MuiCardHeader
          title={element.props.title as string}
          subheader={element.props.description as string}
        />
      )}
      <CardContent>{children}</CardContent>
      {element.props.actions && <CardActions>{element.props.actions as React.ReactNode}</CardActions>}
    </MuiCard>
  ),
  CardHeader: ({ element }) => (
    <MuiCardHeader title={element.props.title as string} subheader={element.props.subtitle as string} />
  ),
  CardBody: ({ element, children }) => <CardContent sx={element.props.sx}>{children}</CardContent>,
  CardFooter: ({ element, children }) => <CardActions sx={element.props.sx}>{children}</CardActions>,

  // Typography
  Heading: ({ element }) => (
    <Typography
      variant={`h${element.props.level || 2}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'}
      sx={element.props.sx}
    >
      {element.props.text as string}
    </Typography>
  ),
  Text: ({ element }) => (
    <Typography
      variant={(element.props.variant as 'body1' | 'body2') || 'body1'}
      color={element.props.color as string}
      sx={element.props.sx}
    >
      {element.props.content as string}
    </Typography>
  ),
  Link: ({ element }) => (
    <MuiLink href={element.props.href as string} sx={element.props.sx}>
      {element.props.text as string}
    </MuiLink>
  ),

  // Buttons
  Button: ({ element }) => (
    <MuiButton
      variant={(element.props.variant as 'contained' | 'outlined' | 'text') || 'contained'}
      color={(element.props.color as 'primary' | 'secondary') || 'primary'}
      size={(element.props.size as 'small' | 'medium' | 'large') || 'medium'}
      disabled={element.props.disabled as boolean}
      fullWidth={element.props.fullWidth as boolean}
      sx={element.props.sx}
    >
      {element.props.label as string}
    </MuiButton>
  ),
  IconButton: ({ element }) => (
    <MuiIconButton color={(element.props.color as 'primary') || 'primary'} sx={element.props.sx}>
      {element.props.icon as React.ReactNode}
    </MuiIconButton>
  ),
  ButtonGroup: ({ children }) => <MuiStack direction="row" spacing={1}>{children}</MuiStack>,

  // Forms
  Input: ({ element }) => (
    <TextField
      label={element.props.label as string}
      placeholder={element.props.placeholder as string}
      type={(element.props.type as string) || 'text'}
      variant="outlined"
      fullWidth
      size="small"
      sx={element.props.sx}
    />
  ),
  TextArea: ({ element }) => (
    <TextField
      label={element.props.label as string}
      placeholder={element.props.placeholder as string}
      multiline
      rows={element.props.rows || 4}
      variant="outlined"
      fullWidth
      sx={element.props.sx}
    />
  ),
  Select: ({ element }) => (
    <FormControl fullWidth size="small">
      {element.props.label && <InputLabel>{element.props.label as string}</InputLabel>}
      <MuiSelect label={element.props.label as string}>
        {(element.props.options as Array<{value: string; label: string}>)?.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  ),
  Checkbox: ({ element }) => (
    <FormControlLabel
      control={<MuiCheckbox />}
      label={element.props.label as string}
    />
  ),
  Radio: ({ element }) => (
    <FormControlLabel
      control={<MuiRadio value={element.props.value} />}
      label={element.props.label as string}
    />
  ),
  RadioGroup: ({ element, children }) => (
    <MuiRadioGroup row={element.props.orientation === 'horizontal'}>
      {children}
    </MuiRadioGroup>
  ),
  Switch: ({ element }) => (
    <FormControlLabel
      control={<MuiSwitch />}
      label={element.props.label as string}
    />
  ),
  Slider: ({ element }) => (
    <Box sx={{ px: 2 }}>
      <Typography gutterBottom>{element.props.label as string}</Typography>
      <MuiSlider
        min={element.props.min as number || 0}
        max={element.props.max as number || 100}
        valueLabelDisplay="auto"
      />
    </Box>
  ),

  // Data Display
  Badge: ({ element }) => (
    <Chip
      label={element.props.label as string}
      color={(element.props.variant as 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info') || 'default'}
      size="small"
    />
  ),
  Avatar: ({ element }) => (
    <MuiAvatar
      src={element.props.src as string}
      alt={element.props.name as string}
      sx={{ width: element.props.size || 40, height: element.props.size || 40 }}
    >
      {(element.props.name as string)?.charAt(0)}
    </MuiAvatar>
  ),
  AvatarGroup: ({ element, children }) => (
    <MuiAvatarGroup max={element.props.max as number || 4}>{children}</MuiAvatarGroup>
  ),
  Icon: ({ element }) => <span>{element.props.name as string}</span>,
  Image: ({ element }) => (
    <Box
      component="img"
      src={element.props.src as string}
      alt={element.props.alt as string}
      sx={{ maxWidth: '100%', borderRadius: 1, ...element.props.sx }}
    />
  ),
  List: ({ element, children }) => <Box component="ul" sx={element.props.sx}>{children}</Box>,
  ListItem: ({ element, children }) => <Box component="li" sx={element.props.sx}>{children}</Box>,
  Table: ({ element, children }) => <MuiTable sx={element.props.sx}>{children}</MuiTable>,
  TableHeader: ({ children }) => <TableHead>{children}</TableHead>,
  TableBody: ({ children }) => <MuiTableBody>{children}</MuiTableBody>,
  TableRow: ({ element, children }) => <MuiTableRow sx={element.props.sx}>{children}</MuiTableRow>,
  TableCell: ({ element, children }) => <MuiTableCell sx={element.props.sx}>{children}</MuiTableCell>,
  Metric: ({ element }) => (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h4" color="primary">{element.props.value as string}</Typography>
      <Typography variant="body2" color="text.secondary">{element.props.label as string}</Typography>
      {element.props.change && (
        <Typography variant="caption" color={(element.props.trend === 'up' ? 'success.main' : 'error.main')}>
          {element.props.change as string}
        </Typography>
      )}
    </Box>
  ),
  Progress: ({ element }) => (
    <LinearProgress
      variant="determinate"
      value={element.props.value as number || 0}
      sx={element.props.sx}
    />
  ),

  // Feedback
  Alert: ({ element }) => (
    <MuiAlert
      severity={(element.props.status as 'success' | 'info' | 'warning' | 'error') || 'info'}
      sx={element.props.sx}
    >
      {element.props.title && <strong>{element.props.title as string}</strong>}
      {element.props.message as string}
    </MuiAlert>
  ),
  Toast: ({ element }) => (
    <MuiAlert severity={(element.props.status as 'success' | 'error') || 'info'}>
      {element.props.title as string}
    </MuiAlert>
  ),
  Skeleton: ({ element }) => (
    <MuiSkeleton
      variant={(element.props.variant as 'text' | 'rectangular' | 'circular') || 'rectangular'}
      width={element.props.width}
      height={element.props.height || 40}
    />
  ),
  Spinner: ({ element }) => (
    <CircularProgress size={element.props.size || 40} />
  ),
  EmptyState: ({ element }) => (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <Typography variant="h6" color="text.secondary">{element.props.title as string}</Typography>
      <Typography variant="body2" color="text.secondary">{element.props.description as string}</Typography>
    </Box>
  ),

  // Navigation
  Tabs: ({ element, children }) => (
    <Box>
      <MuiTabs value={0}>{children}</MuiTabs>
    </Box>
  ),
  TabList: ({ children }) => <MuiTabs value={0}>{children}</MuiTabs>,
  Tab: ({ element }) => <MuiTab label={element.props.label as string} />,
  TabPanel: ({ element, children }) => <Box sx={{ py: 2 }}>{children}</Box>,
  Breadcrumb: ({ element, children }) => <Breadcrumbs sx={element.props.sx}>{children}</Breadcrumbs>,
  BreadcrumbItem: ({ element }) => (
    <MuiLink href={element.props.href as string}>{element.props.label as string}</MuiLink>
  ),
  Pagination: ({ element }) => (
    <MuiPagination
      count={element.props.totalPages as number || 10}
      page={element.props.currentPage as number || 1}
    />
  ),
  NavMenu: ({ element, children }) => <MuiStack direction="row" spacing={2}>{children}</MuiStack>,
  NavItem: ({ element }) => (
    <MuiButton href={element.props.href as string} variant="text">
      {element.props.label as string}
    </MuiButton>
  ),

  // Overlays
  Modal: ({ element, children }) => (
    <Dialog open={true}>
      {element.props.title && <DialogTitle>{element.props.title as string}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
    </Dialog>
  ),
  Drawer: ({ element, children }) => (
    <MuiDrawer anchor={(element.props.placement as 'left' | 'right') || 'right'} open={true}>
      <Box sx={{ width: 300, p: 2 }}>
        {element.props.title && <Typography variant="h6">{element.props.title as string}</Typography>}
        {children}
      </Box>
    </MuiDrawer>
  ),
  Tooltip: ({ element, children }) => (
    <MuiTooltip title={element.props.content as string}>{children as React.ReactElement}</MuiTooltip>
  ),
  Popover: ({ children }) => <Box>{children}</Box>,
  Dropdown: ({ element, children }) => (
    <Box>
      <MuiButton>{element.props.trigger as string}</MuiButton>
      <Menu open={false}>{children}</Menu>
    </Box>
  ),
  DropdownItem: ({ element }) => <MenuItem>{element.props.label as string}</MenuItem>,

  // Collapse
  Accordion: ({ element, children }) => <Box>{children}</Box>,
  AccordionItem: ({ element, children }) => (
    <MuiAccordion>
      <AccordionSummary>{element.props.title as string}</AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </MuiAccordion>
  ),
  Collapsible: ({ element, children }) => <Box>{children}</Box>,

  // Specialized
  Chart: ({ element }) => (
    <Box sx={{ height: element.props.height || 200, bgcolor: 'grey.100', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography color="text.secondary">Chart: {element.props.type as string}</Typography>
    </Box>
  ),
  Calendar: () => <Box sx={{ p: 2, bgcolor: 'grey.100' }}>Calendar</Box>,
  DatePicker: ({ element }) => (
    <TextField type="date" label={element.props.label as string} fullWidth size="small" />
  ),
  FileUpload: ({ element }) => (
    <MuiButton variant="outlined" component="label">
      {element.props.label || 'Upload File'}
      <input type="file" hidden accept={element.props.accept as string} />
    </MuiButton>
  ),
  Rating: ({ element }) => <MuiRating value={element.props.value as number || 0} />,
  TagInput: ({ element }) => (
    <TextField label={element.props.label as string} placeholder={element.props.placeholder as string} fullWidth size="small" />
  ),
  ColorPicker: ({ element }) => (
    <TextField type="color" label={element.props.label as string} sx={{ width: 100 }} />
  ),
  Timeline: ({ element, children }) => <Box>{children}</Box>,
  TimelineItem: ({ element }) => (
    <Box sx={{ display: 'flex', gap: 2, py: 1 }}>
      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main', mt: 1 }} />
      <Box>
        <Typography variant="body2">{element.props.title as string}</Typography>
        <Typography variant="caption" color="text.secondary">{element.props.time as string}</Typography>
      </Box>
    </Box>
  ),
  Stepper: ({ element, children }) => (
    <MuiStepper activeStep={element.props.activeStep as number || 0}>
      {children}
    </MuiStepper>
  ),
  Step: ({ element }) => (
    <MuiStep>
      <StepLabel>{element.props.label as string}</StepLabel>
    </MuiStep>
  ),
  Code: ({ element }) => (
    <Box component="pre" sx={{ p: 2, bgcolor: 'grey.900', color: 'grey.100', borderRadius: 1, overflow: 'auto' }}>
      <code>{element.props.content as string}</code>
    </Box>
  ),
  Kbd: ({ element }) => (
    <Box component="kbd" sx={{ px: 1, py: 0.5, bgcolor: 'grey.200', borderRadius: 0.5, fontFamily: 'monospace' }}>
      {element.props.keys as string}
    </Box>
  ),
  Quote: ({ element }) => (
    <Box sx={{ borderLeft: 4, borderColor: 'primary.main', pl: 2, py: 1, fontStyle: 'italic' }}>
      <Typography>{element.props.content as string}</Typography>
      {element.props.author && <Typography variant="caption">— {element.props.author as string}</Typography>}
    </Box>
  ),
  Stat: ({ element }) => (
    <Box>
      <Typography variant="h4">{element.props.value as string}</Typography>
      <Typography variant="body2" color="text.secondary">{element.props.label as string}</Typography>
    </Box>
  ),
  Tag: ({ element }) => <Chip label={element.props.label as string} size="small" />,
};

// Wrap components in ThemeProvider
const MuiWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export const muiRegistry: RegistryDefinition = {
  name: 'mui',
  displayName: 'Material UI',
  description: 'Google Material Design components for React',
  framework: 'mui',
  components: muiComponents,
  theme: muiTheme,
};

export { muiComponents, muiTheme };
```

**Step 2: Create index.ts**

```typescript
// src/components/registries/mui/index.ts
export { muiRegistry, muiComponents, muiTheme } from './registry';
```

**Step 3: Update registries index**

Modify `src/components/registries/index.ts` to add:
```typescript
export { muiRegistry, muiComponents, muiTheme } from './mui';
```

**Step 4: Update UIFramework type**

Ensure `src/types/index.ts` includes 'mui' in UIFramework union.

**Step 5: Test**

Run: `npm run build`
Expected: No TypeScript errors

---

### Task 2: Create Chakra UI Registry

**Files:**
- Create: `src/components/registries/chakra/registry.tsx`
- Create: `src/components/registries/chakra/index.ts`
- Modify: `src/components/registries/index.ts`

**Step 1: Create Chakra registry**

```tsx
// src/components/registries/chakra/registry.tsx
'use client';

import * as React from 'react';
import type { ComponentRegistry, ComponentRenderProps } from '@json-render/react';
import type { RegistryDefinition, RegistryTheme } from '@/lib/registry';

// Chakra UI v3 uses a different import pattern
import {
  Box, Container as ChakraContainer, Stack as ChakraStack, Grid as ChakraGrid, GridItem,
  Flex, Spacer as ChakraSpacer, Divider as ChakraDivider,
  Card as ChakraCard, Heading as ChakraHeading, Text as ChakraText, Link as ChakraLink,
  Button as ChakraButton, IconButton as ChakraIconButton,
  Input as ChakraInput, Textarea as ChakraTextarea, NativeSelect,
  Checkbox as ChakraCheckbox, RadioGroup as ChakraRadioGroup, Radio as ChakraRadio,
  Switch as ChakraSwitch, Slider as ChakraSlider,
  Avatar as ChakraAvatar, Badge as ChakraBadge, Image as ChakraImage,
  Table as ChakraTable, Progress as ChakraProgress,
  Alert as ChakraAlert, Skeleton as ChakraSkeleton, Spinner as ChakraSpinner,
  Tabs as ChakraTabs, Breadcrumb as ChakraBreadcrumb,
  Accordion as ChakraAccordion,
  Rating as ChakraRating, Tag as ChakraTag, Code as ChakraCode, Kbd as ChakraKbd,
  Blockquote, Stat as ChakraStat, EmptyState as ChakraEmptyState,
  Steps as ChakraStepper, Timeline as ChakraTimeline,
} from '@chakra-ui/react';

const chakraTheme: RegistryTheme = {
  name: 'Chakra Default',
  colors: {
    primary: '#3182ce',
    secondary: '#805ad5',
    accent: '#38b2ac',
    background: '#ffffff',
    foreground: '#1a202c',
    muted: '#e2e8f0',
    success: '#38a169',
    warning: '#dd6b20',
    error: '#e53e3e',
    info: '#3182ce',
  },
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
    mono: 'Menlo, monospace',
  },
  borderRadius: '0.375rem',
  shadows: true,
};

const chakraComponents: ComponentRegistry = {
  // Layout
  Container: ({ element, children }) => (
    <ChakraContainer maxW={element.props.maxWidth || 'container.lg'} px={element.props.padding || 4}>
      {children}
    </ChakraContainer>
  ),
  Row: ({ element, children }) => (
    <Flex direction="row" gap={element.props.gap || 4} align={element.props.align}>
      {children}
    </Flex>
  ),
  Column: ({ element, children }) => (
    <Flex direction="column" gap={element.props.gap || 4}>
      {children}
    </Flex>
  ),
  Grid: ({ element, children }) => (
    <ChakraGrid templateColumns={`repeat(${element.props.columns || 3}, 1fr)`} gap={element.props.gap || 4}>
      {React.Children.map(children, (child) => <GridItem>{child}</GridItem>)}
    </ChakraGrid>
  ),
  Stack: ({ element, children }) => (
    <ChakraStack direction={element.props.direction === 'horizontal' ? 'row' : 'column'} gap={element.props.gap || 4}>
      {children}
    </ChakraStack>
  ),
  Spacer: () => <ChakraSpacer />,
  Divider: ({ element }) => <ChakraDivider orientation={element.props.orientation} />,

  // Cards
  Card: ({ element, children }) => (
    <ChakraCard.Root variant={element.props.variant || 'outline'}>
      {(element.props.title || element.props.description) && (
        <ChakraCard.Header>
          {element.props.title && <ChakraCard.Title>{element.props.title as string}</ChakraCard.Title>}
          {element.props.description && <ChakraCard.Description>{element.props.description as string}</ChakraCard.Description>}
        </ChakraCard.Header>
      )}
      <ChakraCard.Body>{children}</ChakraCard.Body>
    </ChakraCard.Root>
  ),
  CardHeader: ({ element }) => (
    <ChakraCard.Header>
      <ChakraCard.Title>{element.props.title as string}</ChakraCard.Title>
    </ChakraCard.Header>
  ),
  CardBody: ({ element, children }) => <ChakraCard.Body>{children}</ChakraCard.Body>,
  CardFooter: ({ element, children }) => <ChakraCard.Footer>{children}</ChakraCard.Footer>,

  // Typography
  Heading: ({ element }) => (
    <ChakraHeading as={`h${element.props.level || 2}` as 'h1' | 'h2' | 'h3'} size={element.props.size}>
      {element.props.text as string}
    </ChakraHeading>
  ),
  Text: ({ element }) => (
    <ChakraText fontSize={element.props.size} color={element.props.color}>
      {element.props.content as string}
    </ChakraText>
  ),
  Link: ({ element }) => (
    <ChakraLink href={element.props.href as string} color="blue.500">
      {element.props.text as string}
    </ChakraLink>
  ),

  // Buttons
  Button: ({ element }) => (
    <ChakraButton
      variant={element.props.variant || 'solid'}
      colorPalette={element.props.colorScheme || 'blue'}
      size={element.props.size || 'md'}
      disabled={element.props.disabled as boolean}
      width={element.props.fullWidth ? '100%' : undefined}
    >
      {element.props.label as string}
    </ChakraButton>
  ),
  IconButton: ({ element }) => (
    <ChakraIconButton aria-label={element.props.label as string} variant={element.props.variant}>
      {element.props.icon as React.ReactNode}
    </ChakraIconButton>
  ),
  ButtonGroup: ({ children }) => <Flex gap={2}>{children}</Flex>,

  // Forms
  Input: ({ element }) => (
    <Box>
      {element.props.label && <ChakraText mb={1} fontSize="sm" fontWeight="medium">{element.props.label as string}</ChakraText>}
      <ChakraInput
        placeholder={element.props.placeholder as string}
        type={(element.props.type as string) || 'text'}
        size="md"
      />
    </Box>
  ),
  TextArea: ({ element }) => (
    <Box>
      {element.props.label && <ChakraText mb={1} fontSize="sm" fontWeight="medium">{element.props.label as string}</ChakraText>}
      <ChakraTextarea placeholder={element.props.placeholder as string} />
    </Box>
  ),
  Select: ({ element }) => (
    <Box>
      {element.props.label && <ChakraText mb={1} fontSize="sm" fontWeight="medium">{element.props.label as string}</ChakraText>}
      <NativeSelect.Root>
        <NativeSelect.Field placeholder={element.props.placeholder as string}>
          {(element.props.options as Array<{value: string; label: string}>)?.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </NativeSelect.Field>
      </NativeSelect.Root>
    </Box>
  ),
  Checkbox: ({ element }) => (
    <ChakraCheckbox.Root>
      <ChakraCheckbox.HiddenInput />
      <ChakraCheckbox.Control />
      <ChakraCheckbox.Label>{element.props.label as string}</ChakraCheckbox.Label>
    </ChakraCheckbox.Root>
  ),
  Radio: ({ element }) => (
    <ChakraRadio value={element.props.value as string}>{element.props.label as string}</ChakraRadio>
  ),
  RadioGroup: ({ element, children }) => (
    <ChakraRadioGroup.Root>
      <ChakraStack direction={element.props.orientation === 'horizontal' ? 'row' : 'column'}>
        {children}
      </ChakraStack>
    </ChakraRadioGroup.Root>
  ),
  Switch: ({ element }) => (
    <ChakraSwitch.Root>
      <ChakraSwitch.HiddenInput />
      <ChakraSwitch.Control />
      {element.props.label && <ChakraSwitch.Label>{element.props.label as string}</ChakraSwitch.Label>}
    </ChakraSwitch.Root>
  ),
  Slider: ({ element }) => (
    <Box>
      {element.props.label && <ChakraText mb={1} fontSize="sm">{element.props.label as string}</ChakraText>}
      <ChakraSlider.Root min={element.props.min as number || 0} max={element.props.max as number || 100}>
        <ChakraSlider.Control>
          <ChakraSlider.Track>
            <ChakraSlider.Range />
          </ChakraSlider.Track>
          <ChakraSlider.Thumb index={0} />
        </ChakraSlider.Control>
      </ChakraSlider.Root>
    </Box>
  ),

  // Data Display
  Badge: ({ element }) => (
    <ChakraBadge colorPalette={element.props.variant || 'gray'}>
      {element.props.label as string}
    </ChakraBadge>
  ),
  Avatar: ({ element }) => (
    <ChakraAvatar.Root size={element.props.size || 'md'}>
      <ChakraAvatar.Image src={element.props.src as string} />
      <ChakraAvatar.Fallback>{(element.props.name as string)?.charAt(0)}</ChakraAvatar.Fallback>
    </ChakraAvatar.Root>
  ),
  AvatarGroup: ({ element, children }) => <Flex>{children}</Flex>,
  Icon: ({ element }) => <span>{element.props.name as string}</span>,
  Image: ({ element }) => (
    <ChakraImage
      src={element.props.src as string}
      alt={element.props.alt as string}
      borderRadius="md"
    />
  ),
  List: ({ element, children }) => <Box as="ul" listStyleType="disc" pl={4}>{children}</Box>,
  ListItem: ({ element, children }) => <Box as="li">{children}</Box>,
  Table: ({ element, children }) => (
    <ChakraTable.Root>
      {children}
    </ChakraTable.Root>
  ),
  TableHeader: ({ children }) => <ChakraTable.Header>{children}</ChakraTable.Header>,
  TableBody: ({ children }) => <ChakraTable.Body>{children}</ChakraTable.Body>,
  TableRow: ({ element, children }) => <ChakraTable.Row>{children}</ChakraTable.Row>,
  TableCell: ({ element, children }) => <ChakraTable.Cell>{children}</ChakraTable.Cell>,
  Metric: ({ element }) => (
    <Box textAlign="center">
      <ChakraText fontSize="3xl" fontWeight="bold" color="blue.500">{element.props.value as string}</ChakraText>
      <ChakraText fontSize="sm" color="gray.500">{element.props.label as string}</ChakraText>
    </Box>
  ),
  Progress: ({ element }) => (
    <ChakraProgress.Root value={element.props.value as number || 0}>
      <ChakraProgress.Track>
        <ChakraProgress.Range />
      </ChakraProgress.Track>
    </ChakraProgress.Root>
  ),

  // Feedback
  Alert: ({ element }) => (
    <ChakraAlert.Root status={element.props.status || 'info'}>
      <ChakraAlert.Indicator />
      <Box>
        {element.props.title && <ChakraAlert.Title>{element.props.title as string}</ChakraAlert.Title>}
        <ChakraAlert.Description>{element.props.message as string}</ChakraAlert.Description>
      </Box>
    </ChakraAlert.Root>
  ),
  Toast: ({ element }) => (
    <ChakraAlert.Root status={element.props.status || 'info'}>
      <ChakraAlert.Title>{element.props.title as string}</ChakraAlert.Title>
    </ChakraAlert.Root>
  ),
  Skeleton: ({ element }) => <ChakraSkeleton height={element.props.height || '20px'} />,
  Spinner: ({ element }) => <ChakraSpinner size={element.props.size || 'md'} />,
  EmptyState: ({ element }) => (
    <ChakraEmptyState.Root>
      <ChakraEmptyState.Content>
        <ChakraEmptyState.Title>{element.props.title as string}</ChakraEmptyState.Title>
        <ChakraEmptyState.Description>{element.props.description as string}</ChakraEmptyState.Description>
      </ChakraEmptyState.Content>
    </ChakraEmptyState.Root>
  ),

  // Navigation
  Tabs: ({ element, children }) => (
    <ChakraTabs.Root defaultValue={element.props.defaultValue as string}>
      {children}
    </ChakraTabs.Root>
  ),
  TabList: ({ children }) => <ChakraTabs.List>{children}</ChakraTabs.List>,
  Tab: ({ element }) => (
    <ChakraTabs.Trigger value={element.props.value as string}>
      {element.props.label as string}
    </ChakraTabs.Trigger>
  ),
  TabPanel: ({ element, children }) => (
    <ChakraTabs.Content value={element.props.value as string}>{children}</ChakraTabs.Content>
  ),
  Breadcrumb: ({ element, children }) => (
    <ChakraBreadcrumb.Root>{children}</ChakraBreadcrumb.Root>
  ),
  BreadcrumbItem: ({ element }) => (
    <ChakraBreadcrumb.Link href={element.props.href as string}>
      {element.props.label as string}
    </ChakraBreadcrumb.Link>
  ),
  Pagination: ({ element }) => (
    <Flex gap={2}>
      <ChakraButton size="sm" variant="outline">Prev</ChakraButton>
      <ChakraButton size="sm" variant="solid">1</ChakraButton>
      <ChakraButton size="sm" variant="outline">Next</ChakraButton>
    </Flex>
  ),
  NavMenu: ({ element, children }) => <Flex gap={4}>{children}</Flex>,
  NavItem: ({ element }) => (
    <ChakraLink href={element.props.href as string}>{element.props.label as string}</ChakraLink>
  ),

  // Overlays - Simplified versions
  Modal: ({ element, children }) => (
    <Box p={6} bg="white" borderRadius="md" boxShadow="lg">
      {element.props.title && <ChakraHeading size="md" mb={4}>{element.props.title as string}</ChakraHeading>}
      {children}
    </Box>
  ),
  Drawer: ({ element, children }) => (
    <Box w="300px" p={4} bg="white" boxShadow="lg">
      {element.props.title && <ChakraHeading size="md" mb={4}>{element.props.title as string}</ChakraHeading>}
      {children}
    </Box>
  ),
  Tooltip: ({ element, children }) => <Box title={element.props.content as string}>{children}</Box>,
  Popover: ({ children }) => <Box>{children}</Box>,
  Dropdown: ({ element, children }) => (
    <Box>
      <ChakraButton>{element.props.trigger as string}</ChakraButton>
      <Box display="none">{children}</Box>
    </Box>
  ),
  DropdownItem: ({ element }) => (
    <Box py={2} px={4} cursor="pointer" _hover={{ bg: 'gray.100' }}>
      {element.props.label as string}
    </Box>
  ),

  // Collapse
  Accordion: ({ element, children }) => (
    <ChakraAccordion.Root>{children}</ChakraAccordion.Root>
  ),
  AccordionItem: ({ element, children }) => (
    <ChakraAccordion.Item value={element.props.value as string || 'item'}>
      <ChakraAccordion.ItemTrigger>{element.props.title as string}</ChakraAccordion.ItemTrigger>
      <ChakraAccordion.ItemContent>{children}</ChakraAccordion.ItemContent>
    </ChakraAccordion.Item>
  ),
  Collapsible: ({ element, children }) => <Box>{children}</Box>,

  // Specialized
  Chart: ({ element }) => (
    <Box h={element.props.height || '200px'} bg="gray.100" display="flex" alignItems="center" justifyContent="center">
      <ChakraText color="gray.500">Chart: {element.props.type as string}</ChakraText>
    </Box>
  ),
  Calendar: () => <Box p={4} bg="gray.100">Calendar</Box>,
  DatePicker: ({ element }) => <ChakraInput type="date" />,
  FileUpload: ({ element }) => (
    <ChakraButton as="label" cursor="pointer">
      {element.props.label || 'Upload File'}
      <input type="file" hidden />
    </ChakraButton>
  ),
  Rating: ({ element }) => (
    <ChakraRating.Root value={element.props.value as number || 0} count={5}>
      <ChakraRating.Control>
        {[1, 2, 3, 4, 5].map((i) => (
          <ChakraRating.Item key={i} index={i}>
            <ChakraRating.ItemIndicator />
          </ChakraRating.Item>
        ))}
      </ChakraRating.Control>
    </ChakraRating.Root>
  ),
  TagInput: ({ element }) => <ChakraInput placeholder={element.props.placeholder as string} />,
  ColorPicker: ({ element }) => <ChakraInput type="color" w="80px" />,
  Timeline: ({ element, children }) => (
    <ChakraTimeline.Root>{children}</ChakraTimeline.Root>
  ),
  TimelineItem: ({ element }) => (
    <ChakraTimeline.Item>
      <ChakraTimeline.Connector />
      <ChakraTimeline.Content>
        <ChakraText fontWeight="medium">{element.props.title as string}</ChakraText>
        <ChakraText fontSize="sm" color="gray.500">{element.props.time as string}</ChakraText>
      </ChakraTimeline.Content>
    </ChakraTimeline.Item>
  ),
  Stepper: ({ element, children }) => (
    <ChakraStepper.Root step={element.props.activeStep as number || 0}>
      {children}
    </ChakraStepper.Root>
  ),
  Step: ({ element }) => (
    <ChakraStepper.Item>
      <ChakraStepper.Trigger>
        <ChakraStepper.Indicator />
        <ChakraStepper.Title>{element.props.label as string}</ChakraStepper.Title>
      </ChakraStepper.Trigger>
      <ChakraStepper.Separator />
    </ChakraStepper.Item>
  ),
  Code: ({ element }) => (
    <ChakraCode display="block" p={4} borderRadius="md" bg="gray.800" color="gray.100">
      {element.props.content as string}
    </ChakraCode>
  ),
  Kbd: ({ element }) => <ChakraKbd>{element.props.keys as string}</ChakraKbd>,
  Quote: ({ element }) => (
    <Blockquote.Root>
      <Blockquote.Content>{element.props.content as string}</Blockquote.Content>
      {element.props.author && <Blockquote.Caption>— {element.props.author as string}</Blockquote.Caption>}
    </Blockquote.Root>
  ),
  Stat: ({ element }) => (
    <ChakraStat.Root>
      <ChakraStat.Label>{element.props.label as string}</ChakraStat.Label>
      <ChakraStat.ValueText>{element.props.value as string}</ChakraStat.ValueText>
    </ChakraStat.Root>
  ),
  Tag: ({ element }) => (
    <ChakraTag.Root>
      <ChakraTag.Label>{element.props.label as string}</ChakraTag.Label>
    </ChakraTag.Root>
  ),
};

export const chakraRegistry: RegistryDefinition = {
  name: 'chakra',
  displayName: 'Chakra UI',
  description: 'Simple, modular and accessible component library',
  framework: 'chakra' as any,
  components: chakraComponents,
  theme: chakraTheme,
};

export { chakraComponents, chakraTheme };
```

**Step 2: Create index.ts and update exports**

Same pattern as MUI registry.

---

### Task 3: Update Page to Include New Registries

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/types/index.ts`

**Step 1: Add imports and registries**

```typescript
// In src/app/page.tsx, update imports
import { shadcnRegistry } from '@/components/registries/shadcn';
import { tailwindRegistry } from '@/components/registries/tailwind';
import { flowbiteRegistry } from '@/components/registries/flowbite';
import { muiRegistry } from '@/components/registries/mui';
import { chakraRegistry } from '@/components/registries/chakra';

// Update RegistryProvider
<RegistryProvider
  defaultFramework="shadcn"
  registries={[shadcnRegistry, tailwindRegistry, flowbiteRegistry, muiRegistry, chakraRegistry]}
>
```

**Step 2: Update UIFramework type**

```typescript
// src/types/index.ts
export type UIFramework = 'shadcn' | 'tailwind' | 'flowbite' | 'mui' | 'chakra' | 'magic' | 'aceternity';
```

---

### Task 4: Fix VisibilityProvider and Hook Order

**Files:**
- Verify: `src/components/builder/ui-renderer.tsx` (already fixed)

**Step 1: Verify the fix is in place**

The UIRenderer should have:
1. `useMemo` before conditional returns
2. `VisibilityProvider` wrapping the renderer

---

## Phase 2: LLM-Powered Generation (Tasks 5-8)

### Task 5: Create AI Generation API Route

**Files:**
- Create: `src/app/api/generate/route.ts`
- Create: `src/lib/ai/ui-generator.ts`

**Step 1: Create the AI generation module**

```typescript
// src/lib/ai/ui-generator.ts
import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import type { UITree, UIElement } from '@json-render/core';

const UIElementSchema = z.object({
  key: z.string(),
  type: z.string(),
  props: z.record(z.unknown()),
  children: z.array(z.string()).optional(),
});

const UITreeSchema = z.object({
  root: z.string(),
  elements: z.record(UIElementSchema),
});

const GenerationResultSchema = z.object({
  tree: UITreeSchema,
  explanation: z.string(),
  suggestedStyles: z.record(z.string()).optional(),
});

export async function generateUIFromPrompt(
  prompt: string,
  context?: {
    currentTree?: UITree;
    framework?: string;
    conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>;
  }
): Promise<{ tree: UITree; explanation: string; suggestedStyles?: Record<string, string> }> {
  const systemPrompt = `You are a UI generation assistant. Generate json-render compatible UI trees.

Available component types:
- Layout: Container, Row, Column, Grid, Stack, Spacer, Divider
- Cards: Card, CardHeader, CardBody, CardFooter
- Typography: Heading, Text, Link
- Buttons: Button, IconButton, ButtonGroup
- Forms: Input, TextArea, Select, Checkbox, Radio, RadioGroup, Switch, Slider
- Data Display: Badge, Avatar, AvatarGroup, Icon, Image, List, ListItem, Table, TableHeader, TableBody, TableRow, TableCell, Metric, Progress
- Feedback: Alert, Toast, Skeleton, Spinner, EmptyState
- Navigation: Tabs, TabList, Tab, TabPanel, Breadcrumb, BreadcrumbItem, Pagination, NavMenu, NavItem

Props guidelines:
- Heading: { level: 1-6, text: string }
- Text: { content: string, size?: 'sm'|'md'|'lg', color?: string }
- Button: { label: string, variant?: 'solid'|'outline'|'ghost', size?: 'sm'|'md'|'lg' }
- Input: { label?: string, placeholder?: string, type?: string }
- Card: { title?: string, description?: string }
- Container: { maxWidth?: 'sm'|'md'|'lg'|'xl' }
- Grid: { columns?: number, gap?: number }
- Stack: { direction?: 'vertical'|'horizontal', gap?: number }
- Metric: { value: string, label: string, change?: string, trend?: 'up'|'down' }

Generate a complete, functional UI tree. Every element needs a unique key.
${context?.currentTree ? `\nCurrent UI tree to modify:\n${JSON.stringify(context.currentTree, null, 2)}` : ''}`;

  const result = await generateObject({
    model: google('gemini-2.0-flash'),
    schema: GenerationResultSchema,
    system: systemPrompt,
    prompt: prompt,
  });

  return result.object;
}

export async function refineUI(
  instruction: string,
  currentTree: UITree,
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>
): Promise<{ tree: UITree; explanation: string }> {
  return generateUIFromPrompt(instruction, { currentTree, conversationHistory });
}
```

**Step 2: Create the API route**

```typescript
// src/app/api/generate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generateUIFromPrompt, refineUI } from '@/lib/ai/ui-generator';
import type { UITree } from '@json-render/core';

interface GenerateRequest {
  prompt: string;
  currentTree?: UITree;
  conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>;
  framework?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerateRequest = await request.json();
    const { prompt, currentTree, conversationHistory, framework } = body;

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const result = currentTree
      ? await refineUI(prompt, currentTree, conversationHistory || [])
      : await generateUIFromPrompt(prompt, { framework, conversationHistory });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Generation failed' },
      { status: 500 }
    );
  }
}
```

---

### Task 6: Create Chat Interface Component

**Files:**
- Create: `src/components/builder/chat-panel.tsx`

**Step 1: Create the chat panel**

```tsx
// src/components/builder/chat-panel.tsx
'use client';

import * as React from 'react';
import type { UITree } from '@json-render/core';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  tree?: UITree;
  timestamp: Date;
}

interface ChatPanelProps {
  currentTree: UITree | null;
  onTreeUpdate: (tree: UITree) => void;
  className?: string;
}

export function ChatPanel({ currentTree, onTreeUpdate, className }: ChatPanelProps) {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: input,
          currentTree,
          conversationHistory: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) throw new Error('Generation failed');

      const result = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: result.explanation || 'UI updated successfully.',
        tree: result.tree,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      if (result.tree) {
        onTreeUpdate(result.tree);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Error: ${error instanceof Error ? error.message : 'Failed to generate'}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            <p className="text-sm">Start by describing the UI you want to create.</p>
            <p className="text-xs mt-2">Examples:</p>
            <ul className="text-xs mt-1 space-y-1">
              <li>"Create a landing page for a restaurant"</li>
              <li>"Add a contact form with name, email, and message"</li>
              <li>"Make the header darker and add a logo"</li>
            </ul>
          </div>
        )}
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'flex',
              message.role === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            <div
              className={cn(
                'max-w-[80%] rounded-lg px-4 py-2',
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              )}
            >
              <p className="text-sm">{message.content}</p>
              <span className="text-xs opacity-50">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg px-4 py-2">
              <div className="flex items-center gap-2">
                <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                <span className="text-sm">Generating...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe what you want to create or change..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
```

---

### Task 7: Integrate Chat Panel into Main Page

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Add chat mode**

Add a new tab mode 'chat' and integrate the ChatPanel component alongside the existing modes.

---

### Task 8: Add Tailwind Styling Support

**Files:**
- Modify: `src/lib/ai/ui-generator.ts`

**Step 1: Enhance prompt to include styling**

Update the system prompt to understand Tailwind class requests and include className props in generated elements.

---

## Phase 3: Code Export (Tasks 9-10)

### Task 9: Create Code Export Utility

**Files:**
- Create: `src/lib/export/react-exporter.ts`

**Step 1: Create the exporter**

```typescript
// src/lib/export/react-exporter.ts
import type { UITree, UIElement } from '@json-render/core';

export function exportToReact(tree: UITree, framework: string = 'shadcn'): string {
  const imports = new Set<string>();

  function getImportPath(type: string, framework: string): string {
    switch (framework) {
      case 'mui':
        return `@mui/material`;
      case 'chakra':
        return `@chakra-ui/react`;
      default:
        return `@/components/ui`;
    }
  }

  function elementToJSX(key: string, indent: number = 2): string {
    const element = tree.elements[key];
    if (!element) return '';

    const spaces = ' '.repeat(indent);
    const componentName = element.type;
    imports.add(componentName);

    const propsString = Object.entries(element.props || {})
      .filter(([_, v]) => v !== undefined)
      .map(([k, v]) => {
        if (typeof v === 'string') return `${k}="${v}"`;
        if (typeof v === 'boolean') return v ? k : '';
        if (typeof v === 'number') return `${k}={${v}}`;
        return `${k}={${JSON.stringify(v)}}`;
      })
      .filter(Boolean)
      .join(' ');

    const hasChildren = element.children && element.children.length > 0;
    const childrenJSX = hasChildren
      ? element.children!.map((childKey) => elementToJSX(childKey, indent + 2)).join('\n')
      : '';

    if (hasChildren) {
      return `${spaces}<${componentName}${propsString ? ' ' + propsString : ''}>
${childrenJSX}
${spaces}</${componentName}>`;
    }

    return `${spaces}<${componentName}${propsString ? ' ' + propsString : ''} />`;
  }

  const jsxContent = elementToJSX(tree.root);
  const importStatement = `import { ${Array.from(imports).join(', ')} } from '${getImportPath('', framework)}';`;

  return `${importStatement}

export default function GeneratedUI() {
  return (
${jsxContent}
  );
}`;
}
```

---

### Task 10: Add Export Button to UI

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Add export functionality**

Add a button that triggers the code export and displays it in a modal or copies to clipboard.

---

## Phase 4: Enhanced Test Cases (Tasks 11-13)

### Task 11: Add E-commerce Test Cases

**Files:**
- Modify: `src/lib/tests/test-cases.ts`

Add 10 e-commerce test cases: product catalog, product detail, cart, checkout, etc.

---

### Task 12: Add Admin Panel Test Cases

**Files:**
- Modify: `src/lib/tests/test-cases.ts`

Add 10 admin panel test cases: CRUD tables, settings panels, user management, etc.

---

### Task 13: Add Complex Landing Page Test Cases

**Files:**
- Modify: `src/lib/tests/test-cases.ts`

Add landing pages for: restaurant, car dealership, SaaS product, portfolio, etc.

---

## Phase 5: Asset Integration (Tasks 14-16)

### Task 14: Add Icons MCP Integration

**Files:**
- Modify: `src/lib/mcp/types.ts`
- Modify: `src/lib/mcp/mcp-client.ts`

Add better-icons or lucide-icons-mcp server integration.

---

### Task 15: Add Images MCP Integration

**Files:**
- Modify: `src/lib/mcp/types.ts`
- Modify: `src/lib/mcp/mcp-client.ts`

Add Unsplash Smart MCP or Pexels MCP integration for stock images.

---

### Task 16: Add Colors MCP Integration

**Files:**
- Modify: `src/lib/mcp/types.ts`
- Modify: `src/lib/mcp/mcp-client.ts`

Add Coolors MCP for color palette generation.

---

## Execution Order

**Parallel Group 1 (Core Registries):**
- Task 1: MUI Registry
- Task 2: Chakra Registry

**Parallel Group 2 (After Group 1):**
- Task 3: Update Page with Registries
- Task 4: Verify Rendering Fixes

**Parallel Group 3 (AI Generation):**
- Task 5: AI Generation API
- Task 6: Chat Panel Component

**Sequential (After Group 3):**
- Task 7: Integrate Chat
- Task 8: Tailwind Styling

**Parallel Group 4 (Export & Tests):**
- Task 9: Code Export
- Task 10: Export UI
- Task 11: E-commerce Tests
- Task 12: Admin Tests
- Task 13: Landing Page Tests

**Parallel Group 5 (MCP Integration):**
- Task 14: Icons MCP
- Task 15: Images MCP
- Task 16: Colors MCP

---

## Success Criteria

1. ✅ Framework switcher shows all 5+ frameworks
2. ✅ Test cases render correctly in all frameworks
3. ✅ Chat-based generation creates real UIs
4. ✅ Iterative editing works (modify existing UI)
5. ✅ Code export produces working React components
6. ✅ 70+ diverse test cases available
7. ✅ Assets (icons, images) can be integrated
