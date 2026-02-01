import { NextRequest, NextResponse } from 'next/server';
import type { UITree } from '@json-render/core';
import { polishUITree, quickPolish, type PolishOptions } from '@/lib/ai/polish';

export const runtime = 'nodejs';
export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tree, context, options, quick = false } = body as {
      tree: UITree;
      context?: string;
      options?: PolishOptions;
      quick?: boolean;
    };

    console.log('[Polish API] Request received:', {
      quick,
      elementCount: tree ? Object.keys(tree.elements || {}).length : 0,
      hasTree: !!tree,
      hasRoot: !!tree?.root,
    });

    if (!tree || !tree.root || !tree.elements) {
      console.error('[Polish API] Invalid tree structure:', tree);
      return NextResponse.json(
        { error: 'Invalid UITree structure' },
        { status: 400 }
      );
    }

    let result: UITree;

    if (quick) {
      // Quick polish - instant placeholders
      console.log('[Polish API] Starting quick polish...');
      result = quickPolish(tree);

      console.log('[Polish API] Quick polish complete, returning result');
      return NextResponse.json({
        tree: result,
        mode: 'quick',
        message: 'Applied quick polish with placeholders',
      });
    } else {
      // AI-powered polish - realistic content
      const polishResult = await polishUITree(
        tree,
        context || 'General purpose UI',
        options || {}
      );

      return NextResponse.json({
        tree: polishResult.tree,
        contentMap: polishResult.contentMap,
        mode: 'ai',
        message: polishResult.summary,
      });
    }
  } catch (error) {
    console.error('Polish API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to polish UI',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
