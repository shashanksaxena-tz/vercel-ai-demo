import { catalog } from '../src/lib/catalog';

console.log('--- Testing Output Schema ---');
try {
  const outputSchema = catalog.getOutputSchema();

  const mockData = {
    ui: {
      type: 'Stack',
      key: 'root',
      props: { direction: 'column' },
      children: [
        { type: 'Button', key: 'btn1', props: { label: 'Click Me' } },
        {
            type: 'Card',
            key: 'card1',
            props: { title: 'Test Card' },
            children: [
                { type: 'Text', key: 'txt1', props: { children: 'Hello World' } }
            ]
        }
      ]
    },
    summary: 'A test UI with nested components'
  };

  const result = outputSchema.parse(mockData);
  console.log('Schema validation passed successfully.');
} catch (error) {
  console.error('Schema validation failed:', error);
  process.exit(1);
}
