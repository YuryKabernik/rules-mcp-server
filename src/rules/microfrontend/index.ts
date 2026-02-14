/**
 * Microfrontend Rules
 * 
 * This module contains development rules and best practices for microfrontend applications.
 */

import { Rule, RuleCollection } from "../../types/index.js";

/**
 * Get microfrontend rules by category
 */
export function getMicrofrontendRules(
  category: string = "all",
  language?: string,
  codeType?: string
): RuleCollection {
  // Filter rules based on parameters
  let filteredRules = rules;

  if (category !== "all") {
    filteredRules = filteredRules.filter(rule => rule.category === category);
  }

  if (language) {
    filteredRules = filteredRules.filter(
      rule => !rule.language || rule.language === language
    );
  }

  if (codeType) {
    filteredRules = filteredRules.filter(
      rule => !rule.codeType || rule.codeType === codeType
    );
  }

  return {
    system: "microfrontend",
    language: language as any,
    rules: filteredRules,
  };
}

/**
 * Example rules for microfrontend development
 * These are placeholders - real rules should be added here
 */
const rules: Rule[] = [
  {
    id: "mfe-arch-001",
    title: "Module Federation Setup",
    description: "Use Module Federation for runtime integration of microfrontends",
    category: "architecture",
    system: "microfrontend",
    language: "typescript",
    codeType: "source",
    content: `
# Module Federation Setup

When building microfrontends, use Webpack Module Federation for runtime integration.

## Best Practices:
- Define clear boundaries between microfrontends
- Use semantic versioning for shared dependencies
- Implement error boundaries for isolation
- Monitor bundle sizes

## Example Configuration:
\`\`\`typescript
// webpack.config.js
new ModuleFederationPlugin({
  name: 'app1',
  filename: 'remoteEntry.js',
  exposes: {
    './Component': './src/Component'
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true }
  }
})
\`\`\`
`,
    tags: ["webpack", "module-federation", "architecture"],
  },
  {
    id: "mfe-perf-001",
    title: "Lazy Loading Microfrontends",
    description: "Implement lazy loading to improve initial load time",
    category: "performance",
    system: "microfrontend",
    language: "typescript",
    codeType: "source",
    content: `
# Lazy Loading Microfrontends

Defer loading of microfrontends until they are needed.

## Benefits:
- Reduced initial bundle size
- Faster time to interactive
- Better resource utilization

## Implementation:
\`\`\`typescript
const MicroApp = React.lazy(() => import('microapp/Component'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <MicroApp />
    </Suspense>
  );
}
\`\`\`
`,
    tags: ["performance", "lazy-loading"],
  },
  {
    id: "mfe-test-001",
    title: "Integration Testing Microfrontends",
    description: "Test microfrontends integration points",
    category: "testing",
    system: "microfrontend",
    codeType: "test",
    content: `
# Integration Testing for Microfrontends

Test the integration between different microfrontends.

## Key Areas:
- Contract testing between apps
- Event communication testing
- Shared state management

## Example:
\`\`\`typescript
describe('Microfrontend Integration', () => {
  it('should communicate via custom events', async () => {
    const event = new CustomEvent('app:event', { detail: { data: 'test' } });
    window.dispatchEvent(event);
    
    await waitFor(() => {
      expect(screen.getByText('test')).toBeInTheDocument();
    });
  });
});
\`\`\`
`,
    tags: ["testing", "integration"],
  },
];

export default rules;
