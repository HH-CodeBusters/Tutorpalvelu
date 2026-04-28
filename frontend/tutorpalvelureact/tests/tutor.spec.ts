import { test, expect } from '@playwright/test';

test('I can see the example tutor in the tuutorit page', async ({ page }) => {
    await page.goto('https://tutorpalvelu.vercel.app/');

  await page
  .getByRole('navigation')
  .getByRole('link', { name: 'Tuutorit' }).click();
  
  await expect(page.getByText('Tuomo Tutor')).toBeVisible();
  await expect(page.getByText('Ei koulua')).toBeVisible();

});


test('renders multiple tutors', async ({ page }) => {
 await page.route('**/api/tutors*', route =>
  route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify([
      { firstname: "A", lastname: "A", subjects: [] },
      { firstname: "B", lastname: "B", subjects: [] }
    ])
  })
);

  await page.goto('https://tutorpalvelu.vercel.app/');

  await page.getByRole('navigation')
  .getByRole('link', { name: 'Tuutorit' }).click();

  await expect(page.getByText('A A')).toBeVisible();
  await expect(page.getByText('B B')).toBeVisible();
});

test('renders subjects correctly', async ({ page }) => {
  await page.route('**/api/tutors*', route =>
    route.fulfill({
      status: 200,
      body: JSON.stringify([
        {
          firstname: "Test",
          lastname: "User",
          subjects: [
            { subjectname: "Historia" },
            { subjectname: "Maantieto" }
          ]
        }
      ])
    })
  );

  await page.goto('https://tutorpalvelu.vercel.app/');

  await page.getByRole('navigation')
  .getByRole('link', { name: 'Tuutorit' }).click();

  await expect(page.getByText('Historia, Maantieto')).toBeVisible();
});

test('user can navigate to tutors page', async ({ page }) => {
  await page.goto('https://tutorpalvelu.vercel.app/');

  await page
  .getByRole('navigation')
  .getByRole('link', { name: 'Tuutorit' }).click();


  await expect(page).toHaveURL(/\/tutors$/);
});

test('user sees the error message when failed to fetch a tutor', async ({ page }) => {
  
  await page.route('**/api/tutors', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });

  await page.goto('https://tutorpalvelu.vercel.app/');

  await page
  .getByRole('navigation')
  .getByRole('link', { name: 'Tuutorit' }).click();

  await expect(
    page.getByText('Ei löytynyt tuutoreita')
  ).toBeVisible();
});