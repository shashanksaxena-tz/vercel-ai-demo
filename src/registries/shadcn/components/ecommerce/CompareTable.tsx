'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Check, X, Star, ShoppingCart } from 'lucide-react';

export const CompareTable = ({ element, onAction }: ComponentRenderProps) => {
  const {
    products,
    attributes,
    showAddToCart = true,
    showRating = true,
    highlightDifferences = true,
    style,
  } = element.props;

  const productList = products as Array<{
    id: string;
    name: string;
    image: string;
    price: number;
    originalPrice?: number;
    rating?: number;
    attributes: Record<string, any>;
  }> | undefined;

  const attributeList = attributes as Array<{
    key: string;
    label: string;
    type?: 'text' | 'boolean' | 'rating' | 'price';
  }> | undefined;

  const handleAddToCart = (productId: string) => {
    if (onAction) {
      onAction({ name: 'addToCart', payload: { productId, quantity: 1 } } as never);
    }
  };

  const handleRemove = (productId: string) => {
    if (onAction) {
      onAction({ name: 'removeFromCompare', payload: { itemId: productId } } as never);
    }
  };

  if (!productList || productList.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No products to compare
      </div>
    );
  }

  const renderValue = (value: any, type?: string) => {
    if (value === undefined || value === null) {
      return <span className="text-muted-foreground">-</span>;
    }

    switch (type) {
      case 'boolean':
        return value ? (
          <Check className="h-5 w-5 text-green-500 mx-auto" />
        ) : (
          <X className="h-5 w-5 text-destructive mx-auto" />
        );
      case 'rating':
        return (
          <div className="flex items-center justify-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{Number(value).toFixed(1)}</span>
          </div>
        );
      case 'price':
        return <span className="font-semibold">${Number(value).toFixed(2)}</span>;
      default:
        return <span>{String(value)}</span>;
    }
  };

  const hasVariation = (attrKey: string) => {
    if (!highlightDifferences || !productList || productList.length < 2) return false;
    const values = productList.map((p) => p.attributes[attrKey]);
    return new Set(values.map(String)).size > 1;
  };

  return (
    <div className="overflow-x-auto" style={style as React.CSSProperties}>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-4 text-left border-b bg-muted/50 w-40"></th>
            {productList.map((product) => (
              <th key={product.id} className="p-4 border-b bg-muted/50 min-w-[200px]">
                <div className="space-y-3">
                  <button
                    onClick={() => handleRemove(product.id)}
                    className="text-xs text-muted-foreground hover:text-destructive float-right"
                  >
                    Remove
                  </button>
                  <div className="w-32 h-32 mx-auto rounded-lg overflow-hidden bg-muted">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="font-medium text-sm">{product.name}</h3>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lg font-bold">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  {showRating && product.rating !== undefined && (
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{product.rating.toFixed(1)}</span>
                    </div>
                  )}
                  {showAddToCart && (
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      className="w-full flex items-center justify-center gap-2 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </button>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {attributeList?.map((attr) => (
            <tr
              key={attr.key}
              className={cn(
                'border-b',
                hasVariation(attr.key) && 'bg-yellow-50 dark:bg-yellow-950/20'
              )}
            >
              <td className="p-4 font-medium text-sm">{attr.label}</td>
              {productList.map((product) => (
                <td key={product.id} className="p-4 text-center text-sm">
                  {renderValue(product.attributes[attr.key], attr.type)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
