from playwright.sync_api import sync_playwright

def verify_antd():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            print("Navigating to test-antd...")
            page.goto("http://localhost:3000/test-antd", timeout=60000)
            page.wait_for_selector("text=Ant Design Registry Test", timeout=30000)
            page.screenshot(path="verification/test-antd.png", full_page=True)
            print("Screenshot saved to verification/test-antd.png")
        except Exception as e:
            print(f"Failed to verify Ant Design: {e}")

        browser.close()

if __name__ == "__main__":
    verify_antd()
