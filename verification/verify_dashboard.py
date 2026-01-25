from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # Go to playground
        page.goto("http://localhost:3000/playground")

        # Wait for the chat panel to load
        page.wait_for_selector("text=Generator")

        # Take a screenshot of the initial state
        page.screenshot(path="verification/dashboard_initial.png")
        print("Initial screenshot taken.")

        # Try to type a prompt
        page.fill("textarea", "Create a simple button")

        # Click generate
        page.click("button[type='submit']")

        # Wait a bit for potential error or loading state
        page.wait_for_timeout(3000)

        # Take another screenshot
        page.screenshot(path="verification/dashboard_generating.png")
        print("Generating screenshot taken.")

    except Exception as e:
        print(f"Error: {e}")
        page.screenshot(path="verification/error.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
