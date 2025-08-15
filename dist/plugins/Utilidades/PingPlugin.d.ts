export default PingPlugin;
declare class PingPlugin {
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
//# sourceMappingURL=PingPlugin.d.ts.map