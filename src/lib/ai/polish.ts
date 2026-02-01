/**
 * Polish AI Layer - Fills UI components with realistic content
 *
 * Takes a structural UITree and enhances it with:
 * - Realistic text content (no lorem ipsum)
 * - Appropriate images and icons
 * - Sample data for tables/charts
 * - Proper styling and spacing
 */

import type { UITree, UIElement } from '@json-render/core';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { getRelevantImageUrl } from './unsplash-helper';

// Rate limiting configuration
const RATE_LIMIT_CONFIG = {
  requestDelayMs: parseInt(process.env.GEMINI_REQUEST_DELAY_MS || '4000', 10),
  maxRetries: parseInt(process.env.GEMINI_MAX_RETRIES || '3', 10),
  retryDelayMs: parseInt(process.env.GEMINI_RETRY_DELAY_MS || '5000', 10),
};

// Track last request time for rate limiting
let lastRequestTime = 0;

/**
 * Sleep utility for rate limiting
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Rate-limited Gemini API call with retry logic
 */
async function callGeminiWithRateLimit(
  prompt: string,
  retryCount = 0
): Promise<string> {
  // Enforce delay between requests
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  if (timeSinceLastRequest < RATE_LIMIT_CONFIG.requestDelayMs) {
    const delayNeeded = RATE_LIMIT_CONFIG.requestDelayMs - timeSinceLastRequest;
    await sleep(delayNeeded);
  }

  try {
    const result = await generateText({
      model: google('gemini-2.5-flash'),
      prompt,
    });
    lastRequestTime = Date.now();
    return result.text;
  } catch (error: any) {
    // Check if it's a rate limit error
    const isRateLimitError =
      error?.message?.includes('429') ||
      error?.message?.includes('rate limit') ||
      error?.message?.includes('quota');

    if (isRateLimitError && retryCount < RATE_LIMIT_CONFIG.maxRetries) {
      console.warn(
        `Rate limit hit, retrying (${retryCount + 1}/${RATE_LIMIT_CONFIG.maxRetries})...`
      );
      await sleep(RATE_LIMIT_CONFIG.retryDelayMs);
      return callGeminiWithRateLimit(prompt, retryCount + 1);
    }

    // Re-throw if not a rate limit error or max retries exceeded
    throw error;
  }
}

export interface PolishOptions {
  theme?: string;
  industry?: string;
  tone?: 'professional' | 'casual' | 'playful' | 'corporate';
  includeImages?: boolean;
  includeIcons?: boolean;
  includeRealData?: boolean;
}

export interface PolishResult {
  tree: UITree;
  contentMap: Record<string, ContentSuggestions>;
  summary: string;
}

export interface ContentSuggestions {
  text?: string;
  imageUrl?: string;
  imageQuery?: string;
  iconName?: string;
  data?: unknown;
}

/**
 * Polish a UITree by filling it with realistic content
 */
export async function polishUITree(
  tree: UITree,
  context: string,
  options: PolishOptions = {}
): Promise<PolishResult> {
  const {
    theme = 'modern',
    industry = 'general',
    tone = 'professional',
    includeImages = true,
    includeIcons = true,
    includeRealData = true,
  } = options;

  // Analyze the tree structure
  const analysis = analyzeTreeStructure(tree);

  // Generate content suggestions using AI with rate limiting
  const prompt = buildPolishPrompt(analysis, context, {
    theme,
    industry,
    tone,
    includeImages,
    includeIcons,
    includeRealData,
  });

  const response = await callGeminiWithRateLimit(prompt);

  // Parse the AI response
  const contentMap = parseContentSuggestions(response, analysis);

  // Apply content to the tree (with real Unsplash images)
  const polishedTree = await applyContentToTree(tree, contentMap);

  return {
    tree: polishedTree,
    contentMap,
    summary: `Polished UI with ${Object.keys(contentMap).length} content updates`,
  };
}

/**
 * Analyze tree structure to understand what content is needed
 */
function analyzeTreeStructure(tree: UITree): TreeAnalysis {
  const elements = Object.values(tree.elements);
  const analysis: TreeAnalysis = {
    headings: [],
    texts: [],
    buttons: [],
    images: [],
    cards: [],
    tables: [],
    forms: [],
    metrics: [],
  };

  for (const element of elements) {
    switch (element.type) {
      case 'Heading':
        analysis.headings.push({
          key: element.key,
          level: element.props.level || 1,
          currentText: element.props.text as string | undefined,
        });
        break;
      case 'Text':
        analysis.texts.push({
          key: element.key,
          currentText: element.props.content as string | undefined,
        });
        break;
      case 'Button':
        analysis.buttons.push({
          key: element.key,
          currentLabel: element.props.label as string | undefined,
        });
        break;
      case 'Image':
        analysis.images.push({
          key: element.key,
          currentSrc: element.props.src as string | undefined,
        });
        break;
      case 'Card':
        analysis.cards.push({
          key: element.key,
          hasHeader: element.children?.some((k) => tree.elements[k]?.type === 'CardHeader'),
        });
        break;
      case 'Metric':
        analysis.metrics.push({
          key: element.key,
          currentLabel: element.props.label as string | undefined,
          currentValue: element.props.value as string | undefined,
        });
        break;
    }
  }

  return analysis;
}

