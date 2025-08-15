export default handler;
declare function handler(m: any, { text, conn, usedPrefix, command }: {
    text: any;
    conn: any;
    usedPrefix: any;
    command: any;
}): Promise<void>;
declare namespace handler {
    let command: string[];
    let rowner: boolean;
}
//# sourceMappingURL=owner-block-unblock.d.ts.map