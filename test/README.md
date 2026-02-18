# Testing

This directory contains documentation for testing the Rules MCP Server.

## Unit Tests with Vitest

All tests are located in `src/**/*.test.ts` files throughout the source code. These test individual functions and modules in isolation without starting the server.

**Run tests:**
```bash
npm test                  # Run all tests once
npm run test:watch        # Watch mode - auto-rerun on changes
npm run test:ui           # Visual UI for test exploration
npm run test:coverage     # Generate coverage report
```

## Test Coverage

Tests cover:
- Content loading (tools, prompts, resources, rules)
- MCP method abstractions
- Rule filtering and formatting
- Prompt templating
- Resource management

**Test Files:**
- `src/utils/markdownLoader.test.ts` - Markdown parsing
- `src/rules/index.test.ts` - Rules registry
- `src/types/mcp.test.ts` - MCP abstraction
- `src/prompts/index.test.ts` - Prompts
- `src/resources/index.test.ts` - Resources

**Total: 53 unit tests**

## Manual Server Testing

To manually test the server:

```bash
# Build the server
npm run build

# Start the server
npm start

# The server runs on stdio and waits for MCP protocol messages
```
