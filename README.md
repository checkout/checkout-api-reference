# Checkout.com API Reference

[![Build Status](https://travis-ci.org/checkout/checkout-api-reference.svg?branch=master)](https://travis-ci.org/checkout/checkout-api-reference)

---

## NOTE

Review from the documentation team is now mandatory. You won't be able to merge changes until we have reviewed. Use the list below to see which Technical Writer is a assigned to you. We will approve on the same day. Contact [@Chrisi Webster](https://github.com/chrisi-webster-cko) if your assigned Technical Writer is away or unable to help.

### [@Toby Knott](https://github.com/toby-knott-cko)

- Payouts (including FX)
- Notifications
- Reconciliation
- Risk (including disputes)

### [@Chrisi Webster](https://github.com/chrisi-webster-cko)

- Marketplaces
- Web interfaces
- General updates with

### [@Cristina Szilagyi](https://github.com/cristina-szilagyi-cko)

- Payments
- APMs
- Authentication (sessions)

---

## Links

- Documentation: https://api-reference.checkout.com
- SwaggerUI: https://api-reference.checkout.com/swagger-ui/
- Look full spec:
  - JSON https://api-reference.checkout.com/swagger.json
  - YAML https://api-reference.checkout.com/swagger.yaml
- Preview spec version for branch `[branch]`: https://api-reference.checkout.com/preview/[branch]

**Warning:** All above links are updated only after Travis CI finishes deployment

## Working on specification

### Install

1. Install [Node JS](https://nodejs.org/)
2. Install [dotnet cli](https://dotnet.microsoft.com/download)
3. Clone repo and inside the repo directory
   - Run `npm install`

### Usage

1. Run `npm run start`
2. Checkout console output to see where local server is started.
3. Make changes using your favorite editor or `swagger-editor` (look for URL in console output)
4. All changes are immediately propagated to your local server, moreover all documentation pages will be automagically refreshed in a browser after each change
   **TIP:** you can open `swagger-editor`, documentation and `swagger-ui` in parallel
5. Once you finish with the changes you can run tests using: `npm run test`

### Troubleshooting

- Verify if Node.js is installed
  `node --version`

- Verify if Gulp is installed
  `gulp --version`

- Verify if dotnet is installed
  `dotnet --version`

If you are receiving the error message `ReferenceError: primordials is not defined` that's probably because you're using Node.js version >= 12 and Gulp version < 4. It's possible to overcome that by downgrading your Node.js version or by upgrading gulp on your machine. For more information, please check the issue https://github.com/gulpjs/gulp/issues/2324.
