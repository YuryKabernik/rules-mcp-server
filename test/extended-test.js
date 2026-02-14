#!/usr/bin/env node

/**
 * Extended test script for the restructured MCP server
 * Tests new filtering capabilities
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Start the server
const serverPath = join(__dirname, '..', 'build', 'index.js');
const server = spawn('node', [serverPath]);

let responseBuffer = '';

server.stdout.on('data', (data) => {
  responseBuffer += data.toString();
  const response = data.toString();
  // Show full response for debugging, but limit to reasonable length
  const displayLength = response.length > 1000 ? 1000 : response.length;
  console.log('Server response:', response.substring(0, displayLength));
  if (response.length > 1000) {
    console.log('... (truncated)');
  }
});

server.stderr.on('data', (data) => {
  console.error('Server stderr:', data.toString());
});

// Test 1: Get microfrontend rules with filters
setTimeout(() => {
  console.log('\n=== TEST 1: Get Microfrontend Rules (TypeScript) ===');
  const request = JSON.stringify({
    jsonrpc: '2.0',
    id: 1,
    method: 'tools/call',
    params: {
      name: 'get-microfrontend-rules',
      arguments: {
        category: 'architecture',
        language: 'typescript'
      }
    }
  }) + '\n';
  
  server.stdin.write(request);
}, 1000);

// Test 2: Get microservice rules with category filter
setTimeout(() => {
  console.log('\n=== TEST 2: Get Microservice Rules (Performance) ===');
  const request = JSON.stringify({
    jsonrpc: '2.0',
    id: 2,
    method: 'tools/call',
    params: {
      name: 'get-microservice-rules',
      arguments: {
        category: 'performance'
      }
    }
  }) + '\n';
  
  server.stdin.write(request);
}, 2000);

// Test 3: Get test-specific rules
setTimeout(() => {
  console.log('\n=== TEST 3: Get Microfrontend Test Rules ===');
  const request = JSON.stringify({
    jsonrpc: '2.0',
    id: 3,
    method: 'tools/call',
    params: {
      name: 'get-microfrontend-rules',
      arguments: {
        category: 'testing',
        codeType: 'test'
      }
    }
  }) + '\n';
  
  server.stdin.write(request);
}, 3000);

// Test 4: Read a resource
setTimeout(() => {
  console.log('\n=== TEST 4: Read Resource ===');
  const request = JSON.stringify({
    jsonrpc: '2.0',
    id: 4,
    method: 'resources/read',
    params: {
      uri: 'rules://microfrontend/architecture'
    }
  }) + '\n';
  
  server.stdin.write(request);
}, 4000);

// Test 5: Get prompt with arguments
setTimeout(() => {
  console.log('\n=== TEST 5: Get Design Prompt ===');
  const request = JSON.stringify({
    jsonrpc: '2.0',
    id: 5,
    method: 'prompts/get',
    params: {
      name: 'design-microfrontend',
      arguments: {
        app_name: 'my-awesome-app',
        framework: 'Vue'
      }
    }
  }) + '\n';
  
  server.stdin.write(request);
}, 5000);

// Clean up after tests
setTimeout(() => {
  console.log('\n=== All Tests Complete ===');
  server.kill();
  process.exit(0);
}, 7000);

server.on('exit', (code) => {
  console.log(`\nServer exited with code ${code}`);
});
