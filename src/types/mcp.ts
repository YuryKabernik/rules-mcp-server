/**
 * MCP Type Abstractions
 * 
 * This file provides a centralized abstraction layer for MCP SDK types.
 * When migrating to v2, only this file needs to be updated.
 * 
 * v1 (current):
 *   import { Server } from "@modelcontextprotocol/sdk/server";
 * 
 * v2 (future):
 *   import { McpServer as Server } from "@modelcontextprotocol/server";
 */

// ============================================================================
// SERVER TYPES
// ============================================================================

/**
 * MCP Server type
 * 
 * v1: Server from @modelcontextprotocol/sdk/server
 * v2: McpServer from @modelcontextprotocol/server
 */
export { Server as McpServer } from "@modelcontextprotocol/sdk/server";

/**
 * Server transport type
 * 
 * v1: StdioServerTransport from @modelcontextprotocol/sdk/server/stdio
 * v2: StdioServerTransport from @modelcontextprotocol/server
 */
export { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// ============================================================================
// REQUEST SCHEMAS (v1) / METHOD STRINGS (v2)
// ============================================================================

/**
 * Request schemas for handler registration
 * 
 * v1: Uses Zod schema objects
 * v2: Will use method string constants
 * 
 * This object provides a mapping that works for both versions.
 * In v1: The schema objects are used directly
 * In v2: These will be replaced with method strings
 */
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

/**
 * Method identifiers for MCP requests
 * 
 * Structure allows easy migration to v2:
 * - v1: Use the .schema property
 * - v2: Use the .method property
 */
export const MCP_METHODS = {
  TOOLS_LIST: {
    schema: ListToolsRequestSchema,
    method: "tools/list" as const,
  },
  TOOLS_CALL: {
    schema: CallToolRequestSchema,
    method: "tools/call" as const,
  },
  RESOURCES_LIST: {
    schema: ListResourcesRequestSchema,
    method: "resources/list" as const,
  },
  RESOURCES_READ: {
    schema: ReadResourceRequestSchema,
    method: "resources/read" as const,
  },
  PROMPTS_LIST: {
    schema: ListPromptsRequestSchema,
    method: "prompts/list" as const,
  },
  PROMPTS_GET: {
    schema: GetPromptRequestSchema,
    method: "prompts/get" as const,
  },
} as const;

/**
 * Helper to get the current request identifier (schema in v1, method in v2)
 * 
 * Usage in v1: getRequestIdentifier(MCP_METHODS.TOOLS_LIST)
 * 
 * For v2 migration, change implementation to:
 *   return methodDef.method;
 */
export function getRequestIdentifier<T extends keyof typeof MCP_METHODS>(
  methodDef: typeof MCP_METHODS[T]
): any {
  // v1: Return the schema
  return methodDef.schema;
  
  // v2: Uncomment below and remove above
  // return methodDef.method;
}

// ============================================================================
// TYPE EXPORTS
// ============================================================================

/**
 * Re-export commonly used types for convenience
 * 
 * v2: These will come from @modelcontextprotocol/core
 */
export type {
  Tool,
  Resource,
  Prompt,
  TextContent,
  ImageContent,
  EmbeddedResource,
} from "@modelcontextprotocol/sdk/types.js";
