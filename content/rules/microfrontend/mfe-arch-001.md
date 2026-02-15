---
id: mfe-arch-001
title: Module Federation Setup
description: Use Module Federation for runtime integration of microfrontends
category: architecture
system: microfrontend
language: typescript
codeType: source
tags:
  - webpack
  - module-federation
  - architecture
---

# Module Federation Setup

When building microfrontends, use Webpack Module Federation for runtime integration.

## Best Practices

- Define clear boundaries between microfrontends
- Use semantic versioning for shared dependencies
- Implement error boundaries for isolation
- Monitor bundle sizes

## Example Configuration

```typescript
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
```

## Benefits

- Runtime composition of independently deployed applications
- Technology independence across teams
- Optimized code sharing
- Reduced duplication

## Common Pitfalls

- Avoid tight coupling between microfrontends
- Don't share too much state
- Monitor performance impact of multiple bundles
- Ensure consistent versioning strategy
