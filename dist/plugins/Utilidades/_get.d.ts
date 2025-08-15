export default handler;
declare function handler(m: any, { usedPrefix, command, text }: {
    usedPrefix: any;
    command: any;
    text: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let command: RegExp;
    let rowner: boolean;
}
//# sourceMappingURL=_get.d.ts.map