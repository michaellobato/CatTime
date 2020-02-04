# CatTime
MERN app for securely displaying cats!

## Instillation
### Tools Needed
1. [node.js](https://nodejs.org/en/download/)
1. [yarn](https://classic.yarnpkg.com/en/docs/install#windows-stable)
1. [mongodb](https://docs.mongodb.com/manual/installation/)

### Instillation instructions
1. Clone the repo
2. yarn install

## Running Locally
### Start Mongo
I have a gross little script to start the db since I don't have it running as a server and it is not spun up via a container. obviously this is not ideal. If you are on windows you will need to change the path of the `mongo-win` to match your own instillation location. You may need to add the `bin` to your environment variable path as well. 
1. run `yarn run mongo-win` or `yarn run mongo-mac`

### For Development
1. `yarn run dev`

### Local testing (not development)
1. `yarn start`

## Concessions/Future Improvements
Things that I would do differently if I took more time to work on this:
1. Containerize for local and/or deployment
1. Tests of any and all kinds...
1. For something small like this I would use something lighter than React such as preact, but I am familiar with React and Preact doesn't currently have support for hooks.
1. Don't use gross scripts for running mongo
1. Use prettier + eslint
1. Use Babel?