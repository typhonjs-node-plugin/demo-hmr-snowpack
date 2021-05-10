/**
 * `Plugin2` responds to `Plugin` reloading and shows that you can get notified of other plugin reloads and
 * that you can trigger / retrieve a value of the counter / cntr from Plugin after it is reloaded.
 * This is output as a console log message.
 */
class Plugin2
{
   /**
    * This method is invoked when a plugin is reloaded. It checks the plugin name and if it is `Plugin` it retrieves
    * the current cntr value and prints to console.
    *
    * @param {object}   plugin - Plugin portion of PluginData object.
    */
   printCntr({ plugin })
   {
      // If the plugin name reloaded is 'Plugin' then get the cntr value from it and log to console.
      if (plugin.name === 'Plugin')
      {
         const cntr = this._eventbus.triggerSync('test:plugin:cntr:get');
         console.log(`Plugin2 - printCntr - 'test:plugin:cntr:get' - cntr: ${cntr}`);
      }
   }

   /**
    * On plugin load simply register to receive plugin manager reload events. This is fired when any plugin is
    * reloaded.
    *
    * @param {object}   ev - PluginInvokeEvent.
    */
   onPluginLoad(ev)
   {
      // All you need to add to enabled HMR.
      ev.data.importmeta = import.meta;

      // Store the eventbus so that it can be used in `printCntr`. When a plugin is unloaded this reference is reset
      // automatically.
      this._eventbus = ev.eventbus;

      // Register to receive plugin reload events.
      this._eventbus.on('typhonjs:plugin:manager:plugin:reloaded', this.printCntr, this);
   }
}

export default new Plugin2();
