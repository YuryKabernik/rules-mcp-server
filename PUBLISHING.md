# Publishing to GitHub Packages

This guide explains how to publish the `@yurykabernik/rules-mcp-server` package to GitHub Packages.

## Prerequisites

1. GitHub account with access to the `YuryKabernik/rules-mcp-server` repository
2. GitHub Personal Access Token with `write:packages` scope
3. Node.js v24.x or later
4. npm v11.x or later

## Publishing Methods

### Method 1: Automated Publishing via GitHub Actions (Recommended)

The repository includes a GitHub Actions workflow that automatically publishes the package when a release is created.

**Steps:**

1. Update the version in `package.json`:
   ```bash
   npm version patch  # or minor, or major
   ```

2. Push the changes and tags:
   ```bash
   git push && git push --tags
   ```

3. Create a release on GitHub:
   - Go to https://github.com/YuryKabernik/rules-mcp-server/releases/new
   - Select the tag you just created
   - Add release notes
   - Click "Publish release"

4. The GitHub Actions workflow will automatically:
   - Build the project
   - Run tests
   - Publish to GitHub Packages

**Manual Trigger:**

You can also manually trigger the workflow:
1. Go to https://github.com/YuryKabernik/rules-mcp-server/actions
2. Select "Publish to GitHub Packages" workflow
3. Click "Run workflow"

### Method 2: Manual Publishing

**Setup:**

1. Create a GitHub Personal Access Token:
   - Go to https://github.com/settings/tokens/new
   - Give it a descriptive name (e.g., "npm-publish")
   - Select scopes: `write:packages`, `read:packages`
   - Click "Generate token"
   - Copy the token (you won't see it again)

2. Configure npm authentication:
   ```bash
   npm login --registry=https://npm.pkg.github.com
   # Username: your-github-username
   # Password: your-personal-access-token (paste the token)
   # Email: your-email@example.com
   ```

**Publish:**

```bash
# Build the project
npm run build

# Run tests
npm test

# Publish
npm publish
```

## Installing the Published Package

### For End Users

**Setup authentication (one-time):**

1. Create a [GitHub Personal Access Token](https://github.com/settings/tokens/new) with `read:packages` scope

2. Create or edit `~/.npmrc`:
   ```
   @yurykabernik:registry=https://npm.pkg.github.com
   //npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
   ```

**Install:**

```bash
# Global installation
npm install -g @yurykabernik/rules-mcp-server

# Run the server
rules-mcp-server
```

**Use with npx (no installation):**

```bash
npx @yurykabernik/rules-mcp-server
```

### For Claude Desktop

Add to your Claude Desktop configuration file:
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "rules-mcp-server": {
      "command": "npx",
      "args": ["@yurykabernik/rules-mcp-server"]
    }
  }
}
```

## Verifying the Package

After publishing, verify the package:

1. Check the package page:
   https://github.com/YuryKabernik/rules-mcp-server/packages

2. Test installation in a clean environment:
   ```bash
   # In a new directory
   npx @yurykabernik/rules-mcp-server
   ```

## Troubleshooting

### Authentication Errors

If you get authentication errors:
1. Verify your token has the correct scopes
2. Check that your `.npmrc` is configured correctly
3. Try logging in again with `npm login`

### Package Not Found

If the package is not found:
1. Ensure the package was published successfully
2. Check that you're using the correct scope: `@yurykabernik`
3. Verify your `.npmrc` has the registry configured

### Publishing Fails

If publishing fails:
1. Ensure you have write access to the repository
2. Check that the version number hasn't been used before
3. Verify the build was successful before publishing

## Additional Resources

- [GitHub Packages Documentation](https://docs.github.com/en/packages)
- [npm Documentation](https://docs.npmjs.com/)
- [Semantic Versioning](https://semver.org/)
