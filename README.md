# Checkout.com API Reference
[![Build Status](https://travis-ci.org/checkout/checkout-api-reference.svg?branch=master)](https://travis-ci.org/checkout/checkout-api-reference)


## Links

- Documentation: https://api-reference.checkout.com
- SwaggerUI: https://api-reference.checkout.com/swagger-ui/
- Look full spec:
    + JSON https://api-reference.checkout.com/swagger.json
    + YAML https://api-reference.checkout.com/swagger.yaml
- Preview spec version for branch `[branch]`: https://api-reference.checkout.com/preview/[branch]

**Warning:** All above links are updated only after Travis CI finishes deployment

## Working on specification
### Install

1. Install [Node JS](https://nodejs.org/)
2. Install [dotnet cli](https://dotnet.microsoft.com/download)
3. Clone repo and `cd`
    + Run `npm install`

### Usage
 
1. Run `npm start`
2. Checkout console output to see where local server is started.
3. Make changes using your favorite editor or `swagger-editor` (look for URL in console output)
4. All changes are immediately propagated to your local server, moreover all documentation pages will be automagically refreshed in a browser after each change
**TIP:** you can open `swagger-editor`, documentation and `swagger-ui` in parallel
5. Once you finish with the changes you can run tests using: `npm test`
