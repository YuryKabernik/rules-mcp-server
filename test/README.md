# Test Directory

Test scripts for the Rules MCP Server.

## manual-test.js

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

## markdown-test.js

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
