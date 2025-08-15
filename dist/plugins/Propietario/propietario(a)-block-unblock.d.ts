export default handler;
declare function handler(m: any, { text, conn, usedPrefix, command }: {
    text: any;
    conn: any;
    usedPrefix: any;
    command: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let owner: boolean;
}
//# sourceMappingURL=propietario(a)-block-unblock.d.ts.map