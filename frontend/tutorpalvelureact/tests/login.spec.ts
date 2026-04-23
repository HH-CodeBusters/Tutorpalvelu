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


test('user can log in', async ({ page }) => {
  await page.goto(' https://tutorpalvelu.vercel.app/');
  await page.click('text=Kirjaudu');
  
    const emailInput = page.locator('input[name="email"]');
  const passwordInput = page.locator('input[name="password"]');
  const signInButton = page.locator('button[type=submit]');
  await expect(emailInput).toBeVisible();
  await expect(passwordInput).toBeVisible();
  await expect(signInButton).toBeVisible();

    await page.fill('#email', 'tuomo.tutor@gmail.com');
    await page.fill('#password', 'Tuomo12345');
    await page.click('button[type=submit]');

    await expect(page).toHaveURL(' https://tutorpalvelu.vercel.app/');
    await expect(page.locator('text=Oma Profiili')).toBeVisible();
});

/*
test('login with missing infos', async ({ page }) => {
    await page.goto(' https://tutorpalvelu.vercel.app/');

    await page.click('button[type=submit]');

    await expect(page.locator('text=Please enter a valid email address.')).toBeVisible();
    await expect(page.locator('text=Password must be at least 6 characters long.')).toBeVisible();
    await expect(page).not.toHaveURL(' https://tutorpalvelu.vercel.app/')
});


test('wrong email', async ({ page }) => {
    await page.goto(' https://tutorpalvelu.vercel.app/');

    await page.fill('#email', 'wrong@example.com');
    await page.fill('#password', '}3jc\\xJnQ=E=+Q_y/%Hd311bW#6{_Oyj');
    await page.click('button[type=submit]');

    await expect(page.locator('text=Invalid email or password')).toBeVisible();
});


test('too short password', async ({ page }) => {
    await page.goto(' https://tutorpalvelu.vercel.app/');

    await page.fill('#email', 'alice@example.com');
    await page.fill('#password', 'short');
    await page.click('button[type=submit]');

    await expect(page.locator('text=Password must be at least 6 characters long.')).toBeVisible();
});


test('wrong infos', async ({ page }) => {
    await page.goto(' https://tutorpalvelu.vercel.app/');

    await page.fill('#email', 'wrong@example.com');
    await page.fill('#password', 'wrongpass');
    await page.click('button[type=submit]');

    await expect(page.locator('text=invalid')).toBeVisible();
});


test('without login', async ({ page }) => {
  await page.goto(' https://tutorpalvelu.vercel.app/');
  
  await expect(page).toHaveURL(' https://tutorpalvelu.vercel.app/')
});


test('logout redirects to login', async ({ page }) => {
    await page.goto(' https://tutorpalvelu.vercel.app/');

    await page.fill('#email', 'alice@example.com');
    await page.fill('#password', '}3jc\\xJnQ=E=+Q_y/%Hd311bW#6{_Oyj');
    await page.click('button[type=submit]');

    await expect(page).toHaveURL(' https://tutorpalvelu.vercel.app/')
    await expect(page.locator('text=Welcome')).toBeVisible();
    
    await page.click('text=Logout');

    await expect(page).toHaveURL(' https://tutorpalvelu.vercel.app/')
});
*/