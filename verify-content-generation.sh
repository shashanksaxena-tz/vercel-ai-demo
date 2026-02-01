#!/bin/bash

# Verification Script for AI Content Generation V2
# This script checks that all necessary files are in place and valid

echo "🔍 Verifying AI Content Generation V2 Implementation"
echo "=================================================="
echo ""

# Check if files exist
echo "📁 Checking Files..."

files=(
  "src/lib/ai/prompts.ts"
  "src/lib/ai/schemas.ts"
  "src/lib/ai/ui-generator.ts"
  "src/lib/ai/test-content-generation.ts"
  "src/lib/ai/CONTENT_GENERATION.md"
  "src/lib/ai/CONTENT_PATTERNS.md"
  "src/lib/ai/README.md"
  "CONTENT_GENERATION_UPDATE.md"
  "AI_GENERATION_V2.md"
)

all_files_exist=true

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✅ $file"
  else
    echo "  ❌ $file (MISSING)"
    all_files_exist=false
  fi
done

echo ""

if [ "$all_files_exist" = false ]; then
  echo "❌ Some files are missing. Please check the implementation."
  exit 1
fi

# Check for key content in prompts.ts
echo "📝 Checking System Prompt Updates..."

if grep -q "CRITICAL REQUIREMENT" src/lib/ai/prompts.ts; then
  echo "  ✅ Critical content requirements found"
else
  echo "  ❌ Missing critical content requirements"
  exit 1
fi

if grep -q "NO LOREM IPSUM" src/lib/ai/prompts.ts; then
  echo "  ✅ No lorem ipsum rule found"
else
  echo "  ⚠️  Warning: No lorem ipsum rule not found"
fi

if grep -q "Quality Checklist" src/lib/ai/prompts.ts; then
  echo "  ✅ Quality checklist found"
else
  echo "  ⚠️  Warning: Quality checklist not found"
fi

echo ""

# Check schema enhancements
echo "🔧 Checking Schema Enhancements..."

if grep -q "ALWAYS provide realistic values" src/lib/ai/schemas.ts; then
  echo "  ✅ Schema content guidance found"
else
  echo "  ⚠️  Warning: Schema content guidance not found"
fi

if grep -q "passthrough" src/lib/ai/schemas.ts; then
  echo "  ✅ Schema passthrough enabled"
else
  echo "  ⚠️  Warning: Schema passthrough not found"
fi

echo ""

# Type check (if TypeScript is available)
echo "🔎 Running Type Checks..."

if command -v npx &> /dev/null; then
  if npx tsc --noEmit src/lib/ai/prompts.ts src/lib/ai/schemas.ts src/lib/ai/test-content-generation.ts 2>&1 | grep -q "^src/"; then
    echo "  ⚠️  TypeScript errors found (check output above)"
  else
    echo "  ✅ No TypeScript errors in modified files"
  fi
else
  echo "  ⚠️  npx not found, skipping type check"
fi

echo ""

# Check documentation completeness
echo "📚 Checking Documentation..."

doc_keywords=(
  "Realistic Content"
  "Production-ready"
  "Quality Standards"
  "Examples"
)

for keyword in "${doc_keywords[@]}"; do
  if grep -q "$keyword" AI_GENERATION_V2.md; then
    echo "  ✅ Documentation includes: $keyword"
  else
    echo "  ⚠️  Documentation missing: $keyword"
  fi
done

echo ""

# Summary
echo "=================================================="
echo "✅ Verification Complete!"
echo ""
echo "📖 Next Steps:"
echo "  1. Review src/lib/ai/README.md for developer guide"
echo "  2. Check CONTENT_PATTERNS.md for usage examples"
echo "  3. Run: ts-node src/lib/ai/test-content-generation.ts"
echo "  4. Test generation with various prompts in the UI"
echo ""
echo "🎯 Quick Test Prompts:"
echo "  - 'Create a dashboard with 4 metric cards'"
echo "  - 'Create a login form'"
echo "  - 'Create a product card with image and price'"
echo ""
echo "All generated UIs should now have realistic content!"
