export default handler;
declare function handler(m: any, { conn, participants, groupMetadata, args }: {
    conn: any;
    participants: any;
    groupMetadata: any;
    args: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
    let group: boolean;
}
//# sourceMappingURL=admin-staff.d.ts.map