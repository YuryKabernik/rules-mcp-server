# Quick Reference: v2 Migration Architecture

## For Developers

### Current Architecture (v1 with Abstraction)

All MCP SDK dependencies are isolated in **ONE file**: `src/types/mcp.ts`

### When Adding New Handlers

Always use the abstraction layer:

```typescript
// ✅ CORRECT - Use abstraction
import { McpServer, MCP_METHODS, getRequestIdentifier } from "../types/mcp.js";

export function registerMyHandlers(server: McpServer): void {
  server.setRequestHandler(getRequestIdentifier(MCP_METHODS.TOOLS_LIST), async () => {
    // handler logic
  });
}
```

```typescript
// ❌ WRONG - Don't import SDK directly
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
```

### When v2 is Released

Only update `src/types/mcp.ts`:

1. Change the imports at the top
2. Update `getRequestIdentifier()` to return `methodDef.method`
3. Done! All handlers continue working

### Method Constants

Use these constants for handler registration:

- `MCP_METHODS.TOOLS_LIST` - List tools
- `MCP_METHODS.TOOLS_CALL` - Call a tool
- `MCP_METHODS.RESOURCES_LIST` - List resources
- `MCP_METHODS.RESOURCES_READ` - Read a resource
- `MCP_METHODS.PROMPTS_LIST` - List prompts
- `MCP_METHODS.PROMPTS_GET` - Get a prompt

### Architecture Principle

**Single Point of Change**: All SDK dependencies flow through `src/types/mcp.ts`

```
MCP SDK v1
    ↓
src/types/mcp.ts (abstraction layer)
    ↓
├── server.ts
├── handlers/tools.ts
├── handlers/resources.ts
└── handlers/prompts.ts
```

When v2 is released, only the abstraction layer changes!

### Further Reading

- [Full Architecture Doc](V2_MIGRATION_ARCHITECTURE.md)
- [Migration Guide](MCP_SDK_V2_MIGRATION.md)
- [v2 Status](V2_STATUS.md)
