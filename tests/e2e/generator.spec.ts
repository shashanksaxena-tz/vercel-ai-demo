import { test, expect } from '@playwright/test';

test.describe('Generator Flow', () => {
  test('should load playground', async ({ page }) => {
    await page.goto('/playground');
    // Check for the title we saw in layout/page
    await expect(page.getByText('AI UI Playground')).toBeVisible();
  });

  test('should allow typing in prompt', async ({ page }) => {
    await page.goto('/playground');
    const input = page.getByPlaceholder("Describe your UI... e.g. 'A sleek CRM dashboard'");
    await expect(input).toBeVisible();
    await input.fill('Create a button');
    await expect(input).toHaveValue('Create a button');
  });

  test('should switch registry', async ({ page }) => {
    await page.goto('/playground');

    // Find the select trigger (shadcn Select usually uses role="combobox")
    const trigger = page.getByRole('combobox');
    await expect(trigger).toBeVisible();

    // Click to open
    await trigger.click();

    // Select MUI
    const muiOption = page.getByRole('option', { name: 'Material UI' });
    await muiOption.click();

    // Verify selection
    await expect(trigger).toContainText('Material UI');
  });
});
