# Problem Statement 1 — Manual Test Cases

## Application Under Test

- **Application:** OrangeHRM
- **URL:** https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
- **Username:** `Admin`
- **Password:** `admin123`

## Preconditions

- The OrangeHRM demo application is accessible.
- The administrator can log in successfully.
- A valid employee record is available for assigning to a new user.
- Unique test usernames are used when creating users.

---

## TC-01: Navigate to Admin Module

**Objective:** Verify that the administrator can access the User Management module.

**Preconditions:** The login page is accessible.

**Test Steps:**
1. Open the OrangeHRM login page.
2. Enter the administrator username and password.
3. Click **Login**.
4. Click **Admin** in the navigation menu.

**Expected Result:**
- Login succeeds.
- The Admin module opens.
- The System Users page is displayed.

---

## TC-02: Add a New User

**Objective:** Verify that an administrator can create a new user.

**Preconditions:** The administrator is logged in, and a valid employee record exists.

**Test Steps:**
1. Navigate to **Admin → User Management → Users**.
2. Click **Add**.
3. Select a User Role.
4. Select an Employee Name.
5. Select a Status.
6. Enter a unique Username.
7. Enter a valid Password and confirm it.
8. Click **Save**.

**Expected Result:**
- The user is created successfully.
- The application returns to the System Users page.
- The new username appears in the user list.

---

## TC-03: Search for the Newly Created User

**Objective:** Verify that an administrator can find a user by username.

**Preconditions:** A test user has been created successfully.

**Test Steps:**
1. Navigate to the System Users page.
2. Enter the test username in the Username search field.
3. Click **Search**.
4. Inspect the search results.

**Expected Result:**
- The correct user appears in the results.
- The displayed username matches the search criteria.

---

## TC-04: Edit User Details

**Objective:** Verify that an administrator can update editable user details.

**Preconditions:** A test user exists.

**Test Steps:**
1. Search for the test user.
2. Click the **Edit** action for that user.
3. Change the User Role.
4. Change the Employee Name, if another valid employee is available.
5. Change the Status.
6. Save the changes.

**Expected Result:**
- The application accepts the valid changes.
- The user record is updated successfully.
- The application returns to the System Users page.

**Note:** Only fields available for editing in the application are included.

---

## TC-05: Validate Updated User Details

**Objective:** Verify that changes made to a user are saved correctly.

**Preconditions:** TC-04 has been completed successfully.

**Test Steps:**
1. Search for the edited user again.
2. Inspect the user details displayed in the results.
3. Open the Edit form if necessary.
4. Verify the saved User Role, Employee Name and Status.

**Expected Result:**
- The updated values are retained after saving.
- The displayed and saved details match the values entered in TC-04.

---

## TC-06: Delete a User

**Objective:** Verify that an administrator can delete a test user.

**Preconditions:** A test user exists and is no longer needed for other test cases.

**Test Steps:**
1. Search for the test user.
2. Select the Delete action for that user.
3. Confirm the deletion if prompted.
4. Search for the same username again.

**Expected Result:**
- The application confirms or completes the deletion.
- The deleted user no longer appears in the search results.

---

## TC-07: Validate Required Fields

**Objective:** Verify that required fields prevent incomplete user creation.

**Preconditions:** The administrator is logged in.

**Test Steps:**
1. Navigate to the System Users page.
2. Click **Add**.
3. Leave the required fields empty.
4. Click **Save**.

**Expected Result:**
- Required-field validation messages are displayed.
- The application does not create a user.
- The user remains on the Add User form.

---

## TC-08: Validate Duplicate Username

**Objective:** Verify that the application rejects a username that already exists.

**Preconditions:** The administrator is logged in, and the chosen username already exists.

**Test Steps:**
1. Navigate to the System Users page.
2. Click **Add**.
3. Complete the other required fields with valid values.
4. Enter an existing username.
5. Enter a valid password and confirmation.
6. Click **Save**.

**Expected Result:**
- The application rejects the duplicate username.
- A suitable validation message is displayed.
- No second user is created with the same username.

---

## Postconditions

- Remove test-created users when they are no longer required.
- Keep any pre-existing demo accounts unchanged.
- Record the actual result and pass/fail status for each executed test case.

## Test Coverage Summary

| Requirement | Test Case |
|---|---|
| Navigate to Admin Module | TC-01 |
| Add a New User | TC-02 |
| Search for the Newly Created User | TC-03 |
| Edit User Details | TC-04 |
| Validate Updated Details | TC-05