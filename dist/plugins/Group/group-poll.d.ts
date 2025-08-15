export default handler;
declare function handler(m: any, { conn, text, usedPrefix, command, participants }: {
    conn: any;
    text: any;
    usedPrefix: any;
    command: any;
    participants: any;
}): Promise<any>;
declare namespace handler {
    let tags: string[];
    let help: string[];
    let command: string[];
    let group: boolean;
    let register: boolean;
}
//# sourceMappingURL=group-poll.d.ts.map