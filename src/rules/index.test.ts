/**
 * Unit tests for rules registry
 */

import { describe, it, expect, vi } from 'vitest';
import { getRules, formatRulesAsText } from './index.js';
import { RuleCollection } from '../types/index.js';

// Mock the rule loaders
vi.mock('./microfrontend/index.js', () => ({
  getMicrofrontendRules: vi.fn(),
}));

vi.mock('./microservice/index.js', () => ({
  getMicroserviceRules: vi.fn(),
}));

import { getMicrofrontendRules } from './microfrontend/index.js';
import { getMicroserviceRules } from './microservice/index.js';

describe('rules registry', () => {
  describe('getRules', () => {
    it('should get microfrontend rules', async () => {
      const mockCollection: RuleCollection = {
        system: 'microfrontend',
        rules: [
          {
            id: 'mfe-001',
            title: 'Test MFE Rule',
            description: 'Test description',
            category: 'architecture',
            system: 'microfrontend',
            content: 'Test content',
          },
        ],
      };

      vi.mocked(getMicrofrontendRules).mockResolvedValue(mockCollection);

      const result = await getRules('microfrontend');

      expect(result).toEqual(mockCollection);
      expect(getMicrofrontendRules).toHaveBeenCalledWith(undefined, undefined, undefined);
    });

    it('should get microservice rules', async () => {
      const mockCollection: RuleCollection = {
        system: 'microservice',
        rules: [
          {
            id: 'ms-001',
            title: 'Test MS Rule',
            description: 'Test description',
            category: 'architecture',
            system: 'microservice',
            content: 'Test content',
          },
        ],
      };

      vi.mocked(getMicroserviceRules).mockResolvedValue(mockCollection);

      const result = await getRules('microservice');

      expect(result).toEqual(mockCollection);
      expect(getMicroserviceRules).toHaveBeenCalledWith(undefined, undefined, undefined);
    });

    it('should pass filter parameters correctly', async () => {
      const mockCollection: RuleCollection = {
        system: 'microfrontend',
        language: 'typescript',
        rules: [],
      };

      vi.mocked(getMicrofrontendRules).mockResolvedValue(mockCollection);

      await getRules('microfrontend', 'architecture', 'typescript', 'source');

      expect(getMicrofrontendRules).toHaveBeenCalledWith('architecture', 'typescript', 'source');
    });

    it('should throw error for unknown system', async () => {
      await expect(
        getRules('unknown' as any)
      ).rejects.toThrow('Unknown system: unknown');
    });
  });

  describe('formatRulesAsText', () => {
    it('should format rules collection with multiple rules', () => {
      const collection: RuleCollection = {
        system: 'microfrontend',
        language: 'typescript',
        rules: [
          {
            id: 'mfe-001',
            title: 'Rule One',
            description: 'First rule',
            category: 'architecture',
            system: 'microfrontend',
            language: 'typescript',
            codeType: 'source',
            tags: ['webpack', 'module-federation'],
            content: '# Rule One Content\n\nDetailed content here.',
          },
          {
            id: 'mfe-002',
            title: 'Rule Two',
            description: 'Second rule',
            category: 'performance',
            system: 'microfrontend',
            content: '# Rule Two Content',
          },
        ],
      };

      const result = formatRulesAsText(collection);

      // Check title
      expect(result).toContain('# Microfrontend Rules');
      
      // Check language
      expect(result).toContain('Language: typescript');
      
      // Check rule count
      expect(result).toContain('Found 2 rule(s)');
      
      // Check first rule
      expect(result).toContain('## 1. Rule One');
      expect(result).toContain('**ID:** mfe-001');
      expect(result).toContain('**Category:** architecture');
      expect(result).toContain('**Language:** typescript');
      expect(result).toContain('**Code Type:** source');
      expect(result).toContain('**Tags:** webpack, module-federation');
      expect(result).toContain('First rule');
      expect(result).toContain('# Rule One Content');
      
      // Check second rule
      expect(result).toContain('## 2. Rule Two');
      expect(result).toContain('**ID:** mfe-002');
      expect(result).toContain('**Category:** performance');
      expect(result).toContain('Second rule');
    });

    it('should format empty collection', () => {
      const collection: RuleCollection = {
        system: 'microservice',
        rules: [],
      };

      const result = formatRulesAsText(collection);

      expect(result).toContain('# Microservice Rules');
      expect(result).toContain('No rules found matching the criteria');
    });

    it('should handle collection without language', () => {
      const collection: RuleCollection = {
        system: 'microfrontend',
        rules: [
          {
            id: 'test-001',
            title: 'Test Rule',
            description: 'Test',
            category: 'testing',
            system: 'microfrontend',
            content: 'Content',
          },
        ],
      };

      const result = formatRulesAsText(collection);

      expect(result).toContain('# Microfrontend Rules');
      expect(result).not.toContain('Language:');
      expect(result).toContain('Found 1 rule(s)');
    });

    it('should handle rules without optional fields', () => {
      const collection: RuleCollection = {
        system: 'microservice',
        rules: [
          {
            id: 'minimal',
            title: 'Minimal Rule',
            description: 'Minimal',
            category: 'testing',
            system: 'microservice',
            content: 'Minimal content',
          },
        ],
      };

      const result = formatRulesAsText(collection);

      expect(result).toContain('## 1. Minimal Rule');
      expect(result).toContain('**ID:** minimal');
      expect(result).toContain('**Category:** testing');
      expect(result).not.toContain('**Language:**');
      expect(result).not.toContain('**Code Type:**');
      expect(result).not.toContain('**Tags:**');
    });

    it('should capitalize system name correctly', () => {
      const mfeCollection: RuleCollection = {
        system: 'microfrontend',
        rules: [],
      };

      const msCollection: RuleCollection = {
        system: 'microservice',
        rules: [],
      };

      expect(formatRulesAsText(mfeCollection)).toContain('# Microfrontend Rules');
      expect(formatRulesAsText(msCollection)).toContain('# Microservice Rules');
    });
  });
});
