#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListPromptsRequestSchema,
  ReadResourceRequestSchema,
  GetPromptRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

/**
 * MCP Server for Microfrontend and Microservice Development Rules
 * 
 * This server provides:
 * - Rules (via tools) for development best practices
 * - Resources for documentation and guides
 * - Prompts for common development scenarios
 */

// Server instance
const server = new Server(
  {
    name: "rules-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
      resources: {},
      prompts: {},
    },
  }
);

/**
 * Tools Handler - Returns development rules
 * Tools will be used to provide rules for microfrontend and microservice development
 */
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
              description: "Category of rules (e.g., 'architecture', 'performance', 'security')",
              enum: ["architecture", "performance", "security", "testing", "all"],
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
              description: "Category of rules (e.g., 'architecture', 'performance', 'security')",
              enum: ["architecture", "performance", "security", "testing", "all"],
            },
          },
          required: [],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "get-microfrontend-rules") {
    const category = (args as { category?: string }).category || "all";
    return {
      content: [
        {
          type: "text",
          text: `Microfrontend Rules - Category: ${category}\n\n` +
                `(Rules will be added here)\n\n` +
                `This is a placeholder for microfrontend development rules.`,
        },
      ],
    };
  }

  if (name === "get-microservice-rules") {
    const category = (args as { category?: string }).category || "all";
    return {
      content: [
        {
          type: "text",
          text: `Microservice Rules - Category: ${category}\n\n` +
                `(Rules will be added here)\n\n` +
                `This is a placeholder for microservice development rules.`,
        },
      ],
    };
  }

  throw new Error(`Unknown tool: ${name}`);
});

/**
 * Resources Handler - Provides documentation and guides
 */
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "rules://microfrontend/architecture",
        name: "Microfrontend Architecture Guide",
        description: "Comprehensive guide on microfrontend architecture patterns",
        mimeType: "text/markdown",
      },
      {
        uri: "rules://microservice/architecture",
        name: "Microservice Architecture Guide",
        description: "Comprehensive guide on microservice architecture patterns",
        mimeType: "text/markdown",
      },
      {
        uri: "rules://best-practices/general",
        name: "General Best Practices",
        description: "General development best practices for distributed systems",
        mimeType: "text/markdown",
      },
    ],
  };
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  if (uri === "rules://microfrontend/architecture") {
    return {
      contents: [
        {
          uri,
          mimeType: "text/markdown",
          text: `# Microfrontend Architecture Guide

(Content will be added here)

This is a placeholder for microfrontend architecture documentation.`,
        },
      ],
    };
  }

  if (uri === "rules://microservice/architecture") {
    return {
      contents: [
        {
          uri,
          mimeType: "text/markdown",
          text: `# Microservice Architecture Guide

(Content will be added here)

This is a placeholder for microservice architecture documentation.`,
        },
      ],
    };
  }

  if (uri === "rules://best-practices/general") {
    return {
      contents: [
        {
          uri,
          mimeType: "text/markdown",
          text: `# General Best Practices

(Content will be added here)

This is a placeholder for general best practices documentation.`,
        },
      ],
    };
  }

  throw new Error(`Resource not found: ${uri}`);
});

/**
 * Prompts Handler - Provides templates for common scenarios
 */
server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: [
      {
        name: "design-microfrontend",
        description: "Help design a new microfrontend application",
        arguments: [
          {
            name: "app_name",
            description: "Name of the microfrontend application",
            required: true,
          },
          {
            name: "framework",
            description: "Frontend framework (React, Vue, Angular, etc.)",
            required: false,
          },
        ],
      },
      {
        name: "design-microservice",
        description: "Help design a new microservice",
        arguments: [
          {
            name: "service_name",
            description: "Name of the microservice",
            required: true,
          },
          {
            name: "technology",
            description: "Technology stack (Node.js, Java, Python, etc.)",
            required: false,
          },
        ],
      },
      {
        name: "review-architecture",
        description: "Review and provide feedback on application architecture",
        arguments: [
          {
            name: "architecture_type",
            description: "Type of architecture (microfrontend, microservice, monolith)",
            required: true,
          },
        ],
      },
    ],
  };
});

server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "design-microfrontend") {
    const appName = (args as { app_name?: string }).app_name || "my-app";
    const framework = (args as { framework?: string }).framework || "React";

    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Help me design a microfrontend application named "${appName}" using ${framework}.

Please provide:
1. Architecture overview
2. Key design decisions
3. Best practices to follow
4. Common pitfalls to avoid

(Detailed prompt content will be added here)`,
          },
        },
      ],
    };
  }

  if (name === "design-microservice") {
    const serviceName = (args as { service_name?: string }).service_name || "my-service";
    const technology = (args as { technology?: string }).technology || "Node.js";

    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Help me design a microservice named "${serviceName}" using ${technology}.

Please provide:
1. Service architecture
2. API design
3. Data management strategy
4. Integration patterns
5. Best practices

(Detailed prompt content will be added here)`,
          },
        },
      ],
    };
  }

  if (name === "review-architecture") {
    const architectureType = (args as { architecture_type?: string }).architecture_type || "microfrontend";

    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Review my ${architectureType} architecture and provide feedback.

Please analyze:
1. Architecture patterns used
2. Scalability considerations
3. Security aspects
4. Performance implications
5. Maintainability

(Detailed prompt content will be added here)`,
          },
        },
      ],
    };
  }

  throw new Error(`Unknown prompt: ${name}`);
});

/**
 * Start the server
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Rules MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
