# rules-mcp-server

MCP (Model Context Protocol) server providing development rules, resources, and prompts for microfrontend and microservice applications.

## Overview

This MCP server aggregates development rules, best practices, and guidance for building distributed systems using microfrontend and microservice architectures. It provides:

- **Tools**: Access development rules and best practices by category
- **Resources**: Documentation and architectural guides
- **Prompts**: Templates for common development scenarios

## Features

### Tools (Rules)
- `get-microfrontend-rules`: Get rules for microfrontend development
- `get-microservice-rules`: Get rules for microservice development

Both tools support advanced filtering:

**By Category:**
- `architecture`: Architectural patterns and decisions
- `performance`: Performance optimization techniques
- `security`: Security best practices
- `testing`: Testing strategies
- `all`: All rules (default)

**By Language:**
- `typescript`, `javascript`, `python`, `java`, `go`, `rust`
- Filters rules specific to a programming language

**By Code Type:**
- `source`: Rules for source code
- `test`: Rules for test code

**Example queries:**
```json
// Get TypeScript-specific microfrontend architecture rules
{
  "name": "get-microfrontend-rules",
  "arguments": {
    "category": "architecture",
    "language": "typescript",
    "codeType": "source"
  }
}

// Get all microservice testing rules
{
  "name": "get-microservice-rules",
  "arguments": {
    "category": "testing",
    "codeType": "test"
  }
}
```

### Resources
- Microfrontend Architecture Guide
- Microservice Architecture Guide
- General Best Practices for Distributed Systems

### Prompts
- `design-microfrontend`: Interactive prompt for designing microfrontend applications
- `design-microservice`: Interactive prompt for designing microservices
- `review-architecture`: Get architectural review and feedback

## Installation

### Prerequisites

- Node.js v24.x or later (latest version recommended)
- npm v11.x or later

### Quick Start

See [QUICK_START.md](QUICK_START.md) for a streamlined setup guide.

### Setup

1. Clone the repository:
```bash
git clone https://github.com/YuryKabernik/rules-mcp-server.git
cd rules-mcp-server
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

## Usage

### Running the Server

#### Development Mode (with auto-reload)
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

#### Watch Mode (auto-rebuild on changes)
```bash
npm run watch
```

### Using with MCP Clients

The server uses stdio transport and can be integrated with any MCP-compatible client.

#### Claude Desktop Configuration

Add to your Claude Desktop configuration file (see [mcp-config.example.json](mcp-config.example.json) for reference):

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "rules-mcp-server": {
      "command": "node",
      "args": ["/absolute/path/to/rules-mcp-server/build/index.js"]
    }
  }
}
```

Or if installed globally:
```json
{
  "mcpServers": {
    "rules-mcp-server": {
      "command": "rules-mcp-server"
    }
  }
}
```

#### Cline Configuration

Add to your Cline MCP settings:
```json
{
  "mcpServers": {
    "rules-mcp-server": {
      "command": "node",
      "args": ["/absolute/path/to/rules-mcp-server/build/index.js"]
    }
  }
}
```

## Development

### Project Structure

The codebase is organized into a modular structure for easy maintenance and extensibility:

```
rules-mcp-server/
├── src/
│   ├── index.ts                    # Main entry point
│   ├── server.ts                   # Server initialization
│   ├── types/
│   │   └── index.ts               # TypeScript type definitions
│   ├── handlers/                   # MCP request handlers
│   │   ├── tools.ts               # Rules tool handler
│   │   ├── resources.ts           # Documentation handler
│   │   └── prompts.ts             # Prompts handler
│   ├── rules/                      # Development rules
│   │   ├── index.ts               # Rules registry
│   │   ├── microfrontend/
│   │   │   └── index.ts           # Microfrontend rules
│   │   └── microservice/
│   │       └── index.ts           # Microservice rules
│   ├── resources/                  # Documentation resources
│   │   └── index.ts               # Resources registry
│   └── prompts/                    # Prompt templates
│       └── index.ts               # Prompts registry
├── build/                          # Compiled JavaScript (generated)
├── test/                           # Test scripts
├── package.json                    # Project metadata and dependencies
├── tsconfig.json                   # TypeScript configuration
└── README.md                      # This file
```

### Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run watch` - Watch mode for development (auto-rebuild)
- `npm run dev` - Run server in development mode with tsx
- `npm start` - Run the compiled server
- `npm run prepare` - Automatically builds before npm publish

### Adding Content

The server is structured for easy extensibility. To add new rules:

#### 1. Adding Rules

Rules are organized by project system, language, and code type:

**Add to existing system** (e.g., microfrontend):
- Edit `src/rules/microfrontend/index.ts`
- Add new `Rule` objects to the `rules` array
- Rules support filtering by category, language, and code type

**Add a new system** (e.g., monolith):
```typescript
// Create src/rules/monolith/index.ts
import { Rule, RuleCollection } from "../../types/index.js";

const rules: Rule[] = [
  {
    id: "mono-arch-001",
    title: "Your Rule Title",
    description: "Rule description",
    category: "architecture",
    system: "monolith", // Must match your system name
    language: "typescript", // Optional
    codeType: "source", // Optional: "source" or "test"
    content: "Detailed rule content...",
    tags: ["tag1", "tag2"],
  },
];

export function getMonolithRules(category, language, codeType) {
  // Filter rules based on parameters
  return { system: "monolith", rules: filteredRules };
}
```

Then update `src/rules/index.ts` to include your new system.

#### 2. Adding Resources

Resources provide documentation and guides:
- Edit `src/resources/index.ts`
- Add new `Resource` objects to the `resources` array
- Each resource has a URI, name, description, and markdown content

#### 3. Adding Prompts

Prompts provide interactive templates:
- Edit `src/prompts/index.ts`
- Add new `PromptTemplate` objects to the `prompts` array
- Define arguments and a template function that generates the prompt text

## Technical Details

### Built With

- **Runtime**: Node.js v24.x (ESM modules)
- **Language**: TypeScript 5.x
- **SDK**: [@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/sdk) v1.26.0
- **Build Tool**: TypeScript compiler (tsc)
- **Dev Runner**: tsx (TypeScript execute)

### MCP Capabilities

This server implements the following MCP capabilities:
- ✅ Tools (for rules and best practices)
- ✅ Resources (for documentation)
- ✅ Prompts (for interactive guidance)

### Transport

Uses stdio transport for communication with MCP clients.

## Contributing

This is a proof-of-concept project for aggregating rules across multiple similar projects. Contributions for rules, resources, and prompts are welcome!

## License

ISC

## Troubleshooting

### Server Not Starting

1. Ensure Node.js v24.x or later is installed:
   ```bash
   node --version
   ```

2. Rebuild the project:
   ```bash
   npm run build
   ```

3. Check for errors in the console output

### MCP Client Not Connecting

1. Verify the path to the build/index.js file is correct
2. Ensure the build directory exists and contains compiled files
3. Check MCP client logs for connection errors

### Build Errors

1. Clean and reinstall dependencies:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. Verify TypeScript version:
   ```bash
   npx tsc --version
   ```

## Future Enhancements

- [ ] Add comprehensive microfrontend rules (Module Federation, routing, state management, etc.)
- [ ] Add comprehensive microservice rules (API design, service mesh, resilience patterns, etc.)
- [ ] Add detailed architectural guides
- [ ] Include code examples and templates
- [ ] Add validation rules and linting recommendations
- [ ] Include testing strategies and examples
- [ ] Add CI/CD pipeline recommendations

## Links

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [MCP SDK on GitHub](https://github.com/modelcontextprotocol/sdk)
- [Repository Issues](https://github.com/YuryKabernik/rules-mcp-server/issues)

