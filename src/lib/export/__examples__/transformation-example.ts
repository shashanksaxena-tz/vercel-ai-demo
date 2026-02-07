/**
 * Example: Data Extraction and Transformation
 *
 * This file demonstrates how to use the data extraction and transformation
 * utilities to convert hardcoded UITree data into production-ready components.
 */

import type { UITree } from '@json-render/core';
import {
  extractDataStructures,
  generateInterface,
  generateSampleData,
  transformToPropsBasedJSX,
  generateIntegrationReadme,
} from '../index';

// Example UITree with hardcoded CRM data
const crmTree: UITree = {
  root: 'container',
  elements: {
    container: {
      key: 'container',
      type: 'Container',
      props: { maxWidth: 'xl' },
      children: ['card1', 'card2'],
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
      props: { text: 'Alice Johnson', level: '3' },
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
      props: { text: 'Bob Smith', level: '3' },
    },
    text2: {
      key: 'text2',
      type: 'Text',
      props: { content: 'Engineering Manager at TechCorp' },
    },
  },
};

/**
 * Example 1: Extract Data Structures
 */
export function example1_ExtractData() {
  console.log('=== Example 1: Extract Data Structures ===\n');

  const structures = extractDataStructures(crmTree);

  console.log(`Found ${structures.length} data structure(s):`);
  for (const structure of structures) {
    console.log(`\n${structure.name}:`);
    console.log(`  - Prop name: ${structure.propName}`);
    console.log(`  - Is array: ${structure.isArray}`);
    console.log(`  - Fields: ${structure.fields.map(f => f.name).join(', ')}`);
    console.log(`  - Instances: ${structure.elementKeys.length}`);
  }

  return structures;
}

/**
 * Example 2: Generate TypeScript Interfaces
 */
export function example2_GenerateInterfaces() {
  console.log('\n=== Example 2: Generate TypeScript Interfaces ===\n');

  const structures = extractDataStructures(crmTree);

  for (const structure of structures) {
    const interfaceCode = generateInterface(structure);
    console.log(interfaceCode);
    console.log('');
  }

  return structures;
}

/**
 * Example 3: Generate Sample Data
 */
export function example3_GenerateSampleData() {
  console.log('\n=== Example 3: Generate Sample Data ===\n');

  const structures = extractDataStructures(crmTree);

  for (const structure of structures) {
    const sampleData = generateSampleData(structure);
    console.log(sampleData);
    console.log('');
  }

  return structures;
}

/**
 * Example 4: Transform JSX to Props-Based
 */
export function example4_TransformJSX() {
  console.log('\n=== Example 4: Transform JSX ===\n');

  const structures = extractDataStructures(crmTree);

  const result = transformToPropsBasedJSX(
    crmTree,
    structures,
    'shadcn',
    'CRMDashboard'
  );

  console.log('Props Interface:');
  console.log(result.propsInterface);
  console.log('\nData Interfaces:');
  console.log(result.dataInterfaces);
  console.log('\nTransformed JSX:');
  console.log(result.jsx);

  return result;
}

/**
 * Example 5: Generate Integration Guide
 */
export function example5_GenerateIntegrationGuide() {
  console.log('\n=== Example 5: Generate Integration Guide ===\n');

  const structures = extractDataStructures(crmTree);

  const readme = generateIntegrationReadme({
    componentName: 'CRMDashboard',
    framework: 'shadcn',
    structures,
    includeReactQuery: true,
    includeNextJS: true,
    includeFetch: true,
  });

  console.log(readme);

  return readme;
}

/**
 * Run all examples
 */
export function runAllExamples() {
  example1_ExtractData();
  example2_GenerateInterfaces();
  example3_GenerateSampleData();
  example4_TransformJSX();
  example5_GenerateIntegrationGuide();
}

// Uncomment to run examples
// runAllExamples();
