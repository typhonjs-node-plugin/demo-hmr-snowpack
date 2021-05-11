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

// Load the plugins by target from absolute paths. During Snowpack runtime `./src` becomes `./dist`.
pluginManager.add({ name: 'Plugin', target: '/dist/Plugin.js' });

// To load a relative path you need to construct an URL w/ import.meta.url
pluginManager.add({ name: 'Plugin2', target: new URL('Plugin2.js', import.meta.url) });


// The following plugins are empty implementations showing the bare minimum requirements for a default instantiated
// class and bare module.

// Shows how to load from URL from the hostname / port defined above.
pluginManager.add({ name: 'PluginSimple', target: new URL('PluginSimple.js', import.meta.url) });

// Shows how to load from URL from the hostname / port defined above.
pluginManager.add({ name: 'PluginModule', target: new URL('PluginModule.js', import.meta.url) });

// Confetti launching from original base demo.
confetti.create(document.getElementById('canvas'), {
  resize: true,
  useWorker: true,
})({ particleCount: 200, spread: 200 });
