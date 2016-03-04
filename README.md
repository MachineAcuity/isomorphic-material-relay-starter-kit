# Isomorphic Material Relay Starter Kit (IMRSK)

IMRSK started as an off-shoot of multiple projects and boilerplates we use at [Code Foundries](http://codefoundries.com) and is developed with the help of the [contributors](https://github.com/codefoundries/isomorphic-material-relay-starter-kit/graphs/contributors). It is an attempt to provide and organize a well thought out starting point for future projects. It also contains samples of techniques that tie all the underlying technologies together. Baseline functionality like user log in, authentication, etc. is included.

| How to try     | **Link**|
|----------------|----------------|
| Live Demo on [Heroku](https://www.heroku.com/) | [http://isomorphic-material-relay.herokuapp.com/](http://isomorphic-material-relay.herokuapp.com/). Configured with in-memory data store. This is a free dyno, so give it some time to spin up. |
| Live Demo on [Open Shift](https://www.openshift.com/) | [http://app-imrsk.rhcloud.com/](http://app-imrsk.rhcloud.com/). Configured with Cassandra data store. Under active development, might be down. |
| Run locally | [Local Setup](#local-setup) |
| Run on [Heroku](https://www.heroku.com/nodejs) | [Heroku Setup](#heroku-setup) |



## Help wanted

If you like to help, please review the list of items where [help is needed](https://github.com/codefoundries/isomorphic-material-relay-starter-kit/labels/Help%20wanted).


## Articles

The following articles explain in detail certain aspects of this repository:

* [Cassandra, meet Relay. Relay, meet Cassandra](http://codefoundries.com/developer/cassandra/cassandra-meet-relay.html).
* [Isomorphic Server Variables](http://codefoundries.com/developer/single-page-application/isomorphic-server-variables.html).
* [SEO Using Isomorphic Application With Relay and Helmet](http://codefoundries.com/developer/single-page-application/seo-isomorphic-react-helmet.html).


## Underlying technologies

| **Technology** | **Description**|
|----------------|----------------|
| [React](https://facebook.github.io/react/) | Library for building SPA. |
| [Material UI](http://www.material-ui.com/) | Library for implementing Material Design in React. All user interface in this kit is built exclusively with Material UI components. |
| [material-ui-country-flags](https://github.com/codefoundries/material-ui-country-flags) | Library with flag icons for Material-UI, used for the language selector. |
| [Relay](https://facebook.github.io/relay/) | A Javascript framework for building data-driven react applications. |
| [GraphQL](https://facebook.github.io/graphql/) | A query language created by Facebook in 2012 for describing the capabilities and requirements of data models for client‐server applications. |
| [Express GraphQL](https://github.com/graphql/express-graphql) | A Node.js express library that allows the creation of GraphQL servers. |
| [Isomorphic Relay](https://github.com/denvned/isomorphic-relay) | Adds server side rendering support to React Relay. IMRSK fully utilizes this library, while waiting for [https://github.com/facebook/relay/issues/589](https://github.com/facebook/relay/issues/589). The eventual goal is to have full isomorphism with authentication. |
| [JWT](https://jwt.io/) | JSON Web Tokens is an industry standard [RFC 7519](https://tools.ietf.org/html/rfc7519) method for representing claims securely between two parties. |
| [React Helmet](https://github.com/nfl/react-helmet) | Reusable React component will manage all of your changes to the document head with support for document title, meta, link, script, and base tags. |
| [Flow](http://flowtype.org/) | Static type checker, designed to find type errors in JavaScript programs. |
| [Babel](http://babeljs.io) | Compiles ES6/ES7 to ES5. Allows using features from ES6 and ES7 today. |
| [Webpack](http://webpack.github.io) | Bundles npm packages and the application Java Script into a single file. Includes hot reloading via [react-transform-hmr](https://www.npmjs.com/package/react-transform-hmr). Also, Webpack can bundle any required CSS. |
| [Node.js](https://nodejs.org)| Event-driven, non-blocking I/O runtime based on JavaScript that is lightweight and efficient. |
| [npm Scripts](https://docs.npmjs.com/misc/scripts)| Glues all this together in a handy automated build. |
| [Apache Cassandra](http://cassandra.apache.org/) | The database you are looking for. Work in progress. |



## Features

| **Feature** | **Details**|
|-------------|------------|
| SPA | The IMRSK is a Single Page Application. It has all the advantages that come with SPA, while using isomorphism and the Relay features allows to offset practically all negatives that come with this approach. |
| Isomorphism | The kit is designed to be fully isomorphic. This allows for very quick rendering when the users first access a page in the application. All content is designed to be accessed in an isomorphic way allowing the use and sharing of links to any part of the SPA. |
| SEO | The combination of isomorphism with the use of the react helmet allows all the content in the application to be SEO ready. Samples will be added to the kit later. |
| ES6, ES7 | The IMRSK uses features of ES6 and ES7 extensively. All react components are implemented as ES6 classes. |
| JWT Tokens | JWT tokens are used for authentication. They are stored in server-only cookies which, together with the use of GraphQL, provides a fair amount of protection against several possible attacks. |
| HTTP Only cookies | The HTTP only cookies are currently the safest way to handle authentication in a web application. The JWT tokens are stored in HTTP only cookies making it harder for attackers to access. Why this is the best place is explained in [Where to Store Your JWTs - Cookies vs HTML5 Web Storage](https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage/). |
| Material Design | Expanding upon the "card" motifs that debuted in Google Now, Material Design makes more liberal use of grid-based layouts, responsive animations and transitions, padding, and depth effects such as lighting and shadows. |
| Responsive Design | Mainly through the features of the Material UI library, the examples in IMRSK work well on different form factors, ranging from desktop browsers to mobile phones. |
| Hot Reload | The webpack development server supports hot reload when components are changed. The IMRSK is configured with hot reload. |
| Built for speed | The starter kit is configured to use established practices for optimizing speed like caching and compression. This entails certain requirements about how it is used, read in the Speed and Building section below. |
| Cassandra/In Memory | The starter kit is intended for use with Cassandra, but simple in-memory data structures are provided also for light testing and experimentation. |



### <a name="heroku-setup"></a> Heroku setup

In order to set up the project on heroku, perform the following steps:

* **Install [Heroku Toolbelt](https://toolbelt.heroku.com/)**.
* **Clone from github** `git clone https://github.com/codefoundries/isomorphic-material-relay-starter-kit`.
* **Create an app** `heroku create`.
* **Specify JWT secret** using `heroku config:set JWT_SECRET=tMMoDN3WCZWoV13wpBjUVcgLQRrCP3c3veNMMV5JlxNelC23oAja8eTVSzgK94LR9TpmLrwqGfuiSzOQ` where you replace the secret value with a secret of your choosing. Verify that the value is set with `heroku config`.
* **Deploy the app** `git push heroku master`.

For more information refer to excellent [Getting Started with Node.js on Heroku - Deploy the app](https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app). I do not have an available free Cassandra dyno on Heroku so I can not test how to configure Cassandra.

#### Running bash on Heroku

`heroku run bash` is your friend in need who is a friend indeed.

#### Troubleshooting unmet peer dependencies on Heroku

Whenever, when updating Heroku, an 'UNMET DEPENDENCY' message similar to the one below is displayed:

```
remote:        isomorphic-material-relay-starter-kit@0.7.2 /tmp/build_xxxxxxxxxxxx
remote:        ├─┬ material-ui@0.14.3
remote:        │ ├── inline-style-prefixer@0.6.7
remote:        │ └── UNMET PEER DEPENDENCY react@^0.14.3
remote:        ├── UNMET DEPENDENCY react@^0.14.6
remote:        ├── react-dom@0.14.7
remote:        └─┬ react-helmet@2.3.1
remote:        └── core-js@2.0.3
```

Try the following troubleshooting step from the Heroku troubleshooting manual: Each time you run `npm install`, npm leaves packages that meet your semver requirements untouched. That’s why an `npm install` today may lead to a different tree than the `npm install` you ran yesterday, even if your `package.json` didn’t change.
Therefore, it’s a good practice to periodically clear `node_modules` and reinstall from scratch to ensure that your` package.json` dependencies are still valid:

```
$ rm -rf node_modules
$ npm install --quiet --production
$ npm start
```

In fact, those are essentially the commands that Heroku runs when we build and launch your project. If they work locally, you’re likely to be cloud-ready.

If this does not work, running

```
npm shrinkwrap
```

will generate the `npm-shrinkwrap.json` file, which seems to resolve the above problem in most cases.

### <a name="local-setup"></a> Initial Development Machine Setup

* **Install [Node.js](https://nodejs.org)**.  
* **Install [Git](https://git-scm.com/downloads)**.
* **Install [Apache Cassandra](http://cassandra.apache.org/download/)**.
* **Make sure** that Node.js is at least version 5.0 and NPM is at least version 3.

We have only tested this running on MacOS. I am copying the instructions for other operating systems from the **[React Slingshot](https://github.com/coryhouse/react-slingshot)**. We have not had a chance to test them and would appreciate help with that. If you have done that please open an issue with the results whether successful or not, and feel free to PR to update this document.

#### **On Linux**  
Run this to [increase the limit](http://stackoverflow.com/questions/16748737/grunt-watch-error-waiting-fatal-error-watch-enospc) on the number of files Linux will watch. [Here's why](https://github.com/coryhouse/react-slingshot/issues/6).    
`echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`

#### **On Windows**  
1. **Install [Python 2.7](https://www.python.org/downloads/)**. Browser-sync (and various other Node modules) rely on node-gyp, which requires Python on Windows.  
2. **Install C++ Compiler**. [Visual Studio Express](https://www.visualstudio.com/en-US/products/visual-studio-express-vs) comes bundled with a free C++ compiler. Or, if you already have Visual Studio installed: Open Visual Studio and go to File -> New -> Project -> Visual C++ -> Install Visual C++ Tools for Windows Desktop. The C++ compiler is used to compile browser-sync (and perhaps other Node modules).

### Initial Project setup on local machine

In order to set up the project locally, perform the following steps:

* **Clone from github.** `git clone https://github.com/codefoundries/isomorphic-material-relay-starter-kit`.
* **Install node packages.** `npm install`.
* **Perform initial setup.** `npm run setup-local`.
* **Specify JWT_SECRET** by modifying the `.env` file. This step can be skipped if you do not care about the actual security and simply want to get the project running.
* **Start the server.** `npm run start`.
* **The application is available at:** `http://localhost:4444`.



## NPM tasks

### Setup

| **Task**               | **Details**|
|------------------------|------------|
| `postinstall`          | Called by NPM after `npm install`. Configures to use memory data access, re-builds the GraphQL schema and performs a webpack build. |
| `setup-local`          | Sets up the IMRSK for use on local dev machine. |
| `setup-cassandra-init` | Drops (if it exists), creates and initializes with sample data a local Cassandra database called `imrsk`. |
| `config-da-memory`     | Configure IMRSK for using in-memory data structures. |
| `config-da-cassandra`  | Configure IMRSK for using Cassandra for persistence. |

### Build

| **Task**               | **Details**|
|------------------------|------------|
| `build-schema`         | Rebuilds GraphQL schema from the JavaScript definition. |
| `build-mui-icon-list`  | Re-builds list of icons based on the ones available in Material-UI. If `if( key > 50 ) return;` is uncommented, all icons will be generated. It becomes quite the page and webpack voices objections, but it works. |
| `build-webpack`        | Runs a webpack build in order to run in production mode. Created and populates `public/assets/{Version}``. |

### Run

| **Task**               | **Details**|
|------------------------|------------|
| `start-webpack`        | Starts the webpack development server, responsible for asset compilation and hot reload. |
| `start-dev`            | Starts the application server in development mode. |
| `dev`                  | Starts the task at the same time: `start-webpack` and` start-dev`. The color coding achieved with chalk will not be available with this task. |
| `start`                | Run in production mode. |

### Running in development mode

Two separate servers need to be started. The first one is the actual application in development mode. The second server is the webpack server which is to be run at all times for hot replace

* Start application HTTP and Webpack server: `npm run dev`.

To open the app:

* Navigate to `http://localhost:4444`, unless you specified a different port.



## Environment Variables

The following environment variables can be used to control the server:

| Variable Name                  | Description                                                                                             |
| ------------------------------ | --------------------------------------------------------------------------------------------------------|
| PORT                           | Port for serving the SPA web application and API.                                                       |
| HOST                           | Host for for serving, for instance `127.0.0.1`.                                                         |
| PUBLIC_URL                     | URL through which browsers and other clients can access the server - isomorphic pages, public, GraphQL. Optional. Should not be empty. Example: `https://example.com` |
| USER_AUTH_SECRET               | Secret passed by server rendered to GraphQL server telling it to trust the auth_token without requiring the user_auth_token in the header to be correct. Instead it constains this very secret. |
| JWT_SECRET                     | Secret used for JWT tokens.                                                                             |
| CASSANDRA_CONNECTION_POINTS    | Cassandra connection point comma separated list. `localhost` if on the same machine.                    |
| CASSANDRA_KEYSPACE             | Cassandra keyspace/database.                                                                            |
| CASSANDRA_USER                 | Optional Cassandra username.                                                                            |
| CASSANDRA_PASSWORD             | Optional Cassandra password.                                                                            |

They can be set in the `.env` file in the root of the project. `Example.env` in
the documents folder contains an example of such file. It is copied to `.env` in `postinstall`.



## Project Structure

Naming conventions are used wherever possible. The following tags are used to comprise names of files:

| Tag                                    | Description                                                    |
| -------------------------------------- | ---------------------------------------------------------------|
| `{Entity}`                             | Name of entity in the data store, like User, ToDo item, etc. |
| `{Mutation}`                           | Indicates type of mutation applied to an entity, like add, delete, update, list_delete, etc. |
| `{Version}`                            | Version of the project, as specified in `package.json`, like 0.6.3. |

Below is the list of the main files and folders for this project. Asterisk on the right means link into the repository for quick viewing.

| Folder/File                                   | Description                                                    |  |
| --------------------------------------------- | ---------------------------------------------------------------| --- |
| `data/`                                       | Methods and data access functions | [*](./data/) |
| `data/da/`                                    | Data access functions. | [*](./data/da/) |
| `data/da/{Entity}.js`                         | Data access functions for {Entity}. Exported functions are named DA_{Entity}_*. Simply points either into memory, or Cassandra. |
| `data/da_cassandra/_client.js`                | Promisified Cassandra client. | [*](./data/da_cassandra/_client.js) |
| `data/da_cassandra/{Entity}.js`               | Data access functions for {Entity} implemented for Cassandra. |
| `data/da_memory/generateUUID.js`              | This file has been removed. It was used for UUID generation. UUID generation for the -in memory implementation is achieved through Cassandra types: `Uuid.random( )`. | |
| `data/da_memory/{Entity}.js`                  | Data access functions for {Entity} implemented as in-memory transient storage. |
| `data/model/`                                 | Models | [*](./data/model/) |
| `data/model/{Entity}.js`                      | Model for {Entity}. Default class for that entity is exported. |
| `doc/`                                        | Misc. documentation. | [*](./doc/) |
| `doc/example.env`                             | Example of a `.env` file. Also copied into `\.env` in `setup-local` script. | [*](./doc/example.env) |
| `graphql/`                                    | Holds the elements of the GraphQL schema. | [*](./graphql/) |
| `graphql/interface/NodeInterface.js`          | The main node interface. | [*](./graphql/interface/NodeInterface.js) |
| `graphql/mutations/`                          | All the mutations. | [*](./graphql/mutations/) |
| `graphql/mutations/{Entity}_{Mutation}.js`    | One mutation. |
| `graphql/type/`                               | All types, including system types, entity types, connections, etc. | [*](./graphql/type/) |
| `graphql/type/MutationType.js`                | Type that includes all the mutations. | [*](./graphql/type/MutationType.js) |
| `graphql/type/QueryType.js`                   | Query type that resolves nodes to entities. | [*](./graphql/type/QueryType.js) |
| `graphql/type/ViewerType.js`                  | Current user and entry point for any information retrieved. | [*](./graphql/type/ViewerType.js) |
| `graphql/type/{Entity}Type.js`                | Type for an entity. |
| `graphql/types/*Connection.js`                | Connection between two types. |
| `graphql/schema.graphql`                      | Human readable representation of the schema. Generated by `build-schema`. | [*](./graphql/schema.graphql) |
| `graphql/server.js`                           | The GraphQL Express server. | [*](./graphql/server.js) |
| `graphql/schema.js`                           | Entry point for the schema, points at the query type and the mutation type. | [*](./graphql/schema.js) |
| `graphql/schema.json`                         | Schema in JSON format. Must exist for `build-schema` to run, but is re-generated by it. | [*](./graphql/schema.json) |
| `public/`                                     | This folder is served as root of the website. | [*](./public/) |
| `public/assets/`                              | Assets generated by webpack. |
| `public/assets/{Version}/app.css`             | CSS assets compiled by WebPack. Not much to see. |
| `public/assets/{Version}/app.js`              | All the nice ES5-compliant JavaScript for the SPA. |
| `scripts/build-mui-icon-list.js`              | Rebuilds the list of Materual-UI icons. Modify this file to control how many icons are displayed. | [*](./scripts/build-mui-icon-list.js) |
| `scripts/build-schema.js`                     | Rebuilds the GraphQL schema files. Must be run when the schema is modified. | [*](./scripts/build-schema.js) |
| `scripts/cassandra-init.cql`                  | CQL Script for creating and seeding the Cassandra database. | [*](./scripts/cassandra-init.cql) |
| `server/`                                     | The Node.js server serving isomorphic content, GraphQL, public files and authentication requests. | [*](./server/) |
| `server/auth.js`                              | Authentication service, verifies user name and password and creates JWT tokens. | [*](./server/auth.js) |
| `server/server.js`                            | Main script. Loads all other servers. | [*](./server/server.js) |
| `webapp/`                                     | Root for the entire web application. | [*](./webapp/) |
| `webapp/components/`                          | All the JSX components used by the web app. | [*](./webapp/components/) |
| `webapp/mutations/`                           | Client side GraphQL mutations. | [*](./webapp/mutations/) |
| `webapp/queries/`                             | Common GraphQL queries. | [*](./webapp/queries/) |
| `webapp/queries/ViewerQueries.js`             | Query used for all the Relay containers. | [*](./webapp/queries/ViewerQueries.js) |
| `webapp/scripts/`                             | Scripts used by the client. | [*](./webapp/scripts/) |
| `webapp/styles/`                              | Styles used by the client. | [*](./webapp/styles/) |
| `webapp/styles/main.css`                      | Example style included in the app. Currently not used. | [*](./webapp/styles/main.css) |
| `webapp/styles/RawMUITheme.js`                | Theme for Material-UI. | [*](./webapp/styles/RawMUITheme.js) |
| `webapp/views/`                               | Views served by the express web app. | [*](./webapp/views/) |
| `webapp/views/index.ejs`                      | Template for the HTML served by the isomorphic server rendered. | [*](./webapp/views/index.ejs) |
| `webapp/app.js`                               | Starts the client-side SPA using data generated during server rendering. | [*](./webapp/app.js) |
| `webapp/renderOnServer.js`                    | Performs server-side rendering. | [*](./webapp/renderOnServer.js) |
| `webapp/routes.js`                            | Routes in a data structure consumed both by express router and react router. | [*](./webapp/routes.js) |
| `webapp/server.js`                            | Server for the web app. | [*](./webapp/server.js) |



## Customizing the look and feel

Material-UI provides powerful means for [customizing the colors and the overall look of the application](http://www.material-ui.com/#/customization/themes). The IMRSK uses a custom theme defined in [./webapp/styles/RawMUITheme.js](./webapp/styles/RawMUITheme.js):

``` Javascript
primary1Color: Colors.blue500,
primary2Color: Colors.blue700,
primary3Color: Colors.lightBlack,
accent1Color: Colors.purpleA200,
accent2Color: Colors.blueGrey100,
accent3Color: Colors.blueGrey500,
textColor: Colors.darkBlack,
alternateTextColor: Colors.white,
canvasColor: Colors.white,
borderColor: Colors.grey300,
disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
pickerHeaderColor: Colors.blue500,
```



## Speed and asset version control

This project configured to use compression on all content, and caching on the static content. This delivers spectacular results. The numbers below were obtained using Google Chrome, development tools throttling and cache disabling, on a 2011 series Macbook Pro. The test is performed on the main page. Instance [deployed on Heroku](http://isomorphic-material-relay.herokuapp.com/) was used.

| Network Speed                  | Initial load (no cache) | Subsequent load (cached content) |
| ------------------------------ | ----------------------- | -------------------------------- |
| On Regular 2G (250 kb/s)       | 7.3 sec                 | 1.4 sec                          |
| On Regular 3G (750 kb/s)       | 3.1 sec                 | 1.1 sec                          |

In both cases the UI becomes visible in less than a second. The wait time is to get all the JavaScript loaded in order to continue working as an SPA.

While this is a desirable level of performance, it is important not to forget that caching the static content means caching the SPA code too. The assets generated with webpack are placed into a sub-folder bearing the version of the package as name. Make sure to increase the version number in `package.json` every time you deploy changes to production.

If you add other static content, you might want to revisit how caching of static content is implemented.



## Credits and Sources

This project serves as a starter kit for projects utilizing the following technologies:

* [React JS](https://facebook.github.io/react/)
* [Relay / GrpahQL](https://facebook.github.io/relay/)
* [Isomorphic Relay](https://github.com/denvned/isomorphic-relay)
* [Material-UI](http://www.material-ui.com/)
* [JSON Web Tokens](https://jwt.io/)
* [Apache Cassandra](http://cassandra.apache.org/).

It contains a boilerplate with several simple code examples. It consists of modified versions of the following projects:

* [Facebook Relay Starter Kit TODO example](https://github.com/facebook/relay/tree/master/examples/todo). Implementation of the TODO MVC using Relay. In this kit the TODO example has been re-implemented with material UI.
* [Isomorphic react-router-relay TODO example](https://github.com/denvned/isomorphic-relay-router/tree/master/examples/todo). The Facebook TODO example in this project has been modified to support isomorphism.
* [Xpepermint's isomorphic-react-relay-boilerplate](https://github.com/xpepermint/isomorphic-react-relay-boilerplate). The project organization was initially borrowed from this project, although it has since diverged.
* [coryhouse's react-slingshot](https://github.com/coryhouse/react-slingshot). Ideas about he documentation are borrowed from this project.
* [ryancole's league](https://github.com/ryancole/league). The organization of the GraphQL schema is borrowed from this project.
* [itayadler's cassandra-paginating-static-columns](https://github.com/itayadler/cassandra-paginating-static-columns/blob/master/index.js). The general approach to working with Cassandra was initially borrowed from this project. However, over time the implementation became very different.

Examples from other open source projects have also been incorporated.



## Final word of caution

This project is not guaranteed to be suitable for production deployment. While we strive to make it as good and bug-free as possible, it is up to you to modify it until it is fit for the purposes of your project.
