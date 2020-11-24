# Checkout.com API Reference
[![Build Status](https://travis-ci.org/checkout/checkout-api-reference.svg?branch=master)](https://travis-ci.org/checkout/checkout-api-reference)

## Links

- Documentation: https://api-reference.checkout.com
- SwaggerUI: https://api-reference.checkout.com/swagger-ui/
- Look full spec:
    + JSON https://api-reference.checkout.com/swagger.json
    + YAML https://api-reference.checkout.com/swagger.yaml
- Preview spec version for branch `[branch]`: https://api-reference.checkout.com/preview/[branch]

**NOTE:** All above links are updated only after Travis CI finishes deployment

## Working on specification

### Install

1. Install [Node JS](https://nodejs.org/)
2. Install [dotnet cli](https://dotnet.microsoft.com/download)
3. Clone repo and inside the repo directory
    - Run `npm install`

### Usage
 
1. Run `npm run start`
2. Check console output to see where local server is started
3. Make changes using your favorite editor (or the `swagger-editor` shipped with the project - look for the URL in the console output)
4. All changes are immediately propagated to your local server, moreover all documentation pages will be automagically refreshed in a browser after each change  
**TIP:** you can open `swagger-editor`, documentation and `swagger-ui` in parallel
5. Once you finish with the changes you can run tests using: `npm run test`

### Contribute

1. Your contribution should have a JIRA ticket on the [Documentation Board](https://checkout.atlassian.net/projects/DOCS/board)
2. Name your branch `<type>/<JIRA-issue-key>-<JIRA-issue-title>`  
*for example: "task/DOCS-534-add-oas3-operationid"*
3. Work, commit, push
4. Have a break, drink some coffee
5. Repeat (3) through (4) until finished
6. Create a PR and request review from  
    - a peer developer (if necessary)
    - [@Francesca Gaunard](https://github.com/francesca-gaunard-cko) and [@Toby Knott](https://github.com/toby-knott-cko)
7. After merging the PR, please check if your branch can be deleted

### Troubleshooting

- Verify if Node.js is installed `node --version`
- Verify if Gulp is installed `gulp --version`
- Verify if dotnet is installed `dotnet --version`

If you are receiving the error message `ReferenceError: primordials is not defined` that's probably because you're using Node.js version >= 12 and Gulp version < 4. It's possible to overcome that by downgrading your Node.js version or by upgrading gulp on your machine. For more information, please check the issue https://github.com/gulpjs/gulp/issues/2324.
