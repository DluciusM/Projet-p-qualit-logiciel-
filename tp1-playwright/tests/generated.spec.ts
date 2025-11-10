import { test, expect } from '@playwright/test';
test('scenario enregistré', async ({ page }) => {
await page.goto('https://demo.playwright.dev/todomvc');
await page.getByPlaceholder('What needs to be done?').click();
await page.getByPlaceholder('What needs to be done?').fill('Acheter du lait');
await page.keyboard.press('Enter');
await expect(page.getByText('Acheter du lait')).toBeVisible();
});