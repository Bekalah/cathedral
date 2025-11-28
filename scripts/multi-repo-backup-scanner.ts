/**
 * 🔍✨ MULTI-REPOSITORY & BACKUP SCANNER
 *
 * Scans all live git repositories and backup files
 * to identify packages, systems, and connections.
 *
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

interface RepositoryInfo {
  path: string;
  name: string;
  isGit: boolean;
  remote?: string;
  packages: PackageInfo[];
  apps: string[];
}

interface PackageInfo {
  name: string;
  path: string;
  version?: string;
  dependencies?: string[];
}

export class MultiRepoBackupScanner {
  private baseDir: string;
  private repos: RepositoryInfo[] = [];
  private backups: string[] = [];

  constructor(baseDir: string = path.join(__dirname, '..', '..')) {
    this.baseDir = baseDir;
  }

  public scanAll(): {
    repositories: RepositoryInfo[];
    backups: string[];
    totalPackages: number;
    totalApps: number;
  } {
    console.log('🔍 Scanning all repositories and backups...');

    // Scan repositories from workspace
    const workspaceRepos = [
      'cathedral-fixed-clean',
      'cathedral-real',
      'cathedral-v1-consolidated',
      'cathedral',
      'cosmogenesis-engine',
      'CathedralOfCircuits',
      'restore_temp',
      'cathedral-master-deployment'
    ];

    for (const repoName of workspaceRepos) {
      const repoPath = path.join(this.baseDir, repoName);
      if (fs.existsSync(repoPath)) {
        const repo = this.scanRepository(repoPath, repoName);
        if (repo) {
          this.repos.push(repo);
        }
      }
    }

    // Scan for backups
    this.scanBackups();

    const totalPackages = this.repos.reduce((sum, r) => sum + r.packages.length, 0);
    const totalApps = this.repos.reduce((sum, r) => sum + r.apps.length, 0);

    console.log(`✅ Found ${this.repos.length} repositories`);
    console.log(`📦 Found ${totalPackages} packages`);
    console.log(`📱 Found ${totalApps} apps`);
    console.log(`💾 Found ${this.backups.length} backup files`);

    return {
      repositories: this.repos,
      backups: this.backups,
      totalPackages,
      totalApps
    };
  }

  private scanRepository(repoPath: string, name: string): RepositoryInfo | null {
    try {
      const isGit = fs.existsSync(path.join(repoPath, '.git'));
      let remote: string | undefined;

      if (isGit) {
        try {
          // Check if remote exists first
          execSync('git remote get-url origin', {
            cwd: repoPath,
            encoding: 'utf-8',
            stdio: ['ignore', 'pipe', 'ignore'] // Suppress all output including errors
          });
          // If we get here, remote exists - get the URL
          remote = execSync('git remote get-url origin', {
            cwd: repoPath,
            encoding: 'utf-8',
            stdio: 'pipe'
          }).trim();
        } catch {
          // No remote or not accessible - this is fine, continue silently
          remote = undefined;
        }
      }

      const packages = this.findPackages(repoPath);
      const apps = this.findApps(repoPath);

      return {
        path: repoPath,
        name,
        isGit,
        remote,
        packages,
        apps
      };
    } catch (e) {
      console.error(`Failed to scan ${name}:`, e);
      return null;
    }
  }

  private findPackages(rootDir: string): PackageInfo[] {
    const packages: PackageInfo[] = [];

    const findPackageJson = (dir: string): void => {
      try {
        const files = fs.readdirSync(dir);

        for (const file of files) {
          const fullPath = path.join(dir, file);
          const stat = fs.statSync(fullPath);

          if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
            const packageJsonPath = path.join(fullPath, 'package.json');
            if (fs.existsSync(packageJsonPath)) {
              try {
                const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
                packages.push({
                  name: pkg.name || file,
                  path: fullPath,
                  version: pkg.version,
                  dependencies: pkg.dependencies ? Object.keys(pkg.dependencies) : []
                });
              } catch {
                // Invalid package.json
              }
            }
            // Recurse into subdirectories
            findPackageJson(fullPath);
          }
        }
      } catch {
        // Cannot read directory
      }
    };

    // Check for packages/ and apps/ directories (monorepo structure)
    const packagesDir = path.join(rootDir, 'packages');
    const appsDir = path.join(rootDir, 'apps');

    if (fs.existsSync(packagesDir)) {
      findPackageJson(packagesDir);
    }
    if (fs.existsSync(appsDir)) {
      findPackageJson(appsDir);
    }

    // Also check root
    const rootPackageJson = path.join(rootDir, 'package.json');
    if (fs.existsSync(rootPackageJson)) {
      try {
        const pkg = JSON.parse(fs.readFileSync(rootPackageJson, 'utf-8'));
        packages.push({
          name: pkg.name || path.basename(rootDir),
          path: rootDir,
          version: pkg.version
        });
      } catch {
        // Invalid
      }
    }

    return packages;
  }

  private findApps(rootDir: string): string[] {
    const apps: string[] = [];
    const appsDir = path.join(rootDir, 'apps');

    if (fs.existsSync(appsDir)) {
      try {
        const entries = fs.readdirSync(appsDir);
        for (const entry of entries) {
          const fullPath = path.join(appsDir, entry);
          if (fs.statSync(fullPath).isDirectory()) {
            apps.push(entry);
          }
        }
      } catch {
        // Cannot read
      }
    }

    return apps;
  }

  private scanBackups(): void {
    try {
      const files = fs.readdirSync(this.baseDir);
      for (const file of files) {
        if (file.endsWith('.tar.gz') || file.endsWith('.zip') || file.endsWith('.backup')) {
          this.backups.push(path.join(this.baseDir, file));
        }
      }

      // Also check for backup directories
      const backupDirs = ['restore_temp', 'backups', 'snapshots', 'archives'];
      for (const dir of backupDirs) {
        const backupPath = path.join(this.baseDir, dir);
        if (fs.existsSync(backupPath) && fs.statSync(backupPath).isDirectory()) {
          this.backups.push(backupPath);
        }
      }
    } catch {
      // Cannot scan backups
    }
  }

  public getSystemConnections(): {
    arcanae: string[];
    gates: string[];
    codex: string[];
    grimoire: string[];
    mysteryHouse: string[];
  } {
    const connections = {
      arcanae: [] as string[],
      gates: [] as string[],
      codex: [] as string[],
      grimoire: [] as string[],
      mysteryHouse: [] as string[]
    };

    for (const repo of this.repos) {
      for (const pkg of repo.packages) {
        const name = pkg.name.toLowerCase();
        if (name.includes('arcana') || name.includes('liber-arcanae')) {
          connections.arcanae.push(pkg.path);
        }
        if (name.includes('circuitum') || name.includes('gate')) {
          connections.gates.push(pkg.path);
        }
        if (name.includes('codex')) {
          connections.codex.push(pkg.path);
        }
        if (name.includes('grimoire') || name.includes('stone')) {
          connections.grimoire.push(pkg.path);
        }
        if (name.includes('mystery') || name.includes('house')) {
          connections.mysteryHouse.push(pkg.path);
        }
      }
    }

    return connections;
  }
}

export default MultiRepoBackupScanner;

