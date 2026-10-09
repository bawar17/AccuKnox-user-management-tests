# OrangeHRM – Manual Test Cases

**Application:** OrangeHRM Demo
**URL:** https://opensource-demo.orangehrmlive.com/web/index.php/auth/login

## TC-01: Admin login

* **Objective:** Verify that an administrator can log in.
* **Precondition:** Valid administrator credentials.
* **Steps:**

  1. Open the login page.
  2. Enter username `admin`.
  3. Enter password `admin123`.
  4. Click Login.
* **Expected result:** The Dashboard page is displayed.
* **Priority:** High

## TC-02: Navigate to Admin

* **Objective:** Verify access to User Management.
* **Precondition:** Administrator is logged in.
* **Steps:**

  1. Click Admin in the navigation menu.
* **Expected result:** The Admin module is displayed.
* **Priority:** High

## TC-03: Add a new user

* **Objective:** Verify that an administrator can create a user.
* **Precondition:** Administrator is logged in and an employee exists.
* **Steps:**

  1. Open Admin.
  2. Click Add.
  3. Select a user role.
  4. Select an employee.
  5. Select a status.
  6. Enter a unique username.
  7. Enter and confirm a password.
  8. Click Save.
* **Expected result:** The user is created and appears in the user list.
* **Priority:** High

## TC-04: Required field validation

* **Objective:** Verify validation for missing required fields.
* **Precondition:** Administrator is logged in.
* **Steps:**

  1. Open Admin.
  2. Click Add.
  3. Leave required fields empty.
  4. Click Save.
* **Expected result:** Required-field validation messages are displayed and the user is not created.
* **Priority:** High

## TC-05: Duplicate username validation

* **Objective:** Verify that an existing username cannot be reused.
* **Precondition:** Administrator is logged in and the username already exists.
* **Steps:**

  1. Open Admin.
  2. Click Add.
  3. Complete the required fields.
  4. Enter an existing username.
  5. Enter and confirm a password.
  6. Click Save.
* **Expected result:** The system rejects the duplicate username and displays a validation message.
* **Priority:** High
