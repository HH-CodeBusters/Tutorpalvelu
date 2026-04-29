import { test, expect } from '@playwright/test';

test('The page opens', async ({ page }) => {
  await page.goto('https://tutorpalvelu.vercel.app/');

  await expect(page.getByText('TutorPalvelu', { exact: true })).toBeVisible();

});

test('All of the navigation buttons work', async ({page}) => {

await page.goto('https://tutorpalvelu.vercel.app/')
await page.getByRole('navigation').getByRole('link', { name: 'Tuutorit' }).click();
await expect(page.getByText('Suodata tuutorit aineen mukaan')).toBeVisible();
await page.getByRole('navigation').getByRole('link', {name: 'Etusivu'}).click
await expect(page.getByRole('navigation').getByText('TutorPalvelu')).toBeVisible
await page.getByRole('navigation').getByRole('link', { name: 'Kalenteri' }).click();
await expect(page.getByText('Tänään')).toBeVisible();
await page.getByRole('navigation').getByRole('link', {name: 'Etusivu'}).click
await expect(page.getByRole('navigation').getByText('TutorPalvelu')).toBeVisible
await page.getByRole('navigation').getByRole('link', {name: 'Kirjaudu'}).click
await expect(page.getByText('Kirjaudu')).toBeVisible();
await expect(page.getByText('Ei vielä tiliä?')).toBeVisible

});


