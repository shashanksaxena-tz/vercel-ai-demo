from playwright.sync_api import sync_playwright

def verify_registries():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Verify Ant Design
        print("Verifying Ant Design...")
        page.goto("http://localhost:3000/test-antd")
        page.wait_for_selector("h1:has-text('Ant Design Registry Test')")
        page.screenshot(path="verification/antd.png", full_page=True)
        print("Ant Design captured.")

        # Verify Magic UI
        print("Verifying Magic UI...")
        page.goto("http://localhost:3000/test-magicui")
        page.wait_for_selector("h1:has-text('Magic UI Registry Test')")
        page.screenshot(path="verification/magicui.png", full_page=True)
        print("Magic UI captured.")

        # Verify Aceternity UI
        print("Verifying Aceternity UI...")
        page.goto("http://localhost:3000/test-aceternity")
        page.wait_for_selector("h1:has-text('Aceternity UI Registry Test')")
        page.screenshot(path="verification/aceternity.png", full_page=True)
        print("Aceternity UI captured.")

        browser.close()

if __name__ == "__main__":
    verify_registries()
