/**
 * A bare module can be a plugin w/ named exports for onPluginLoad / onPluginUnload.
 */
export function onPluginLoad(ev)
{
   // This is all you need for HMR to be enabled.
   ev.data.importmeta = import.meta;
}

export function onPluginUnload(ev)
{
   console.log('PluginModule - onPluginUnload');
}
