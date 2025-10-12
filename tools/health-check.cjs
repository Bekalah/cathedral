// tools/health-check.js - Basic system health validation
const fs = require('fs');
const path = require('path');

console.log('🏥 Running Cathedral health check...');

const checks = [
  {
    name: 'Root package.json exists',
    check: () => fs.existsSync('package.json'),
  },
  {
    name: 'pnpm-workspace.yaml exists',
    check: () => fs.existsSync('pnpm-workspace.yaml'),
  },
  {
    name: 'turbo.json exists',
    check: () => fs.existsSync('turbo.json'),
  },
  {
    name: 'External packages exist',
    check: () => fs.existsSync('external/codex-144-99') && fs.existsSync('external/liber-arcanae'),
  },
  {
    name: 'Tools directory exists',
    check: () => fs.existsSync('tools'),
  },
  {
    name: 'VS Code tasks configured',
    check: () => fs.existsSync('.vscode/tasks.json'),
  },
];

let allPassed = true;

checks.forEach(({ name, check }) => {
  try {
    const passed = check();
    console.log(`${passed ? '✅' : '❌'} ${name}`);
    if (!passed) allPassed = false;
  } catch (error) {
    console.log(`❌ ${name} - Error: ${error.message}`);
    allPassed = false;
  }
});

if (allPassed) {
  console.log('🎉 All health checks passed! Cathedral is ready.');
} else {
  console.log('⚠️ Some health checks failed. Please review the issues above.');
}

process.exit(allPassed ? 0 : 1);
