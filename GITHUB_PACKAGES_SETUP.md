# @sakhlaqi/ui - GitHub Packages Guide

Complete guide for publishing and consuming the UI component library via GitHub Packages.

## 📦 Package Information

| Property | Value |
|----------|-------|
| **Name** | `@sakhlaqi/ui` |
| **Current Version** | `1.0.1` |
| **Registry** | GitHub Packages (npm.pkg.github.com) |
| **Repository** | https://github.com/sakhlaqi/real-solutions-ui |
| **Package URL** | https://github.com/sakhlaqi?tab=packages |
| **React Support** | React 18.x & 19.x |

## ✅ Current Status

- ✅ Package published to GitHub Packages (v1.0.1)
- ✅ GitHub Actions workflow configured (auto-publish on push to main)
- ✅ Authentication configured via environment variables
- ✅ Installed in presentation project
- ✅ React 18 & 19 compatibility

## 🚀 Quick Start

### 1. Authentication Setup

**Create GitHub Personal Access Token:**
1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token (classic)"**
3. Name: **"GitHub Packages - UI Library"**
4. Select scopes:
   - ✅ `read:packages` - Download packages
   - ✅ `write:packages` - Publish packages
   - ✅ `repo` (if repository is private)
5. **Copy the token** - save it securely!

**Configure Environment Variable:**
```bash
# Add to shell profile (recommended)
echo 'export GITHUB_TOKEN=ghp_YOUR_TOKEN_HERE' >> ~/.zshrc
source ~/.zshrc

# Verify it's set
echo $GITHUB_TOKEN
```

**Alternative - Global ~/.npmrc:**
```bash
cat >> ~/.npmrc << EOF
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN_HERE
@sakhlaqi:registry=https://npm.pkg.github.com
EOF
```

### 2. Install Package

```bash
cd presentation
npm install @sakhlaqi/ui@latest
```

### 3. Use Components

```tsx
// Import components
import { Button, Input, Card } from '@sakhlaqi/ui';
import { Heading, Text } from '@sakhlaqi/ui/typography';
import { Alert } from '@sakhlaqi/ui/feedback';
import '@sakhlaqi/ui/styles';

// Use in your component
function App() {
  return (
    <Card>
      <Heading level={1}>Hello World</Heading>
      <Input label="Name" placeholder="Enter name" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}
```


## 📦 Available Components (42 Total)

### Component Categories

```tsx
// Base Components (3)
import { Button, Input, Card } from '@sakhlaqi/ui';

// Typography (2)
import { Heading, Text } from '@sakhlaqi/ui/typography';

// Forms (8)
import { 
  Form, PasswordInput, Select, Checkbox, 
  RadioGroup, Toggle, Textarea, FileUpload 
} from '@sakhlaqi/ui/forms';

// Buttons (2)
import { IconButton, ButtonGroup } from '@sakhlaqi/ui/buttons';

// Layout (11)
import { 
  AppShell, Header, Footer, Sidebar, Drawer,
  Container, Grid, GridItem, Flex, Section, 
  Divider, Spacer 
} from '@sakhlaqi/ui/layout';

// Navigation (5)
import { 
  Navbar, Breadcrumbs, Tabs, Pagination, Stepper 
} from '@sakhlaqi/ui/navigation';

// Data Display (4)
import { Badge, Avatar, Tooltip, List, ListItem } from '@sakhlaqi/ui/data-display';

// Feedback (3)
import { Alert, Spinner, ProgressBar } from '@sakhlaqi/ui/feedback';

// Overlay (1)
import { Modal } from '@sakhlaqi/ui/overlay';

// Utility (3)
import { ErrorBoundary, Portal, ThemeProvider } from '@sakhlaqi/ui/utility';

// Styles (always import in your main file)
import '@sakhlaqi/ui/styles';
```

## 🔄 Development Workflow

### Publishing Updates

```bash
# 1. Navigate to ui directory
cd ui

# 2. Make your changes
# ... edit components ...

# 3. Test build locally
npm run build

# 4. Bump version (follows semantic versioning)
npm version patch   # 1.0.1 → 1.0.2 (bug fixes)
npm version minor   # 1.0.1 → 1.1.0 (new features)
npm version major   # 1.0.1 → 2.0.0 (breaking changes)

# 5. Commit changes
git add .
git commit -m "feat: describe your changes"

# 6. Push to GitHub
git push origin main

# 7. GitHub Actions automatically publishes! ✨
# Check status: https://github.com/sakhlaqi/real-solutions-ui/actions
```

### Manual Publish (if needed)

```bash
cd ui
npm run build
npm publish
```

### Updating in Presentation

```bash
cd presentation

# Update to latest version
npm update @sakhlaqi/ui

# Or install specific version
npm install @sakhlaqi/ui@1.0.2

# Verify installed version
npm list @sakhlaqi/ui
```

### Local Development/Testing

Test changes before publishing:

```bash
# In ui directory - create a build
cd ui
npm run build

# In presentation directory - install from local
cd ../presentation
npm install ../ui

# Test the changes
npm run dev

# When satisfied, publish the package
cd ../ui
npm version patch
git push origin main
```


## 🛠️ Troubleshooting

### Authentication Issues

**Problem:** `401 Unauthorized` or `403 Forbidden`

**Solutions:**
```bash
# 1. Verify token is set
echo $GITHUB_TOKEN

# 2. Verify token has correct permissions
# - read:packages ✅
# - write:packages ✅
# - repo (if private) ✅

# 3. Check .npmrc configuration
cat ~/.npmrc  # or project .npmrc

# 4. Try regenerating token
# Go to: https://github.com/settings/tokens
```

