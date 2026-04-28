import { test, expect } from '@playwright/test';

test('Kalenteri page opens', async ({ page }) => {

    await page.goto('https://tutorpalvelu.vercel.app/');
    await page.getByRole('navigation').getByRole('link', { name: 'Kalenteri' }).click();

    await expect(page.getByText('Tänään')).toBeVisible();


});