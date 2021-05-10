# @typhonjs-plugin/demo-hmr-snowpack

This is a basic demo of using [@typhonjs-plugin/manager](https://github.com/typhonjs-node-plugin/manager) via Snowpack 
with HMR (hot module replacement).

This demo was created with `@snowpack/app-template-blank` which has a confetti explosion display during initial load / 
when page is refreshed. In addition, the TyphonJS plugin manager and three basic local plugins demonstrate how easy it 
is to hook up HMR and event bindings for messaging between plugins in addition to saving state during HMR.

Open up the dev console to see various console.log statements; or add your own as well!

There is an added button `Increment Counter` which increments counter via an HTML label everytime it is pressed. The 
counter will also be incremented everytime `Plugin.js` is modified / saved and HMR occurs. All control of the DOM 
and counter are in `./src/Plugin.js`. There is also an event binding on `test:plugin:cntr:get` which returns the `cntr`
variable value. `Plugin.js` show how to keep state between HMR cycles implementing both `onPluginLoad` and 
`onPluginUnload` which are two methods that `@typhonjs-plugin/manager` invokes when plugins load / unload / reload.

`./src/Plugin2.js` registers on the `typhonjs:plugin:manager:plugin:reloaded` event which is passed a PluginData object
describing which plugin reloaded. If the name of the reloaded plugin is `Plugin` it will trigger the 
`test:plugin:cntr:get` event from `Plugin.js` and retrieve the counter value and log it to the console.

`./src/PluginSimple.js` shows how simple it is to hook up automatic HMR with `@typhonjs-plugin/manager` with a bare
bones example.

-----

First run `npm install`.

## Available Scripts

### npm start

Runs the app in the development mode.
Open http://localhost:8080 to view it in the browser.

### npm run build

Builds a static copy of your site to the `build/` folder.
Your app is ready to be deployed!
