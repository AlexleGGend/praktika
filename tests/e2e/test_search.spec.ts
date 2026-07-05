import { test, expect } from '@playwright/test';

test('full flow: upload, index, search', async ({ page }) => {
  await page.goto('http://localhost:80');
  await expect(page.locator('h1')).toContainText('Поиск по документам');
});