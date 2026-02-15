/**
 * Tools Handler
 * 
 * Handles MCP tool requests for getting development rules.
 * 
 * This is part of STEP 1 of the MCP server architecture:
 * Handlers are registered to the server instance to define
 * the tools capability and handle tool execution requests.
 */

import { McpServer, MCP_METHODS, getRequestIdentifier } from "../types/mcp.js";
import { getRules, formatRulesAsText } from "../rules/index.js";
import { GetRulesInput } from "../types/index.js";

/**
 * Register tools handlers to the MCP server
 * 
 * Registers request handlers for:
 * - TOOLS_LIST: Returns available tools
 * - TOOLS_CALL: Executes tool requests
 * 
 * @param server - The MCP Server instance to register handlers on
 */
export function registerToolsHandlers(server: McpServer): void {
  // List available tools
  server.setRequestHandler(getRequestIdentifier(MCP_METHODS.TOOLS_LIST), async () => {
    return {
      tools: [
        {
          name: "get-microfrontend-rules",
          description: "Get development rules and best practices for microfrontend applications",
          inputSchema: {
            type: "object",
            properties: {
              category: {
                type: "string",
                description: "Category of rules",
                enum: ["architecture", "performance", "security", "testing", "all"],
              },
              language: {
                type: "string",
                description: "Programming language",
                enum: ["typescript", "javascript", "python", "java", "go", "rust"],
              },
              codeType: {
                type: "string",
                description: "Type of code",
                enum: ["source", "test"],
              },
            },
            required: [],
          },
        },
        {
          name: "get-microservice-rules",
          description: "Get development rules and best practices for microservice applications",
          inputSchema: {
            type: "object",
            properties: {
              category: {
                type: "string",
                description: "Category of rules",
                enum: ["architecture", "performance", "security", "testing", "all"],
              },
              language: {
                type: "string",
                description: "Programming language",
                enum: ["typescript", "javascript", "python", "java", "go", "rust"],
              },
              codeType: {
                type: "string",
                description: "Type of code",
                enum: ["source", "test"],
              },
            },
            required: [],
          },
        },
      ],
    };
  });

  // Handle tool calls
  server.setRequestHandler(getRequestIdentifier(MCP_METHODS.TOOLS_CALL), async (request) => {
    const { name, arguments: args } = request.params;

    if (name === "get-microfrontend-rules") {
      const { category, language, codeType } = args as GetRulesInput;
      const rules = await getRules("microfrontend", category, language, codeType);
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

    if (name === "get-microservice-rules") {
      const { category, language, codeType } = args as GetRulesInput;
      const rules = await getRules("microservice", category, language, codeType);
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

    throw new Error(`Unknown tool: ${name}`);
  });
}
