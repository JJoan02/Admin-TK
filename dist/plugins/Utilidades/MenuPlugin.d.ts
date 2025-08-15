export default MenuPlugin;
declare class MenuPlugin {
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
//# sourceMappingURL=MenuPlugin.d.ts.map