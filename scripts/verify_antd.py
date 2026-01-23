import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Navigate to the test page
        url = "http://localhost:3000/test-antd"
        print(f"Navigating to {url}...")
        try:
            await page.goto(url, wait_until="networkidle")
        except Exception as e:
            print(f"Error navigating: {e}")
            await browser.close()
            return

        # Check for Ant Design specific classes
        print("Checking for Ant Design components...")

        # Ant Button usually has 'ant-btn' class
        buttons = await page.locator(".ant-btn").count()
        print(f"Found {buttons} Ant Design buttons")

        if buttons == 0:
            print("ERROR: No Ant Design buttons found!")
            await page.screenshot(path="antd_failure.png")
            await browser.close()
            exit(1)

        # Check for Ant Card 'ant-card'
        cards = await page.locator(".ant-card").count()
        print(f"Found {cards} Ant Design cards")

        if cards == 0:
            print("ERROR: No Ant Design cards found!")
            await page.screenshot(path="antd_failure.png")
            await browser.close()
            exit(1)

        # Check for Ant Alert 'ant-alert'
        alerts = await page.locator(".ant-alert").count()
        print(f"Found {alerts} Ant Design alerts")

        if alerts == 0:
            print("ERROR: No Ant Design alerts found!")
            await page.screenshot(path="antd_failure.png")
            await browser.close()
            exit(1)

        print("SUCCESS: Ant Design components verified.")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
