export default handler;
declare function handler(m: any, { conn, isOwner }: {
    conn: any;
    isOwner: any;
}): Promise<void>;
declare namespace handler {
    let command: string[];
    let rowner: boolean;
}
//# sourceMappingURL=owner-banlist.d.ts.map