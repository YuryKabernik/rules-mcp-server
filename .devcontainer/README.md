# Development Container

This directory contains the configuration for VS Code Development Containers (devcontainers), providing a consistent development environment for this project.

## What's Included

### Base Image
- **Node.js 24** (latest LTS)
- **TypeScript** support
- **npm** package manager
- Debian Bookworm base

### VS Code Extensions
- **TypeScript & JavaScript**: Enhanced language support
- **Vitest Explorer**: Run and debug tests
- **ESLint & Prettier**: Code formatting and linting
- **Markdown All in One**: Documentation editing
- **Code Spell Checker**: Catch typos
- **GitLens**: Enhanced Git integration
- **GitHub Copilot**: AI-powered code assistance (if you have access)

### Development Tools
- **Git**: Version control
- **GitHub CLI**: Interact with GitHub from terminal

### Automatic Setup
When you open the project in a devcontainer:
1. Dependencies are installed automatically (`npm install`)
2. Project is built (`npm run build`)
3. Environment is ready for development

## How to Use

### Prerequisites
- [Docker](https://www.docker.com/products/docker-desktop) installed
- [VS Code](https://code.visualstudio.com/) installed
- [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) installed

### Opening in Devcontainer

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YuryKabernik/rules-mcp-server.git
   cd rules-mcp-server
   ```

2. **Open in VS Code**:
   ```bash
   code .
   ```

3. **Open in Container**:
   - VS Code will detect the devcontainer configuration
   - Click "Reopen in Container" when prompted
   - Or use Command Palette (F1): "Dev Containers: Reopen in Container"

4. **Wait for setup**:
   - First time: Downloads image and installs dependencies (~2-5 min)
   - Subsequent times: Much faster (~30 seconds)

### Available Commands

Once inside the container:

```bash
# Development
npm run dev          # Run with tsx (hot reload)
npm run watch        # TypeScript watch mode

# Building
npm run build        # Compile TypeScript

# Testing
npm test             # Run unit tests
npm run test:watch   # Watch mode
npm run test:ui      # Visual test UI
npm run test:coverage # Coverage report

# Running
npm start            # Start the MCP server
```

## Benefits

✅ **Consistent Environment**: Same setup for all developers
✅ **Quick Setup**: Everything pre-configured
✅ **Isolated**: Doesn't affect your local machine
✅ **Cross-Platform**: Works on Windows, Mac, and Linux
✅ **Reproducible**: Easy to debug issues
✅ **All Tools Included**: No manual installation needed

## Customization

To customize the devcontainer:

1. Edit `.devcontainer/devcontainer.json`
2. Rebuild container: Command Palette → "Dev Containers: Rebuild Container"

Common customizations:
- Add VS Code extensions
- Change Node version
- Add additional tools
- Configure environment variables
- Adjust post-create commands

## Troubleshooting

### Container won't start
- Ensure Docker is running
- Try: "Dev Containers: Rebuild Container"

### Slow performance
- Check Docker resource allocation (CPU/Memory)
- Consider using named volumes for node_modules

### Extensions not working
- Rebuild container
- Check extension compatibility

## Learn More

- [VS Code Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers)
- [Dev Containers Specification](https://containers.dev/)
- [Dev Container Features](https://containers.dev/features)
