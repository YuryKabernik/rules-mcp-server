# MCP Server Architecture

This document explains how the Rules MCP Server implements the standard Model Context Protocol (MCP) server architecture.

## Three-Step MCP Server Pattern

The MCP server architecture follows a standard three-step pattern:

### Step 1: Create Server and Register Capabilities

Create an MCP Server instance and register your tools, resources, and prompts.

**Implementation:** `src/server.ts` - `createServer()` function

```typescript
export function createServer(): Server {
  // Create the server with metadata and capabilities
  const server = new Server(
    {
      name: "rules-mcp-server",
      version: "1.0.0",
    },
    {
      capabilities: {
        tools: {},      // Declares tool capability
        resources: {},  // Declares resource capability
        prompts: {},    // Declares prompt capability
      },
    }
  );

  // Register handlers for each capability
  registerToolsHandlers(server);
  registerResourcesHandlers(server);
  registerPromptsHandlers(server);

  return server;
}
```

**Handler Registration:**
- **Tools** (`src/handlers/tools.ts`): Provides development rules and best practices
- **Resources** (`src/handlers/resources.ts`): Provides documentation and guides
- **Prompts** (`src/handlers/prompts.ts`): Provides interactive templates

### Step 2: Create a Transport

Create a transport layer for communication:
- **Stdio Transport**: For local, process-spawned integrations
- **HTTP Transport**: For remote server deployments

**Implementation:** `src/server.ts` - `startServer()` function

```typescript
// STEP 2: Create the transport
const transport = new StdioServerTransport();
```

**Transport Options:**

#### Stdio Transport (Current Implementation)
```typescript
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const transport = new StdioServerTransport();
await server.connect(transport);
```

Used for:
- Local integrations (Claude Desktop, Cline, etc.)
- Process-spawned servers
- Command-line tools

#### HTTP Transport (Alternative)
```typescript
// Example for remote servers (not currently implemented)
import { HttpServerTransport } from "@modelcontextprotocol/sdk/server/http.js";

const transport = new HttpServerTransport(request, response);
await server.connect(transport);
```

Used for:
- Remote server deployments
- Web-based integrations
- Scalable multi-client scenarios

### Step 3: Connect Server to Transport

Wire the transport into your framework and connect the server.

**Implementation:** `src/server.ts` - `startServer()` function

```typescript
// STEP 3: Connect the server to the transport
await server.connect(transport);
```

This establishes the communication channel between the MCP server and clients.

## Complete Flow

```typescript
// Entry point: src/index.ts
async function main() {
  await startServer();
}

// Server setup: src/server.ts
export async function startServer(): Promise<void> {
  // STEP 1: Create server and register capabilities
  const server = createServer();
  
  // STEP 2: Create transport
  const transport = new StdioServerTransport();
  
  // STEP 3: Connect server to transport
  await server.connect(transport);
  
  console.error("Rules MCP Server running on stdio");
}
```

## Architecture Benefits

### Separation of Concerns

1. **Server Logic** (`src/server.ts`): Server creation and configuration
2. **Handlers** (`src/handlers/`): Request handling for each capability
3. **Business Logic** (`src/rules/`, `src/resources/`, `src/prompts/`): Core functionality
4. **Transport**: Communication layer (stdio, HTTP, etc.)

### Extensibility

The three-step pattern makes it easy to:

- **Add new capabilities**: Register new handlers in Step 1
- **Change transport**: Swap stdio for HTTP in Step 2
- **Modify deployment**: Adjust Step 3 for different frameworks

### Testability

Each step can be tested independently:

```typescript
// Test Step 1: Server creation
const server = createServer();
assert(server !== null);

// Test Step 2: Transport creation
const transport = new StdioServerTransport();
assert(transport !== null);

// Test Step 3: Connection
await server.connect(transport);
// Verify server is connected
```

## Handler Registration Details

### Tools Handler

Registers request handlers for tool operations:

```typescript
server.setRequestHandler(ListToolsRequestSchema, async () => {
  // Return available tools
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  // Execute tool and return results
});
```

### Resources Handler

Registers request handlers for resource operations:

```typescript
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  // Return available resources
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  // Return resource content
});
```

### Prompts Handler

Registers request handlers for prompt operations:

```typescript
server.setRequestHandler(ListPromptsRequestSchema, async () => {
  // Return available prompts
});

server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  // Return prompt content
});
```

## Deployment Options

### Local Deployment (Current)

```bash
# Start as local process
npm start

# Use in MCP client configuration
{
  "mcpServers": {
    "rules-mcp-server": {
      "command": "npx",
      "args": ["-y", "rules-mcp-server"]
    }
  }
}
```

### Remote Deployment (Future)

To deploy as a remote HTTP server:

1. Replace `StdioServerTransport` with HTTP transport
2. Integrate with Express, Fastify, or other HTTP framework
3. Deploy to cloud infrastructure
4. Configure clients to connect via HTTP

Example integration with Express:

```typescript
import express from 'express';

const app = express();

app.post('/mcp', async (req, res) => {
  const server = createServer();
  const transport = new HttpServerTransport(req, res);
  await server.connect(transport);
});

app.listen(3000);
```

## References

- [MCP Documentation](https://modelcontextprotocol.io/docs)
- [MCP SDK on GitHub](https://github.com/modelcontextprotocol/sdk)
- [Server Implementation](../src/server.ts)
- [Main Entry Point](../src/index.ts)
