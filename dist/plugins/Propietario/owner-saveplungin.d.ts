export default handler;
declare function handler(m: any, { text, usedPrefix, command }: {
    text: any;
    usedPrefix: any;
    command: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
    let owner: boolean;
}
//# sourceMappingURL=owner-saveplungin.d.ts.map