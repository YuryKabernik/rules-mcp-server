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

Both tools support filtering by category:
- `architecture`: Architectural patterns and decisions
- `performance`: Performance optimization techniques
- `security`: Security best practices
- `testing`: Testing strategies
- `all`: All rules (default)

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

```
rules-mcp-server/
├── src/
│   └── index.ts          # Main server implementation
├── build/                # Compiled JavaScript (generated)
├── package.json          # Project metadata and dependencies
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

### Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run watch` - Watch mode for development (auto-rebuild)
- `npm run dev` - Run server in development mode with tsx
- `npm start` - Run the compiled server
- `npm run prepare` - Automatically builds before npm publish

### Adding Content

The server infrastructure is ready, and placeholders are in place for:

1. **Rules Content**: Edit the tool handlers in `src/index.ts` to add actual rules
2. **Resources**: Update resource handlers to add detailed documentation
3. **Prompts**: Enhance prompt templates with comprehensive guidance

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

