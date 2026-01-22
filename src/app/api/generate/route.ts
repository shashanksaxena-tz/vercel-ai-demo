import { generateObject } from 'ai';
import { model } from '@/lib/gemini';
import { z } from 'zod';

// Define the UI Element schema for AI to generate
const UIElementSchema: z.ZodType<any> = z.lazy(() => z.object({
    type: z.enum([
        'Button', 'Text', 'Badge', 'Avatar', 'Icon',
        'Card', 'Alert', 'Metric',
        'Input', 'Select', 'Checkbox', 'Switch',
        'Stack', 'Grid', 'Container',
        'Table', 'Chart', 'Tabs'
    ]),
    key: z.string(),
    props: z.record(z.string(), z.any()),
    children: z.array(z.lazy(() => UIElementSchema)).optional(),
}));

const OutputSchema = z.object({
    ui: UIElementSchema,
    summary: z.string().describe('A brief description of what was generated'),
});

export async function POST(req: Request) {
    try {
        const { prompt, currentRegistry } = await req.json();

        const { object } = await generateObject({
            model: model,
            schema: OutputSchema,
            system: `You are an expert UI designer and engineer specializing in creating dynamic user interfaces.

YOUR GOAL:
Generate a valid JSON UI tree based on the user's prompt. The UI should be beautiful, functional, and follow modern design principles.

CONSTRAINTS:
1. Use ONLY components defined in the schema: Button, Text, Badge, Avatar, Icon, Card, Alert, Metric, Input, Select, Checkbox, Switch, Stack, Grid, Container, Table, Chart, Tabs.
2. Every element MUST have a unique 'key' property for React rendering.
3. For layout, wrap components in 'Stack' (vertical/horizontal) or 'Grid' (columns).
4. For 'Metric' components, include label, value, trend (number), and trendDirection ('up' | 'down' | 'neutral').
5. For 'Table' components, ensure columns match the data structure (columns: [{header, accessorKey}], data: [{...}]).
6. For 'Chart' components, specify type ('bar' | 'line' | 'pie' | 'area'), data, categories, and index.

CURRENT DESIGN SYSTEM: ${currentRegistry || 'shadcn'}
${currentRegistry === 'antd' ? 'Ant Design prefers denser layouts with more data visibility.' : ''}
${currentRegistry === 'chakra' ? 'Chakra UI prefers spacious layouts with good breathing room.' : ''}
${currentRegistry === 'mui' ? 'Material UI follows Material Design principles with elevation and shadows.' : ''}
${currentRegistry === 'magicui' ? 'Magic UI prefers animated, gradient-rich, premium effects.' : ''}
${currentRegistry === 'aceternity' ? 'Aceternity UI prefers dark mode, 3D effects, and glowing elements.' : ''}

AVAILABLE BUTTON ACTIONS:
- 'export_report' - Export data as PDF
- 'refresh_data' - Refresh dashboard data
- 'navigate' - Navigate to another page
- 'submit_form' - Submit a form

BEST PRACTICES:
- Always start with a root 'Stack' or 'Container' element.
- Use 'Card' to group related content.
- Use 'Grid' with columns (2-4) for dashboard layouts.
- Add 'Metric' components for KPIs and statistics.
- Include 'Chart' for data visualization when appropriate.
- Use proper spacing (gap) in Stack and Grid.`,
            prompt: prompt,
        });

        return new Response(JSON.stringify(object), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error generating UI:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to generate UI' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
