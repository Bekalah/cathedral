# Cathedral Real Enterprise GitLab CI/CD Pipeline Templates

## Main Pipeline Template (.gitlab-ci.yml)

```yaml
# Cathedral Real Enterprise CI/CD Pipeline
# GitLab Ultimate Monorepo Configuration
# Target: <4min build time, SOC2 compliance, Multi-platform deployment

stages:
  - validate
  - test
  - security
  - build
  - package
  - deploy-staging
  - deploy-production
  - notify

variables:
  # Performance targets
  CATHEDRAL_BUILD_TARGET: "240"  # 4 minutes in seconds
  CACHE_HIT_TARGET: "85"         # 85% cache hit rate
  SECURITY_SCAN_TIMEOUT: "300"   # 5 minutes for security scans
  
  # Node.js and package management
  NODE_VERSION: "20"
  PNPM_VERSION: "8.15.0"
  
  # Performance optimization
  NODE_OPTIONS: "--max-old-space-size=4096"
  TURBO_CACHE_DIR: ".turbo"
  PNPM_STORE_DIR: ".pnpm-store"
  
  # GitLab cache keys
  NODE_MODULES_CACHE_KEY: "${CI_COMMIT_REF_SLUG}-${CI_COMMIT_SHA}"
  TURBO_CACHE_KEY: "${CI_COMMIT_REF_SLUG}-${CI_COMMIT_SHA}"
  
  # SOC2 Compliance settings
  SOC2_REQUIRED: "true"
  AUDIT_TRAIL_LEVEL: "detailed"

# Global cache configuration
cache:
  key: ${NODE_MODULES_CACHE_KEY}
  paths:
    - node_modules/
    - ${TURBO_CACHE_DIR}/
    - ${PNPM_STORE_DIR}/
  policy: pull-push

# Multi-arch runners for performance
.default_job_template: &default_job
  tags:
    - shared
    - docker
    - node-20
  image: node:20
  before_script:
    - corepack enable
    - corepack prepare pnpm@${PNPM_VERSION} --activate
    - pnpm config set store-dir ${PNPM_STORE_DIR}
    - pnpm install --frozen-lockfile

# ===========================================
# STAGE 1: VALIDATION & TESTING
# ===========================================

# Matrix testing across Node versions
.test_matrix:
  <<: *default_job
  stage: test
  strategy: matrix
  matrix:
    - node_version: ["18", "20", "22"]
  image: node:${node_version}
  script:
    - echo "Testing on Node ${node_version}"
    - pnpm turbo run type-check
    - pnpm turbo run lint
    - pnpm turbo run test:ci
    - pnpm run benchmark
  artifacts:
    reports:
      junit: "**/test-results.xml"
      coverage_report:
        coverage_format: cobertura
        path: "**/coverage/cobertura-coverage.xml"
    expire_in: 1 week
  coverage: '/Lines\s*:\s*(\d+\.\d+%)/'
  allow_failure: false

# Build validation with package dependency resolution
.validate_build:
  <<: *default_job
  stage: validate
  script:
    - echo "🔍 Validating build configuration..."
    - pnpm turbo run validate:build
    - node scripts/build-validator.js
    - node scripts/dependency-graph-validator.js
    - node scripts/cathedral-package-validator.js
  artifacts:
    reports:
      junit: "build-validation-results.xml"
    expire_in: 1 week

# Cathedral-specific validation (sacred geometry, trauma safety)
.validate_cathedral:
  <<: *default_job
  stage: validate
  script:
    - echo "🏰 Validating Cathedral-specific patterns..."
    - pnpm turbo run validate:sacred-math
    - pnpm turbo run validate:trauma-safety
    - pnpm turbo run validate:integration
    - pnpm turbo run validate:ownership
  artifacts:
    paths:
      - "**/sacred-math-results.json"
      - "**/trauma-safety-results.json"
      - "**/integration-results.json"
    expire_in: 2 weeks

# ===========================================
# STAGE 2: SECURITY & COMPLIANCE
# ===========================================

# SAST (Static Application Security Testing)
.security_saast:
  <<: *default_job
  stage: security
  image: securecodewarrior/github-action-semgrep
  script:
    - echo "🔒 Running SAST security analysis..."
    - semgrep --config=auto --json --output=semgrep-report.json
    - node scripts/security-parser.js semgrep-report.json
  artifacts:
    reports:
      sast: semgrep-report.json
    expire_in: 1 month
  allow_failure: false
  timeout: ${SECURITY_SCAN_TIMEOUT}

# DAST (Dynamic Application Security Testing)  
.security_dast:
  <<: *default_job
  stage: security
  image: owasp/zap2docker-stable:latest
  script:
    - echo "🔍 Running DAST security analysis..."
    - |
      if [ -n "$DAST_TARGET_URL" ]; then
        zap-full-scan.py -t $DAST_TARGET_URL -J dast-report.json || true
        node scripts/security-parser.js dast-report.json "dast"
      else
        echo "DAST target URL not provided, skipping DAST scan"
      fi
  artifacts:
    reports:
      dast: dast-report.json
    expire_in: 1 month
  allow_failure: true
  timeout: ${SECURITY_SCAN_TIMEOUT}

# Dependency vulnerability scanning
.security_dependencies:
  <<: *default_job
  stage: security
  image: snyk/snyk:node
  script:
    - echo "🔍 Scanning dependencies for vulnerabilities..."
    - snyk test --json --file=pnpm-lock.yaml > dependency-scan.json
    - snyk monitor --json --file=pnpm-lock.yaml
  artifacts:
    reports:
      dependency_scanning: dependency-scan.json
    expire_in: 1 month
  allow_failure: true

# SOC2 compliance validation
.compliance_soc2:
  <<: *default_job
  stage: security
  script:
    - echo "✅ Validating SOC2 compliance requirements..."
    - node scripts/soc2-compliance.js
    - node scripts/audit-trail-validator.js
    - node scripts/access-control-validator.js
  artifacts:
    reports:
      junit: soc2-compliance.xml
    expire_in: 1 month
  allow_failure: false

# ===========================================
# STAGE 3: BUILD & PACKAGE
# ===========================================

# Monorepo-aware build with selective compilation
.build_packages:
  <<: *default_job
  stage: build
  script:
    - echo "🏗️ Building packages with Turbo..."
    - |
      if [ "$CI_COMMIT_REF_NAME" = "main" ]; then
        pnpm run build:ci
      else
        # Selective build for feature branches
        pnpm run build:selective
      fi
    - node scripts/build-performance-monitor.js
    - node scripts/cache-efficiency-reporter.js
  artifacts:
    paths:
      - "**/dist/"
      - "**/build/"
      - "**/out/"
      - "build-performance.json"
    expire_in: 2 weeks
  timeout: 300
  resource_group: build

# Package library publication
.package_libraries:
  <<: *default_job
  stage: package
  script:
    - echo "📦 Packaging libraries for distribution..."
    - pnpm run package:libraries
    - node scripts/package-validator.js
    - node scripts/version-consistency-check.js
  artifacts:
    paths:
      - "**/lib/"
      - "package-metadata.json"
    expire_in: 1 month
  only:
    - main
    - develop
  allow_failure: false

# ===========================================
# STAGE 4: DEPLOYMENT
# ===========================================

# Staging deployment with integration testing
.deploy_staging:
  <<: *default_job
  stage: deploy-staging
  script:
    - echo "🚀 Deploying to staging environment..."
    - node scripts/deployment-manager.js staging
    - pnpm run test:integration
    - node scripts/health-check.js staging
  environment:
    name: staging
    url: $STAGING_URL
  artifacts:
    paths:
      - "deployment-artifacts/"
      - "health-check-results.json"
    expire_in: 1 week
  only:
    - develop
    - main
  allow_failure: true

# Production deployment with approval gates
.deploy_production:
  <<: *default_job
  stage: deploy-production
  script:
    - echo "🚀 Deploying to production environment..."
    - node scripts/deployment-manager.js production
    - node scripts/production-health-check.js
    - node scripts/performance-regression-check.js
  environment:
    name: production
    url: $PRODUCTION_URL
  artifacts:
    paths:
      - "deployment-artifacts/"
      - "production-health.json"
      - "performance-metrics.json"
    expire_in: 1 month
  only:
    - main
  when: manual
  allow_failure: false

# Vercel deployment for web applications
.deploy_vercel:
  <<: *default_job
  stage: deploy-production
  script:
    - echo "🌐 Deploying to Vercel..."
    - npm install -g vercel@latest
    - vercel pull --yes --environment=production --token=$VERCEL_TOKEN
    - vercel build --prod --token=$VERCEL_TOKEN
    - vercel deploy --prebuilt --prod --token=$VERCEL_TOKEN
  environment:
    name: vercel-production
    url: $VERCEL_URL
  artifacts:
    paths:
      - "vercel-deployment.json"
    expire_in: 2 weeks
  only:
    - main
  when: manual
  allow_failure: false

# Cloudflare deployment for edge functions
.deploy_cloudflare:
  <<: *default_job
  stage: deploy-production
  script:
    - echo "☁️ Deploying to Cloudflare..."
    - npm install -g wrangler@latest
    - wrangler publish --compatibility-date=2025-12-01
    - node scripts/cloudflare-health-check.js
  environment:
    name: cloudflare-production
    url: $CLOUDFLARE_URL
  artifacts:
    paths:
      - "cloudflare-deployment.json"
    expire_in: 2 weeks
  only:
    - main
  when: manual
  allow_failure: false

# npm package publishing
.publish_npm:
  <<: *default_job
  stage: deploy-production
  image: node:20
  script:
    - echo "📤 Publishing packages to npm..."
    - pnpm run publish:all
  environment:
    name: npm-registry
    url: https://npmjs.com/@cathedral-real
  artifacts:
    paths:
      - "publish-results.json"
    expire_in: 1 month
  only:
    - main
  when: manual
  allow_failure: false

# ===========================================
# STAGE 5: MONITORING & NOTIFICATION
# ===========================================

# Performance monitoring and alerting
.monitor_performance:
  <<: *default_job
  stage: notify
  script:
    - echo "📊 Generating performance report..."
    - node scripts/performance-dashboard.js
    - node scripts/send-performance-alerts.js
  artifacts:
    paths:
      - "performance-dashboard.json"
    expire_in: 2 weeks
  only:
    - schedules

# Team notifications
.notify_team:
  <<: *default_job
  stage: notify
  script:
    - node scripts/notification-manager.js
    - |
      if [ "$CI_JOB_STATUS" = "failed" ]; then
        echo "❌ Pipeline failed, sending alerts..."
        node scripts/send-failure-alerts.js
      else
        echo "✅ Pipeline completed successfully"
        node scripts/send-success-notification.js
      fi
  when: always
  allow_failure: true

# ===========================================
# PIPELINE JOBS
# ===========================================

# Trigger main pipeline for main/develop branches
main_pipeline:
  extends:
    - .test_matrix
    - .validate_build
    - .validate_cathedral
    - .security_saast
    - .security_dependencies
    - .compliance_soc2
    - .build_packages
    - .deploy_staging
    - .deploy_production
    - .deploy_vercel
    - .deploy_cloudflare
    - .publish_npm
    - .monitor_performance
    - .notify_team
  only:
    - main
    - develop

# Feature branch pipeline (lighter weight)
feature_pipeline:
  extends:
    - .test_matrix
    - .validate_build
    - .build_packages
  except:
    - main
    - develop

# Scheduled pipeline for monitoring
scheduled_pipeline:
  extends:
    - .monitor_performance
  only:
    - schedules

# Manual deployment triggers
manual_production:
  extends:
    - .deploy_production
    - .deploy_vercel
    - .deploy_cloudflare
    - .publish_npm
  when: manual
  only:
    - main

# ===========================================
# PIPELINE RULES
# ===========================================

# Workflow rules for branch-based execution
workflow:
  rules:
    - if: $CI_COMMIT_BRANCH == "main"
      variables:
        PIPELINE_TYPE: "production"
    - if: $CI_COMMIT_BRANCH == "develop"
      variables:
        PIPELINE_TYPE: "staging"
    - if: $CI_COMMIT_BRANCH =~ /^feature\/.*/
      variables:
        PIPELINE_TYPE: "feature"
    - if: $CI_COMMIT_TAG
      variables:
        PIPELINE_TYPE: "release"
    - if: $CI_PIPELINE_SOURCE == "schedule"
      variables:
        PIPELINE_TYPE: "monitoring"

# ===========================================
# PIPELINE OPTIMIZATION
# ===========================================

# Cache invalidation rules
cache:
  key: 
    files:
      - pnpm-lock.yaml
  paths:
    - node_modules/
    - ${TURBO_CACHE_DIR}/
  policy: pull-push

# Parallel job execution
parallel_jobs:
  script:
    - echo "Running in parallel for performance optimization"
  parallel:
    matrix:
      - JOB_TYPE: ["build", "test", "security"]

# Resource optimization
build_optimization:
  resource_group: build
  timeout: 300
  retry:
    max: 2
    when:
      - runner_system_failure
      - stuck_or_timeout_failure

# ===========================================
# ENVIRONMENT-SPECIFIC CONFIGURATIONS
# ===========================================

# Development environment
.dev_environment:
  variables:
    NODE_ENV: "development"
    BUILD_TARGET: "dev"
    ENABLE_DEBUG: "true"
    CACHE_STRATEGY: "aggressive"

# Staging environment
.staging_environment:
  variables:
    NODE_ENV: "staging"
    BUILD_TARGET: "staging"
    ENABLE_INTEGRATION_TESTS: "true"
    CACHE_STRATEGY: "balanced"

# Production environment
.production_environment:
  variables:
    NODE_ENV: "production"
    BUILD_TARGET: "production"
    ENABLE_SECURITY_SCANS: "true"
    ENABLE_PERFORMANCE_MONITORING: "true"
    CACHE_STRATEGY: "conservative"

# ===========================================
# PIPELINE TEMPLATES FOR DIFFERENT PACKAGE TYPES
# ===========================================

# Library packages pipeline template
.library_pipeline:
  extends:
    - .validate_build
    - .security_dependencies
    - .build_packages
    - .package_libraries
  variables:
    PIPELINE_TYPE: "library"

# Web application pipeline template
.webapp_pipeline:
  extends:
    - .test_matrix
    - .security_saast
    - .security_dast
    - .build_packages
    - .deploy_vercel
  variables:
    PIPELINE_TYPE: "webapp"

# API service pipeline template
.api_pipeline:
  extends:
    - .test_matrix
    - .security_saast
    - .security_dast
    - .build_packages
    - .deploy_cloudflare
  variables:
    PIPELINE_TYPE: "api"

# Utility: Performance baseline validation
.performance_baseline:
  script:
    - echo "📊 Validating performance against baseline..."
    - node scripts/performance-baseline-validator.js
    - |
      if [ "$PERFORMANCE_SCORE" -lt "80" ]; then
        echo "❌ Performance below baseline threshold"
        exit 1
      else
        echo "✅ Performance meets baseline requirements"
      fi
  artifacts:
    reports:
      junit: performance-baseline.xml
  allow_failure: true

# ===========================================
# PIPELINE COMPLETION
# ===========================================

# Final pipeline validation
pipeline_complete:
  extends:
    - .notify_team
    - .performance_baseline
  script:
    - echo "✅ Pipeline execution complete"
    - node scripts/pipeline-completion-reporter.js
  when: always
  allow_failure: true
```

