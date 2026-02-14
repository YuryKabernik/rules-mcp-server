/**
 * Server Setup
 * 
 * Initializes and configures the MCP server.
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerToolsHandlers } from "./handlers/tools.js";
import { registerResourcesHandlers } from "./handlers/resources.js";
import { registerPromptsHandlers } from "./handlers/prompts.js";

/**
 * Create and configure the MCP server
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

  // Register all handlers
  registerToolsHandlers(server);
  registerResourcesHandlers(server);
  registerPromptsHandlers(server);

  return server;
}

/**
 * Start the server with stdio transport
 */
export async function startServer(): Promise<void> {
  const server = createServer();
  const transport = new StdioServerTransport();
  
  await server.connect(transport);
  
  console.error("Rules MCP Server running on stdio");
}
