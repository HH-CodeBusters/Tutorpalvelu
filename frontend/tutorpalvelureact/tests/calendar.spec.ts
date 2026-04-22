import { test, expect } from '@playwright/test';
/* Remember to make sure that the backend is running!!! */ 

test('Kalenteri page opens', async ({ page }) => {

    await page.goto('http://localhost:5173/calendar');
    await expect(page.getByText('Tänään')).toBeVisible();

});