#!/bin/bash

echo "🚀 Deploying to SiteGround V2..."
echo "📝 Password: b2@eye})f$G6"
echo ""

rsync -avz --progress --delete \
    -e "ssh -p 18765" \
    ./out/ \
    u248-olkgh1xxhrgg@ssh.eyetripimages.com:www/eyetripimages.com/public_html/v2/

echo ""
echo "✅ Deployment complete!"
echo "🌐 Visit: https://eyetripimages.com/v2/"
