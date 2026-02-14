/**
 * Microservice Rules
 * 
 * This module contains development rules and best practices for microservice applications.
 */

import { Rule, RuleCollection, Language } from "../../types/index.js";

/**
 * Get microservice rules by category
 */
export function getMicroserviceRules(
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
    system: "microservice",
    language: language as Language | undefined,
    rules: filteredRules,
  };
}

/**
 * Example rules for microservice development
 * These are placeholders - real rules should be added here
 */
const rules: Rule[] = [
  {
    id: "ms-arch-001",
    title: "API Gateway Pattern",
    description: "Use API Gateway as a single entry point for microservices",
    category: "architecture",
    system: "microservice",
    content: `
# API Gateway Pattern

Implement an API Gateway to provide a unified interface to your microservices.

## Benefits:
- Single entry point for clients
- Request routing and composition
- Authentication and authorization
- Rate limiting and caching

## Example (Node.js):
\`\`\`typescript
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

app.use('/users', createProxyMiddleware({ 
  target: 'http://user-service:3001',
  changeOrigin: true 
}));

app.use('/orders', createProxyMiddleware({ 
  target: 'http://order-service:3002',
  changeOrigin: true 
}));
\`\`\`
`,
    tags: ["architecture", "api-gateway", "pattern"],
  },
  {
    id: "ms-perf-001",
    title: "Service Communication Optimization",
    description: "Optimize inter-service communication patterns",
    category: "performance",
    system: "microservice",
    content: `
# Service Communication Optimization

Reduce latency and improve performance in microservice communication.

## Strategies:
- Use async communication where possible
- Implement circuit breakers
- Cache frequently accessed data
- Use gRPC for internal communication

## Example (Circuit Breaker):
\`\`\`typescript
import CircuitBreaker from 'opossum';

const options = {
  timeout: 3000,
  errorThresholdPercentage: 50,
  resetTimeout: 30000
};

const breaker = new CircuitBreaker(callExternalService, options);

breaker.fallback(() => ({ data: 'cached or default response' }));

async function callExternalService() {
  // Service call logic
}
\`\`\`
`,
    tags: ["performance", "communication", "circuit-breaker"],
  },
  {
    id: "ms-sec-001",
    title: "Service-to-Service Authentication",
    description: "Implement secure authentication between microservices",
    category: "security",
    system: "microservice",
    content: `
# Service-to-Service Authentication

Secure communication between microservices using mutual TLS or JWT.

## Best Practices:
- Use mTLS for service mesh
- Implement JWT with short expiry
- Rotate secrets regularly
- Use service accounts

## Example (JWT):
\`\`\`typescript
import jwt from 'jsonwebtoken';

// Generate token for service communication
const token = jwt.sign(
  { service: 'order-service', scope: 'user:read' },
  process.env.SERVICE_SECRET,
  { expiresIn: '5m' }
);

// Verify token in receiving service
const verified = jwt.verify(token, process.env.SERVICE_SECRET);
\`\`\`
`,
    tags: ["security", "authentication", "jwt"],
  },
  {
    id: "ms-test-001",
    title: "Contract Testing",
    description: "Implement contract testing between services",
    category: "testing",
    system: "microservice",
    codeType: "test",
    content: `
# Contract Testing for Microservices

Use contract testing to ensure service compatibility.

## Tools:
- Pact for consumer-driven contracts
- Spring Cloud Contract for JVM services

## Example (Pact):
\`\`\`typescript
import { Pact } from '@pact-foundation/pact';

describe('User Service Contract', () => {
  const provider = new Pact({
    consumer: 'OrderService',
    provider: 'UserService'
  });

  it('should get user by id', async () => {
    await provider.addInteraction({
      state: 'user exists',
      uponReceiving: 'a request for user',
      withRequest: {
        method: 'GET',
        path: '/users/1'
      },
      willRespondWith: {
        status: 200,
        body: { id: 1, name: 'John' }
      }
    });

    // Test implementation
  });
});
\`\`\`
`,
    tags: ["testing", "contract-testing", "pact"],
  },
];

export default rules;
