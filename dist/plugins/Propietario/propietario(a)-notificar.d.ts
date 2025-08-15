export default handler;
declare function handler(m: any, { conn, text, usedPrefix, command, participants, groupMetadata }: {
    conn: any;
    text: any;
    usedPrefix: any;
    command: any;
    participants: any;
    groupMetadata: any;
}): Promise<any>;
declare namespace handler {
    let command: string[];
    let owner: boolean;
}
//# sourceMappingURL=propietario(a)-notificar.d.ts.map