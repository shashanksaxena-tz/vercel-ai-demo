#!/bin/bash

# Flowbite MCP Fix Verification Tests
# This script tests the updated Flowbite search implementation

echo "=================================="
echo "Flowbite MCP Fix Verification"
echo "=================================="
echo ""

# Test 1: Single component discovery
echo "Test 1: Single component discovery (button)"
echo "Expected: At least 1 component found"
RESULT1=$(curl -s -X POST 'http://localhost:3000/api/mcp/discover-batch' \
  -H 'Content-Type: application/json' \
  -d '{"framework":"html","queries":["button"],"sources":["flowbite"],"limitPerQuery":5,"useCache":false}')

COUNT1=$(echo "$RESULT1" | jq -r '.count')
if [ "$COUNT1" -gt 0 ]; then
  echo "✅ PASS: Found $COUNT1 component(s)"
  echo "$RESULT1" | jq '.components[] | {name, source, framework: "html"}'
else
  echo "❌ FAIL: No components found"
fi
echo ""

# Test 2: Multiple queries
echo "Test 2: Multiple component queries (card, modal, form)"
echo "Expected: At least 3 components found"
RESULT2=$(curl -s -X POST 'http://localhost:3000/api/mcp/discover-batch' \
  -H 'Content-Type: application/json' \
  -d '{"framework":"html","queries":["card","modal","form"],"sources":["flowbite"],"limitPerQuery":5,"useCache":false}')

COUNT2=$(echo "$RESULT2" | jq -r '.count')
if [ "$COUNT2" -ge 3 ]; then
  echo "✅ PASS: Found $COUNT2 component(s)"
  echo "$RESULT2" | jq '.components[] | .name'
else
  echo "❌ FAIL: Expected at least 3 components, found $COUNT2"
fi
echo ""

# Test 3: Framework filtering
echo "Test 3: Framework filtering (html only)"
echo "Expected: Only Flowbite and TailwindCSS sources"
RESULT3=$(curl -s -X POST 'http://localhost:3000/api/mcp/discover-batch' \
  -H 'Content-Type: application/json' \
  -d '{"framework":"html","queries":["button"],"limitPerQuery":5,"useCache":false}')

SOURCES=$(echo "$RESULT3" | jq -r '[.components[] | .source] | unique | .[]')
HTML_ONLY=true
for src in $SOURCES; do
  if [ "$src" != "flowbite" ] && [ "$src" != "tailwindcss" ]; then
    HTML_ONLY=false
  fi
done

if [ "$HTML_ONLY" = true ]; then
  echo "✅ PASS: Only HTML framework sources returned"
  echo "Sources: $SOURCES"
else
  echo "❌ FAIL: Non-HTML framework sources found"
  echo "Sources: $SOURCES"
fi
echo ""

# Test 4: Component metadata format
echo "Test 4: Component metadata format validation"
echo "Expected: Components have name, description, source, tags"
RESULT4=$(curl -s -X POST 'http://localhost:3000/api/mcp/discover-batch' \
  -H 'Content-Type: application/json' \
  -d '{"framework":"html","queries":["alert"],"sources":["flowbite"],"limitPerQuery":1,"useCache":false}')

HAS_NAME=$(echo "$RESULT4" | jq -r '.components[0].name // "missing"')
HAS_DESC=$(echo "$RESULT4" | jq -r '.components[0].description // "missing"')
HAS_SOURCE=$(echo "$RESULT4" | jq -r '.components[0].source // "missing"')
HAS_TAGS=$(echo "$RESULT4" | jq -r '.components[0].tags // "missing"')

if [ "$HAS_NAME" != "missing" ] && [ "$HAS_DESC" != "missing" ] && \
   [ "$HAS_SOURCE" = "flowbite" ] && [ "$HAS_TAGS" != "missing" ]; then
  echo "✅ PASS: Component metadata is complete"
  echo "$RESULT4" | jq '.components[0]'
else
  echo "❌ FAIL: Missing required metadata fields"
fi
echo ""

echo "=================================="
echo "Summary"
echo "=================================="
echo "All tests completed. Check results above."
echo ""
echo "To re-run: bash test-flowbite-fix.sh"
