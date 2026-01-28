import { streamObject } from 'ai';
import { model } from '@/lib/gemini';
import { getOutputSchema } from '@/lib/catalog';

export const maxDuration = 60;

export async function POST(req: Request) {
    try {
        const { prompt, currentRegistry } = await req.json();

        const result = streamObject({
            model: model,
            schema: getOutputSchema(),
            system: `You are an expert UI designer. Generate a component tree structure for a UI using the ${currentRegistry || 'shadcn'} design system.

            Your goal is to create a functional, aesthetically pleasing UI based on the user's prompt.

            The output must match the provided schema exactly:
            - 'ui': The root UI element (can be a Container, Stack, etc. containing other elements).
            - 'summary': A brief description of what was generated.

            Available components:
            - Atoms: Button, Text, Badge, Avatar, Icon
            - Molecules: Card, Alert, Metric
            - Forms: Input, Select, Checkbox, Switch
            - Layouts: Stack, Grid, Container
            - Complex: Table, Chart, Tabs

            Guidelines:
            - Use 'Stack' (direction: column/row) and 'Grid' for layout.
            - Use 'Card' to group related content.
            - Ensure keys are unique.
            - Use consistent styling suitable for ${currentRegistry}.
            - For 'Chart', provide realistic dummy data.
            - For 'Table', provide realistic columns and data.
            `,
            prompt: prompt,
        });

        return result.toTextStreamResponse();
    } catch (error) {
        console.error('Error in generation:', error);
        return new Response(JSON.stringify({ error: 'Failed to generate UI' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