interface TreeAnalysis {
  headings: Array<{ key: string; level: number; currentText?: string }>;
  texts: Array<{ key: string; currentText?: string }>;
  buttons: Array<{ key: string; currentLabel?: string }>;
  images: Array<{ key: string; currentSrc?: string }>;
  cards: Array<{ key: string; hasHeader: boolean }>;
  tables: Array<{ key: string }>;
  forms: Array<{ key: string }>;
  metrics: Array<{ key: string; currentLabel?: string; currentValue?: string }>;
}

/**
 * Build a prompt for the AI to generate content
 */
function buildPolishPrompt(
  analysis: TreeAnalysis,
  context: string,
  options: PolishOptions
): string {
  return `You are a UI content generator. Fill this UI structure with realistic, engaging content.

Context: ${context}
Theme: ${options.theme}
Industry: ${options.industry}
Tone: ${options.tone}

UI Structure:
- ${analysis.headings.length} headings
- ${analysis.texts.length} text blocks
- ${analysis.buttons.length} buttons
- ${analysis.images.length} images
- ${analysis.cards.length} cards
- ${analysis.metrics.length} metrics

IMPORTANT RULES:
1. Generate REAL, meaningful content - NO lorem ipsum
2. Content should be relevant to the context and industry
3. Use proper capitalization and grammar
4. Keep headings concise (2-8 words)
5. Keep button labels action-oriented (1-3 words)
6. Make metrics realistic with proper units

Generate content as JSON in this exact format:
{
  "headings": [
    { "key": "element-key", "text": "Heading text" }
  ],
  "texts": [
    { "key": "element-key", "text": "Paragraph content..." }
  ],
  "buttons": [
    { "key": "element-key", "label": "Button Label" }
  ],
  "images": [
    { "key": "element-key", "query": "search query for stock photo", "alt": "alt text" }
  ],
  "metrics": [
    { "key": "element-key", "label": "Metric Name", "value": "123", "unit": "%" }
  ]
}

Elements to fill:
${JSON.stringify(
  {
    headings: analysis.headings.map((h) => ({ key: h.key, level: h.level })),
    texts: analysis.texts.map((t) => ({ key: t.key })),
    buttons: analysis.buttons.map((b) => ({ key: b.key })),
    images: analysis.images.map((i) => ({ key: i.key })),
    metrics: analysis.metrics.map((m) => ({ key: m.key })),
  },
  null,
  2
)}

Return ONLY valid JSON, nothing else.`;
}

/**
 * Parse AI response into content suggestions
 */
function parseContentSuggestions(
  response: string,
  analysis: TreeAnalysis
): Record<string, ContentSuggestions> {
  try {
    // Extract JSON from response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    const parsed = JSON.parse(jsonMatch[0]);
    const contentMap: Record<string, ContentSuggestions> = {};

    // Process headings
    if (parsed.headings) {
      for (const item of parsed.headings) {
        contentMap[item.key] = { text: item.text };
      }
    }

    // Process texts
    if (parsed.texts) {
      for (const item of parsed.texts) {
        contentMap[item.key] = { text: item.text };
      }
    }

    // Process buttons
    if (parsed.buttons) {
      for (const item of parsed.buttons) {
        contentMap[item.key] = { text: item.label };
      }
    }

    // Process images
    if (parsed.images) {
      for (const item of parsed.images) {
        contentMap[item.key] = {
          imageQuery: item.query,
          text: item.alt,
        };
      }
    }

    // Process metrics
    if (parsed.metrics) {
      for (const item of parsed.metrics) {
        contentMap[item.key] = {
          text: item.label,
          data: { value: item.value, unit: item.unit || '' },
        };
      }
    }

    return contentMap;
  } catch (error) {
    console.error('Failed to parse content suggestions:', error);
    return {};
  }
}

/**
 * Apply content suggestions to the tree
 */
