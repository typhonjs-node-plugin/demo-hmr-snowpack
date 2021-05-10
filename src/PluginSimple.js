/**
 * Add a console log statement!
 */
class PluginSimple
{
   onPluginLoad(ev)
   {
      // This is all you need for HMR to be enabled w/ hot module replacement.
      ev.data.importmeta = import.meta;
   }
}

export default new PluginSimple();
