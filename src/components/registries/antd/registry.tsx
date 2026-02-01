'use client';

/**
 * Ant Design Registry
 * Maps json-render catalog components to Ant Design implementations
 *
 * Ant Design v5+ uses:
 * - ConfigProvider for global theming
 * - Items-based API for Tabs, Menu, etc.
 * - CSS-in-JS with @ant-design/cssinjs
 */

import * as React from 'react';
import type { ComponentRegistry } from '@json-render/react';
import type { RegistryDefinition, RegistryTheme } from '@/lib/registry';

// Ant Design Components
import {
  Layout,
  Row,
  Col,
  Space,
  Flex,
  Divider as AntDivider,
  Card as AntCard,
  Typography,
  Button as AntButton,
  Input as AntInput,
  Select as AntSelect,
  Checkbox as AntCheckbox,
  Radio as AntRadio,
  Switch as AntSwitch,
  Slider as AntSlider,
  InputNumber,
  DatePicker as AntDatePicker,
  Upload,
  Badge as AntBadge,
  Tag as AntTag,
  Avatar as AntAvatar,
  Image as AntImage,
  List as AntList,
  Table as AntTable,
  Progress as AntProgress,
  Statistic,
  Alert as AntAlert,
  Skeleton as AntSkeleton,
  Spin,
  Empty,
  Result,
  Tabs as AntTabs,
  Breadcrumb as AntBreadcrumb,
  Pagination as AntPagination,
  Menu as AntMenu,
  Modal as AntModal,
  Drawer as AntDrawer,
  Tooltip as AntTooltip,
  Popover as AntPopover,
  Dropdown as AntDropdown,
  Collapse as AntCollapse,
  Steps as AntSteps,
  Timeline as AntTimeline,
  Rate as AntRate,
  ColorPicker,
  Form,
} from 'antd';
import {
  UploadOutlined,
  StarOutlined,
  HomeOutlined,
  FolderOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  CloseOutlined,
  ExpandAltOutlined,
  RightOutlined,
  UpOutlined,
  DownOutlined,
} from '@ant-design/icons';

const { Content } = Layout;
const { Title, Paragraph, Text: AntText, Link: AntLink } = Typography;
const { TextArea } = AntInput;

// Ant Design Theme
const antdTheme: RegistryTheme = {
  name: 'Ant Design',
  colors: {
    primary: '#1677ff',
    secondary: '#722ed1',
    accent: '#13c2c2',
    background: '#ffffff',
    foreground: '#000000e0',
    muted: '#f5f5f5',
    success: '#52c41a',
    warning: '#faad14',
    error: '#ff4d4f',
    info: '#1677ff',
  },
  fonts: {
    heading: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
  },
  borderRadius: '6px',
  shadows: true,
};

// Icon mapping helper
const getIcon = (iconName?: string, size: 'small' | 'default' | 'large' = 'default') => {
  if (!iconName) return null;
  const icons: Record<string, React.ReactNode> = {
    home: <HomeOutlined />,
    star: <StarOutlined />,
    folder: <FolderOutlined />,
    check: <CheckCircleOutlined />,
    error: <CloseCircleOutlined />,
    warning: <ExclamationCircleOutlined />,
    info: <InfoCircleOutlined />,
    close: <CloseOutlined />,
    expand: <ExpandAltOutlined />,
    next: <RightOutlined />,
    up: <UpOutlined />,
    down: <DownOutlined />,
    upload: <UploadOutlined />,
  };
  return icons[iconName] || <StarOutlined />;
};

// Variant mapping for buttons
const mapButtonType = (variant?: string): 'primary' | 'default' | 'dashed' | 'link' | 'text' => {
  if (variant === 'ghost' || variant === 'subtle') return 'text';
  if (variant === 'link') return 'link';
  if (variant === 'outline') return 'dashed';
  if (variant === 'default' || variant === 'secondary') return 'default';
  return 'primary';
};

// Size mapping
const mapSize = (size?: string): 'small' | 'middle' | 'large' => {
  if (size === 'xs' || size === 'sm') return 'small';
  if (size === 'lg' || size === 'xl') return 'large';
  return 'middle';
};

// Status mapping for alerts
const mapAlertStatus = (status?: string): 'success' | 'info' | 'warning' | 'error' => {
  const statusMap: Record<string, 'success' | 'info' | 'warning' | 'error'> = {
    success: 'success',
    info: 'info',
    warning: 'warning',
    error: 'error',
    danger: 'error',
  };
  return statusMap[status || 'info'] || 'info';
};

// Color mapping for badges
const mapBadgeColor = (color?: string): string => {
  const colorMap: Record<string, string> = {
    primary: 'blue',
    secondary: 'purple',
    success: 'green',
    warning: 'gold',
    error: 'red',
    danger: 'red',
    info: 'cyan',
    default: 'default',
  };
  return colorMap[color || 'default'] || color || 'default';
};

