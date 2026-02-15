#!/usr/bin/env node

/**
 * Test script for markdown-based rules
 * Tests that rules are loaded from markdown files correctly
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
  // Parse and display responses
  try {
    const lines = data.toString().split('\n').filter(line => line.trim());
    lines.forEach(line => {
      if (line.trim()) {
        const response = JSON.parse(line);
        if (response.result && response.result.content) {
          console.log('\n=== Rule Content ===');
          console.log(response.result.content[0].text.substring(0, 500) + '...\n');
        }
      }
    });
  } catch (e) {
    // Ignore parse errors for partial data
  }
});

server.stderr.on('data', (data) => {
  console.error('Server:', data.toString());
});

// Test 1: Get microfrontend architecture rules (should load from markdown)
setTimeout(() => {
  console.log('\n=== TEST 1: Get Microfrontend Architecture Rules ===');
  const request = JSON.stringify({
    jsonrpc: '2.0',
    id: 1,
    method: 'tools/call',
    params: {
      name: 'get-microfrontend-rules',
      arguments: {
        category: 'architecture'
      }
    }
  }) + '\n';
  
  server.stdin.write(request);
}, 1000);

// Test 2: Get microservice performance rules
setTimeout(() => {
  console.log('\n=== TEST 2: Get Microservice Performance Rules ===');
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

// Test 3: Get microfrontend test rules with code type filter
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

// Test 4: Get all microservice rules
setTimeout(() => {
  console.log('\n=== TEST 4: Get All Microservice Rules ===');
  const request = JSON.stringify({
    jsonrpc: '2.0',
    id: 4,
    method: 'tools/call',
    params: {
      name: 'get-microservice-rules',
      arguments: {
        category: 'all'
      }
    }
  }) + '\n';
  
  server.stdin.write(request);
}, 4000);

// Clean up after tests
setTimeout(() => {
  console.log('\n=== All Tests Complete ===');
  server.kill();
  process.exit(0);
}, 6000);

server.on('exit', (code) => {
  console.log(`\nServer exited with code ${code}`);
});
