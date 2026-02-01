'use client';

/**
 * MUI Framework Mapper
 * Maps universal component types to Material UI implementations
 *
 * This mapper provides:
 * - 60+ core components mapped to MUI equivalents
 * - Marketing components (Hero, FeatureCard, PricingCard, etc.) built with MUI primitives
 * - Prop transformations for universal-to-MUI conventions
 */

import * as React from 'react';
import type { ComponentRegistry } from '@json-render/react';
import type { RegistryTheme } from '@/lib/registry';

// MUI Components
import {
  Box,
  Container as MuiContainer,
  Stack as MuiStack,
  Grid as MuiGrid,
  Divider as MuiDivider,
  Card as MuiCard,
  CardHeader as MuiCardHeader,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Link as MuiLink,
  Button as MuiButton,
  IconButton as MuiIconButton,
  ButtonGroup as MuiButtonGroup,
  TextField,
  Select as MuiSelect,
  MenuItem,
  InputLabel,
  FormControl,
  FormControlLabel,
  Checkbox as MuiCheckbox,
  Radio as MuiRadio,
  RadioGroup as MuiRadioGroup,
  Switch as MuiSwitch,
  Slider as MuiSlider,
  Chip,
  Avatar as MuiAvatar,
  AvatarGroup as MuiAvatarGroup,
  List as MuiList,
  ListItem as MuiListItem,
  ListItemText,
  ListItemIcon,
  Table as MuiTable,
  TableHead,
  TableBody as MuiTableBody,
  TableRow as MuiTableRow,
  TableCell as MuiTableCell,
  LinearProgress,
  CircularProgress,
  Alert as MuiAlert,
  AlertTitle,
  Skeleton as MuiSkeleton,
  Tabs as MuiTabs,
  Tab as MuiTab,
  Breadcrumbs,
  Pagination as MuiPagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Drawer as MuiDrawer,
  Tooltip as MuiTooltip,
  Popover as MuiPopover,
  Menu,
  Accordion as MuiAccordion,
  AccordionSummary,
  AccordionDetails,
  Collapse,
  Rating as MuiRating,
  Stepper as MuiStepper,
  Step as MuiStep,
  StepLabel,
  SvgIcon,
  Paper,
} from '@mui/material';

// ============================================================================
// Theme Configuration
// ============================================================================

export const muiTheme: RegistryTheme = {
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
    heading: 'Roboto, "Helvetica Neue", Arial, sans-serif',
    body: 'Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: '"Roboto Mono", monospace',
  },
  borderRadius: '4px',
  shadows: true,
};

// ============================================================================
// Inline SVG Icons (avoiding @mui/icons-material dependency)
// ============================================================================

const ExpandMoreIcon = (props: { fontSize?: 'small' | 'medium' | 'large'; sx?: object }) => (
  <SvgIcon {...props}>
    <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z" />
  </SvgIcon>
);

const NavigateNextIcon = (props: { fontSize?: 'small' | 'medium' | 'large' }) => (
  <SvgIcon {...props}>
    <path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
  </SvgIcon>
);

const StarIcon = (props: { fontSize?: 'small' | 'medium' | 'large' }) => (
  <SvgIcon {...props}>
    <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </SvgIcon>
);

const HomeIcon = (props: { fontSize?: 'small' | 'medium' | 'large' }) => (
  <SvgIcon {...props}>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </SvgIcon>
);

const FolderIcon = (props: { fontSize?: 'small' | 'medium' | 'large' }) => (
  <SvgIcon {...props}>
    <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
  </SvgIcon>
);

