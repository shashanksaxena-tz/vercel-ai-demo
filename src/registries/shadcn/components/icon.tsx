import React from 'react';
import * as LucideIcons from 'lucide-react';

type IconProps = {
  name: string;
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
};

export const Icon = ({ name, size = 24, color, className, style }: IconProps) => {
  const normalizeName = (str: string) => {
    if (!str) return 'HelpCircle';
    // Convert kebab-case or snake_case to PascalCase
    // e.g. "arrow-right" -> "ArrowRight", "user_check" -> "UserCheck"
    return str
      .split(/[-_]/)
      .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()) // Ensure lower part is correct? specific casing might be needed but this is safe default
      .join('');
  };

  // Also handle if name is already PascalCase like "ArrowRight"
  const getIcon = (str: string) => {
      const pascal = normalizeName(str);
      if ((LucideIcons as any)[pascal]) return (LucideIcons as any)[pascal];
      if ((LucideIcons as any)[str]) return (LucideIcons as any)[str];

      // Try to be smart about case sensitivity if direct match failed
      const keys = Object.keys(LucideIcons);
      const match = keys.find(k => k.toLowerCase() === str.toLowerCase().replace(/[-_]/g, ''));
      if (match) return (LucideIcons as any)[match];

      return LucideIcons.HelpCircle;
  };

  const IconComponent = getIcon(name);

  return <IconComponent size={size} color={color} className={className} style={style} />;
};
