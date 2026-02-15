/**
 * Unit tests for MCP abstraction layer
 */

import { describe, it, expect } from 'vitest';
import { MCP_METHODS, getRequestIdentifier } from './mcp.js';

describe('MCP abstraction layer', () => {
  describe('MCP_METHODS', () => {
    it('should have all required tool methods', () => {
      expect(MCP_METHODS.TOOLS_LIST).toBeDefined();
      expect(MCP_METHODS.TOOLS_CALL).toBeDefined();
    });

    it('should have all required resource methods', () => {
      expect(MCP_METHODS.RESOURCES_LIST).toBeDefined();
      expect(MCP_METHODS.RESOURCES_READ).toBeDefined();
    });

    it('should have all required prompt methods', () => {
      expect(MCP_METHODS.PROMPTS_LIST).toBeDefined();
      expect(MCP_METHODS.PROMPTS_GET).toBeDefined();
    });

    it('should have correct method string values', () => {
      expect(MCP_METHODS.TOOLS_LIST.method).toBe('tools/list');
      expect(MCP_METHODS.TOOLS_CALL.method).toBe('tools/call');
      expect(MCP_METHODS.RESOURCES_LIST.method).toBe('resources/list');
      expect(MCP_METHODS.RESOURCES_READ.method).toBe('resources/read');
      expect(MCP_METHODS.PROMPTS_LIST.method).toBe('prompts/list');
      expect(MCP_METHODS.PROMPTS_GET.method).toBe('prompts/get');
    });

    it('should have schema objects for v1', () => {
      expect(MCP_METHODS.TOOLS_LIST.schema).toBeDefined();
      expect(MCP_METHODS.TOOLS_CALL.schema).toBeDefined();
      expect(MCP_METHODS.RESOURCES_LIST.schema).toBeDefined();
      expect(MCP_METHODS.RESOURCES_READ.schema).toBeDefined();
      expect(MCP_METHODS.PROMPTS_LIST.schema).toBeDefined();
      expect(MCP_METHODS.PROMPTS_GET.schema).toBeDefined();
    });
  });

  describe('getRequestIdentifier', () => {
    it('should return schema object for v1', () => {
      const identifier = getRequestIdentifier(MCP_METHODS.TOOLS_LIST);
      
      // In v1, it returns the schema object
      expect(identifier).toBe(MCP_METHODS.TOOLS_LIST.schema);
      expect(identifier).toBeDefined();
    });

    it('should work for all method types', () => {
      const methods = [
        MCP_METHODS.TOOLS_LIST,
        MCP_METHODS.TOOLS_CALL,
        MCP_METHODS.RESOURCES_LIST,
        MCP_METHODS.RESOURCES_READ,
        MCP_METHODS.PROMPTS_LIST,
        MCP_METHODS.PROMPTS_GET,
      ];

      methods.forEach((method) => {
        const identifier = getRequestIdentifier(method);
        expect(identifier).toBeDefined();
        expect(identifier).toBe(method.schema);
      });
    });
  });

  describe('v2 migration readiness', () => {
    it('should have method strings ready for v2', () => {
      // Method strings are already defined and ready for v2 migration
      const methodStrings = [
        MCP_METHODS.TOOLS_LIST.method,
        MCP_METHODS.TOOLS_CALL.method,
        MCP_METHODS.RESOURCES_LIST.method,
        MCP_METHODS.RESOURCES_READ.method,
        MCP_METHODS.PROMPTS_LIST.method,
        MCP_METHODS.PROMPTS_GET.method,
      ];

      // All should be strings in correct format
      methodStrings.forEach((methodStr) => {
        expect(typeof methodStr).toBe('string');
        expect(methodStr).toMatch(/^(tools|resources|prompts)\/(list|call|read|get)$/);
      });
    });

    it('should maintain consistency between method and schema', () => {
      // Each method object should have both method string and schema
      const methods = [
        MCP_METHODS.TOOLS_LIST,
        MCP_METHODS.TOOLS_CALL,
        MCP_METHODS.RESOURCES_LIST,
        MCP_METHODS.RESOURCES_READ,
        MCP_METHODS.PROMPTS_LIST,
        MCP_METHODS.PROMPTS_GET,
      ];

      methods.forEach((method) => {
        expect(method.method).toBeDefined();
        expect(method.schema).toBeDefined();
        expect(typeof method.method).toBe('string');
        expect(typeof method.schema).toBe('object');
      });
    });
  });
});
