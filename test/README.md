# Test Directory

This directory contains test scripts for the Rules MCP Server.

## manual-test.js

A manual test script that validates the server's basic functionality by:

1. Starting the MCP server
2. Sending test requests for:
   - Listing available tools (rules)
   - Listing available resources
   - Listing available prompts
3. Verifying responses
4. Shutting down cleanly

### Usage

```bash
node test/manual-test.js
```

### Expected Output

The test should show:
- Server starting successfully
- Successful responses for all 3 MCP capabilities
- Clean shutdown

### What It Tests

- ✅ Server startup
- ✅ Tools listing (2 tools)
- ✅ Resources listing (3 resources)
- ✅ Prompts listing (3 prompts)
- ✅ JSON-RPC communication
- ✅ Clean shutdown

## Future Tests

Consider adding:
- Integration tests for each tool
- Tests for resource reading
- Tests for prompt generation with different arguments
- Error handling tests
- Performance tests
