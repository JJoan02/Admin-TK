export default KickPlugin;
declare class KickPlugin extends BasePlugin {
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
//# sourceMappingURL=KickPlugin.d.ts.map