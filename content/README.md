# Content Directory

This directory contains all MCP server content definitions in markdown format with YAML frontmatter metadata.

## Directory Structure

```
content/
├── prompts/         # MCP prompt templates
└── rules/           # Development rules (microfrontend, microservice, etc.)
```

## Content Types

### Prompts (`content/prompts/`)

Prompts define interactive templates that guide users through development tasks. Each prompt has access to the complete rules database.

**File naming:** Use descriptive kebab-case names (e.g., `design-microfrontend.md`)

**Frontmatter structure:**
```yaml
---
name: design-microfrontend
description: Help design a new microfrontend application with architectural guidance
arguments:
  - name: app_name
    description: Name of the microfrontend application
    required: true
  - name: framework
    description: Frontend framework (e.g., React, Vue, Angular)
    required: false
  - name: team_size
    description: Size of the development team
    required: false
---

# Prompt Template

Use {{variable}} syntax for required arguments and {{variable|default}} for optional arguments with defaults.

Example:
Let's design {{app_name}}, a microfrontend application using {{framework|React}}...
```

### Rules (`content/rules/`)

Development rules and best practices for different project systems. Rules are organized by system type (microfrontend, microservice, etc.) and embedded in prompt responses.

See [content/rules/README.md](rules/README.md) for detailed information on rule format and organization.

## Adding New Content

### Adding a New Prompt

1. Create a new markdown file in `content/prompts/`
2. Add frontmatter with name, description, and arguments
3. Write prompt template using variable syntax
4. Restart the server to load the new prompt

### Adding New Rules

1. Create a new markdown file in the appropriate `content/rules/` subdirectory
2. Add frontmatter with id, title, description, category, system, language, codeType, and tags
3. Write rule content in markdown
4. Restart the server - rules are automatically available in prompts

## Validation Rules

**Prompts:**
- Name must be unique across all prompts
- All arguments marked as `required: true` must have descriptions
- Template must use valid syntax

**Rules:**
- ID must be unique
- Must include all required frontmatter fields
- Must be in correct directory structure

## Best Practices

1. **Use clear, descriptive names** for files and identifiers
2. **Write helpful descriptions** that explain the purpose
3. **Keep content focused** - one prompt or rule per file
4. **Use consistent formatting** in markdown content
5. **Test your templates** before committing
6. **Tag rules appropriately** for better discovery
4. Restart the server to load the new resource

## Validation

The server validates all content on startup:

- **Required fields**: Missing required frontmatter fields cause warnings
- **File format**: Non-markdown files are ignored
- **Parsing errors**: Invalid YAML or markdown causes warnings

Check server logs for any validation warnings.

## Best Practices

1. **Keep frontmatter minimal**: Only include necessary metadata
2. **Write clear descriptions**: Help users understand what each item does
3. **Use consistent naming**: Follow kebab-case for file names
4. **Document your content**: Use markdown content for documentation
5. **Test your templates**: Verify prompts work with various inputs
6. **Version control**: Track content changes with meaningful commit messages

## Examples

See existing files in each directory for complete examples:
- `content/tools/get-microfrontend-rules.md`
- `content/prompts/design-microfrontend.md`
- `content/resources/microfrontend-architecture.md`
