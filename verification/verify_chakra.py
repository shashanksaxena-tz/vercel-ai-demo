from playwright.sync_api import Page, expect, sync_playwright
import time

def verify_chakra(page: Page):
    # Navigate to the test page
    print("Navigating to test page...")
    page.goto("http://localhost:3000/test-chakra")

    # Wait for the heading to appear (confirms page load)
    print("Waiting for heading...")
    expect(page.get_by_role("heading", name="Chakra UI Registry Test")).to_be_visible(timeout=120000)

    # Check for some key components
    # Button
    print("Checking buttons...")
    expect(page.get_by_role("button", name="Primary")).to_be_visible()
    expect(page.get_by_role("button", name="Destructive")).to_be_visible()

    # Card
    print("Checking card...")
    expect(page.get_by_text("Sample Card")).to_be_visible()

    # Metric
    print("Checking metrics...")
    expect(page.get_by_text("$45,231")).to_be_visible()

    # Table headers
    print("Checking table...")
    expect(page.get_by_role("columnheader", name="Name")).to_be_visible()

    # Take a screenshot
    print("Taking screenshot...")
    page.screenshot(path="verification/chakra-registry.png", full_page=True)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_chakra(page)
            print("Verification successful!")
        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="verification/error.png")
            raise e
        finally:
            browser.close()
