# CatTime
MERN app for securely displaying cats!

This was a coding exercise where the goal was to create a javascript based full stack solution complete with secure login/registration and displaying of some sensative information limited on a per user basis. In total I have worked on this project for about 12 hours and although it has a plethora of flaws, it is enough to convey my knowledge and coding practices. Keep in mind the goal of this was to get as much done as quickly as possible while keeping the app "lightweight" and easy to understand. 

The client is separate from the service which acts as the API between the database. I used create-react-app in the interest of time but that is far less than ideal in situations other than ones constrained by time. This is my first hands on attempt at creating secure network communication from scratch.

## Installation
### Tools Needed
1. [node.js](https://nodejs.org/en/download/)
1. [yarn](https://classic.yarnpkg.com/en/docs/install#windows-stable)
1. [mongodb](https://docs.mongodb.com/manual/installation/)

### Installation instructions
1. Clone the repo
2. run `yarn install --frozen-lockfile`

## Running Locally
### Start Mongo
I have a gross little script to start the db since I don't have it running as a server and it is not spun up via a container. obviously this is not ideal. If you are on windows you will need to change the path of the `mongo-win` to match your own installation location. You may need to add the `bin` to your environment variable path as well. Alternatively you can modify the `server/config/keys.js` "dbUrl" to point to your running mongo.
1. Navigate to the `server` director and run `yarn run mongo-win` or `yarn run mongo-mac`

### Server
1. Navigate to the `server` directory and run `yarn run dev`

### Client
1. Navigate to the `webClient` directory and run `yarn run start`

## Concessions/Future Improvements
Things that I would do differently if I took more time to work on this:
1. Containerize for local and/or deployment
1. Tests of any and all kinds...
1. For something small like this I would use something lighter than React such as preact, but I am familiar with React and Preact doesn't currently have support for hooks.
1. Don't use gross scripts for running mongo
1. Don't use create-react-app or eject.
1. Use prettier + eslint
1. Use Babel for the service so I can use imports and other es6+ features? (create react app uses it so the client has it)
1. API documentation.
1. create root level package.json and control certain things globally like linting.
1. use https and http2.
1. Don't use inline styles anywhere...
1. Better loading user experience.
