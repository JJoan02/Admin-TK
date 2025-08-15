export default handler;
declare function handler(m: any, { command, usedPrefix, text }: {
    command: any;
    usedPrefix: any;
    text: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
    let rowner: boolean;
}
//# sourceMappingURL=owner-delmsg.d.ts.map