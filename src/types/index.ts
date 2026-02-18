/**
 * Type definitions for the Rules MCP Server
 */

/**
 * Category of rules for filtering
 */
export type RuleCategoryFilter = 'architecture' | 'performance' | 'security' | 'testing' | 'all';

/**
 * Category of rules (for rule definitions - excludes "all")
 */
export type RuleCategory = 'architecture' | 'performance' | 'security' | 'testing';

/**
 * Project system type
 */
export type ProjectSystem = 'microfrontend' | 'microservice';

/**
 * Programming language
 */
export type Language = 'typescript' | 'javascript' | 'python' | 'java' | 'go' | 'rust';

/**
 * Code type
 */
export type CodeType = 'source' | 'test';

/**
 * Rule definition
 */
export interface Rule {
  id: string;
  title: string;
  description: string;
  category: RuleCategory;
  system: ProjectSystem;
  language?: Language;
  codeType?: CodeType;
  content: string;
  examples?: string[];
  tags?: string[];
}

/**
 * Rule collection for a specific context
 */
export interface RuleCollection {
  system: ProjectSystem;
  language?: Language;
  rules: Rule[];
}

/**
 * Resource definition
 */
export interface Resource {
  uri: string;
  name: string;
  description: string;
  mimeType: string;
  content: string;
}

/**
 * Prompt template definition
 */
export interface PromptTemplate {
  name: string;
  description: string;
  arguments: Array<{
    name: string;
    description: string;
    required: boolean;
  }>;
  template: (args: Record<string, string>) => string;
}

/**
 * Tool input schema for getting rules
 */
export interface GetRulesInput {
  category?: RuleCategoryFilter;
  language?: Language;
  codeType?: CodeType;
}
