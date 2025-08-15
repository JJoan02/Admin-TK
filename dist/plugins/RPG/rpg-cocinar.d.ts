export default handler;
declare function handler(m: any, { command, usedPrefix, DevMode, args, conn }: {
    command: any;
    usedPrefix: any;
    DevMode: any;
    args: any;
    conn: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
}
//# sourceMappingURL=rpg-cocinar.d.ts.map