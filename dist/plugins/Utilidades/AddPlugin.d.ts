export default AddPlugin;
declare class AddPlugin extends BasePlugin {
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
//# sourceMappingURL=AddPlugin.d.ts.map