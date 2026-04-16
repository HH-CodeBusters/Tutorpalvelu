import { test, expect } from '@playwright/test';


test('The page opens', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await expect(page.getByText('TutorPalvelu', { exact: true })).toBeVisible();

});

test('localhost works', async ({ page }) => {

    await page.goto('http://localhost:5173/');
    await expect(page.getByText('TutorPalvelu', { exact: true })).toBeVisible();

});

test('I can see tutors in the tutor page', async ({ page }) => {
    await page.goto('http://localhost:5173/tutors');

    await expect(page.getByText('Tutors', { exact: true })).toBeVisible();
    await expect(page.getByText('John Doe', { exact: true })).toBeVisible();



});