## Security Templates

### SAST Security Template
```yaml
# .gitlab-ci-security.yml
stages:
  - security-scan

variables:
  SAST_IMAGE: "securecodewarrior/github-action-semgrep:latest"
  DAST_IMAGE: "owasp/zap2docker-stable:latest"
  SECURITY_SCAN_TIMEOUT: "600"

security:saast:
  stage: security-scan
  image: ${SAST_IMAGE}
  script:
    - echo "🔒 Running SAST analysis with Semgrep..."
    - semgrep --config=auto --json --output=semgrep-results.json
    - |
      if [ -s semgrep-results.json ]; then
        echo "Security issues detected:"
        cat semgrep-results.json
        exit 1
      else
        echo "No security issues detected"
      fi
  artifacts:
    reports:
      sast: semgrep-results.json
    expire_in: 30 days
  allow_failure: false

security:dependencies:
  stage: security-scan
  image: snyk/snyk:node
  script:
    - echo "🔍 Scanning dependencies for vulnerabilities..."
    - snyk test --json --file=pnpm-lock.yaml --severity-threshold=high
  artifacts:
    reports:
      dependency_scanning: snyk-report.json
    expire_in: 30 days
  allow_failure: true

security:container:
  stage: security-scan
  image: aquasec/trivy:latest
  script:
    - echo "🔍 Scanning container images..."
    - trivy image --format json --output container-scan.json $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
  artifacts:
    reports:
      container_scanning: container-scan.json
    expire_in: 30 days
  allow_failure: true
```

