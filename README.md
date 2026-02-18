# rules-mcp-server

![CI](https://github.com/YuryKabernik/rules-mcp-server/workflows/CI/badge.svg)

MCP (Model Context Protocol) server providing development prompts with embedded rules for microfrontend and microservice applications.

## Overview

This MCP server provides interactive prompts for designing and reviewing microfrontend and microservice architectures. All prompts have direct access to development rules and best practices.

**Architecture:** This server implements the standard [three-step MCP server pattern](docs/ARCHITECTURE.md):
1. Create a Server instance and register prompts
2. Create a transport (stdio for local, HTTP for remote)
3. Connect the server to the transport

**Content Management:** All prompts and rules are defined in markdown files with YAML frontmatter metadata in the `content/` directory:
- `content/prompts/` - Interactive prompt templates
- `content/rules/` - Development rules organized by system

This approach makes it easy to add, edit, and organize content without modifying code. See [content/README.md](content/README.md) for details on the markdown format and how to add new content.

## Features

### Prompts

The server provides interactive prompts that guide you through:

- **design-microfrontend**: Design a new microfrontend application with architectural guidance
- **design-microservice**: Design a new microservice with best practices
- **review-architecture**: Review existing architecture against established patterns

Each prompt has access to the complete rule set and provides contextual guidance based on your specific needs

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

### Rules

The server has access to comprehensive development rules organized by:

**Systems:**
- Microfrontend architecture
- Microservice architecture

**Categories:**
- Architecture patterns and decisions
- Performance optimization
- Security best practices
- Testing strategies

**Languages:**
- TypeScript, JavaScript, Python, Java, Go, Rust

Rules are embedded in prompt responses and provided contextually based on your design needs.

## Installation

### Prerequisites

- Node.js v24.x or later (latest version recommended)
- npm v11.x or later

### From GitHub Packages

This package is published to GitHub Packages. To install it, you need to configure npm to use GitHub Packages for the `@yurykabernik` scope.

**Setup authentication (one-time):**

1. Create a [GitHub Personal Access Token](https://github.com/settings/tokens/new) with `read:packages` scope
2. Add to your `~/.npmrc` (replace `<YOUR_GITHUB_TOKEN>` with your actual token):
```bash
@yurykabernik:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=<YOUR_GITHUB_TOKEN>
```

**Global installation:**
```bash
npm install -g @yurykabernik/rules-mcp-server
rules-mcp-server
```

**Use with npx (no installation):**
```bash
npx @yurykabernik/rules-mcp-server
```

### As NPM Package (Public Registry)

If published to npm public registry:

**Global installation:**
```bash
npm install -g rules-mcp-server
rules-mcp-server
```

**Use with npx (no installation):**
```bash
npx -y rules-mcp-server
```

### From Source

1. Clone the repository:
```bash
git clone https://github.com/YuryKabernik/rules-mcp-server.git
cd rules-mcp-server
```

2. Install dependencies and build:
```bash
npm install
npm run build
```

### Using Dev Container (Recommended for Development)

This project includes a VS Code Dev Container configuration for a consistent development environment:

1. Install [Docker](https://www.docker.com/products/docker-desktop) and [VS Code](https://code.visualstudio.com/)
2. Install the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
3. Clone the repository and open in VS Code
4. Click "Reopen in Container" when prompted (or use F1 → "Dev Containers: Reopen in Container")
5. The environment will be automatically set up with all dependencies

See [.devcontainer/README.md](.devcontainer/README.md) for more details.

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

Add to your Claude Desktop configuration file:
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "rules-mcp-server": {
      "command": "npx",
      "args": ["@yurykabernik/rules-mcp-server"]
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

Or from source:
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

See [mcp-config.example.json](mcp-config.example.json) for reference.

## Development

### Project Structure

```
rules-mcp-server/
├── content/                     # 📝 All MCP content (markdown files)
│   ├── rules/                  # Development rules by system
│   │   ├── microfrontend/
│   │   └── microservice/
│   ├── tools/                  # Tool definitions
│   ├── prompts/                # Prompt templates
│   └── resources/              # Documentation resources
├── build/                       # Compiled JavaScript (generated)
├── package.json                 # Project metadata and dependencies
├── tsconfig.json                # TypeScript configuration
└── README.md                   # This file
```

**Content Management:** All server content is in the `content/` directory as markdown files with frontmatter metadata. See [content/README.md](content/README.md) for details on how to add or modify content.

### Available Scripts

**Development:**
- `npm run build` - Compile TypeScript to JavaScript
- `npm run watch` - Watch mode for development (auto-rebuild)
- `npm run dev` - Run server in development mode with tsx
- `npm start` - Run the compiled server
- `npm run prepare` - Automatically builds before npm publish

**Testing:**
- `npm test` - Run all unit tests (fast, ~1 second)
- `npm run test:watch` - Run tests in watch mode
- `npm run test:ui` - Open visual test UI
- `npm run test:coverage` - Generate coverage report

**Code Quality:**
- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Auto-fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Code Quality Tools

This project uses ESLint and Prettier for consistent code styling:

- **ESLint**: Enforces code quality rules and catches common errors
- **Prettier**: Ensures consistent code formatting
- **EditorConfig**: Maintains consistent coding styles across different editors

**IDE Integration:**
- VS Code settings are pre-configured in `.vscode/settings.json`
- Install recommended extensions from `.vscode/extensions.json`
- Code is auto-formatted on save

### Adding Content

Rules are now stored as **markdown files with frontmatter metadata** in the `rules/` directory. This makes it easy to add and edit content without modifying TypeScript code.

#### 1. Adding Rules

**Quick Start:**

1. Create a new markdown file in the appropriate directory:
   - `rules/microfrontend/` for microfrontend rules
   - `rules/microservice/` for microservice rules

2. Add frontmatter metadata at the top:
```markdown
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

# Your Rule Content

Write your rule content in markdown...
```

3. Build and test:
```bash
npm run build
npm start
```

**Detailed Guide:** See [content/rules/README.md](content/rules/README.md) for complete documentation on:
- Markdown format and frontmatter fields
- Naming conventions
- Adding examples and code snippets
- Best practices for writing rules

**Adding a new project system:**

To add support for a new system (e.g., "monolith"):

1. Create a new directory: `content/rules/monolith/`
2. Add markdown rule files in that directory following the frontmatter format
3. Create a new tool definition in `content/tools/get-monolith-rules.md`
4. Restart the server - new content is automatically loaded

See [content/README.md](content/README.md) for detailed instructions.

#### 2. Adding Resources

Resources provide documentation and guides. Add new markdown files in `content/resources/` with proper frontmatter:

```yaml
---
uri: rules://monolith/architecture
name: Monolith Architecture Guide
description: Guide for building monolithic applications
mimeType: text/markdown
---

# Your resource content here...
```

#### 3. Adding Prompts

Prompts provide interactive templates. Add new markdown files in `content/prompts/` with proper frontmatter:

```yaml
---
name: design-monolith
description: Help design a monolithic application
arguments:
  - name: app_name
    description: Name of the application
    required: true
---

# Your prompt template here with {{variables}}...
```

## Technical Details

### Built With

- **Runtime**: Node.js v24.x (ESM modules)
- **Language**: TypeScript 5.x
- **SDK**: [@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/sdk) v1.26.0 (latest stable)
  - 📝 [v2 Migration Guide](docs/MCP_SDK_V2_MIGRATION.md) - v2 planned for Q1 2026, architecture ready for smooth migration
- **Build Tool**: TypeScript compiler (tsc)
- **Dev Runner**: tsx (TypeScript execute)

### MCP Capabilities

This server implements the following MCP capabilities:
- ✅ Tools (for rules and best practices)
- ✅ Resources (for documentation)
- ✅ Prompts (for interactive guidance)

### Transport

Uses stdio transport for communication with MCP clients. The server follows the standard [MCP three-step architecture pattern](docs/ARCHITECTURE.md):

1. **Create Server**: Instantiate MCP Server and register handlers
2. **Create Transport**: Set up stdio transport for local integrations
3. **Connect**: Wire the server to the transport

For detailed architecture documentation, see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

### Continuous Integration

This project uses GitHub Actions for automated testing and quality checks:

- **CI Workflow**: Runs on every push to every branch and all pull requests
  - Build verification (TypeScript compilation)
  - Unit tests (Vitest)
  - Build artifact upload

See [CI_WORKFLOW.md](CI_WORKFLOW.md) for detailed documentation.

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

