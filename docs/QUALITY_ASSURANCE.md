# Cathedral Quality Assurance Standards

## Overview

This document establishes the comprehensive quality assurance infrastructure for the Cathedral Real monorepo, ensuring enterprise-grade code quality across all 131 packages.

## Table of Contents

- [Quality Assurance Infrastructure](#quality-assurance-infrastructure)
- [ESLint Configuration](#eslint-configuration)
- [Prettier Integration](#prettier-integration)
- [TypeScript Strict Mode](#typescript-strict-mode)
- [Testing Standards](#testing-standards)
- [Security Scanning](#security-scanning)
- [Code Complexity Guidelines](#code-complexity-guidelines)
- [CI/CD Integration](#cicd-integration)
- [Quality Scripts](#quality-scripts)
- [Trauma-Safe Coding Standards](#trauma-safe-coding-standards)

## Quality Assurance Infrastructure

### Core Components

The Cathedral quality assurance system consists of:

1. **ESLint**: Code linting with Cathedral-specific rules
2. **Prettier**: Code formatting consistency
3. **TypeScript**: Strict type checking and compilation
4. **Jest/Vitest**: Unit and integration testing
5. **Security Scanning**: NPM audit and vulnerability detection
6. **Quality Scripts**: Automated quality checks
7. **Trauma-Safe Standards**: Accessibility and safety guidelines

### Configuration Files

- `.eslintrc.js` - Main ESLint configuration with Cathedral rules
- `.prettierrc` - Prettier formatting rules
- `.prettierignore` - Files to exclude from formatting
- `jest.config.js` - Jest testing configuration
- `tsconfig.json` - TypeScript strict configuration
- `scripts/quality-check.js` - Comprehensive quality check script

## ESLint Configuration

### Cathedral-Specific Rules

```javascript
{
  "rules": {
    // Trauma-aware and safety rules
    "no-autoplay": "error",
    "no-flicker": "error",
    "prefer-gentle-animations": "warn",
    
    // TypeScript strict rules
    "@typescript-eslint/no-unused-vars": ["error", { 
      "argsIgnorePattern": "^_",
      "varsIgnorePattern": "^_",
      "caughtErrorsIgnorePattern": "^_"
    }],
    "@typescript-eslint/explicit-any": "warn",
    "@typescript-eslint/prefer-const": "error",
    "@typescript-eslint/consistent-type-imports": "error",
    
    // Import organization
    "import/order": ["error", {
      "groups": ["builtin", "external", "internal", "parent", "sibling", "index", "type"],
      "newlines-between": "always",
      "alphabetize": { "order": "asc", "caseInsensitive": true }
    }],
    
    // Security and safety
    "no-console": "warn",
    "no-debugger": "error",
    "no-alert": "error",
    "no-eval": "error"
  }
}
```

### Usage

```bash
# Check code quality
npm run lint

# Fix automatically fixable issues
npm run lint:fix
```

## Prettier Integration

### Configuration

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

### Usage

```bash
# Format all files
npm run format

# Check formatting without making changes
npm run format:check
```

## TypeScript Strict Mode

### Configuration Features

- **Strict Type Checking**: Full strict mode enabled
- **No Implicit Any**: Prevents implicit any types
- **Strict Null Checks**: Proper null/undefined handling
- **No Unused Locals/Parameters**: Removes dead code
- **Exact Optional Property Types**: Precise optional property handling

### Key Settings

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

### Usage

```bash
# Check types
npm run type-check
```

## Testing Standards

### Framework

- **Primary**: Vitest for modern testing
- **Alternative**: Jest for legacy compatibility
- **Coverage Target**: 80% minimum
- **Test Types**: Unit, Integration, E2E where applicable

### Configuration

```javascript
{
  "testEnvironment": "node",
  "collectCoverageFrom": [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.test.{ts,tsx}",
    "!src/index.ts"
  ],
  "coverageThreshold": {
    "global": {
      "branches": 80,
      "functions": 80,
      "lines": 80,
      "statements": 80
    }
  }
}
```

### Usage

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage

# Watch mode for development
npm run test:watch
```

## Security Scanning

### NPM Audit Integration

```bash
# Basic audit
npm run deps:audit

# Security-focused quality check
npm run quality:security

# Full security audit with quality checks
npm run quality:audit
```

### Vulnerability Thresholds

- **Critical**: 0 allowed (build fails)
- **High**: 0 allowed (build fails)
- **Moderate**: Warning level (build continues)

### Security Best Practices

1. **Dependency Scanning**: Automated vulnerability detection
2. **License Compliance**: Ensure all dependencies are permissive
3. **Regular Updates**: Automated dependency updates
4. **Security Policy**: Clear guidelines for handling vulnerabilities

## Code Complexity Guidelines

### Limits

- **Cyclomatic Complexity**: Maximum 10 per function
- **File Length**: Maximum 300 lines
- **Function Length**: Maximum 50 lines
- **Nesting Depth**: Maximum 4 levels

### Automated Checks

- ESLint complexity rules
- File size monitoring
- Function length validation

## CI/CD Integration

### Quality Pipeline

```yaml
# Turbo CI pipeline integration
"validate:ci": {
  "dependsOn": ["type-check", "lint", "test:ci"],
  "cache": true
}

"quality:full": {
  "dependsOn": ["quality", "quality:audit", "validate"],
  "cache": true
}
```

### Quality Gates

1. **Type Checking**: Must pass
2. **Linting**: Must pass (warnings allowed)
3. **Tests**: Must pass with 80%+ coverage
4. **Security**: No critical/high vulnerabilities
5. **Formatting**: Prettier compliance

## Quality Scripts

### Comprehensive Quality Check

```bash
# Run all quality checks
npm run quality

# Full quality validation
npm run quality:full

# Security-focused quality check
npm run quality:security

# Quality + security audit
npm run quality:audit
```

### Individual Components

```bash
# Code quality
npm run lint

# Code formatting
npm run format

# Type checking
npm run type-check

# Testing
npm test

# Security audit
npm run deps:audit
```

## Trauma-Safe Coding Standards

### Accessibility Guidelines

1. **No Autoplay**: No automatic audio/video playback
2. **Flicker Prevention**: Avoid rapid flashing content
3. **Gentle Animations**: Prefer subtle, smooth transitions
4. **Keyboard Navigation**: Full keyboard accessibility
5. **Screen Reader Support**: Proper ARIA labels

### Safety Rules

```javascript
{
  "rules": {
    "no-autoplay": "error",
    "no-flicker": "error", 
    "prefer-gentle-animations": "warn"
  }
}
```

### Implementation Guidelines

1. **User Control**: Always provide user controls for media
2. **Reduced Motion**: Respect prefers-reduced-motion
3. **Color Contrast**: Maintain WCAG AA compliance
4. **Focus Management**: Proper focus indicators and management
5. **Error Handling**: Graceful error handling without panic

## File Structure Standards

### Package Organization

```
packages/{package-name}/
├── src/
│   ├── index.ts
│   ├── {module}.ts
│   └── types/
├── __tests__/
│   ├── {module}.test.ts
│   └── integration.test.ts
├── docs/
│   └── index.md
├── package.json
├── tsconfig.json
└── README.md
```

### Naming Conventions

- **Files**: kebab-case for files, PascalCase for classes
- **Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Types/Interfaces**: PascalCase
- **Functions**: camelCase
- **Components**: PascalCase

## Quality Metrics

### Tracking

- **Test Coverage**: 80% minimum
- **Type Coverage**: 100% for public APIs
- **Security Score**: No critical/high vulnerabilities
- **Code Quality**: ESLint pass with < 5 warnings
- **Performance**: Build time < 5 minutes

### Reporting

- Automated quality reports
- Coverage reports in CI
- Security vulnerability alerts
- Performance benchmarking

## Developer Guidelines

### Pre-commit Checklist

1. Run `npm run lint:fix`
2. Run `npm run format`
3. Run `npm run type-check`
4. Run `npm test`
5. Verify no security vulnerabilities
6. Update documentation if needed

### New Package Standards

When creating new packages:

1. Include ESLint configuration
2. Add TypeScript strict mode
3. Implement test coverage
4. Add README.md with usage examples
5. Include trauma-safety guidelines
6. Add appropriate licensing

### Code Review Standards

1. **Functionality**: Code works as intended
2. **Quality**: Passes all quality checks
3. **Tests**: Adequate test coverage
4. **Documentation**: Clear and complete
5. **Security**: No security vulnerabilities
6. **Accessibility**: Trauma-safe implementation

## Enforcement

### Automated Enforcement

- Pre-commit hooks for basic quality checks
- CI pipeline quality gates
- Automated security scanning
- Dependency vulnerability monitoring

### Manual Enforcement

- Code review requirements
- Documentation standards
- Performance benchmarking
- Security audit requirements

---

## Support and Resources

### Getting Help

- Quality Issues: Run `npm run quality` for detailed report
- Security Concerns: Contact security team
- Accessibility Questions: Review trauma-safe guidelines
- Performance Issues: Check benchmarking results

### Tools and References

- [ESLint Documentation](https://eslint.org/docs/)
- [Prettier Documentation](https://prettier.io/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vitest Testing Guide](https://vitest.dev/guide/)
- [WCAG Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

*This document is maintained by the Cathedral Quality Assurance team and updated with each release.*