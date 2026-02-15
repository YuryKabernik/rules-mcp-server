# Rules Directory

Development rules stored as markdown files with frontmatter metadata for structured querying.

## Structure

```
rules/
├── microfrontend/       # Microfrontend rules
└── microservice/        # Microservice rules
```

## Rule Format

Each rule is a markdown file with YAML frontmatter:

```markdown
---
id: mfe-arch-001
title: Module Federation Setup
description: Use Module Federation for runtime integration
category: architecture
system: microfrontend
language: typescript      # optional
codeType: source         # optional
tags:                    # optional
  - webpack
  - module-federation
---

# Rule Title

Rule content in markdown...

## Code Examples

\`\`\`typescript
// Code examples
\`\`\`
```

## Frontmatter Fields

**Required:**
- `id`: Unique identifier (`{system}-{category}-{number}`)
- `title`: Short, descriptive title
- `description`: Brief description
- `category`: `architecture` | `performance` | `security` | `testing`
- `system`: `microfrontend` | `microservice`

**Optional:**
- `language`: `typescript` | `javascript` | `python` | `java` | `go` | `rust`
- `codeType`: `source` | `test`
- `tags`: Array of searchable tags

## Adding New Rules

1. Create file in appropriate directory:
   - Microfrontend: `rules/microfrontend/mfe-{category}-{number}.md`
   - Microservice: `rules/microservice/ms-{category}-{number}.md`

2. Add frontmatter and content (see format above)

3. Test:
   ```bash
   npm run build
   npm start
   ```

## Naming Conventions

**Rule IDs:**
- Format: `{system}-{category}-{number}`
- Examples: `mfe-arch-001`, `ms-perf-002`

**File names:**
- Match the rule ID
- Examples: `mfe-arch-001.md`, `ms-perf-002.md`

**Categories:**
- `arch`: Architecture and design patterns
- `perf`: Performance optimization
- `sec`: Security best practices
- `test`: Testing strategies

## Examples by Category

### Architecture Rules
```markdown
---
id: mfe-arch-001
title: Module Federation Setup
category: architecture
system: microfrontend
---
```

### Performance Rules
```markdown
---
id: ms-perf-001
title: Service Communication Optimization
category: performance
system: microservice
language: nodejs
---
```

### Security Rules
```markdown
---
id: ms-sec-001
title: Service-to-Service Authentication
category: security
system: microservice
---
```

### Testing Rules
```markdown
---
id: mfe-test-001
title: Microfrontend Integration Testing
category: testing
system: microfrontend
codeType: test
---
```

## Best Practices

1. **Clear titles**: Use descriptive, actionable titles
2. **Complete descriptions**: Brief but informative
3. **Code examples**: Include practical examples when applicable
4. **Consistent format**: Follow the established structure
5. **Relevant tags**: Add tags to improve discoverability
6. **Language-specific**: Use `language` field when rule is language-specific
7. **Code type**: Use `codeType` to distinguish source vs test rules

For more details, see [DEVELOPER_GUIDE.md](../DEVELOPER_GUIDE.md).
