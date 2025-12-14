#!/bin/bash

# Cathedral Real - AWS Deployment Script
set -e

ENVIRONMENT=${1:-production}
REGION=${AWS_REGION:-us-east-1}
STACK_NAME="cathedral-real-${ENVIRONMENT}"

echo "🚀 Deploying Cathedral Real to AWS..."
echo "Environment: $ENVIRONMENT"
echo "Region: $REGION"

# Deploy CloudFormation stack
echo "📦 Deploying infrastructure..."
aws cloudformation deploy \
  --template-file aws/cloudformation/cathedral-infrastructure.yml \
  --stack-name $STACK_NAME \
  --parameter-overrides Environment=$ENVIRONMENT \
  --capabilities CAPABILITY_IAM \
  --region $REGION

# Get stack outputs
echo "📋 Getting deployment URLs..."
BUCKET_NAME=$(aws cloudformation describe-stacks \
  --stack-name $STACK_NAME \
  --query 'Stacks[0].Outputs[?OutputKey==`StaticWebsiteURL`].OutputValue' \
  --output text --region $REGION)

CLOUDFRONT_URL=$(aws cloudformation describe-stacks \
  --stack-name $STACK_NAME \
  --query 'Stacks[0].Outputs[?OutputKey==`CloudFrontURL`].OutputValue' \
  --output text --region $REGION)

# Build and deploy apps
echo "🏗️ Building applications..."
pnpm run build

# Deploy to S3
echo "📤 Uploading to S3..."
aws s3 sync apps/cataract-book-scanner/dist/ s3://cathedral-real-${ENVIRONMENT}-static/cataract/ --delete
aws s3 sync apps/hall-of-ateliers/dist/ s3://cathedral-real-${ENVIRONMENT}-static/ateliers/ --delete
aws s3 sync apps/cathedral-logo-system/dist/ s3://cathedral-real-${ENVIRONMENT}-static/logo/ --delete

echo "✅ Deployment complete!"
echo "🌐 CloudFront URL: https://$CLOUDFRONT_URL"
echo "📱 Apps:"
echo "  - Cataract: https://$CLOUDFRONT_URL/cataract/"
echo "  - Ateliers: https://$CLOUDFRONT_URL/ateliers/"
echo "  - Logo: https://$CLOUDFRONT_URL/logo/"