### Package Not Found

**Problem:** `404 Not Found - GET https://npm.pkg.github.com/@sakhlaqi/ui`

**Solutions:**
- Verify package name: `@sakhlaqi/ui` (must be exact)
- Ensure package is published: https://github.com/sakhlaqi?tab=packages
- Check authentication is configured
- For private repos, ensure token has `repo` scope

### Build/Publish Errors

**Problem:** Build fails or publish rejected

**Solutions:**
```bash
cd ui

# Clean and rebuild
rm -rf dist node_modules
npm install
npm run build

# Verify package.json
cat package.json | grep "name"  # Should be "@sakhlaqi/ui"

# Try publishing with verbose output
npm publish --verbose
```

### Import Errors in Presentation

**Problem:** Cannot find module '@sakhlaqi/ui'

**Solutions:**
```bash
cd presentation

# Verify package is installed
npm list @sakhlaqi/ui

# Reinstall if needed
rm -rf node_modules package-lock.json
npm install

# Check .npmrc exists
cat .npmrc

# Verify registry configuration
npm config get @sakhlaqi:registry
# Should output: https://npm.pkg.github.com
```

### Version Conflicts

**Problem:** React version mismatch or peer dependency errors

**Solutions:**
```bash
# Install with legacy peer deps
npm install @sakhlaqi/ui --legacy-peer-deps

# Or force install
npm install @sakhlaqi/ui --force

# Check React versions match
npm list react
npm list react-dom
```

## 🔒 Security Best Practices

### Token Management

1. **Never commit tokens to git**
   - Add `.npmrc` with tokens to `.gitignore`
   - Use environment variables instead

2. **Use minimal scopes**
   - Only `read:packages` for consumers
   - Only `write:packages` for publishers
   - Add `repo` only if repository is private

3. **Rotate tokens regularly**
   - Set expiration dates (90 days recommended)
   - Update all .npmrc files when rotating
   - Revoke old tokens immediately

4. **Store tokens securely**
   ```bash
   # ✅ Good - environment variable
   export GITHUB_TOKEN=ghp_xxx
   
   # ✅ Good - global .npmrc with restricted permissions
   chmod 600 ~/.npmrc
   
   # ❌ Bad - hardcoded in project .npmrc (committed to git)
   # ❌ Bad - shared in plain text
   ```

### GitHub Actions

The workflow uses `${{ secrets.GITHUB_TOKEN }}` which is:
- ✅ Automatically provided by GitHub
- ✅ Scoped to the repository
- ✅ Rotated automatically
- ✅ No manual configuration needed

## 📊 Semantic Versioning

Follow [semver](https://semver.org/) for version numbers: `MAJOR.MINOR.PATCH`

```bash
# Patch: Bug fixes (1.0.1 → 1.0.2)
npm version patch
git push origin main

# Minor: New features, backwards compatible (1.0.1 → 1.1.0)
npm version minor
git push origin main

# Major: Breaking changes (1.0.1 → 2.0.0)
npm version major
git push origin main

# Pre-release: Beta versions (1.0.1 → 1.0.2-beta.0)
npm version prerelease --preid=beta
git push origin main

# With tags
npm version minor
git push origin main --tags
```

### Version Guidelines

| Change Type | Example | Version Bump |
|------------|---------|--------------|
| Bug fix | Fix button hover state | `patch` |
| New component | Add DatePicker | `minor` |
| Update props | Add new optional prop | `minor` |
| Remove component | Delete deprecated Modal | `major` |
| Change API | Rename required prop | `major` |
| Update styles | Improve spacing | `patch` |

## 📝 Complete Workflow Example

### First Time Setup (Already Done! ✅)

```bash
# 1. Create token at: https://github.com/settings/tokens
# 2. Set environment variable
export GITHUB_TOKEN=ghp_YOUR_TOKEN

# 3. Published via GitHub Actions
# 4. Installed in presentation
cd presentation
npm install @sakhlaqi/ui@1.0.1
```

### Making Changes

```bash
# 1. Edit components
cd ui/src/components/base
# ... make changes to Button.tsx ...

# 2. Test locally
cd ../../..
npm run build
cd ../presentation
npm install ../ui
npm run dev

# 3. Publish
cd ../ui
npm version patch
git add .
git commit -m "fix: improve button accessibility"
git push origin main

# 4. GitHub Actions publishes automatically
# View at: https://github.com/sakhlaqi/real-solutions-ui/actions

# 5. Update presentation
cd ../presentation
npm update @sakhlaqi/ui
```

## ✅ Verification Commands

```bash
# Check package exists on GitHub Packages
npm view @sakhlaqi/ui

# Show all available versions
npm view @sakhlaqi/ui versions

# Check installed version
npm list @sakhlaqi/ui

# View package details
npm view @sakhlaqi/ui

# Test imports work
cd presentation
npm run dev
```

## 🔗 Useful Links

- **UI Repository:** https://github.com/sakhlaqi/real-solutions-ui
- **GitHub Packages:** https://github.com/sakhlaqi?tab=packages
- **GitHub Actions:** https://github.com/sakhlaqi/real-solutions-ui/actions
- **Token Settings:** https://github.com/settings/tokens
- **Package Registry:** https://npm.pkg.github.com/@sakhlaqi/ui

## 📚 Additional Resources

- [GitHub Packages Documentation](https://docs.github.com/en/packages)
- [npm Registry Documentation](https://docs.npmjs.com/cli/v9/using-npm/registry)
- [Semantic Versioning](https://semver.org/)
- [GitHub Actions](https://docs.github.com/en/actions)

---

**Ready to build! 🚀** Your UI library is live and ready to use in your projects.
