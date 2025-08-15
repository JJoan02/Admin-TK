export default handler;
declare function handler(m: any, { conn, usedPrefix, command, args }: {
    conn: any;
    usedPrefix: any;
    command: any;
    args: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
    let disabled: boolean;
}
//# sourceMappingURL=econ-buy.d.ts.map