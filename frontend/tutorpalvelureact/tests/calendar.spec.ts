import { test, expect } from '@playwright/test';

test('Kalenteri page opens', async ({ page }) => {

    await page.goto('https://tutorpalvelu.vercel.app/calendar');
    await expect(page.getByText('Tänään')).toBeVisible();

});