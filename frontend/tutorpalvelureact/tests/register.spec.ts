/*import { test, expect } from '@playwright/test';

test('navigate to sign up form', async ({ page }) => {
    await page.goto(' https://tutorpalvelu.vercel.app/');

    await page.click('text=Sign up');

    await page.fill('#name', 'Testi'); 
    await page.fill('#email', 'testi@example.com');
    await page.fill('#password', 'Salasana123');
    await page.click('button[type=submit]');
    
    await expect(page).toHaveURL(' https://tutorpalvelu.vercel.app/')
    await expect(page.locator('text=Account created successfully')).toBeVisible();
});


test('sign up with missing infos', async ({ page }) => {
    await page.goto(' https://tutorpalvelu.vercel.app/');

    await page.click('button[type=submit]');
    
    await expect(page.locator('text=Name is required.')).toBeVisible();
    await expect(page.locator('text=Please enter a valid email address.')).toBeVisible();
    await expect(page.locator('text=Password must be at least 6 characters long.')).toBeVisible();
    await expect(page).not.toHaveURL('https://authentication-6o1.pages.dev/')
});


test('sign up with existing email', async ({ page }) => {
    await page.goto(' https://tutorpalvelu.vercel.app/');

    await page.fill('#name', 'Alice'); 
    await page.fill('#email', 'Alice@example.com');
    await page.fill('#password', 'Salasana123');
    await page.click('button[type=submit]');
    
    await expect(page.locator('text=Email is already in use')).toBeVisible();
    await expect(page).not.toHaveURL(' https://tutorpalvelu.vercel.app/')
});

test('successfull sign up', async ({ page }) => {
    await page.goto(' https://tutorpalvelu.vercel.app/');

    await page.fill('#name', 'Testi'); 
    await page.fill('#email', 'testi@example.com');
    await page.fill('#password', 'Salasana123');
    await page.click('button[type=submit]');
    
    await expect(page).toHaveURL(' https://tutorpalvelu.vercel.app/')
    await expect(page.locator('text=Account created successfully')).toBeVisible();
});


test('successfull sign up and login', async ({ page }) => {
    await page.goto(' https://tutorpalvelu.vercel.app/');

    await page.fill('#name', 'Testi'); 
    await page.fill('#email', 'testi@example.com');
    await page.fill('#password', 'Salasana123');
    await page.click('button[type=submit]');
    
    await expect(page).toHaveURL(' https://tutorpalvelu.vercel.app/')
    await expect(page.locator('text=Account created successfully')).toBeVisible();

     await page.fill('#email', 'testi@example.com');
    await page.fill('#password', 'Salasana123');
    await page.click('button[type=submit]');

    await expect(page).toHaveURL(' https://tutorpalvelu.vercel.app/')
    await expect(page.locator('text=Welcome')).toBeVisible();
});
*/