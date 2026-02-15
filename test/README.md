# Test Directory

Test scripts for the Rules MCP Server.

## Unit Tests (Vitest)

Fast, isolated unit tests located in `src/**/*.test.ts`:

```bash
npm test                  # Run all tests
npm run test:watch        # Watch mode  
npm run test:ui           # Visual UI
npm run test:coverage     # Coverage report
```

**Test Files:**
- `src/utils/markdownLoader.test.ts` - Markdown parsing (8 tests)
- `src/rules/index.test.ts` - Rules registry (9 tests)
- `src/types/mcp.test.ts` - MCP abstraction (9 tests)
- `src/prompts/index.test.ts` - Prompts (13 tests)
- `src/resources/index.test.ts` - Resources (14 tests)

**Total: 53 unit tests, ~1 second runtime**

## Integration Tests

Full end-to-end tests requiring server startup:

### manual-test.js

Validates server functionality:

```bash
node test/manual-test.js
```

**Tests:**
- ✅ Server startup
- ✅ Tools listing (2 tools)
- ✅ Resources listing (3 resources)  
- ✅ Prompts listing (3 prompts)
- ✅ JSON-RPC communication
- ✅ Clean shutdown

### markdown-test.js

Tests markdown rule loading:

```bash
node test/markdown-test.js
```

**Tests:**
- ✅ Microfrontend rules loading
- ✅ Microservice rules loading
- ✅ Category filtering
- ✅ Language filtering
- ✅ Code type filtering
