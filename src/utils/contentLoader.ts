/**
 * Content Loader
 * 
 * Generic utility for loading markdown content with frontmatter metadata.
 * Used for loading tools, prompts, and resources from markdown files.
 */

import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

/**
 * Generic content item with frontmatter data
 */
export interface ContentItem<T = Record<string, any>> {
  /** Frontmatter metadata */
  data: T;
  /** Markdown content (without frontmatter) */
  content: string;
  /** Original file path */
  filePath: string;
}

/**
 * Load a single markdown file with frontmatter
 * 
 * @param filePath - Path to the markdown file
 * @returns Parsed content with frontmatter data and markdown content
 */
export async function loadMarkdownFile<T = Record<string, any>>(
  filePath: string
): Promise<ContentItem<T>> {
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    
    return {
      data: data as T,
      content: content.trim(),
      filePath,
    };
  } catch (error) {
    throw new Error(`Failed to load markdown file ${filePath}: ${error}`);
  }
}

/**
 * Load all markdown files from a directory
 * 
 * @param dirPath - Path to the directory containing markdown files
 * @param recursive - Whether to search subdirectories (default: false)
 * @returns Array of parsed content items
 */
export async function loadMarkdownDirectory<T = Record<string, any>>(
  dirPath: string,
  recursive: boolean = false
): Promise<ContentItem<T>[]> {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    const contentItems: ContentItem<T>[] = [];

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory() && recursive) {
        // Recursively load from subdirectories
        const subItems = await loadMarkdownDirectory<T>(fullPath, recursive);
        contentItems.push(...subItems);
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        // Load markdown file
        try {
          const item = await loadMarkdownFile<T>(fullPath);
          contentItems.push(item);
        } catch (error) {
          console.warn(`Skipping invalid markdown file: ${fullPath}`, error);
        }
      }
    }

    return contentItems;
  } catch (error) {
    throw new Error(`Failed to load markdown directory ${dirPath}: ${error}`);
  }
}

/**
 * Validate that required fields exist in frontmatter
 * 
 * @param data - Frontmatter data object
 * @param requiredFields - Array of required field names
 * @param filePath - File path for error messages
 * @throws Error if required fields are missing
 */
export function validateFrontmatter(
  data: Record<string, any>,
  requiredFields: string[],
  filePath: string
): void {
  const missingFields = requiredFields.filter(field => !(field in data));
  
  if (missingFields.length > 0) {
    throw new Error(
      `Missing required frontmatter fields in ${filePath}: ${missingFields.join(", ")}`
    );
  }
}
