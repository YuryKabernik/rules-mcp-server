# Content Directory

This directory contains all MCP server content definitions in markdown format with YAML frontmatter metadata.

## Directory Structure

```
content/
├── tools/           # MCP tool definitions
├── prompts/         # MCP prompt templates
└── resources/       # MCP documentation resources
```

## Content Types

### Tools (`content/tools/`)

Tools define MCP tools that can be called by clients. Each tool is a markdown file with frontmatter defining the tool's metadata.

**File naming:** Use descriptive kebab-case names (e.g., `get-microfrontend-rules.md`)

**Frontmatter structure:**
```yaml
---
name: get-microfrontend-rules
description: Get development rules and best practices for microfrontend applications
system: microfrontend  # Optional: project system for rules tools
inputSchema:
  type: object
  properties:
    category:
      type: string
      description: Category of rules
      enum: [architecture, performance, security, testing, all]
    language:
      type: string
      enum: [typescript, javascript, python, java, go, rust]
  required: []
---

# Tool Documentation

The markdown content below frontmatter serves as documentation for the tool.
It's not used by the MCP server but helps developers understand the tool.
```

**Required fields:**
- `name`: Unique tool identifier
- `description`: Brief description of what the tool does
- `inputSchema`: JSON Schema defining the tool's input parameters

**Optional fields:**
- `system`: For rules tools, specifies which system (microfrontend/microservice)

### Prompts (`content/prompts/`)

Prompts define interactive template generation for users. Each prompt is a markdown file where the content is the template.

**File naming:** Use descriptive kebab-case names (e.g., `design-microfrontend.md`)

**Frontmatter structure:**
```yaml
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

# Prompt Template

The markdown content is the prompt template. Use template variables:
- `{{variable}}` - Required variable, fails if not provided
- `{{variable|default}}` - Optional variable with default value
- `{{#if variable}}...{{/if}}` - Conditional content

Example:
Help me design a microfrontend application named "{{app_name}}" using {{framework|React}}.
```

**Required fields:**
- `name`: Unique prompt identifier
- `description`: Brief description
- `arguments`: Array of argument definitions with name, description, and required flag

**Template syntax:**
- `{{variable}}`: Insert variable value
- `{{variable|default}}`: Use default if variable not provided
- `{{#if variable}}content{{/if}}`: Include content only if variable exists

### Resources (`content/resources/`)

Resources provide documentation and reference materials. Each resource is a markdown file.

**File naming:** Use descriptive kebab-case names (e.g., `microfrontend-architecture.md`)

**Frontmatter structure:**
```yaml
---
uri: rules://microfrontend/architecture
name: Microfrontend Architecture Guide
description: Comprehensive guide on microfrontend architecture patterns
mimeType: text/markdown
---

# Resource Content

The markdown content below the frontmatter is served as the resource content.
Use standard markdown formatting.
```

**Required fields:**
- `uri`: Unique resource identifier (URI format)
- `name`: Human-readable name
- `description`: Brief description
- `mimeType`: Content type (typically `text/markdown`)

## Adding New Content

### Adding a New Tool

1. Create a new markdown file in `content/tools/`
2. Add frontmatter with name, description, and inputSchema
3. Write tool documentation in markdown content
4. Restart the server to load the new tool

### Adding a New Prompt

1. Create a new markdown file in `content/prompts/`
2. Add frontmatter with name, description, and arguments
3. Write prompt template using variable syntax
4. Restart the server to load the new prompt

### Adding a New Resource

1. Create a new markdown file in `content/resources/`
2. Add frontmatter with uri, name, description, and mimeType
3. Write resource content in markdown
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
