'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href?: string;
  action?: string;
  icon?: React.ReactNode;
  active?: boolean;
}

export const FloatingNav = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    items,
    position = 'bottom',
    variant = 'default',
    hideOnScroll,
    style
  } = element.props;

  const [visible, setVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);

  React.useEffect(() => {
    if (!hideOnScroll) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hideOnScroll, lastScrollY]);

  const navItems = items as NavItem[];

  const positions = {
    top: 'fixed top-4 left-1/2 -translate-x-1/2',
    bottom: 'fixed bottom-4 left-1/2 -translate-x-1/2',
    'top-left': 'fixed top-4 left-4',
    'top-right': 'fixed top-4 right-4',
    'bottom-left': 'fixed bottom-4 left-4',
    'bottom-right': 'fixed bottom-4 right-4',
  };

  const variants = {
    default: 'bg-background/95 backdrop-blur-md border shadow-lg',
    glass: 'bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl',
    solid: 'bg-background border shadow-md',
    pill: 'bg-background/95 backdrop-blur-md border shadow-lg',
    dark: 'bg-zinc-900 border-zinc-800 text-white shadow-xl',
  };

  return (
    <nav
      className={cn(
        'flex items-center gap-2 px-4 py-2 rounded-full z-50 transition-all duration-300',
        positions[position as keyof typeof positions] || positions.bottom,
        variants[variant as keyof typeof variants] || variants.default,
        !visible && 'translate-y-20 opacity-0 pointer-events-none'
      )}
      style={style as React.CSSProperties}
    >
      {navItems?.map((item, i) => (
        <a
          key={i}
          href={item.href || '#'}
          onClick={(e) => {
            if (item.action) {
              e.preventDefault();
              onAction?.({ name: item.action });
            }
          }}
          className={cn(
            'flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
            item.active
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          )}
        >
          {item.icon && <span className="w-4 h-4">{item.icon}</span>}
          {item.label}
        </a>
      ))}
      {children}
    </nav>
  );
};
