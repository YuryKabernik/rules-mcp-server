---
id: ms-arch-001
title: API Gateway Pattern
description: Use API Gateway as a single entry point for microservices
category: architecture
system: microservice
tags:
  - architecture
  - api-gateway
  - pattern
---

# API Gateway Pattern

Implement an API Gateway to provide a unified interface to your microservices.

## Benefits

- Single entry point for clients
- Request routing and composition
- Authentication and authorization
- Rate limiting and caching
- Protocol translation

## Example (Node.js)

```typescript
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

// Authentication middleware
app.use(authMiddleware);

// Service routing
app.use('/users', createProxyMiddleware({ 
  target: 'http://user-service:3001',
  changeOrigin: true 
}));

app.use('/orders', createProxyMiddleware({ 
  target: 'http://order-service:3002',
  changeOrigin: true 
}));

app.use('/products', createProxyMiddleware({
  target: 'http://product-service:3003',
  changeOrigin: true
}));

app.listen(3000);
```

## Key Responsibilities

1. **Request Routing**: Direct requests to appropriate microservices
2. **Aggregation**: Combine multiple service calls into one response
3. **Security**: Centralized authentication and authorization
4. **Rate Limiting**: Protect backend services from overload
5. **Caching**: Reduce load on backend services

## Patterns

### Backend for Frontend (BFF)

Create specialized gateways for different client types:

```typescript
// Mobile BFF - lightweight responses
app.use('/mobile/api', mobileGateway);

// Web BFF - richer responses
app.use('/web/api', webGateway);
```

## Considerations

- Gateway becomes a single point of failure - implement redundancy
- Can become a performance bottleneck - use caching and async patterns
- Avoid business logic in the gateway
- Monitor gateway performance closely
