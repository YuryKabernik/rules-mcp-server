#!/usr/bin/env node

/**
 * Manual test script for the MCP server
 * This script tests the server's basic functionality
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
  console.log('Server stdout:', data.toString());
});

server.stderr.on('data', (data) => {
  console.error('Server stderr:', data.toString());
});

// Test 1: List tools
setTimeout(() => {
  console.log('\n=== TEST 1: List Tools ===');
  const listToolsRequest = JSON.stringify({
    jsonrpc: '2.0',
    id: 1,
    method: 'tools/list',
    params: {}
  }) + '\n';
  
  server.stdin.write(listToolsRequest);
}, 1000);

// Test 2: List resources
setTimeout(() => {
  console.log('\n=== TEST 2: List Resources ===');
  const listResourcesRequest = JSON.stringify({
    jsonrpc: '2.0',
    id: 2,
    method: 'resources/list',
    params: {}
  }) + '\n';
  
  server.stdin.write(listResourcesRequest);
}, 2000);

// Test 3: List prompts
setTimeout(() => {
  console.log('\n=== TEST 3: List Prompts ===');
  const listPromptsRequest = JSON.stringify({
    jsonrpc: '2.0',
    id: 3,
    method: 'prompts/list',
    params: {}
  }) + '\n';
  
  server.stdin.write(listPromptsRequest);
}, 3000);

// Clean up after tests
setTimeout(() => {
  console.log('\n=== Tests Complete ===');
  server.kill();
  process.exit(0);
}, 5000);

server.on('exit', (code) => {
  console.log(`\nServer exited with code ${code}`);
});
