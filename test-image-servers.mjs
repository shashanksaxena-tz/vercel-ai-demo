/**
 * MCP Image Server Test Script
 *
 * Tests connection to Unsplash and Pexels image servers
 * and verifies API key configuration.
 *
 * Usage:
 *   node test-image-servers.mjs
 *
 * Prerequisites:
 *   - Development server running on http://localhost:3000
 *   - API keys configured in .env.local
 */

async function testImageServers() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║          MCP Image Server Configuration Test             ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  const baseUrl = 'http://localhost:3000';
  let totalTests = 0;
  let passedTests = 0;

  // Test 1: Check if dev server is running
  console.log('📡 Test 1: Checking if development server is running...');
  totalTests++;
  try {
    const response = await fetch(`${baseUrl}/api/mcp/status`);
    if (response.ok) {
      console.log('   ✅ Development server is running\n');
      passedTests++;
    } else {
      console.log('   ❌ Server returned error status:', response.status);
      console.log('   💡 Make sure the development server is running: npm run dev\n');
      return;
    }
  } catch (error) {
    console.log('   ❌ Cannot connect to development server');
    console.log('   💡 Start the server first: npm run dev\n');
    return;
  }

  // Test 2: Check MCP server status
  console.log('🔌 Test 2: Checking MCP server status...');
  totalTests++;
  try {
    const response = await fetch(`${baseUrl}/api/mcp/status`);
    const data = await response.json();

    const unsplashServer = data.servers.find(s => s.serverId === 'unsplash');
    const pexelsServer = data.servers.find(s => s.serverId === 'pexels');

    console.log('   Unsplash:', unsplashServer?.status || 'unknown');
    console.log('   Pexels:', pexelsServer?.status || 'unknown');
    console.log('   Total enabled servers:', data.summary.enabled);
    console.log('   Total connected servers:', data.summary.connected, '\n');
    passedTests++;
  } catch (error) {
    console.log('   ❌ Failed to fetch server status:', error.message, '\n');
  }

  // Test 3: Test Unsplash image search
  console.log('🖼️  Test 3: Testing Unsplash image search...');
  totalTests++;
  try {
    const response = await fetch(
      `${baseUrl}/api/mcp/images?query=sunset&sources=unsplash&limit=3`
    );
    const data = await response.json();

    if (data.images && data.images.length > 0) {
      console.log('   ✅ Unsplash: Working');
      console.log('   📊 Found', data.images.length, 'images');
      console.log('   ⏱️  Response time:', data.timing + 'ms');
      console.log('   📸 First image:');
      console.log('      - Photographer:', data.images[0].photographer);
      console.log('      - Size:', data.images[0].width + 'x' + data.images[0].height);
      console.log('      - URL:', data.images[0].url.substring(0, 60) + '...');
      passedTests++;
    } else {
      console.log('   ❌ Unsplash: No results returned');
      console.log('   💡 Check your UNSPLASH_ACCESS_KEY in .env.local');
      console.log('   📖 See: docs/MCP_IMAGE_SETUP.md#unsplash-setup');
    }
  } catch (error) {
    console.log('   ❌ Unsplash: Error -', error.message);
  }
  console.log('');

  // Test 4: Test Pexels image search
  console.log('🌄 Test 4: Testing Pexels image search...');
  totalTests++;
  try {
    const response = await fetch(
      `${baseUrl}/api/mcp/images?query=mountains&sources=pexels&limit=3`
    );
    const data = await response.json();

    if (data.images && data.images.length > 0) {
      console.log('   ✅ Pexels: Working');
      console.log('   📊 Found', data.images.length, 'images');
      console.log('   ⏱️  Response time:', data.timing + 'ms');
      console.log('   📸 First image:');
      console.log('      - Photographer:', data.images[0].photographer);
      console.log('      - Size:', data.images[0].width + 'x' + data.images[0].height);
      console.log('      - URL:', data.images[0].url.substring(0, 60) + '...');
      passedTests++;
    } else {
      console.log('   ❌ Pexels: No results returned');
      console.log('   💡 Check your PEXELS_API_KEY in .env.local');
      console.log('   📖 See: docs/MCP_IMAGE_SETUP.md#pexels-setup');
    }
  } catch (error) {
    console.log('   ❌ Pexels: Error -', error.message);
  }
  console.log('');

  // Test 5: Test combined search (both sources)
  console.log('🔄 Test 5: Testing combined image search...');
  totalTests++;
  try {
    const response = await fetch(
      `${baseUrl}/api/mcp/images?query=nature&sources=unsplash,pexels&limit=10`
    );
    const data = await response.json();

    console.log('   📊 Total images found:', data.totalCount);
    console.log('   ⏱️  Response time:', data.timing + 'ms');
    console.log('   🔍 Sources queried:', data.sources.join(', '));

    if (data.totalCount > 0) {
      // Count images by source
      const bySources = data.images.reduce((acc, img) => {
        acc[img.source] = (acc[img.source] || 0) + 1;
        return acc;
      }, {});

      console.log('   📈 Images by source:');
      Object.entries(bySources).forEach(([source, count]) => {
        console.log(`      - ${source}: ${count} images`);
      });
      passedTests++;
    } else {
      console.log('   ⚠️  No images found from any source');
      console.log('   💡 Check API keys in .env.local');
    }
  } catch (error) {
    console.log('   ❌ Combined search: Error -', error.message);
  }
  console.log('');

  // Test 6: Test error handling (invalid source)
  console.log('🔒 Test 6: Testing error handling...');
  totalTests++;
  try {
    const response = await fetch(
      `${baseUrl}/api/mcp/images?query=test&sources=invalid-source&limit=3`
    );
    const data = await response.json();

    if (data.images && data.images.length === 0) {
      console.log('   ✅ Gracefully handles invalid sources');
      passedTests++;
    } else {
      console.log('   ⚠️  Unexpected response for invalid source');
    }
  } catch (error) {
    console.log('   ⚠️  Error handling test failed:', error.message);
  }
  console.log('');

  // Summary
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║                      Test Summary                          ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');
  console.log(`   Tests passed: ${passedTests}/${totalTests}`);

  if (passedTests === totalTests) {
    console.log('   🎉 All tests passed! Image servers are configured correctly.\n');
  } else if (passedTests >= 3) {
    console.log('   ⚠️  Some tests failed. Check the issues above.\n');
    console.log('   📖 Setup guide: docs/MCP_IMAGE_SETUP.md\n');
  } else {
    console.log('   ❌ Most tests failed. API keys may not be configured.\n');
    console.log('   📖 Follow the setup guide: docs/MCP_IMAGE_SETUP.md\n');
  }

  // Configuration hints
  if (passedTests < totalTests) {
    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║                  Configuration Hints                       ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');
    console.log('   1. Check your .env.local file has these keys set:');
    console.log('      UNSPLASH_ACCESS_KEY=your_key_here');
    console.log('      PEXELS_API_KEY=your_key_here\n');
    console.log('   2. Make sure there are no spaces around the = sign\n');
    console.log('   3. Restart the dev server after updating .env.local\n');
    console.log('   4. Get API keys from:');
    console.log('      - Unsplash: https://unsplash.com/developers');
    console.log('      - Pexels: https://www.pexels.com/api/\n');
  }
}

// Run the tests
testImageServers().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
