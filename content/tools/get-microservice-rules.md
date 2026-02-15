---
name: get-microservice-rules
description: Get development rules and best practices for microservice applications
system: microservice
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

# Get Microservice Rules

This tool retrieves development rules and best practices specifically designed for microservice applications.

## Usage

Use this tool when you need guidance on:
- Designing microservice architectures
- Performance optimization for distributed systems
- Security best practices for microservices
- Testing strategies for service-oriented systems

## Parameters

- **category**: Filter by rule category (architecture, performance, security, testing, or all)
- **language**: Filter by programming language
- **codeType**: Filter by code type (source or test code)

All parameters are optional. If no parameters are provided, all microservice rules will be returned.
