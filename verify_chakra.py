import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        try:
            print("Navigating to Chakra test page...")
            await page.goto("http://localhost:3000/test-chakra")

            # Wait for content to load
            await page.wait_for_selector("h1:has-text('Chakra UI Registry Test')")
            print("Page loaded successfully.")

            # Verify specific elements
            await page.wait_for_selector("button:has-text('Primary')")
            print("Found Primary button.")

            await page.wait_for_selector("h2:has-text('Heading 2')")
            print("Found Heading 2.")

            # Take screenshot
            await page.screenshot(path="chakra_test.png", full_page=True)
            print("Screenshot saved to chakra_test.png")

        except Exception as e:
            print(f"Error: {e}")
            await page.screenshot(path="chakra_error.png")
            exit(1)
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