const CheckCircleIcon = (props: { fontSize?: 'small' | 'medium' | 'large' }) => (
  <SvgIcon {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </SvgIcon>
);

const ErrorIcon = (props: { fontSize?: 'small' | 'medium' | 'large' }) => (
  <SvgIcon {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
  </SvgIcon>
);

const WarningIcon = (props: { fontSize?: 'small' | 'medium' | 'large' }) => (
  <SvgIcon {...props}>
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
  </SvgIcon>
);

const InfoIcon = (props: { fontSize?: 'small' | 'medium' | 'large' }) => (
  <SvgIcon {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
  </SvgIcon>
);

const CloseIcon = (props: { fontSize?: 'small' | 'medium' | 'large' }) => (
  <SvgIcon {...props}>
    <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </SvgIcon>
);

const CloudUploadIcon = (props: { fontSize?: 'small' | 'medium' | 'large' }) => (
  <SvgIcon {...props}>
    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
  </SvgIcon>
);

const FormatQuoteIcon = (props: { fontSize?: 'small' | 'medium' | 'large' }) => (
  <SvgIcon {...props}>
    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
  </SvgIcon>
);

const EmailIcon = (props: { fontSize?: 'small' | 'medium' | 'large' }) => (
  <SvgIcon {...props}>
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
  </SvgIcon>
);

const TwitterIcon = (props: { fontSize?: 'small' | 'medium' | 'large' }) => (
  <SvgIcon {...props}>
    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
  </SvgIcon>
);

const GitHubIcon = (props: { fontSize?: 'small' | 'medium' | 'large' }) => (
  <SvgIcon {...props}>
    <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3" />
  </SvgIcon>
);

const LinkedInIcon = (props: { fontSize?: 'small' | 'medium' | 'large' }) => (
  <SvgIcon {...props}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </SvgIcon>
);

// Icon mapping helper
const getIcon = (iconName: string, size: 'small' | 'medium' | 'large' = 'medium') => {
  const icons: Record<string, React.ReactNode> = {
    home: <HomeIcon fontSize={size} />,
    star: <StarIcon fontSize={size} />,
    folder: <FolderIcon fontSize={size} />,
    check: <CheckCircleIcon fontSize={size} />,
    error: <ErrorIcon fontSize={size} />,
    warning: <WarningIcon fontSize={size} />,
    info: <InfoIcon fontSize={size} />,
    close: <CloseIcon fontSize={size} />,
    expand: <ExpandMoreIcon fontSize={size} />,
    next: <NavigateNextIcon fontSize={size} />,
    upload: <CloudUploadIcon fontSize={size} />,
    quote: <FormatQuoteIcon fontSize={size} />,
    email: <EmailIcon fontSize={size} />,
    twitter: <TwitterIcon fontSize={size} />,
    github: <GitHubIcon fontSize={size} />,
    linkedin: <LinkedInIcon fontSize={size} />,
  };
  return icons[iconName] || <StarIcon fontSize={size} />;
};

// ============================================================================
// Prop Transformation Utilities
// ============================================================================

/**
 * Map universal variant to MUI Button variant
 * Universal: primary, secondary, ghost, outline, link
 * MUI: contained, outlined, text
 */
const mapButtonVariant = (variant?: string): 'text' | 'outlined' | 'contained' => {
  if (variant === 'ghost' || variant === 'link' || variant === 'text') return 'text';
  if (variant === 'outline' || variant === 'secondary' || variant === 'outlined') return 'outlined';
  return 'contained';
};

/**
 * Map universal color to MUI color (no default/inherit - all components accept these)
 */
const mapColor = (
  color?: string
): 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' => {
  const colorMap: Record<string, 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'> = {
    default: 'primary',
    primary: 'primary',
    secondary: 'secondary',
    success: 'success',
    danger: 'error',
    error: 'error',
    warning: 'warning',
    info: 'info',
    accent: 'secondary',
  };
  return colorMap[color || 'default'] || 'primary';
};

/**
 * Map universal color for buttons (supports inherit)
 */
const mapButtonColor = (
  color?: string
): 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'inherit' => {
  if (color === 'inherit') return 'inherit';
  return mapColor(color);
};

/**
 * Map universal color to Chip color (no inherit)
 */
const mapChipColor = (
  color?: string
): 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'default' => {
  const colorMap: Record<string, 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'default'> = {
    default: 'default',
    primary: 'primary',
    secondary: 'secondary',
    success: 'success',
    danger: 'error',
    error: 'error',
    warning: 'warning',
    info: 'info',
  };
  return colorMap[color || 'default'] || 'default';
};

/**
 * Map universal size to MUI size
 */
const mapSize = (size?: string): 'small' | 'medium' | 'large' => {
  if (size === 'xs' || size === 'sm') return 'small';
  if (size === 'lg' || size === 'xl') return 'large';
  return 'medium';
};

/**
 * Map to small/medium only (for components that don't support large)
 */
const mapSmallMediumSize = (size?: string): 'small' | 'medium' => {
  if (size === 'xs' || size === 'sm') return 'small';
  return 'medium';
};

// ============================================================================
// MUI Component Registry
// ============================================================================

export const muiMapper: ComponentRegistry = {
  // ==========================================================================
  // Layout Components
  // ==========================================================================

  Container: ({ element, children }) => {
    const { maxWidth = 'lg', centered } = element.props as {
      maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
      centered?: boolean;
    };
    return (
      <MuiContainer
        maxWidth={maxWidth}
        sx={centered ? { display: 'flex', flexDirection: 'column', alignItems: 'center' } : undefined}
      >
        {children}
      </MuiContainer>
    );
  },

  Row: ({ element, children }) => {
    const { gap = 2, justify, align, wrap, reverse } = element.props as {
      gap?: number;
      justify?: string;
      align?: string;
      wrap?: boolean;
      reverse?: boolean;
    };
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: reverse ? 'row-reverse' : 'row',
          gap,
          justifyContent: justify || 'flex-start',
          alignItems: align || 'stretch',
          flexWrap: wrap ? 'wrap' : 'nowrap',
        }}
      >
        {children}
      </Box>
    );
  },

  Column: ({ element, children }) => {
    const { gap = 2, justify, align } = element.props as {
      gap?: number;
      justify?: string;
      align?: string
    };
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap,
          justifyContent: justify || 'flex-start',
          alignItems: align || 'stretch',
        }}
      >
        {children}
      </Box>
    );
  },

  Grid: ({ element, children }) => {
    const { cols = 12, gap = 2, rowGap, colGap } = element.props as {
      cols?: number;
      gap?: number;
      rowGap?: number;
      colGap?: number
    };
    return (
      <MuiGrid
        container
        spacing={gap}
        rowSpacing={rowGap}
        columnSpacing={colGap}
        columns={cols}
      >
        {children}
      </MuiGrid>
    );
  },

  Stack: ({ element, children }) => {
    const { direction = 'column', gap = 2, align, justify, wrap, divider } = element.props as {
      direction?: 'row' | 'column';
      gap?: number;
      align?: string;
      justify?: string;
      wrap?: boolean;
      divider?: boolean;
    };
    return (
      <MuiStack
        direction={direction}
        spacing={gap}
        alignItems={align}
        justifyContent={justify}
        flexWrap={wrap ? 'wrap' : 'nowrap'}
        divider={divider ? <MuiDivider orientation={direction === 'row' ? 'vertical' : 'horizontal'} flexItem /> : undefined}
      >
        {children}
      </MuiStack>
    );
  },

  Spacer: ({ element }) => {
    const { size = 2, flexible } = element.props as { size?: number; flexible?: boolean };
    if (flexible) {
      return <Box sx={{ flex: 1 }} />;
    }
    return <Box sx={{ height: size * 8, width: size * 8 }} />;
  },

  Divider: ({ element }) => {
    const { orientation = 'horizontal', variant, label } = element.props as {
      orientation?: 'horizontal' | 'vertical';
      variant?: string;
      label?: string;
    };
    return (
      <MuiDivider
        orientation={orientation}
        variant={variant as 'fullWidth' | 'inset' | 'middle' | undefined}
        flexItem={orientation === 'vertical'}
      >
        {label}
      </MuiDivider>
    );
  },

  // ==========================================================================
  // Card Components
  // ==========================================================================

  Card: ({ element, children }) => {
    const { variant, elevation = 1, hoverable } = element.props as {
      variant?: string;
      elevation?: number;
      hoverable?: boolean;
    };
    return (
      <MuiCard
        variant={variant === 'outlined' ? 'outlined' : 'elevation'}
        elevation={variant === 'outlined' ? 0 : elevation}
        sx={hoverable ? {
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 }
        } : undefined}
      >
        {children}
      </MuiCard>
    );
  },

  CardHeader: ({ element }) => {
    const { title, subtitle, avatar, action } = element.props as {
      title?: string;
      subtitle?: string;
      avatar?: string;
      action?: React.ReactNode
    };
    return (
      <MuiCardHeader
        title={title}
        subheader={subtitle}
        avatar={avatar ? <MuiAvatar src={avatar} /> : undefined}
        action={action}
      />
    );
  },

  CardBody: ({ children }) => <CardContent>{children}</CardContent>,

  CardFooter: ({ element, children }) => {
    const { align } = element.props as { align?: string };
    return (
      <CardActions sx={{ justifyContent: align === 'center' ? 'center' : align === 'between' ? 'space-between' : 'flex-end' }}>
        {children}
      </CardActions>
    );
  },

  // ==========================================================================
  // Typography Components
  // ==========================================================================

  Heading: ({ element }) => {
    const { level = 1, children: textContent, text } = element.props as {
      level?: number;
      children?: string;
      text?: string
    };
    const content = textContent || text;
    const variantMap: Record<number, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'> = {
      1: 'h1', 2: 'h2', 3: 'h3', 4: 'h4', 5: 'h5', 6: 'h6',
    };
    return (
      <Typography variant={variantMap[level] || 'h1'} gutterBottom>
        {content}
      </Typography>
    );
  },

  Text: ({ element }) => {
    const { variant = 'body1', children: textContent, text, content, color, align } = element.props as {
      variant?: string;
      children?: string;
      text?: string;
      content?: string;
      color?: string;
      align?: 'left' | 'center' | 'right';
    };
    const displayContent = textContent || text || content;
    return (
      <Typography
        variant={variant as 'body1' | 'body2' | 'caption' | 'overline' | 'subtitle1' | 'subtitle2'}
        color={color || 'textPrimary'}
        align={align}
      >
        {displayContent}
      </Typography>
    );
  },

  Link: ({ element }) => {
    const { href, children: textContent, text, target, external } = element.props as {
      href?: string;
      children?: string;
      text?: string;
      target?: string;
      external?: boolean;
    };
    const content = textContent || text;
    return (
      <MuiLink
        href={href}
        target={external ? '_blank' : target}
        rel={external ? 'noopener noreferrer' : undefined}
        underline="hover"
      >
        {content}
      </MuiLink>
    );
  },

  // ==========================================================================
  // Button Components
  // ==========================================================================

  Button: ({ element }) => {
    const {
      label, children: textContent, variant, color, size, disabled, fullWidth,
      startIcon, endIcon, leftIcon, rightIcon, onClick, loading
    } = element.props as {
      label?: string;
      children?: string;
      variant?: string;
      color?: string;
      size?: string;
      disabled?: boolean;
      fullWidth?: boolean;
      startIcon?: string;
      endIcon?: string;
      leftIcon?: string;
      rightIcon?: string;
      onClick?: () => void;
      loading?: boolean;
    };
    const content = label || textContent;
    const iconStart = startIcon || leftIcon;
    const iconEnd = endIcon || rightIcon;
    return (
      <MuiButton
        variant={mapButtonVariant(variant)}
        color={mapColor(color)}
        size={mapSize(size)}
        disabled={disabled || loading}
        fullWidth={fullWidth}
        startIcon={iconStart ? getIcon(iconStart) : undefined}
        endIcon={iconEnd ? getIcon(iconEnd) : undefined}
        onClick={onClick}
      >
        {loading && <CircularProgress size={16} sx={{ mr: 1 }} />}
        {content}
      </MuiButton>
    );
  },

  IconButton: ({ element }) => {
    const { icon, label, color, size, disabled } = element.props as {
      icon: string;
      label?: string;
      color?: string;
      size?: string;
      disabled?: boolean;
    };
    return (
      <MuiIconButton
        aria-label={label}
        color={mapColor(color)}
        size={mapSize(size)}
        disabled={disabled}
      >
        {getIcon(icon, mapSize(size))}
      </MuiIconButton>
    );
  },

  ButtonGroup: ({ element, children }) => {
    const { variant, color, size, orientation } = element.props as {
      variant?: string;
      color?: string;
      size?: string;
      orientation?: 'horizontal' | 'vertical';
    };
    return (
      <MuiButtonGroup
        variant={mapButtonVariant(variant)}
        color={mapColor(color)}
        size={mapSize(size)}
        orientation={orientation}
      >
        {children}
      </MuiButtonGroup>
    );
  },

  // ==========================================================================
  // Form Components
  // ==========================================================================

  Input: ({ element }) => {
    const {
      label, placeholder, type = 'text', value, disabled, required,
      error, helperText, hint, fullWidth = true, size, variant
    } = element.props as {
      label?: string;
      placeholder?: string;
      type?: string;
      value?: string;
      disabled?: boolean;
      required?: boolean;
      error?: boolean | string;
      helperText?: string;
      hint?: string;
      fullWidth?: boolean;
      size?: string;
      variant?: string;
    };
    return (
      <TextField
        label={label}
        placeholder={placeholder}
        type={type}
        defaultValue={value}
        disabled={disabled}
        required={required}
        error={Boolean(error)}
        helperText={typeof error === 'string' ? error : helperText || hint}
        fullWidth={fullWidth}
        size={mapSmallMediumSize(size)}
        variant={variant === 'filled' ? 'filled' : variant === 'standard' ? 'standard' : 'outlined'}
      />
    );
  },

  TextArea: ({ element }) => {
    const { label, placeholder, value, rows = 4, disabled, required, fullWidth = true } = element.props as {
      label?: string;
      placeholder?: string;
      value?: string;
      rows?: number;
      disabled?: boolean;
      required?: boolean;
      fullWidth?: boolean;
    };
    return (
      <TextField
        label={label}
        placeholder={placeholder}
        defaultValue={value}
        multiline
        rows={rows}
        disabled={disabled}
        required={required}
        fullWidth={fullWidth}
        variant="outlined"
      />
    );
  },

  Select: ({ element }) => {
    const {
      label, placeholder, options = [], value, disabled, required, fullWidth = true, size
    } = element.props as {
      label?: string;
      placeholder?: string;
      options?: { value: string; label: string }[];
      value?: string;
      disabled?: boolean;
      required?: boolean;
      fullWidth?: boolean;
      size?: string;
    };
    return (
      <FormControl fullWidth={fullWidth} size={mapSmallMediumSize(size)}>
        {label && <InputLabel>{label}</InputLabel>}
        <MuiSelect label={label} defaultValue={value || ''} disabled={disabled} required={required}>
          {placeholder && <MenuItem value="" disabled>{placeholder}</MenuItem>}
          {options.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
          ))}
        </MuiSelect>
      </FormControl>
    );
  },

  Checkbox: ({ element }) => {
    const { label, checked, disabled, color } = element.props as {
      label?: string;
      checked?: boolean;
      disabled?: boolean;
      color?: string;
    };
    return (
      <FormControlLabel
        control={<MuiCheckbox defaultChecked={checked} disabled={disabled} color={mapColor(color)} />}
        label={label || ''}
      />
    );
  },

  Radio: ({ element }) => {
    const { label, value, disabled, color } = element.props as {
      label?: string;
      value?: string;
      disabled?: boolean;
      color?: string;
    };
    return (
      <FormControlLabel
        control={<MuiRadio value={value} disabled={disabled} color={mapColor(color)} />}
        label={label || ''}
      />
    );
  },

  RadioGroup: ({ element, children }) => {
    const { label, orientation = 'vertical', value } = element.props as {
      label?: string;
      orientation?: 'horizontal' | 'vertical';
      value?: string;
    };
    return (
      <FormControl>
        {label && <Typography variant="subtitle2" gutterBottom>{label}</Typography>}
        <MuiRadioGroup defaultValue={value} row={orientation === 'horizontal'}>
          {children}
        </MuiRadioGroup>
      </FormControl>
    );
  },

  Switch: ({ element }) => {
    const { label, checked, disabled, color } = element.props as {
      label?: string;
      checked?: boolean;
      disabled?: boolean;
      color?: string;
    };
    return (
      <FormControlLabel
        control={<MuiSwitch defaultChecked={checked} disabled={disabled} color={mapColor(color)} />}
        label={label || ''}
      />
    );
  },

  Slider: ({ element }) => {
    const { label, min = 0, max = 100, value, step = 1, disabled, marks, valueLabelDisplay = 'auto' } = element.props as {
      label?: string;
      min?: number;
      max?: number;
      value?: number;
      step?: number;
      disabled?: boolean;
      marks?: boolean;
      valueLabelDisplay?: 'auto' | 'on' | 'off';
    };
    return (
      <Box sx={{ width: '100%' }}>
        {label && <Typography variant="subtitle2" gutterBottom>{label}</Typography>}
        <MuiSlider
          defaultValue={value || min}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          marks={marks}
          valueLabelDisplay={valueLabelDisplay}
        />
      </Box>
    );
  },

  // ==========================================================================
  // Data Display Components
  // ==========================================================================

  Badge: ({ element }) => {
    const { label, children: textContent, text, color, variant } = element.props as {
      label?: string;
      children?: string;
      text?: string;
      color?: string;
      variant?: string;
    };
    const content = label || textContent || text;
    return (
      <Chip
        label={content}
        color={mapChipColor(color)}
        variant={variant === 'outline' || variant === 'outlined' ? 'outlined' : 'filled'}
        size="small"
      />
    );
  },

  Avatar: ({ element }) => {
    const { src, alt, name, size, status } = element.props as {
      src?: string;
      alt?: string;
      name?: string;
      size?: string;
      status?: 'online' | 'offline' | 'away' | 'busy';
    };
    const sizeMap: Record<string, number> = { xs: 24, sm: 32, md: 40, lg: 56, xl: 72 };
    const avatarSize = sizeMap[size || 'md'] || 40;
    const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : undefined;

    const avatar = (
      <MuiAvatar src={src} alt={alt || name} sx={{ width: avatarSize, height: avatarSize }}>
        {!src && initials}
      </MuiAvatar>
    );

    if (status) {
      const statusColors: Record<string, string> = {
        online: '#4caf50',
        offline: '#9e9e9e',
        away: '#ff9800',
        busy: '#f44336',
      };
      return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          {avatar}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: 12,
              height: 12,
              borderRadius: '50%',
              bgcolor: statusColors[status],
              border: '2px solid white',
            }}
          />
        </Box>
      );
    }
    return avatar;
  },

  AvatarGroup: ({ element, children }) => {
    const { max = 4 } = element.props as { max?: number };
    return <MuiAvatarGroup max={max}>{children}</MuiAvatarGroup>;
  },

  Icon: ({ element }) => {
    const { name, size, color } = element.props as { name: string; size?: string; color?: string };
    return (
      <Box component="span" sx={{ color: color || 'inherit', display: 'inline-flex' }}>
        {getIcon(name, mapSize(size))}
      </Box>
    );
  },

  Image: ({ element }) => {
    const { src, alt, width, height, objectFit = 'cover', rounded } = element.props as {
      src: string;
      alt?: string;
      width?: number | string;
      height?: number | string;
      objectFit?: string;
      rounded?: string;
    };
    const borderRadius = rounded === 'full' ? '50%' : rounded === 'lg' ? 2 : rounded === 'none' ? 0 : 1;
    return (
      <Box
        component="img"
        src={src}
        alt={alt || ''}
        sx={{
          width: width || '100%',
          height: height || 'auto',
          objectFit: objectFit as 'cover' | 'contain' | 'fill',
          borderRadius,
        }}
      />
    );
  },

  List: ({ element, children }) => {
    const { dense } = element.props as { dense?: boolean };
    return <MuiList dense={dense}>{children}</MuiList>;
  },

  ListItem: ({ element, children }) => {
    const { icon, primary, secondary, divider } = element.props as {
      icon?: string;
      primary?: string;
      secondary?: string;
      divider?: boolean;
    };
    return (
      <MuiListItem divider={divider}>
        {icon && <ListItemIcon>{getIcon(icon)}</ListItemIcon>}
        {(primary || secondary) ? (
          <ListItemText primary={primary} secondary={secondary} />
        ) : children}
      </MuiListItem>
    );
  },

  Table: ({ element, children }) => {
    const { size } = element.props as { size?: string };
    return <MuiTable size={mapSmallMediumSize(size)}>{children}</MuiTable>;
  },

  TableHeader: ({ children }) => <TableHead>{children}</TableHead>,
  TableBody: ({ children }) => <MuiTableBody>{children}</MuiTableBody>,

  TableRow: ({ element, children }) => {
    const { selected, hover, hoverable } = element.props as {
      selected?: boolean;
      hover?: boolean;
      hoverable?: boolean;
    };
    return <MuiTableRow selected={selected} hover={hover || hoverable}>{children}</MuiTableRow>;
  },

  TableCell: ({ element, children }) => {
    const { align, variant, header, width } = element.props as {
      align?: 'left' | 'center' | 'right';
      variant?: 'head' | 'body';
      header?: boolean;
      width?: string | number;
    };
    return (
      <MuiTableCell
        align={align}
        variant={header ? 'head' : variant}
        sx={width ? { width } : undefined}
      >
        {children}
      </MuiTableCell>
    );
  },

  Metric: ({ element }) => {
    const { label, value, change, trend, changeType } = element.props as {
      label: string;
      value: string | number;
      change?: string | number;
      trend?: 'up' | 'down' | 'neutral';
      changeType?: 'positive' | 'negative' | 'neutral';
    };
    const trendDirection = trend || (changeType === 'positive' ? 'up' : changeType === 'negative' ? 'down' : 'neutral');
    const trendColor = trendDirection === 'up' ? 'success.main' : trendDirection === 'down' ? 'error.main' : 'text.secondary';
    return (
      <Box>
        <Typography variant="caption" color="text.secondary">{label}</Typography>
        <Typography variant="h4">{value}</Typography>
        {change && (
          <Typography variant="body2" sx={{ color: trendColor }}>
            {trendDirection === 'up' ? '+' : trendDirection === 'down' ? '-' : ''}{change}
          </Typography>
        )}
      </Box>
    );
  },

  Progress: ({ element }) => {
    const { value, variant = 'determinate', color, max = 100, showValue } = element.props as {
      value?: number;
      variant?: 'determinate' | 'indeterminate';
      color?: string;
      max?: number;
      showValue?: boolean;
    };
    const percentage = value !== undefined ? (value / max) * 100 : undefined;
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
        <LinearProgress
          variant={variant}
          value={percentage}
          color={mapColor(color)}
          sx={{ flex: 1, borderRadius: 1 }}
        />
        {showValue && value !== undefined && (
          <Typography variant="body2" color="text.secondary">{Math.round(percentage || 0)}%</Typography>
        )}
      </Box>
    );
  },

  // ==========================================================================
  // Feedback Components
  // ==========================================================================

  Alert: ({ element }) => {
    const { title, description, message, status = 'info', variant, closable } = element.props as {
      title?: string;
      description?: string;
      message?: string;
      status?: 'info' | 'success' | 'warning' | 'error';
      variant?: string;
      closable?: boolean;
    };
    const severityMap: Record<string, 'info' | 'success' | 'warning' | 'error'> = {
      info: 'info', success: 'success', warning: 'warning', error: 'error', danger: 'error',
    };
    return (
      <MuiAlert
        severity={severityMap[status] || 'info'}
        variant={variant === 'outline' || variant === 'outlined' ? 'outlined' : 'standard'}
        onClose={closable ? () => {} : undefined}
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {description || message}
      </MuiAlert>
    );
  },

  Toast: ({ element }) => {
    const { title, description, status = 'info' } = element.props as {
      title?: string;
      description?: string;
      status?: string;
    };
    const severityMap: Record<string, 'info' | 'success' | 'warning' | 'error'> = {
      info: 'info', success: 'success', warning: 'warning', error: 'error', danger: 'error',
    };
    return (
      <MuiAlert severity={severityMap[status] || 'info'} sx={{ mb: 1 }}>
        {title && <AlertTitle>{title}</AlertTitle>}
        {description}
      </MuiAlert>
    );
  },

  Skeleton: ({ element }) => {
    const { variant = 'rectangular', width, height, animation = 'wave', lines } = element.props as {
      variant?: 'text' | 'rectangular' | 'circular' | 'rounded';
      width?: number | string;
      height?: number | string;
      animation?: 'pulse' | 'wave' | false;
      lines?: number;
    };
    if (lines && lines > 1) {
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {Array.from({ length: lines }).map((_, i) => (
            <MuiSkeleton key={i} variant="text" width={i === lines - 1 ? '60%' : '100%'} animation={animation} />
          ))}
        </Box>
      );
    }
    return (
      <MuiSkeleton
        variant={variant === 'rounded' ? 'rectangular' : variant}
        width={width || '100%'}
        height={height || 40}
        animation={animation}
        sx={variant === 'rounded' ? { borderRadius: 2 } : undefined}
      />
    );
  },

  Spinner: ({ element }) => {
    const { size, color, label } = element.props as { size?: string; color?: string; label?: string };
    const sizeMap: Record<string, number> = { xs: 16, sm: 20, md: 40, lg: 60 };
    return (
      <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
        <CircularProgress size={sizeMap[size || 'md'] || 40} color={mapColor(color)} />
        {label && <Typography variant="body2" color="text.secondary">{label}</Typography>}
      </Box>
    );
  },

  EmptyState: ({ element }) => {
    const { title, description, icon, actionLabel } = element.props as {
      title?: string;
      description?: string;
      icon?: string;
      actionLabel?: string;
    };
    return (
      <Box sx={{ textAlign: 'center', py: 6 }}>
        {icon && (
          <Box sx={{ mb: 2, color: 'text.disabled' }}>
            {getIcon(icon, 'large')}
          </Box>
        )}
        {title && <Typography variant="h6" gutterBottom>{title}</Typography>}
        {description && <Typography variant="body2" color="text.secondary">{description}</Typography>}
        {actionLabel && (
          <Box sx={{ mt: 3 }}>
            <MuiButton variant="contained">{actionLabel}</MuiButton>
          </Box>
        )}
      </Box>
    );
  },

  // ==========================================================================
  // Navigation Components
  // ==========================================================================

  Tabs: ({ element, children }) => {
    const { value, variant, color } = element.props as {
      value?: string | number;
      variant?: string;
      color?: string;
    };
    const mappedColor = mapColor(color);
    const tabColor: 'primary' | 'secondary' = (mappedColor === 'primary' || mappedColor === 'secondary') ? mappedColor : 'primary';
    return (
      <Box>
        <MuiTabs
          value={value || 0}
          variant={variant as 'standard' | 'scrollable' | 'fullWidth' | undefined}
          textColor={tabColor}
          indicatorColor={tabColor}
        >
          {children}
        </MuiTabs>
      </Box>
    );
  },

  TabList: ({ children }) => <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>{children}</Box>,

  Tab: ({ element }) => {
    const { value, label, disabled, icon } = element.props as {
      value: string;
      label: string;
      disabled?: boolean;
      icon?: string;
    };
    return (
      <MuiTab
        value={value}
        label={label}
        disabled={disabled}
        icon={icon ? (getIcon(icon, 'small') as React.ReactElement) : undefined}
        iconPosition="start"
      />
    );
  },

  TabPanel: ({ element, children }) => {
    const { value } = element.props as { value: string };
    return (
      <Box role="tabpanel" sx={{ p: 3 }} data-value={value}>
        {children}
      </Box>
    );
  },

  Breadcrumb: ({ children }) => (
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
      {children}
    </Breadcrumbs>
  ),

  BreadcrumbItem: ({ element }) => {
    const { label, href, active, current } = element.props as {
      label: string;
      href?: string;
      active?: boolean;
      current?: boolean;
    };
    if (active || current) {
      return <Typography color="text.primary">{label}</Typography>;
    }
    return (
      <MuiLink href={href} underline="hover" color="inherit">
        {label}
      </MuiLink>
    );
  },

  Pagination: ({ element }) => {
    const { count = 10, totalPages, page = 1, currentPage, color, size, variant } = element.props as {
      count?: number;
      totalPages?: number;
      page?: number;
      currentPage?: number;
      color?: string;
      size?: string;
      variant?: string;
    };
    const pageCount = totalPages || count;
    const activePage = currentPage || page;
    const mappedColor = mapColor(color);
    const paginationColor: 'primary' | 'secondary' | 'standard' = (mappedColor === 'primary' || mappedColor === 'secondary') ? mappedColor : 'primary';
    return (
      <MuiPagination
        count={pageCount}
        page={activePage}
        color={paginationColor}
        size={mapSize(size)}
        variant={variant === 'outline' || variant === 'outlined' ? 'outlined' : 'text'}
      />
    );
  },

  NavMenu: ({ element, children }) => {
    const { orientation = 'horizontal' } = element.props as { orientation?: 'horizontal' | 'vertical' };
    return (
      <Box
        component="nav"
        sx={{
          display: 'flex',
          flexDirection: orientation === 'vertical' ? 'column' : 'row',
          gap: 1,
        }}
      >
        {children}
      </Box>
    );
  },

  NavItem: ({ element }) => {
    const { label, href, active, icon, badge } = element.props as {
      label: string;
      href?: string;
      active?: boolean;
      icon?: string;
      badge?: string;
    };
    return (
      <MuiButton
        href={href}
        variant={active ? 'contained' : 'text'}
        startIcon={icon ? getIcon(icon, 'small') : undefined}
        endIcon={badge ? <Chip label={badge} size="small" /> : undefined}
        sx={{ justifyContent: 'flex-start' }}
      >
        {label}
      </MuiButton>
    );
  },

  // ==========================================================================
  // Overlay Components
  // ==========================================================================

  Modal: ({ element, children }) => {
    const { title, open = true, maxWidth = 'sm', closable } = element.props as {
      title?: string;
      open?: boolean;
      maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
      closable?: boolean;
    };
    return (
      <Dialog open={open} maxWidth={maxWidth} fullWidth>
        {title && (
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {title}
            {closable && (
              <MuiIconButton size="small">
                <CloseIcon fontSize="small" />
              </MuiIconButton>
            )}
          </DialogTitle>
        )}
        <DialogContent>{children}</DialogContent>
      </Dialog>
    );
  },

  Drawer: ({ element, children }) => {
    const { title, placement = 'right', open = true, size } = element.props as {
      title?: string;
      placement?: 'left' | 'right' | 'top' | 'bottom';
      open?: boolean;
      size?: string;
    };
    const widthMap: Record<string, number> = { sm: 240, md: 320, lg: 400, xl: 500 };
    const drawerWidth = widthMap[size || 'md'] || 320;
    return (
      <MuiDrawer anchor={placement} open={open}>
        <Box sx={{ width: placement === 'top' || placement === 'bottom' ? 'auto' : drawerWidth, p: 2 }}>
          {title && <Typography variant="h6" gutterBottom>{title}</Typography>}
          {children}
        </Box>
      </MuiDrawer>
    );
  },

  Tooltip: ({ element, children }) => {
    const { content, placement = 'top' } = element.props as { content: string; placement?: string };
    return (
      <MuiTooltip title={content} placement={placement as 'top' | 'bottom' | 'left' | 'right'}>
        <span>{children}</span>
      </MuiTooltip>
    );
  },

  Popover: ({ element, children }) => {
    const { anchorEl } = element.props as { anchorEl?: HTMLElement | null };
    return (
      <MuiPopover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box sx={{ p: 2 }}>{children}</Box>
      </MuiPopover>
    );
  },

  Dropdown: ({ element, children }) => {
    const { trigger } = element.props as { trigger: string };
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    return (
      <Box>
        <MuiButton onClick={(e) => setAnchorEl(e.currentTarget)}>{trigger}</MuiButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
          {children}
        </Menu>
      </Box>
    );
  },

  DropdownItem: ({ element }) => {
    const { label, icon, disabled, destructive } = element.props as {
      label: string;
      icon?: string;
      disabled?: boolean;
      destructive?: boolean;
    };
    return (
      <MenuItem disabled={disabled} sx={{ color: destructive ? 'error.main' : 'inherit' }}>
        {icon && <ListItemIcon>{getIcon(icon, 'small')}</ListItemIcon>}
        {label}
      </MenuItem>
    );
  },

  // ==========================================================================
  // Collapse & Accordion Components
  // ==========================================================================

  Accordion: ({ children }) => (
    <Box>
      {React.Children.map(children, (child, index) => (
        <React.Fragment key={index}>{child}</React.Fragment>
      ))}
    </Box>
  ),

  AccordionItem: ({ element, children }) => {
    const { title, defaultExpanded, value, icon } = element.props as {
      title: string;
      defaultExpanded?: boolean;
      value?: string;
      icon?: string;
    };
    return (
      <MuiAccordion defaultExpanded={defaultExpanded} data-value={value}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {icon && getIcon(icon, 'small')}
            <Typography>{title}</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </MuiAccordion>
    );
  },

  Collapsible: ({ element, children }) => {
    const { title, defaultOpen } = element.props as { title?: string; defaultOpen?: boolean };
    const [open, setOpen] = React.useState(defaultOpen || false);
    return (
      <Box>
        {title && (
          <MuiButton
            onClick={() => setOpen(!open)}
            endIcon={<ExpandMoreIcon sx={{ transform: open ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />}
            sx={{ mb: 1 }}
          >
            {title}
          </MuiButton>
        )}
        <Collapse in={open}>{children}</Collapse>
      </Box>
    );
  },

  // ==========================================================================
  // Specialized Components
  // ==========================================================================

  Chart: ({ element }) => {
    const { type, height = 200, title } = element.props as { type: string; height?: number; title?: string };
    return (
      <Box
        sx={{
          width: '100%',
          height,
          bgcolor: 'grey.100',
          borderRadius: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {title && <Typography variant="subtitle2" gutterBottom>{title}</Typography>}
        <Typography color="text.secondary">Chart: {type}</Typography>
      </Box>
    );
  },

  Calendar: ({ element }) => {
    const { month, year } = element.props as { month?: number; year?: number };
    return (
      <Box sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
        <Typography variant="subtitle1" gutterBottom>
          {month && year ? `${month}/${year}` : 'Calendar'}
        </Typography>
        <Typography color="text.secondary">Calendar Placeholder</Typography>
      </Box>
    );
  },

  DatePicker: ({ element }) => {
    const { label, placeholder, value } = element.props as { label?: string; placeholder?: string; value?: string };
    return (
      <TextField
        label={label}
        placeholder={placeholder}
        defaultValue={value}
        type="date"
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
    );
  },

  FileUpload: ({ element }) => {
    const { label, accept, multiple } = element.props as { label?: string; accept?: string; multiple?: boolean };
    return (
      <Box>
        {label && <Typography variant="subtitle2" gutterBottom>{label}</Typography>}
        <MuiButton component="label" variant="outlined" startIcon={<CloudUploadIcon />}>
          Upload File
          <input type="file" hidden accept={accept} multiple={multiple} />
        </MuiButton>
      </Box>
    );
  },

  Rating: ({ element }) => {
    const { value, max = 5, size, readOnly, readonly } = element.props as {
      value?: number;
      max?: number;
      size?: string;
      readOnly?: boolean;
      readonly?: boolean;
    };
    return (
      <MuiRating
        defaultValue={value}
        max={max}
        size={mapSize(size)}
        readOnly={readOnly || readonly}
      />
    );
  },

  TagInput: ({ element }) => {
    const { label, placeholder, tags = [] } = element.props as {
      label?: string;
      placeholder?: string;
      tags?: string[];
    };
    return (
      <Box>
        {label && <Typography variant="subtitle2" gutterBottom>{label}</Typography>}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, p: 1, border: 1, borderColor: 'divider', borderRadius: 1, minHeight: 42 }}>
          {tags.map((tag, index) => (
            <Chip key={index} label={tag} size="small" onDelete={() => {}} />
          ))}
          <TextField
            placeholder={placeholder}
            variant="standard"
            size="small"
            sx={{ flex: 1, minWidth: 100 }}
            InputProps={{ disableUnderline: true }}
          />
        </Box>
      </Box>
    );
  },

  ColorPicker: ({ element }) => {
    const { label, value = '#1976d2' } = element.props as { label?: string; value?: string };
    return (
      <Box>
        {label && <Typography variant="subtitle2" gutterBottom>{label}</Typography>}
        <Box
          component="input"
          type="color"
          defaultValue={value}
          sx={{ width: 60, height: 40, border: 1, borderColor: 'divider', borderRadius: 1, cursor: 'pointer', p: 0.5 }}
        />
      </Box>
    );
  },

  Timeline: ({ children }) => (
    <Box sx={{ pl: 2, borderLeft: 2, borderColor: 'primary.main' }}>
      {children}
    </Box>
  ),

  TimelineItem: ({ element }) => {
    const { title, description, date, time, icon, status } = element.props as {
      title: string;
      description?: string;
      date?: string;
      time?: string;
      icon?: string;
      status?: 'completed' | 'current' | 'upcoming';
    };
    const statusColor = status === 'completed' ? 'success.main' : status === 'current' ? 'primary.main' : 'grey.400';
    return (
      <Box sx={{ position: 'relative', pb: 3, pl: 3 }}>
        <Box
          sx={{
            position: 'absolute',
            left: -14,
            top: 0,
            width: 24,
            height: 24,
            bgcolor: statusColor,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
          }}
        >
          {icon ? getIcon(icon, 'small') : <Box sx={{ width: 8, height: 8, bgcolor: 'white', borderRadius: '50%' }} />}
        </Box>
        {(date || time) && <Typography variant="caption" color="text.secondary">{date || time}</Typography>}
        <Typography variant="subtitle2">{title}</Typography>
        {description && <Typography variant="body2" color="text.secondary">{description}</Typography>}
      </Box>
    );
  },

  Stepper: ({ element, children }) => {
    const { activeStep = 0, currentStep, orientation = 'horizontal', alternativeLabel } = element.props as {
      activeStep?: number;
      currentStep?: number;
      orientation?: 'horizontal' | 'vertical';
      alternativeLabel?: boolean;
    };
    return (
      <MuiStepper activeStep={currentStep ?? activeStep} orientation={orientation} alternativeLabel={alternativeLabel}>
        {children}
      </MuiStepper>
    );
  },

  Step: ({ element }) => {
    const { title, label, description, completed, optional } = element.props as {
      title?: string;
      label?: string;
      description?: string;
      completed?: boolean;
      optional?: boolean;
    };
    return (
      <MuiStep completed={completed}>
        <StepLabel
          optional={optional ? <Typography variant="caption">Optional</Typography> : undefined}
        >
          {title || label}
          {description && <Typography variant="caption" color="text.secondary">{description}</Typography>}
        </StepLabel>
      </MuiStep>
    );
  },

  Code: ({ element }) => {
    const { children: code, code: codeContent, language, showLineNumbers } = element.props as {
      children?: string;
      code?: string;
      language?: string;
      showLineNumbers?: boolean;
    };
    const content = code || codeContent || '';
    return (
      <Box
        component="pre"
        sx={{
          p: 2,
          bgcolor: 'grey.900',
          color: 'grey.100',
          borderRadius: 1,
          overflow: 'auto',
          fontFamily: 'monospace',
          fontSize: '0.875rem',
        }}
      >
        <code className={language ? `language-${language}` : undefined}>
          {showLineNumbers
            ? content.split('\n').map((line, i) => (
                <Box key={i} component="span" sx={{ display: 'block' }}>
                  <Box component="span" sx={{ color: 'grey.500', mr: 2, userSelect: 'none' }}>{i + 1}</Box>
                  {line}
                </Box>
              ))
            : content}
        </code>
      </Box>
    );
  },

  Kbd: ({ element }) => {
    const { children: key, keys } = element.props as { children?: string; keys?: string[] };
    const keyArray = keys || (key ? [key] : []);
    return (
      <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
        {keyArray.map((k, i) => (
          <React.Fragment key={i}>
            <Box
              component="kbd"
              sx={{
                px: 1,
                py: 0.5,
                bgcolor: 'grey.100',
                border: 1,
                borderColor: 'grey.300',
                borderRadius: 0.5,
                fontFamily: 'monospace',
                fontSize: '0.875rem',
              }}
            >
              {k}
            </Box>
            {i < keyArray.length - 1 && <Box component="span" sx={{ color: 'grey.400' }}>+</Box>}
          </React.Fragment>
        ))}
      </Box>
    );
  },

  Quote: ({ element }) => {
    const { children: text, text: textContent, author, source } = element.props as {
      children?: string;
      text?: string;
      author?: string;
      source?: string
    };
    const content = text || textContent;
    return (
      <Box
        component="blockquote"
        sx={{
          pl: 2,
          borderLeft: 4,
          borderColor: 'primary.main',
          fontStyle: 'italic',
          my: 2,
        }}
      >
        <Typography variant="body1">{content}</Typography>
        {(author || source) && (
          <Typography variant="caption" color="text.secondary">
            {author && `\u2014 ${author}`}{source && `, ${source}`}
          </Typography>
        )}
      </Box>
    );
  },

  Stat: ({ element }) => {
    const { label, value, helpText, icon, trend } = element.props as {
      label: string;
      value: string | number;
      helpText?: string;
      icon?: string;
      trend?: { direction: string; value: string };
    };
    return (
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        {icon && <Box sx={{ color: 'primary.main' }}>{getIcon(icon, 'large')}</Box>}
        <Box>
          <Typography variant="caption" color="text.secondary">{label}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
            <Typography variant="h4">{value}</Typography>
            {trend && (
              <Typography
                variant="body2"
                sx={{ color: trend.direction === 'up' ? 'success.main' : 'error.main' }}
              >
                {trend.direction === 'up' ? '\u2191' : '\u2193'} {trend.value}
              </Typography>
            )}
          </Box>
          {helpText && <Typography variant="body2" color="text.secondary">{helpText}</Typography>}
        </Box>
      </Box>
    );
  },

  Tag: ({ element }) => {
    const { label, children: textContent, color, variant, removable, closable } = element.props as {
      label?: string;
      children?: string;
      color?: string;
      variant?: string;
      removable?: boolean;
      closable?: boolean;
    };
    const content = label || textContent;
    return (
      <Chip
        label={content}
        color={mapChipColor(color)}
        variant={variant === 'outline' || variant === 'outlined' ? 'outlined' : 'filled'}
        size="small"
        onDelete={(removable || closable) ? () => {} : undefined}
      />
    );
  },

  // ==========================================================================
  // Marketing Components (Custom implementations using MUI primitives)
  // ==========================================================================

  Hero: ({ element }) => {
    const {
      title,
      subtitle,
      description,
      primaryAction,
      secondaryAction,
      image,
      alignment = 'center',
      variant = 'default',
    } = element.props as {
      title: string;
      subtitle?: string;
      description?: string;
      primaryAction?: { label: string; href?: string };
      secondaryAction?: { label: string; href?: string };
      image?: string;
      alignment?: 'left' | 'center' | 'right';
      variant?: 'default' | 'gradient' | 'image-bg';
    };

    const textAlign = alignment === 'center' ? 'center' : alignment === 'right' ? 'right' : 'left';
    const alignItems = alignment === 'center' ? 'center' : alignment === 'right' ? 'flex-end' : 'flex-start';

    return (
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          px: 3,
          background: variant === 'gradient'
            ? 'linear-gradient(135deg, #1976d2 0%, #9c27b0 100%)'
            : variant === 'image-bg' && image
            ? `url(${image}) center/cover no-repeat`
            : 'transparent',
          color: variant === 'gradient' || variant === 'image-bg' ? 'white' : 'inherit',
          position: 'relative',
        }}
      >
        {variant === 'image-bg' && (
          <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.5)' }} />
        )}
        <MuiContainer maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <MuiStack spacing={3} alignItems={alignItems} sx={{ textAlign }}>
            {subtitle && (
              <Typography
                variant="overline"
                sx={{
                  color: variant === 'gradient' ? 'rgba(255,255,255,0.8)' : 'primary.main',
                  letterSpacing: 2,
                }}
              >
                {subtitle}
              </Typography>
            )}
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                maxWidth: 800,
              }}
            >
              {title}
            </Typography>
            {description && (
              <Typography
                variant="h6"
                sx={{
                  opacity: 0.9,
                  maxWidth: 600,
                  fontWeight: 400,
                }}
              >
                {description}
              </Typography>
            )}
            {(primaryAction || secondaryAction) && (
              <MuiStack direction="row" spacing={2} sx={{ mt: 2 }}>
                {primaryAction && (
                  <MuiButton
                    variant="contained"
                    size="large"
                    href={primaryAction.href}
                    sx={{
                      bgcolor: variant === 'gradient' ? 'white' : 'primary.main',
                      color: variant === 'gradient' ? 'primary.main' : 'white',
                      '&:hover': {
                        bgcolor: variant === 'gradient' ? 'grey.100' : 'primary.dark',
                      },
                    }}
                  >
                    {primaryAction.label}
                  </MuiButton>
                )}
                {secondaryAction && (
                  <MuiButton
                    variant="outlined"
                    size="large"
                    href={secondaryAction.href}
                    sx={{
                      borderColor: variant === 'gradient' ? 'white' : 'primary.main',
                      color: variant === 'gradient' ? 'white' : 'primary.main',
                      '&:hover': {
                        borderColor: variant === 'gradient' ? 'white' : 'primary.dark',
                        bgcolor: variant === 'gradient' ? 'rgba(255,255,255,0.1)' : 'primary.50',
                      },
                    }}
                  >
                    {secondaryAction.label}
                  </MuiButton>
                )}
              </MuiStack>
            )}
          </MuiStack>
        </MuiContainer>
      </Box>
    );
  },

  FeatureCard: ({ element }) => {
    const { title, description, icon, image, href } = element.props as {
      title: string;
      description: string;
      icon?: string;
      image?: string;
      href?: string;
    };

    return (
      <MuiCard
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 6,
          },
        }}
      >
        {image && (
          <CardMedia
            component="img"
            height="160"
            image={image}
            alt={title}
          />
        )}
        <CardContent sx={{ flexGrow: 1 }}>
          {icon && (
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 2,
                bgcolor: 'primary.main',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
              }}
            >
              {getIcon(icon, 'large')}
            </Box>
          )}
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        {href && (
          <CardActions>
            <MuiButton size="small" href={href}>
              Learn More
            </MuiButton>
          </CardActions>
        )}
      </MuiCard>
    );
  },

  PricingCard: ({ element }) => {
    const {
      title,
      price,
      period = '/month',
      description,
      features = [],
      ctaLabel = 'Get Started',
      ctaHref,
      highlighted = false,
      badge,
    } = element.props as {
      title: string;
      price: string;
      period?: string;
      description?: string;
      features?: string[];
      ctaLabel?: string;
      ctaHref?: string;
      highlighted?: boolean;
      badge?: string;
    };

    return (
      <MuiCard
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          border: highlighted ? 2 : 1,
          borderColor: highlighted ? 'primary.main' : 'divider',
          transform: highlighted ? 'scale(1.05)' : 'none',
        }}
      >
        {badge && (
          <Chip
            label={badge}
            color="primary"
            size="small"
            sx={{
              position: 'absolute',
              top: -12,
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          />
        )}
        <CardContent sx={{ flexGrow: 1, textAlign: 'center', pt: badge ? 4 : 3 }}>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Box sx={{ my: 3 }}>
            <Typography variant="h3" component="span" sx={{ fontWeight: 700 }}>
              {price}
            </Typography>
            <Typography variant="subtitle1" component="span" color="text.secondary">
              {period}
            </Typography>
          </Box>
          {description && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {description}
            </Typography>
          )}
          <MuiList dense>
            {features.map((feature, index) => (
              <MuiListItem key={index} sx={{ justifyContent: 'center', py: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <Box component="span" sx={{ color: 'success.main', display: 'flex' }}><CheckCircleIcon fontSize="small" /></Box>
                </ListItemIcon>
                <ListItemText primary={feature} />
              </MuiListItem>
            ))}
          </MuiList>
        </CardContent>
        <CardActions sx={{ p: 3, pt: 0 }}>
          <MuiButton
            variant={highlighted ? 'contained' : 'outlined'}
            fullWidth
            size="large"
            href={ctaHref}
          >
            {ctaLabel}
          </MuiButton>
        </CardActions>
      </MuiCard>
    );
  },

  TestimonialCard: ({ element }) => {
    const { quote, author, role, company, avatar, rating } = element.props as {
      quote: string;
      author: string;
      role?: string;
      company?: string;
      avatar?: string;
      rating?: number;
    };

    return (
      <MuiCard sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ color: 'primary.main', mb: 2 }}>
            <FormatQuoteIcon fontSize="large" />
          </Box>
          {rating && (
            <MuiRating value={rating} readOnly size="small" sx={{ mb: 2 }} />
          )}
          <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 3 }}>
            "{quote}"
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <MuiAvatar src={avatar} alt={author}>
              {author.charAt(0)}
            </MuiAvatar>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {author}
              </Typography>
              {(role || company) && (
                <Typography variant="caption" color="text.secondary">
                  {role}{role && company && ' at '}{company}
                </Typography>
              )}
            </Box>
          </Box>
        </CardContent>
      </MuiCard>
    );
  },

  CTA: ({ element }) => {
    const {
      title,
      description,
      primaryAction,
      secondaryAction,
      variant = 'default',
    } = element.props as {
      title: string;
      description?: string;
      primaryAction?: { label: string; href?: string };
      secondaryAction?: { label: string; href?: string };
      variant?: 'default' | 'gradient' | 'outlined';
    };

    return (
      <Paper
        sx={{
          py: 6,
          px: 4,
          textAlign: 'center',
          background: variant === 'gradient'
            ? 'linear-gradient(135deg, #1976d2 0%, #9c27b0 100%)'
            : variant === 'outlined'
            ? 'transparent'
            : 'primary.main',
          color: variant === 'outlined' ? 'inherit' : 'white',
          border: variant === 'outlined' ? 2 : 0,
          borderColor: 'primary.main',
        }}
        elevation={variant === 'outlined' ? 0 : 3}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        {description && (
          <Typography variant="body1" sx={{ mb: 4, opacity: 0.9, maxWidth: 600, mx: 'auto' }}>
            {description}
          </Typography>
        )}
        <MuiStack direction="row" spacing={2} justifyContent="center">
          {primaryAction && (
            <MuiButton
              variant="contained"
              size="large"
              href={primaryAction.href}
              sx={{
                bgcolor: variant === 'outlined' ? 'primary.main' : 'white',
                color: variant === 'outlined' ? 'white' : 'primary.main',
                '&:hover': {
                  bgcolor: variant === 'outlined' ? 'primary.dark' : 'grey.100',
                },
              }}
            >
              {primaryAction.label}
            </MuiButton>
          )}
          {secondaryAction && (
            <MuiButton
              variant="outlined"
              size="large"
              href={secondaryAction.href}
              sx={{
                borderColor: variant === 'outlined' ? 'primary.main' : 'white',
                color: variant === 'outlined' ? 'primary.main' : 'white',
              }}
            >
              {secondaryAction.label}
            </MuiButton>
          )}
        </MuiStack>
      </Paper>
    );
  },

  Footer: ({ element }) => {
    const {
      logo,
      description,
      links = [],
      socialLinks = [],
      copyright,
    } = element.props as {
      logo?: string;
      description?: string;
      links?: { title: string; items: { label: string; href: string }[] }[];
      socialLinks?: { icon: string; href: string; label?: string }[];
      copyright?: string;
    };

    return (
      <Box component="footer" sx={{ bgcolor: 'grey.900', color: 'grey.300', py: 6, px: 3 }}>
        <MuiContainer maxWidth="lg">
          <MuiGrid container spacing={4}>
            <MuiGrid size={{ xs: 12, md: 4 }}>
              {logo && (
                <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                  {logo}
                </Typography>
              )}
              {description && (
                <Typography variant="body2" sx={{ mb: 3, maxWidth: 300 }}>
                  {description}
                </Typography>
              )}
              {socialLinks.length > 0 && (
                <MuiStack direction="row" spacing={1}>
                  {socialLinks.map((social, index) => (
                    <MuiIconButton
                      key={index}
                      href={social.href}
                      aria-label={social.label || social.icon}
                      sx={{ color: 'grey.400', '&:hover': { color: 'white' } }}
                    >
                      {getIcon(social.icon, 'small')}
                    </MuiIconButton>
                  ))}
                </MuiStack>
              )}
            </MuiGrid>
            {links.map((section, index) => (
              <MuiGrid size={{ xs: 6, sm: 4, md: 2 }} key={index}>
                <Typography variant="subtitle2" sx={{ color: 'white', mb: 2 }}>
                  {section.title}
                </Typography>
                <MuiStack spacing={1}>
                  {section.items.map((item, itemIndex) => (
                    <MuiLink
                      key={itemIndex}
                      href={item.href}
                      underline="hover"
                      sx={{ color: 'grey.400', '&:hover': { color: 'white' } }}
                    >
                      {item.label}
                    </MuiLink>
                  ))}
                </MuiStack>
              </MuiGrid>
            ))}
          </MuiGrid>
          {copyright && (
            <Box sx={{ borderTop: 1, borderColor: 'grey.800', mt: 6, pt: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="grey.500">
                {copyright}
              </Typography>
            </Box>
          )}
        </MuiContainer>
      </Box>
    );
  },

  FAQ: ({ element }) => {
    const { title, description, items = [] } = element.props as {
      title?: string;
      description?: string;
      items?: { question: string; answer: string }[];
    };

    return (
      <Box sx={{ py: 6 }}>
        {(title || description) && (
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            {title && (
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                {title}
              </Typography>
            )}
            {description && (
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                {description}
              </Typography>
            )}
          </Box>
        )}
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
          {items.map((item, index) => (
            <MuiAccordion key={index} sx={{ '&:before': { display: 'none' } }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  {item.answer}
                </Typography>
              </AccordionDetails>
            </MuiAccordion>
          ))}
        </Box>
      </Box>
    );
  },

  Newsletter: ({ element }) => {
    const {
      title = 'Subscribe to our newsletter',
      description,
      placeholder = 'Enter your email',
      buttonLabel = 'Subscribe',
      variant = 'default',
    } = element.props as {
      title?: string;
      description?: string;
      placeholder?: string;
      buttonLabel?: string;
      variant?: 'default' | 'inline' | 'card';
    };

    const content = (
      <Box sx={{ textAlign: variant === 'inline' ? 'left' : 'center' }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        {description && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {description}
          </Typography>
        )}
        <MuiStack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
          sx={{ maxWidth: variant === 'inline' ? 'none' : 500, mx: variant === 'inline' ? 0 : 'auto' }}
        >
          <TextField
            placeholder={placeholder}
            size="small"
            fullWidth
            sx={{ flex: 1 }}
          />
          <MuiButton variant="contained" sx={{ whiteSpace: 'nowrap' }}>
            {buttonLabel}
          </MuiButton>
        </MuiStack>
      </Box>
    );

    if (variant === 'card') {
      return (
        <MuiCard sx={{ p: 4 }}>
          {content}
        </MuiCard>
      );
    }

    return (
      <Box sx={{ py: 4, px: 3, bgcolor: variant === 'default' ? 'grey.100' : 'transparent', borderRadius: 2 }}>
        {content}
      </Box>
    );
  },
};

// Export the registry as the default
export default muiMapper;
