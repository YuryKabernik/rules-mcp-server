/**
 * Prompts Handler
 * 
 * Handles MCP prompt requests for interactive templates.
 * 
 * This is part of STEP 1 of the MCP server architecture:
 * Handlers are registered to the server instance to define
 * the prompts capability and handle prompt requests.
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { getAllPrompts, getPromptByName } from "../prompts/index.js";

/**
 * Register prompts handlers to the MCP server
 * 
 * Registers request handlers for:
 * - ListPromptsRequestSchema: Returns available prompts
 * - GetPromptRequestSchema: Returns prompt content
 * 
 * @param server - The MCP Server instance to register handlers on
 */
export function registerPromptsHandlers(server: Server): void {
  // List available prompts
  server.setRequestHandler(ListPromptsRequestSchema, async () => {
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
  server.setRequestHandler(GetPromptRequestSchema, async (request) => {
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
