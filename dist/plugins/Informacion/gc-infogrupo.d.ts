export default handler;
declare function handler(m: any, { conn, participants, groupMetadata }: {
    conn: any;
    participants: any;
    groupMetadata: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
    let register: boolean;
    let group: boolean;
}
//# sourceMappingURL=gc-infogrupo.d.ts.map