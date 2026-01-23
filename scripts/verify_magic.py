import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Navigate to the test page
        url = "http://localhost:3000/test-magic"
        print(f"Navigating to {url}...")
        try:
            await page.goto(url, wait_until="networkidle")
        except Exception as e:
            print(f"Error navigating: {e}")
            await browser.close()
            return

        print("Checking for Magic UI components...")

        # Check text content
        if await page.locator("text=Magic Gradient Title").count() > 0:
            print("Verified: Magic Gradient Title")
        else:
            print("ERROR: Magic Gradient Title not found")
            await page.screenshot(path="magic_failure.png")
            exit(1)

        if await page.locator("text=Shimmer Me").count() > 0:
            print("Verified: Shimmer Button")
        else:
             print("ERROR: Shimmer Button not found")
             await page.screenshot(path="magic_failure.png")
             exit(1)

        print("Checking for Aceternity components...")

        if await page.locator("text=Aceternity Title").count() > 0:
            print("Verified: Aceternity Title")
        else:
            print("ERROR: Aceternity Title not found")
            await page.screenshot(path="magic_failure.png")
            exit(1)

        if await page.locator("text=Glowing Card").count() > 0:
             print("Verified: Glowing Card")
        else:
            print("ERROR: Glowing Card not found")
            await page.screenshot(path="magic_failure.png")
            exit(1)

        print("SUCCESS: Magic UI & Aceternity components verified.")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
