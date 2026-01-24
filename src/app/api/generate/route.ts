import { streamObject } from 'ai';
import { model } from '@/lib/gemini';
import { catalog } from '@/lib/catalog';

export async function POST(req: Request) {
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
    `,
        prompt: prompt,
    });

    return result.toTextStreamResponse();
}
