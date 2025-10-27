#!/bin/bash

# Vercel Subdirectory Deployment Test Script

echo "🔍 Testing Aswang Chronicles Subdirectory Deployment"
echo "=================================================="

# Test root domain
echo "1. Testing root domain redirect:"
echo "curl -I https://aswangchronicles.com"
curl -I https://aswangchronicles.com 2>/dev/null | head -n 5

echo ""
echo "2. Testing subdirectory:"
echo "curl -I https://aswangchronicles.com/iteration1/"
curl -I https://aswangchronicles.com/iteration1/ 2>/dev/null | head -n 5

echo ""
echo "3. Testing game page:"
echo "curl -I https://aswangchronicles.com/iteration1/game"
curl -I https://aswangchronicles.com/iteration1/game 2>/dev/null | head -n 5

echo ""
echo "4. Testing archives page:"
echo "curl -I https://aswangchronicles.com/iteration1/archives"
curl -I https://aswangchronicles.com/iteration1/archives 2>/dev/null | head -n 5

echo ""
echo "Expected Results:"
echo "✅ Root domain should return 301/302 redirect to /iteration1/"
echo "✅ Subdirectory should return 200 OK"
echo "✅ All routes should return 200 OK"
echo ""
echo "If any return 404, check Vercel configuration!"