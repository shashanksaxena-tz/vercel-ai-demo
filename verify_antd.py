import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Capture console logs
        page.on("console", lambda msg: print(f"Console: {msg.text}"))
        page.on("pageerror", lambda err: print(f"Page Error: {err}"))

        try:
            print("Navigating to Ant Design test page...")
            await page.goto("http://localhost:3000/test-antd")

            # Wait for content to load
            await page.wait_for_selector("h1:has-text('Ant Design Registry Test')")
            print("Page loaded successfully.")

            # Verify specific elements
            await page.wait_for_selector("button:has-text('Primary')")
            print("Found Primary button.")

            await page.wait_for_selector("h2:has-text('Heading 2')")
            print("Found Heading 2.")

            # Take screenshot
            await page.screenshot(path="antd_test.png", full_page=True)
            print("Screenshot saved to antd_test.png")

        except Exception as e:
            print(f"Error: {e}")
            await page.screenshot(path="antd_error.png")
            exit(1)
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
