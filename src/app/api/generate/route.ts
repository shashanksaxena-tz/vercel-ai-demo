import { streamObject } from 'ai';
import { model } from '@/lib/gemini';
import { catalog } from '@/lib/catalog';

export async function POST(req: Request) {
  try {
    const { prompt, currentRegistry } = await req.json();

    const result = streamObject({
      model: model,
      schema: catalog.getOutputSchema(),
      system: `
        You are an expert UI designer and engineer.

        YOUR GOAL:
        Generate a valid JSON UI tree based on the user's prompt.

        CONSTRAINTS:
        1. Use ONLY components defined in the schema.
        2. For 'Metric' components, verify the valuePath.
        3. For 'Table' components, ensure columns match the data structure.
        4. Current design system: ${currentRegistry || 'shadcn'}.
           ${currentRegistry === 'antd' ? 'Prefer denser layouts.' : 'Prefer spacious layouts.'}

        AVAILABLE ACTIONS:
        - export_report
        - refresh_data
        - navigate

        Always prioritize a root 'Stack' or 'Grid' container.

        IMPORTANT:
        - For components like Button, Text, Badge, providing 'children' in 'props' is sufficient for text content.
        - For Container components like Stack, Grid, Card, you MUST use the 'children' ARRAY property to nest other components.
        - Do not put 'children' array inside 'props' for containers.
      `,
      prompt: prompt,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Error in API route:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
