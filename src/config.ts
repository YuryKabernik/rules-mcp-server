/**
 * Configuration Module
 * 
 * Manages server configuration including content directory path.
 * The content path can be set via environment variable or programmatically.
 */

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Server configuration
 */
interface ServerConfig {
  /** Path to the content directory containing prompts and rules */
  contentPath: string;
}

let config: ServerConfig | null = null;

/**
 * Get the current configuration
 * If not set, returns default configuration
 */
export function getConfig(): ServerConfig {
  if (!config) {
    // Default to content directory in project root
    const defaultContentPath = path.resolve(__dirname, "../content");
    
    config = {
      contentPath: process.env.MCP_CONTENT_PATH || defaultContentPath,
    };
  }
  
  return config;
}

/**
 * Set the content directory path
 * 
 * @param contentPath - Absolute or relative path to the content directory
 */
export function setContentPath(contentPath: string): void {
  if (!config) {
    config = getConfig();
  }
  
  // Resolve to absolute path
  config.contentPath = path.resolve(contentPath);
}

/**
 * Get the path to the prompts directory
 */
export function getPromptsPath(): string {
  return path.join(getConfig().contentPath, "prompts");
}

/**
 * Get the path to the rules directory
 */
export function getRulesPath(): string {
  return path.join(getConfig().contentPath, "rules");
}

/**
 * Get the path to a specific system's rules directory
 * 
 * @param system - System name (e.g., "microfrontend", "microservice")
 */
export function getSystemRulesPath(system: string): string {
  return path.join(getRulesPath(), system);
}

/**
 * Reset configuration to defaults (useful for testing)
 */
export function resetConfig(): void {
  config = null;
}
