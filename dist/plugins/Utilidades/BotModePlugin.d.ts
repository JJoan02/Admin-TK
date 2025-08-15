export default BotModePlugin;
declare class BotModePlugin extends BasePlugin {
    constructor();
    commands: {
        name: string;
        alias: string[];
        description: string;
        isGroupOnly: boolean;
        cooldown: number;
        minArgs: number;
        usage: string;
        command: any;
        handler: any;
    }[];
}
import BasePlugin from './base-plugin.js';
//# sourceMappingURL=BotModePlugin.d.ts.map