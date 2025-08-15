export default SetWelcomePlugin;
declare class SetWelcomePlugin {
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
//# sourceMappingURL=setwelcome.d.ts.map