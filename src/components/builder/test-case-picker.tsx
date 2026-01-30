'use client';

/**
 * Test Case Picker - Browse and select test cases
 */

import * as React from 'react';
import { testCases, getAllCategories, getTestCasesByCategory, type TestCase } from '@/lib/tests';
import { cn } from '@/lib/utils';

interface TestCasePickerProps {
  onSelect: (testCase: TestCase) => void;
  selectedId?: string;
  className?: string;
}

export function TestCasePicker({ onSelect, selectedId, className }: TestCasePickerProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');

  const categories = getAllCategories();

  const filteredCases = React.useMemo(() => {
    let cases = selectedCategory
      ? getTestCasesByCategory(selectedCategory)
      : testCases;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      cases = cases.filter(tc =>
        tc.name.toLowerCase().includes(q) ||
        tc.description.toLowerCase().includes(q) ||
        tc.tags.some(t => t.includes(q))
      );
    }

    return cases;
  }, [selectedCategory, searchQuery]);

  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* Search */}
      <div className="p-3 border-b">
        <input
          type="search"
          placeholder="Search test cases..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Categories */}
      <div className="p-3 border-b">
        <div className="flex flex-wrap gap-1">
          <button
            onClick={() => setSelectedCategory(null)}
            className={cn(
              'px-2 py-1 text-xs font-medium rounded-full transition-colors',
              !selectedCategory
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                'px-2 py-1 text-xs font-medium rounded-full transition-colors capitalize',
                selectedCategory === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
            >
              {cat.replace(/-/g, ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Test Case List */}
      <div className="flex-1 overflow-auto p-2">
        <div className="space-y-1">
          {filteredCases.map((tc) => (
            <button
              key={tc.id}
              onClick={() => onSelect(tc)}
              className={cn(
                'w-full text-left p-3 rounded-lg transition-colors',
                selectedId === tc.id
                  ? 'bg-primary/10 border border-primary'
                  : 'hover:bg-muted border border-transparent'
              )}
            >
              <div className="font-medium text-sm">{tc.name}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{tc.description}</div>
              <div className="flex flex-wrap gap-1 mt-2">
                {tc.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-1.5 py-0.5 text-[10px] bg-muted rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>

        {filteredCases.length === 0 && (
          <div className="text-center py-8 text-sm text-muted-foreground">
            No test cases found
          </div>
        )}
      </div>

      {/* Count */}
      <div className="p-3 border-t text-xs text-muted-foreground text-center">
        {filteredCases.length} of {testCases.length} test cases
      </div>
    </div>
  );
}

export default TestCasePicker;
