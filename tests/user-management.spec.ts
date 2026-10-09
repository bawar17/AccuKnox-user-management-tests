import { test, expect } from '@playwright/test';

const login = async (page) => {
await page.goto(
'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
{ waitUntil: 'domcontentloaded', timeout: 60000 }
);

await page.getByRole('textbox', { name: 'Username' }).fill('admin');
await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
await page.getByRole('button', { name: 'Login' }).click();

await expect(
page.getByRole('heading', { name: 'Dashboard' })
).toBeVisible();
}

test('Login and navigate to Admin module', async ({ page }) => {
await login(page);

await page.getByRole('link', { name: 'Admin' }).click();

await expect(
page.getByRole('heading', { name: 'Admin' })
).toBeVisible();
});

test('Add a new user', async ({ page }) => {
await login(page);

await page.getByRole('link', { name: 'Admin' }).click();
await page.getByRole('button', { name: /Add/ }).click();

// User Role
await page.locator('.oxd-select-text').nth(0).click();
await page.getByText('ESS', { exact: true }).click();

// Employee Name
// Employee Name
const employeeField = page.getByPlaceholder('Type for hints...');
await employeeField.fill('Orange Test');

const employeeOption = page.getByText('Orange Test', { exact: true });
await expect(employeeOption).toBeVisible({ timeout: 10000 });
await employeeOption.click();


// Status
await page.locator('.oxd-select-text').nth(1).click();
await page.getByText('Enabled', { exact: true }).click();

// Username
// Username
const usernameField = page
  .locator('form .oxd-input-group')
  .filter({ hasText: 'Username' })
  .locator('input');
const timestamp = new Date()
  .toISOString()
  .replace(/[-:.TZ]/g, '')
  .slice(0, 14);

const username = `BawarIsBest_${timestamp}`;

await usernameField.fill(username);
await expect(usernameField).toHaveValue(username);


// Password and confirmation
await page.locator('input[type="password"]').nth(0).fill('StrongPass12');
await page.locator('input[type="password"]').nth(1).fill('StrongPass12');

// Save
await page.getByRole('button', { name: 'Save' }).click();

// Verify user creation
await expect(
  page.getByRole('heading', { name: 'System Users' })
).toBeVisible({ timeout: 10000 });

await expect(
  page.getByRole('cell', { name: username, exact: true })
).toBeVisible();

await expect(
  page.getByRole('cell', { name: username, exact: true })
).toBeVisible();
});


test('Add user - required fields validation', async ({ page }) => {
  await login(page);

  await page.getByRole('link', { name: 'Admin' }).click();
  await page.getByRole('button', { name: /Add/ }).click();

  // Try to save without filling any fields
  await page.getByRole('button', { name: 'Save' }).click();

  // Required-field validation should appear
  await expect(
    page.getByText('Required', { exact: true }).first()
  ).toBeVisible();
});


test('Add user - duplicate username validation', async ({ page }) => {
  await login(page);
  await page.getByRole('link', { name: 'Admin' }).click();

  // Confirm that the username already exists
  const searchUsername = page
    .locator('.oxd-input-group')
    .filter({ hasText: 'Username' })
    .locator('input');

  await searchUsername.fill('admin');
  await page.getByRole('button', { name: 'Search' }).click();

 await expect(
  page.getByRole('heading', { name: 'System Users' })
).toBeVisible();

  // Open Add User form
  await page.getByRole('button', { name: /Add/ }).click();

  // User Role
  await page.locator('.oxd-select-text').nth(0).click();
  await page.getByText('ESS', { exact: true }).click();

  // Employee Name
  const employeeField = page.getByPlaceholder('Type for hints...');
  await employeeField.fill('Orange Test');

  const employeeOption = page.getByText('Orange Test', { exact: true });
  await expect(employeeOption).toBeVisible({ timeout: 10000 });
  await employeeOption.click();

  // Status
  await page.locator('.oxd-select-text').nth(1).click();
  await page.getByText('Enabled', { exact: true }).click();

  // Use the existing admin username
  const usernameField = page
    .locator('form .oxd-input-group')
    .filter({ hasText: 'Username' })
    .locator('input');

  await usernameField.fill('admin');

  // Password and confirmation
  await page.locator('input[type="password"]').nth(0).fill('StrongPass12');
  await page.locator('input[type="password"]').nth(1).fill('StrongPass12');

  await page.getByRole('button', { name: 'Save' }).click();

  // Verify duplicate username is rejected
  await expect(
    page.getByText('Already exists', { exact: true })
  ).toBeVisible({ timeout: 10000 });
});

