import { test, expect } from '@playwright/test';

test('The page opens', async ({ page }) => {
  await page.goto('https://tutorpalvelu.vercel.app/');

  await expect(page.getByText('TutorPalvelu', { exact: true })).toBeVisible();

});


