# Developer Guide

This guide explains how to extend and maintain the Rules MCP Server.

## Architecture Overview

The server is built with a modular architecture that separates concerns:

- **Types** (`src/types/`): TypeScript interfaces and types
- **Handlers** (`src/handlers/`): MCP protocol request handlers
- **Rules** (`src/rules/`): Development rules organized by project system
- **Resources** (`src/resources/`): Documentation and guides
- **Prompts** (`src/prompts/`): Interactive prompt templates

## Adding New Rules

Rules are the core content of this server. They provide development best practices and guidelines.

### Rule Structure

Each rule follows this structure:

```typescript
interface Rule {
  id: string;              // Unique identifier (e.g., "mfe-arch-001")
  title: string;           // Short, descriptive title
  description: string;     // Brief description
  category: RuleCategory;  // "architecture" | "performance" | "security" | "testing"
  system: ProjectSystem;   // "microfrontend" | "microservice"
  language?: Language;     // Optional: "typescript" | "javascript" | etc.
  codeType?: CodeType;     // Optional: "source" | "test"
  content: string;         // Detailed markdown content
  examples?: string[];     // Optional: code examples
  tags?: string[];         // Optional: searchable tags
}
```

### Adding Rules to an Existing System

1. Navigate to the appropriate system directory:
   - Microfrontend: `src/rules/microfrontend/index.ts`
   - Microservice: `src/rules/microservice/index.ts`

2. Add your rule to the `rules` array:

```typescript
const rules: Rule[] = [
  // Existing rules...
  {
    id: "mfe-arch-002",
    title: "Shared Component Library",
    description: "Use a shared component library for consistency",
    category: "architecture",
    system: "microfrontend",
    language: "typescript",
    content: `
# Shared Component Library

Create a shared component library to maintain design consistency...

## Implementation
\`\`\`typescript
// Your code example
\`\`\`
`,
    tags: ["components", "design-system"],
  },
];
```

3. Rebuild the project: `npm run build`

### Adding a New Project System

To add support for a new project system (e.g., "monolith"):

1. Create a new directory: `src/rules/monolith/`

2. Create `src/rules/monolith/index.ts`:

```typescript
import { Rule, RuleCollection } from "../../types/index.js";

export function getMonolithRules(
  category: string = "all",
  language?: string,
  codeType?: string
): RuleCollection {
  let filteredRules = rules;

  if (category !== "all") {
    filteredRules = filteredRules.filter(rule => rule.category === category);
  }

  if (language) {
    filteredRules = filteredRules.filter(
      rule => !rule.language || rule.language === language
    );
  }

  if (codeType) {
    filteredRules = filteredRules.filter(
      rule => !rule.codeType || rule.codeType === codeType
    );
  }

  return {
    system: "monolith",
    language: language as any,
    rules: filteredRules,
  };
}

const rules: Rule[] = [
  // Your rules here
];

export default rules;
```

3. Update `src/types/index.ts` to add your system to the `ProjectSystem` type:

```typescript
export type ProjectSystem = 
  | "microfrontend"
  | "microservice"
  | "monolith";  // Add your new system
```

4. Update `src/rules/index.ts` to export and handle your new system:

```typescript
import { getMonolithRules } from "./monolith/index.js";

export function getRules(
  system: "microfrontend" | "microservice" | "monolith",
  category?: string,
  language?: string,
  codeType?: string
): RuleCollection {
  switch (system) {
    case "microfrontend":
      return getMicrofrontendRules(category, language, codeType);
    case "microservice":
      return getMicroserviceRules(category, language, codeType);
    case "monolith":
      return getMonolithRules(category, language, codeType);
    default:
      throw new Error(`Unknown system: ${system}`);
  }
}

export { getMicrofrontendRules, getMicroserviceRules, getMonolithRules };
```

5. Add a new tool in `src/handlers/tools.ts`:

```typescript
{
  name: "get-monolith-rules",
  description: "Get development rules and best practices for monolithic applications",
  inputSchema: {
    type: "object",
    properties: {
      category: { /* ... */ },
      language: { /* ... */ },
      codeType: { /* ... */ },
    },
    required: [],
  },
}
```

And handle it in the `CallToolRequestSchema` handler:

```typescript
if (name === "get-monolith-rules") {
  const { category, language, codeType } = args as GetRulesInput;
  const rules = getRules("monolith", category, language, codeType);
  const text = formatRulesAsText(rules);
  
  return {
    content: [{ type: "text", text }],
  };
}
```

6. Rebuild: `npm run build`

## Adding Resources

Resources provide comprehensive documentation and guides.

Edit `src/resources/index.ts` and add to the `resources` array:

```typescript
{
  uri: "rules://your-category/your-topic",
  name: "Your Resource Name",
  description: "Brief description of the resource",
  mimeType: "text/markdown",
  content: `
# Your Resource Content

Full markdown content here...
`,
}
```

## Adding Prompts

Prompts provide interactive templates for common tasks.

Edit `src/prompts/index.ts` and add to the `prompts` array:

```typescript
{
  name: "your-prompt-name",
  description: "What this prompt helps with",
  arguments: [
    {
      name: "param1",
      description: "Description of parameter",
      required: true,
    },
  ],
  template: (args: Record<string, string>) => {
    const param1 = args.param1 || "default";
    
    return `Your prompt template with ${param1}...`;
  },
}
```

## Testing

### Manual Testing

Run the manual test script:

```bash
node test/manual-test.js
```

Or the extended test:

```bash
node test/extended-test.js
```

### Testing New Rules

1. Build the project: `npm run build`
2. Start the server: `npm start`
3. Send a test request via stdin (JSON-RPC format)

Example request:
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "get-microfrontend-rules",
    "arguments": {
      "category": "architecture",
      "language": "typescript"
    }
  }
}
```

## Publishing to npm

The package is already configured for npm publishing:

1. Update version in `package.json`
2. Build: `npm run build`
3. Publish: `npm publish`

The package includes:
- A binary entry point (`bin` field)
- Automatic build on install (`prepare` script)
- Proper exports configuration

## Code Style

- Use TypeScript with strict mode
- Follow existing code patterns
- Use ESM imports (`.js` extensions in imports)
- Document functions with JSDoc comments
- Keep files focused and modular

## File Organization

```
src/
├── types/          # Type definitions only, no logic
├── handlers/       # MCP protocol handlers only
├── rules/          # Rule definitions and filtering logic
├── resources/      # Static resource content
├── prompts/        # Prompt templates and generation logic
├── server.ts       # Server initialization
└── index.ts        # CLI entry point
```

## Best Practices

1. **Rule IDs**: Use a consistent format: `{system}-{category}-{number}` (e.g., `mfe-arch-001`)
2. **Content**: Write rules in clear, actionable language with examples
3. **Filtering**: Always support optional language and codeType filters
4. **Tags**: Add relevant tags to help users find related rules
5. **Examples**: Include code examples in rules when applicable
6. **Documentation**: Keep markdown content well-formatted and clear

## Troubleshooting

### Build Errors

```bash
# Clean and rebuild
rm -rf build node_modules
npm install
npm run build
```

### Import Errors

Ensure all imports use `.js` extensions (even for `.ts` files):
```typescript
// Correct
import { Rule } from "../types/index.js";

// Incorrect
import { Rule } from "../types/index";
```

### Type Errors

Run TypeScript in watch mode to catch errors as you develop:
```bash
npm run watch
```
