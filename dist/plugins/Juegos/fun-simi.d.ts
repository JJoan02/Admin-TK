export default handler;
declare function handler(m: any, { text, command, args, usedPrefix }: {
    text: any;
    command: any;
    args: any;
    usedPrefix: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
}
//# sourceMappingURL=fun-simi.d.ts.map