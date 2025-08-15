export default handler;
declare function handler(m: any, { conn, args, usedPrefix, command }: {
    conn: any;
    args: any;
    usedPrefix: any;
    command: any;
}): Promise<void>;
declare namespace handler {
    let tags: string[];
    let help: string[];
    let command: RegExp;
    let group: boolean;
}
//# sourceMappingURL=fun-reacciones.d.ts.map