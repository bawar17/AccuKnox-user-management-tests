# OrangeHRM User Management – Playwright Tests

## Overview

This project contains manual and automated end-to-end tests for the OrangeHRM User Management module. It was created as part of the AccuKnox QA Trainee Practical Assessment.

**Application:** [OrangeHRM Demo](https://opensource-demo.orangehrmlive.com/web/index.php/auth/login)

## Scope

The automated tests cover:

1. Administrator login and navigation to the Admin module.
2. Creating a new user with valid data.
3. Required-field validation.
4. Duplicate username validation.

Manual test cases are documented in `test-cases/manual-test-cases.md`.

## Technology Stack

* Ubuntu Linux
* Node.js and npm
* Playwright
* TypeScript test syntax
* Chromium

## Prerequisites

* Node.js and npm installed.
* Git installed.
* Internet access to the OrangeHRM demo application.

## Installation

Clone the repository and install dependencies:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd AccuKnox-user-management-tests
npm install
npx playwright install chromium
```

Replace `<YOUR_GITHUB_REPOSITORY_URL>` with the repository URL after publishing the project.

## Run Tests

Run all tests:

```bash
npx playwright test tests/user-management.spec.ts --project=chromium
```

Run tests sequentially:

```bash
npx playwright test tests/user-management.spec.ts --project=chromium --workers=1
```

Run tests with a visible browser:

```bash
npx playwright test tests/user-management.spec.ts --project=chromium --headed
```

Run a specific test:

```bash
npx playwright test tests/user-management.spec.ts --project=chromium -g "Add a new user"
```

## Test Reports

Open the HTML report:

```bash
npx playwright show-report
```

## Test Data

The tests use the public OrangeHRM demo environment. The `Orange Test` employee must exist for the user creation and duplicate username scenarios.

The user creation test generates a timestamp-based username to reduce conflicts between test runs.

**Note:** The demo environment is shared and may be reset or modified. Test data and results can therefore vary.

## Project Structure

```text
AccuKnox-user-management-tests/
├── .github/
├── test-cases/
│   └── manual-test-cases.md
├── tests/
│   └── user-management.spec.ts
├── package.json
├── package-lock.json
├── playwright.config.js
└── README.md
```

## Author

Prepared for the AccuKnox QA Trainee Practical Assessment.
