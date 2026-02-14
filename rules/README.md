# Rules Directory

This directory contains development rules and best practices for microfrontend and microservice applications. Rules are stored as markdown files with frontmatter metadata for structured querying.

## Structure

```
rules/
├── microfrontend/       # Microfrontend rules
│   ├── mfe-arch-001.md
│   ├── mfe-perf-001.md
│   └── mfe-test-001.md
└── microservice/        # Microservice rules
    ├── ms-arch-001.md
    ├── ms-perf-001.md
    ├── ms-sec-001.md
    └── ms-test-001.md
```

## Rule Format

Each rule is a markdown file with YAML frontmatter containing metadata:

```markdown
---
id: mfe-arch-001
title: Module Federation Setup
description: Use Module Federation for runtime integration of microfrontends
category: architecture
system: microfrontend
language: typescript
codeType: source
tags:
  - webpack
  - module-federation
  - architecture
---

# Rule Title

Rule content in markdown format...

## Code Examples

\`\`\`typescript
// Code examples here
\`\`\`
```

## Frontmatter Fields

### Required Fields

- **id**: Unique identifier (format: `{system}-{category}-{number}`)
  - Examples: `mfe-arch-001`, `ms-perf-002`
- **title**: Short, descriptive title
- **description**: Brief description of the rule
- **category**: Rule category
  - Options: `architecture`, `performance`, `security`, `testing`
- **system**: Project system type
  - Options: `microfrontend`, `microservice`

### Optional Fields

- **language**: Programming language the rule applies to
  - Options: `typescript`, `javascript`, `python`, `java`, `go`, `rust`
  - Omit if language-agnostic
- **codeType**: Type of code the rule applies to
  - Options: `source`, `test`
  - Omit if applies to both
- **tags**: Array of searchable tags
  - Use for additional categorization
  - Examples: `["webpack", "module-federation"]`

## Adding New Rules

### Step 1: Choose System and Category

Determine which system and category your rule belongs to:
- System: `microfrontend` or `microservice`
- Category: `architecture`, `performance`, `security`, or `testing`

### Step 2: Create Markdown File

Create a new `.md` file in the appropriate directory:

```bash
# For microfrontend rules
rules/microfrontend/mfe-{category}-{number}.md

# For microservice rules
rules/microservice/ms-{category}-{number}.md
```

### Step 3: Add Frontmatter

Start the file with YAML frontmatter:

```yaml
---
id: mfe-arch-002
title: Your Rule Title
description: Brief description
category: architecture
system: microfrontend
language: typescript  # optional
codeType: source     # optional
tags:
  - tag1
  - tag2
---
```

### Step 4: Write Content

After the frontmatter, write your rule content in markdown:

```markdown
# Your Rule Title

Introduction to the rule...

## Benefits

- Benefit 1
- Benefit 2

## Example

\`\`\`typescript
// Code example
\`\`\`

## Best Practices

1. Practice 1
2. Practice 2

## Common Pitfalls

- Pitfall 1
- Pitfall 2
```

### Step 5: Test

Build and test the server to verify your rule loads correctly:

```bash
npm run build
npm start
```

Or run the markdown test:

```bash
node test/markdown-test.js
```

## Naming Convention

### Rule IDs

Format: `{system}-{category}-{number}`

- `{system}`: `mfe` (microfrontend) or `ms` (microservice)
- `{category}`: `arch`, `perf`, `sec`, `test`
- `{number}`: Three-digit number (001, 002, etc.)

Examples:
- `mfe-arch-001`: Microfrontend architecture rule #1
- `ms-perf-002`: Microservice performance rule #2
- `mfe-test-001`: Microfrontend testing rule #1

### File Names

Use the same format as rule IDs with `.md` extension:
- `mfe-arch-001.md`
- `ms-sec-003.md`

## Example Rules

### Architecture Rule

```markdown
---
id: mfe-arch-001
title: Module Federation Setup
description: Use Webpack Module Federation for runtime integration
category: architecture
system: microfrontend
language: typescript
codeType: source
tags:
  - webpack
  - module-federation
---

# Module Federation Setup

When building microfrontends, use Webpack Module Federation...
```

### Performance Rule

```markdown
---
id: ms-perf-001
title: Service Communication Optimization
description: Optimize inter-service communication patterns
category: performance
system: microservice
tags:
  - performance
  - circuit-breaker
---

# Service Communication Optimization

Reduce latency in microservice communication...
```

### Testing Rule

```markdown
---
id: mfe-test-001
title: Integration Testing Microfrontends
description: Test microfrontends integration points
category: testing
system: microfrontend
codeType: test
tags:
  - testing
  - integration
---

# Integration Testing for Microfrontends

Test the integration between different microfrontends...
```

## Querying Rules

Rules can be queried through the MCP server with filters:

```json
{
  "name": "get-microfrontend-rules",
  "arguments": {
    "category": "architecture",
    "language": "typescript",
    "codeType": "source"
  }
}
```

This returns only microfrontend architecture rules for TypeScript source code.

## Best Practices for Writing Rules

1. **Be Specific**: Focus on one concept per rule
2. **Include Examples**: Provide code examples when applicable
3. **Explain Why**: Don't just say what, explain why
4. **Show Pitfalls**: Mention common mistakes to avoid
5. **Use Clear Structure**: Use headings to organize content
6. **Add Tags**: Use relevant tags for better discoverability
7. **Keep Updated**: Review and update rules as best practices evolve

## Contributing

When contributing new rules:

1. Follow the naming convention
2. Include all required frontmatter fields
3. Write clear, actionable content
4. Include code examples
5. Test that the rule loads correctly
6. Submit with a descriptive commit message

## Questions?

For questions about adding rules or the markdown format, see:
- [DEVELOPER_GUIDE.md](../DEVELOPER_GUIDE.md)
- [README.md](../README.md)
