// Use Playwright's test and expect
import { test, expect } from '@playwright/test';
//const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('/');
  
  // Wait for page to load
  await expect(page).toHaveTitle(/Vite App/);
  
  // Check if canvas is created
  const canvas = await page.$('canvas');
  expect(canvas).not.toBeNull();
});
  