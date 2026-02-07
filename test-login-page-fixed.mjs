#!/usr/bin/env node
/**
 * FIXED Playwright Test - Generate Login Page in Chat Interface
 */

import { chromium } from 'playwright';
import { writeFileSync } from 'fs';

const APP_URL = 'http://localhost:3000';
const TIMEOUT = 90000;

async function testLoginPageGeneration() {
  console.log('🚀 Starting FIXED Playwright test...\n');

  const browser = await chromium.launch({
    headless: false,
    slowMo: 300
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });

  const page = await context.newPage();

  const consoleLogs = [];
  const consoleErrors = [];

  page.on('console', msg => {
    const text = msg.text();
    consoleLogs.push({ type: msg.type(), text });

    if (msg.type() === 'error') {
      consoleErrors.push(text);
      console.error('❌ Console Error:', text);
    } else if (text.includes('[Page] chatTree changed:')) {
      console.log('🌳 Tree Update:', text);
    } else if (text.includes('No renderer')) {
      console.error('❌ Renderer Error:', text);
      consoleErrors.push(text);
    }
  });

  page.on('pageerror', error => {
    console.error('❌ Page Error:', error.message);
    consoleErrors.push(`Page Error: ${error.message}`);
  });

  try {
    console.log('📖 Step 1: Navigate to app...');
    await page.goto(APP_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'scratchpad/01-fixed-initial.png', fullPage: true });

    console.log('\n📖 Step 2: Ensure Chat tab is active...');
    const chatTab = page.locator('button:has-text("Chat")');
    await chatTab.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'scratchpad/02-fixed-chat-tab.png', fullPage: true });

    console.log('\n📖 Step 3: Find and fill the chat input...');
    // Exact selector from ChatInterface component (lines 825-852)
    const chatTextarea = page.getByPlaceholder('Describe what you want to build...');
    await chatTextarea.waitFor({ state: 'visible', timeout: 10000 });
    await chatTextarea.fill('Create a modern login page with email and password fields, a remember me checkbox, and a sign in button');
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'scratchpad/03-fixed-input-entered.png', fullPage: true });

    console.log('\n📖 Step 4: Click the Send button (STAYING in Chat tab)...');
    // Exact selector from ChatInterface component (lines 854-870)
    const sendButton = page.locator('form button[type="submit"]');
    await sendButton.waitFor({ state: 'visible', timeout: 5000 });

    console.log('🖱️  Clicking send button...');
    await sendButton.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'scratchpad/04-fixed-after-click.png', fullPage: true });

    console.log('\n⏳ Waiting for AI generation (monitoring tree updates)...');

    // Wait for tree update logs
    let treeUpdated = false;
    const startTime = Date.now();

    while (!treeUpdated && (Date.now() - startTime) < TIMEOUT) {
      await page.waitForTimeout(1000);

      // Check console logs for tree update
      const treeLog = consoleLogs.find(log =>
        log.text.includes('[Page] chatTree changed:') &&
        !log.text.includes('null') &&
        log.text.match(/\d+ elements/)
      );

      if (treeLog) {
        console.log('✅ Tree update detected:', treeLog.text);
        treeUpdated = true;
        break;
      }
    }

    if (!treeUpdated) {
      console.warn('⚠️  No tree update detected after', Math.floor((Date.now() - startTime) / 1000), 'seconds');
    }

    // Wait extra time for rendering
    await page.waitForTimeout(3000);

    console.log('📸 Taking final screenshot...');
    await page.screenshot({ path: 'scratchpad/05-fixed-final.png', fullPage: true });

    console.log('\n📖 Step 5: Analyze results...');

    // Check for renderer errors
    const rendererErrors = consoleErrors.filter(e => e.includes('No renderer'));

    // Check chat messages appeared
    const messagesArea = page.locator('[class*="message"], [class*="chat"]');
    const messageCount = await messagesArea.count();

    // Check preview content
    const previewArea = page.locator('[class*="preview"], [class*="render"]').first();
    const previewText = await previewArea.textContent().catch(() => '');
    const hasContent = previewText.length > 100 && !previewText.includes('No UI to render');

    // Check for tree updates in logs
    const treeUpdateLogs = consoleLogs.filter(log =>
      log.text.includes('[Page] chatTree changed:') &&
      log.text.match(/\d+ elements/)
    );

    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST RESULTS');
    console.log('='.repeat(60));
    console.log(`Total Console Logs: ${consoleLogs.length}`);
    console.log(`Console Errors: ${consoleErrors.length}`);
    console.log(`Renderer Errors: ${rendererErrors.length}`);
    console.log(`Chat Messages: ${messageCount}`);
    console.log(`Tree Updates: ${treeUpdateLogs.length}`);
    console.log(`Preview Has Content: ${hasContent ? '✅ YES' : '❌ NO'}`);
    console.log(`Preview Text Length: ${previewText.length} characters`);

    if (treeUpdateLogs.length > 0) {
      console.log('\n🌳 TREE UPDATES:');
      treeUpdateLogs.forEach((log, i) => {
        console.log(`  ${i + 1}. ${log.text}`);
      });
    }

    if (rendererErrors.length > 0) {
      console.log('\n❌ RENDERER ERRORS:');
      rendererErrors.forEach((error, i) => {
        console.log(`  ${i + 1}. ${error}`);
      });
    }

    // Save results
    const logReport = {
      timestamp: new Date().toISOString(),
      summary: {
        totalLogs: consoleLogs.length,
        totalErrors: consoleErrors.length,
        rendererErrors: rendererErrors.length,
        treeUpdates: treeUpdateLogs.length,
        messageCount,
        hasContent,
        previewTextLength: previewText.length
      },
      consoleErrors,
      treeUpdateLogs: treeUpdateLogs.map(l => l.text),
      allLogs: consoleLogs
    };

    writeFileSync('scratchpad/test-results-fixed.json', JSON.stringify(logReport, null, 2));

    console.log('\n💾 Results saved to: scratchpad/test-results-fixed.json');
    console.log('📸 Screenshots saved to: scratchpad/0*-fixed-*.png');

    // Final verdict
    console.log('\n' + '='.repeat(60));
    if (rendererErrors.length === 0 && hasContent && treeUpdateLogs.length > 0) {
      console.log('✅ TEST PASSED: Login page rendered successfully!');
      console.log('='.repeat(60));
      return true;
    } else if (rendererErrors.length > 0) {
      console.log('❌ TEST FAILED: Renderer errors detected');
    } else if (treeUpdateLogs.length === 0) {
      console.log('❌ TEST FAILED: No tree updates detected');
    } else if (!hasContent) {
      console.log('❌ TEST FAILED: No content in preview');
    }
    console.log('='.repeat(60));
    return false;

  } catch (error) {
    console.error('\n❌ TEST ERROR:', error.message);
    console.error(error.stack);

    try {
      await page.screenshot({ path: 'scratchpad/99-fixed-error.png', fullPage: true });
    } catch (e) {}

    return false;
  } finally {
    console.log('\n🔒 Closing browser in 5 seconds...');
    await page.waitForTimeout(5000);
    await browser.close();
  }
}

testLoginPageGeneration()
  .then(success => process.exit(success ? 0 : 1))
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
