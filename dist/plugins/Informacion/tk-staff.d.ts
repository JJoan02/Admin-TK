export default handler;
declare function handler(m: any, { conn, participants, groupMetadata, args }: {
    conn: any;
    participants: any;
    groupMetadata: any;
    args: any;
}): Promise<any>;
declare namespace handler {
    let command: RegExp;
    let tags: string[];
    let help: string[];
    let group: boolean;
}
//# sourceMappingURL=tk-staff.d.ts.map