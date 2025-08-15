export default handler;
declare function handler(m: any, { conn, text, participants }: {
    conn: any;
    text: any;
    participants: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let rowner: boolean;
    let group: boolean;
}
//# sourceMappingURL=owner-otag.d.ts.map