async function applyContentToTree(
  tree: UITree,
  contentMap: Record<string, ContentSuggestions>
): Promise<UITree> {
  // ALWAYS create fresh object references to ensure React detects changes
  const newTree: UITree = {
    root: tree.root,
    elements: {},
  };

  // First, deep clone all elements
  for (const [key, element] of Object.entries(tree.elements)) {
    newTree.elements[key] = {
      ...element,
      props: { ...element.props },
      children: element.children ? [...element.children] : undefined,
    };
  }

  // Then apply content changes
  for (const [key, content] of Object.entries(contentMap)) {
    const element = newTree.elements[key];
    if (!element) continue;

    const newElement: UIElement = {
      ...element,
      props: { ...element.props },
      children: element.children ? [...element.children] : undefined,
    };

    // Apply content based on element type
    switch (element.type) {
      case 'Heading':
        if (content.text) newElement.props.text = content.text;
        break;

      case 'Text':
        if (content.text) newElement.props.content = content.text;
        break;

      case 'Button':
        if (content.text) newElement.props.label = content.text;
        break;

      case 'Image':
        if (content.imageQuery) {
          // Use Unsplash API to get contextually relevant images
          // Falls back to Lorem Picsum if Unsplash is not configured
          newElement.props.src = await getRelevantImageUrl(content.imageQuery, 800, 600);
          newElement.props.alt = content.text || content.imageQuery;
        }
        break;

      case 'Metric':
        if (content.text) newElement.props.label = content.text;
        if (content.data) {
          const metricData = content.data as { value: string; unit: string };
          newElement.props.value = metricData.value + (metricData.unit || '');
        }
        break;
    }

    newTree.elements[key] = newElement;
  }

  return newTree;
}

/**
 * Quick polish - just fill empty text fields with placeholders
 */
export function quickPolish(tree: UITree): UITree {
  console.log('[Quick Polish] Starting with tree:', {
    elementCount: Object.keys(tree.elements).length,
    elementTypes: Object.values(tree.elements).map(e => e.type)
  });

  // ALWAYS create fresh object references to ensure React detects changes
  const newTree: UITree = {
    root: tree.root,
    elements: {},
  };

  let changesCount = 0;

  for (const [key, element] of Object.entries(tree.elements)) {
    // Deep clone element with fresh object references
    const newElement: UIElement = {
      ...element,
      props: { ...element.props },
      children: element.children ? [...element.children] : undefined,
    };
    let changed = false;

    switch (element.type) {
      case 'Heading':
        if (!newElement.props.text || newElement.props.text === 'Heading') {
          const level = newElement.props.level || 1;
          newElement.props.text = level === 1 ? 'Main Heading' : level === 2 ? 'Section Title' : 'Subsection';
          changed = true;
        }
        break;

      case 'Text':
        if (!newElement.props.content || newElement.props.content === 'Text') {
          newElement.props.content = 'This is sample text content that demonstrates how the component will look with actual content.';
          changed = true;
        }
        break;

      case 'Button':
        if (!newElement.props.label || newElement.props.label === 'Button') {
          newElement.props.label = 'Click Here';
          changed = true;
        }
        break;

      case 'Metric':
        if (!newElement.props.label || newElement.props.label === 'Metric') {
          newElement.props.label = 'Total Users';
          changed = true;
        }
        if (!newElement.props.value) {
          newElement.props.value = '1,234';
          changed = true;
        }
        if (!newElement.props.change) {
          newElement.props.change = '+12.5%';
          newElement.props.changeType = 'positive';
          changed = true;
        }
        break;

      case 'Image':
        if (!newElement.props.src) {
          // Use Lorem Picsum - reliable placeholder service that works without API keys
          newElement.props.src = 'https://picsum.photos/800/600';
          newElement.props.alt = 'Placeholder image';
          changed = true;
        }
        break;

      case 'Input':
        if (!newElement.props.placeholder) {
          newElement.props.placeholder = 'Enter value...';
          changed = true;
        }
        break;

      case 'Textarea':
        if (!newElement.props.placeholder) {
          newElement.props.placeholder = 'Enter your text here...';
          changed = true;
        }
        break;

      case 'Select':
        if (!newElement.props.placeholder) {
          newElement.props.placeholder = 'Select an option';
          changed = true;
        }
        break;

      case 'Badge':
        if (!newElement.props.text || newElement.props.text === 'Badge') {
          newElement.props.text = 'New';
          changed = true;
        }
        break;

      case 'Alert':
        if (!newElement.props.title) {
          newElement.props.title = 'Important Notice';
          newElement.props.description = 'This is an important message that you should read.';
          changed = true;
        }
        break;
    }

    if (changed) {
      changesCount++;
      console.log(`[Quick Polish] Updated ${element.type}:`, newElement.props);
    }

    newTree.elements[key] = newElement;
  }

  console.log(`[Quick Polish] Complete: ${changesCount} elements updated`);

  return newTree;
}
