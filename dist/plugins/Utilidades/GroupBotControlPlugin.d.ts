export default GroupBotControlPlugin;
declare class GroupBotControlPlugin {
    name: string;
    description: string;
    commands: {
        name: string;
        alias: string[];
        description: string;
        permission: string;
        isGroupOnly: boolean;
        cooldown: number;
        command: any;
        handler: any;
    }[];
}
//# sourceMappingURL=GroupBotControlPlugin.d.ts.map