---
name: review-architecture
description: Review and provide feedback on application architecture
arguments:
  - name: architecture_type
    description: Type of architecture (microfrontend, microservice, monolith)
    required: true
  - name: description
    description: Description of the architecture to review
    required: false
---

Review my {{architecture_type}} architecture and provide feedback.
{{#if description}}

## Current Architecture

{{description}}
{{/if}}

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
- Low (future consideration)
