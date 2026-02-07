/**
 * Animation Performance Integration Example
 *
 * Shows how to integrate performance scoring into your application workflow.
 * This example demonstrates real-world usage patterns.
 */

import { useEffect, useState } from 'react';
import {
  searchMagicUI,
  searchAceternityUI,
  scoreAnimationPerformance,
  getPerformanceTier,
  formatPerformanceSummary,
  analyzeAnimationDependencies,
  estimateBundleImpact,
  type ComponentMetadata,
  type PerformanceScore,
} from '@/lib/mcp';

// ============================================================================
// Example 1: Performance Dashboard Component
// ============================================================================

export function PerformanceDashboard({ components }: { components: ComponentMetadata[] }) {
  const [score, setScore] = useState<PerformanceScore | null>(null);
  const [bundleImpact, setBundleImpact] = useState<number>(0);
  const [dependencies, setDependencies] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Calculate performance metrics
    const performanceScore = scoreAnimationPerformance(components);
    const { estimatedKB } = estimateBundleImpact(components);
    const { libraries } = analyzeAnimationDependencies(components);

    setScore(performanceScore);
    setBundleImpact(estimatedKB);
    setDependencies(libraries);
  }, [components]);

  if (!score) return null;

  const tier = getPerformanceTier(score.score);
  const tierColor = {
    excellent: 'text-green-600',
    good: 'text-blue-600',
    fair: 'text-yellow-600',
    poor: 'text-red-600',
  }[tier];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Animation Performance</h2>

      {/* Score Display */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">Performance Score</span>
          <span className={`text-3xl font-bold ${tierColor}`}>
            {score.score}/10
          </span>
        </div>
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${
                tier === 'excellent'
                  ? 'bg-green-600'
                  : tier === 'good'
                  ? 'bg-blue-600'
                  : tier === 'fair'
                  ? 'bg-yellow-600'
                  : 'bg-red-600'
              }`}
              style={{ width: `${(score.score / 10) * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-1 capitalize">{tier}</p>
        </div>
      </div>

      {/* Breakdown */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Complexity Breakdown</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Simple:</span>
            <span className="font-medium">{score.breakdown.simple}</span>
          </div>
          <div className="flex justify-between">
            <span>Medium:</span>
            <span className="font-medium">{score.breakdown.medium}</span>
          </div>
          <div className="flex justify-between">
            <span>Complex:</span>
            <span className="font-medium">{score.breakdown.complex}</span>
          </div>
          <div className="flex justify-between border-t pt-2 font-semibold">
            <span>Total:</span>
            <span>{score.totalAnimations}</span>
          </div>
        </div>
      </div>

      {/* Bundle Impact */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Bundle Impact</h3>
        <p className="text-2xl font-bold text-gray-800">{bundleImpact} KB</p>
        <div className="mt-2 text-sm text-gray-600">
          <p>Animation libraries: {dependencies.size}</p>
          <ul className="list-disc list-inside mt-1">
            {Array.from(dependencies).map((lib) => (
              <li key={lib}>{lib}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Warning */}
      {score.warning && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
          <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Warning</h3>
          <p className="text-yellow-700">{score.warning}</p>
        </div>
      )}

      {/* Recommendations */}
      {score.recommendations && score.recommendations.length > 0 && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded">
          <h3 className="font-semibold text-blue-800 mb-2">
            💡 Recommendations
          </h3>
          <ul className="list-disc list-inside space-y-1 text-blue-700">
            {score.recommendations.map((rec, i) => (
              <li key={i} className="text-sm">
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Example 2: Smart Component Selector
// ============================================================================

interface SmartComponentSelectorProps {
  maxScore?: number;
  maxBundleKB?: number;
  onComponentsSelected?: (components: ComponentMetadata[]) => void;
}

export function SmartComponentSelector({
  maxScore = 5,
  maxBundleKB = 60,
  onComponentsSelected,
}: SmartComponentSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [availableComponents, setAvailableComponents] = useState<
    ComponentMetadata[]
  >([]);
  const [selectedComponents, setSelectedComponents] = useState<
    ComponentMetadata[]
  >([]);
  const [performanceScore, setPerformanceScore] = useState<PerformanceScore | null>(
    null
  );

  // Search components
  const handleSearch = async () => {
    const magicResults = await searchMagicUI(searchQuery);
    const aceternityResults = await searchAceternityUI(searchQuery);
    setAvailableComponents([...magicResults, ...aceternityResults]);
  };

  // Add component with budget check
  const addComponent = (component: ComponentMetadata) => {
    const testComponents = [...selectedComponents, component];
    const score = scoreAnimationPerformance(testComponents);
    const { estimatedKB } = estimateBundleImpact(testComponents);

    // Check if within budget
    if (score.score <= maxScore && estimatedKB <= maxBundleKB) {
      setSelectedComponents(testComponents);
      setPerformanceScore(score);
      onComponentsSelected?.(testComponents);
    } else {
      alert(
        `Adding this component would exceed performance budget!\nScore: ${score.score}/${maxScore}\nBundle: ${estimatedKB}KB/${maxBundleKB}KB`
      );
    }
  };

  const removeComponent = (index: number) => {
    const updated = selectedComponents.filter((_, i) => i !== index);
    setSelectedComponents(updated);
    setPerformanceScore(scoreAnimationPerformance(updated));
    onComponentsSelected?.(updated);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Smart Component Selector</h2>

      {/* Budget Display */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">Performance Budget</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Max Score</p>
            <p className="text-lg font-bold">{maxScore}/10</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Max Bundle</p>
            <p className="text-lg font-bold">{maxBundleKB} KB</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search animated components..."
            className="flex-1 px-4 py-2 border rounded-lg"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </div>

      {/* Available Components */}
      {availableComponents.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Available Components</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableComponents.map((component) => (
              <div
                key={component.id}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <h4 className="font-semibold">{component.displayName}</h4>
                <p className="text-sm text-gray-600 mb-2">
                  {component.description}
                </p>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      component.animations?.complexity === 'simple'
                        ? 'bg-green-100 text-green-700'
                        : component.animations?.complexity === 'medium'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {component.animations?.complexity}
                  </span>
                  <button
                    onClick={() => addComponent(component)}
                    className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selected Components */}
      {selectedComponents.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Selected Components</h3>
          <div className="space-y-2">
            {selectedComponents.map((component, index) => (
              <div
                key={`${component.id}-${index}`}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span className="font-medium">{component.displayName}</span>
                <button
                  onClick={() => removeComponent(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Performance Score */}
      {performanceScore && (
        <PerformanceDashboard components={selectedComponents} />
      )}
    </div>
  );
}

// ============================================================================
// Example 3: Build-Time Performance Check
// ============================================================================

export async function performancePreBuildCheck() {
  console.log('🔍 Running animation performance check...\n');

  // Discover all animated components being used
  const magicComponents = await searchMagicUI('');
  const aceternityComponents = await searchAceternityUI('');
  const allComponents = [...magicComponents, ...aceternityComponents];

  // Filter to only animated components
  const animatedComponents = allComponents.filter((c) => c.animations);

  // Score performance
  const score = scoreAnimationPerformance(animatedComponents);
  const { estimatedKB, breakdown } = estimateBundleImpact(animatedComponents);
  const { libraries, suggestions } = analyzeAnimationDependencies(
    animatedComponents
  );

  // Display results
  console.log(formatPerformanceSummary(score));
  console.log('\n📦 Bundle Analysis:');
  console.log(`Total: ${estimatedKB} KB`);
  Object.entries(breakdown).forEach(([lib, kb]) => {
    console.log(`  ${lib}: ${kb} KB`);
  });

  console.log('\n📚 Libraries:');
  libraries.forEach((lib) => console.log(`  - ${lib}`));

  if (suggestions.length > 0) {
    console.log('\n💡 Optimization Suggestions:');
    suggestions.forEach((s) => console.log(`  - ${s}`));
  }

  // Fail build if over budget
  const MAX_SCORE = 7;
  const MAX_BUNDLE_KB = 100;

  if (score.score > MAX_SCORE) {
    console.error(
      `\n❌ Performance score ${score.score} exceeds budget of ${MAX_SCORE}`
    );
    process.exit(1);
  }

  if (estimatedKB > MAX_BUNDLE_KB) {
    console.error(
      `\n❌ Bundle size ${estimatedKB}KB exceeds budget of ${MAX_BUNDLE_KB}KB`
    );
    process.exit(1);
  }

  console.log('\n✅ Performance check passed!');
}

// ============================================================================
// Example 4: Development Warning Component
// ============================================================================

export function AnimationPerformanceWarning({
  components,
}: {
  components: ComponentMetadata[];
}) {
  const [dismissed, setDismissed] = useState(false);
  const score = scoreAnimationPerformance(components);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') return null;

  // Only show for poor performance
  if (score.score <= 6 || dismissed) return null;

  return (
    <div className="fixed bottom-4 right-4 max-w-md p-4 bg-yellow-50 border-2 border-yellow-400 rounded-lg shadow-lg z-50">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-bold text-yellow-800">⚠️ Performance Warning</h3>
        <button
          onClick={() => setDismissed(true)}
          className="text-yellow-600 hover:text-yellow-800"
        >
          ✕
        </button>
      </div>

      <p className="text-sm text-yellow-700 mb-2">{score.warning}</p>

      <div className="text-xs text-yellow-600">
        <p>
          Score: {score.score}/10 ({score.complexity})
        </p>
        <p>Animations: {score.totalAnimations}</p>
      </div>

      {score.recommendations && score.recommendations.length > 0 && (
        <details className="mt-2">
          <summary className="text-sm font-semibold text-yellow-800 cursor-pointer">
            View Recommendations
          </summary>
          <ul className="mt-1 text-xs text-yellow-700 list-disc list-inside">
            {score.recommendations.slice(0, 3).map((rec, i) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}

// ============================================================================
// Example 5: Custom Hook for Performance Monitoring
// ============================================================================

export function useAnimationPerformance(components: ComponentMetadata[]) {
  const [metrics, setMetrics] = useState<{
    score: PerformanceScore;
    bundleKB: number;
    libraries: Set<string>;
    tier: ReturnType<typeof getPerformanceTier>;
  } | null>(null);

  useEffect(() => {
    const score = scoreAnimationPerformance(components);
    const { estimatedKB } = estimateBundleImpact(components);
    const { libraries } = analyzeAnimationDependencies(components);
    const tier = getPerformanceTier(score.score);

    setMetrics({
      score,
      bundleKB: estimatedKB,
      libraries,
      tier,
    });

    // Log warning in development
    if (process.env.NODE_ENV === 'development' && score.warning) {
      console.warn('Animation Performance Warning:', score.warning);
    }
  }, [components]);

  return metrics;
}

// Usage example:
// const metrics = useAnimationPerformance(selectedComponents);
// if (metrics?.tier === 'poor') {
//   // Show warning or disable complex animations
// }
