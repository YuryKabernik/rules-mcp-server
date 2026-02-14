#!/usr/bin/env node

/**
 * MCP Server for Microfrontend and Microservice Development Rules
 * 
 * This server provides:
 * - Rules (via tools) for development best practices organized by project system, language, and code type
 * - Resources for documentation and guides
 * - Prompts for common development scenarios
 * 
 * The server is designed to be easily extensible - new rules can be added by:
 * 1. Adding rule definitions in src/rules/<system>/ directories
 * 2. New systems can be added by creating new directories under src/rules/
 * 3. Rules support filtering by language and code type (source vs test)
 */

import { startServer } from "./server.js";

/**
 * Main entry point
 */
async function main() {
  await startServer();
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
