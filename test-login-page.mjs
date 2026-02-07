#!/usr/bin/env node
/**
 * Playwright Test Script - Generate Login Page and Verify Rendering
 *
 * This script:
 * 1. Opens the app in a browser
 * 2. Generates a login page via AI
 * 3. Captures screenshots
 * 4. Checks console logs for errors
 * 5. Verifies the preview renders correctly
 */

import { chromium } from 'playwright';
import { writeFileSync } from 'fs';

const APP_URL = 'http://localhost:3000';
const TIMEOUT = 60000; // 60 seconds for AI generation

async function testLoginPageGeneration() {
  console.log('🚀 Starting Playwright test...\n');

  const browser = await chromium.launch({
    headless: false, // Show browser for debugging
    slowMo: 500 // Slow down actions for visibility
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });

  const page = await context.newPage();

  // Capture console logs
  const consoleLogs = [];
  const consoleErrors = [];

  page.on('console', msg => {
    const text = msg.text();
    consoleLogs.push({ type: msg.type(), text });

    if (msg.type() === 'error') {
      consoleErrors.push(text);
      console.error('❌ Console Error:', text);
    } else if (text.includes('[Registry]')) {
      console.log('📝 Registry Log:', text);
    } else if (text.includes('No renderer')) {
      console.error('❌ Renderer Error:', text);
      consoleErrors.push(text);
    }
  });

  // Capture page errors
  page.on('pageerror', error => {
    console.error('❌ Page Error:', error.message);
    consoleErrors.push(`Page Error: ${error.message}`);
  });

  try {
    console.log('📖 Step 1: Navigate to app...');
    await page.goto(APP_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    console.log('📸 Taking initial screenshot...');
    await page.screenshot({ path: '/private/tmp/claude-502/-Users-shashanksaxena-Documents-Personal-Code-vercel-ai-demo/scratchpad/01-initial-load.png', fullPage: true });

    console.log('\n📖 Step 2: Switch to Chat tab...');
    const chatTab = page.locator('button:has-text("Chat")');
    await chatTab.click();
    await page.waitForTimeout(1000);

    console.log('📸 Taking chat tab screenshot...');
    await page.screenshot({ path: '/private/tmp/claude-502/-Users-shashanksaxena-Documents-Personal-Code-vercel-ai-demo/scratchpad/02-chat-tab.png', fullPage: true });

    console.log('\n📖 Step 3: Enter login page request...');
    const textarea = page.locator('textarea[placeholder*="Describe"], textarea[placeholder*="request"]').first();
    await textarea.fill('Create a modern login page with email, password fields, a remember me checkbox, and a sign in button');
    await page.waitForTimeout(500);

    console.log('📸 Taking input screenshot...');
    await page.screenshot({ path: '/private/tmp/claude-502/-Users-shashanksaxena-Documents-Personal-Code-vercel-ai-demo/scratchpad/03-input-entered.png', fullPage: true });

    console.log('\n📖 Step 4: Submit request and wait for generation...');
    // Find and click the send/generate button
    const sendButton = page.locator('button[type="submit"], button:has-text("Send"), button:has-text("Generate")').first();
    await sendButton.click();

    console.log('⏳ Waiting for AI generation (up to 60 seconds)...');

    // Wait for the preview to update (look for actual content, not placeholder)
    try {
      await page.waitForFunction(() => {
        const previewArea = document.querySelector('[class*="preview"], [class*="render"]');
        if (!previewArea) return false;
        const text = previewArea.textContent || '';
        return !text.includes('No UI to render') && text.length > 50;
      }, { timeout: TIMEOUT });

      console.log('✅ Preview content detected!');
    } catch (error) {
      console.warn('⚠️  Timeout waiting for preview content, continuing anyway...');
    }

    await page.waitForTimeout(3000); // Extra time for rendering

    console.log('📸 Taking post-generation screenshot...');
    await page.screenshot({ path: '/private/tmp/claude-502/-Users-shashanksaxena-Documents-Personal-Code-vercel-ai-demo/scratchpad/04-generated-ui.png', fullPage: true });

    console.log('\n📖 Step 5: Analyze results...');

    // Check for "No renderer" errors
    const rendererErrors = consoleErrors.filter(e => e.includes('No renderer'));

    // Check preview content
    const previewArea = page.locator('[class*="preview"], [class*="render"]').first();
    const previewText = await previewArea.textContent().catch(() => '');
    const hasContent = previewText.length > 100 && !previewText.includes('No UI to render');

    // Count registry logs
    const registryLogs = consoleLogs.filter(log => log.text.includes('[Registry]'));

    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST RESULTS');
    console.log('='.repeat(60));
    console.log(`Total Console Logs: ${consoleLogs.length}`);
    console.log(`Registry Logs: ${registryLogs.length}`);
    console.log(`Console Errors: ${consoleErrors.length}`);
    console.log(`Renderer Errors: ${rendererErrors.length}`);
    console.log(`Preview Has Content: ${hasContent ? '✅ YES' : '❌ NO'}`);
    console.log(`Preview Text Length: ${previewText.length} characters`);

    if (rendererErrors.length > 0) {
      console.log('\n❌ RENDERER ERRORS FOUND:');
      rendererErrors.forEach((error, i) => {
        console.log(`  ${i + 1}. ${error}`);
      });
    }

    if (consoleErrors.length > 0) {
      console.log('\n❌ ALL CONSOLE ERRORS:');
      consoleErrors.slice(0, 10).forEach((error, i) => {
        console.log(`  ${i + 1}. ${error}`);
      });
      if (consoleErrors.length > 10) {
        console.log(`  ... and ${consoleErrors.length - 10} more errors`);
      }
    }

    // Save full logs
    const logReport = {
      timestamp: new Date().toISOString(),
      summary: {
        totalLogs: consoleLogs.length,
        totalErrors: consoleErrors.length,
        rendererErrors: rendererErrors.length,
        hasContent,
        previewTextLength: previewText.length
      },
      consoleErrors,
      registryLogs: registryLogs.map(l => l.text),
      allLogs: consoleLogs
    };

    writeFileSync(
      '/private/tmp/claude-502/-Users-shashanksaxena-Documents-Personal-Code-vercel-ai-demo/scratchpad/test-results.json',
      JSON.stringify(logReport, null, 2)
    );

    console.log('\n💾 Full logs saved to: test-results.json');
    console.log('📸 Screenshots saved to scratchpad/');

    // Final verdict
    console.log('\n' + '='.repeat(60));
    if (rendererErrors.length === 0 && hasContent) {
      console.log('✅ TEST PASSED: Login page rendered successfully!');
      console.log('='.repeat(60));
      return true;
    } else if (rendererErrors.length > 0) {
      console.log('❌ TEST FAILED: Renderer errors detected');
      console.log('='.repeat(60));
      return false;
    } else if (!hasContent) {
      console.log('❌ TEST FAILED: No content in preview');
      console.log('='.repeat(60));
      return false;
    }

  } catch (error) {
    console.error('\n❌ TEST ERROR:', error.message);
    console.error(error.stack);

    // Take error screenshot
    try {
      await page.screenshot({ path: '/private/tmp/claude-502/-Users-shashanksaxena-Documents-Personal-Code-vercel-ai-demo/scratchpad/99-error.png', fullPage: true });
    } catch (e) {
      // Ignore screenshot errors
    }

    return false;
  } finally {
    console.log('\n🔒 Closing browser...');
    await browser.close();
  }
}

// Run the test
testLoginPageGeneration()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
