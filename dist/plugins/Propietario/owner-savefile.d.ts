export default handler;
declare function handler(m: any, { text, usedPrefix, command }: {
    text: any;
    usedPrefix: any;
    command: any;
}): Promise<any>;
declare namespace handler {
    let command: string[];
    let tags: string[];
    let help: string[];
    let rowner: boolean;
}
//# sourceMappingURL=owner-savefile.d.ts.map