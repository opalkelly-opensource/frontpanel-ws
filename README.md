FrontPanel Web API
==============================

The Javascript implementation of the client API to FrontPanel over IP (FPoIP)
server.

See https://docs.opalkelly.com/fpsdk/frontpanel-over-ip/fpoip-webapi/.

Prerequisites
-------

This is the client API package. You should be able to connect to a FPoIP server
running somewhere to use this package.

Installation
-------

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install frontpanel-ws
```

Web Build
-------

Single file version of the package can be used directly from the HTML page
without any bundler and even without Node.js.

Copy file `dist/frontpanel-ws.js` to your project to use in the HTML page.
Note that this file doesn't contain `FrontPanelWebAppBase` class.

`browser-sync` can be used as a test local server.

Install `browser-sync` (globally, as it's not a required dependency):
```
npm install -g browser-sync
```

Run the local server:
```
browser-sync start --server
```

More command line options: https://www.browsersync.io/docs/command-line#start

Docs
-------

Overview: https://docs.opalkelly.com/fpsdk/frontpanel-over-ip/fpoip-webapi/

API Reference: https://library.opalkelly.com/library/FrontPanelWebAPI/index.html
