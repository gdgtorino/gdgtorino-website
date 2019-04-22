# GDG Torino website

GDG Torino's new PWA

### Prerequisites

This project requires [node.js](https://nodejs.org) and [npm](https://npmjs.org).

### Install

To install the necessary dependencies run:

```bash
$ npm install
```

### Configure

To configure the PWA, make a copy of the example configuration file called `config.json`:

```bash
$ cp config.example.json config.json
```

and replace the values.

### Build

The following command starts typescript compilation in watch mode and the live development server:

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

**Note** that this needs a `managementToken` and a `space` to be set in config.json to work properly.

### License

This project is licensed under the MIT License, see [LICENSE](./LICENSE) file for details. 
