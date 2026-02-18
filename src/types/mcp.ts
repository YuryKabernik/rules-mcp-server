/**
 * Server transport type
 *
 * v1: StdioServerTransport from @modelcontextprotocol/sdk/server/stdio
 * v2: StdioServerTransport from @modelcontextprotocol/server
 */
export { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

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
