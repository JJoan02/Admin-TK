declare const handler: {
    (m: any, { command, usedPrefix, text }: {
        command: any;
        usedPrefix: any;
        text: any;
    }): Promise<void>;
    help: string[];
    tags: string[];
    command: string[];
    rowner: boolean;
};
export default handler;
//# sourceMappingURL=tool-eliminarvn.d.ts.map