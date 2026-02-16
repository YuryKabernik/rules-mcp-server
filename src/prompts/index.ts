/**
 * Prompts Registry
 * 
 * Loads and manages prompt templates from markdown files.
 * Prompts are defined in content/prompts/ directory with frontmatter metadata.
 */

import path from "path";
import { fileURLToPath } from "url";
import {
  loadMarkdownDirectory,
  validateFrontmatter,
} from "../utils/contentLoader.js";
import { PromptTemplate } from "../types/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROMPTS_DIR = path.join(__dirname, "../../content/prompts");

/**
 * Prompt frontmatter metadata
 */
export interface PromptMetadata {
  name: string;
  description: string;
  arguments: Array<{
    name: string;
    description: string;
    required: boolean;
  }>;
}

// Cache for loaded prompts
let promptsCache: PromptTemplate[] | null = null;

/**
 * Process template string with argument substitution
 * Supports {{variable}} and {{variable|default}} syntax
 * 
 * @param template - Template string
 * @param args - Argument values
 * @returns Processed template
 */
function processTemplate(template: string, args: Record<string, string>): string {
  let result = template;
  
  // Replace {{variable|default}} patterns
  result = result.replace(/\{\{(\w+)\|([^}]+)\}\}/g, (match, varName, defaultValue) => {
    return args[varName] || defaultValue;
  });
  
  // Replace {{variable}} patterns
  result = result.replace(/\{\{(\w+)\}\}/g, (match, varName) => {
    return args[varName] || match;
  });
  
  // Handle {{#if condition}} blocks (simple implementation)
  result = result.replace(/\{\{#if (\w+)\}\}([\s\S]*?)\{\{\/if\}\}/g, (match, varName, content) => {
    return args[varName] ? content : "";
  });
  
  return result;
}

/**
 * Load all prompts from markdown files
 * 
 * @returns Array of prompt templates
 */
export async function loadPrompts(): Promise<PromptTemplate[]> {
  // Return cached prompts if available
  if (promptsCache) {
    return promptsCache;
  }

  const contentItems = await loadMarkdownDirectory<PromptMetadata>(PROMPTS_DIR);
  const prompts: PromptTemplate[] = [];

  for (const item of contentItems) {
    try {
      // Validate required fields
      validateFrontmatter(
        item.data,
        ["name", "description", "arguments"],
        item.filePath
      );

      const templateContent = item.content;

      prompts.push({
        name: item.data.name,
        description: item.data.description,
        arguments: item.data.arguments,
        template: (args: Record<string, string>) => {
          return processTemplate(templateContent, args);
        },
      });
    } catch (error) {
      console.warn(`Skipping invalid prompt file: ${item.filePath}`, error);
    }
  }

  // Cache the loaded prompts
  promptsCache = prompts;
  return prompts;
}

/**
 * Get all prompts
 */
export async function getAllPrompts(): Promise<PromptTemplate[]> {
  return await loadPrompts();
}

/**
 * Get prompt by name
 */
export async function getPromptByName(name: string): Promise<PromptTemplate | undefined> {
  const prompts = await loadPrompts();
  return prompts.find(p => p.name === name);
}

/**
 * Clear the prompts cache (useful for testing)
 */
export function clearPromptsCache(): void {
  promptsCache = null;
}
