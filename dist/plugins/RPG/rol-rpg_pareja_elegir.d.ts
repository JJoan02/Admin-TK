export default handler;
declare function handler(m: any, { conn, usedPrefix, command, text, participants, groupMetadata }: {
    conn: any;
    usedPrefix: any;
    command: any;
    text: any;
    participants: any;
    groupMetadata: any;
}): Promise<any>;
declare namespace handler {
    let command: RegExp;
    let group: boolean;
}
//# sourceMappingURL=rol-rpg_pareja_elegir.d.ts.map