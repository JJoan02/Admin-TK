export default handler;
declare function handler(m: any, { conn, command, text }: {
    conn: any;
    command: any;
    text: any;
}): Promise<any>;
declare namespace handler {
    let tags: string[];
    let command: string[];
    let help: string[];
    let rowner: boolean;
}
//# sourceMappingURL=owner-reunion.d.ts.map