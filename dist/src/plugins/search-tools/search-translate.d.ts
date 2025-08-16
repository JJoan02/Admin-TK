declare const handler: {
    (m: any, { args, usedPrefix, command }: {
        args: any;
        usedPrefix: any;
        command: any;
    }): Promise<any>;
    command: string[];
    group: boolean;
    register: boolean;
};
export default handler;
//# sourceMappingURL=search-translate.d.ts.map