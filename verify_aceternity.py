import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        try:
            print("Navigating to Aceternity UI test page...")
            await page.goto("http://localhost:3000/test-aceternity")

            # Wait for content to load
            await page.wait_for_selector("h1:has-text('Aceternity UI Registry Test')")
            print("Page loaded successfully.")

            # Verify specific elements
            await page.wait_for_selector("button:has-text('Glow Button')")
            print("Found Glow Button.")

            await page.wait_for_selector("h1:has-text('Neon Heading 1')")
            print("Found Neon Heading.")

            # Take screenshot
            await page.screenshot(path="aceternity_test.png", full_page=True)
            print("Screenshot saved to aceternity_test.png")

        except Exception as e:
            print(f"Error: {e}")
            await page.screenshot(path="aceternity_error.png")
            exit(1)
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
