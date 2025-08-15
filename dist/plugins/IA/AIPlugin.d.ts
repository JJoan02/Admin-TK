export default AIPlugin;
declare class AIPlugin {
    name: string;
    description: string;
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
//# sourceMappingURL=AIPlugin.d.ts.map