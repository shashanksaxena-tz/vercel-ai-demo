from playwright.sync_api import sync_playwright
import time

def verify_registries():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        print("Waiting for server...")
        # Wait for server to start (simple retry mechanism)
        for i in range(60):
            try:
                page.goto("http://localhost:3000", timeout=2000)
                break
            except:
                time.sleep(1)

        # 1. Ant Design
        try:
            print("Navigating to test-antd...")
            page.goto("http://localhost:3000/test-antd")
            # Wait for main content
            page.wait_for_selector("text=Ant Design Registry Test", timeout=15000)
            # Take screenshot
            page.screenshot(path="verification/test-antd.png", full_page=True)
            print("Screenshot saved to verification/test-antd.png")
        except Exception as e:
            print(f"Failed to verify Ant Design: {e}")

        # 2. Magic UI
        try:
            print("Navigating to test-magicui...")
            page.goto("http://localhost:3000/test-magicui")
            page.wait_for_selector("text=Magic UI Registry Test", timeout=15000)
            page.screenshot(path="verification/test-magicui.png", full_page=True)
            print("Screenshot saved to verification/test-magicui.png")
        except Exception as e:
            print(f"Failed to verify Magic UI: {e}")

        # 3. Aceternity UI
        try:
            print("Navigating to test-aceternity...")
            page.goto("http://localhost:3000/test-aceternity")
            page.wait_for_selector("text=Aceternity UI Registry Test", timeout=15000)
            page.screenshot(path="verification/test-aceternity.png", full_page=True)
            print("Screenshot saved to verification/test-aceternity.png")
        except Exception as e:
            print(f"Failed to verify Aceternity UI: {e}")

        browser.close()

if __name__ == "__main__":
    verify_registries()
