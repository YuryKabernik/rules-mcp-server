/**
 * Tools Handler
 * 
 * Handles MCP tool requests for getting development rules.
 * Tools are loaded from markdown files in content/tools/
 * 
 * This is part of STEP 1 of the MCP server architecture:
 * Handlers are registered to the server instance to define
 * the tools capability and handle tool execution requests.
 */

import { McpServer, MCP_METHODS, getRequestIdentifier } from "../types/mcp.js";
import { getRules, formatRulesAsText } from "../rules/index.js";
import { GetRulesInput } from "../types/index.js";
import { getAllTools, getToolByName } from "../tools/index.js";

/**
 * Register tools handlers to the MCP server
 * 
 * Registers request handlers for:
 * - TOOLS_LIST: Returns available tools (loaded from markdown)
 * - TOOLS_CALL: Executes tool requests
 * 
 * @param server - The MCP Server instance to register handlers on
 */
export function registerToolsHandlers(server: McpServer): void {
  // List available tools - loaded from markdown files
  server.setRequestHandler(getRequestIdentifier(MCP_METHODS.TOOLS_LIST), async () => {
    const tools = await getAllTools();
    return { tools };
  });

  // Handle tool calls
  server.setRequestHandler(getRequestIdentifier(MCP_METHODS.TOOLS_CALL), async (request) => {
    const { name, arguments: args } = request.params;
    
    // Get tool definition to determine system
    const tool = await getToolByName(name);
    if (!tool) {
      throw new Error(`Unknown tool: ${name}`);
    }

    // Check if this is a rules tool
    if (tool.system) {
      const { category, language, codeType } = args as GetRulesInput;
      const rules = await getRules(tool.system, category, language, codeType);
      const text = formatRulesAsText(rules);

      return {
        content: [
          {
            type: "text",
            text,
          },
        ],
      };
    }

    throw new Error(`Tool ${name} does not have a handler implementation`);
  });
}
