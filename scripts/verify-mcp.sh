#!/bin/bash

# ============================================================================
# MCP Server Verification Script
# ============================================================================
# Tests MCP server packages, environment variables, and connections
#
# Usage:
#   ./scripts/verify-mcp.sh           # Test all servers
#   ./scripts/verify-mcp.sh ui-layouts # Test specific server
# ============================================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counters
TOTAL=0
PASSED=0
FAILED=0
SKIPPED=0

# Header
echo ""
echo "=========================================="
echo "  MCP Server Verification"
echo "=========================================="
echo ""

# ============================================================================
# Helper Functions
# ============================================================================

print_header() {
  echo ""
  echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo -e "${BLUE}$1${NC}"
  echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

print_success() {
  echo -e "${GREEN}✓${NC} $1"
  ((PASSED++))
}

print_error() {
  echo -e "${RED}✗${NC} $1"
  ((FAILED++))
}

print_skip() {
  echo -e "${YELLOW}⊘${NC} $1"
  ((SKIPPED++))
}

print_info() {
  echo -e "${BLUE}ℹ${NC} $1"
}

# ============================================================================
# Test Node.js Version
# ============================================================================

test_node_version() {
  print_header "System Requirements"
  ((TOTAL++))

  NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)

  if [ "$NODE_VERSION" -ge 18 ]; then
    print_success "Node.js version $(node --version) (requires 18+)"
  else
    print_error "Node.js version $(node --version) - requires 18+"
  fi
}

# ============================================================================
# Test Environment Variables
# ============================================================================

test_env_variables() {
  print_header "Environment Variables"

  # Load .env.local if exists
  if [ -f .env.local ]; then
    print_info "Found .env.local"
    export $(cat .env.local | grep -v '^#' | xargs)
  elif [ -f .env ]; then
    print_info "Found .env"
    export $(cat .env | grep -v '^#' | xargs)
  else
    print_error "No .env.local or .env file found"
    print_info "Copy .env.example to .env.local and add your API keys"
    return
  fi

  # Test Google AI API Key (required for AI features)
  ((TOTAL++))
  if [ -n "$GOOGLE_GENERATIVE_AI_API_KEY" ]; then
    print_success "GOOGLE_GENERATIVE_AI_API_KEY is set"
  else
    print_error "GOOGLE_GENERATIVE_AI_API_KEY is not set (required for AI generation)"
  fi

  # Test Unsplash API Key (optional)
  ((TOTAL++))
  if [ -n "$UNSPLASH_ACCESS_KEY" ]; then
    print_success "UNSPLASH_ACCESS_KEY is set"
  else
    print_skip "UNSPLASH_ACCESS_KEY not set (optional - for image search)"
  fi

  # Test Pexels API Key (optional)
  ((TOTAL++))
  if [ -n "$PEXELS_API_KEY" ]; then
    print_success "PEXELS_API_KEY is set"
  else
    print_skip "PEXELS_API_KEY not set (optional - for image search)"
  fi

  # Test Figma Token (optional)
  ((TOTAL++))
  if [ -n "$FIGMA_ACCESS_TOKEN" ]; then
    print_success "FIGMA_ACCESS_TOKEN is set"
  else
    print_skip "FIGMA_ACCESS_TOKEN not set (optional - for Figma integration)"
  fi
}

# ============================================================================
# Test Individual MCP Server
# ============================================================================

test_mcp_server() {
  local SERVER_NAME=$1
  local PACKAGE=$2
  local REQUIRED=$3

  ((TOTAL++))

  print_info "Testing $SERVER_NAME ($PACKAGE)..."

  # Test if package can be resolved
  if timeout 10s npx --yes "$PACKAGE" --help >/dev/null 2>&1; then
    print_success "$SERVER_NAME: Package available and executable"
    return 0
  elif timeout 10s npx --yes "$PACKAGE" --version >/dev/null 2>&1; then
    print_success "$SERVER_NAME: Package available and executable"
    return 0
  else
    # Check if it's stdio server (no --help flag)
    local TEST_OUTPUT=$(timeout 5s bash -c "echo 'exit' | npx --yes $PACKAGE 2>&1" || true)

    if [[ $TEST_OUTPUT == *"error"* ]] || [[ $TEST_OUTPUT == *"Error"* ]]; then
      if [ "$REQUIRED" = "required" ]; then
        print_error "$SERVER_NAME: Failed to execute package"
      else
        print_skip "$SERVER_NAME: Package may require runtime configuration"
      fi
      return 1
    else
      print_success "$SERVER_NAME: Package available (MCP stdio server)"
      return 0
    fi
  fi
}

# ============================================================================
# Test All MCP Servers
# ============================================================================

test_all_servers() {
  print_header "MCP Server Packages"

  # Component Libraries
  test_mcp_server "UI Layouts" "@ui-layouts/mcp" "optional"
  test_mcp_server "Shadcn/UI" "@jpisnice/shadcn-ui-mcp-server" "optional"
  test_mcp_server "Tailwind CSS" "tailwindcss-mcp-server" "optional"
  test_mcp_server "Flowbite" "flowbite-mcp" "optional"
  test_mcp_server "Chakra UI" "@chakra-ui/react-mcp@latest" "optional"
  test_mcp_server "Magic UI" "@magicuidesign/mcp@latest" "optional"
  test_mcp_server "Aceternity UI" "aceternityui-mcp" "optional"
  test_mcp_server "Material UI" "@mui/mcp@latest" "optional"

  # Documentation
  test_mcp_server "Context7" "@upstash/context7-mcp" "optional"

  # Icons
  test_mcp_server "Lucide Icons" "lucide-icons-mcp" "optional"
  test_mcp_server "Heroicons" "heroicons-mcp" "optional"

  # Images
  test_mcp_server "Unsplash" "@drumnation/unsplash-smart-mcp-server" "optional"
}

