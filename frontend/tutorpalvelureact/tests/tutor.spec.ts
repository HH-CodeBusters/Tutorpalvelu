import { test, expect } from '@playwright/test';
/* Remember to make sure that the backend is running!!! */ 

test('The page opens', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await expect(page.getByText('TutorPalvelu', { exact: true })).toBeVisible();

});

test('localhost works', async ({ page }) => {

    await page.goto('http://localhost:5173/');
    await expect(page.getByText('TutorPalvelu', { exact: true })).toBeVisible();

});

test('I can see the example tutor in the tuutorit page', async ({ page }) => {
    await page.goto('http://localhost:5173/tutors');

  await expect(page.getByText('Tuomo Tutor')).toBeVisible();
  await expect(page.getByText('ei koulua')).toBeVisible();

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

  await page.goto('http://localhost:5173/tutors');

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

  await page.goto('http://localhost:5173/tutors');

  await expect(page.getByText('Historia, Maantieto')).toBeVisible();
});

test('user can navigate to tutors page', async ({ page }) => {
  await page.goto('http://localhost:5173');

  await page
  .getByRole('navigation')
  .getByRole('link', { name: 'Tuutorit' }).click();


  await expect(page).toHaveURL(/\/tutors$/);
});