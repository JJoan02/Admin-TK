export default handler;
declare function handler(m: any, { conn, command, text }: {
    conn: any;
    command: any;
    text: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
    let rowner: boolean;
}
//# sourceMappingURL=owner-del-add.d.ts.map