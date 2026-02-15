/**
 * Prompts Handler
 * 
 * Handles MCP prompt requests for interactive templates.
 * 
 * This is part of STEP 1 of the MCP server architecture:
 * Handlers are registered to the server instance to define
 * the prompts capability and handle prompt requests.
 */

import { McpServer, MCP_METHODS, getRequestIdentifier } from "../types/mcp.js";
import { getAllPrompts, getPromptByName } from "../prompts/index.js";

/**
 * Register prompts handlers to the MCP server
 * 
 * Registers request handlers for:
 * - PROMPTS_LIST: Returns available prompts
 * - PROMPTS_GET: Returns prompt content
 * 
 * @param server - The MCP Server instance to register handlers on
 */
export function registerPromptsHandlers(server: McpServer): void {
  // List available prompts
  server.setRequestHandler(getRequestIdentifier(MCP_METHODS.PROMPTS_LIST), async () => {
    const prompts = getAllPrompts();
    
    return {
      prompts: prompts.map(p => ({
        name: p.name,
        description: p.description,
        arguments: p.arguments,
      })),
    };
  });

  // Get a specific prompt
  server.setRequestHandler(getRequestIdentifier(MCP_METHODS.PROMPTS_GET), async (request) => {
    const { name, arguments: args } = request.params;
    const prompt = getPromptByName(name);

    if (!prompt) {
      throw new Error(`Unknown prompt: ${name}`);
    }

    const text = prompt.template(args || {});

    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text,
          },
        },
      ],
    };
  });
}
