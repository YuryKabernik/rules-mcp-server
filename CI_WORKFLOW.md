# CI Workflow Documentation

## Overview

This document describes the Continuous Integration (CI) workflow that runs on every push to every branch and on all pull requests.

## Workflow: `.github/workflows/ci.yml`

### Trigger Events

The CI workflow is triggered on:
- **Push**: Any push to any branch (`'**'` matches all branches)
- **Pull Request**: Any pull request to any branch

### Configuration

- **Runner**: `ubuntu-latest`
- **Node.js Version**: 24.x (matches project requirements)
- **Permissions**: `contents: read` (minimal required permissions)
- **Caching**: npm packages are cached for faster builds

### Workflow Steps

1. **Checkout code** - Retrieves the repository code
2. **Setup Node.js** - Installs Node.js 24.x with npm caching
3. **Install dependencies** - Runs `npm ci` for clean, reproducible builds
4. **Build project** - Runs `npm run build` to compile TypeScript
5. **Run tests** - Runs `npm test` to execute all unit tests
6. **Upload build artifacts** - Saves build output for 7 days (only on success)

### Why These Steps?

- **Build**: Verifies TypeScript compiles without errors
- **Test**: Ensures all tests pass and functionality works as expected
- **Artifacts**: Preserves build output for debugging and verification

## What Gets Checked

For every push or pull request, the workflow verifies:

✅ TypeScript compiles successfully
✅ All unit tests pass
✅ Build artifacts are generated correctly

## Benefits

1. **Early Detection**: Catches issues before merging to main branch
2. **Consistent Quality**: Ensures all code meets quality standards
3. **Automated Testing**: Runs tests automatically on every change
4. **Fast Feedback**: Developers get quick feedback on their changes
5. **Reduced Review Time**: Automated checks reduce manual review burden

## Viewing Results

After pushing code:

1. Go to the GitHub repository
2. Click on the "Actions" tab
3. Find your workflow run
4. View detailed logs for each step
5. Download build artifacts if needed

## Status Badge

You can add a status badge to your README.md:

```markdown
![CI](https://github.com/YuryKabernik/rules-mcp-server/workflows/CI/badge.svg)
```

## Local Testing

To run the same checks locally before pushing:

```bash
# Build project
npm run build

# Run tests
npm test

# Or run both at once
npm run build && npm test
```

## Troubleshooting

### Workflow Fails on Build

Check TypeScript errors:
```bash
npm run build
```

Review the compilation errors and fix them.

### Workflow Fails on Tests

Run tests locally to debug:
```bash
npm test
```

Or run with watch mode for development:
```bash
npm run test:watch
```

## Maintenance

The workflow uses:
- `actions/checkout@v4` - Official GitHub action for checking out code
- `actions/setup-node@v4` - Official GitHub action for Node.js setup
- `actions/upload-artifact@v4` - Official GitHub action for artifacts

These actions should be kept up to date with their latest versions.

## Comparison with Publish Workflow

This repository has two workflows:

| Workflow | When It Runs | Purpose |
|----------|-------------|---------|
| **CI** (ci.yml) | Every push to any branch, all PRs | Continuous integration - build, test, lint |
| **Publish** (publish.yml) | Release creation, manual trigger | Publish package to GitHub Packages |

The CI workflow ensures code quality on every change, while the Publish workflow handles package releases.
