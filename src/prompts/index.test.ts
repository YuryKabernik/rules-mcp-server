/**
 * Unit tests for prompts registry
 */

import { describe, it, expect } from 'vitest';
import { getPromptByName, getAllPrompts } from './index.js';

describe('prompts registry', () => {
  describe('getAllPrompts', () => {
    it('should return all available prompts', () => {
      const prompts = getAllPrompts();

      expect(prompts).toBeInstanceOf(Array);
      expect(prompts.length).toBeGreaterThan(0);
    });

    it('should include design-microfrontend prompt', () => {
      const prompts = getAllPrompts();
      const mfePrompt = prompts.find(p => p.name === 'design-microfrontend');

      expect(mfePrompt).toBeDefined();
      expect(mfePrompt?.description).toContain('microfrontend');
      expect(mfePrompt?.arguments).toBeDefined();
      expect(mfePrompt?.arguments?.length).toBeGreaterThan(0);
    });

    it('should include design-microservice prompt', () => {
      const prompts = getAllPrompts();
      const msPrompt = prompts.find(p => p.name === 'design-microservice');

      expect(msPrompt).toBeDefined();
      expect(msPrompt?.description).toContain('microservice');
      expect(msPrompt?.arguments).toBeDefined();
    });

    it('should include review-architecture prompt', () => {
      const prompts = getAllPrompts();
      const reviewPrompt = prompts.find(p => p.name === 'review-architecture');

      expect(reviewPrompt).toBeDefined();
      expect(reviewPrompt?.description).toMatch(/review/i);
    });

    it('should have required arguments marked correctly', () => {
      const prompts = getAllPrompts();
      const mfePrompt = prompts.find(p => p.name === 'design-microfrontend');

      expect(mfePrompt).toBeDefined();
      const appNameArg = mfePrompt?.arguments?.find(a => a.name === 'app_name');
      expect(appNameArg?.required).toBe(true);
    });
  });

  describe('getPromptByName', () => {
    it('should get prompt by name', () => {
      const prompt = getPromptByName('design-microfrontend');

      expect(prompt).toBeDefined();
      expect(prompt?.name).toBe('design-microfrontend');
    });

    it('should return undefined for non-existent prompt', () => {
      const prompt = getPromptByName('non-existent-prompt');

      expect(prompt).toBeUndefined();
    });

    it('should return prompt with template function', () => {
      const prompt = getPromptByName('design-microfrontend');

      expect(prompt).toBeDefined();
      expect(prompt?.template).toBeDefined();
      expect(typeof prompt?.template).toBe('function');
    });
  });

  describe('prompt templates', () => {
    it('should generate microfrontend design prompt with arguments', () => {
      const prompt = getPromptByName('design-microfrontend');
      expect(prompt).toBeDefined();

      if (prompt?.template) {
        const generated = prompt.template({
          app_name: 'my-awesome-app',
          framework: 'Vue',
        });

        expect(generated).toContain('my-awesome-app');
        expect(generated).toContain('Vue');
        expect(generated).toContain('microfrontend');
        expect(generated).toContain('Architecture overview');
      }
    });

    it('should generate microfrontend design prompt with defaults', () => {
      const prompt = getPromptByName('design-microfrontend');
      expect(prompt).toBeDefined();

      if (prompt?.template) {
        const generated = prompt.template({});

        expect(generated).toContain('my-app');
        expect(generated).toContain('React');
      }
    });

    it('should generate microservice design prompt with arguments', () => {
      const prompt = getPromptByName('design-microservice');
      expect(prompt).toBeDefined();

      if (prompt?.template) {
        const generated = prompt.template({
          service_name: 'payment-service',
          technology: 'Java',
        });

        expect(generated).toContain('payment-service');
        expect(generated).toContain('Java');
        expect(generated).toContain('microservice');
      }
    });

    it('should generate review architecture prompt with arguments', () => {
      const prompt = getPromptByName('review-architecture');
      expect(prompt).toBeDefined();

      if (prompt?.template) {
        const generated = prompt.template({
          system_type: 'microfrontend',
          description: 'E-commerce platform',
        });

        expect(generated).toContain('microfrontend');
        expect(generated).toContain('E-commerce platform');
        expect(generated).toMatch(/review/i);
      }
    });

    it('should handle missing optional arguments gracefully', () => {
      const prompt = getPromptByName('design-microservice');
      expect(prompt).toBeDefined();

      if (prompt?.template) {
        const generated = prompt.template({
          service_name: 'test-service',
        });

        expect(generated).toContain('test-service');
        expect(generated).toBeDefined();
        expect(generated.length).toBeGreaterThan(0);
      }
    });
  });
});
