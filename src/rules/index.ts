/**
 * Rules Registry
 * 
 * Central registry for all rules in the system.
 * This module exports functions to retrieve rules by system type.
 */

import { getMicrofrontendRules } from "./microfrontend/index.js";
import { getMicroserviceRules } from "./microservice/index.js";
import { RuleCollection } from "../types/index.js";

/**
 * Get rules for a specific system
 */
export function getRules(
  system: "microfrontend" | "microservice",
  category?: string,
  language?: string,
  codeType?: string
): RuleCollection {
  switch (system) {
    case "microfrontend":
      return getMicrofrontendRules(category, language, codeType);
    case "microservice":
      return getMicroserviceRules(category, language, codeType);
    default:
      throw new Error(`Unknown system: ${system}`);
  }
}

/**
 * Format rules as text output
 */
export function formatRulesAsText(collection: RuleCollection): string {
  const { system, language, rules } = collection;
  
  let output = `# ${system.charAt(0).toUpperCase() + system.slice(1)} Rules\n\n`;
  
  if (language) {
    output += `Language: ${language}\n\n`;
  }
  
  if (rules.length === 0) {
    output += "No rules found matching the criteria.\n";
    return output;
  }
  
  output += `Found ${rules.length} rule(s):\n\n`;
  
  rules.forEach((rule, index) => {
    output += `## ${index + 1}. ${rule.title}\n\n`;
    output += `**ID:** ${rule.id}\n`;
    output += `**Category:** ${rule.category}\n`;
    if (rule.language) {
      output += `**Language:** ${rule.language}\n`;
    }
    if (rule.codeType) {
      output += `**Code Type:** ${rule.codeType}\n`;
    }
    if (rule.tags && rule.tags.length > 0) {
      output += `**Tags:** ${rule.tags.join(", ")}\n`;
    }
    output += `\n${rule.description}\n\n`;
    output += `${rule.content}\n\n`;
    output += "---\n\n";
  });
  
  return output;
}

// Export individual rule getters for convenience
export { getMicrofrontendRules, getMicroserviceRules };
