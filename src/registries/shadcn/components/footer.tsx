import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Footer = ({ element, children }: ComponentRenderProps) => {
  const {
    brand,
    logo,
    copyright,
    variant = 'default',
    columns,
    socialLinks,
    style
  } = element.props;

  const variantStyles = {
    default: 'bg-background border-t',
    dark: 'bg-zinc-900 text-white',
    muted: 'bg-muted',
  };

  const columnsArray = columns as Array<{ title: string; links: Array<{ label: string; href?: string }> }>;
  const socialLinksArray = socialLinks as Array<{ icon: string; href: string; label?: string }>;

  return (
    <footer
      className={cn(
        'w-full py-12 px-4',
        variantStyles[(variant as keyof typeof variantStyles) || 'default']
      )}
      style={style as React.CSSProperties}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              {logo ? <img src={logo as string} alt="Logo" className="h-8 w-auto" /> : null}
              {brand ? <span className="text-xl font-bold">{brand as string}</span> : null}
            </div>
            {children}
          </div>

          {/* Link Columns */}
          {columnsArray?.map((column, idx) => (
            <div key={idx}>
              <h4 className="font-semibold mb-4">{column.title as string}</h4>
              <ul className="space-y-2">
                {column.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href={link.href || '#'}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label as string}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          {copyright ? (
            <p className="text-sm text-muted-foreground">{copyright as string}</p>
          ) : null}
          {socialLinksArray ? (
            <div className="flex items-center gap-4">
              {socialLinksArray.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={social.label || social.icon}
                >
                  {social.icon as string}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  );
};
