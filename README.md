<<<<<<< HEAD
# Find a Court or Tribunal Frontend

Website to find a court or tribunal.

## Table of Contents

* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Running the application](#running-the-application)
  * [Running with Docker](#running-with-docker)
* [Developing](#developing)
  * [Code style](#code-style)
  * [Updating SCSS and JavaScript](#updating-scss-and-javascript)
  * [Running the tests](#running-the-tests)
  * [Security](#security)
    * [CSRF prevention](#csrf-prevention)
    * [Helmet](#helmet)
  * [Healthcheck](#healthcheck)
* [License](#license)
=======
# Playwright Project Template

This repository serves as a template for UI test automation using [Playwright](https://playwright.dev) within HMCTS. It provides an accelerated set up with multiple browser support, environmental config and sensible defaults. You can simply clone this repo if starting from scratch or copy the parts you would like to use in your test own test project.

## Features

- **Cross-browser testing**: Supports Chromium, Firefox, and WebKit.
- **Responsive testing**: Test on different viewports (tablet/desktop).
- **Parallel test execution**: Run tests concurrently for faster feedback.
- **Accessibility tests**: Integrate basic accessibility checks using libraries like Axe Core.
- **Performance tests**: Provides an implementation of Lighthouse which can be used for quick feedback on UI performance.
- **CI/CD ready**: Sample Jenkinsfile included for integrating with your CI pipeline.
- **Test tagging**: Use tags like `@a11y` for accessibility, `@smoke` for smoke tests, and more.

## Project Structure

The repository follows a **Page Object Model (POM)** design pattern, ensuring that locators and actions are well-organized and reusable.

See the [POM docs](https://github.com/hmcts/tcoe-playwright-example/blob/master/docs/PAGE_OBECT_MODEL.md) for more info

```sh
├── tests/                  # Test files
├── page-objects/           # Page objects
├─── components/            # Common components shared across pages
├─── elements/              # Common elements that could be found in a page or in a component
├─── pages/                 # Unique pages that may contain their own locators
├── utils/                  # Utility functions or common tasks (e.g., login, API methods etc)
```

TCoE Best Practices for setting up playwright in your service can be found in the [playwright-e2e/readme.md](https://github.com/hmcts/tcoe-playwright-example/blob/master/docs/BEST_PRACTICE.md).

## Contributing

We all share the responsibility of ensuring this repo is up to date and accurate in terms of best practice. If you would like to contribute you can raise a github issue with the improvement you are suggesting or raise a PR yourself. See the [contribution guide](https://github.com/hmcts/tcoe-playwright-example/blob/master/CONTRIBUTING.md) for more info.
>>>>>>> tcoe-playwright/branch_to_merge

## Getting Started

### Prerequisites

<<<<<<< HEAD
Running the application requires the following tools to be installed in your environment:

  * [Node.js](https://nodejs.org/) v12.0.0 or later
  * [yarn](https://yarnpkg.com/)
  * [Docker](https://www.docker.com)

### Running the application

Install dependencies by executing the following command:

 ```bash
$ yarn install
 ```
Bundle:

```bash
$ yarn webpack
```

Run:

```bash
$ yarn start
```

The application's home page will be available at https://localhost:3100

### Running with Docker

Create docker image:

```bash
  docker-compose build
```

Run the application by executing the following command:

```bash
  docker-compose up
```

This will start the frontend container exposing the application's port
(set to `3100` in this template app).

In order to test if the application is up, you can visit https://localhost:3100 in your browser.
You should get a very basic home page (no styles, etc.).

## Developing

### Code style

We use [ESLint](https://github.com/typescript-eslint/typescript-eslint)
alongside [sass-lint](https://github.com/sasstools/sass-lint)

Running the linting with auto fix:
```bash
$ yarn lint --fix
```

### Updating SCSS and JavaScript

To compile changes made to SCSS files run:

```bash
$ yarn webpack
```

In the console scroll up to 'Entrypoint main' and copy css file name which will look something like this:

```
main.fbf607435accbb0a2ad6.css
```

Locate src/main/views/webpack/css.njk and replace the current href by pasting in the new file name,
e.g.:

```
<link href="/main.fbf607435accbb0a2ad6.css" rel="stylesheet">
```

The SCSS changes should now compile in the browser. The same will need to be done for JavaScript updates, instead
copying the JavaScript file name and replacing it in src/main/views/webpack/js.njk.

### Running the tests

This template app uses [Jest](https://jestjs.io//) as the test engine. You can run unit tests by executing
the following command:

```bash
$ yarn test
```

Here's how to run functional tests (the template contains just one sample test):

```bash
$ yarn test:routes
```

Running accessibility tests:

```bash
$ yarn test:pa11y
```

Make sure all the paths in your application are covered by accessibility tests (see [a11y.ts](src/test/a11y/a11y.ts)).

Running functional tests:

```bash
$ yarn test:functional
```

Make sure you run the server before running the functional tests.

### Security

#### CSRF prevention

[Cross-Site Request Forgery](https://github.com/pillarjs/understanding-csrf) prevention has already been
set up in this template, at the application level. However, you need to make sure that CSRF token
is present in every HTML form that requires it. For that purpose you can use the `csrfProtection` macro,
included in this template app. Your njk file would look like this:

```
{% from "macros/csrf.njk" import csrfProtection %}
...
<form ...>
  ...
    {{ csrfProtection(csrfToken) }}
  ...
</form>
...
```

#### Helmet

This application uses [Helmet](https://helmetjs.github.io/), which adds various security-related HTTP headers
to the responses. Apart from default Helmet functions, following headers are set:

* [Referrer-Policy](https://helmetjs.github.io/docs/referrer-policy/)
* [Content-Security-Policy](https://helmetjs.github.io/docs/csp/)

There is a configuration section related with those headers, where you can specify:
* `referrerPolicy` - value of the `Referrer-Policy` header


Here's an example setup:

```json
    "security": {
      "referrerPolicy": "origin",
    }
```

Make sure you have those values set correctly for your application.

### Healthcheck

The application exposes a health endpoint (https://localhost:3100/health), created with the use of
[Nodejs Healthcheck](https://github.com/hmcts/nodejs-healthcheck) library. This endpoint is defined
in [health.ts](src/main/routes/health.ts) file. Make sure you adjust it correctly in your application.
In particular, remember to replace the sample check with checks specific to your frontend app,
e.g. the ones verifying the state of each service it depends on.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
=======
Ensure you have the following installed on your machine:

- Node.js (v14+)
- Yarn

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/your-username/playwright-template.git
cd playwright-template
yarn install
```

### Running Tests

Run all tests using the Playwright test runner:

```bash
yarn playwright test
```

To run a specific test file:

```bash
yarn playwright test tests/specific_test_file.spec.ts
```

To run tests on a specific browser:

```bash
yarn playwright test --project=chrome
yarn playwright test --project=firefox
yarn playwright test --project=webkit
```

### Test Tagging

You can use tags to group tests, for example:

```bash
yarn playwright test --grep @smoke
```

### Debugging Tests

To run tests with tracing, screenshots, and video recording for debugging purposes:

```bash
yarn playwright test --trace on --video on --screenshot on
```

Alternatively, you can use `page.pause()` inside your test whilst in `--headed` mode to pause execution at a specific point.

### Accessibility Tests

Run accessibility checks as part of your tests using Axe Core:

```bash
yarn playwright test --grep @a11y
```

### Running in CI

This project currently provides two sample Jenkinsfile's:

- Jenkinsfile_CNP: (Cloud Native Platform) This provides your typical "merge" pipeline. When you have a PR, this is the pipeline that will run. Currently it runs typechecks and linting (with eslint playwright plugin) checks.
- Jenkinsfile_nightly: This is the nightly pipeline that is sheduled to run daily. This will typically be the tests you choose to run as part of your regression suite. You may choose to not run certain types of tests on a daily basis.
>>>>>>> tcoe-playwright/branch_to_merge
