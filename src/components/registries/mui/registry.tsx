'use client';

/**
 * Material UI Registry
 * Maps json-render catalog components to MUI implementations
 */

import * as React from 'react';
import type { ComponentRegistry } from '@json-render/react';
import type { RegistryDefinition, RegistryTheme } from '@/lib/registry';

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
} from '@mui/material';

// MUI Theme
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
    heading: 'Roboto, "Helvetica Neue", Arial, sans-serif',
    body: 'Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: '"Roboto Mono", monospace',
  },
  borderRadius: '4px',
  shadows: true,
};

// Inline SVG Icon components to avoid @mui/icons-material dependency
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
  };
  return icons[iconName] || <StarIcon fontSize={size} />;
};

// Variant mapping
const mapVariant = (variant?: string): 'text' | 'outlined' | 'contained' => {
  if (variant === 'ghost' || variant === 'link') return 'text';
  if (variant === 'outline') return 'outlined';
  return 'contained';
};

// Color mapping for buttons (supports inherit)
const mapButtonColor = (color?: string): 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'inherit' => {
  const colorMap: Record<string, 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'> = {
    default: 'primary',
    primary: 'primary',
    secondary: 'secondary',
    success: 'success',
    danger: 'error',
    error: 'error',
    warning: 'warning',
    info: 'info',
  };
  return colorMap[color || 'default'] || 'primary';
};

// Color mapping for form controls (no inherit)
const mapFormColor = (color?: string): 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'default' => {
  const colorMap: Record<string, 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'default'> = {
    default: 'primary',
    primary: 'primary',
    secondary: 'secondary',
    success: 'success',
    danger: 'error',
    error: 'error',
    warning: 'warning',
    info: 'info',
  };
  return colorMap[color || 'default'] || 'primary';
};

