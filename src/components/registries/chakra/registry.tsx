'use client';

/**
 * Chakra UI v3 Registry
 * Maps json-render catalog components to Chakra UI v3 implementations
 *
 * Chakra UI v3 uses compound component patterns with namespaced exports:
 * - Card.Root, Card.Header, Card.Body, Card.Footer
 * - Alert.Root, Alert.Indicator, Alert.Title, Alert.Description
 * - etc.
 */

import * as React from 'react';
import type { ComponentRegistry, ComponentRenderProps } from '@json-render/react';
import type { RegistryDefinition, RegistryTheme } from '@/lib/registry';

// Import Chakra UI v3 components
import {
  Box,
  Flex,
  Grid as ChakraGrid,
  Stack as ChakraStack,
  HStack,
  VStack,
  Spacer as ChakraSpacer,
  Container as ChakraContainer,
  Center,
  // Card
  Card,
  // Typography
  Heading as ChakraHeading,
  Text as ChakraText,
  Link as ChakraLink,
  Code as ChakraCode,
  Kbd as ChakraKbd,
  // Button
  Button as ChakraButton,
  IconButton as ChakraIconButton,
  ButtonGroup as ChakraButtonGroup,
  // Form
  Input as ChakraInput,
  Textarea as ChakraTextarea,
  Checkbox as ChakraCheckbox,
  Switch as ChakraSwitch,
  // Data Display
  Badge as ChakraBadge,
  Avatar,
  AvatarGroup as ChakraAvatarGroup,
  Image as ChakraImage,
  List,
  Table,
  Tag,
  Stat,
  Progress,
  Skeleton as ChakraSkeleton,
  Spinner as ChakraSpinner,
  // Feedback
  Alert,
  EmptyState,
  // Navigation
  Tabs,
  Breadcrumb,
  Pagination,
  // Overlay
  Dialog,
  Drawer,
  Tooltip,
  Popover,
  Menu,
  // Collapse & Accordion
  Accordion,
  Collapsible,
  // Specialized
  Timeline,
  Steps,
  Separator,
  Field,
  RadioGroup,
  NativeSelect,
  Slider,
  RatingGroup,
  // Icons
  Icon as ChakraIcon,
} from '@chakra-ui/react';

// Icon component that renders based on name
// In a real implementation, this would map to actual icon libraries
const IconRenderer: React.FC<{ name?: string; size?: string; color?: string }> = ({ name, size = 'md', color }) => {
  const sizeMap: Record<string, string> = {
    xs: '12px',
    sm: '16px',
    md: '20px',
    lg: '24px',
    xl: '32px',
  };

  // Common icon paths
  const iconPaths: Record<string, string> = {
    check: 'M20 6L9 17l-5-5',
    star: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  };

  const path = iconPaths[name || ''] || '';

  return (
    <Box
      as="span"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      width={sizeMap[size] || size}
      height={sizeMap[size] || size}
      fontSize={sizeMap[size] || size}
      color={color || 'currentColor'}
    >
      {/* Placeholder for icon - in production, integrate with icon library */}
      <svg viewBox="0 0 24 24" fill={path ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" width="1em" height="1em">
        {path ? (
          <path d={path} fill="currentColor" />
        ) : (
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
        )}
      </svg>
    </Box>
  );
};

// Chakra UI v3 Theme
const chakraTheme: RegistryTheme = {
  name: 'Chakra Default',
  colors: {
    primary: '#3182CE',
    secondary: '#718096',
    accent: '#805AD5',
    background: '#FFFFFF',
    foreground: '#1A202C',
    muted: '#E2E8F0',
    success: '#38A169',
    warning: '#D69E2E',
    error: '#E53E3E',
    info: '#3182CE',
  },
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
    mono: 'JetBrains Mono, monospace',
  },
  borderRadius: '0.375rem',
  shadows: true,
};

