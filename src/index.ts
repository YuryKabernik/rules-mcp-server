#!/usr/bin/env node

/**
 * MCP Server for Microfrontend and Microservice Development Rules
 * 
 * This server implements the standard MCP server architecture:
 * 
 * **Three-Step MCP Server Pattern:**
 * 1. Create a Server instance and register tools, resources, and prompts
 * 2. Create a transport (stdio for local, HTTP for remote servers)
 * 3. Connect the server to the transport
 * 
 * **Server Capabilities:**
 * - Rules (via tools) for development best practices organized by project system, language, and code type
 * - Resources for documentation and guides
 * - Prompts for common development scenarios
 * 
 * **Extensibility:**
 * The server is designed to be easily extensible:
 * 1. Add rule definitions as markdown files in rules/<system>/ directories
 * 2. New systems can be added by creating new directories under rules/
 * 3. Rules support filtering by language and code type (source vs test)
 * 
 * @see {@link https://modelcontextprotocol.io/docs | MCP Documentation}
 */

import { startServer } from "./server.js";

/**
 * Main entry point
 * 
 * Starts the MCP server with stdio transport for local integrations.
 * The server follows the three-step MCP architecture pattern implemented
 * in the startServer() function.
 */
async function main() {
  await startServer();
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
