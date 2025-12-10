#!/usr/bin/env node
/**
 * SPAM AND DUPLICATE DETECTION
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

class SpamDuplicateDetector {
  constructor() {
    this.report = {
      timestamp: new Date().toISOString(),
      duplicate_files: [],
      spam_files: [],
      large_files: [],
      broken_symlinks: [],
      merge_conflicts: [],
      unused_files: [],
      total_duplicates: 0,
      total_spam: 0,
      space_wasted: 0
    };
    
    this.spamPatterns = [
      /\s2\./, /\s2$/, /copy/, /duplicate/, /backup-\d+/, /temp/, /tmp/,
      /test-/, /debug/, /spam/, /old/, /archive/, /\.bak$/, /~$/
    ];
    
    this.skipDirs = ['node_modules', '.git', 'dist', 'build', '.next', '.turbo'];
  }

  async detect() {
    console.log('🔍 Detecting spam and duplicates...\n');
    
    this.detectDuplicateFiles();
    this.detectSpamFiles();
    this.detectLargeFiles();
    this.detectBrokenSymlinks();
    this.detectMergeConflicts();
    this.generateReport();
    
    return this.report;
  }

  detectDuplicateFiles() {
    console.log('🔄 Detecting duplicate files...');
    
    const fileHashes = new Map();
    const files = this.getAllFiles();
    
    files.forEach(file => {
      try {
        const content = fs.readFileSync(file.fullPath);
        const hash = crypto.createHash('md5').update(content).digest('hex');
        
        if (!fileHashes.has(hash)) {
          fileHashes.set(hash, []);
        }
        fileHashes.get(hash).push(file);
        
      } catch (error) {
        // Skip unreadable files
      }
    });
    
    fileHashes.forEach((duplicates, hash) => {
      if (duplicates.length > 1) {
        const totalSize = duplicates.reduce((sum, file) => sum + file.size, 0);
        const wastedSpace = totalSize * (duplicates.length - 1);
        
        this.report.duplicate_files.push({
          hash: hash,
          files: duplicates.map(f => f.relativePath),
          count: duplicates.length,
          size_each: duplicates[0].size,
          total_size: totalSize,
          wasted_space: wastedSpace
        });
        
        this.report.space_wasted += wastedSpace;
        console.log(`  🔄 ${duplicates.length} duplicates: ${duplicates[0].name} (${this.formatSize(wastedSpace)} wasted)`);
      }
    });
    
    this.report.total_duplicates = this.report.duplicate_files.length;
  }

  detectSpamFiles() {
    console.log('🗑️  Detecting spam files...');
    
    const files = this.getAllFiles();
    
    files.forEach(file => {
      if (this.isSpamFile(file.name) || this.isSpamFile(file.relativePath)) {
        this.report.spam_files.push({
          path: file.relativePath,
          name: file.name,
          size: file.size,
          reason: this.getSpamReason(file.name)
        });
        
        console.log(`  🗑️  Spam: ${file.relativePath} (${this.getSpamReason(file.name)})`);
      }
    });
    
    this.report.total_spam = this.report.spam_files.length;
  }

  detectLargeFiles() {
    console.log('📏 Detecting large files...');
    
    const files = this.getAllFiles();
    const largeThreshold = 10 * 1024 * 1024; // 10MB
    
    files.forEach(file => {
      if (file.size > largeThreshold) {
        this.report.large_files.push({
          path: file.relativePath,
          size: file.size,
          size_formatted: this.formatSize(file.size),
          should_use_lfs: this.shouldUseLFS(file)
        });
        
        console.log(`  📏 Large: ${file.relativePath} (${this.formatSize(file.size)})`);
      }
    });
  }

  detectBrokenSymlinks() {
    console.log('🔗 Detecting broken symlinks...');
    
    const files = this.getAllFiles(true); // Include symlinks
    
    files.forEach(file => {
      try {
        const stat = fs.lstatSync(file.fullPath);
        if (stat.isSymbolicLink()) {
          const target = fs.readlinkSync(file.fullPath);
          const targetPath = path.resolve(path.dirname(file.fullPath), target);
          
          if (!fs.existsSync(targetPath)) {
            this.report.broken_symlinks.push({
              path: file.relativePath,
              target: target,
              target_path: targetPath
            });
            
            console.log(`  🔗 Broken symlink: ${file.relativePath} -> ${target}`);
          }
        }
      } catch (error) {
        // Skip
      }
    });
  }

  detectMergeConflicts() {
    console.log('⚔️  Detecting merge conflict markers...');
    
    const files = this.getAllFiles();
    const textExtensions = ['.js', '.ts', '.html', '.css', '.md', '.json', '.txt'];
    
    files.forEach(file => {
      if (!textExtensions.includes(file.extension)) return;
      
      try {
        const content = fs.readFileSync(file.fullPath, 'utf8');
        
        if (content.includes('<<<<<<<') || content.includes('>>>>>>>') || content.includes('=======')) {
          const lines = content.split('\n');
          const conflictLines = [];
          
          lines.forEach((line, index) => {
            if (line.includes('<<<<<<<') || line.includes('>>>>>>>') || line.includes('=======')) {
              conflictLines.push(index + 1);
            }
          });
          
          this.report.merge_conflicts.push({
            path: file.relativePath,
            conflict_lines: conflictLines
          });
          
          console.log(`  ⚔️  Merge conflict: ${file.relativePath} (lines: ${conflictLines.join(', ')})`);
        }
      } catch (error) {
        // Skip binary files
      }
    });
  }

  getAllFiles(includeSymlinks = false) {
    const files = [];
    
    const scan = (dir, relativePath = '') => {
      try {
        const items = fs.readdirSync(dir);
        
        items.forEach(item => {
          if (item.startsWith('.') && item !== '.gitignore') return;
          
          const fullPath = path.join(dir, item);
          const relPath = path.join(relativePath, item);
          
          try {
            const stat = includeSymlinks ? fs.lstatSync(fullPath) : fs.statSync(fullPath);
            
            if (stat.isDirectory() && !this.skipDirs.includes(item)) {
              scan(fullPath, relPath);
            } else if (stat.isFile() || (includeSymlinks && stat.isSymbolicLink())) {
              files.push({
                name: item,
                relativePath: relPath,
                fullPath: fullPath,
                extension: path.extname(item),
                size: stat.size,
                modified: stat.mtime.toISOString()
              });
            }
          } catch (error) {
            // Skip unreadable files
          }
        });
      } catch (error) {
        // Skip unreadable directories
      }
    };
    
    scan('.');
    return files;
  }

  isSpamFile(filename) {
    return this.spamPatterns.some(pattern => pattern.test(filename));
  }

  getSpamReason(filename) {
    if (/\s2\./.test(filename)) return 'Duplicate with " 2" suffix';
    if (/copy/.test(filename)) return 'Contains "copy"';
    if (/duplicate/.test(filename)) return 'Contains "duplicate"';
    if (/backup-\d+/.test(filename)) return 'Backup file pattern';
    if (/temp|tmp/.test(filename)) return 'Temporary file';
    if (/test-|debug/.test(filename)) return 'Test/debug file';
    if (/\.bak$|~$/.test(filename)) return 'Backup file extension';
    
    return 'Matches spam pattern';
  }

  shouldUseLFS(file) {
    const lfsExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.mp4', '.mov', '.zip', '.tar.gz'];
    return lfsExtensions.includes(file.extension);
  }

  formatSize(bytes) {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  }

  generateReport() {
    console.log('\n📊 Generating spam/duplicate report...');
    
    console.log(`  🔄 Duplicate files: ${this.report.total_duplicates}`);
    console.log(`  🗑️  Spam files: ${this.report.total_spam}`);
    console.log(`  📏 Large files: ${this.report.large_files.length}`);
    console.log(`  🔗 Broken symlinks: ${this.report.broken_symlinks.length}`);
    console.log(`  ⚔️  Merge conflicts: ${this.report.merge_conflicts.length}`);
    console.log(`  💾 Space wasted: ${this.formatSize(this.report.space_wasted)}`);
    
    // Save report
    fs.writeFileSync('reports/duplicates-and-spam.json', JSON.stringify(this.report, null, 2));
    console.log('\n💾 Report saved to: reports/duplicates-and-spam.json');
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const detector = new SpamDuplicateDetector();
  detector.detect();
}