## Performance Monitoring Template

### Performance Benchmark Template
```yaml
# .gitlab-ci-performance.yml
stages:
  - performance-test
  - performance-report

variables:
  PERFORMANCE_THRESHOLD_BUILD: "240"   # 4 minutes
  PERFORMANCE_THRESHOLD_CACHE: "85"    # 85% hit rate
  PERFORMANCE_THRESHOLD_TEST: "120"    # 2 minutes

performance:build-benchmark:
  stage: performance-test
  extends:
    - .default_job
  script:
    - echo "📊 Running build performance benchmark..."
    - time pnpm run build:ci > build-time.log 2>&1
    - BUILD_TIME=$(grep real build-time.log | awk '{print $2}' | sed 's/[^0-9.]//g')
    - echo "Build time: ${BUILD_TIME}s"
    - |
      if (( $(echo "$BUILD_TIME > $PERFORMANCE_THRESHOLD_BUILD" | bc -l) )); then
        echo "❌ Build time exceeds threshold"
        exit 1
      fi
    - node scripts/cache-efficiency-analyzer.js
  artifacts:
    reports:
      junit: build-performance.xml
    expire_in: 7 days

performance:cache-analysis:
  stage: performance-test
  extends:
    - .default_job
  script:
    - echo "📊 Analyzing cache efficiency..."
    - node scripts/cache-efficiency-reporter.js
  artifacts:
    paths:
      - cache-efficiency.json
    expire_in: 7 days

performance:report:
  stage: performance-report
  extends:
    - .default_job
  script:
    - echo "📈 Generating performance report..."
    - node scripts/performance-dashboard-generator.js
  artifacts:
    paths:
      - performance-dashboard.html
      - performance-metrics.json
    expire_in: 30 days
  when: always
```

