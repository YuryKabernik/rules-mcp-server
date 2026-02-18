---
name: design-microfrontend
description: Help design a new microfrontend application
arguments:
  - name: app_name
    description: Name of the microfrontend application
    required: true
  - name: framework
    description: Frontend framework (React, Vue, Angular, etc.)
    required: false
---

Help me design a microfrontend application named "{{app_name}}" using {{framework|React}}.

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

For {{framework|React}}:
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
- Performance optimization strategies
