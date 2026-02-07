/**
 * Export utilities for Generative UI Builder
 *
 * This module provides functionality to export UITree structures
 * to various code formats including React, Next.js, JSON, and HTML.
 */

// Legacy exports (for backwards compatibility)
export {
  exportToReact,
  exportToJSON,
  exportToHTML,
  type ExportFramework,
  type ExportOptions,
} from './react-exporter';

// New code generation system
export {
  generateCode,
  generateReactCode,
  generateNextJSCode,
  getInstallationInstructions,
  getFileExtension,
  getSuggestedFilename,
  generatePackageJsonDependencies,
  getAnimationDependenciesFromTree,
  hasAnimatedComponents,
  type ExportTarget,
  type CodeGenerationOptions,
} from './code-generator';

// Templates
export {
  getImportTemplate,
  getComponentTemplate,
  getStandaloneReactTemplate,
  getFrameworkSetupNotes,
  getUsageExample,
  FRAMEWORK_WRAPPERS,
  type ReactTemplateOptions,
} from './templates/react-template';

export {
  generateMetadataExport,
  generateDynamicMetadata,
  getNextJSPageTemplate,
  getCompleteNextJSPageTemplate,
  getLayoutTemplate,
  getLoadingTemplate,
  getErrorTemplate,
  getNotFoundTemplate,
  type NextJSTemplateOptions,
} from './templates/nextjs-template';

// API Templates
export {
  generateUseQueryTemplate,
  generateUseMutationTemplate,
  generateApiClientTemplate,
  generateServerActionsTemplate,
  generateApiTemplates,
  getSimpleFetchHookTemplate,
  type ApiTemplateOptions,
  type QueryDataType,
} from './templates/api-templates';

// Bundle Generator
export {
  generateBundle,
  generateBundleWithMetadata,
  generateMinimalBundle,
  generateCompleteBundle,
  mergeBundles,
  prepareForZip,
  type BundleOptions,
  type BundleFile,
  type BundleResult,
} from './bundle-generator';

// README Generator
export {
  generateReadme,
  generateMinimalReadme,
  generateComprehensiveReadme,
  type ReadmeOptions,
} from './readme-generator';

// Data Extraction
export {
  extractDataStructures,
  generateInterface,
  generateSampleData,
  hasExtractableData,
  getDataSummary,
  type DataStructure,
  type DataField,
} from './data-extractor';

// JSX Transformation
export {
  transformToPropsBasedJSX,
  type TransformResult,
} from './jsx-transformer';

// Integration README Generator
export {
  generateIntegrationReadme,
  generateMinimalIntegrationGuide,
  type IntegrationReadmeOptions,
} from './integration-readme-generator';
