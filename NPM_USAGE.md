# Using as an NPM Package

The Rules MCP Server can be installed and used as an npm package in multiple ways.

## Installation

### Global Installation

Install globally to use as a CLI tool:

```bash
npm install -g rules-mcp-server
```

Then use directly:

```bash
rules-mcp-server
```

### Local Installation

Install in a project:

```bash
npm install rules-mcp-server
```

## Usage Scenarios

### 1. As a Standalone MCP Server

The most common usage is as a standalone MCP server integrated with AI assistants.

#### With Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%/Claude/claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "rules-mcp-server": {
      "command": "npx",
      "args": ["-y", "rules-mcp-server"]
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

#### With Cline (VS Code)

Add to your Cline MCP settings:

```json
{
  "mcpServers": {
    "rules-mcp-server": {
      "command": "npx",
      "args": ["-y", "rules-mcp-server"]
    }
  }
}
```

### 2. Programmatic Usage

You can also use the server programmatically in your Node.js applications:

```typescript
import { createServer } from 'rules-mcp-server/build/server.js';
import { getRules } from 'rules-mcp-server/build/rules/index.js';

// Get rules programmatically
const rules = getRules('microfrontend', 'architecture', 'typescript');
console.log(rules);

// Or create and run your own server instance
const server = createServer();
// ... use the server
```

### 3. Custom MCP Client Integration

If you're building a custom MCP client:

```typescript
import { spawn } from 'child_process';

// Start the server
const server = spawn('rules-mcp-server');

// Communicate via stdio using JSON-RPC
server.stdin.write(JSON.stringify({
  jsonrpc: '2.0',
  id: 1,
  method: 'tools/list',
  params: {}
}) + '\n');

server.stdout.on('data', (data) => {
  const response = JSON.parse(data.toString());
  console.log('Available tools:', response.result.tools);
});
```

## Available Tools

### Get Microfrontend Rules

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

### Get Microservice Rules

```json
{
  "name": "get-microservice-rules",
  "arguments": {
    "category": "performance",
    "language": "javascript"
  }
}
```

## Environment Variables

Currently, the server doesn't require any environment variables. All configuration is done through MCP tool arguments.

## Upgrading

### Global Installation

```bash
npm update -g rules-mcp-server
```

### Local Installation

```bash
npm update rules-mcp-server
```

### Check Version

```bash
npm list -g rules-mcp-server  # Global
npm list rules-mcp-server     # Local
```

## Troubleshooting

### Command Not Found

If `rules-mcp-server` command is not found after global installation:

1. Check npm global bin directory:
   ```bash
   npm config get prefix
   ```

2. Ensure it's in your PATH

3. Or use with npx:
   ```bash
   npx rules-mcp-server
   ```

### Permission Errors

On Unix systems, you might need sudo for global installation:

```bash
sudo npm install -g rules-mcp-server
```

Or configure npm to use a user directory:

```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

### Build Errors

If you encounter build errors after installation:

```bash
cd node_modules/rules-mcp-server
npm run build
```

## Using in Development

When developing applications that integrate with this server:

```bash
# Install as a dev dependency
npm install --save-dev rules-mcp-server

# Link for local development
cd path/to/rules-mcp-server
npm link

cd path/to/your-project
npm link rules-mcp-server
```

## Package Contents

The published package includes:

- `build/` - Compiled JavaScript files
- `README.md` - Main documentation
- `QUICK_START.md` - Quick start guide
- `DEVELOPER_GUIDE.md` - Developer documentation
- `mcp-config.example.json` - Example configuration

Source TypeScript files are not included in the published package to keep it lightweight.

## Support

For issues and questions:
- GitHub Issues: https://github.com/YuryKabernik/rules-mcp-server/issues
- Documentation: https://github.com/YuryKabernik/rules-mcp-server#readme
