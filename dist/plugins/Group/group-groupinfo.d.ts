export default handler;
declare function handler(m: any, { conn, participants, groupMetadata }: {
    conn: any;
    participants: any;
    groupMetadata: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
    let group: boolean;
}
//# sourceMappingURL=group-groupinfo.d.ts.map