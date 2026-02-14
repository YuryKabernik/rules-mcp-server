# Quick Start Guide

This guide will help you get the Rules MCP Server up and running in minutes.

## Quick Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Build the project**
   ```bash
   npm run build
   ```

3. **Run the server**
   ```bash
   npm start
   ```

That's it! The server is now running and ready to accept MCP requests via stdio.

## Development Workflow

For active development with auto-reload:

```bash
npm run dev
```

For watching and auto-rebuilding TypeScript:

```bash
npm run watch
```

## Testing the Server

Run the manual test to verify all capabilities:

```bash
node test/manual-test.js
```

You should see successful responses for:
- ✅ Tools listing (2 tools: microfrontend and microservice rules)
- ✅ Resources listing (3 resources: architecture guides)
- ✅ Prompts listing (3 prompts: design and review templates)

## Adding to MCP Clients

### For Claude Desktop

1. Find your config file:
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%APPDATA%/Claude/claude_desktop_config.json`

2. Add this configuration:
   ```json
   {
     "mcpServers": {
       "rules-mcp-server": {
         "command": "node",
         "args": ["/full/path/to/rules-mcp-server/build/index.js"]
       }
     }
   }
   ```

3. Restart Claude Desktop

### For Cline

Add to your MCP settings in VS Code:
```json
{
  "mcpServers": {
    "rules-mcp-server": {
      "command": "node",
      "args": ["/full/path/to/rules-mcp-server/build/index.js"]
    }
  }
}
```

## Next Steps

- Add your microfrontend rules to the `get-microfrontend-rules` tool handler
- Add your microservice rules to the `get-microservice-rules` tool handler
- Populate the resource handlers with detailed documentation
- Enhance the prompt templates with comprehensive guidance

See the main [README.md](README.md) for more detailed information.
