export default handler;
declare function handler(m: any, { conn, participants, groupMetadata }: {
    conn: any;
    participants: any;
    groupMetadata: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let command: RegExp;
    let group: boolean;
}
//# sourceMappingURL=ff-guerra.d.ts.map