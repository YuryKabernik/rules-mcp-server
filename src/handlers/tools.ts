/**
 * Tools Handler
 * 
 * Handles MCP tool requests for getting development rules.
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { getRules, formatRulesAsText } from "../rules/index.js";
import { GetRulesInput } from "../types/index.js";

/**
 * Register tools handlers
 */
export function registerToolsHandlers(server: Server): void {
  // List available tools
  server.setRequestHandler(ListToolsRequestSchema, async () => {
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
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    if (name === "get-microfrontend-rules") {
      const { category, language, codeType } = args as GetRulesInput;
      const rules = getRules("microfrontend", category, language, codeType);
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
      const rules = getRules("microservice", category, language, codeType);
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
