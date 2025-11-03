#!/usr/bin/env node
/**
 * 📊 DATA SYNCHRONIZATION SCRIPT
 * Master Cathedral V1.0 - Sync canonical data to all packages
 * 
 * This script copies canonical data from data/canonical/ to all packages
 * that need it, ensuring consistency across the entire monorepo.
 */

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

const CANONICAL_DATA_DIR = './data/canonical'
const PACKAGES_DIR = './packages'
const APPS_DIR = './apps'

// Configuration for data distribution
const DATA_DISTRIBUTION = {
  'packages/*': {
    copy: ['arcana/**', 'game/**', 'ui/**'],
    outputDir: 'dist/data',
    formats: ['json']
  },
  'apps/web': {
    copy: ['arcana/**', 'ui/**'],
    outputDir: 'public/data',
    formats: ['json']
  },
  'packages/codex-144-99': {
    copy: ['research/**', 'arcana/**'],
    outputDir: 'dist/data',
    formats: ['json']
  },
  'packages/liber-arcanae': {
    copy: ['arcana/**', 'game/**'],
    outputDir: 'dist/data',
    formats: ['json']
  }
}

function log(message, type = 'info') {
  const colors = {
    info: '\x1b[36m',    // Cyan
    success: '\x1b[32m', // Green
    warning: '\x1b[33m', // Yellow
    error: '\x1b[31m'    // Red
  }
  const reset = '\x1b[0m'
  const timestamp = new Date().toISOString()
  console.log(`${colors[type]}[${timestamp}] ${message}${reset}`)
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
    log(`Created directory: ${dir}`, 'info')
  }
}

function copyFiles(srcDir, destDir, pattern) {
  try {
    const files = fs.readdirSync(srcDir, { withFileTypes: true })
    
    for (const file of files) {
      const srcPath = path.join(srcDir, file.name)
      const destPath = path.join(destDir, file.name)
      
      if (file.isDirectory()) {
        ensureDir(destPath)
        copyFiles(srcPath, destPath, pattern)
      } else if (file.isFile()) {
        if (pattern === '**' || file.name.endsWith('.json')) {
          fs.copyFileSync(srcPath, destPath)
          log(`Copied: ${file.name}`, 'success')
        }
      }
    }
  } catch (error) {
    log(`Error copying from ${srcDir}: ${error.message}`, 'error')
  }
}

function syncPackageData(packagePath, config) {
  log(`Syncing data for: ${packagePath}`, 'info')
  
  const destDir = path.join(packagePath, config.outputDir)
  ensureDir(destDir)
  
  for (const pattern of config.copy) {
    const srcPath = path.join(CANONICAL_DATA_DIR, pattern)
    
    // Handle glob patterns
    if (pattern.includes('*')) {
      const [category, subPattern] = pattern.split('/')
      const categoryPath = path.join(CANONICAL_DATA_DIR, category)
      
      if (fs.existsSync(categoryPath)) {
        copyFiles(categoryPath, destDir, '**')
      }
    } else {
      if (fs.existsSync(srcPath)) {
        copyFiles(srcPath, destDir, '**')
      }
    }
  }
  
  log(`Data sync completed for ${packagePath}`, 'success')
}

function validateDataIntegrity() {
  log('Validating data integrity...', 'info')
  
  const validationRules = [
    {
      check: 'majors.json exists',
      test: () => fs.existsSync(path.join(CANONICAL_DATA_DIR, 'arcana', 'majors.json'))
    },
    {
      check: 'minors.json exists',
      test: () => fs.existsSync(path.join(CANONICAL_DATA_DIR, 'arcana', 'minors.json'))
    },
    {
      check: 'nodes.json exists',
      test: () => fs.existsSync(path.join(CANONICAL_DATA_DIR, 'arcana', 'nodes.json'))
    },
    {
      check: 'characters.json exists',
      test: () => fs.existsSync(path.join(CANONICAL_DATA_DIR, 'game', 'characters.json'))
    }
  ]
  
  let allValid = true
  for (const rule of validationRules) {
    try {
      if (rule.test()) {
        log(`✅ ${rule.check}`, 'success')
      } else {
        log(`❌ ${rule.check}`, 'error')
        allValid = false
      }
    } catch (error) {
      log(`❌ ${rule.check}: ${error.message}`, 'error')
      allValid = false
    }
  }
  
  return allValid
}

