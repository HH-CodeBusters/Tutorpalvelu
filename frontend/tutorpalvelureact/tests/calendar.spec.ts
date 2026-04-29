import { test, expect } from '@playwright/test';

test('Kalenteri page opens', async ({ page }) => {

    await page.goto('https://tutorpalvelu.vercel.app/');
    await page.getByRole('navigation').getByRole('link', { name: 'Kalenteri' }).click();

    await expect(page.getByText('Tänään')).toBeVisible();


});
/* Kun tämän testin ajaa, se luo aivan aidon ajan nimellä "Testiaika" tuotantosivulle. Siksi kommenteissa. Ajettu viimeksi 29/4/2026, toimi vielä silloin.
test('User can add a new appointment', async ({page}) => {
  await page.goto('https://tutorpalvelu.vercel.app/');
  await page.getByRole('navigation').getByRole('link', { name: 'Kalenteri' }).click();
  await page.locator('.fc-non-business').first().click();
  await page.getByRole('textbox', { name: 'Varauksen otsikko' }).click();
  await page.getByRole('textbox', { name: 'Varauksen otsikko' }).fill('Testiaika');
  await page.getByRole('button', { name: 'Tallenna' }).click();
  await expect(page.getByText('Testiaika')).toBeVisible
});

Tämä testi poistaa aikasemmassa testissä luodun "Testiaika" ajan. Viimeksi ajettu 29/4/2026, toimi vielä silloin.
test('User can delete the newly added appointment', async ({page}) =>{
  await page.goto('https://tutorpalvelu.vercel.app/');
  await page.getByRole('navigation').getByRole('link', { name: 'Kalenteri' }).click();
  await page.locator('a').filter({ hasText: '- 15.00Testiaika' }).click();
  await page.getByRole('button', { name: 'Poista' }).click();
  await expect(page.getByText('Testiaika')).toHaveCount(0);
});
*/