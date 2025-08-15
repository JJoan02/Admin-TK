class BasePlugin {
    name = 'BasePlugin';
    description = 'Esta es una plantilla de plugin.';
    commands = [];
    constructor(pluginConfig = {}) {
        this.pluginConfig = pluginConfig;
    }
}
export default BasePlugin;
//# sourceMappingURL=base-plugin.js.map