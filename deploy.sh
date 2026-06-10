#!/bin/bash
set -e
cd /home/elderle/amf-app
echo "Building AMF app..."
npm run build
echo "Restarting service..."
sudo systemctl restart amf-app
sudo systemctl status amf-app --no-pager
echo "Done. Visit https://amf.elderle.app"
