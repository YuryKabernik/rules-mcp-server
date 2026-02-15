/**
 * Tools Registry
 * 
 * Loads and manages MCP tools from markdown files.
 * Tools are defined in content/tools/ directory with frontmatter metadata.
 */

import path from "path";
import { fileURLToPath } from "url";
import {
  loadMarkdownDirectory,
  validateFrontmatter,
  ContentItem,
} from "../utils/contentLoader.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TOOLS_DIR = path.join(__dirname, "../../content/tools");

/**
 * Tool frontmatter metadata
 */
export interface ToolMetadata {
  name: string;
  description: string;
  system?: string;
  inputSchema: {
    type: string;
    properties?: Record<string, any>;
    required?: string[];
    [key: string]: any;
  };
}

/**
 * Tool definition with metadata and content
 */
export interface Tool {
  name: string;
  description: string;
  system?: string;
  inputSchema: Record<string, any>;
  content: string;
}

// Cache for loaded tools
let toolsCache: Tool[] | null = null;

/**
 * Load all tools from markdown files
 * 
 * @returns Array of tool definitions
 */
export async function loadTools(): Promise<Tool[]> {
  // Return cached tools if available
  if (toolsCache) {
    return toolsCache;
  }

  const contentItems = await loadMarkdownDirectory<ToolMetadata>(TOOLS_DIR);
  const tools: Tool[] = [];

  for (const item of contentItems) {
    try {
      // Validate required fields
      validateFrontmatter(
        item.data,
        ["name", "description", "inputSchema"],
        item.filePath
      );

      tools.push({
        name: item.data.name,
        description: item.data.description,
        system: item.data.system,
        inputSchema: item.data.inputSchema,
        content: item.content,
      });
    } catch (error) {
      console.warn(`Skipping invalid tool file: ${item.filePath}`, error);
    }
  }

  // Cache the loaded tools
  toolsCache = tools;
  return tools;
}

/**
 * Get all available tools
 * 
 * @returns Array of tool definitions (without content)
 */
export async function getAllTools(): Promise<Array<{
  name: string;
  description: string;
  inputSchema: Record<string, any>;
}>> {
  const tools = await loadTools();
  return tools.map(tool => ({
    name: tool.name,
    description: tool.description,
    inputSchema: tool.inputSchema,
  }));
}

/**
 * Get tool by name
 * 
 * @param name - Tool name
 * @returns Tool definition or undefined if not found
 */
export async function getToolByName(name: string): Promise<Tool | undefined> {
  const tools = await loadTools();
  return tools.find(tool => tool.name === name);
}

/**
 * Clear the tools cache (useful for testing)
 */
export function clearToolsCache(): void {
  toolsCache = null;
}