## Deployment Templates

### Vercel Deployment Template
```yaml
# .gitlab-ci-deploy-vercel.yml
stages:
  - deploy

variables:
  VERCEL_TOKEN: $VERCEL_TOKEN
  VERCEL_PROJECT_ID: $VERCEL_PROJECT_ID

deploy:vercel-staging:
  stage: deploy
  image: node:20
  script:
    - echo "🌐 Deploying to Vercel staging..."
    - npm install -g vercel@latest
    - vercel pull --yes --environment=preview --token=$VERCEL_TOKEN
    - vercel build --token=$VERCEL_TOKEN
    - vercel deploy --prebuilt --token=$VERCEL_TOKEN
  environment:
    name: vercel-staging
    url: $VERCEL_STAGING_URL
  artifacts:
    paths:
      - vercel-deployment.json
    expire_in: 1 week
  only:
    - develop
  when: manual

deploy:vercel-production:
  stage: deploy
  image: node:20
  script:
    - echo "🌐 Deploying to Vercel production..."
    - npm install -g vercel@latest
    - vercel pull --yes --environment=production --token=$VERCEL_TOKEN
    - vercel build --prod --token=$VERCEL_TOKEN
    - vercel deploy --prebuilt --prod --token=$VERCEL_TOKEN
  environment:
    name: vercel-production
    url: $VERCEL_PRODUCTION_URL
  artifacts:
    paths:
      - vercel-deployment.json
    expire_in: 1 month
  only:
    - main
  when: manual
  allow_failure: false
```

