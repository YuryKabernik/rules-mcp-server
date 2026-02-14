/**
 * Microservice Rules
 * 
 * This module loads development rules and best practices for microservice applications
 * from markdown files with frontmatter metadata.
 */

import { Rule, RuleCollection, Language } from "../../types/index.js";
import { loadRulesFromDirectory, getSystemRulesPath } from "../../utils/markdownLoader.js";

// Cache for loaded rules
let cachedRules: Rule[] | null = null;

/**
 * Load rules from markdown files
 */
async function loadRules(): Promise<Rule[]> {
  if (cachedRules === null) {
    const rulesPath = getSystemRulesPath('microservice');
    cachedRules = await loadRulesFromDirectory(rulesPath);
  }
  return cachedRules;
}

/**
 * Get microservice rules by category
 */
export async function getMicroserviceRules(
  category: string = "all",
  language?: string,
  codeType?: string
): Promise<RuleCollection> {
  // Load rules from markdown files
  const allRules = await loadRules();
  
  // Filter rules based on parameters
  let filteredRules = allRules;

  if (category !== "all") {
    filteredRules = filteredRules.filter(rule => rule.category === category);
  }

  if (language) {
    filteredRules = filteredRules.filter(
      rule => !rule.language || rule.language === language
    );
  }

  if (codeType) {
    filteredRules = filteredRules.filter(
      rule => !rule.codeType || rule.codeType === codeType
    );
  }

  return {
    system: "microservice",
    language: language as Language | undefined,
    rules: filteredRules,
  };
}

export default { getMicroserviceRules };
