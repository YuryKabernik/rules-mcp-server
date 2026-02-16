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
 * - Prompts for development guidance with embedded rules
 * - Rules organized by project system, language, and code type
 * 
 * **Configuration:**
 * - Content path can be set via --content-path argument or MCP_CONTENT_PATH environment variable
 * - Defaults to content/ directory in the package
 * 
 * **Extensibility:**
 * The server is designed to be easily extensible:
 * 1. Add rule definitions as markdown files in content/rules/<system>/ directories
 * 2. Add prompt templates in content/prompts/ directory
 * 3. New systems can be added by creating new directories under content/rules/
 * 
 * @see {@link https://modelcontextprotocol.io/docs | MCP Documentation}
 */

import { startServer } from "./server.js";
import { setContentPath } from "./config.js";

/**
 * Parse command-line arguments
 */
function parseArgs(): { contentPath?: string } {
  const args = process.argv.slice(2);
  const result: { contentPath?: string } = {};
  
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--content-path" && i + 1 < args.length) {
      result.contentPath = args[i + 1];
      i++;
    }
  }
  
  return result;
}

/**
 * Main entry point
 * 
 * Starts the MCP server with stdio transport for local integrations.
 * The server follows the three-step MCP architecture pattern implemented
 * in the startServer() function.
 * 
 * Configuration options:
 * - --content-path <path>: Set the content directory path
 * - MCP_CONTENT_PATH env var: Set the content directory path
 */
async function main() {
  const args = parseArgs();
  
  // Set content path if provided via command-line argument
  if (args.contentPath) {
    setContentPath(args.contentPath);
    console.error(`Using content path: ${args.contentPath}`);
  } else if (process.env.MCP_CONTENT_PATH) {
    console.error(`Using content path from MCP_CONTENT_PATH: ${process.env.MCP_CONTENT_PATH}`);
  }
  
  await startServer();
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
