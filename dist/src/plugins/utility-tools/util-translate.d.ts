declare const handler: {
    (m: any, { args, usedPrefix, command }: {
        args: any;
        usedPrefix: any;
        command: any;
    }): Promise<any>;
    help: string[];
    tags: string[];
    command: string[];
    register: boolean;
};
export default handler;
//# sourceMappingURL=util-translate.d.ts.map