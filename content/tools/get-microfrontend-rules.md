---
name: get-microfrontend-rules
description: Get development rules and best practices for microfrontend applications
system: microfrontend
inputSchema:
  type: object
  properties:
    category:
      type: string
      description: Category of rules
      enum:
        - architecture
        - performance
        - security
        - testing
        - all
    language:
      type: string
      description: Programming language
      enum:
        - typescript
        - javascript
        - python
        - java
        - go
        - rust
    codeType:
      type: string
      description: Type of code
      enum:
        - source
        - test
  required: []
---

# Get Microfrontend Rules

This tool retrieves development rules and best practices specifically designed for microfrontend applications.

## Usage

Use this tool when you need guidance on:
- Architecting microfrontend applications
- Performance optimization strategies
- Security best practices
- Testing approaches for distributed frontend systems

## Parameters

- **category**: Filter by rule category (architecture, performance, security, testing, or all)
- **language**: Filter by programming language
- **codeType**: Filter by code type (source or test code)

All parameters are optional. If no parameters are provided, all microfrontend rules will be returned.
