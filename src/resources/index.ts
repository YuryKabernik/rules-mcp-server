/**
 * Resources Registry
 * 
 * Central registry for all documentation resources.
 */

import { Resource } from "../types/index.js";

/**
 * All available resources
 */
const resources: Resource[] = [
  {
    uri: "rules://microfrontend/architecture",
    name: "Microfrontend Architecture Guide",
    description: "Comprehensive guide on microfrontend architecture patterns",
    mimeType: "text/markdown",
    content: `# Microfrontend Architecture Guide

## Introduction

Microfrontends extend the microservices concept to frontend development, allowing teams to work independently on different parts of a web application.

## Core Concepts

### 1. Independent Deployment
Each microfrontend can be deployed independently without affecting others.

### 2. Technology Agnostic
Different microfrontends can use different frameworks (React, Vue, Angular, etc.).

### 3. Isolated State
Each microfrontend manages its own state and avoids global state pollution.

## Implementation Patterns

### Module Federation (Webpack 5)
- Runtime integration
- Shared dependencies
- Dynamic remotes

### Web Components
- Framework agnostic
- Native browser support
- Shadow DOM encapsulation

### iFrame
- Complete isolation
- Legacy system integration
- Communication via postMessage

## Best Practices

1. **Define Clear Boundaries**: Each microfrontend should have a well-defined responsibility
2. **Shared Design System**: Use a common design system for consistency
3. **Communication Strategy**: Use events or state management for cross-app communication
4. **Error Boundaries**: Implement error boundaries to prevent cascade failures
5. **Performance Monitoring**: Monitor each microfrontend independently

## Common Pitfalls

- Over-fragmentation leading to too many microfrontends
- Shared state coupling between apps
- Inconsistent user experience
- Performance degradation from multiple bundles

## Resources

- [Micro Frontends](https://martinfowler.com/articles/micro-frontends.html)
- [Module Federation](https://webpack.js.org/concepts/module-federation/)
`,
  },
  {
    uri: "rules://microservice/architecture",
    name: "Microservice Architecture Guide",
    description: "Comprehensive guide on microservice architecture patterns",
    mimeType: "text/markdown",
    content: `# Microservice Architecture Guide

## Introduction

Microservices architecture structures an application as a collection of loosely coupled, independently deployable services.

## Core Principles

### 1. Single Responsibility
Each service should have one well-defined responsibility.

### 2. Decentralized Data Management
Each service manages its own database.

### 3. API-First Design
Services communicate through well-defined APIs.

## Key Patterns

### API Gateway
Single entry point for clients, handles routing, authentication, and rate limiting.

### Service Discovery
Dynamic service registration and lookup (Consul, Eureka, etcd).

### Circuit Breaker
Prevents cascade failures by failing fast when dependencies are unavailable.

### Saga Pattern
Manages distributed transactions across services.

### Event Sourcing
Store state changes as a sequence of events.

### CQRS
Separate read and write operations for scalability.

## Communication

### Synchronous
- REST APIs
- gRPC
- GraphQL

### Asynchronous
- Message queues (RabbitMQ, Kafka)
- Event streams
- Pub/Sub

## Best Practices

1. **Design for Failure**: Implement timeouts, retries, and circuit breakers
2. **Distributed Tracing**: Use tools like Jaeger or Zipkin
3. **Centralized Logging**: Aggregate logs from all services
4. **Service Mesh**: Consider Istio or Linkerd for complex deployments
5. **API Versioning**: Version your APIs to maintain backwards compatibility

## Challenges

- Distributed system complexity
- Data consistency across services
- Testing and debugging
- Deployment orchestration
- Network latency

## Tools & Technologies

- Container Orchestration: Kubernetes, Docker Swarm
- Service Mesh: Istio, Linkerd, Consul Connect
- API Gateway: Kong, Ambassador, AWS API Gateway
- Message Brokers: Apache Kafka, RabbitMQ, NATS
`,
  },
  {
    uri: "rules://best-practices/general",
    name: "General Best Practices",
    description: "General development best practices for distributed systems",
    mimeType: "text/markdown",
    content: `# General Best Practices for Distributed Systems

## Code Quality

### 1. Clean Code Principles
- Write self-documenting code
- Follow SOLID principles
- Keep functions small and focused
- Use meaningful names

### 2. Code Reviews
- Review all code before merging
- Use automated code analysis tools
- Check for security vulnerabilities
- Verify test coverage

## Testing Strategy

### Unit Tests
Test individual components in isolation.

### Integration Tests
Test interactions between components.

### End-to-End Tests
Test complete user workflows.

### Contract Tests
Test API contracts between services.

## Security

### 1. Authentication & Authorization
- Use industry-standard protocols (OAuth 2.0, OpenID Connect)
- Implement role-based access control (RBAC)
- Use JWT tokens with appropriate expiry

### 2. Data Protection
- Encrypt data in transit (TLS)
- Encrypt sensitive data at rest
- Never log sensitive information
- Implement data retention policies

### 3. API Security
- Input validation and sanitization
- Rate limiting
- CORS configuration
- API key management

## Performance

### 1. Caching Strategy
- Use CDN for static assets
- Implement Redis/Memcached for data caching
- Cache at multiple layers

### 2. Database Optimization
- Use indexes effectively
- Optimize queries
- Implement connection pooling
- Consider read replicas

### 3. Monitoring
- Application Performance Monitoring (APM)
- Real User Monitoring (RUM)
- Synthetic monitoring
- Log aggregation and analysis

## DevOps

### 1. CI/CD Pipeline
- Automated testing
- Automated deployment
- Rollback capabilities
- Environment parity

### 2. Infrastructure as Code
- Version control infrastructure
- Use tools like Terraform, CloudFormation
- Immutable infrastructure

### 3. Observability
- Metrics collection (Prometheus, Grafana)
- Distributed tracing
- Centralized logging
- Alerting and on-call rotation

## Documentation

- Keep README updated
- Document API endpoints (OpenAPI/Swagger)
- Maintain architecture decision records (ADRs)
- Create runbooks for operations
`,
  },
];

/**
 * Get all resources
 */
export function getAllResources(): Resource[] {
  return resources;
}

/**
 * Get resource by URI
 */
export function getResourceByUri(uri: string): Resource | undefined {
  return resources.find(r => r.uri === uri);
}
