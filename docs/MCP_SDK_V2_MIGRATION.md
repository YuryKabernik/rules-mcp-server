# MCP SDK v2 Migration Guide

## Current Status

**As of February 2026:**
- ✅ **v1.26.0** is the latest stable release (currently in use)
- ❌ **v2 is NOT yet available** on npm (404 Not Found)
- ⚠️ v2 is in **pre-alpha development**
- 📅 Stable v2 release anticipated in **Q1 2026**
- ✅ **Architecture ready** for smooth migration (single-file update)

**Recommendation:** Continue using v1.26.0 until v2 is officially released.

## Migration-Ready Architecture

This project isolates all MCP SDK dependencies in `src/types/mcp.ts`, making v2 migration trivial:

✅ Only **ONE file** needs updates when v2 is released  
✅ All handler files remain unchanged  
✅ Type safety maintained throughout  
✅ Migration risk is minimal

### Abstraction Layer Pattern

```typescript
// src/types/mcp.ts - Single point of change for v2
export { Server as McpServer } from "@modelcontextprotocol/sdk/server/index.js";
export const MCP_METHODS = {
  TOOLS_CALL: {
    schema: CallToolRequestSchema,  // v1
    method: "tools/call" as const,  // v2 ready
  }
}

// Handler files use abstraction (no changes needed for v2)
import { McpServer, MCP_METHODS, getRequestIdentifier } from "../types/mcp.js";
server.setRequestHandler(getRequestIdentifier(MCP_METHODS.TOOLS_CALL), handler);
```

## Migration Steps (When v2 Releases)

### 1. Update Package

```bash
npm uninstall @modelcontextprotocol/sdk
npm install @modelcontextprotocol/server
```

### 2. Update src/types/mcp.ts

**Change imports:**
```typescript
// Before (v1)
export { Server as McpServer } from "@modelcontextprotocol/sdk/server/index.js";
export { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// After (v2)
export { McpServer, StdioServerTransport } from "@modelcontextprotocol/server";
```

**Remove schema imports** (no longer needed in v2):
```typescript
// Remove these
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  // ... etc
} from "@modelcontextprotocol/sdk/types.js";
```

**Update getRequestIdentifier():**
```typescript
// Before (v1)
export function getRequestIdentifier(methodDef) {
  return methodDef.schema;
}

// After (v2)
export function getRequestIdentifier(methodDef) {
  return methodDef.method;  // Use method strings instead of schemas
}
```

### 3. Test and Deploy

```bash
npm run build
npm start
# Run your tests
```

That's it! All handler files continue working unchanged.

## Method String Mapping (for reference)

| v1 Schema | v2 Method String |
|-----------|------------------|
| `CallToolRequestSchema` | `"tools/call"` |
| `ListToolsRequestSchema` | `"tools/list"` |
| `ReadResourceRequestSchema` | `"resources/read"` |
| `ListResourcesRequestSchema` | `"resources/list"` |
| `GetPromptRequestSchema` | `"prompts/get"` |
| `ListPromptsRequestSchema` | `"prompts/list"` |

## Developer Quick Reference

### When adding new handlers, always use abstraction:

```typescript
// ✅ CORRECT
import { McpServer, MCP_METHODS, getRequestIdentifier } from "../types/mcp.js";
server.setRequestHandler(getRequestIdentifier(MCP_METHODS.TOOLS_LIST), handler);

// ❌ WRONG - Don't import SDK directly
import { ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
```

## Benefits of This Architecture

| Aspect | Before Refactoring | After Refactoring |
|--------|-------------------|-------------------|
| Files to update | 6+ files | 1 file only |
| Lines to change | ~50+ | ~10 |
| Handler changes | 6 registrations | 0 changes |
| Migration risk | High | Minimal |
| Complexity | High | Low |

## Support Timeline

- **v1.x**: Fully supported, recommended for production
- **v2**: Pre-alpha, not yet published
- **After v2 ships**: v1.x will receive bug fixes and security updates for at least 6 months

## References

- [MCP TypeScript SDK Repository](https://github.com/modelcontextprotocol/typescript-sdk)
- [Migration Documentation](https://github.com/modelcontextprotocol/typescript-sdk/blob/main/docs/migration.md)
- [Architecture Documentation](ARCHITECTURE.md)

---

**Last Updated:** February 15, 2026  
**Current SDK:** `@modelcontextprotocol/sdk@^1.26.0`
