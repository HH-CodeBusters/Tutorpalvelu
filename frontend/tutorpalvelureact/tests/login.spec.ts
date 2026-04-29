import { test , expect} from '@playwright/test';


test('login page visible', async ({ page }) => {
  await page.goto(' https://tutorpalvelu.vercel.app/');
  await page.click('text=Kirjaudu');

  const emailInput = page.locator('input[name="email"]');
  const passwordInput = page.locator('input[name="password"]');
  const signInButton = page.locator('button[type=submit]');
  await expect(emailInput).toBeVisible();
  await expect(passwordInput).toBeVisible();
  await expect(signInButton).toBeVisible();
});


test('user can log in and view their profile', async ({ page }) => {
  await page.goto('https://tutorpalvelu.vercel.app/');
  await page.click('text=Kirjaudu');
  
  const emailInput = page.locator('input[name="email"]');
  const passwordInput = page.locator('input[name="password"]');
  const signInButton = page.locator('button[type=submit]');
  await expect(emailInput).toBeVisible();
  await expect(passwordInput).toBeVisible();
  await expect(signInButton).toBeVisible();

    await page.fill('input[name="email"]', 'tuomo.tutor@gmail.com');
    await page.fill('input[name="password"]', 'Tuomo12345');
    await page.click('button[type=submit]');

    await expect(page).toHaveURL(' https://tutorpalvelu.vercel.app/');

    await expect(page.locator('nav').getByText('Profiili')).toBeVisible();
    await page.getByRole('navigation').getByRole('link', {name: 'Profiili'}).click
    await expect(page.getByText('Oma Profiili')).toBeVisible
});


test('login with missing infos', async ({ page }) => {
    await page.goto(' https://tutorpalvelu.vercel.app/');
    await page.click('text=Kirjaudu');
    await page.click('button[type=submit]');

    await expect(page.getByText('Please fill out this field.')).toBeVisible
});


test('wrong email', async ({ page }) => {
    await page.goto(' https://tutorpalvelu.vercel.app/');
    await page.click('text=Kirjaudu');
    await page.fill('input[name="email"]', 'oskari.motskari@gmail.com');
    await page.fill('input[name="password"]', 'Tuomo12345');
    await page.click('button[type=submit]');

    await expect(page.getByText('Kirjautuminen epäonnistui.')).toBeVisible
});






test('User can not go to profile page if they are not logged in', async ({ page }) => {
  await page.goto(' https://tutorpalvelu.vercel.app/profile');
  
  await expect(page.getByText('Et ole kirjautuneena sisään.')).toBeVisible
});


test('The logout button works', async ({ page }) => {
  await page.goto('https://tutorpalvelu.vercel.app/');
  await page.click('text=Kirjaudu');
  
  const emailInput = page.locator('input[name="email"]');
  const passwordInput = page.locator('input[name="password"]');
  const signInButton = page.locator('button[type=submit]');
  await expect(emailInput).toBeVisible();
  await expect(passwordInput).toBeVisible();
  await expect(signInButton).toBeVisible();

    await page.fill('input[name="email"]', 'tuomo.tutor@gmail.com');
    await page.fill('input[name="password"]', 'Tuomo12345');
    await page.click('button[type=submit]');

    await expect(page).toHaveURL('https://tutorpalvelu.vercel.app/');

    await expect(page.getByText('Kirjaudu ulos')).toBeVisible();
    await page.getByRole('button', { name: 'Kirjaudu ulos' }).click();
    await expect(page.getByText('Kirjaudu')).toBeVisible();

});
