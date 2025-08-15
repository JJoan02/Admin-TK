export default handler;
declare function handler(m: any, { args, usedPrefix, command }: {
    args: any;
    usedPrefix: any;
    command: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
}
//# sourceMappingURL=descargas-tiktok.d.ts.map