'use client';

import { useState, useMemo } from 'react';
import type { UITree } from '@json-render/core';

interface TemplateSection {
  key: string;
  name: string;
  description: string;
  aiPromptHint: string;
}

interface PageTemplate {
  id: string;
  name: string;
  description: string;
  category: 'landing' | 'dashboard' | 'admin' | 'ecommerce' | 'blog' | 'portfolio';
  thumbnail: string;
  tags: string[];
  sections: TemplateSection[];
  tree: UITree;
}

export interface TemplateGalleryProps {
  templates: PageTemplate[];
  onSelect: (template: PageTemplate) => void;
  onCustomize: (template: PageTemplate, prompt: string) => void;
  className?: string;
}

type CategoryFilter = 'all' | PageTemplate['category'];

const CATEGORIES: { value: CategoryFilter; label: string; color: string }[] = [
  { value: 'all', label: 'All', color: 'gray' },
  { value: 'landing', label: 'Landing', color: 'blue' },
  { value: 'dashboard', label: 'Dashboard', color: 'green' },
  { value: 'admin', label: 'Admin', color: 'purple' },
  { value: 'ecommerce', label: 'E-commerce', color: 'orange' },
  { value: 'blog', label: 'Blog', color: 'pink' },
  { value: 'portfolio', label: 'Portfolio', color: 'cyan' },
];

const getCategoryColorClasses = (color: string, isActive: boolean) => {
  if (isActive) {
    const activeColors: Record<string, string> = {
      gray: 'bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300',
      blue: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300',
      green: 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300',
      purple: 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300',
      orange: 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300',
      pink: 'bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300',
      cyan: 'bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300',
    };
    return activeColors[color] || activeColors.gray;
  }
  return 'bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/30';
};

const countElements = (tree: UITree): number => {
  if (!tree) return 0;
  let count = 1;
  if (tree.children && Array.isArray(tree.children)) {
    count += tree.children.reduce((acc, child) => acc + countElements(child), 0);
  }
  return count;
};

export function TemplateGallery({ templates, onSelect, onCustomize, className = '' }: TemplateGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [customizingId, setCustomizingId] = useState<string | null>(null);
  const [customizePrompt, setCustomizePrompt] = useState('');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filteredTemplates = useMemo(() => {
    if (activeCategory === 'all') return templates;
    return templates.filter(t => t.category === activeCategory);
  }, [templates, activeCategory]);

  const handleCustomizeSubmit = (template: PageTemplate) => {
    if (customizePrompt.trim()) {
      onCustomize(template, customizePrompt);
      setCustomizingId(null);
      setCustomizePrompt('');
    }
  };

  const handleCustomizeCancel = () => {
    setCustomizingId(null);
    setCustomizePrompt('');
  };

  return (
    <div className={className}>
      {/* Category Filter Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category.value;
          return (
            <button
              key={category.value}
              onClick={() => setActiveCategory(category.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${getCategoryColorClasses(
                category.color,
                isActive
              )}`}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      {/* Template Grid */}
      {filteredTemplates.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-gray-400 dark:text-gray-600 text-lg mb-2">No templates in this category</div>
          <p className="text-gray-500 dark:text-gray-500 text-sm">Try selecting a different category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map((template) => {
            const elementCount = countElements(template.tree);
            const isCustomizing = customizingId === template.id;
            const isHovered = hoveredId === template.id;

            return (
              <div
                key={template.id}
                className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:shadow-lg transition-shadow bg-white dark:bg-gray-900 relative"
                onMouseEnter={() => setHoveredId(template.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Thumbnail */}
                <div className="h-32 flex items-center justify-center text-5xl bg-gray-50 dark:bg-gray-800/50 rounded-lg mb-3">
                  {template.thumbnail}
                </div>

                {/* Template Info */}
                <div className="mb-3">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-1">
                    {template.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                    {template.description}
                  </p>

                  {/* Section Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {template.sections.slice(0, 4).map((section) => (
                      <span
                        key={section.key}
                        className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full"
                      >
                        {section.name}
                      </span>
                    ))}
                    {template.sections.length > 4 && (
                      <span className="text-xs text-gray-500 dark:text-gray-500 px-2 py-0.5">
                        +{template.sections.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Element Count */}
                  <div className="text-xs text-gray-500 dark:text-gray-500">
                    {elementCount} {elementCount === 1 ? 'element' : 'elements'}
                  </div>
                </div>

                {/* Hover Preview Tooltip */}
                {isHovered && template.sections.length > 0 && (
                  <div className="absolute left-0 right-0 -bottom-2 translate-y-full z-10 mx-4 p-3 bg-gray-900 dark:bg-gray-800 text-white rounded-lg shadow-xl text-xs">
                    <div className="font-semibold mb-1.5">Template Sections:</div>
                    <ul className="space-y-1">
                      {template.sections.map((section) => (
                        <li key={section.key} className="flex items-start gap-2">
                          <span className="text-gray-400">•</span>
                          <div>
                            <div className="font-medium">{section.name}</div>
                            <div className="text-gray-400 text-xs">{section.description}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Buttons */}
                {!isCustomizing ? (
                  <div className="space-y-2">
                    <button
                      onClick={() => onSelect(template)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 text-sm font-medium transition-colors"
                    >
                      Use Template
                    </button>
                    <button
                      onClick={() => setCustomizingId(template.id)}
                      className="w-full border border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg py-2 text-sm font-medium transition-colors"
                    >
                      Customize with AI
                    </button>
                  </div>
                ) : (
                  /* AI Customization Input */
                  <div className="space-y-2">
                    <textarea
                      value={customizePrompt}
                      onChange={(e) => setCustomizePrompt(e.target.value)}
                      placeholder="Make it for a fitness app with dark theme"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                      rows={3}
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleCustomizeSubmit(template)}
                        disabled={!customizePrompt.trim()}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg py-2 text-sm font-medium transition-colors"
                      >
                        Submit
                      </button>
                      <button
                        onClick={handleCustomizeCancel}
                        className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg py-2 text-sm font-medium transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
