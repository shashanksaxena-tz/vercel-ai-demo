from playwright.sync_api import sync_playwright

def verify_shadcn():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the shadcn test page
        print("Navigating to http://localhost:3000/test-shadcn")
        page.goto("http://localhost:3000/test-shadcn")

        # Wait for content to load
        page.wait_for_selector("div.grid", timeout=10000)

        # Take a screenshot of the whole page
        print("Taking screenshot...")
        page.screenshot(path="verification/shadcn_registry.png", full_page=True)

        browser.close()

if __name__ == "__main__":
    verify_shadcn()
