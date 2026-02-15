/**
 * Unit tests for resources registry
 */

import { describe, it, expect } from 'vitest';
import { getResourceByUri, getAllResources } from './index.js';

describe('resources registry', () => {
  describe('listResources', () => {
    it('should return all available resources', () => {
      const resources = getAllResources();

      expect(resources).toBeInstanceOf(Array);
      expect(resources.length).toBeGreaterThan(0);
    });

    it('should include microfrontend guide', () => {
      const resources = getAllResources();
      const mfeGuide = resources.find(r => r.uri === 'rules://microfrontend/architecture');

      expect(mfeGuide).toBeDefined();
      expect(mfeGuide?.name).toContain('Microfrontend');
      expect(mfeGuide?.mimeType).toBe('text/markdown');
    });

    it('should include microservice guide', () => {
      const resources = getAllResources();
      const msGuide = resources.find(r => r.uri === 'rules://microservice/architecture');

      expect(msGuide).toBeDefined();
      expect(msGuide?.name).toContain('Microservice');
      expect(msGuide?.mimeType).toBe('text/markdown');
    });

    it('should include best practices guide', () => {
      const resources = getAllResources();
      const bpGuide = resources.find(r => r.uri === 'rules://best-practices/general');

      expect(bpGuide).toBeDefined();
      expect(bpGuide?.name).toContain('Best Practices');
    });

    it('should have correct mime types', () => {
      const resources = getAllResources();

      resources.forEach(resource => {
        expect(resource.mimeType).toBe('text/markdown');
      });
    });

    it('should have unique URIs', () => {
      const resources = getAllResources();
      const uris = resources.map(r => r.uri);
      const uniqueUris = new Set(uris);

      expect(uris.length).toBe(uniqueUris.size);
    });
  });

  describe('getResourceByUri', () => {
    it('should get resource by URI', () => {
      const resource = getResourceByUri('rules://microfrontend/architecture');

      expect(resource).toBeDefined();
      expect(resource?.uri).toBe('rules://microfrontend/architecture');
      expect(resource?.content).toBeDefined();
      expect(resource?.content.length).toBeGreaterThan(0);
    });

    it('should return undefined for non-existent resource', () => {
      const resource = getResourceByUri('rules://non-existent');

      expect(resource).toBeUndefined();
    });

    it('should return microfrontend guide with content', () => {
      const resource = getResourceByUri('rules://microfrontend/architecture');

      expect(resource).toBeDefined();
      expect(resource?.content).toContain('Microfrontend');
      expect(resource?.content).toContain('Module Federation');
    });

    it('should return microservice guide with content', () => {
      const resource = getResourceByUri('rules://microservice/architecture');

      expect(resource).toBeDefined();
      expect(resource?.content).toContain('Microservice');
      expect(resource?.content).toContain('API Gateway');
    });

    it('should return best practices guide with content', () => {
      const resource = getResourceByUri('rules://best-practices/general');

      expect(resource).toBeDefined();
      expect(resource?.content).toContain('Best Practices');
      expect(resource?.content).toContain('Code Quality');
    });
  });

  describe('resource content', () => {
    it('should have markdown formatted content', () => {
      const resources = getAllResources();

      resources.forEach(resourceMeta => {
        const resource = getResourceByUri(resourceMeta.uri);
        expect(resource).toBeDefined();
        
        if (resource) {
          // Should contain markdown headers
          expect(resource.content).toMatch(/#+ /);
          // Should be substantial
          expect(resource.content.length).toBeGreaterThan(100);
        }
      });
    });

    it('should include technical details in microfrontend guide', () => {
      const resource = getResourceByUri('rules://microfrontend/architecture');

      expect(resource).toBeDefined();
      if (resource) {
        expect(resource.content).toMatch(/isolation/i);
        expect(resource.content).toMatch(/deployment/i);
      }
    });

    it('should include technical details in microservice guide', () => {
      const resource = getResourceByUri('rules://microservice/architecture');

      expect(resource).toBeDefined();
      if (resource) {
        expect(resource.content).toMatch(/service/i);
        expect(resource.content).toMatch(/communication/i);
      }
    });
  });
});
