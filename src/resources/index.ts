/**
 * Resources Registry
 * 
 * Loads and manages documentation resources from markdown files.
 * Resources are defined in content/resources/ directory with frontmatter metadata.
 */

import path from "path";
import { fileURLToPath } from "url";
import {
  loadMarkdownDirectory,
  validateFrontmatter,
} from "../utils/contentLoader.js";
import { Resource } from "../types/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RESOURCES_DIR = path.join(__dirname, "../../content/resources");

/**
 * Resource frontmatter metadata
 */
export interface ResourceMetadata {
  uri: string;
  name: string;
  description: string;
  mimeType: string;
}

// Cache for loaded resources
let resourcesCache: Resource[] | null = null;

/**
 * Load all resources from markdown files
 * 
 * @returns Array of resource definitions
 */
export async function loadResources(): Promise<Resource[]> {
  // Return cached resources if available
  if (resourcesCache) {
    return resourcesCache;
  }

  const contentItems = await loadMarkdownDirectory<ResourceMetadata>(RESOURCES_DIR);
  const resources: Resource[] = [];

  for (const item of contentItems) {
    try {
      // Validate required fields
      validateFrontmatter(
        item.data,
        ["uri", "name", "description", "mimeType"],
        item.filePath
      );

      resources.push({
        uri: item.data.uri,
        name: item.data.name,
        description: item.data.description,
        mimeType: item.data.mimeType,
        content: item.content,
      });
    } catch (error) {
      console.warn(`Skipping invalid resource file: ${item.filePath}`, error);
    }
  }

  // Cache the loaded resources
  resourcesCache = resources;
  return resources;
}

/**
 * Get all resources
 */
export async function getAllResources(): Promise<Resource[]> {
  return await loadResources();
}

/**
 * Get resource by URI
 */
export async function getResourceByUri(uri: string): Promise<Resource | undefined> {
  const resources = await loadResources();
  return resources.find(r => r.uri === uri);
}

/**
 * Clear the resources cache (useful for testing)
 */
export function clearResourcesCache(): void {
  resourcesCache = null;
}
