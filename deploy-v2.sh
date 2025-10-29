#!/bin/bash

# SiteGround V2 Deployment Script
# This script deploys the static Next.js export to SiteGround's V2 folder

set -e  # Exit on error

echo "🚀 Starting deployment to SiteGround V2 folder..."

# SiteGround SSH credentials
SSH_HOST="ssh.eyetripimages.com"
SSH_USER="u248-olkgh1xxhrgg"
SSH_PORT="18765"
REMOTE_PATH="www/eyetripimages.com/public_html"
V2_FOLDER="v2"

# Local build directory
LOCAL_BUILD_DIR="./out"

# Check if build directory exists
if [ ! -d "$LOCAL_BUILD_DIR" ]; then
    echo "❌ Error: Build directory '$LOCAL_BUILD_DIR' not found!"
    echo "Please run 'npm run build' first."
    exit 1
fi

echo "📦 Build directory found: $LOCAL_BUILD_DIR"

# Create V2 folder on remote server and deploy files
echo "📡 Connecting to SiteGround..."
echo "🔐 You will be prompted for the SSH password: b2@eye})f$G6"
echo ""

# First, create the V2 directory on the remote server
ssh -p $SSH_PORT $SSH_USER@$SSH_HOST << 'ENDSSH'
cd www/eyetripimages.com/public_html
echo "📁 Creating V2 folder if it doesn't exist..."
mkdir -p v2
echo "✅ V2 folder ready"
ENDSSH

echo ""
echo "📤 Uploading files to V2 folder..."

# Use rsync to efficiently transfer files
# -a: archive mode (preserves permissions, timestamps, etc.)
# -v: verbose
# -z: compress during transfer
# --delete: delete files on remote that don't exist locally
# --progress: show progress

rsync -avz --progress --delete \
    -e "ssh -p $SSH_PORT" \
    $LOCAL_BUILD_DIR/ \
    $SSH_USER@$SSH_HOST:$REMOTE_PATH/$V2_FOLDER/

echo ""
echo "✅ Deployment complete!"
echo "🌐 Your site should be available at: https://eyetripimages.com/v2/"
echo ""
echo "📝 Note: If you need to set permissions, connect via SSH and run:"
echo "   ssh -p $SSH_PORT $SSH_USER@$SSH_HOST"
echo "   cd www/eyetripimages.com/public_html/v2"
echo "   find . -type f -exec chmod 644 {} \\;"
echo "   find . -type d -exec chmod 755 {} \\;"
