export default handler;
declare function handler(m: any, { conn, groupMetadata, participants, command, text, usedPrefix, sender }: {
    conn: any;
    groupMetadata: any;
    participants: any;
    command: any;
    text: any;
    usedPrefix: any;
    sender: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let exp: number;
    let group: boolean;
    let register: boolean;
}
//# sourceMappingURL=fun-juegos.d.ts.map