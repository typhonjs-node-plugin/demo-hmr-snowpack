/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 *
 * This is the basic confetti example with an added button / cntr label for reload count and three
 * TyphonJS plugin manager enabled plugins w/ HMR.
 *
 * The confetti kicks off when the page fully reloads.
 */

import confetti       from 'canvas-confetti';

import PluginManager  from '@typhonjs-plugin/manager';

const pluginManager = new PluginManager();

const hostname = window.location.hostname;
const port = window.location.port;

// Load the plugins by target from absolute paths. During Snowpack runtime `./src` becomes `./dist`. Relative paths
// from the source code location will be supported soon for browser usage by @typhonjs-plugin/manager.
pluginManager.add({ name: 'Plugin', target: '/dist/Plugin.js' });
pluginManager.add({ name: 'Plugin2', target: '/dist/Plugin2.js' });

// Shows how to load from URL from the hostname / port defined above.
pluginManager.add({ name: 'PluginSimple', target: new URL(`http://${hostname}:${port}/dist/PluginSimple.js`) });

// Confetti launching from original base demo.
confetti.create(document.getElementById('canvas'), {
  resize: true,
  useWorker: true,
})({ particleCount: 200, spread: 200 });