# ============================================================================
# Test Specific Server
# ============================================================================

test_specific_server() {
  local SERVER=$1

  print_header "Testing: $SERVER"

  case $SERVER in
    "ui-layouts")
      test_mcp_server "UI Layouts" "@ui-layouts/mcp" "required"
      ;;
    "shadcn-ui"|"shadcn")
      test_mcp_server "Shadcn/UI" "@jpisnice/shadcn-ui-mcp-server" "required"
      ;;
    "tailwindcss"|"tailwind")
      test_mcp_server "Tailwind CSS" "tailwindcss-mcp-server" "required"
      ;;
    "flowbite")
      test_mcp_server "Flowbite" "flowbite-mcp" "required"
      ;;
    "chakra-ui"|"chakra")
      test_mcp_server "Chakra UI" "@chakra-ui/react-mcp@latest" "required"
      ;;
    "magic-ui"|"magic")
      test_mcp_server "Magic UI" "@magicuidesign/mcp@latest" "required"
      ;;
    "aceternity-ui"|"aceternity")
      test_mcp_server "Aceternity UI" "aceternityui-mcp" "required"
      ;;
    "mui"|"material-ui")
      test_mcp_server "Material UI" "@mui/mcp@latest" "required"
      ;;
    "context7")
      test_mcp_server "Context7" "@upstash/context7-mcp" "required"
      ;;
    "lucide-icons"|"lucide")
      test_mcp_server "Lucide Icons" "lucide-icons-mcp" "required"
      ;;
    "heroicons"|"hero")
      test_mcp_server "Heroicons" "heroicons-mcp" "required"
      ;;
    "unsplash")
      test_mcp_server "Unsplash" "@drumnation/unsplash-smart-mcp-server" "required"
      ;;
    *)
      echo -e "${RED}Unknown server: $SERVER${NC}"
      echo ""
      echo "Available servers:"
      echo "  - ui-layouts"
      echo "  - shadcn-ui"
      echo "  - tailwindcss"
      echo "  - flowbite"
      echo "  - chakra-ui"
      echo "  - magic-ui"
      echo "  - aceternity-ui"
      echo "  - mui"
      echo "  - context7"
      echo "  - lucide-icons"
      echo "  - heroicons"
      echo "  - unsplash"
      exit 1
      ;;
  esac
}

# ============================================================================
# Test npm/npx
# ============================================================================

test_npm() {
  print_header "Package Manager"

  ((TOTAL++))
  if command -v npm >/dev/null 2>&1; then
    print_success "npm $(npm --version) is installed"
  else
    print_error "npm is not installed"
  fi

  ((TOTAL++))
  if command -v npx >/dev/null 2>&1; then
    print_success "npx is available"
  else
    print_error "npx is not available"
  fi
}

# ============================================================================
# Test TypeScript SDK
# ============================================================================

test_mcp_sdk() {
  print_header "MCP SDK"

  ((TOTAL++))
  if [ -d "node_modules/@modelcontextprotocol/sdk" ]; then
    SDK_VERSION=$(node -p "require('./node_modules/@modelcontextprotocol/sdk/package.json').version" 2>/dev/null || echo "unknown")
    print_success "@modelcontextprotocol/sdk v$SDK_VERSION is installed"
  else
    print_error "@modelcontextprotocol/sdk is not installed"
    print_info "Run: npm install"
  fi
}

# ============================================================================
# Test Development Server
# ============================================================================

test_dev_server() {
  print_header "Development Server"

  ((TOTAL++))
  if curl -s http://localhost:3000 >/dev/null 2>&1; then
    print_success "Development server is running on http://localhost:3000"
  else
    print_skip "Development server not running (start with: npm run dev)"
  fi

  ((TOTAL++))
  if curl -s http://localhost:3000/api/mcp/status >/dev/null 2>&1; then
    print_success "MCP status API is accessible"
  else
    print_skip "MCP status API not accessible (server may not be running)"
  fi
}

# ============================================================================
# Summary
# ============================================================================

print_summary() {
  echo ""
  echo "=========================================="
  echo "  Summary"
  echo "=========================================="
  echo ""
  echo "Total Tests:   $TOTAL"
  echo -e "${GREEN}Passed:        $PASSED${NC}"
  echo -e "${RED}Failed:        $FAILED${NC}"
  echo -e "${YELLOW}Skipped:       $SKIPPED${NC}"
  echo ""

  if [ $FAILED -gt 0 ]; then
    echo -e "${RED}⚠ Some tests failed. See errors above.${NC}"
    echo ""
    echo "Troubleshooting:"
    echo "  - Check docs/MCP_TROUBLESHOOTING.md"
    echo "  - Verify .env.local is configured"
    echo "  - Run: npm install"
    echo "  - Clear npx cache: rm -rf ~/.npm/_npx"
    echo ""
    exit 1
  else
    echo -e "${GREEN}✓ All tests passed!${NC}"
    echo ""
    exit 0
  fi
}

# ============================================================================
# Main
# ============================================================================

main() {
  # Test system requirements
  test_node_version
  test_npm
  test_mcp_sdk

  # Test environment variables
  test_env_variables

  # Test MCP servers
  if [ -z "$1" ]; then
    # Test all servers
    test_all_servers
  else
    # Test specific server
    test_specific_server "$1"
  fi

  # Test development server
  test_dev_server

  # Print summary
  print_summary
}

# Run main function
main "$@"
