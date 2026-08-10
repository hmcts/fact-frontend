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

## Getting Started

### Prerequisites

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

