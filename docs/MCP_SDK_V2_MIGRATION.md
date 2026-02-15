# MCP SDK v2 Migration Guide

## Current Status

**As of February 2026:**
- ✅ **v1.26.0** is the latest stable release (currently in use)
- ❌ **v2 is NOT yet available** on npm
- ⚠️ v2 is in **pre-alpha development**
- 📅 Stable v2 release anticipated in **Q1 2026**
- ✅ **Architecture refactored for smooth v2 migration** - See [V2_MIGRATION_ARCHITECTURE.md](V2_MIGRATION_ARCHITECTURE.md)

## Migration-Ready Architecture

This project has been refactored to facilitate smooth migration to v2. **All MCP SDK dependencies are now isolated to a single abstraction file** (`src/types/mcp.ts`), which means:

✅ Only **ONE file** needs to be updated when v2 is released  
✅ All handler files remain unchanged during migration  
✅ Type safety is maintained throughout  
✅ Migration risk is minimal  

See [V2_MIGRATION_ARCHITECTURE.md](V2_MIGRATION_ARCHITECTURE.md) for detailed architecture documentation.

## Why Not Migrate Now?

The MCP SDK v2 packages are not published to npm yet:

```bash
npm install @modelcontextprotocol/server
# Error: 404 Not Found - package doesn't exist yet

npm install @modelcontextprotocol/client
# Error: 404 Not Found - package doesn't exist yet

npm install @modelcontextprotocol/core
# Error: 404 Not Found - package doesn't exist yet
```

According to the [official repository](https://github.com/modelcontextprotocol/typescript-sdk):

> **This is the `main` branch which contains v2 of the SDK (currently in development, pre-alpha).**
> 
> We anticipate a stable v2 release in Q1 2026. Until then, **v1.x remains the recommended version** for production use.

## Current Implementation (v1)

This project correctly uses the latest stable v1 SDK:

```json
{
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.26.0"
  }
}
```

All imports and usage follow v1 patterns:

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
```

## Future Migration Plan

When v2 becomes available, follow these steps:

### 1. Check Package Availability

Monitor npm for v2 package releases:

```bash
npm view @modelcontextprotocol/server
npm view @modelcontextprotocol/client
npm view @modelcontextprotocol/core
```

### 2. Review Final Migration Guide

The [current migration guide](https://github.com/modelcontextprotocol/typescript-sdk/blob/main/docs/migration.md) may change before release. Review the official documentation when v2 is released.

### 3. Key Changes to Expect

Based on the current migration guide, v2 will introduce:

#### Package Split
- `@modelcontextprotocol/sdk` → Split into:
  - `@modelcontextprotocol/server` (server implementation)
  - `@modelcontextprotocol/client` (client implementation)
  - `@modelcontextprotocol/core` (types, protocol, transports)

#### Import Changes
```typescript
// v1 (current)
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema } from "@modelcontextprotocol/sdk/types.js";

// v2 (future)
import { McpServer, StdioServerTransport } from "@modelcontextprotocol/server";
import { CallToolResultSchema } from "@modelcontextprotocol/core";
```

#### Handler Registration Changes
```typescript
// v1 (current)
server.setRequestHandler(CallToolRequestSchema, async (request) => { ... });
server.setRequestHandler(ListToolsRequestSchema, async () => { ... });

// v2 (future)
server.setRequestHandler('tools/call', async (request) => { ... });
server.setRequestHandler('tools/list', async () => { ... });
```

### 4. Migration Checklist

When v2 is released:

- [ ] Backup current working code
- [ ] Uninstall v1 SDK: `npm uninstall @modelcontextprotocol/sdk`
- [ ] Install v2 packages: `npm install @modelcontextprotocol/server`
- [ ] **Update ONLY `src/types/mcp.ts`** (thanks to abstraction layer!)
  - [ ] Update import paths to v2 packages
  - [ ] Change `getRequestIdentifier()` to return method strings
  - [ ] Remove schema imports (no longer needed)
- [ ] Test thoroughly:
  - [ ] Build succeeds
  - [ ] Server starts
  - [ ] All handlers work
  - [ ] Run test scripts
- [ ] Deploy to staging first
- [ ] Monitor for issues
- [ ] Deploy to production

**Note:** Thanks to the abstraction layer, handler files (`tools.ts`, `resources.ts`, `prompts.ts`) **do NOT need changes**!

## Files That Will Need Changes

### src/types/mcp.ts (ONLY FILE REQUIRING UPDATES)

```typescript
// Update imports
- export { Server as McpServer } from "@modelcontextprotocol/sdk/server/index.js";
- export { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
+ export { McpServer, StdioServerTransport } from "@modelcontextprotocol/server";

// Remove schema imports
- import {
-   CallToolRequestSchema,
-   ListToolsRequestSchema,
-   // ... other schemas
- } from "@modelcontextprotocol/sdk/types.js";

// Update getRequestIdentifier function
export function getRequestIdentifier(methodDef) {
- return methodDef.schema;  // v1
+ return methodDef.method;  // v2
}
```

### Handler Files (NO CHANGES NEEDED)

All handler files (`src/handlers/*.ts`) **work without modification** because they use the abstraction layer:

```typescript
// This code works in both v1 and v2!
import { McpServer, MCP_METHODS, getRequestIdentifier } from "../types/mcp.js";
server.setRequestHandler(getRequestIdentifier(MCP_METHODS.TOOLS_CALL), handler);
```

## Architecture Benefits

The refactored architecture makes v2 migration trivial:

| Aspect | Before Refactoring | After Refactoring |
|--------|-------------------|-------------------|
| Files to update | 6+ files | 1 file only |
| Import changes | Scattered | Centralized |
| Handler changes | 6 registrations | 0 changes |
| Migration risk | High | Low |
| Test updates | Many | None |

See [V2_MIGRATION_ARCHITECTURE.md](V2_MIGRATION_ARCHITECTURE.md) for complete architectural details.

## Support Timeline

According to the official repository:

> v1.x will continue to receive **bug fixes and security updates** for at least **6 months after v2 ships** to give people time to upgrade.

This means:
- No rush to migrate immediately when v2 releases
- Security updates guaranteed during transition period
- Time to test v2 thoroughly before migrating

## Monitoring for v2 Release

To stay informed:

1. **Watch the GitHub repository:**
   - https://github.com/modelcontextprotocol/typescript-sdk

2. **Check npm periodically:**
   ```bash
   npm view @modelcontextprotocol/server
   ```

3. **Review release notes when available:**
   - https://github.com/modelcontextprotocol/typescript-sdk/releases

4. **Check the official documentation:**
   - https://modelcontextprotocol.io

## Conclusion

**Current Action: NONE REQUIRED**

The project is correctly using the latest stable v1 SDK. Migration to v2 should wait until:
1. V2 packages are published to npm
2. V2 reaches stable release status
3. Final migration guide is available
4. Thorough testing can be performed

Continue using v1 until v2 is officially released and stable.
