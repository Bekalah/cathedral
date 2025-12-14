# GitLab + AWS + GitHub Integration Setup

## 🔧 Required Environment Variables

### GitLab CI/CD Variables
Add these in GitLab Project → Settings → CI/CD → Variables:

```bash
# AWS Credentials (from AWS Console → IAM → Users → Security Credentials)
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
AWS_DEFAULT_REGION=us-east-1

# GitHub Integration
GITHUB_TOKEN=ghp_...  # GitHub → Settings → Developer Settings → Personal Access Tokens
GITHUB_USERNAME=your-username

# Deployment URLs (auto-generated after first AWS deploy)
CLOUDFRONT_DOMAIN=d123456789.cloudfront.net

# Optional: Render/Railway tokens
RENDER_API_TOKEN=rnd_...
RAILWAY_TOKEN=...
```

### AWS Setup (Free Tier)
1. **Create AWS Account**: https://aws.amazon.com/free/
2. **Create IAM User**:
   ```bash
   # Required permissions for free tier deployment:
   - AmazonS3FullAccess
   - CloudFrontFullAccess
   - AWSCloudFormationFullAccess
   - AWSLambda_FullAccess
   - AmazonDynamoDBFullAccess
   - IAMFullAccess (for role creation)
   ```

3. **Deploy Infrastructure**:
   ```bash
   # Local deployment (requires AWS CLI)
   aws configure  # Enter your credentials
   ./aws/scripts/deploy-aws.sh production
   ```

### GitHub Setup
1. **Create Repository**: https://github.com/new
2. **Enable Pages**: Repository → Settings → Pages → Source: GitHub Actions
3. **Create Token**: Settings → Developer Settings → Personal Access Tokens → Generate new token
   - Scopes: `repo`, `workflow`, `write:packages`

## 🚀 Deployment Workflow

### 1. GitLab Primary (Auto-deploy)
```bash
git push origin main
# Triggers: test → build → deploy (manual) → mirror to GitHub
```

### 2. AWS Free Tier Deployment
- **S3 Static Hosting**: 5GB storage, 20k GET requests/month
- **CloudFront CDN**: 50GB data transfer, 2M requests/month  
- **Lambda API**: 1M requests, 400k GB-seconds/month
- **DynamoDB**: 25GB storage, 25 RCU/WCU

### 3. GitHub Pages (Auto-deploy)
- Mirrors from GitLab automatically
- Deploys to `https://your-username.github.io/cathedral-real`

## 📱 Application URLs

After deployment, your apps will be available at:

### AWS CloudFront (Primary)
- **Cataract Scanner**: `https://d123456789.cloudfront.net/cataract/`
- **Hall of Ateliers**: `https://d123456789.cloudfront.net/ateliers/`
- **Logo System**: `https://d123456789.cloudfront.net/logo/`

### GitHub Pages (Mirror)
- **Main App**: `https://your-username.github.io/cathedral-real/`

### Render (Optional)
- **Cataract**: `https://cataract-book-scanner.onrender.com`
- **Ateliers**: `https://hall-of-ateliers.onrender.com`
- **Logo**: `https://cathedral-logo-system.onrender.com`

## 🔄 Git Workflow

```bash
# Work on GitLab (primary)
git clone https://gitlab.com/Bekalah/cathedral-real.git
cd cathedral-real

# Add GitHub mirror
./scripts/setup-github-mirror.sh

# Push to both
git push origin main  # GitLab + auto-mirror to GitHub
```

## 💰 Cost Breakdown (6 months)

### Free Tier Usage:
- **AWS**: $0/month (within free tier limits)
- **GitLab**: $0/month (free tier: 400 CI/CD minutes)
- **GitHub**: $0/month (unlimited public repos)
- **Render**: $0/month (750 hours free tier)

### Total: **$0/month** for complete deployment pipeline

## 🛠️ Local Development

```bash
# Install dependencies
pnpm install

# Start development servers
pnpm run dev --filter=cataract-book-scanner
pnpm run dev --filter=hall-of-ateliers
pnpm run dev --filter=cathedral-logo-system

# Build all packages
pnpm run build

# Deploy to AWS
./aws/scripts/deploy-aws.sh production
```

## 🔍 Monitoring & Logs

### AWS CloudWatch (Free Tier)
- **Logs**: 5GB ingestion, 5GB storage
- **Metrics**: 10 custom metrics
- **Alarms**: 10 alarms

### GitLab CI/CD
- Build logs and artifacts
- Deployment status
- Performance metrics

## 🚨 Troubleshooting

### Common Issues:
1. **AWS Credentials**: Ensure IAM user has required permissions
2. **GitHub Token**: Check token scopes and expiration
3. **Build Failures**: Check Node.js version compatibility
4. **S3 Bucket Names**: Must be globally unique

### Debug Commands:
```bash
# Test AWS connection
aws sts get-caller-identity

# Validate CloudFormation template
aws cloudformation validate-template --template-body file://aws/cloudformation/cathedral-infrastructure.yml

# Check GitLab CI variables
# GitLab → Project → Settings → CI/CD → Variables
```