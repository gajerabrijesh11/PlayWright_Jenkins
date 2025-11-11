import { test, expect } from '@playwright/test';

test('Googlesearch', async ({ page }) => {
    await page.goto('http://google.com/');
    await expect(page).toHaveTitle("Google");
})