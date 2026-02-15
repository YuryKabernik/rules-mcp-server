/**
 * Prompts Registry
 * 
 * Central registry for all prompt templates.
 */

import { PromptTemplate } from "../types/index.js";

/**
 * All available prompt templates
 */
const prompts: PromptTemplate[] = [
  {
    name: "design-microfrontend",
    description: "Help design a new microfrontend application",
    arguments: [
      {
        name: "app_name",
        description: "Name of the microfrontend application",
        required: true,
      },
      {
        name: "framework",
        description: "Frontend framework (React, Vue, Angular, etc.)",
        required: false,
      },
    ],
    template: (args: Record<string, string>) => {
      const appName = args.app_name || "my-app";
      const framework = args.framework || "React";

      return `Help me design a microfrontend application named "${appName}" using ${framework}.

Please provide:
1. Architecture overview
2. Key design decisions
3. Best practices to follow
4. Common pitfalls to avoid

## Context

The application should follow microfrontend architecture principles:
- Independent deployment capabilities
- Isolated runtime and build processes
- Framework-agnostic integration
- Shared design system for consistency

## Technical Considerations

For ${framework}:
- Component structure and organization
- State management approach
- Module Federation configuration (if applicable)
- Testing strategy
- Build and deployment pipeline

Please provide specific recommendations for:
- Project structure
- Development workflow
- Communication between microfrontends
- Error handling and boundaries
- Performance optimization strategies`;
    },
  },
  {
    name: "design-microservice",
    description: "Help design a new microservice",
    arguments: [
      {
        name: "service_name",
        description: "Name of the microservice",
        required: true,
      },
      {
        name: "technology",
        description: "Technology stack (Node.js, Java, Python, etc.)",
        required: false,
      },
    ],
    template: (args: Record<string, string>) => {
      const serviceName = args.service_name || "my-service";
      const technology = args.technology || "Node.js";

      return `Help me design a microservice named "${serviceName}" using ${technology}.

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

## Technical Stack: ${technology}

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

Based on ${technology}, suggest:
- Framework and libraries
- Development best practices
- Performance optimization
- Security hardening
- CI/CD pipeline setup`;
    },
  },
  {
    name: "review-architecture",
    description: "Review and provide feedback on application architecture",
    arguments: [
      {
        name: "architecture_type",
        description: "Type of architecture (microfrontend, microservice, monolith)",
        required: true,
      },
      {
        name: "description",
        description: "Description of the architecture to review",
        required: false,
      },
    ],
    template: (args: Record<string, string>) => {
      const architectureType = args.architecture_type || "microfrontend";
      const description = args.description || "";

      let contextSection = "";
      if (description) {
        contextSection = `\n## Current Architecture\n\n${description}\n`;
      }

      return `Review my ${architectureType} architecture and provide feedback.
${contextSection}
## Review Criteria

Please analyze the following aspects:

### 1. Architecture Patterns
- Are the chosen patterns appropriate for the use case?
- Is there proper separation of concerns?
- Are there any anti-patterns?

### 2. Scalability
- Can the system scale horizontally?
- Are there any bottlenecks?
- Is the data layer properly designed for scale?

### 3. Security
- Authentication and authorization mechanisms
- Data protection (encryption, sanitization)
- API security measures
- Compliance considerations

### 4. Performance
- Response time considerations
- Caching strategy
- Database optimization
- Network efficiency

### 5. Maintainability
- Code organization and structure
- Documentation quality
- Testing coverage
- Deployment complexity

### 6. Reliability
- Error handling and recovery
- Monitoring and alerting
- Backup and disaster recovery
- Service level objectives (SLOs)

### 7. Cost Efficiency
- Resource utilization
- Infrastructure costs
- Operational overhead

## Provide Recommendations

For each identified issue or improvement area:
1. Describe the current state
2. Explain the concern or opportunity
3. Suggest specific improvements
4. Estimate impact and effort

Please prioritize recommendations by:
- Critical (must fix)
- High (should fix soon)
- Medium (nice to have)
- Low (future consideration)`;
    },
  },
];

/**
 * Get all prompts
 */
export function getAllPrompts(): PromptTemplate[] {
  return prompts;
}

/**
 * Get prompt by name
 */
export function getPromptByName(name: string): PromptTemplate | undefined {
  return prompts.find(p => p.name === name);
}
