---
id: mfe-perf-001
title: Lazy Loading Microfrontends
description: Implement lazy loading to improve initial load time
category: performance
system: microfrontend
language: typescript
codeType: source
tags:
  - performance
  - lazy-loading
  - optimization
---

# Lazy Loading Microfrontends

Defer loading of microfrontends until they are needed to improve initial page load performance.

## Benefits

- Reduced initial bundle size
- Faster time to interactive
- Better resource utilization
- Improved user experience

## Implementation

```typescript
const MicroApp = React.lazy(() => import('microapp/Component'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <MicroApp />
    </Suspense>
  );
}
```

## Advanced Techniques

### Route-based Code Splitting

```typescript
const routes = [
  {
    path: '/dashboard',
    component: React.lazy(() => import('./Dashboard'))
  },
  {
    path: '/settings',
    component: React.lazy(() => import('./Settings'))
  }
];
```

### Prefetching

```typescript
// Prefetch on hover or user interaction
const prefetchMicroApp = () => {
  import('microapp/Component');
};

<button onMouseEnter={prefetchMicroApp}>
  Load Dashboard
</button>
```

## Performance Tips

- Use loading indicators for better UX
- Implement retry logic for failed loads
- Monitor loading times with analytics
- Consider preloading critical microfrontends
