/**
 * Prompts Handler
 *
 * Handles MCP prompt requests for interactive templates.
 * Prompts are loaded from markdown files in content/prompts/
 *
 * This is part of STEP 1 of the MCP server architecture:
 * Handlers are registered to the server instance to define
 * the prompts capability and handle prompt requests.
 */

import { getAllPrompts } from '../prompts/index.js';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { GetPromptResult } from '@modelcontextprotocol/sdk/types.js';
import * as z from 'zod/v4';

/**
 * Register prompts handlers to the MCP server
 *
 * Registers request handlers for:
 * - PROMPTS_LIST: Returns available prompts (loaded from markdown)
 * - PROMPTS_GET: Returns prompt content
 *
 * @param server - The MCP Server instance to register handlers on
 */
export async function registerPromptsHandlers(server: McpServer): Promise<void> {
  // List available prompts - loaded from markdown files
  const prompts = await getAllPrompts();

  prompts.forEach((prompt) => {
    server.registerPrompt(
      prompt.name,
      {
        title: prompt.name,
        description: prompt.description,
        argsSchema: {
          ...Object.fromEntries(
            (prompt.arguments || []).map((arg) => [
              arg.name,
              (arg.required ? z.string() : z.string().optional()).describe(arg.description),
            ])
          ),
        },
      },
      async (args): Promise<GetPromptResult> => {
        const filteredArgs: Record<string, string> = {};
        for (const [key, value] of Object.entries(args || {})) {
          if (value !== undefined) {
            filteredArgs[key] = value;
          }
        }
        const text = prompt.template(filteredArgs);

        return {
          messages: [
            {
              role: 'user',
              content: {
                type: 'text',
                text,
              },
            },
          ],
        };
      }
    );
  });
}
