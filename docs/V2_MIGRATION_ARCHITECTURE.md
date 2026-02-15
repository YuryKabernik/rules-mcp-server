# V2 Migration Architecture

## Overview

This document explains the architectural changes made to facilitate smooth migration to MCP SDK v2 when it becomes available.

## Problem Statement

The original codebase had MCP SDK v1 imports and schema usage scattered across multiple files. When v2 releases, this would require:
- Updating imports in 6+ files
- Changing schema objects to method strings in 6 handler registrations
- Updating type names in multiple locations
- High risk of missing updates or introducing bugs

## Solution: Abstraction Layer

We introduced a centralized abstraction layer that isolates MCP SDK dependencies to a single file.

### Architecture Diagram

```
Before (v1 - scattered dependencies):
┌──────────────────────────────────────────────────┐
│  src/server.ts                                   │
│  ├─ import { Server } from "@...sdk/server"     │
│  ├─ import { StdioServerTransport } from "@..."  │
│  └─ Uses Server type directly                    │
└──────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────┐
│  src/handlers/tools.ts                           │
│  ├─ import { Server } from "@...sdk/server"     │
│  ├─ import { CallToolRequestSchema } from "@..." │
│  ├─ import { ListToolsRequestSchema } from "@..."│
│  └─ Uses schemas directly in setRequestHandler  │
└──────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────┐
│  src/handlers/resources.ts                       │
│  ├─ Similar scattered imports...                 │
└──────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────┐
│  src/handlers/prompts.ts                         │
│  ├─ Similar scattered imports...                 │
└──────────────────────────────────────────────────┘

After (v1 with abstraction - single point of change):
┌──────────────────────────────────────────────────┐
│  src/types/mcp.ts (Abstraction Layer)           │
│  ├─ Imports from @modelcontextprotocol/sdk      │
│  ├─ export { Server as McpServer }              │
│  ├─ export { StdioServerTransport }             │
│  ├─ export const MCP_METHODS = { ... }          │
│  └─ export function getRequestIdentifier()      │
└──────────────────────────────────────────────────┘
         ▲              ▲              ▲
         │              │              │
    ┌────┴────┐    ┌────┴────┐   ┌────┴────┐
    │ server  │    │handlers/│   │handlers/│
    │   .ts   │    │tools.ts │   │resources│
    └─────────┘    └─────────┘   └─────────┘
```

## Key Components

### 1. src/types/mcp.ts - Abstraction Layer

This single file acts as a facade for all MCP SDK imports:

```typescript
// v1 (current):
export { Server as McpServer } from "@modelcontextprotocol/sdk/server/index.js";

// v2 (when available, just update this file):
export { McpServer } from "@modelcontextprotocol/server";
```

### 2. MCP_METHODS Constants

Maps human-readable names to both schemas (v1) and method strings (v2):

```typescript
export const MCP_METHODS = {
  TOOLS_LIST: {
    schema: ListToolsRequestSchema,  // Used in v1
    method: "tools/list" as const,   // Ready for v2
  },
  // ... more methods
}
```

### 3. getRequestIdentifier() Helper

Provides the correct identifier for the current SDK version:

```typescript
export function getRequestIdentifier(methodDef) {
  // v1: Return the schema
  return methodDef.schema;
  
  // v2: Just change to:
  // return methodDef.method;
}
```

### 4. Handler Files

All handlers now use the abstraction:

```typescript
// Before:
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { CallToolRequestSchema } from "@modelcontextprotocol/sdk/types.js";
server.setRequestHandler(CallToolRequestSchema, handler);

// After:
import { McpServer, MCP_METHODS, getRequestIdentifier } from "../types/mcp.js";
server.setRequestHandler(getRequestIdentifier(MCP_METHODS.TOOLS_CALL), handler);
```

## Migration Path to v2

When MCP SDK v2 is released, the migration becomes trivial:

### Step 1: Update Package
```bash
npm uninstall @modelcontextprotocol/sdk
npm install @modelcontextprotocol/server
```

### Step 2: Update src/types/mcp.ts (ONE FILE)

```typescript
// Change this:
export { Server as McpServer } from "@modelcontextprotocol/sdk/server/index.js";
export { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ... } from "@modelcontextprotocol/sdk/types.js";

// To this:
export { McpServer, StdioServerTransport } from "@modelcontextprotocol/server";
// Remove schema imports (no longer needed)

// And change getRequestIdentifier to use method strings:
export function getRequestIdentifier(methodDef) {
  return methodDef.method;  // Changed from methodDef.schema
}
```

### Step 3: Done!

That's it! All handler files continue to work without modification because they only depend on the abstraction layer.

## Benefits

### 1. Single Point of Change
- Only `src/types/mcp.ts` needs updates for v2
- Zero changes needed in handler files
- Minimal risk of errors

### 2. Type Safety Maintained
- All types remain strongly typed
- TypeScript catches any migration issues
- No runtime surprises

### 3. Clear Migration Path
- Method strings already defined
- Documentation clearly marks v2 changes
- Easy to test incrementally

### 4. Backwards Compatible
- Current v1 code works identically
- No behavior changes
- Full test coverage maintained

### 5. Future-Proof
- Ready for v2 whenever it releases
- Extensible for future SDK changes
- Clean separation of concerns

## File-by-File Changes

### Modified Files

1. **src/types/mcp.ts** (NEW)
   - Central abstraction layer
   - All MCP SDK imports isolated here
   - Method string constants ready for v2

2. **src/server.ts**
   - Import from `./types/mcp.js` instead of SDK
   - Use `McpServer` type instead of `Server`

3. **src/handlers/tools.ts**
   - Import from `../types/mcp.js`
   - Use `getRequestIdentifier(MCP_METHODS.TOOLS_LIST)`
   - Use `getRequestIdentifier(MCP_METHODS.TOOLS_CALL)`

4. **src/handlers/resources.ts**
   - Import from `../types/mcp.js`
   - Use `getRequestIdentifier(MCP_METHODS.RESOURCES_LIST)`
   - Use `getRequestIdentifier(MCP_METHODS.RESOURCES_READ)`

5. **src/handlers/prompts.ts**
   - Import from `../types/mcp.js`
   - Use `getRequestIdentifier(MCP_METHODS.PROMPTS_LIST)`
   - Use `getRequestIdentifier(MCP_METHODS.PROMPTS_GET)`

## Testing

All existing tests pass without modification:
- ✅ Build successful
- ✅ Server starts correctly
- ✅ Handler tests pass
- ✅ Markdown loading works
- ✅ All features functional

## Code Quality

- ✅ Zero breaking changes to functionality
- ✅ Type safety preserved
- ✅ Clear documentation
- ✅ Consistent patterns across files
- ✅ Easy to understand and maintain

## Comparison Table

| Aspect | Before | After |
|--------|--------|-------|
| Files to update for v2 | 6+ files | 1 file (mcp.ts) |
| Import statements | Scattered across files | Centralized |
| Type coupling | Tight | Loose |
| Migration risk | High | Low |
| Test changes needed | Many | None |
| Maintenance | Difficult | Easy |

## Conclusion

This refactoring transforms a potentially complex and error-prone v2 migration into a simple, safe update of a single abstraction file. The design unlocks smooth migration to v2 while maintaining all current functionality and type safety.
