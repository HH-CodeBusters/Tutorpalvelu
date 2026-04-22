# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: frontend.spec.ts >> logs JSON parse error
- Location: frontend.spec.ts:26:1

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - banner [ref=e3]:
    - generic [ref=e5]:
      - heading "TutorPalvelu" [level=6] [ref=e6]
      - navigation [ref=e7]:
        - link "Etusivu" [ref=e8] [cursor=pointer]:
          - /url: /
        - link "Tuutorit" [ref=e9] [cursor=pointer]:
          - /url: /tutors
        - link "Kalenteri" [ref=e10] [cursor=pointer]:
          - /url: /calendar
        - link "Kirjaudu" [ref=e11] [cursor=pointer]:
          - /url: /login
  - heading "Suodata tuutorit aineen mukaan" [level=5] [ref=e16]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | /* Remember to make sure that the backend is running!!! */ 
  3   | 
  4   | test('The page opens', async ({ page }) => {
  5   |   await page.goto('http://localhost:5173/');
  6   | 
  7   |   await expect(page.getByText('TutorPalvelu', { exact: true })).toBeVisible();
  8   | 
  9   | });
  10  | 
  11  | test('localhost works', async ({ page }) => {
  12  | 
  13  |     await page.goto('http://localhost:5173/');
  14  |     await expect(page.getByText('TutorPalvelu', { exact: true })).toBeVisible();
  15  | 
  16  | });
  17  | 
  18  | test('I can see the example tutor in the tuutorit page', async ({ page }) => {
  19  |     await page.goto('http://localhost:5173/tutors');
  20  | 
  21  |   await expect(page.getByText('Tuomo Tutor')).toBeVisible();
  22  |   await expect(page.getByText('ei koulua')).toBeVisible();
  23  | 
  24  | });
  25  | 
  26  | test('logs JSON parse error', async ({ page }) => {
  27  |   const errors = [];
  28  | 
  29  |   page.on('console', msg => {
  30  |     if (msg.type() === 'error') {
  31  |       errors.push(msg.text());
  32  |     }
  33  |   });
  34  | 
  35  |   await page.route('**/api/tutors*', route =>
  36  |     route.fulfill({
  37  |       body: '<!doctype html><html></html>'
  38  |     })
  39  |   );
  40  | 
  41  |   await page.goto('http://localhost:5173/tutors');
  42  | 
> 43  |   expect(errors.length).toBeGreaterThan(0);
      |                         ^ Error: expect(received).toBeGreaterThan(expected)
  44  | });
  45  | 
  46  | test('renders multiple tutors', async ({ page }) => {
  47  |  await page.route('**/api/tutors*', route =>
  48  |   route.fulfill({
  49  |     status: 200,
  50  |     contentType: 'application/json',
  51  |     body: JSON.stringify([
  52  |       { firstname: "A", lastname: "A", subjects: [] },
  53  |       { firstname: "B", lastname: "B", subjects: [] }
  54  |     ])
  55  |   })
  56  | );
  57  | 
  58  |   await page.goto('http://localhost:5173/tutors');
  59  | 
  60  |   await expect(page.getByText('A A')).toBeVisible();
  61  |   await expect(page.getByText('B B')).toBeVisible();
  62  | });
  63  | 
  64  | test('renders subjects correctly', async ({ page }) => {
  65  |   await page.route('**/api/tutors*', route =>
  66  |     route.fulfill({
  67  |       status: 200,
  68  |       body: JSON.stringify([
  69  |         {
  70  |           firstname: "Test",
  71  |           lastname: "User",
  72  |           subjects: [
  73  |             { subjectname: "Historia" },
  74  |             { subjectname: "Maantieto" }
  75  |           ]
  76  |         }
  77  |       ])
  78  |     })
  79  |   );
  80  | 
  81  |   await page.goto('http://localhost:5173/tutors');
  82  | 
  83  |   await expect(page.getByText('Historia, Maantieto')).toBeVisible();
  84  | });
  85  | 
  86  | test('user can navigate to tutors page', async ({ page }) => {
  87  |   await page.goto('http://localhost:5173');
  88  | 
  89  |   await page
  90  |   .getByRole('navigation')
  91  |   .getByRole('link', { name: 'Tuutorit' }).click();
  92  | 
  93  | 
  94  |   await expect(page).toHaveURL(/\/tutors$/);
  95  | });
  96  | 
  97  | test('Kalenteri page opens', async ({ page }) => {
  98  | 
  99  |     await page.goto('http://localhost:5173/calendar');
  100 |     await expect(page.getByText('Tänään')).toBeVisible();
  101 | 
  102 | });
  103 | 
```