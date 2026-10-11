import { test, expect, type Page } from '@playwright/test';

const BASE_URL =
  'https://opensource-demo.orangehrmlive.com/web/index.php';

const TEST_PASSWORD = 'StrongPass12';

async function login(page: Page) {
  await page.goto(`${BASE_URL}/auth/login`, {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });

  await page.getByRole('textbox', { name: 'Username' }).fill('admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(
    page.getByRole('heading', { name: 'Dashboard' }),
  ).toBeVisible();
}

async function openAdmin(page: Page) {
  await page.getByRole('link', { name: 'Admin' }).click();

  await expect(
    page.getByRole('heading', { name: 'System Users' }),
  ).toBeVisible();
}

async function selectOption(page: Page, index: number, option: string) {
  await page.locator('.oxd-select-text').nth(index).click();
  await page.getByText(option, { exact: true }).click();
}

async function fillEmployee(page: Page) {
  const employeeField = page.getByPlaceholder('Type for hints...');
  await employeeField.fill('Orange Test');

  const employeeOption = page.getByText('Orange Test', { exact: true });
  await expect(employeeOption).toBeVisible({ timeout: 10000 });
  await employeeOption.click();
}

async function fillUserForm(
  page: Page,
  username: string,
  password: string,
) {
  await selectOption(page, 0, 'ESS');
  await fillEmployee(page);
  await selectOption(page, 1, 'Enabled');

  const usernameField = page
    .locator('form .oxd-input-group')
    .filter({ hasText: 'Username' })
    .locator('input');

  await usernameField.fill(username);
  await page.locator('input[type="password"]').nth(0).fill(password);
  await page.locator('input[type="password"]').nth(1).fill(password);
}

async function searchUser(page: Page, username: string) {
  const usernameField = page
    .locator('.oxd-input-group')
    .filter({ hasText: 'Username' })
    .locator('input');

  await usernameField.fill(username);
  await page.getByRole('button', { name: 'Search' }).click();
}

function uniqueUsername() {
  return `BawarTest_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
}

test('Login and navigate to Admin module', async ({ page }) => {
  await login(page);
  await openAdmin(page);
});

test('Add a new user', async ({ page }) => {
  await login(page);
  await openAdmin(page);
  await page.getByRole('button', { name: /Add/ }).click();

  const username = uniqueUsername();
  await fillUserForm(page, username, TEST_PASSWORD);
  await page.getByRole('button', { name: 'Save' }).click();

  await expect(
    page.getByRole('heading', { name: 'System Users' }),
  ).toBeVisible({ timeout: 10000 });

  await searchUser(page, username);

  await expect(
    page.getByRole('cell', { name: username, exact: true }),
  ).toBeVisible({ timeout: 10000 });
});

test('Add user - required fields validation', async ({ page }) => {
  await login(page);
  await openAdmin(page);
  await page.getByRole('button', { name: /Add/ }).click();
  await page.getByRole('button', { name: 'Save' }).click();

  await expect(
    page.getByText('Required', { exact: true }).first(),
  ).toBeVisible();
});

test('Add user - duplicate username validation', async ({ page }) => {
  await login(page);
  await openAdmin(page);

  const username = uniqueUsername();

  await page.getByRole('button', { name: /Add/ }).click();
  await fillUserForm(page, username, TEST_PASSWORD);
  await page.getByRole('button', { name: 'Save' }).click();

  await expect(
    page.getByRole('heading', { name: 'System Users' }),
  ).toBeVisible({ timeout: 10000 });

  await expect(
    page.getByRole('cell', { name: username, exact: true }),
  ).toBeVisible({ timeout: 10000 });

  await page.getByRole('button', { name: /Add/ }).click();
  await fillUserForm(page, username, TEST_PASSWORD);
  await page.getByRole('button', { name: 'Save' }).click();

  await expect(
    page.getByText('Already exists', { exact: true }),
  ).toBeVisible({ timeout: 10000 });
});

test('User management - search, edit, verify and delete user', async ({ page }) => {
  await login(page);
  await openAdmin(page);

  const username = uniqueUsername();

  // Create a test user.
  await page.getByRole('button', { name: /Add/ }).click();
  await fillUserForm(page, username, TEST_PASSWORD);
  await page.getByRole('button', { name: 'Save' }).click();

  await expect(
    page.getByRole('heading', { name: 'System Users' }),
  ).toBeVisible({ timeout: 10000 });

  // Search for the new user.
  await searchUser(page, username);

  const userRow = page.getByRole('row').filter({ hasText: username });
  await expect(userRow).toBeVisible({ timeout: 10000 });

  // Open Edit for this user (the second action button in the row).
  await userRow.getByRole('button').last().click();

  // Confirm the Edit User form is open.
  await expect(
    page.getByPlaceholder('Type for hints...'),
  ).toBeVisible();

  // Change the user's status and save.
  await selectOption(page, 1, 'Disabled');
  await page.getByRole('button', { name: 'Save' }).click();

  await expect(
    page.getByRole('heading', { name: 'System Users' }),
  ).toBeVisible({ timeout: 10000 });

  // Verify that the updated status was saved.
  await searchUser(page, username);

  const updatedRow = page.getByRole('row').filter({ hasText: username });
  await expect(updatedRow).toBeVisible({ timeout: 10000 });
  await expect(updatedRow).toContainText('Disabled');

  // Reopen Admin to ensure we are on the user list before deleting.
  await openAdmin(page);
  await searchUser(page, username);

  const deleteRow = page.getByRole('row').filter({ hasText: username });
  await expect(deleteRow).toBeVisible({ timeout: 10000 });

  // Click the first action button, which is Delete in OrangeHRM.
  await deleteRow.getByRole('button').first().click();

  const deleteDialog = page.getByRole('dialog');
  await expect(deleteDialog).toBeVisible();
  await deleteDialog.getByRole('button', { name: /Yes, Delete/i }).click();

  await expect(
    page.getByText('Successfully Deleted', { exact: false }),
  ).toBeVisible({ timeout: 10000 });

  // Verify that the deleted user no longer appears.
  await searchUser(page, username);
  await expect(
    page.getByRole('row').filter({ hasText: username }),
  ).toHaveCount(0);
});
