#!/bin/bash
read -p "Commit description:" desc
cd ~/Projects/NodeExpress
git add .
git commit -m "$desc"
git git push origin main	
