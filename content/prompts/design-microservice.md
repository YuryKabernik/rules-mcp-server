---
name: design-microservice
description: Help design a new microservice
arguments:
  - name: service_name
    description: Name of the microservice
    required: true
  - name: technology
    description: Technology stack (Node.js, Java, Python, etc.)
    required: false
---

Help me design a microservice named "{{service_name}}" using {{technology|Node.js}}.

Please provide:
1. Service architecture
2. API design
3. Data management strategy
4. Integration patterns
5. Best practices

## Context

The service should follow microservice architecture principles:
- Single responsibility
- Independent deployment
- Decentralized data management
- API-first design
- Resilience and fault tolerance

## Technical Stack: {{technology|Node.js}}

Please address:
- Project structure and organization
- API design (REST/gRPC/GraphQL)
- Database selection and schema design
- Authentication and authorization
- Inter-service communication
- Error handling and logging
- Testing strategy (unit, integration, contract)
- Deployment and orchestration
- Monitoring and observability
- Scalability considerations

## Specific Recommendations

Based on {{technology|Node.js}}, suggest:
- Framework and libraries
- Development best practices
- Performance optimization
- Security hardening
- CI/CD pipeline setup
