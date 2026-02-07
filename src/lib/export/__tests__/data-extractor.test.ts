/**
 * Tests for data extraction functionality
 */

import { extractDataStructures, generateInterface, generateSampleData } from '../data-extractor';
import type { UITree } from '@json-render/core';

describe('Data Extractor', () => {
  it('should extract Person data structure from CRM cards', () => {
    const tree: UITree = {
      root: 'container',
      elements: {
        container: {
          key: 'container',
          type: 'Container',
          props: {},
          children: ['card1', 'card2', 'card3'],
        },
        card1: {
          key: 'card1',
          type: 'Card',
          props: {},
          children: ['avatar1', 'heading1', 'text1'],
        },
        avatar1: {
          key: 'avatar1',
          type: 'Avatar',
          props: { src: 'https://picsum.photos/seed/alice/40/40' },
        },
        heading1: {
          key: 'heading1',
          type: 'Heading',
          props: { text: 'Alice Johnson' },
        },
        text1: {
          key: 'text1',
          type: 'Text',
          props: { content: 'Head of Sales at InnovateCorp' },
        },
        card2: {
          key: 'card2',
          type: 'Card',
          props: {},
          children: ['avatar2', 'heading2', 'text2'],
        },
        avatar2: {
          key: 'avatar2',
          type: 'Avatar',
          props: { src: 'https://picsum.photos/seed/bob/40/40' },
        },
        heading2: {
          key: 'heading2',
          type: 'Heading',
          props: { text: 'Bob Smith' },
        },
        text2: {
          key: 'text2',
          type: 'Text',
          props: { content: 'Engineering Manager at TechCorp' },
        },
        card3: {
          key: 'card3',
          type: 'Card',
          props: {},
          children: ['avatar3', 'heading3', 'text3'],
        },
        avatar3: {
          key: 'avatar3',
          type: 'Avatar',
          props: { src: 'https://picsum.photos/seed/charlie/40/40' },
        },
        heading3: {
          key: 'heading3',
          type: 'Heading',
          props: { text: 'Charlie Brown' },
        },
        text3: {
          key: 'text3',
          type: 'Text',
          props: { content: 'Product Designer at DesignCo' },
        },
      },
    };

    const structures = extractDataStructures(tree);

    expect(structures).toHaveLength(1);
    expect(structures[0].name).toBe('Person');
    expect(structures[0].isArray).toBe(true);
    expect(structures[0].propName).toBe('people');
    expect(structures[0].fields).toContainEqual(
      expect.objectContaining({ name: 'id', type: 'string' })
    );
    expect(structures[0].fields).toContainEqual(
      expect.objectContaining({ name: 'name', type: 'string' })
    );
    expect(structures[0].fields).toContainEqual(
      expect.objectContaining({ name: 'role', type: 'string' })
    );
  });

  it('should generate TypeScript interface', () => {
    const structure = {
      name: 'Person',
      fields: [
        { name: 'id', type: 'string', optional: false, samples: [] },
        { name: 'name', type: 'string', optional: false, samples: [] },
        { name: 'email', type: 'string', optional: true, samples: [] },
      ],
      isArray: true,
      elementKeys: [],
      propName: 'people',
    };

    const code = generateInterface(structure);

    expect(code).toContain('interface Person {');
    expect(code).toContain('id: string;');
    expect(code).toContain('name: string;');
    expect(code).toContain('email?: string;');
  });

  it('should generate sample data', () => {
    const structure = {
      name: 'Person',
      fields: [
        { name: 'id', type: 'string', optional: false, samples: ['1', '2'] },
        { name: 'name', type: 'string', optional: false, samples: ['Alice', 'Bob'] },
      ],
      isArray: true,
      elementKeys: ['card1', 'card2'],
      propName: 'people',
    };

    const code = generateSampleData(structure);

    expect(code).toContain('const mockPerson: Person[] = [');
    expect(code).toContain("id: '1'");
    expect(code).toContain("name: 'Alice'");
  });

  it('should return empty array for tree without repeated patterns', () => {
    const tree: UITree = {
      root: 'container',
      elements: {
        container: {
          key: 'container',
          type: 'Container',
          props: {},
          children: ['heading'],
        },
        heading: {
          key: 'heading',
          type: 'Heading',
          props: { text: 'Welcome' },
        },
      },
    };

    const structures = extractDataStructures(tree);
    expect(structures).toHaveLength(0);
  });
});
