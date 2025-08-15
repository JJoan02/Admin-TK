export default handler;
declare function handler(m: any, { conn, participants, groupMetadata, args, text }: {
    conn: any;
    participants: any;
    groupMetadata: any;
    args: any;
    text: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let group: boolean;
}
//# sourceMappingURL=freeffire4vs4.d.ts.map