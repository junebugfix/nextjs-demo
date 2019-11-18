# Introduction to the repo

This is a NextJS app which talks to Azure Cosmos DB, is rendered on the server, and uses Github Actions to automatically deploy to Azure App Service.

### The `.github/workflows` folder contains three workflow files for CI:
    - push.yml - deploy to production when code is pushed to master
    - pr.yml - when a PR is created or updated, deploy a unique staging environment for testing
    - pr-close.yml - clean up the staging environment when a PR is closed

Azure App Service requires the app to run with a command starting with `node`, so `server.js` runs an express server as a proxy, forwarding all requests to NextJS, instead of using NextJS's built in server directly.

In order to talk to Cosmos DB, the app needs several environment variables to be set (see `config.ts`). The CI workflows will read those values from this repo's secrets, and set them as environment variables in the App Service App.