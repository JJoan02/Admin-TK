export default handler;
declare function handler(m: any, { conn, participants }: {
    conn: any;
    participants: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let admin: boolean;
    let group: boolean;
}
//# sourceMappingURL=group-totag.d.ts.map