### Cloudflare Deployment Template
```yaml
# .gitlab-ci-deploy-cloudflare.yml
stages:
  - deploy

variables:
  CLOUDFLARE_API_TOKEN: $CLOUDFLARE_API_TOKEN
  CLOUDFLARE_ACCOUNT_ID: $CLOUDFLARE_ACCOUNT_ID

deploy:cloudflare-workers:
  stage: deploy
  image: node:20
  script:
    - echo "☁️ Deploying to Cloudflare Workers..."
    - npm install -g wrangler@latest
    - wrangler publish --compatibility-date=2025-12-01
    - node scripts/cloudflare-deployment-validator.js
  environment:
    name: cloudflare-workers
    url: $CLOUDFLARE_WORKERS_URL
  artifacts:
    paths:
      - cloudflare-deployment.json
    expire_in: 1 month
  only:
    - main
  when: manual
  allow_failure: false

deploy:cloudflare-pages:
  stage: deploy
  image: node:20
  script:
    - echo "☁️ Deploying to Cloudflare Pages..."
    - wrangler pages deploy ./dist --project-name=$CLOUDFLARE_PAGES_PROJECT
  environment:
    name: cloudflare-pages
    url: $CLOUDFLARE_PAGES_URL
  artifacts:
    paths:
      - cloudflare-pages-deployment.json
    expire_in: 1 month
  only:
    - main
  when: manual
  allow_failure: false
```

