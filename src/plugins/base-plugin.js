// src/plugins/base-plugin.js

class BasePlugin {
  /**
   * El nombre legible del plugin.
   * @type {string}
   */
  name = 'BasePlugin';

  /**
   * Una descripción breve de lo que hace el plugin.
   * @type {string}
   */
  description = 'Esta es una plantilla de plugin.';

  /**
   * Un array de objetos, donde cada objeto representa un comando.
   * @type {Array<object>}
   */
  commands = [
    /*
    {
      name: 'comando',
      alias: ['cmd'],
      description: 'Descripción del comando.',
      permission: 'USER', // USER, GROUP_ADMIN, OWNER
      isGroupOnly: false,
      cooldown: 5, // en segundos
      async execute(context) {
        // Lógica del comando
      }
    }
    */
  ];

  /**
   * Constructor de la clase.
   * @param {object} [pluginConfig={}] - Configuración específica para este plugin, definida en pluginConfig.js.
   */
  constructor(pluginConfig = {}) {
    this.pluginConfig = pluginConfig;
  }
}

export default BasePlugin;