function generateDataManifest() {
  log('Generating data manifest...', 'info')
  
  const manifest = {
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    canonical_source: CANONICAL_DATA_DIR,
    distributed_packages: Object.keys(DATA_DISTRIBUTION),
    validation_status: 'pending'
  }
  
  // Add file hashes for integrity
  const files = {}
  function addFileHashes(dir) {
    const items = fs.readdirSync(dir, { withFileTypes: true })
    for (const item of items) {
      const fullPath = path.join(dir, item.name)
      if (item.isFile()) {
        const content = fs.readFileSync(fullPath, 'utf8')
        files[path.relative(CANONICAL_DATA_DIR, fullPath)] = 
          require('crypto').createHash('md5').update(content).digest('hex')
      } else if (item.isDirectory()) {
        addFileHashes(fullPath)
      }
    }
  }
  
  addFileHashes(CANONICAL_DATA_DIR)
  manifest.file_hashes = files
  manifest.validation_status = 'validated'
  
  const manifestPath = path.join(CANONICAL_DATA_DIR, 'manifest.json')
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
  
  log(`Data manifest generated: ${manifestPath}`, 'success')
  return manifest
}

async function main() {
  log('🏰 Master Cathedral V1.0 - Data Synchronization Started', 'info')
  
  try {
    // 1. Validate canonical data exists
    if (!fs.existsSync(CANONICAL_DATA_DIR)) {
      log('Canonical data directory not found. Creating structure...', 'warning')
      ensureDir(CANONICAL_DATA_DIR)
      
      // Create basic structure
      ensureDir(path.join(CANONICAL_DATA_DIR, 'arcana'))
      ensureDir(path.join(CANONICAL_DATA_DIR, 'game'))
      ensureDir(path.join(CANONICAL_DATA_DIR, 'ui'))
      ensureDir(path.join(CANONICAL_DATA_DIR, 'research'))
    }
    
    // 2. Validate data integrity
    const isValid = validateDataIntegrity()
    if (!isValid) {
      log('Data validation failed. Please ensure all canonical data files exist.', 'error')
      process.exit(1)
    }
    
    // 3. Sync data to each package
    for (const [target, config] of Object.entries(DATA_DISTRIBUTION)) {
      if (target === 'packages/*') {
        // Handle package wildcard
        const packages = fs.readdirSync(PACKAGES_DIR, { withFileTypes: true })
          .filter(item => item.isDirectory())
          .map(item => path.join(PACKAGES_DIR, item.name))
        
        for (const pkg of packages) {
          syncPackageData(pkg, config)
        }
      } else {
        const targetPath = path.join(target.startsWith('packages/') ? PACKAGES_DIR : APPS_DIR, target.split('/')[1])
        if (fs.existsSync(targetPath)) {
          syncPackageData(targetPath, config)
        }
      }
    }
    
    // 4. Generate manifest
    const manifest = generateDataManifest()
    
    // 5. Final validation
    log('🏁 Data synchronization completed successfully!', 'success')
    log(`📊 Synced to ${Object.keys(DATA_DISTRIBUTION).length} targets`)
    log(`📋 Generated manifest with ${Object.keys(manifest.file_hashes).length} files`)
    
    // 6. Update OpenSpec if needed
    log('📝 Update OpenSpec specifications with new data structure...', 'info')
    
    process.exit(0)
    
  } catch (error) {
    log(`💥 Data synchronization failed: ${error.message}`, 'error')
    console.error(error)
    process.exit(1)
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}