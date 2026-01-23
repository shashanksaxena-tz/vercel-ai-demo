'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Markdown = ({ element }: ComponentRenderProps) => {
  const {
    content,
    className: customClassName,
    style,
  } = element.props;

  // Simple markdown parser
  const parseMarkdown = (text: string): string => {
    if (!text) return '';

    let html = text;

    // Escape HTML
    html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // Headers
    html = html.replace(/^######\s+(.+)$/gm, '<h6 class="text-sm font-semibold mt-4 mb-2">$1</h6>');
    html = html.replace(/^#####\s+(.+)$/gm, '<h5 class="text-base font-semibold mt-4 mb-2">$1</h5>');
    html = html.replace(/^####\s+(.+)$/gm, '<h4 class="text-lg font-semibold mt-5 mb-2">$1</h4>');
    html = html.replace(/^###\s+(.+)$/gm, '<h3 class="text-xl font-semibold mt-6 mb-3">$1</h3>');
    html = html.replace(/^##\s+(.+)$/gm, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>');
    html = html.replace(/^#\s+(.+)$/gm, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>');

    // Bold and Italic
    html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    html = html.replace(/___(.+?)___/g, '<strong><em>$1</em></strong>');
    html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');
    html = html.replace(/_(.+?)_/g, '<em>$1</em>');

    // Strikethrough
    html = html.replace(/~~(.+?)~~/g, '<del class="text-muted-foreground">$1</del>');

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-muted font-mono text-sm">$1</code>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary underline hover:no-underline" target="_blank" rel="noopener noreferrer">$1</a>');

    // Images
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full rounded-lg my-4" />');

    // Blockquotes
    html = html.replace(/^>\s+(.+)$/gm, '<blockquote class="border-l-4 border-muted-foreground/30 pl-4 italic text-muted-foreground my-4">$1</blockquote>');

    // Horizontal rule
    html = html.replace(/^---$/gm, '<hr class="my-8 border-muted" />');
    html = html.replace(/^\*\*\*$/gm, '<hr class="my-8 border-muted" />');

    // Unordered lists
    html = html.replace(/^[\*\-]\s+(.+)$/gm, '<li class="ml-4">$1</li>');
    html = html.replace(/(<li class="ml-4">.*<\/li>\n?)+/g, '<ul class="list-disc list-inside my-4 space-y-1">$&</ul>');

    // Ordered lists
    html = html.replace(/^\d+\.\s+(.+)$/gm, '<li class="ml-4">$1</li>');

    // Code blocks
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
      return `<pre class="bg-muted rounded-lg p-4 overflow-auto my-4"><code class="font-mono text-sm">${code.trim()}</code></pre>`;
    });

    // Paragraphs
    html = html.replace(/^(?!<[a-z]|$)(.+)$/gm, '<p class="my-3">$1</p>');

    // Clean up empty paragraphs
    html = html.replace(/<p class="my-3"><\/p>/g, '');

    return html;
  };

  const htmlContent = parseMarkdown(content as string || '');

  return (
    <div
      className={cn('prose prose-slate dark:prose-invert max-w-none', customClassName as string)}
      style={style as React.CSSProperties}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};
