export default handler;
declare function handler(m: any, { conn, text }: {
    conn: any;
    text: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let command: string[];
    let tags: string[];
    let rowner: boolean;
}
//# sourceMappingURL=owner-banuser.d.ts.map