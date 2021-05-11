/**
 * The main control plugin when manipulates the DOM and handles interaction with the button & label.
 *
 * Registers an event on 'test:plugin:cntr:get' to trigger `getCntr`. When this plugin is reloaded
 * `Plugin2` listens for the reload event and invokes the `test:plugin:cntr:get` event to retrieve
 * the cntr which is preserved as state across hot reloads.
 *
 * When HMR kicks off and a plugin is reloaded all event bindings are removed and added to the new module loaded
 * in `onPluginLoad`.
 */
class Plugin
{
   /**
    * Return cntr value. Registered to event 'test:plugin:cntr:get'.
    *
    * @returns {number} Value of cntr.
    */
   getCntr() { return this.cntr; }

   /**
    * Increment the cntr and update lobel.
    */
   increment()
   {
      this.cntr++;
      document.getElementById('label').innerHTML = `${this.cntr}`;
   }

   /**
    * Invoked when a plugin is loaded / reloaded.
    *
    * @param {object}   ev - PluginInvokeEvent
    */
   onPluginLoad(ev)
   {
      console.log('Plugin - onPluginLoad');

      // This is all you need for HMR to be enabled.
      ev.data.importmeta = import.meta;

      // Reload any state during HMR or set cntr to an initial state of 0.
      this.cntr = typeof ev.data.state === 'object' ? ev.data.state.cntr : 0;

      // Ensure the `this` context in the increment method and store it so it can be removed.
      this.boundIncrement = () => this.increment();

      // Add the increment event listener to button and set the current counter state to the label.
      document.getElementById('button').addEventListener('click', this.boundIncrement)
      document.getElementById('label').innerHTML = `${this.cntr}`;

      // Register an event on the plugin manager eventbus for Plugin2 to trigger and get the counter.
      ev.eventbus.on('test:plugin:cntr:get', this.getCntr, this, true);
   }

   /**
    * Invoked when a plugin is unloaded / reloaded.
    *
    * Note: If you do register event listeners to the DOM you are fully responsible for unregistering them.
    *
    * However, any event listeners registered to the plugin manager eventbus above in `onPluginLoad` like
    * `test:plugin:cntr:get` are automatically unregistered during HMR.
    *
    * @param {object}   ev - PluginInvokeEvent
    */
   onPluginUnload(ev)
   {
      console.log('Plugin - onPluginUnload');

      // Save state between plugin unload to load during HMR.
      ev.data.state = { cntr: ++this.cntr };

      // Unregister the DOM increment event listener.
      document.getElementById('button').removeEventListener('click', this.boundIncrement)
   }
}

export default new Plugin();
