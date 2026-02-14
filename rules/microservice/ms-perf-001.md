---
id: ms-perf-001
title: Service Communication Optimization
description: Optimize inter-service communication patterns
category: performance
system: microservice
tags:
  - performance
  - communication
  - circuit-breaker
---

# Service Communication Optimization

Reduce latency and improve performance in microservice communication.

## Strategies

- Use async communication where possible
- Implement circuit breakers
- Cache frequently accessed data
- Use gRPC for internal communication
- Implement connection pooling

## Example (Circuit Breaker)

```typescript
import CircuitBreaker from 'opossum';

const options = {
  timeout: 3000, // 3 seconds
  errorThresholdPercentage: 50,
  resetTimeout: 30000 // 30 seconds
};

const breaker = new CircuitBreaker(callExternalService, options);

// Fallback behavior
breaker.fallback(() => ({ 
  data: 'cached or default response' 
}));

// Monitor circuit breaker state
breaker.on('open', () => {
  console.log('Circuit breaker opened');
});

async function callExternalService(params) {
  const response = await fetch(`http://service/api`, {
    method: 'POST',
    body: JSON.stringify(params)
  });
  return response.json();
}

// Use the circuit breaker
try {
  const result = await breaker.fire({ id: 123 });
  console.log(result);
} catch (error) {
  console.error('Service call failed', error);
}
```

## Caching Strategies

### Redis Caching

```typescript
import Redis from 'ioredis';

const redis = new Redis();

async function getCachedData(key: string) {
  const cached = await redis.get(key);
  if (cached) {
    return JSON.parse(cached);
  }
  
  const fresh = await fetchFromService(key);
  await redis.setex(key, 300, JSON.stringify(fresh)); // 5 min TTL
  return fresh;
}
```

## Connection Pooling

```typescript
import { Pool } from 'pg';

const pool = new Pool({
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Reuse connections
const client = await pool.connect();
try {
  const result = await client.query('SELECT * FROM users');
  return result.rows;
} finally {
  client.release();
}
```

## Best Practices

- Monitor service communication latency
- Implement timeout patterns
- Use bulkhead pattern to isolate failures
- Consider event-driven architecture for async operations
