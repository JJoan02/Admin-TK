export default handler;
declare function handler(m: any, { usedPrefix, command, text }: {
    usedPrefix: any;
    command: any;
    text: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let rowner: boolean;
}
//# sourceMappingURL=propietario(a)-getplugin.d.ts.map