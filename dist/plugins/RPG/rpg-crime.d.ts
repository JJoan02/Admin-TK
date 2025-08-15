export default handler;
declare function handler(m: any, { conn, usedPrefix, command, groupMetadata, participants, isPrems }: {
    conn: any;
    usedPrefix: any;
    command: any;
    groupMetadata: any;
    participants: any;
    isPrems: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let register: boolean;
    let group: boolean;
}
//# sourceMappingURL=rpg-crime.d.ts.map