---
id: mfe-test-001
title: Integration Testing Microfrontends
description: Test microfrontends integration points
category: testing
system: microfrontend
codeType: test
tags:
  - testing
  - integration
  - quality
---

# Integration Testing for Microfrontends

Test the integration between different microfrontends to ensure they work correctly together.

## Key Areas

- Contract testing between apps
- Event communication testing
- Shared state management
- Cross-app navigation

## Example Test

```typescript
describe('Microfrontend Integration', () => {
  it('should communicate via custom events', async () => {
    const event = new CustomEvent('app:event', { 
      detail: { data: 'test' } 
    });
    window.dispatchEvent(event);
    
    await waitFor(() => {
      expect(screen.getByText('test')).toBeInTheDocument();
    });
  });

  it('should handle microfrontend mount/unmount', () => {
    const { unmount } = render(<MicroFrontend />);
    
    expect(document.querySelector('[data-mfe]')).toBeInTheDocument();
    
    unmount();
    
    expect(document.querySelector('[data-mfe]')).not.toBeInTheDocument();
  });
});
```

## Testing Strategies

### Contract Testing

Use tools like Pact to ensure API contracts between microfrontends.

```typescript
const provider = new Pact({
  consumer: 'MicroFrontendA',
  provider: 'MicroFrontendB'
});
```

### End-to-End Testing

Test complete user flows across multiple microfrontends.

```typescript
test('complete checkout flow', async () => {
  await page.goto('/products');
  await page.click('[data-product="123"]');
  await page.click('[data-add-to-cart]');
  await page.goto('/checkout');
  await page.fill('[data-email]', 'test@example.com');
  await page.click('[data-submit]');
  
  expect(await page.textContent('[data-confirmation]'))
    .toContain('Order confirmed');
});
```

## Best Practices

- Test in isolation first, then integration
- Mock external dependencies
- Use stable test selectors
- Implement visual regression testing
- Test error boundaries and fallback states
