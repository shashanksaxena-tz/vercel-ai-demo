import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        try:
            print("Navigating to Magic UI test page...")
            await page.goto("http://localhost:3000/test-magic")

            # Wait for content to load
            await page.wait_for_selector("h1:has-text('Magic UI Registry Test')")
            print("Page loaded successfully.")

            # Verify specific elements
            await page.wait_for_selector("button:has-text('Shimmer Button')")
            print("Found Shimmer Button.")

            await page.wait_for_selector("text='Gradient Heading 1'")
            print("Found Gradient Heading.")

            # Take screenshot
            await page.screenshot(path="magic_test.png", full_page=True)
            print("Screenshot saved to magic_test.png")

        except Exception as e:
            print(f"Error: {e}")
            await page.screenshot(path="magic_error.png")
            exit(1)
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
