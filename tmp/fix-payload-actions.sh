#!/bin/bash

# Fix all onAction calls with payload that don't have "as never"
find src/registries/shadcn/components/admin/ -name "*.tsx" | while read file; do
  # Check if file has the pattern and doesn't already have "as never"
  if grep -q "onAction.*payload.*})" "$file" && ! grep -q "payload.*} as never" "$file"; then
    echo "Fixing $file"
    # Use perl for better regex support
    perl -i -pe 's/onAction\?\.\(\{ name: ([^,]+), payload: ([^}]+\}) \}\)/onAction?.({ name: $1, payload: $2 } as never)/g' "$file"
  fi
done

echo "Done!"
