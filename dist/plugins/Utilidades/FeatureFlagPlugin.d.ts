export default FeatureFlagPlugin;
declare class FeatureFlagPlugin extends BasePlugin {
    constructor();
    commands: ({
        name: string;
        alias: string[];
        description: string;
        permission: string;
        isGroupOnly: boolean;
        cooldown: number;
        minArgs: number;
        usage: string;
        command: any;
        handler: any;
    } | {
        name: string;
        alias: string[];
        description: string;
        permission: string;
        isGroupOnly: boolean;
        cooldown: number;
        command: any;
        handler: any;
        minArgs?: never;
        usage?: never;
    })[];
}
import BasePlugin from './base-plugin.js';
//# sourceMappingURL=FeatureFlagPlugin.d.ts.map