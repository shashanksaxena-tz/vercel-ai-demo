'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp, Tag, Check } from 'lucide-react';

export const PromoCode = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    codes,
    appliedCode,
    expandable = true,
    defaultExpanded = false,
    title = 'Have a promo code?',
    style,
  } = element.props;

  const [isExpanded, setIsExpanded] = useState(Boolean(defaultExpanded) || Boolean(appliedCode));
  const [inputValue, setInputValue] = useState('');

  const codeList = codes as Array<{
    code: string;
    discount: number;
    discountType: 'percentage' | 'fixed';
    description?: string;
  }> | undefined;

  const handleApply = (code?: string) => {
    const codeToApply = code || inputValue.trim();
    if (codeToApply && onAction) {
      onAction({ name: 'applyPromoCode', payload: { code: codeToApply } } as never);
      if (!code) setInputValue('');
    }
  };

  const handleRemove = () => {
    if (onAction) {
      onAction({ name: 'removePromoCode' });
    }
  };

  return (
    <div className="border rounded-lg" style={style as React.CSSProperties}>
      {expandable ? (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-4 text-left"
        >
          <span className="flex items-center gap-2 font-medium">
            <Tag className="h-4 w-4" />
            {title as string}
          </span>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
      ) : (
        <div className="p-4">
          <span className="flex items-center gap-2 font-medium">
            <Tag className="h-4 w-4" />
            {title as string}
          </span>
        </div>
      )}

      {(isExpanded || !expandable) && (
        <div className="px-4 pb-4 space-y-4">
          {appliedCode ? (
            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/30 rounded-md">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                <span className="font-mono font-medium">{appliedCode as string}</span>
                <span className="text-sm text-green-600">applied</span>
              </div>
              <button
                onClick={handleRemove}
                className="text-sm text-muted-foreground hover:text-destructive"
              >
                Remove
              </button>
            </div>
          ) : (
            <>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value.toUpperCase())}
                  onKeyDown={(e) => e.key === 'Enter' && handleApply()}
                  placeholder="Enter code"
                  className="flex-1 px-3 py-2 border rounded-md bg-background font-mono uppercase text-sm"
                />
                <button
                  onClick={() => handleApply()}
                  disabled={!inputValue.trim()}
                  className="px-4 py-2 border rounded-md hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                >
                  Apply
                </button>
              </div>

              {codeList && codeList.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">Available codes:</p>
                  {codeList.map((promoCode) => (
                    <button
                      key={promoCode.code}
                      onClick={() => handleApply(promoCode.code)}
                      className="w-full flex items-center justify-between p-2 text-left border border-dashed rounded-md hover:border-primary hover:bg-primary/5 transition-colors"
                    >
                      <div>
                        <span className="font-mono text-sm font-medium">{promoCode.code}</span>
                        {promoCode.description && (
                          <p className="text-xs text-muted-foreground">{promoCode.description}</p>
                        )}
                      </div>
                      <span className="text-sm font-semibold text-primary">
                        {promoCode.discountType === 'percentage'
                          ? `${promoCode.discount}% OFF`
                          : `$${promoCode.discount} OFF`}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
          {children}
        </div>
      )}
    </div>
  );
};
