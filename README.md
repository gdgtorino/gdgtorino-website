<img alt="GDG Torino logos &amp; wordmark" src="assets/images/complete-logo+wordmark.png" height="200">

# GDG Torino website

GDG Torino's PWA built with Polymer, Rollup & Workbox.

### Prerequisites

This project requires [node.js](https://nodejs.org) and [npm](https://npmjs.org).

### Install

To install the necessary dependencies run:

```bash
$ npm install
```

### Configure

To build and launch the app locally, create a `.env` file in the project root and provide
the following variables:

```dotenv
CONTENTFUL_SPACE_ID=...
CONTENTFUL_ACCESS_TOKEN=...
CONTENTFUL_MANAGEMENT_TOKEN=...
EVENTBRITE_ORG_ID=...
EVENTBRITE_TOKEN=...
```

### Build

The following command starts Rollup compilation in watch mode and the live development server:

```bash
$ npm run start
```

to build for production run:

```bash
$ npm run build:prod
```

### Build Contentful types

TypeScript interfaces corresponding to Content Types on Contentful can be built (or updated after changes in the CMS)
using the following command:

```bash
$ npm run build:ctypes
```

**Note** that this needs the `CONTENTFUL_MANAGEMENT_TOKEN` and `CONTENTFUL_SPACE_ID` variables to be set
 to be set in `.env` to work properly.
 
### Service worker

A service worker is automatically created at build time using
[workbox](https://developers.google.com/web/tools/workbox/). To configure the SW edit `workbox.config.js`.
 
### Continuous Deployment

This project is already set up with Travis CI to deploy the master branch on Firebase Hosting. Follow these steps to
enable CD:

##### Connect Travis to the repo

Make sure to connect Travis to your website repo.
See https://docs.travis-ci.com/user/tutorial/#to-get-started-with-travis-ci

##### Choose a project

In `.travis.yml`, in `deploy > project` provide the id of the Firebase project you want to deploy to. 

##### Install Firebase Tools

If you dont' already have it, install the Firebase cli by running:

```bash
$ npm i -g firebase-tools
```

##### Obtain a Firebase CI Token

To obtain a Firebase CI token run:

```bash
$ firebase login:ci
```

copy the token.

##### Create the env variables in Travis

Go to https://travis-ci.org/, select the website repository and go to More options > Settings.

Under "Environment variables" create the same variables as in the `.env` file (see [configure](#configure)).
Also paste the Firebase token in a variable called `FIREBASE_TOKEN`.

##### Trigger a build

Now every time a pull request is merged to master a deploy is triggered. To configure this behavior edit `.travis.yml`
(see [Firebase Deployment on Travis CI docs](https://docs.travis-ci.com/user/deployment/firebase/)).

### License

This project is licensed under the MIT License, see [LICENSE](./LICENSE) file for details. 
