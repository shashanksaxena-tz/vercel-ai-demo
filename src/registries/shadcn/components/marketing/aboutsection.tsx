'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const AboutSection = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    subtitle,
    description,
    mission,
    missionTitle = 'Our Mission',
    vision,
    visionTitle = 'Our Vision',
    values,
    valuesTitle = 'Our Values',
    background = 'default',
    layout = 'default',
    className,
    style
  } = element.props;

  const backgroundStyles = {
    default: 'bg-background',
    muted: 'bg-muted',
    gradient: 'bg-gradient-to-b from-background to-muted',
  };

  const valuesArray = values as Array<{
    title: string;
    description: string;
    icon?: string;
  }>;

  return (
    <section
      className={cn(
        'w-full py-16 md:py-24',
        backgroundStyles[background as keyof typeof backgroundStyles] || backgroundStyles.default,
        className
      )}
      style={style as React.CSSProperties}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          {subtitle && (
            <span className="text-sm md:text-base font-medium text-primary uppercase tracking-wider">
              {subtitle as string}
            </span>
          )}
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-2 text-foreground">
              {title as string}
            </h2>
          )}
          {description && (
            <p className="text-lg text-muted-foreground mt-4">
              {description as string}
            </p>
          )}
        </div>

        {/* Mission & Vision */}
        {(mission || vision) && (
          <div className={cn(
            'grid gap-8 mb-16',
            mission && vision ? 'md:grid-cols-2' : ''
          )}>
            {mission && (
              <div className="bg-primary/5 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-foreground mb-4">{missionTitle as string}</h3>
                <p className="text-muted-foreground">{mission as string}</p>
              </div>
            )}
            {vision && (
              <div className="bg-secondary/5 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-foreground mb-4">{visionTitle as string}</h3>
                <p className="text-muted-foreground">{vision as string}</p>
              </div>
            )}
          </div>
        )}

        {/* Values */}
        {valuesArray && valuesArray.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-foreground text-center mb-10">
              {valuesTitle as string}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {valuesArray.map((value, idx) => (
                <div key={idx} className="text-center">
                  {value.icon && (
                    <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">{value.icon}</span>
                    </div>
                  )}
                  <h4 className="text-lg font-semibold text-foreground mb-2">{value.title}</h4>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {children}
      </div>
    </section>
  );
};