// Component Registry - Maps catalog component names to Ant Design components
const antdComponents: ComponentRegistry = {
  // ============================================
  // Layout Components
  // ============================================
  Container: ({ element, children }) => {
    const { maxWidth = 1200, ...rest } = element.props as { maxWidth?: number | string };
    return (
      <Content
        style={{
          maxWidth: typeof maxWidth === 'number' ? maxWidth : maxWidth,
          margin: '0 auto',
          padding: '0 16px',
          width: '100%',
        }}
        {...rest}
      >
        {children}
      </Content>
    );
  },

  Row: ({ element, children }) => {
    const { gap, justify, align } = element.props as { gap?: number; justify?: string; align?: string };
    return (
      <Row gutter={gap ? gap * 8 : 16} justify={justify as 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'} align={align as 'top' | 'middle' | 'bottom'}>
        {children}
      </Row>
    );
  },

  Column: ({ element, children }) => {
    const { gap, justify, align } = element.props as { gap?: number; justify?: string; align?: string };
    return (
      <Flex
        vertical
        gap={gap ? gap * 8 : 16}
        justify={justify}
        align={align}
      >
        {children}
      </Flex>
    );
  },

  Grid: ({ element, children }) => {
    const { cols = 12, gap = 2, rowGap, colGap, columns = 3 } = element.props as { cols?: number; gap?: number; rowGap?: number; colGap?: number; columns?: number };
    return (
      <Row gutter={[colGap ? colGap * 8 : gap * 8, rowGap ? rowGap * 8 : gap * 8]}>
        {React.Children.map(children, (child) => (
          <Col xs={24} sm={columns >= 2 ? 12 : 24} md={columns >= 3 ? 8 : columns === 2 ? 12 : 24}>
            {child}
          </Col>
        ))}
      </Row>
    );
  },

  Stack: ({ element, children }) => {
    const {
      direction = 'column',
      gap = 2,
      align,
      justify,
      wrap = true,
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

    // For responsive horizontal stacks, use Flex instead of Space
    if (responsive && direction === 'row') {
      return (
        <Flex
          vertical={{ xs: true, md: false }}
          gap={gap * 8}
          align={align}
          justify={justify}
          wrap={wrap}
          style={{ width: '100%' }}
        >
          {children}
        </Flex>
      );
    }

    return (
      <Space
        direction={direction === 'column' ? 'vertical' : 'horizontal'}
        size={gap * 8}
        align={align as 'start' | 'end' | 'center' | 'baseline'}
        wrap={wrap}
        split={divider ? <AntDivider type={direction === 'row' ? 'vertical' : 'horizontal'} /> : undefined}
        style={{ width: direction === 'column' ? '100%' : undefined }}
      >
        {children}
      </Space>
    );
  },

  Spacer: ({ element }) => {
    const { size = 2 } = element.props as { size?: number };
    return <div style={{ height: size * 8, width: size * 8 }} />;
  },

  Divider: ({ element }) => {
    const { orientation = 'horizontal', variant, text } = element.props as { orientation?: 'horizontal' | 'vertical'; variant?: string; text?: string };
    return (
      <AntDivider
        type={orientation}
        dashed={variant === 'dashed'}
      >
        {text}
      </AntDivider>
    );
  },

  // ============================================
  // Card Components
  // ============================================
  Card: ({ element, children }) => {
    const { variant, elevation, hoverable, bordered = true } = element.props as { variant?: string; elevation?: number; hoverable?: boolean; bordered?: boolean };
    return (
      <AntCard
        bordered={variant === 'outlined' ? true : bordered}
        hoverable={hoverable}
        style={{
          boxShadow: variant === 'elevated' || elevation ? `0 ${elevation || 2}px ${(elevation || 2) * 4}px rgba(0,0,0,0.1)` : undefined,
        }}
      >
        {children}
      </AntCard>
    );
  },

  CardHeader: ({ element }) => {
    const { title, subtitle, action, extra } = element.props as { title?: string; subtitle?: string; action?: React.ReactNode; extra?: React.ReactNode };
    return (
      <div style={{ marginBottom: 16 }}>
        <Flex justify="space-between" align="flex-start">
          <div>
            {title && <Title level={4} style={{ margin: 0 }}>{title}</Title>}
            {subtitle && <AntText type="secondary">{subtitle}</AntText>}
          </div>
          {(action || extra) && <div>{action || extra}</div>}
        </Flex>
      </div>
    );
  },

  CardBody: ({ children }) => {
    return <div style={{ marginBottom: 16 }}>{children}</div>;
  },

  CardFooter: ({ children }) => {
    return <div style={{ paddingTop: 16, borderTop: '1px solid #f0f0f0' }}>{children}</div>;
  },

  // ============================================
  // Typography Components
  // ============================================
  Heading: ({ element }) => {
    const { level = 1, children: textContent, text } = element.props as { level?: 1 | 2 | 3 | 4 | 5; children?: string; text?: string };
    const content = textContent || text;
    return <Title level={level}>{content}</Title>;
  },

  Text: ({ element }) => {
    const { variant = 'body', children: textContent, text, color, strong, italic, underline, mark, code, keyboard, deleted } = element.props as {
      variant?: string;
      children?: string;
      text?: string;
      color?: string;
      strong?: boolean;
      italic?: boolean;
      underline?: boolean;
      mark?: boolean;
      code?: boolean;
      keyboard?: boolean;
      deleted?: boolean;
    };
    const content = textContent || text;
    const type = color === 'secondary' ? 'secondary' : color === 'warning' ? 'warning' : color === 'danger' ? 'danger' : color === 'success' ? 'success' : undefined;

    if (variant === 'paragraph' || variant === 'body1') {
      return <Paragraph type={type}>{content}</Paragraph>;
    }

    return (
      <AntText
        type={type}
        strong={strong}
        italic={italic}
        underline={underline}
        mark={mark}
        code={code}
        keyboard={keyboard}
        delete={deleted}
      >
        {content}
      </AntText>
    );
  },

  Link: ({ element }) => {
    const { href, children: textContent, text, target } = element.props as { href?: string; children?: string; text?: string; target?: string };
    const content = textContent || text;
    return (
      <AntLink href={href} target={target}>
        {content}
      </AntLink>
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
      loading,
      block,
      icon,
      iconPosition = 'start',
      danger,
      onClick,
    } = element.props as {
      label?: string;
      children?: string;
      variant?: string;
      color?: string;
      size?: string;
      disabled?: boolean;
      loading?: boolean;
      block?: boolean;
      icon?: string;
      iconPosition?: 'start' | 'end';
      danger?: boolean;
      onClick?: () => void;
    };
    const content = label || textContent;
    const isDanger = danger || color === 'error' || color === 'danger';
    return (
      <AntButton
        type={mapButtonType(variant)}
        size={mapSize(size)}
        disabled={disabled}
        loading={loading}
        block={block}
        danger={isDanger}
        icon={iconPosition === 'start' ? getIcon(icon) : undefined}
        onClick={onClick}
      >
        {content}
        {iconPosition === 'end' && getIcon(icon)}
      </AntButton>
    );
  },

  IconButton: ({ element }) => {
    const { icon, label, color, size, disabled, danger } = element.props as {
      icon: string;
      label?: string;
      color?: string;
      size?: string;
      disabled?: boolean;
      danger?: boolean;
    };
    return (
      <AntButton
        type="text"
        shape="circle"
        size={mapSize(size)}
        disabled={disabled}
        danger={danger || color === 'error' || color === 'danger'}
        icon={getIcon(icon)}
        aria-label={label}
      />
    );
  },

  ButtonGroup: ({ element, children }) => {
    const { variant, size } = element.props as {
      variant?: string;
      size?: string;
    };
    return (
      <Space.Compact>
        {children}
      </Space.Compact>
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
      status,
      prefix,
      suffix,
      allowClear,
      size,
    } = element.props as {
      label?: string;
      placeholder?: string;
      type?: string;
      value?: string;
      disabled?: boolean;
      required?: boolean;
      status?: 'error' | 'warning';
      prefix?: string;
      suffix?: string;
      allowClear?: boolean;
      size?: string;
    };

    const input = type === 'password' ? (
      <AntInput.Password
        placeholder={placeholder}
        defaultValue={value}
        disabled={disabled}
        status={status}
        prefix={prefix ? getIcon(prefix) : undefined}
        size={mapSize(size)}
      />
    ) : (
      <AntInput
        placeholder={placeholder}
        defaultValue={value}
        disabled={disabled}
        status={status}
        prefix={prefix ? getIcon(prefix) : undefined}
        suffix={suffix ? getIcon(suffix) : undefined}
        allowClear={allowClear}
        size={mapSize(size)}
      />
    );

    if (label) {
      return (
        <Form.Item label={label} required={required}>
          {input}
        </Form.Item>
      );
    }
    return input;
  },

  TextArea: ({ element }) => {
    const {
      label,
      placeholder,
      value,
      rows = 4,
      disabled,
      required,
      maxLength,
      showCount,
    } = element.props as {
      label?: string;
      placeholder?: string;
      value?: string;
      rows?: number;
      disabled?: boolean;
      required?: boolean;
      maxLength?: number;
      showCount?: boolean;
    };

    const textarea = (
      <TextArea
        placeholder={placeholder}
        defaultValue={value}
        rows={rows}
        disabled={disabled}
        maxLength={maxLength}
        showCount={showCount}
      />
    );

    if (label) {
      return (
        <Form.Item label={label} required={required}>
          {textarea}
        </Form.Item>
      );
    }
    return textarea;
  },

  Select: ({ element }) => {
    const {
      label,
      placeholder,
      options = [],
      value,
      disabled,
      required,
      mode,
      allowClear,
      showSearch,
      size,
    } = element.props as {
      label?: string;
      placeholder?: string;
      options?: { value: string; label: string }[];
      value?: string;
      disabled?: boolean;
      required?: boolean;
      mode?: 'multiple' | 'tags';
      allowClear?: boolean;
      showSearch?: boolean;
      size?: string;
    };

    const select = (
      <AntSelect
        placeholder={placeholder}
        defaultValue={value}
        disabled={disabled}
        mode={mode}
        allowClear={allowClear}
        showSearch={showSearch}
        size={mapSize(size)}
        style={{ width: '100%' }}
        options={options}
      />
    );

    if (label) {
      return (
        <Form.Item label={label} required={required}>
          {select}
        </Form.Item>
      );
    }
    return select;
  },

  Checkbox: ({ element }) => {
    const { label, checked, disabled, indeterminate } = element.props as {
      label?: string;
      checked?: boolean;
      disabled?: boolean;
      indeterminate?: boolean;
    };
    return (
      <AntCheckbox
        defaultChecked={checked}
        disabled={disabled}
        indeterminate={indeterminate}
      >
        {label}
      </AntCheckbox>
    );
  },

  Radio: ({ element }) => {
    const { label, value, disabled } = element.props as {
      label?: string;
      value?: string;
      disabled?: boolean;
    };
    return (
      <AntRadio value={value} disabled={disabled}>
        {label}
      </AntRadio>
    );
  },

  RadioGroup: ({ element, children }) => {
    const { label, orientation = 'vertical', value, buttonStyle } = element.props as {
      label?: string;
      orientation?: 'horizontal' | 'vertical';
      value?: string;
      buttonStyle?: 'outline' | 'solid';
    };
    return (
      <Form.Item label={label}>
        <AntRadio.Group
          defaultValue={value}
          buttonStyle={buttonStyle}
          style={{ display: 'flex', flexDirection: orientation === 'horizontal' ? 'row' : 'column', gap: 8 }}
        >
          {children}
        </AntRadio.Group>
      </Form.Item>
    );
  },

  Switch: ({ element }) => {
    const { label, checked, disabled, size, loading } = element.props as {
      label?: string;
      checked?: boolean;
      disabled?: boolean;
      size?: string;
      loading?: boolean;
    };
    return (
      <Flex align="center" gap={8}>
        <AntSwitch
          defaultChecked={checked}
          disabled={disabled}
          size={size === 'sm' || size === 'small' ? 'small' : 'default'}
          loading={loading}
        />
        {label && <AntText>{label}</AntText>}
      </Flex>
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
      range,
      tooltip,
    } = element.props as {
      label?: string;
      min?: number;
      max?: number;
      value?: number;
      step?: number;
      disabled?: boolean;
      marks?: Record<number, string>;
      range?: boolean;
      tooltip?: boolean;
    };
    return (
      <div style={{ width: '100%' }}>
        {label && <AntText style={{ display: 'block', marginBottom: 8 }}>{label}</AntText>}
        {range ? (
          <AntSlider
            defaultValue={[min, value || max]}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            marks={marks}
            range
            tooltip={{ open: tooltip === false ? false : undefined }}
          />
        ) : (
          <AntSlider
            defaultValue={value || min}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            marks={marks}
            tooltip={{ open: tooltip === false ? false : undefined }}
          />
        )}
      </div>
    );
  },

  // ============================================
  // Data Display Components
  // ============================================
  Badge: ({ element, children }) => {
    const { label, children: textContent, count, color, dot, showZero, overflowCount, status } = element.props as {
      label?: string;
      children?: string;
      count?: number;
      color?: string;
      dot?: boolean;
      showZero?: boolean;
      overflowCount?: number;
      status?: 'success' | 'processing' | 'default' | 'error' | 'warning';
    };

    // If it's a text badge (like a tag), use Tag
    if (label || textContent) {
      return (
        <AntTag color={mapBadgeColor(color)}>
          {label || textContent}
        </AntTag>
      );
    }

    // If it's a numeric badge
    return (
      <AntBadge
        count={count}
        color={color}
        dot={dot}
        showZero={showZero}
        overflowCount={overflowCount}
        status={status}
      >
        {children}
      </AntBadge>
    );
  },

  Avatar: ({ element }) => {
    const { src, alt, name, size, icon, shape } = element.props as {
      src?: string;
      alt?: string;
      name?: string;
      size?: string | number;
      icon?: string;
      shape?: 'circle' | 'square';
    };
    const sizeMap: Record<string, number> = { sm: 32, md: 40, lg: 56, xl: 72 };
    const avatarSize = typeof size === 'number' ? size : sizeMap[size || 'md'] || 40;
    const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : undefined;

    return (
      <AntAvatar
        src={src}
        alt={alt || name}
        size={avatarSize}
        shape={shape}
        icon={!src && !initials && icon ? getIcon(icon) : undefined}
      >
        {!src && initials}
      </AntAvatar>
    );
  },

  AvatarGroup: ({ element, children }) => {
    const { max = 4, size } = element.props as { max?: number; size?: string | number };
    const sizeMap: Record<string, number> = { sm: 32, md: 40, lg: 56 };
    const avatarSize = typeof size === 'number' ? size : sizeMap[size || 'md'] || 40;

    return (
      <AntAvatar.Group max={{ count: max }} size={avatarSize}>
        {children}
      </AntAvatar.Group>
    );
  },

  Icon: ({ element }) => {
    const { name, size, color } = element.props as { name: string; size?: string; color?: string };
    return (
      <span style={{ color, fontSize: size === 'lg' ? 24 : size === 'sm' ? 14 : 18 }}>
        {getIcon(name)}
      </span>
    );
  },

  Image: ({ element }) => {
    const { src, alt, width, height, preview, fallback } = element.props as {
      src: string;
      alt?: string;
      width?: number | string;
      height?: number | string;
      preview?: boolean;
      fallback?: string;
    };
    return (
      <AntImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        preview={preview}
        fallback={fallback}
        style={{ borderRadius: 6 }}
      />
    );
  },

  List: ({ element, children }) => {
    const { bordered, size, split } = element.props as { bordered?: boolean; size?: string; split?: boolean };
    return (
      <AntList
        bordered={bordered}
        size={size === 'sm' ? 'small' : size === 'lg' ? 'large' : 'default'}
        split={split !== false}
      >
        {children}
      </AntList>
    );
  },

  ListItem: ({ element, children }) => {
    const { icon, primary, secondary, extra } = element.props as {
      icon?: string;
      primary?: string;
      secondary?: string;
      extra?: React.ReactNode;
    };
    return (
      <AntList.Item extra={extra}>
        <AntList.Item.Meta
          avatar={icon ? getIcon(icon) : undefined}
          title={primary}
          description={secondary}
        />
        {children}
      </AntList.Item>
    );
  },

  Table: ({ element }) => {
    const { columns, dataSource, size, bordered, loading, pagination, rowSelection } = element.props as {
      columns?: { title: string; dataIndex: string; key: string }[];
      dataSource?: Record<string, unknown>[];
      size?: string;
      bordered?: boolean;
      loading?: boolean;
      pagination?: boolean | object;
      rowSelection?: object;
    };
    return (
      <AntTable
        columns={columns}
        dataSource={dataSource}
        size={size === 'sm' ? 'small' : size === 'lg' ? 'large' : 'middle'}
        bordered={bordered}
        loading={loading}
        pagination={pagination === true ? {} : pagination === false ? false : pagination as object}
        rowSelection={rowSelection}
      />
    );
  },

  TableHeader: ({ children }) => <thead>{children}</thead>,

  TableBody: ({ children }) => <tbody>{children}</tbody>,

  TableRow: ({ children }) => <tr>{children}</tr>,

  TableCell: ({ element, children }) => {
    const { align, isHeader } = element.props as { align?: 'left' | 'center' | 'right'; isHeader?: boolean };
    const Tag = isHeader ? 'th' : 'td';
    return <Tag style={{ textAlign: align }}>{children}</Tag>;
  },

  Metric: ({ element }) => {
    const { label, value, precision, prefix, suffix, trend, trendValue } = element.props as {
      label: string;
      value: number | string;
      precision?: number;
      prefix?: string | React.ReactNode;
      suffix?: string | React.ReactNode;
      trend?: 'up' | 'down';
      trendValue?: string | number;
    };
    return (
      <Statistic
        title={label}
        value={value}
        precision={precision}
        prefix={typeof prefix === 'string' ? getIcon(prefix) : prefix}
        suffix={suffix}
        valueStyle={trend === 'up' ? { color: '#52c41a' } : trend === 'down' ? { color: '#ff4d4f' } : undefined}
      />
    );
  },

  Progress: ({ element }) => {
    const { value = 0, type = 'line', status, strokeColor, size, showInfo, format } = element.props as {
      value?: number;
      type?: 'line' | 'circle' | 'dashboard';
      status?: 'success' | 'exception' | 'normal' | 'active';
      strokeColor?: string;
      size?: string | number;
      showInfo?: boolean;
      format?: (percent?: number) => React.ReactNode;
    };
    return (
      <AntProgress
        percent={value}
        type={type}
        status={status}
        strokeColor={strokeColor}
        size={typeof size === 'number' ? size : size === 'sm' ? 'small' : 'default'}
        showInfo={showInfo}
        format={format}
      />
    );
  },

  // ============================================
  // Feedback Components
  // ============================================
  Alert: ({ element }) => {
    const { title, description, status = 'info', closable, showIcon, banner, action } = element.props as {
      title?: string;
      description?: string;
      status?: string;
      closable?: boolean;
      showIcon?: boolean;
      banner?: boolean;
      action?: React.ReactNode;
    };
    return (
      <AntAlert
        message={title}
        description={description}
        type={mapAlertStatus(status)}
        closable={closable}
        showIcon={showIcon !== false}
        banner={banner}
        action={action}
      />
    );
  },

  Toast: ({ element }) => {
    const { title, description, status = 'info' } = element.props as {
      title?: string;
      description?: string;
      status?: string;
    };
    return (
      <AntAlert
        message={title}
        description={description}
        type={mapAlertStatus(status)}
        showIcon
        style={{ marginBottom: 8 }}
      />
    );
  },

  Skeleton: ({ element }) => {
    const { variant = 'text', width, height, active = true, avatar, paragraph, rows } = element.props as {
      variant?: 'text' | 'circular' | 'rectangular' | 'image';
      width?: number | string;
      height?: number | string;
      active?: boolean;
      avatar?: boolean;
      paragraph?: boolean;
      rows?: number;
    };

    if (variant === 'circular' || avatar) {
      return <AntSkeleton.Avatar active={active} size={typeof width === 'number' ? width : 'default'} />;
    }
    if (variant === 'image') {
      return <AntSkeleton.Image active={active} style={{ width, height }} />;
    }
    if (variant === 'rectangular') {
      return <AntSkeleton.Button active={active} style={{ width, height }} block />;
    }

    return (
      <AntSkeleton
        active={active}
        avatar={avatar}
        paragraph={paragraph !== false ? { rows: rows || 3 } : false}
      />
    );
  },

  Spinner: ({ element }) => {
    const { size, tip } = element.props as { size?: string; tip?: string };
    return (
      <Spin
        size={size === 'sm' ? 'small' : size === 'lg' ? 'large' : 'default'}
        tip={tip}
      />
    );
  },

  EmptyState: ({ element, children }) => {
    const { title, description, image } = element.props as {
      title?: string;
      description?: string;
      image?: string | React.ReactNode;
    };
    return (
      <Empty
        image={image}
        description={
          <Space direction="vertical" size={4}>
            {title && <AntText strong>{title}</AntText>}
            {description && <AntText type="secondary">{description}</AntText>}
          </Space>
        }
      >
        {children}
      </Empty>
    );
  },

  // ============================================
  // Navigation Components
  // ============================================
  Tabs: ({ element, children }) => {
    const { defaultActiveKey, type, size, centered, tabPosition } = element.props as {
      defaultActiveKey?: string;
      type?: 'line' | 'card' | 'editable-card';
      size?: string;
      centered?: boolean;
      tabPosition?: 'top' | 'bottom' | 'left' | 'right';
    };

    // Convert children to items array for Ant Design 5+ API
    const items = React.Children.toArray(children).map((child, index) => {
      const childElement = child as React.ReactElement<{ element: { props: { value?: string; label?: string; disabled?: boolean } }; children?: React.ReactNode }>;
      const props = childElement.props?.element?.props || {};
      return {
        key: props.value || String(index),
        label: props.label,
        disabled: props.disabled,
        children: childElement.props?.children,
      };
    });

    return (
      <AntTabs
        defaultActiveKey={defaultActiveKey}
        type={type}
        size={mapSize(size)}
        centered={centered}
        tabPosition={tabPosition}
        items={items}
      />
    );
  },

  TabList: ({ children }) => <>{children}</>,

  Tab: ({ element }) => {
    const { value, label, disabled, icon } = element.props as {
      value: string;
      label: string;
      disabled?: boolean;
      icon?: string;
    };
    // This is handled by the Tabs component
    return null;
  },

  TabPanel: ({ element, children }) => {
    // This is handled by the Tabs component
    return <>{children}</>;
  },

  Breadcrumb: ({ element, children }) => {
    const items = React.Children.toArray(children).map((child, index) => {
      const childElement = child as React.ReactElement<{ element: { props: { label?: string; href?: string; active?: boolean } } }>;
      const props = childElement.props?.element?.props || {};
      return {
        key: index,
        title: props.href && !props.active ? <a href={props.href}>{props.label}</a> : props.label,
      };
    });

    return <AntBreadcrumb items={items} />;
  },

  BreadcrumbItem: ({ element }) => {
    // This is handled by Breadcrumb component
    return null;
  },

  Pagination: ({ element }) => {
    const { current = 1, total = 100, pageSize = 10, size, showSizeChanger, showQuickJumper, simple, showTotal } = element.props as {
      current?: number;
      total?: number;
      pageSize?: number;
      size?: string;
      showSizeChanger?: boolean;
      showQuickJumper?: boolean;
      simple?: boolean;
      showTotal?: (total: number, range: [number, number]) => React.ReactNode;
    };
    return (
      <AntPagination
        current={current}
        total={total}
        pageSize={pageSize}
        size={size === 'sm' ? 'small' : undefined}
        showSizeChanger={showSizeChanger}
        showQuickJumper={showQuickJumper}
        simple={simple}
        showTotal={showTotal}
      />
    );
  },

  NavMenu: ({ element, children }) => {
    const { mode = 'horizontal', theme, selectedKeys } = element.props as {
      mode?: 'horizontal' | 'vertical' | 'inline';
      theme?: 'light' | 'dark';
      selectedKeys?: string[];
    };

    const items = React.Children.toArray(children).map((child, index) => {
      const childElement = child as React.ReactElement<{ element: { props: { label?: string; href?: string; icon?: string; active?: boolean } } }>;
      const props = childElement.props?.element?.props || {};
      return {
        key: props.href || String(index),
        label: props.href ? <a href={props.href}>{props.label}</a> : props.label,
        icon: getIcon(props.icon),
      };
    });

    return (
      <AntMenu
        mode={mode}
        theme={theme}
        selectedKeys={selectedKeys}
        items={items}
      />
    );
  },

  NavItem: ({ element }) => {
    // This is handled by NavMenu component
    return null;
  },

  // ============================================
  // Overlay Components
  // ============================================
  Modal: ({ element, children }) => {
    const { title, open = true, width, centered, closable, footer, maskClosable } = element.props as {
      title?: string;
      open?: boolean;
      width?: number | string;
      centered?: boolean;
      closable?: boolean;
      footer?: React.ReactNode;
      maskClosable?: boolean;
    };
    return (
      <AntModal
        title={title}
        open={open}
        width={width}
        centered={centered}
        closable={closable}
        footer={footer}
        maskClosable={maskClosable}
      >
        {children}
      </AntModal>
    );
  },

  Drawer: ({ element, children }) => {
    const { title, placement = 'right', open = true, width, height, closable, mask } = element.props as {
      title?: string;
      placement?: 'left' | 'right' | 'top' | 'bottom';
      open?: boolean;
      width?: number | string;
      height?: number | string;
      closable?: boolean;
      mask?: boolean;
    };
    return (
      <AntDrawer
        title={title}
        placement={placement}
        open={open}
        width={width || (placement === 'left' || placement === 'right' ? 320 : undefined)}
        height={height || (placement === 'top' || placement === 'bottom' ? 256 : undefined)}
        closable={closable}
        mask={mask}
      >
        {children}
      </AntDrawer>
    );
  },

  Tooltip: ({ element, children }) => {
    const { content, title, placement = 'top', color, trigger } = element.props as {
      content?: string;
      title?: string;
      placement?: string;
      color?: string;
      trigger?: 'hover' | 'focus' | 'click' | 'contextMenu';
    };
    return (
      <AntTooltip
        title={content || title}
        placement={placement as 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom'}
        color={color}
        trigger={trigger}
      >
        <span>{children}</span>
      </AntTooltip>
    );
  },

  Popover: ({ element, children }) => {
    const { title, content, placement = 'top', trigger } = element.props as {
      title?: string;
      content?: React.ReactNode;
      placement?: string;
      trigger?: 'hover' | 'focus' | 'click' | 'contextMenu';
    };
    return (
      <AntPopover
        title={title}
        content={content}
        placement={placement as 'top' | 'left' | 'right' | 'bottom'}
        trigger={trigger}
      >
        <span>{children}</span>
      </AntPopover>
    );
  },

  Dropdown: ({ element, children }) => {
    const { trigger = 'hover', placement } = element.props as {
      trigger?: string;
      placement?: string;
    };

    const items = React.Children.toArray(children).map((child, index) => {
      const childElement = child as React.ReactElement<{ element: { props: { label?: string; icon?: string; disabled?: boolean; danger?: boolean; divider?: boolean } } }>;
      const props = childElement.props?.element?.props || {};
      if (props.divider) {
        return { type: 'divider' as const, key: `divider-${index}` };
      }
      return {
        key: String(index),
        label: props.label,
        icon: getIcon(props.icon),
        disabled: props.disabled,
        danger: props.danger,
      };
    });

    return (
      <AntDropdown
        menu={{ items }}
        trigger={[trigger as 'click' | 'hover' | 'contextMenu']}
        placement={placement as 'bottom' | 'bottomLeft' | 'bottomRight' | 'top' | 'topLeft' | 'topRight'}
      >
        <AntButton>
          {(element.props as { label?: string }).label || 'Dropdown'}
          <DownOutlined />
        </AntButton>
      </AntDropdown>
    );
  },

  DropdownItem: ({ element }) => {
    // This is handled by Dropdown component
    return null;
  },

  // ============================================
  // Collapse & Accordion Components
  // ============================================
  Accordion: ({ element, children }) => {
    const { defaultActiveKey, accordion = true, bordered, ghost, expandIconPosition } = element.props as {
      defaultActiveKey?: string | string[];
      accordion?: boolean;
      bordered?: boolean;
      ghost?: boolean;
      expandIconPosition?: 'start' | 'end';
    };

    const items = React.Children.toArray(children).map((child, index) => {
      const childElement = child as React.ReactElement<{ element: { props: { title?: string; key?: string; disabled?: boolean } }; children?: React.ReactNode }>;
      const props = childElement.props?.element?.props || {};
      return {
        key: props.key || String(index),
        label: props.title,
        children: childElement.props?.children,
        disabled: props.disabled,
      };
    });

    return (
      <AntCollapse
        defaultActiveKey={defaultActiveKey}
        accordion={accordion}
        bordered={bordered}
        ghost={ghost}
        expandIconPosition={expandIconPosition}
        items={items}
      />
    );
  },

  AccordionItem: ({ element, children }) => {
    // This is handled by Accordion component
    return null;
  },

  Collapsible: ({ element, children }) => {
    const { title, defaultOpen, ghost } = element.props as { title?: string; defaultOpen?: boolean; ghost?: boolean };
    return (
      <AntCollapse
        defaultActiveKey={defaultOpen ? ['1'] : []}
        ghost={ghost}
        items={[
          {
            key: '1',
            label: title,
            children: children,
          },
        ]}
      />
    );
  },

  // ============================================
  // Specialized Components
  // ============================================
  Chart: ({ element }) => {
    const { type, height = 200, title } = element.props as { type: string; height?: number; title?: string };
    return (
      <AntCard style={{ height }}>
        <Flex vertical align="center" justify="center" style={{ height: '100%' }}>
          {title && <AntText strong>{title}</AntText>}
          <AntText type="secondary">Chart: {type}</AntText>
        </Flex>
      </AntCard>
    );
  },

  Calendar: ({ element }) => {
    const { fullscreen } = element.props as { fullscreen?: boolean };
    return (
      <AntCard>
        <AntText type="secondary">Calendar Placeholder</AntText>
      </AntCard>
    );
  },

  DatePicker: ({ element }) => {
    const { label, placeholder, format, showTime, picker, disabled } = element.props as {
      label?: string;
      placeholder?: string;
      format?: string;
      showTime?: boolean;
      picker?: 'date' | 'week' | 'month' | 'quarter' | 'year';
      disabled?: boolean;
    };

    const datePicker = (
      <AntDatePicker
        placeholder={placeholder}
        format={format}
        showTime={showTime}
        picker={picker}
        disabled={disabled}
        style={{ width: '100%' }}
      />
    );

    if (label) {
      return (
        <Form.Item label={label}>
          {datePicker}
        </Form.Item>
      );
    }
    return datePicker;
  },

  FileUpload: ({ element }) => {
    const { label, accept, multiple, maxCount, listType, disabled } = element.props as {
      label?: string;
      accept?: string;
      multiple?: boolean;
      maxCount?: number;
      listType?: 'text' | 'picture' | 'picture-card' | 'picture-circle';
      disabled?: boolean;
    };
    return (
      <div>
        {label && <AntText style={{ display: 'block', marginBottom: 8 }}>{label}</AntText>}
        <Upload
          accept={accept}
          multiple={multiple}
          maxCount={maxCount}
          listType={listType}
          disabled={disabled}
        >
          <AntButton icon={<UploadOutlined />}>Upload File</AntButton>
        </Upload>
      </div>
    );
  },

  Rating: ({ element }) => {
    const { value, count = 5, allowHalf, disabled, character } = element.props as {
      value?: number;
      count?: number;
      allowHalf?: boolean;
      disabled?: boolean;
      character?: React.ReactNode;
    };
    return (
      <AntRate
        defaultValue={value}
        count={count}
        allowHalf={allowHalf}
        disabled={disabled}
        character={character}
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
      <div>
        {label && <AntText style={{ display: 'block', marginBottom: 8 }}>{label}</AntText>}
        <Flex wrap="wrap" gap={4} style={{ padding: 8, border: '1px solid #d9d9d9', borderRadius: 6, minHeight: 42 }}>
          {tags.map((tag, index) => (
            <AntTag key={index} closable>{tag}</AntTag>
          ))}
          <AntInput
            placeholder={placeholder}
            variant="borderless"
            style={{ flex: 1, minWidth: 100 }}
          />
        </Flex>
      </div>
    );
  },

  ColorPicker: ({ element }) => {
    const { label, value = '#1677ff', showText } = element.props as { label?: string; value?: string; showText?: boolean };
    return (
      <div>
        {label && <AntText style={{ display: 'block', marginBottom: 8 }}>{label}</AntText>}
        <ColorPicker defaultValue={value} showText={showText} />
      </div>
    );
  },

  Timeline: ({ element, children }) => {
    const { mode, pending, reverse } = element.props as {
      mode?: 'left' | 'alternate' | 'right';
      pending?: React.ReactNode;
      reverse?: boolean;
    };

    const items = React.Children.toArray(children).map((child, index) => {
      const childElement = child as React.ReactElement<{ element: { props: { title?: string; description?: string; color?: string; label?: string } } }>;
      const props = childElement.props?.element?.props || {};
      return {
        key: index,
        children: (
          <>
            <div style={{ fontWeight: 500 }}>{props.title}</div>
            {props.description && <div style={{ color: 'rgba(0,0,0,0.45)' }}>{props.description}</div>}
          </>
        ),
        color: props.color,
        label: props.label,
      };
    });

    return (
      <AntTimeline
        mode={mode}
        pending={pending}
        reverse={reverse}
        items={items}
      />
    );
  },

  TimelineItem: ({ element }) => {
    // This is handled by Timeline component
    return null;
  },

  Stepper: ({ element, children }) => {
    const { current = 0, direction = 'horizontal', size, status, progressDot, labelPlacement } = element.props as {
      current?: number;
      direction?: 'horizontal' | 'vertical';
      size?: string;
      status?: 'wait' | 'process' | 'finish' | 'error';
      progressDot?: boolean;
      labelPlacement?: 'horizontal' | 'vertical';
    };

    const items = React.Children.toArray(children).map((child) => {
      const childElement = child as React.ReactElement<{ element: { props: { title?: string; description?: string; icon?: string; status?: string } } }>;
      const props = childElement.props?.element?.props || {};
      return {
        title: props.title,
        description: props.description,
        icon: props.icon ? getIcon(props.icon) : undefined,
        status: props.status as 'wait' | 'process' | 'finish' | 'error' | undefined,
      };
    });

    return (
      <AntSteps
        current={current}
        direction={direction}
        size={size === 'sm' ? 'small' : 'default'}
        status={status}
        progressDot={progressDot}
        labelPlacement={labelPlacement}
        items={items}
      />
    );
  },

  Step: ({ element }) => {
    // This is handled by Stepper component
    return null;
  },

  Code: ({ element }) => {
    const { children: code, language } = element.props as { children?: string; language?: string };
    return (
      <pre
        style={{
          padding: 16,
          backgroundColor: '#1e1e1e',
          color: '#d4d4d4',
          borderRadius: 6,
          overflow: 'auto',
          fontFamily: 'monospace',
          fontSize: '0.875rem',
          margin: 0,
        }}
      >
        <code>{code}</code>
      </pre>
    );
  },

  Kbd: ({ element }) => {
    const { children: key } = element.props as { children?: string };
    return (
      <Typography.Text keyboard>
        {key}
      </Typography.Text>
    );
  },

  Quote: ({ element }) => {
    const { children: text, author, source } = element.props as { children?: string; author?: string; source?: string };
    return (
      <blockquote
        style={{
          paddingLeft: 16,
          borderLeft: '4px solid #1677ff',
          fontStyle: 'italic',
          margin: '16px 0',
        }}
      >
        <Paragraph style={{ margin: 0 }}>{text}</Paragraph>
        {(author || source) && (
          <AntText type="secondary" style={{ fontSize: '0.875rem' }}>
            {author && `-- ${author}`}{source && `, ${source}`}
          </AntText>
        )}
      </blockquote>
    );
  },

  Stat: ({ element }) => {
    const { label, value, helpText, icon, prefix, suffix } = element.props as {
      label: string;
      value: string | number;
      helpText?: string;
      icon?: string;
      prefix?: React.ReactNode;
      suffix?: React.ReactNode;
    };
    return (
      <Statistic
        title={label}
        value={value}
        prefix={icon ? getIcon(icon) : prefix}
        suffix={suffix}
      />
    );
  },

  Tag: ({ element }) => {
    const { label, children: textContent, color, variant, closable, icon } = element.props as {
      label?: string;
      children?: string;
      color?: string;
      variant?: string;
      closable?: boolean;
      icon?: string;
    };
    const content = label || textContent;
    return (
      <AntTag
        color={mapBadgeColor(color)}
        closable={closable}
        bordered={variant !== 'borderless'}
        icon={getIcon(icon)}
      >
        {content}
      </AntTag>
    );
  },

  // ============================================
  // Marketing Components (Custom implementations using Antd primitives)
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
      <Content style={{ padding: '48px 16px', textAlign: align }}>
        <style>{`
          @media (min-width: 768px) {
            .hero-content { padding: 64px 24px !important; }
          }
          @media (min-width: 1024px) {
            .hero-content { padding: 80px 32px !important; }
          }
        `}</style>
        <Space direction="vertical" size="large" style={{ maxWidth: 800, margin: '0 auto', width: '100%' }} className="hero-content">
          {subtitle && <AntText type="secondary" style={{ fontSize: 16 }}>{subtitle}</AntText>}
          {title && <Title level={1} style={{ margin: 0, fontSize: '2rem' }}>{title}</Title>}
          {description && <Paragraph style={{ fontSize: 16, color: 'rgba(0,0,0,0.65)' }}>{description}</Paragraph>}
          <Flex gap="middle" wrap="wrap" justify={align}>
            {primaryAction && (
              <AntButton type="primary" size="large" href={primaryAction.href} style={{ minWidth: 120 }}>
                {primaryAction.label}
              </AntButton>
            )}
            {secondaryAction && (
              <AntButton size="large" href={secondaryAction.href} style={{ minWidth: 120 }}>
                {secondaryAction.label}
              </AntButton>
            )}
          </Flex>
          {image && <AntImage src={image} style={{ marginTop: 32, maxWidth: '100%' }} preview={false} />}
        </Space>
        <style>{`
          @media (min-width: 768px) {
            .hero-content h1 { font-size: 3rem !important; }
            .hero-content p { font-size: 18px !important; }
          }
        `}</style>
      </Content>
    );
  },

  FeatureCard: ({ element }) => {
    const { title, description, icon, link } = element.props as {
      title?: string;
      description?: string;
      icon?: string;
      link?: { label: string; href?: string };
    };
    return (
      <AntCard hoverable style={{ height: '100%' }}>
        <Space direction="vertical" size="middle">
          {icon && (
            <div style={{ fontSize: 32, color: '#1677ff' }}>
              {getIcon(icon)}
            </div>
          )}
          {title && <Title level={4} style={{ margin: 0 }}>{title}</Title>}
          {description && <Paragraph type="secondary">{description}</Paragraph>}
          {link && <AntLink href={link.href}>{link.label} <RightOutlined /></AntLink>}
        </Space>
      </AntCard>
    );
  },

  PricingCard: ({ element }) => {
    const { name, price, period, description, features = [], cta, highlighted, badge } = element.props as {
      name?: string;
      price?: string;
      period?: string;
      description?: string;
      features?: string[];
      cta?: { label: string; href?: string };
      highlighted?: boolean;
      badge?: string;
    };
    return (
      <AntCard
        style={{
          height: '100%',
          borderColor: highlighted ? '#1677ff' : undefined,
          boxShadow: highlighted ? '0 4px 24px rgba(22, 119, 255, 0.15)' : undefined,
        }}
      >
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Flex justify="space-between" align="center">
            {name && <Title level={4} style={{ margin: 0 }}>{name}</Title>}
            {badge && <AntTag color="blue">{badge}</AntTag>}
          </Flex>
          {price && (
            <div>
              <Title level={2} style={{ margin: 0, display: 'inline' }}>{price}</Title>
              {period && <AntText type="secondary"> / {period}</AntText>}
            </div>
          )}
          {description && <Paragraph type="secondary">{description}</Paragraph>}
          <AntList
            size="small"
            dataSource={features}
            renderItem={(feature) => (
              <AntList.Item style={{ padding: '8px 0', border: 'none' }}>
                <Space>
                  <CheckCircleOutlined style={{ color: '#52c41a' }} />
                  <AntText>{feature}</AntText>
                </Space>
              </AntList.Item>
            )}
          />
          {cta && (
            <AntButton type={highlighted ? 'primary' : 'default'} block size="large" href={cta.href}>
              {cta.label}
            </AntButton>
          )}
        </Space>
      </AntCard>
    );
  },

  TestimonialCard: ({ element }) => {
    const { quote, author, role, company, avatar, rating } = element.props as {
      quote?: string;
      author?: string;
      role?: string;
      company?: string;
      avatar?: string;
      rating?: number;
    };
    return (
      <AntCard>
        <Space direction="vertical" size="middle">
          {rating && <AntRate disabled defaultValue={rating} />}
          {quote && <Paragraph style={{ fontSize: 16, fontStyle: 'italic' }}>"{quote}"</Paragraph>}
          <Flex gap={12} align="center">
            {avatar && <AntAvatar src={avatar} size={48} />}
            <div>
              {author && <AntText strong>{author}</AntText>}
              {(role || company) && (
                <div>
                  <AntText type="secondary">{role}{role && company && ', '}{company}</AntText>
                </div>
              )}
            </div>
          </Flex>
        </Space>
      </AntCard>
    );
  },

  CTA: ({ element }) => {
    const { title, description, primaryAction, secondaryAction, background } = element.props as {
      title?: string;
      description?: string;
      primaryAction?: { label: string; href?: string };
      secondaryAction?: { label: string; href?: string };
      background?: string;
    };
    return (
      <Content
        style={{
          padding: '48px 24px',
          textAlign: 'center',
          background: background || '#f5f5f5',
          borderRadius: 8,
        }}
      >
        <Space direction="vertical" size="large" style={{ maxWidth: 600, margin: '0 auto' }}>
          {title && <Title level={2} style={{ margin: 0 }}>{title}</Title>}
          {description && <Paragraph style={{ fontSize: 16 }}>{description}</Paragraph>}
          <Space size="middle">
            {primaryAction && (
              <AntButton type="primary" size="large" href={primaryAction.href}>
                {primaryAction.label}
              </AntButton>
            )}
            {secondaryAction && (
              <AntButton size="large" href={secondaryAction.href}>
                {secondaryAction.label}
              </AntButton>
            )}
          </Space>
        </Space>
      </Content>
    );
  },

  Footer: ({ element }) => {
    const { logo, description, links = [], social = [], copyright } = element.props as {
      logo?: string | React.ReactNode;
      description?: string;
      links?: { title: string; items: { label: string; href?: string }[] }[];
      social?: { icon: string; href?: string }[];
      copyright?: string;
    };
    return (
      <Content style={{ padding: '32px 16px', background: '#001529', color: 'rgba(255,255,255,0.65)' }}>
        <style>{`
          @media (min-width: 768px) {
            .footer-content { padding: 48px 24px !important; }
          }
        `}</style>
        <div className="footer-content">
          <Row gutter={[16, 24]}>
            <Col xs={24} md={8}>
              {logo && (
                <div style={{ marginBottom: 16 }}>
                  {typeof logo === 'string' ? <AntImage src={logo} height={40} preview={false} /> : logo}
                </div>
              )}
              {description && <Paragraph style={{ color: 'rgba(255,255,255,0.65)' }}>{description}</Paragraph>}
              {social.length > 0 && (
                <Space size="middle">
                  {social.map((item, index) => (
                    <a key={index} href={item.href} style={{ color: 'rgba(255,255,255,0.65)' }}>
                      {getIcon(item.icon)}
                    </a>
                  ))}
                </Space>
              )}
            </Col>
            {links.map((section, index) => (
              <Col key={index} xs={12} sm={8} md={4}>
                <Title level={5} style={{ color: '#fff', fontSize: '14px' }}>{section.title}</Title>
                <Space direction="vertical" size={8}>
                  {section.items.map((item, itemIndex) => (
                    <a key={itemIndex} href={item.href} style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px' }}>
                      {item.label}
                    </a>
                  ))}
                </Space>
              </Col>
            ))}
          </Row>
          {copyright && (
            <AntDivider style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
          )}
          {copyright && (
            <AntText style={{ color: 'rgba(255,255,255,0.45)', fontSize: '12px' }}>{copyright}</AntText>
          )}
        </div>
      </Content>
    );
  },

  FAQ: ({ element }) => {
    const { title, items = [] } = element.props as {
      title?: string;
      items?: { question: string; answer: string }[];
    };

    const collapseItems = items.map((item, index) => ({
      key: String(index),
      label: item.question,
      children: <Paragraph>{item.answer}</Paragraph>,
    }));

    return (
      <div>
        {title && <Title level={2} style={{ textAlign: 'center', marginBottom: 32 }}>{title}</Title>}
        <AntCollapse
          items={collapseItems}
          bordered={false}
          expandIconPosition="end"
        />
      </div>
    );
  },

  Newsletter: ({ element }) => {
    const { title, description, placeholder, buttonText, disclaimer } = element.props as {
      title?: string;
      description?: string;
      placeholder?: string;
      buttonText?: string;
      disclaimer?: string;
    };
    return (
      <Content style={{ padding: '48px 24px', textAlign: 'center' }}>
        <Space direction="vertical" size="large" style={{ maxWidth: 500, margin: '0 auto' }}>
          {title && <Title level={3} style={{ margin: 0 }}>{title}</Title>}
          {description && <Paragraph type="secondary">{description}</Paragraph>}
          <Flex gap={8}>
            <AntInput placeholder={placeholder || 'Enter your email'} size="large" style={{ flex: 1 }} />
            <AntButton type="primary" size="large">{buttonText || 'Subscribe'}</AntButton>
          </Flex>
          {disclaimer && <AntText type="secondary" style={{ fontSize: 12 }}>{disclaimer}</AntText>}
        </Space>
      </Content>
    );
  },
};

// Registry Definition
export const antdRegistry: RegistryDefinition = {
  name: 'antd',
  displayName: 'Ant Design',
  description: 'Enterprise-class UI design language and React components from Ant Design',
  framework: 'antd',
  components: antdComponents,
  theme: antdTheme,
};

export { antdComponents, antdTheme };
