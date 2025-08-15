export default handler;
declare function handler(m: any, { text, usedPrefix, command }: {
    text: any;
    usedPrefix: any;
    command: any;
}): Promise<any>;
declare namespace handler {
    let command: string[];
    let help: string[];
    let tags: string[];
    let register: boolean;
}
//# sourceMappingURL=ai-bard.d.ts.map