// Component Registry - Maps catalog component names to Chakra UI components
const chakraComponents: ComponentRegistry = {
  // ==========================================
  // Layout Components
  // ==========================================
  Container: ({ element, children }) => (
    <ChakraContainer {...element.props}>{children}</ChakraContainer>
  ),
  Row: ({ element, children }) => (
    <HStack gap={element.props?.gap || 4} align={element.props?.align || 'center'} {...element.props}>
      {children}
    </HStack>
  ),
  Column: ({ element, children }) => (
    <VStack gap={element.props?.gap || 4} align={element.props?.align || 'stretch'} {...element.props}>
      {children}
    </VStack>
  ),
  Grid: ({ element, children }) => {
    const { columns = 3, gap, ...rest } = (element.props || {}) as { columns?: number; gap?: number };
    return (
      <ChakraGrid
        templateColumns={columns >= 3 ? { base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' } :
          columns === 2 ? { base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' } : 'repeat(1, 1fr)'}
        gap={gap || 4}
        {...rest}
      >
        {children}
      </ChakraGrid>
    );
  },
  Stack: ({ element, children }) => {
    const { direction = 'vertical', gap, responsive = true, ...rest } = (element.props || {}) as { direction?: string; gap?: number; responsive?: boolean };
    return (
      <ChakraStack
        direction={responsive && direction === 'horizontal' ? { base: 'column', md: 'row' } : direction === 'horizontal' ? 'row' : 'column'}
        gap={gap || 4}
        {...rest}
      >
        {children}
      </ChakraStack>
    );
  },
  Spacer: ({ element }) => <ChakraSpacer {...element.props} />,
  Divider: ({ element }) => <Separator {...element.props} />,

  // ==========================================
  // Card Components
  // ==========================================
  Card: ({ element, children }) => (
    <Card.Root {...element.props}>{children}</Card.Root>
  ),
  CardHeader: ({ element }) => {
    const { title, description, action } = (element.props || {}) as { title?: string; description?: string; action?: React.ReactNode };
    return (
      <Card.Header>
        <Flex justify="space-between" align="center" width="100%">
          <Box>
            {title && <Card.Title>{title}</Card.Title>}
            {description && <Card.Description>{description}</Card.Description>}
          </Box>
          {action}
        </Flex>
      </Card.Header>
    );
  },
  CardBody: ({ element, children }) => (
    <Card.Body {...element.props}>{children}</Card.Body>
  ),
  CardFooter: ({ element, children }) => (
    <Card.Footer {...element.props}>{children}</Card.Footer>
  ),

  // ==========================================
  // Typography Components
  // ==========================================
  Heading: ({ element }) => {
    const { text, level = 2, ...rest } = (element.props || {}) as { text?: string; level?: 1 | 2 | 3 | 4 | 5 | 6 };
    type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';
    const sizeMap: Record<number, HeadingSize> = {
      1: '4xl',
      2: '3xl',
      3: '2xl',
      4: 'xl',
      5: 'lg',
      6: 'md',
    };
    return (
      <ChakraHeading as={`h${level}`} size={sizeMap[level]} {...rest}>
        {text}
      </ChakraHeading>
    );
  },
  Text: ({ element }) => {
    const { text, size, color, ...rest } = (element.props || {}) as { text?: string; size?: string; color?: string };
    return (
      <ChakraText fontSize={size} color={color} {...rest}>
        {text}
      </ChakraText>
    );
  },
  Link: ({ element }) => {
    const { text, href, ...rest } = (element.props || {}) as { text?: string; href?: string };
    return (
      <ChakraLink href={href} {...rest}>
        {text}
      </ChakraLink>
    );
  },

  // ==========================================
  // Button Components
  // ==========================================
  Button: ({ element }) => {
    const { label, variant = 'solid', color = 'blue', size = 'md', disabled, loading, leftIcon, rightIcon, ...rest } =
      (element.props || {}) as {
        label?: string;
        variant?: string;
        color?: string;
        size?: string;
        disabled?: boolean;
        loading?: boolean;
        leftIcon?: string;
        rightIcon?: string;
      };
    return (
      <ChakraButton
        colorPalette={color}
        variant={variant as 'solid' | 'outline' | 'ghost' | 'plain'}
        size={size as 'xs' | 'sm' | 'md' | 'lg'}
        disabled={disabled}
        loading={loading}
        {...rest}
      >
        {leftIcon && <IconRenderer name={leftIcon} size="sm" />}
        {label}
        {rightIcon && <IconRenderer name={rightIcon} size="sm" />}
      </ChakraButton>
    );
  },
  IconButton: ({ element }) => {
    const { icon, label, variant = 'ghost', color, size = 'md', ...rest } =
      (element.props || {}) as { icon?: string; label?: string; variant?: string; color?: string; size?: string };
    return (
      <ChakraIconButton
        aria-label={label || 'Icon button'}
        colorPalette={color}
        variant={variant as 'solid' | 'outline' | 'ghost' | 'plain'}
        size={size as 'xs' | 'sm' | 'md' | 'lg'}
        {...rest}
      >
        <IconRenderer name={icon} size={size} />
      </ChakraIconButton>
    );
  },
  ButtonGroup: ({ element, children }) => (
    <ChakraButtonGroup {...element.props}>{children}</ChakraButtonGroup>
  ),

  // ==========================================
  // Form Components
  // ==========================================
  Input: ({ element }) => {
    const { label, placeholder, type = 'text', disabled, required, helperText, errorText, ...rest } =
      (element.props || {}) as {
        label?: string;
        placeholder?: string;
        type?: string;
        disabled?: boolean;
        required?: boolean;
        helperText?: string;
        errorText?: string;
      };
    return (
      <Field.Root disabled={disabled} required={required} invalid={!!errorText}>
        {label && <Field.Label>{label}</Field.Label>}
        <ChakraInput type={type} placeholder={placeholder} {...rest} />
        {helperText && !errorText && <Field.HelperText>{helperText}</Field.HelperText>}
        {errorText && <Field.ErrorText>{errorText}</Field.ErrorText>}
      </Field.Root>
    );
  },
  TextArea: ({ element }) => {
    const { label, placeholder, disabled, required, rows = 4, ...rest } =
      (element.props || {}) as {
        label?: string;
        placeholder?: string;
        disabled?: boolean;
        required?: boolean;
        rows?: number;
      };
    return (
      <Field.Root disabled={disabled} required={required}>
        {label && <Field.Label>{label}</Field.Label>}
        <ChakraTextarea placeholder={placeholder} rows={rows} {...rest} />
      </Field.Root>
    );
  },
  Select: ({ element }) => {
    const { options, label, placeholder, disabled, ...rest } =
      (element.props || {}) as {
        options?: { value: string; label: string }[];
        label?: string;
        placeholder?: string;
        disabled?: boolean;
      };
    return (
      <Field.Root disabled={disabled}>
        {label && <Field.Label>{label}</Field.Label>}
        <NativeSelect.Root {...rest}>
          <NativeSelect.Field placeholder={placeholder}>
            {placeholder && <option value="">{placeholder}</option>}
            {options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Field.Root>
    );
  },
  Checkbox: ({ element }) => {
    const { label, checked, disabled, ...rest } =
      (element.props || {}) as { label?: string; checked?: boolean; disabled?: boolean };
    return (
      <ChakraCheckbox.Root checked={checked} disabled={disabled} {...rest}>
        <ChakraCheckbox.HiddenInput />
        <ChakraCheckbox.Control />
        {label && <ChakraCheckbox.Label>{label}</ChakraCheckbox.Label>}
      </ChakraCheckbox.Root>
    );
  },
  Radio: ({ element }) => {
    const { label, value, ...rest } = (element.props || {}) as { label?: string; value?: string };
    return (
      <RadioGroup.Item value={value || ''} {...rest}>
        <RadioGroup.ItemHiddenInput />
        <RadioGroup.ItemControl />
        {label && <RadioGroup.ItemText>{label}</RadioGroup.ItemText>}
      </RadioGroup.Item>
    );
  },
  RadioGroup: ({ element, children }) => {
    const { label, orientation = 'vertical', ...rest } =
      (element.props || {}) as { label?: string; orientation?: string };
    return (
      <Field.Root>
        {label && <Field.Label>{label}</Field.Label>}
        <RadioGroup.Root orientation={orientation as 'horizontal' | 'vertical'} {...rest}>
          <HStack gap={4} flexDirection={orientation === 'horizontal' ? 'row' : 'column'}>
            {children}
          </HStack>
        </RadioGroup.Root>
      </Field.Root>
    );
  },
  Switch: ({ element }) => {
    const { label, checked, disabled, ...rest } =
      (element.props || {}) as { label?: string; checked?: boolean; disabled?: boolean };
    return (
      <ChakraSwitch.Root checked={checked} disabled={disabled} {...rest}>
        <ChakraSwitch.HiddenInput />
        <ChakraSwitch.Control />
        {label && <ChakraSwitch.Label>{label}</ChakraSwitch.Label>}
      </ChakraSwitch.Root>
    );
  },
  Slider: ({ element }) => {
    const { label, min = 0, max = 100, step = 1, defaultValue, ...rest } =
      (element.props || {}) as { label?: string; min?: number; max?: number; step?: number; defaultValue?: number };
    return (
      <Field.Root>
        {label && <Field.Label>{label}</Field.Label>}
        <Slider.Root min={min} max={max} step={step} defaultValue={[defaultValue || min]} {...rest}>
          <Slider.Control>
            <Slider.Track>
              <Slider.Range />
            </Slider.Track>
            <Slider.Thumb index={0} />
          </Slider.Control>
        </Slider.Root>
      </Field.Root>
    );
  },

  // ==========================================
  // Data Display Components
  // ==========================================
  Badge: ({ element }) => {
    const { text, variant = 'subtle', color = 'gray', ...rest } =
      (element.props || {}) as { text?: string; variant?: string; color?: string };
    return (
      <ChakraBadge colorPalette={color} variant={variant as 'solid' | 'subtle' | 'outline' | 'plain' | 'surface'} {...rest}>
        {text}
      </ChakraBadge>
    );
  },
  Avatar: ({ element }) => {
    const { src, name, size = 'md', ...rest } =
      (element.props || {}) as { src?: string; name?: string; size?: string };
    return (
      <Avatar.Root size={size as 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'} {...rest}>
        <Avatar.Image src={src} alt={name} />
        <Avatar.Fallback>{name?.slice(0, 2).toUpperCase()}</Avatar.Fallback>
      </Avatar.Root>
    );
  },
  AvatarGroup: ({ element, children }) => (
    <ChakraAvatarGroup {...element.props}>{children}</ChakraAvatarGroup>
  ),
  Icon: ({ element }) => {
    const { name, size = 'md', color, ...rest } =
      (element.props || {}) as { name?: string; size?: string; color?: string };
    return <IconRenderer name={name} size={size} />;
  },
  Image: ({ element }) => {
    const { src, alt, width, height, objectFit = 'cover', borderRadius, ...rest } =
      (element.props || {}) as {
        src?: string;
        alt?: string;
        width?: string | number;
        height?: string | number;
        objectFit?: string;
        borderRadius?: string;
      };
    return (
      <ChakraImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        objectFit={objectFit as 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'}
        borderRadius={borderRadius}
        {...rest}
      />
    );
  },
  List: ({ element, children }) => {
    const { variant = 'plain', ...rest } = (element.props || {}) as { variant?: string };
    return (
      <List.Root {...rest}>{children}</List.Root>
    );
  },
  ListItem: ({ element, children }) => {
    const { text, icon, ...rest } = (element.props || {}) as { text?: string; icon?: string };
    return (
      <List.Item {...rest}>
        {icon && <List.Indicator><IconRenderer name={icon} size="sm" /></List.Indicator>}
        {text || children}
      </List.Item>
    );
  },
  Table: ({ element, children }) => (
    <Table.Root {...element.props}>{children}</Table.Root>
  ),
  TableHeader: ({ children }) => <Table.Header>{children}</Table.Header>,
  TableBody: ({ children }) => <Table.Body>{children}</Table.Body>,
  TableRow: ({ element, children }) => <Table.Row {...element.props}>{children}</Table.Row>,
  TableCell: ({ element, children }) => {
    const { isHeader, ...rest } = (element.props || {}) as { isHeader?: boolean };
    return isHeader
      ? <Table.ColumnHeader {...rest}>{children}</Table.ColumnHeader>
      : <Table.Cell {...rest}>{children}</Table.Cell>;
  },
  Metric: ({ element }) => {
    const { label, value, trend, trendValue, ...rest } =
      (element.props || {}) as { label?: string; value?: string | number; trend?: 'up' | 'down'; trendValue?: string };
    return (
      <Stat.Root {...rest}>
        <Stat.Label>{label}</Stat.Label>
        <Stat.ValueText>{value}</Stat.ValueText>
        {trend && (
          <Stat.HelpText>
            {trend === 'up' ? <Stat.UpIndicator /> : <Stat.DownIndicator />}
            {trendValue}
          </Stat.HelpText>
        )}
      </Stat.Root>
    );
  },
  Progress: ({ element }) => {
    const { value = 0, max = 100, color = 'blue', size = 'md', showValue, ...rest } =
      (element.props || {}) as {
        value?: number;
        max?: number;
        color?: string;
        size?: string;
        showValue?: boolean;
      };
    return (
      <Progress.Root value={value} max={max} {...rest}>
        <Progress.Track>
          <Progress.Range />
        </Progress.Track>
        {showValue && <Progress.ValueText />}
      </Progress.Root>
    );
  },

  // ==========================================
  // Feedback Components
  // ==========================================
  Alert: ({ element }) => {
    const { title, description, status = 'info', variant = 'subtle', closable, ...rest } =
      (element.props || {}) as {
        title?: string;
        description?: string;
        status?: 'info' | 'warning' | 'success' | 'error';
        variant?: string;
        closable?: boolean;
      };
    return (
      <Alert.Root status={status} {...rest}>
        <Alert.Indicator />
        <Box flex="1">
          {title && <Alert.Title>{title}</Alert.Title>}
          {description && <Alert.Description>{description}</Alert.Description>}
        </Box>
      </Alert.Root>
    );
  },
  Toast: ({ element }) => {
    const { title, description, status = 'info', ...rest } =
      (element.props || {}) as { title?: string; description?: string; status?: string };
    // Toast in Chakra v3 is typically rendered via toaster
    // This is a static representation for the registry
    return (
      <Box
        p={4}
        borderRadius="md"
        bg={status === 'success' ? 'green.100' : status === 'error' ? 'red.100' : status === 'warning' ? 'yellow.100' : 'blue.100'}
        borderWidth="1px"
        borderColor={status === 'success' ? 'green.200' : status === 'error' ? 'red.200' : status === 'warning' ? 'yellow.200' : 'blue.200'}
        {...rest}
      >
        {title && <ChakraText fontWeight="semibold">{title}</ChakraText>}
        {description && <ChakraText fontSize="sm">{description}</ChakraText>}
      </Box>
    );
  },
  Skeleton: ({ element }) => {
    const { height = '20px', width, borderRadius, ...rest } =
      (element.props || {}) as { height?: string; width?: string; borderRadius?: string };
    return <ChakraSkeleton height={height} width={width} borderRadius={borderRadius} {...rest} />;
  },
  Spinner: ({ element }) => {
    const { size = 'md', color = 'blue.500', ...rest } =
      (element.props || {}) as { size?: string; color?: string };
    return <ChakraSpinner size={size as 'xs' | 'sm' | 'md' | 'lg' | 'xl'} color={color} {...rest} />;
  },
  EmptyState: ({ element }) => {
    const { title, description, icon, ...rest } =
      (element.props || {}) as { title?: string; description?: string; icon?: string };
    return (
      <EmptyState.Root {...rest}>
        <EmptyState.Content>
          {icon && <EmptyState.Indicator><IconRenderer name={icon} size="xl" /></EmptyState.Indicator>}
          {title && <EmptyState.Title>{title}</EmptyState.Title>}
          {description && <EmptyState.Description>{description}</EmptyState.Description>}
        </EmptyState.Content>
      </EmptyState.Root>
    );
  },

  // ==========================================
  // Navigation Components
  // ==========================================
  Tabs: ({ element, children }) => {
    const { defaultValue, variant = 'line', ...rest } =
      (element.props || {}) as { defaultValue?: string; variant?: string };
    return (
      <Tabs.Root defaultValue={defaultValue} variant={variant as 'line' | 'enclosed' | 'outline' | 'plain'} {...rest}>
        {children}
      </Tabs.Root>
    );
  },
  TabList: ({ children }) => <Tabs.List>{children}</Tabs.List>,
  Tab: ({ element }) => {
    const { value, label, disabled, ...rest } =
      (element.props || {}) as { value?: string; label?: string; disabled?: boolean };
    return (
      <Tabs.Trigger value={value || ''} disabled={disabled} {...rest}>
        {label}
      </Tabs.Trigger>
    );
  },
  TabPanel: ({ element, children }) => {
    const { value } = (element.props || {}) as { value?: string };
    return <Tabs.Content value={value || ''}>{children}</Tabs.Content>;
  },
  Breadcrumb: ({ element, children }) => (
    <Breadcrumb.Root {...element.props}>
      <Breadcrumb.List>{children}</Breadcrumb.List>
    </Breadcrumb.Root>
  ),
  BreadcrumbItem: ({ element }) => {
    const { label, href, current, ...rest } =
      (element.props || {}) as { label?: string; href?: string; current?: boolean };
    return (
      <Breadcrumb.Item {...rest}>
        {current ? (
          <Breadcrumb.CurrentLink>{label}</Breadcrumb.CurrentLink>
        ) : (
          <Breadcrumb.Link href={href}>{label}</Breadcrumb.Link>
        )}
        {!current && <Breadcrumb.Separator />}
      </Breadcrumb.Item>
    );
  },
  Pagination: ({ element }) => {
    const { page = 1, total = 10, pageSize = 10, ...rest } =
      (element.props || {}) as { page?: number; total?: number; pageSize?: number };
    return (
      <Pagination.Root count={total} pageSize={pageSize} page={page} {...rest}>
        <HStack>
          <Pagination.PrevTrigger />
          <Pagination.Items
            render={(page) => (
              <Pagination.Item {...page}>{page.value}</Pagination.Item>
            )}
          />
          <Pagination.NextTrigger />
        </HStack>
      </Pagination.Root>
    );
  },
  NavMenu: ({ element, children }) => {
    const { ...rest } = element.props || {};
    return (
      <HStack as="nav" gap={4} {...rest}>
        {children}
      </HStack>
    );
  },
  NavItem: ({ element }) => {
    const { label, href, active, icon, ...rest } =
      (element.props || {}) as { label?: string; href?: string; active?: boolean; icon?: string };
    return (
      <ChakraLink
        href={href}
        fontWeight={active ? 'semibold' : 'normal'}
        color={active ? 'blue.600' : 'inherit'}
        _hover={{ color: 'blue.500' }}
        display="flex"
        alignItems="center"
        gap={2}
        {...rest}
      >
        {icon && <IconRenderer name={icon} size="sm" />}
        {label}
      </ChakraLink>
    );
  },

  // ==========================================
  // Overlay Components
  // ==========================================
  Modal: ({ element, children }) => {
    const { title, open = true, ...rest } =
      (element.props || {}) as { title?: string; open?: boolean };
    return (
      <Dialog.Root open={open} {...rest}>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            {title && (
              <Dialog.Header>
                <Dialog.Title>{title}</Dialog.Title>
              </Dialog.Header>
            )}
            <Dialog.Body>{children}</Dialog.Body>
            <Dialog.CloseTrigger />
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    );
  },
  Drawer: ({ element, children }) => {
    const { title, placement = 'right', open = true, ...rest } =
      (element.props || {}) as { title?: string; placement?: string; open?: boolean };
    return (
      <Drawer.Root open={open} placement={placement as 'start' | 'end' | 'top' | 'bottom'} {...rest}>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            {title && (
              <Drawer.Header>
                <Drawer.Title>{title}</Drawer.Title>
              </Drawer.Header>
            )}
            <Drawer.Body>{children}</Drawer.Body>
            <Drawer.CloseTrigger />
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    );
  },
  Tooltip: ({ element, children }) => {
    const { content, placement = 'top', ...rest } =
      (element.props || {}) as { content?: string; placement?: string };
    return (
      <Tooltip.Root {...rest}>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Positioner>
          <Tooltip.Content>{content}</Tooltip.Content>
        </Tooltip.Positioner>
      </Tooltip.Root>
    );
  },
  Popover: ({ element, children }) => {
    const { title, ...rest } = (element.props || {}) as { title?: string };
    return (
      <Popover.Root {...rest}>
        <Popover.Trigger asChild>{children}</Popover.Trigger>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Arrow><Popover.ArrowTip /></Popover.Arrow>
            {title && (
              <Popover.Header>
                <Popover.Title>{title}</Popover.Title>
              </Popover.Header>
            )}
            <Popover.Body>{children}</Popover.Body>
            <Popover.CloseTrigger />
          </Popover.Content>
        </Popover.Positioner>
      </Popover.Root>
    );
  },
  Dropdown: ({ element, children }) => {
    const { trigger, ...rest } = (element.props || {}) as { trigger?: string };
    return (
      <Menu.Root {...rest}>
        <Menu.Trigger asChild>
          <ChakraButton variant="outline">{trigger}</ChakraButton>
        </Menu.Trigger>
        <Menu.Positioner>
          <Menu.Content>{children}</Menu.Content>
        </Menu.Positioner>
      </Menu.Root>
    );
  },
  DropdownItem: ({ element }) => {
    const { label, icon, disabled, destructive, ...rest } =
      (element.props || {}) as { label?: string; icon?: string; disabled?: boolean; destructive?: boolean };
    return (
      <Menu.Item
        value={label || ''}
        disabled={disabled}
        color={destructive ? 'red.600' : undefined}
        {...rest}
      >
        {icon && <IconRenderer name={icon} size="sm" />}
        <Menu.ItemText>{label}</Menu.ItemText>
      </Menu.Item>
    );
  },

  // ==========================================
  // Collapse & Accordion Components
  // ==========================================
  Accordion: ({ element, children }) => {
    const { allowMultiple, defaultValue, ...rest } =
      (element.props || {}) as { allowMultiple?: boolean; defaultValue?: string[] };
    return (
      <Accordion.Root multiple={allowMultiple} defaultValue={defaultValue} {...rest}>
        {children}
      </Accordion.Root>
    );
  },
  AccordionItem: ({ element, children }) => {
    const { title, value, ...rest } =
      (element.props || {}) as { title?: string; value?: string };
    return (
      <Accordion.Item value={value || title || ''} {...rest}>
        <Accordion.ItemTrigger>
          {title}
          <Accordion.ItemIndicator />
        </Accordion.ItemTrigger>
        <Accordion.ItemContent>
          <Accordion.ItemBody>{children}</Accordion.ItemBody>
        </Accordion.ItemContent>
      </Accordion.Item>
    );
  },
  Collapsible: ({ element, children }) => {
    const { title, defaultOpen, ...rest } =
      (element.props || {}) as { title?: string; defaultOpen?: boolean };
    return (
      <Collapsible.Root defaultOpen={defaultOpen} {...rest}>
        <Collapsible.Trigger>
          {title}
          <Collapsible.Indicator />
        </Collapsible.Trigger>
        <Collapsible.Content>{children}</Collapsible.Content>
      </Collapsible.Root>
    );
  },

  // ==========================================
  // Specialized Components
  // ==========================================
  Chart: ({ element }) => {
    const { type, height = 200, ...rest } =
      (element.props || {}) as { type?: string; height?: number };
    return (
      <Center
        height={height}
        bg="gray.100"
        borderRadius="md"
        color="gray.500"
        {...rest}
      >
        Chart: {type}
      </Center>
    );
  },
  Calendar: () => (
    <Center p={4} borderWidth="1px" borderRadius="md" bg="gray.50">
      Calendar Placeholder
    </Center>
  ),
  DatePicker: ({ element }) => {
    const { label, placeholder, ...rest } =
      (element.props || {}) as { label?: string; placeholder?: string };
    return (
      <Field.Root>
        {label && <Field.Label>{label}</Field.Label>}
        <ChakraInput type="date" placeholder={placeholder} {...rest} />
      </Field.Root>
    );
  },
  FileUpload: ({ element }) => {
    const { label, accept, multiple, ...rest } =
      (element.props || {}) as { label?: string; accept?: string; multiple?: boolean };
    return (
      <Field.Root>
        {label && <Field.Label>{label}</Field.Label>}
        <ChakraInput
          type="file"
          accept={accept}
          multiple={multiple}
          css={{
            '&::file-selector-button': {
              border: 'none',
              background: 'var(--chakra-colors-blue-500)',
              color: 'white',
              borderRadius: 'var(--chakra-radii-md)',
              padding: '0.5rem 1rem',
              marginRight: '1rem',
              cursor: 'pointer',
            },
            '&::file-selector-button:hover': {
              background: 'var(--chakra-colors-blue-600)',
            },
          }}
          {...rest}
        />
      </Field.Root>
    );
  },
  Rating: ({ element }) => {
    const { value = 0, max = 5, size = 'md', allowHalf, readOnly, ...rest } =
      (element.props || {}) as { value?: number; max?: number; size?: string; allowHalf?: boolean; readOnly?: boolean };
    return (
      <RatingGroup.Root count={max} defaultValue={value} allowHalf={allowHalf} readOnly={readOnly} {...rest}>
        <RatingGroup.Control>
          <RatingGroup.Items />
        </RatingGroup.Control>
      </RatingGroup.Root>
    );
  },
  TagInput: ({ element }) => {
    const { label, placeholder, tags = [], ...rest } =
      (element.props || {}) as { label?: string; placeholder?: string; tags?: string[] };
    return (
      <Field.Root>
        {label && <Field.Label>{label}</Field.Label>}
        <Flex
          flexWrap="wrap"
          gap={2}
          p={2}
          borderWidth="1px"
          borderRadius="md"
          minHeight="40px"
          alignItems="center"
          {...rest}
        >
          {tags.map((tag: string, index: number) => (
            <Tag.Root key={index} size="sm">
              <Tag.Label>{tag}</Tag.Label>
              <Tag.CloseTrigger />
            </Tag.Root>
          ))}
          <ChakraInput
            placeholder={placeholder}
            variant="flushed"
            flex="1"
            minWidth="100px"
            border="none"
          />
        </Flex>
      </Field.Root>
    );
  },
  ColorPicker: ({ element }) => {
    const { label, defaultValue = '#3182CE', ...rest } =
      (element.props || {}) as { label?: string; defaultValue?: string };
    return (
      <Field.Root>
        {label && <Field.Label>{label}</Field.Label>}
        <ChakraInput
          type="color"
          defaultValue={defaultValue}
          height="40px"
          width="80px"
          p={1}
          cursor="pointer"
          {...rest}
        />
      </Field.Root>
    );
  },
  Timeline: ({ element, children }) => (
    <Timeline.Root {...element.props}>{children}</Timeline.Root>
  ),
  TimelineItem: ({ element }) => {
    const { title, description, icon, status, time, ...rest } =
      (element.props || {}) as {
        title?: string;
        description?: string;
        icon?: string;
        status?: 'complete' | 'current' | 'incomplete';
        time?: string;
      };
    return (
      <Timeline.Item {...rest}>
        <Timeline.Connector>
          <Timeline.Separator />
          <Timeline.Indicator>
            {icon && <IconRenderer name={icon} size="sm" />}
          </Timeline.Indicator>
        </Timeline.Connector>
        <Timeline.Content>
          {title && <Timeline.Title>{title}</Timeline.Title>}
          {description && <Timeline.Description>{description}</Timeline.Description>}
          {time && <ChakraText fontSize="xs" color="gray.500">{time}</ChakraText>}
        </Timeline.Content>
      </Timeline.Item>
    );
  },
  Stepper: ({ element, children }) => {
    const { activeStep = 0, orientation = 'horizontal', ...rest } =
      (element.props || {}) as { activeStep?: number; orientation?: string };
    return (
      <Steps.Root
        step={activeStep}
        orientation={orientation as 'horizontal' | 'vertical'}
        {...rest}
      >
        <Steps.List>{children}</Steps.List>
      </Steps.Root>
    );
  },
  Step: ({ element }) => {
    const { title, description, icon, index = 0, ...rest } =
      (element.props || {}) as { title?: string; description?: string; icon?: string; index?: number };
    return (
      <Steps.Item index={index} {...rest}>
        <Steps.Trigger>
          <Steps.Indicator>
            <Steps.Status
              complete={icon ? <IconRenderer name={icon} size="sm" /> : <Steps.Number />}
              incomplete={<Steps.Number />}
              current={<Steps.Number />}
            />
          </Steps.Indicator>
          <VStack gap={0} align="start">
            <Steps.Title>{title}</Steps.Title>
            {description && <Steps.Description>{description}</Steps.Description>}
          </VStack>
        </Steps.Trigger>
        <Steps.Separator />
      </Steps.Item>
    );
  },
  Code: ({ element }) => {
    const { text, language, ...rest } =
      (element.props || {}) as { text?: string; language?: string };
    return (
      <ChakraCode colorPalette="gray" {...rest}>
        {text}
      </ChakraCode>
    );
  },
  Kbd: ({ element }) => {
    const { text, ...rest } = (element.props || {}) as { text?: string };
    return <ChakraKbd {...rest}>{text}</ChakraKbd>;
  },
  Quote: ({ element }) => {
    const { text, author, cite, ...rest } =
      (element.props || {}) as { text?: string; author?: string; cite?: string };
    return (
      <Box
        as="blockquote"
        borderLeftWidth="4px"
        borderLeftColor="blue.500"
        pl={4}
        py={2}
        fontStyle="italic"
        {...rest}
      >
        <ChakraText>{text}</ChakraText>
        {author && (
          <ChakraText fontSize="sm" color="gray.600" mt={2}>
            {cite ? <cite>{author}</cite> : author}
          </ChakraText>
        )}
      </Box>
    );
  },
  Stat: ({ element }) => {
    const { label, value, helpText, trend, trendValue, ...rest } =
      (element.props || {}) as {
        label?: string;
        value?: string | number;
        helpText?: string;
        trend?: 'up' | 'down';
        trendValue?: string;
      };
    return (
      <Stat.Root {...rest}>
        {label && <Stat.Label>{label}</Stat.Label>}
        <Stat.ValueText>{value}</Stat.ValueText>
        {(helpText || trend) && (
          <Stat.HelpText>
            {trend === 'up' && <Stat.UpIndicator />}
            {trend === 'down' && <Stat.DownIndicator />}
            {trendValue || helpText}
          </Stat.HelpText>
        )}
      </Stat.Root>
    );
  },
  Tag: ({ element }) => {
    const { text, color = 'gray', variant = 'subtle', closable, icon, ...rest } =
      (element.props || {}) as {
        text?: string;
        color?: string;
        variant?: string;
        closable?: boolean;
        icon?: string;
      };
    return (
      <Tag.Root colorPalette={color} variant={variant as 'solid' | 'subtle' | 'outline' | 'surface'} {...rest}>
        {icon && <Tag.StartElement><IconRenderer name={icon} size="xs" /></Tag.StartElement>}
        <Tag.Label>{text}</Tag.Label>
        {closable && <Tag.CloseTrigger />}
      </Tag.Root>
    );
  },

  // ==========================================
  // Marketing Components
  // ==========================================
  Hero: ({ element }) => {
    const {
      title,
      subtitle,
      description,
      primaryAction,
      secondaryAction,
      image,
      align = 'center',
      ...rest
    } = (element.props || {}) as {
      title?: string;
      subtitle?: string;
      description?: string;
      primaryAction?: { label: string; href?: string };
      secondaryAction?: { label: string; href?: string };
      image?: string;
      align?: 'left' | 'center' | 'right';
    };

    return (
      <Box py={{ base: 12, md: 16, lg: 20 }} px={{ base: 4, md: 6, lg: 8 }} textAlign={align} {...rest}>
        <ChakraContainer maxW="container.lg">
          {subtitle && (
            <ChakraBadge colorPalette="blue" variant="subtle" mb={4}>
              {subtitle}
            </ChakraBadge>
          )}
          {title && (
            <ChakraHeading as="h1" size={{ base: '2xl', md: '3xl', lg: '4xl' }} mb={6} lineHeight="1.2">
              {title}
            </ChakraHeading>
          )}
          {description && (
            <ChakraText fontSize={{ base: 'md', md: 'lg', lg: 'xl' }} color="gray.600" maxW="2xl" mx={align === 'center' ? 'auto' : undefined} mb={8}>
              {description}
            </ChakraText>
          )}
          {(primaryAction || secondaryAction) && (
            <Flex gap={4} justify={align === 'center' ? 'center' : 'flex-start'} direction={{ base: 'column', sm: 'row' }} align={{ base: 'stretch', sm: 'center' }}>
              {primaryAction && (
                <ChakraButton colorPalette="blue" size={{ base: 'md', md: 'lg' }}>
                  {primaryAction.label}
                </ChakraButton>
              )}
              {secondaryAction && (
                <ChakraButton variant="outline" size={{ base: 'md', md: 'lg' }}>
                  {secondaryAction.label}
                </ChakraButton>
              )}
            </Flex>
          )}
          {image && <ChakraImage src={image} alt={title} mt={{ base: 8, md: 12 }} borderRadius="lg" mx="auto" />}
        </ChakraContainer>
      </Box>
    );
  },

  FeatureCard: ({ element }) => {
    const { icon, title, description, ...rest } = (element.props || {}) as {
      icon?: string;
      title?: string;
      description?: string;
    };
    return (
      <Card.Root {...rest}>
        <Card.Body>
          <VStack align="start" gap={4}>
            {icon && (
              <Box p={3} bg="blue.100" borderRadius="lg" color="blue.600">
                <IconRenderer name={icon} size="lg" />
              </Box>
            )}
            {title && (
              <ChakraHeading as="h3" size="md">
                {title}
              </ChakraHeading>
            )}
            {description && (
              <ChakraText color="gray.600">{description}</ChakraText>
            )}
          </VStack>
        </Card.Body>
      </Card.Root>
    );
  },

  PricingCard: ({ element }) => {
    const {
      name,
      price,
      period = 'month',
      description,
      features = [],
      highlighted,
      buttonLabel = 'Get Started',
      ...rest
    } = (element.props || {}) as {
      name?: string;
      price?: string | number;
      period?: string;
      description?: string;
      features?: string[];
      highlighted?: boolean;
      buttonLabel?: string;
    };
    return (
      <Card.Root
        borderWidth={highlighted ? '2px' : '1px'}
        borderColor={highlighted ? 'blue.500' : 'gray.200'}
        {...rest}
      >
        <Card.Header>
          {highlighted && (
            <ChakraBadge colorPalette="blue" mb={2}>
              Most Popular
            </ChakraBadge>
          )}
          <Card.Title>{name}</Card.Title>
          {description && <Card.Description>{description}</Card.Description>}
        </Card.Header>
        <Card.Body>
          <VStack align="stretch" gap={6}>
            <Box>
              <ChakraText fontSize="4xl" fontWeight="bold">
                ${price}
              </ChakraText>
              <ChakraText color="gray.500">per {period}</ChakraText>
            </Box>
            <Separator />
            <List.Root gap={3}>
              {features.map((feature, idx) => (
                <List.Item key={idx}>
                  <List.Indicator color="green.500">
                    <IconRenderer name="check" size="sm" />
                  </List.Indicator>
                  {feature}
                </List.Item>
              ))}
            </List.Root>
          </VStack>
        </Card.Body>
        <Card.Footer>
          <ChakraButton
            colorPalette={highlighted ? 'blue' : 'gray'}
            variant={highlighted ? 'solid' : 'outline'}
            width="100%"
          >
            {buttonLabel}
          </ChakraButton>
        </Card.Footer>
      </Card.Root>
    );
  },

  TestimonialCard: ({ element }) => {
    const { quote, author, role, company, avatar, rating, ...rest } = (element.props || {}) as {
      quote?: string;
      author?: string;
      role?: string;
      company?: string;
      avatar?: string;
      rating?: number;
    };
    return (
      <Card.Root {...rest}>
        <Card.Body>
          <VStack align="start" gap={4}>
            {rating && (
              <HStack>
                {Array.from({ length: rating }).map((_, i) => (
                  <IconRenderer key={i} name="star" size="sm" color="yellow.400" />
                ))}
              </HStack>
            )}
            {quote && (
              <ChakraText fontSize="lg" fontStyle="italic">
                "{quote}"
              </ChakraText>
            )}
            <HStack gap={4}>
              {avatar && (
                <Avatar.Root size="md">
                  <Avatar.Image src={avatar} alt={author} />
                  <Avatar.Fallback>{author?.slice(0, 2).toUpperCase()}</Avatar.Fallback>
                </Avatar.Root>
              )}
              <Box>
                {author && <ChakraText fontWeight="semibold">{author}</ChakraText>}
                {(role || company) && (
                  <ChakraText fontSize="sm" color="gray.500">
                    {role}
                    {role && company && ' at '}
                    {company}
                  </ChakraText>
                )}
              </Box>
            </HStack>
          </VStack>
        </Card.Body>
      </Card.Root>
    );
  },

  CTA: ({ element }) => {
    const { title, description, primaryAction, secondaryAction, variant = 'default', ...rest } = (element.props || {}) as {
      title?: string;
      description?: string;
      primaryAction?: { label: string; href?: string };
      secondaryAction?: { label: string; href?: string };
      variant?: 'default' | 'highlighted';
    };
    const isHighlighted = variant === 'highlighted';
    return (
      <Box
        py={16}
        px={8}
        bg={isHighlighted ? 'blue.600' : 'gray.100'}
        borderRadius="xl"
        textAlign="center"
        {...rest}
      >
        {title && (
          <ChakraHeading as="h2" size="2xl" mb={4} color={isHighlighted ? 'white' : 'gray.900'}>
            {title}
          </ChakraHeading>
        )}
        {description && (
          <ChakraText
            fontSize="lg"
            mb={8}
            maxW="xl"
            mx="auto"
            color={isHighlighted ? 'blue.100' : 'gray.600'}
          >
            {description}
          </ChakraText>
        )}
        <HStack gap={4} justify="center">
          {primaryAction && (
            <ChakraButton
              colorPalette={isHighlighted ? 'white' : 'blue'}
              variant={isHighlighted ? 'solid' : 'solid'}
              size="lg"
            >
              {primaryAction.label}
            </ChakraButton>
          )}
          {secondaryAction && (
            <ChakraButton
              variant="ghost"
              size="lg"
              color={isHighlighted ? 'white' : undefined}
            >
              {secondaryAction.label}
            </ChakraButton>
          )}
        </HStack>
      </Box>
    );
  },

  Footer: ({ element, children }) => {
    const { logo, copyright, links = [], socialLinks = [], ...rest } = (element.props || {}) as {
      logo?: string;
      copyright?: string;
      links?: { label: string; href: string }[];
      socialLinks?: { icon: string; href: string }[];
    };
    return (
      <Box as="footer" py={{ base: 8, md: 10, lg: 12 }} px={{ base: 4, md: 6, lg: 8 }} bg="gray.900" color="white" {...rest}>
        <ChakraContainer maxW="container.xl">
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align={{ base: 'center', md: 'flex-start' }}
            gap={{ base: 6, md: 8 }}
          >
            <VStack align={{ base: 'center', md: 'flex-start' }} gap={4}>
              {logo && (
                <ChakraHeading as="span" size={{ base: 'md', md: 'lg' }}>
                  {logo}
                </ChakraHeading>
              )}
              {copyright && (
                <ChakraText fontSize="sm" color="gray.400">
                  {copyright}
                </ChakraText>
              )}
            </VStack>
            {links.length > 0 && (
              <Flex gap={6} flexWrap="wrap" justify="center" direction={{ base: 'column', sm: 'row' }} align="center">
                {links.map((link, idx) => (
                  <ChakraLink
                    key={idx}
                    href={link.href}
                    color="gray.400"
                    _hover={{ color: 'white' }}
                  >
                    {link.label}
                  </ChakraLink>
                ))}
              </Flex>
            )}
            {socialLinks.length > 0 && (
              <HStack gap={4}>
                {socialLinks.map((social, idx) => (
                  <ChakraIconButton
                    key={idx}
                    aria-label={social.icon}
                    variant="ghost"
                    color="gray.400"
                    _hover={{ color: 'white' }}
                  >
                    <IconRenderer name={social.icon} size="md" />
                  </ChakraIconButton>
                ))}
              </HStack>
            )}
          </Flex>
          {children}
        </ChakraContainer>
      </Box>
    );
  },

  FAQ: ({ element }) => {
    const { title, description, items = [], ...rest } = (element.props || {}) as {
      title?: string;
      description?: string;
      items?: { question: string; answer: string }[];
    };
    return (
      <Box py={16} {...rest}>
        {title && (
          <ChakraHeading as="h2" size="2xl" textAlign="center" mb={4}>
            {title}
          </ChakraHeading>
        )}
        {description && (
          <ChakraText textAlign="center" color="gray.600" mb={12} maxW="xl" mx="auto">
            {description}
          </ChakraText>
        )}
        <Accordion.Root>
          {items.map((item, idx) => (
            <Accordion.Item key={idx} value={`faq-${idx}`}>
              <Accordion.ItemTrigger>
                <ChakraText fontWeight="medium">{item.question}</ChakraText>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
              <Accordion.ItemContent>
                <Accordion.ItemBody>
                  <ChakraText color="gray.600">{item.answer}</ChakraText>
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Box>
    );
  },

  Newsletter: ({ element }) => {
    const { title, description, placeholder = 'Enter your email', buttonLabel = 'Subscribe', ...rest } = (element.props || {}) as {
      title?: string;
      description?: string;
      placeholder?: string;
      buttonLabel?: string;
    };
    return (
      <Box py={16} px={8} bg="gray.50" borderRadius="xl" textAlign="center" {...rest}>
        {title && (
          <ChakraHeading as="h2" size="xl" mb={4}>
            {title}
          </ChakraHeading>
        )}
        {description && (
          <ChakraText color="gray.600" mb={8} maxW="md" mx="auto">
            {description}
          </ChakraText>
        )}
        <Flex maxW="md" mx="auto" gap={4}>
          <ChakraInput placeholder={placeholder} flex="1" bg="white" />
          <ChakraButton colorPalette="blue">{buttonLabel}</ChakraButton>
        </Flex>
      </Box>
    );
  },
};

// Registry Definition
export const chakraRegistry: RegistryDefinition = {
  name: 'chakra',
  displayName: 'Chakra UI v3',
  description: 'Accessible and composable React components built with Ark UI and Emotion',
  framework: 'chakra',
  components: chakraComponents,
  theme: chakraTheme,
};

export { chakraComponents, chakraTheme };
