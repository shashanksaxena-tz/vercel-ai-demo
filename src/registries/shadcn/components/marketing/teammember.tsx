'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Twitter, Linkedin, Github, Mail } from 'lucide-react';

export const TeamMember = ({ element, onAction }: ComponentRenderProps) => {
  const {
    name,
    role,
    bio,
    avatar,
    twitter,
    linkedin,
    github,
    email,
    variant = 'default',
    className,
    style
  } = element.props;

  const variantStyles = {
    default: '',
    card: 'bg-background border rounded-xl p-6 hover:shadow-lg transition-shadow',
    filled: 'bg-muted rounded-xl p-6',
    minimal: 'text-center',
  };

  const socialLinks = [
    twitter && { icon: Twitter, url: twitter, label: 'Twitter' },
    linkedin && { icon: Linkedin, url: linkedin, label: 'LinkedIn' },
    github && { icon: Github, url: github, label: 'GitHub' },
    email && { icon: Mail, url: `mailto:${email}`, label: 'Email' },
  ].filter(Boolean);

  const handleSocialClick = (url: string, label: string) => {
    onAction?.({ name: 'socialClick', payload: { url, label } } as never);
  };

  return (
    <div
      className={cn(
        variantStyles[variant as keyof typeof variantStyles] || variantStyles.default,
        variant === 'minimal' && 'text-center',
        className
      )}
      style={style as React.CSSProperties}
    >
      {avatar && (
        <img
          src={avatar as string}
          alt={name as string}
          className={cn(
            'rounded-full object-cover mb-4',
            variant === 'minimal' ? 'h-32 w-32 mx-auto' : 'h-24 w-24'
          )}
        />
      )}
      <div>
        {name && (
          <h3 className="text-lg font-semibold text-foreground">{name as string}</h3>
        )}
        {role && (
          <p className="text-sm text-primary font-medium">{role as string}</p>
        )}
        {bio && (
          <p className="text-muted-foreground mt-3 text-sm">{bio as string}</p>
        )}
        {socialLinks.length > 0 && (
          <div className={cn('flex gap-3 mt-4', variant === 'minimal' && 'justify-center')}>
            {socialLinks.map((link, idx) => {
              if (!link) return null;
              const Icon = link.icon;
              return (
                <a
                  key={idx}
                  href={link.url as string}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSocialClick(link.url as string, link.label);
                  }}
                  className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
                  aria-label={link.label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
