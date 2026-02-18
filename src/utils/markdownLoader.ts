/**
 * Markdown Loader Utility
 *
 * Loads and parses markdown files with frontmatter metadata.
 */

import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';
import { Rule } from '../types/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Load all markdown rules from a directory
 */
export async function loadRulesFromDirectory(dirPath: string): Promise<Rule[]> {
  try {
    const files = await fs.readdir(dirPath);
    const mdFiles = files.filter((file) => file.endsWith('.md'));

    const rules = await Promise.all(
      mdFiles.map(async (file) => {
        const filePath = path.join(dirPath, file);
        return await loadRuleFromFile(filePath);
      })
    );

    return rules.filter((rule): rule is Rule => rule !== null);
  } catch (error) {
    console.error(`Error loading rules from ${dirPath}:`, error);
    return [];
  }
}

/**
 * Load a single rule from a markdown file
 */
export async function loadRuleFromFile(filePath: string): Promise<Rule | null> {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    // Validate required fields
    if (!data.id || !data.title || !data.category || !data.system) {
      console.warn(`Invalid rule metadata in ${filePath}`);
      return null;
    }

    // Build the rule object
    const rule: Rule = {
      id: data.id,
      title: data.title,
      description: data.description || '',
      category: data.category,
      system: data.system,
      content: content.trim(),
    };

    // Add optional fields
    if (data.language) {
      rule.language = data.language;
    }

    if (data.codeType) {
      rule.codeType = data.codeType;
    }

    if (data.tags && Array.isArray(data.tags)) {
      rule.tags = data.tags;
    }

    if (data.examples && Array.isArray(data.examples)) {
      rule.examples = data.examples;
    }

    return rule;
  } catch (error) {
    console.error(`Error loading rule from ${filePath}:`, error);
    return null;
  }
}

/**
 * Get the path to the rules directory
 */
export function getRulesPath(): string {
  // Go up from src/utils to project root, then to content/rules
  return path.resolve(__dirname, '../../content/rules');
}

/**
 * Get the path to a specific system's rules directory
 */
export function getSystemRulesPath(system: string): string {
  return path.join(getRulesPath(), system);
}
