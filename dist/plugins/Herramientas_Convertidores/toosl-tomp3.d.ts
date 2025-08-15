export default handler;
declare function handler(m: any, { conn, usedPrefix, command }: {
    conn: any;
    usedPrefix: any;
    command: any;
}): Promise<null | undefined>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
    let register: boolean;
}
//# sourceMappingURL=toosl-tomp3.d.ts.map