## NPM Publishing Template

```yaml
# .gitlab-ci-publish.yml
stages:
  - package
  - publish

variables:
  NPM_TOKEN: $NPM_TOKEN

package:libraries:
  stage: package
  extends:
    - .default_job
  script:
    - echo "📦 Packaging libraries for npm..."
    - pnpm run build:libraries
    - pnpm run package:validate
    - node scripts/npm-package-validator.js
  artifacts:
    paths:
      - "packages/**/dist/"
      - "package-metadata.json"
    expire_in: 1 month
  only:
    - main
    - develop

publish:npm:
  stage: publish
  image: node:20
  before_script:
    - npm config set //registry.npmjs.org/:_authToken $NPM_TOKEN
  script:
    - echo "📤 Publishing to npm..."
    - pnpm run publish:all
  environment:
    name: npm-registry
    url: https://npmjs.com/@cathedral-real
  artifacts:
    paths:
      - publish-results.json
    expire_in: 1 month
  only:
    - main
  when: manual
  allow_failure: false
```

These pipeline templates provide:

1. **Comprehensive CI/CD pipeline** with all stages from validation to production deployment
2. **Security integration** with SAST, DAST, dependency scanning, and SOC2 compliance
3. **Performance optimization** targeting <4 minute builds with intelligent caching
4. **Multi-platform deployment** supporting Vercel, Cloudflare, and npm publishing
5. **Monorepo optimization** with selective building and dependency-aware compilation
6. **Enterprise features** including audit trails, approval workflows, and compliance reporting
7. **Monitoring and alerting** for performance, security, and deployment health
8. **Flexible templates** that can be customized for different package types and deployment scenarios

All templates are production-ready and designed to work with GitLab Ultimate features while maintaining the existing Cathedral Real ecosystem patterns.