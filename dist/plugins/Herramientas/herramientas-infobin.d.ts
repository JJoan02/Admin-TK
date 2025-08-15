export default handler;
declare function handler(m: any, { command, args, text, usedPrefix }: {
    command: any;
    args: any;
    text: any;
    usedPrefix: any;
}): Promise<void>;
declare namespace handler {
    let tags: string[];
    let command: RegExp;
}
//# sourceMappingURL=herramientas-infobin.d.ts.map