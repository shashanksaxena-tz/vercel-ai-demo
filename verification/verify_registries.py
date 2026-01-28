from playwright.sync_api import sync_playwright
import time

def verify_registries():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # Check Antd
        print("Checking Antd...")
        try:
            page.goto("http://localhost:3000/test-antd", timeout=60000)
            page.wait_for_selector("text=Ant Design Registry Test", timeout=10000)
            # Wait for styles to load properly
            time.sleep(2)
            page.screenshot(path="verification/antd.png", full_page=True)
            print("Antd verified.")
        except Exception as e:
            print(f"Antd failed: {e}")

        # Check MagicUI
        print("Checking MagicUI...")
        try:
            page.goto("http://localhost:3000/test-magicui", timeout=60000)
            page.wait_for_selector("text=Magic UI Registry Test", timeout=10000)
            time.sleep(2)
            page.screenshot(path="verification/magicui.png", full_page=True)
            print("MagicUI verified.")
        except Exception as e:
            print(f"MagicUI failed: {e}")

        # Check Aceternity
        print("Checking Aceternity...")
        try:
            page.goto("http://localhost:3000/test-aceternity", timeout=60000)
            page.wait_for_selector("text=Aceternity Registry Test", timeout=10000)
            time.sleep(2)
            page.screenshot(path="verification/aceternity.png", full_page=True)
            print("Aceternity verified.")
        except Exception as e:
            print(f"Aceternity failed: {e}")

        browser.close()

if __name__ == "__main__":
    verify_registries()
