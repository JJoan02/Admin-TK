export default ChatManagementPlugin;
declare class ChatManagementPlugin extends BasePlugin {
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
        getTargetJid: (message: any, args: any, config: any) => any;
    }[];
}
import BasePlugin from './base-plugin.js';
//# sourceMappingURL=chatManagementPlugin.d.ts.map