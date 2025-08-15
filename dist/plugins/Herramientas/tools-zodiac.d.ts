export default handler;
declare function handler(m: any, { usedPrefix, command, text }: {
    usedPrefix: any;
    command: any;
    text: any;
}): any;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let register: boolean;
    let command: RegExp;
}
//# sourceMappingURL=tools-zodiac.d.ts.map