// Color mapping for Chip (no inherit)
const mapChipColor = (color?: string): 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'default' => {
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

// Size mapping
const mapSize = (size?: string): 'small' | 'medium' | 'large' => {
  if (size === 'xs' || size === 'sm') return 'small';
  if (size === 'lg' || size === 'xl') return 'large';
  return 'medium';
};

// Size mapping for components that only support small/medium
const mapSmallMediumSize = (size?: string): 'small' | 'medium' => {
  if (size === 'xs' || size === 'sm') return 'small';
  return 'medium';
};

// Component Registry - Maps catalog component names to MUI components
const muiComponents: ComponentRegistry = {
  // ============================================
  // Layout Components
  // ============================================
  Container: ({ element, children }) => {
    const { maxWidth = 'lg', ...rest } = element.props as { maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false };
    return <MuiContainer maxWidth={maxWidth} {...rest}>{children}</MuiContainer>;
  },

  Row: ({ element, children }) => {
    const { gap, justify, align } = element.props as { gap?: number; justify?: string; align?: string };
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: gap || 2,
          justifyContent: justify || 'flex-start',
          alignItems: align || 'stretch',
        }}
      >
        {children}
      </Box>
    );
  },

  Column: ({ element, children }) => {
    const { gap, justify, align } = element.props as { gap?: number; justify?: string; align?: string };
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: gap || 2,
          justifyContent: justify || 'flex-start',
          alignItems: align || 'stretch',
        }}
      >
        {children}
      </Box>
    );
  },

  Grid: ({ element, children }) => {
    const { cols = 12, gap = 2, rowGap, colGap, columns = 3 } = element.props as { cols?: number; gap?: number; rowGap?: number; colGap?: number; columns?: number };
    return (
      <MuiGrid
        container
        spacing={gap}
        rowSpacing={rowGap}
        columnSpacing={colGap}
        columns={cols}
      >
        {React.Children.map(children, (child) => (
          <MuiGrid item xs={12} sm={columns >= 2 ? 6 : 12} md={columns >= 3 ? 4 : columns === 2 ? 6 : 12}>
            {child}
          </MuiGrid>
        ))}
      </MuiGrid>
    );
  },

  Stack: ({ element, children }) => {
    const {
      direction = 'column',
      gap = 2,
      align,
      justify,
      wrap,
      divider,
      responsive = true,
    } = element.props as {
      direction?: 'row' | 'column';
      gap?: number;
      align?: string;
      justify?: string;
      wrap?: boolean;
      divider?: boolean;
      responsive?: boolean;
    };
    return (
      <MuiStack
        direction={responsive && direction === 'row' ? { xs: 'column', md: 'row' } : direction}
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
    const { size = 2 } = element.props as { size?: number };
    return <Box sx={{ height: size * 8, width: size * 8 }} />;
  },

  Divider: ({ element }) => {
    const { orientation = 'horizontal', variant } = element.props as { orientation?: 'horizontal' | 'vertical'; variant?: string };
    return (
      <MuiDivider
        orientation={orientation}
        variant={variant as 'fullWidth' | 'inset' | 'middle' | undefined}
        flexItem={orientation === 'vertical'}
      />
    );
  },

  // ============================================
  // Card Components
  // ============================================
  Card: ({ element, children }) => {
    const { variant, elevation = 1 } = element.props as { variant?: string; elevation?: number };
    return (
      <MuiCard
        variant={variant === 'outlined' ? 'outlined' : 'elevation'}
        elevation={variant === 'outlined' ? 0 : elevation}
      >
        {children}
      </MuiCard>
    );
  },

  CardHeader: ({ element }) => {
    const { title, subtitle, action } = element.props as { title?: string; subtitle?: string; action?: React.ReactNode };
    return (
      <MuiCardHeader
        title={title}
        subheader={subtitle}
        action={action}
      />
    );
  },

  CardBody: ({ children }) => {
    return <CardContent>{children}</CardContent>;
  },

  CardFooter: ({ children }) => {
    return <CardActions>{children}</CardActions>;
  },

  // ============================================
  // Typography Components
  // ============================================
  Heading: ({ element }) => {
    const { level = 1, children: textContent, text } = element.props as { level?: number; children?: string; text?: string };
    const content = textContent || text;
    const variantMap: Record<number, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'> = {
      1: 'h1',
      2: 'h2',
      3: 'h3',
      4: 'h4',
      5: 'h5',
      6: 'h6',
    };
    return (
      <Typography variant={variantMap[level] || 'h1'} gutterBottom>
        {content}
      </Typography>
    );
  },

  Text: ({ element }) => {
    const { variant = 'body1', children: textContent, text, color } = element.props as {
      variant?: string;
      children?: string;
      text?: string;
      color?: string;
    };
    const content = textContent || text;
    return (
      <Typography
        variant={variant as 'body1' | 'body2' | 'caption' | 'overline' | 'subtitle1' | 'subtitle2'}
        color={color || 'textPrimary'}
      >
        {content}
      </Typography>
    );
  },

  Link: ({ element }) => {
    const { href, children: textContent, text, target } = element.props as { href?: string; children?: string; text?: string; target?: string };
    const content = textContent || text;
    return (
      <MuiLink href={href} target={target} underline="hover">
        {content}
      </MuiLink>
    );
  },

  // ============================================
  // Button Components
  // ============================================
  Button: ({ element }) => {
    const {
      label,
      children: textContent,
      variant,
      color,
      size,
      disabled,
      fullWidth,
      startIcon,
      endIcon,
      onClick,
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
      onClick?: () => void;
    };
    const content = label || textContent;
    return (
      <MuiButton
        variant={mapVariant(variant)}
        color={mapButtonColor(color)}
        size={mapSize(size)}
        disabled={disabled}
        fullWidth={fullWidth}
        startIcon={startIcon ? getIcon(startIcon) : undefined}
        endIcon={endIcon ? getIcon(endIcon) : undefined}
        onClick={onClick}
      >
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
        color={mapButtonColor(color)}
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
        variant={mapVariant(variant)}
        color={mapButtonColor(color)}
        size={mapSize(size)}
        orientation={orientation}
      >
        {children}
      </MuiButtonGroup>
    );
  },

  // ============================================
  // Form Components
  // ============================================
  Input: ({ element }) => {
    const {
      label,
      placeholder,
      type = 'text',
      value,
      disabled,
      required,
      error,
      helperText,
      fullWidth = true,
      size,
    } = element.props as {
      label?: string;
      placeholder?: string;
      type?: string;
      value?: string;
      disabled?: boolean;
      required?: boolean;
      error?: boolean;
      helperText?: string;
      fullWidth?: boolean;
      size?: string;
    };
    return (
      <TextField
        label={label}
        placeholder={placeholder}
        type={type}
        defaultValue={value}
        disabled={disabled}
        required={required}
        error={error}
        helperText={helperText}
        fullWidth={fullWidth}
        size={mapSmallMediumSize(size)}
        variant="outlined"
      />
    );
  },

  TextArea: ({ element }) => {
    const {
      label,
      placeholder,
      value,
      rows = 4,
      disabled,
      required,
      fullWidth = true,
    } = element.props as {
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
      label,
      placeholder,
      options = [],
      value,
      disabled,
      required,
      fullWidth = true,
      size,
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
        <MuiSelect
          label={label}
          defaultValue={value || ''}
          disabled={disabled}
          required={required}
        >
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
        control={
          <MuiCheckbox
            defaultChecked={checked}
            disabled={disabled}
            color={mapFormColor(color)}
          />
        }
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
        control={
          <MuiRadio
            value={value}
            disabled={disabled}
            color={mapFormColor(color)}
          />
        }
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
        control={
          <MuiSwitch
            defaultChecked={checked}
            disabled={disabled}
            color={mapFormColor(color)}
          />
        }
        label={label || ''}
      />
    );
  },

  Slider: ({ element }) => {
    const {
      label,
      min = 0,
      max = 100,
      value,
      step = 1,
      disabled,
      marks,
      valueLabelDisplay = 'auto',
    } = element.props as {
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

  // ============================================
  // Data Display Components
  // ============================================
  Badge: ({ element }) => {
    const { label, children: textContent, color, variant } = element.props as {
      label?: string;
      children?: string;
      color?: string;
      variant?: string;
    };
    const content = label || textContent;
    return (
      <Chip
        label={content}
        color={mapChipColor(color)}
        variant={variant === 'outline' ? 'outlined' : 'filled'}
        size="small"
      />
    );
  },

  Avatar: ({ element }) => {
    const { src, alt, name, size } = element.props as {
      src?: string;
      alt?: string;
      name?: string;
      size?: string;
    };
    const sizeMap: Record<string, number> = { sm: 32, md: 40, lg: 56, xl: 72 };
    const avatarSize = sizeMap[size || 'md'] || 40;
    const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : undefined;
    return (
      <MuiAvatar
        src={src}
        alt={alt || name}
        sx={{ width: avatarSize, height: avatarSize }}
      >
        {!src && initials}
      </MuiAvatar>
    );
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
    const { src, alt, width, height, objectFit = 'cover' } = element.props as {
      src: string;
      alt?: string;
      width?: number | string;
      height?: number | string;
      objectFit?: string;
    };
    return (
      <Box
        component="img"
        src={src}
        alt={alt || ''}
        sx={{
          width: width || '100%',
          height: height || 'auto',
          objectFit: objectFit as 'cover' | 'contain' | 'fill',
          borderRadius: 1,
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
    return (
      <MuiTable size={mapSmallMediumSize(size)}>
        {children}
      </MuiTable>
    );
  },

  TableHeader: ({ children }) => <TableHead>{children}</TableHead>,

  TableBody: ({ children }) => <MuiTableBody>{children}</MuiTableBody>,

  TableRow: ({ element, children }) => {
    const { selected, hover } = element.props as { selected?: boolean; hover?: boolean };
    return <MuiTableRow selected={selected} hover={hover}>{children}</MuiTableRow>;
  },

  TableCell: ({ element, children }) => {
    const { align, variant } = element.props as { align?: 'left' | 'center' | 'right'; variant?: 'head' | 'body' };
    return <MuiTableCell align={align} variant={variant}>{children}</MuiTableCell>;
  },

  Metric: ({ element }) => {
    const { label, value, change, trend } = element.props as {
      label: string;
      value: string | number;
      change?: string | number;
      trend?: 'up' | 'down' | 'neutral';
    };
    const trendColor = trend === 'up' ? 'success.main' : trend === 'down' ? 'error.main' : 'text.secondary';
    return (
      <Box>
        <Typography variant="caption" color="text.secondary">{label}</Typography>
        <Typography variant="h4">{value}</Typography>
        {change && (
          <Typography variant="body2" sx={{ color: trendColor }}>
            {trend === 'up' ? '+' : trend === 'down' ? '-' : ''}{change}
          </Typography>
        )}
      </Box>
    );
  },

  Progress: ({ element }) => {
    const { value, variant = 'determinate', color } = element.props as {
      value?: number;
      variant?: 'determinate' | 'indeterminate';
      color?: string;
    };
    return (
      <LinearProgress
        variant={variant}
        value={value}
        color={mapButtonColor(color)}
        sx={{ width: '100%', borderRadius: 1 }}
      />
    );
  },

  // ============================================
  // Feedback Components
  // ============================================
  Alert: ({ element }) => {
    const { title, description, status = 'info', variant, closable } = element.props as {
      title?: string;
      description?: string;
      status?: 'info' | 'success' | 'warning' | 'error';
      variant?: string;
      closable?: boolean;
    };
    const severityMap: Record<string, 'info' | 'success' | 'warning' | 'error'> = {
      info: 'info',
      success: 'success',
      warning: 'warning',
      error: 'error',
      danger: 'error',
    };
    return (
      <MuiAlert
        severity={severityMap[status] || 'info'}
        variant={variant === 'outline' ? 'outlined' : 'standard'}
        onClose={closable ? () => {} : undefined}
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {description}
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
      info: 'info',
      success: 'success',
      warning: 'warning',
      error: 'error',
      danger: 'error',
    };
    return (
      <MuiAlert severity={severityMap[status] || 'info'} sx={{ mb: 1 }}>
        {title && <AlertTitle>{title}</AlertTitle>}
        {description}
      </MuiAlert>
    );
  },

  Skeleton: ({ element }) => {
    const { variant = 'rectangular', width, height, animation = 'wave' } = element.props as {
      variant?: 'text' | 'rectangular' | 'circular';
      width?: number | string;
      height?: number | string;
      animation?: 'pulse' | 'wave' | false;
    };
    return (
      <MuiSkeleton
        variant={variant}
        width={width || '100%'}
        height={height || 40}
        animation={animation}
      />
    );
  },

  Spinner: ({ element }) => {
    const { size, color } = element.props as { size?: string; color?: string };
    const sizeMap: Record<string, number> = { sm: 20, md: 40, lg: 60 };
    return (
      <CircularProgress
        size={sizeMap[size || 'md'] || 40}
        color={mapButtonColor(color)}
      />
    );
  },

  EmptyState: ({ element }) => {
    const { title, description, icon, action } = element.props as {
      title?: string;
      description?: string;
      icon?: string;
      action?: React.ReactNode;
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
        {action && <Box sx={{ mt: 3 }}>{action}</Box>}
      </Box>
    );
  },

  // ============================================
  // Navigation Components
  // ============================================
  Tabs: ({ element, children }) => {
    const { value, variant, color } = element.props as {
      value?: string | number;
      variant?: string;
      color?: string;
    };
    const mappedColor = mapButtonColor(color);
    const tabColor = (mappedColor === 'inherit' || mappedColor === 'success' || mappedColor === 'error' || mappedColor === 'warning' || mappedColor === 'info') ? 'primary' : mappedColor;
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

  Breadcrumb: ({ children }) => {
    return (
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
        {children}
      </Breadcrumbs>
    );
  },

  BreadcrumbItem: ({ element }) => {
    const { label, href, active } = element.props as { label: string; href?: string; active?: boolean };
    if (active) {
      return <Typography color="text.primary">{label}</Typography>;
    }
    return (
      <MuiLink href={href} underline="hover" color="inherit">
        {label}
      </MuiLink>
    );
  },

  Pagination: ({ element }) => {
    const { count = 10, page = 1, color, size, variant } = element.props as {
      count?: number;
      page?: number;
      color?: string;
      size?: string;
      variant?: string;
    };
    const mappedColor = mapButtonColor(color);
    const paginationColor = (mappedColor === 'inherit' || mappedColor === 'success' || mappedColor === 'error' || mappedColor === 'warning' || mappedColor === 'info') ? 'primary' : mappedColor;
    return (
      <MuiPagination
        count={count}
        page={page}
        color={paginationColor}
        size={mapSize(size)}
        variant={variant === 'outline' ? 'outlined' : 'text'}
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
    const { label, href, active, icon } = element.props as {
      label: string;
      href?: string;
      active?: boolean;
      icon?: string;
    };
    return (
      <MuiButton
        href={href}
        variant={active ? 'contained' : 'text'}
        startIcon={icon ? getIcon(icon, 'small') : undefined}
        sx={{ justifyContent: 'flex-start' }}
      >
        {label}
      </MuiButton>
    );
  },

  // ============================================
  // Overlay Components
  // ============================================
  Modal: ({ element, children }) => {
    const { title, open = true, maxWidth = 'sm' } = element.props as {
      title?: string;
      open?: boolean;
      maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    };
    return (
      <Dialog open={open} maxWidth={maxWidth} fullWidth>
        {title && <DialogTitle>{title}</DialogTitle>}
        <DialogContent>{children}</DialogContent>
      </Dialog>
    );
  },

  Drawer: ({ element, children }) => {
    const { title, placement = 'right', open = true } = element.props as {
      title?: string;
      placement?: 'left' | 'right' | 'top' | 'bottom';
      open?: boolean;
    };
    return (
      <MuiDrawer anchor={placement} open={open}>
        <Box sx={{ width: placement === 'top' || placement === 'bottom' ? 'auto' : 320, p: 2 }}>
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
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
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

  // ============================================
  // Collapse & Accordion Components
  // ============================================
  Accordion: ({ children }) => {
    return (
      <Box>
        {React.Children.map(children, (child, index) => (
          <React.Fragment key={index}>{child}</React.Fragment>
        ))}
      </Box>
    );
  },

  AccordionItem: ({ element, children }) => {
    const { title, defaultExpanded } = element.props as { title: string; defaultExpanded?: boolean };
    return (
      <MuiAccordion defaultExpanded={defaultExpanded}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{title}</Typography>
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

  // ============================================
  // Specialized Components
  // ============================================
  Hero: ({ element }) => {
    const { title, subtitle, description, primaryAction, secondaryAction, image, align = 'center' } = element.props as {
      title?: string;
      subtitle?: string;
      description?: string;
      primaryAction?: { label: string; href?: string };
      secondaryAction?: { label: string; href?: string };
      image?: string;
      align?: 'left' | 'center' | 'right';
    };
    return (
      <Box
        sx={{
          py: { xs: 6, md: 8, lg: 10 },
          px: { xs: 2, md: 3, lg: 4 },
          textAlign: align,
        }}
      >
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
          {subtitle && (
            <Typography variant="overline" color="text.secondary" sx={{ fontSize: 16 }}>
              {subtitle}
            </Typography>
          )}
          {title && (
            <Typography variant="h2" component="h1" sx={{ mt: 2, mb: 3, fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' } }}>
              {title}
            </Typography>
          )}
          {description && (
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontSize: 16 }}>
              {description}
            </Typography>
          )}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: align, flexWrap: 'wrap' }}>
            {primaryAction && (
              <MuiButton variant="contained" size="large" href={primaryAction.href} sx={{ minWidth: 120 }}>
                {primaryAction.label}
              </MuiButton>
            )}
            {secondaryAction && (
              <MuiButton variant="outlined" size="large" href={secondaryAction.href} sx={{ minWidth: 120 }}>
                {secondaryAction.label}
              </MuiButton>
            )}
          </Box>
          {image && (
            <Box sx={{ mt: 4 }}>
              <img
                src={image}
                alt={title || 'Hero image'}
                style={{ width: '100%', maxWidth: 600, height: 'auto', borderRadius: 8 }}
              />
            </Box>
          )}
        </Box>
      </Box>
    );
  },

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
        <MuiButton
          component="label"
          variant="outlined"
          startIcon={<CloudUploadIcon />}
        >
          Upload File
          <input type="file" hidden accept={accept} multiple={multiple} />
        </MuiButton>
      </Box>
    );
  },

  Rating: ({ element }) => {
    const { value, max = 5, size, readOnly } = element.props as {
      value?: number;
      max?: number;
      size?: string;
      readOnly?: boolean;
    };
    return (
      <MuiRating
        defaultValue={value}
        max={max}
        size={mapSize(size)}
        readOnly={readOnly}
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

  Timeline: ({ children }) => {
    return (
      <Box sx={{ pl: 2, borderLeft: 2, borderColor: 'primary.main' }}>
        {children}
      </Box>
    );
  },

  TimelineItem: ({ element }) => {
    const { title, description, date, icon } = element.props as {
      title: string;
      description?: string;
      date?: string;
      icon?: string;
    };
    return (
      <Box sx={{ position: 'relative', pb: 3, pl: 3 }}>
        <Box
          sx={{
            position: 'absolute',
            left: -14,
            top: 0,
            width: 24,
            height: 24,
            bgcolor: 'primary.main',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon ? getIcon(icon, 'small') : <Box sx={{ width: 8, height: 8, bgcolor: 'white', borderRadius: '50%' }} />}
        </Box>
        {date && <Typography variant="caption" color="text.secondary">{date}</Typography>}
        <Typography variant="subtitle2">{title}</Typography>
        {description && <Typography variant="body2" color="text.secondary">{description}</Typography>}
      </Box>
    );
  },

  Stepper: ({ element, children }) => {
    const { activeStep = 0, orientation = 'horizontal', alternativeLabel } = element.props as {
      activeStep?: number;
      orientation?: 'horizontal' | 'vertical';
      alternativeLabel?: boolean;
    };
    return (
      <MuiStepper activeStep={activeStep} orientation={orientation} alternativeLabel={alternativeLabel}>
        {children}
      </MuiStepper>
    );
  },

  Step: ({ element }) => {
    const { label, completed, optional } = element.props as {
      label: string;
      description?: string;
      completed?: boolean;
      optional?: boolean;
    };
    return (
      <MuiStep completed={completed}>
        <StepLabel
          optional={optional ? <Typography variant="caption">Optional</Typography> : undefined}
        >
          {label}
        </StepLabel>
      </MuiStep>
    );
  },

  Code: ({ element }) => {
    const { children: code } = element.props as { children?: string; language?: string };
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
        <code>{code}</code>
      </Box>
    );
  },

  Kbd: ({ element }) => {
    const { children: key } = element.props as { children?: string };
    return (
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
        {key}
      </Box>
    );
  },

  Quote: ({ element }) => {
    const { children: text, author, source } = element.props as { children?: string; author?: string; source?: string };
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
        <Typography variant="body1">{text}</Typography>
        {(author || source) && (
          <Typography variant="caption" color="text.secondary">
            {author && `— ${author}`}{source && `, ${source}`}
          </Typography>
        )}
      </Box>
    );
  },

  Stat: ({ element }) => {
    const { label, value, helpText, icon } = element.props as {
      label: string;
      value: string | number;
      helpText?: string;
      icon?: string;
    };
    return (
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        {icon && (
          <Box sx={{ color: 'primary.main' }}>
            {getIcon(icon, 'large')}
          </Box>
        )}
        <Box>
          <Typography variant="caption" color="text.secondary">{label}</Typography>
          <Typography variant="h4">{value}</Typography>
          {helpText && <Typography variant="body2" color="text.secondary">{helpText}</Typography>}
        </Box>
      </Box>
    );
  },

  Tag: ({ element }) => {
    const { label, children: textContent, color, variant, removable } = element.props as {
      label?: string;
      children?: string;
      color?: string;
      variant?: string;
      removable?: boolean;
    };
    const content = label || textContent;
    return (
      <Chip
        label={content}
        color={mapChipColor(color)}
        variant={variant === 'outline' ? 'outlined' : 'filled'}
        size="small"
        onDelete={removable ? () => {} : undefined}
      />
    );
  },
};

// Registry Definition
export const muiRegistry: RegistryDefinition = {
  name: 'mui',
  displayName: 'Material UI',
  description: 'Google Material Design components built with MUI',
  framework: 'mui',
  components: muiComponents,
  theme: muiTheme,
};

export { muiComponents, muiTheme };
