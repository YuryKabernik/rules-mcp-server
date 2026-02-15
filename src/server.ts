/**
 * Server Setup
 * 
 * This file implements the standard three-step MCP server architecture:
 * 1. Create an MCP Server instance and register tools, resources, and prompts
 * 2. Create a transport (stdio for local, HTTP for remote)
 * 3. Connect the server to the transport
 * 
 * @see {@link https://modelcontextprotocol.io/docs/concepts/architecture | MCP Architecture}
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerToolsHandlers } from "./handlers/tools.js";
import { registerResourcesHandlers } from "./handlers/resources.js";
import { registerPromptsHandlers } from "./handlers/prompts.js";

/**
 * STEP 1: Create and configure the MCP server
 * 
 * Creates an MCP Server instance with:
 * - Server metadata (name, version)
 * - Declared capabilities (tools, resources, prompts)
 * - Registered handlers for all capabilities
 * 
 * This follows the MCP architecture pattern where the server
 * is created first and all handlers are registered before
 * connecting to a transport.
 * 
 * @returns Configured MCP Server instance
 */
export function createServer(): Server {
  const server = new Server(
    {
      name: "rules-mcp-server",
      version: "1.0.0",
    },
    {
      capabilities: {
        tools: {},
        resources: {},
        prompts: {},
      },
    }
  );

  // Register all handlers for tools, resources, and prompts
  registerToolsHandlers(server);
  registerResourcesHandlers(server);
  registerPromptsHandlers(server);

  return server;
}

/**
 * STEP 2 & 3: Create transport and connect server
 * 
 * This function:
 * 1. Creates the MCP server (Step 1)
 * 2. Creates a transport - stdio for local process-spawned integrations (Step 2)
 * 3. Connects the server to the transport (Step 3)
 * 
 * For remote servers, StdioServerTransport would be replaced with
 * an HTTP transport implementation.
 * 
 * @example
 * ```typescript
 * // Local stdio transport (current implementation)
 * await startServer();
 * 
 * // Remote HTTP transport (example)
 * const server = createServer();
 * const transport = new HttpServerTransport(request, response);
 * await server.connect(transport);
 * ```
 */
export async function startServer(): Promise<void> {
  // STEP 1: Create the MCP server with registered handlers
  const server = createServer();
  
  // STEP 2: Create the transport
  // Using stdio transport for local, process-spawned integrations
  const transport = new StdioServerTransport();
  
  // STEP 3: Connect the server to the transport
  await server.connect(transport);
  
  console.error("Rules MCP Server running on stdio");
}
