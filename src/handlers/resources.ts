/**
 * Resources Handler
 * 
 * Handles MCP resource requests for documentation.
 * Resources are loaded from markdown files in content/resources/
 * 
 * This is part of STEP 1 of the MCP server architecture:
 * Handlers are registered to the server instance to define
 * the resources capability and handle resource requests.
 */

import { McpServer, MCP_METHODS, getRequestIdentifier } from "../types/mcp.js";
import { getAllResources, getResourceByUri } from "../resources/index.js";

/**
 * Register resources handlers to the MCP server
 * 
 * Registers request handlers for:
 * - RESOURCES_LIST: Returns available resources (loaded from markdown)
 * - RESOURCES_READ: Returns resource content
 * 
 * @param server - The MCP Server instance to register handlers on
 */
export function registerResourcesHandlers(server: McpServer): void {
  // List available resources - loaded from markdown files
  server.setRequestHandler(getRequestIdentifier(MCP_METHODS.RESOURCES_LIST), async () => {
    const resources = await getAllResources();
    
    return {
      resources: resources.map(r => ({
        uri: r.uri,
        name: r.name,
        description: r.description,
        mimeType: r.mimeType,
      })),
    };
  });

  // Read a specific resource
  server.setRequestHandler(getRequestIdentifier(MCP_METHODS.RESOURCES_READ), async (request) => {
    const { uri } = request.params;
    const resource = await getResourceByUri(uri);

    if (!resource) {
      throw new Error(`Resource not found: ${uri}`);
    }

    return {
      contents: [
        {
          uri: resource.uri,
          mimeType: resource.mimeType,
          text: resource.content,
        },
      ],
    };
  });
}
