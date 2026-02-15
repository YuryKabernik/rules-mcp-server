/**
 * Unit tests for markdownLoader
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { loadRuleFromFile, loadRulesFromDirectory } from './markdownLoader.js';
import fs from 'fs/promises';
import matter from 'gray-matter';

// Mock fs module
vi.mock('fs/promises');

// Mock gray-matter
vi.mock('gray-matter');

describe('markdownLoader', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('loadRuleFromFile', () => {
    it('should load a valid rule from markdown file', async () => {
      const mockFileContent = `---
id: test-rule-001
title: Test Rule
description: A test rule
category: architecture
system: microfrontend
language: typescript
codeType: source
tags:
  - test
  - example
---

# Test Rule Content

This is the rule content.
`;

      const mockParsedData = {
        data: {
          id: 'test-rule-001',
          title: 'Test Rule',
          description: 'A test rule',
          category: 'architecture',
          system: 'microfrontend',
          language: 'typescript',
          codeType: 'source',
          tags: ['test', 'example'],
        },
        content: '\n# Test Rule Content\n\nThis is the rule content.\n',
      };

      vi.mocked(fs.readFile).mockResolvedValue(mockFileContent);
      vi.mocked(matter).mockReturnValue(mockParsedData as any);

      const result = await loadRuleFromFile('/path/to/test.md');

      expect(result).toBeDefined();
      expect(result?.id).toBe('test-rule-001');
      expect(result?.title).toBe('Test Rule');
      expect(result?.description).toBe('A test rule');
      expect(result?.category).toBe('architecture');
      expect(result?.system).toBe('microfrontend');
      expect(result?.language).toBe('typescript');
      expect(result?.codeType).toBe('source');
      expect(result?.tags).toEqual(['test', 'example']);
      expect(result?.content).toContain('Test Rule Content');
    });

    it('should return null for rule missing required fields', async () => {
      const mockFileContent = `---
title: Incomplete Rule
---
Content`;

      const mockParsedData = {
        data: {
          title: 'Incomplete Rule',
          // Missing id, category, system
        },
        content: 'Content',
      };

      vi.mocked(fs.readFile).mockResolvedValue(mockFileContent);
      vi.mocked(matter).mockReturnValue(mockParsedData as any);

      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      const result = await loadRuleFromFile('/path/to/incomplete.md');

      expect(result).toBeNull();
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Invalid rule metadata')
      );

      consoleWarnSpy.mockRestore();
    });

    it('should handle file read errors', async () => {
      vi.mocked(fs.readFile).mockRejectedValue(new Error('File not found'));

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const result = await loadRuleFromFile('/path/to/missing.md');

      expect(result).toBeNull();
      expect(consoleErrorSpy).toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });

    it('should handle optional fields correctly', async () => {
      const mockFileContent = `---
id: minimal-rule
title: Minimal Rule
category: testing
system: microservice
---
Minimal content`;

      const mockParsedData = {
        data: {
          id: 'minimal-rule',
          title: 'Minimal Rule',
          category: 'testing',
          system: 'microservice',
          // No optional fields
        },
        content: 'Minimal content',
      };

      vi.mocked(fs.readFile).mockResolvedValue(mockFileContent);
      vi.mocked(matter).mockReturnValue(mockParsedData as any);

      const result = await loadRuleFromFile('/path/to/minimal.md');

      expect(result).toBeDefined();
      expect(result?.id).toBe('minimal-rule');
      expect(result?.language).toBeUndefined();
      expect(result?.codeType).toBeUndefined();
      expect(result?.tags).toBeUndefined();
    });
  });

  describe('loadRulesFromDirectory', () => {
    it('should load all markdown files from directory', async () => {
      const mockFiles = ['rule1.md', 'rule2.md', 'readme.txt'];
      
      vi.mocked(fs.readdir).mockResolvedValue(mockFiles as any);
      
      const mockRule1Content = `---
id: rule1
title: Rule 1
category: architecture
system: microfrontend
---
Content 1`;

      const mockRule2Content = `---
id: rule2
title: Rule 2
category: performance
system: microfrontend
---
Content 2`;

      vi.mocked(fs.readFile)
        .mockResolvedValueOnce(mockRule1Content)
        .mockResolvedValueOnce(mockRule2Content);

      vi.mocked(matter)
        .mockReturnValueOnce({
          data: {
            id: 'rule1',
            title: 'Rule 1',
            category: 'architecture',
            system: 'microfrontend',
          },
          content: 'Content 1',
        } as any)
        .mockReturnValueOnce({
          data: {
            id: 'rule2',
            title: 'Rule 2',
            category: 'performance',
            system: 'microfrontend',
          },
          content: 'Content 2',
        } as any);

      const results = await loadRulesFromDirectory('/path/to/rules');

      expect(results).toHaveLength(2);
      expect(results[0].id).toBe('rule1');
      expect(results[1].id).toBe('rule2');
    });

    it('should filter out non-markdown files', async () => {
      const mockFiles = ['rule1.md', 'image.png', 'doc.txt'];
      
      vi.mocked(fs.readdir).mockResolvedValue(mockFiles as any);
      
      const mockRuleContent = `---
id: rule1
title: Rule 1
category: architecture
system: microfrontend
---
Content`;

      vi.mocked(fs.readFile).mockResolvedValue(mockRuleContent);

      vi.mocked(matter).mockReturnValue({
        data: {
          id: 'rule1',
          title: 'Rule 1',
          category: 'architecture',
          system: 'microfrontend',
        },
        content: 'Content',
      } as any);

      const results = await loadRulesFromDirectory('/path/to/rules');

      expect(results).toHaveLength(1);
      expect(vi.mocked(fs.readFile)).toHaveBeenCalledTimes(1);
    });

    it('should handle directory read errors', async () => {
      vi.mocked(fs.readdir).mockRejectedValue(new Error('Directory not found'));

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const results = await loadRulesFromDirectory('/path/to/missing');

      expect(results).toEqual([]);
      expect(consoleErrorSpy).toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });

    it('should filter out invalid rules', async () => {
      const mockFiles = ['valid.md', 'invalid.md'];
      
      vi.mocked(fs.readdir).mockResolvedValue(mockFiles as any);
      
      vi.mocked(fs.readFile)
        .mockResolvedValueOnce(`---
id: valid
title: Valid Rule
category: testing
system: microfrontend
---
Valid content`)
        .mockResolvedValueOnce(`---
title: Invalid Rule
---
Invalid content`);

      vi.mocked(matter)
        .mockReturnValueOnce({
          data: {
            id: 'valid',
            title: 'Valid Rule',
            category: 'testing',
            system: 'microfrontend',
          },
          content: 'Valid content',
        } as any)
        .mockReturnValueOnce({
          data: {
            title: 'Invalid Rule',
          },
          content: 'Invalid content',
        } as any);

      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      const results = await loadRulesFromDirectory('/path/to/rules');

      expect(results).toHaveLength(1);
      expect(results[0].id).toBe('valid');

      consoleWarnSpy.mockRestore();
    });
  });
});
