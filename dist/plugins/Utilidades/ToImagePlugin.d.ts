export default ToImagePlugin;
declare class ToImagePlugin extends BasePlugin {
    constructor();
    commands: {
        name: string;
        alias: string[];
        description: string;
        permission: string;
        isGroupOnly: boolean;
        cooldown: number;
        usage: string;
        command: any;
        handler: any;
    }[];
}
import BasePlugin from './base-plugin.js';
//# sourceMappingURL=ToImagePlugin.d.ts.map