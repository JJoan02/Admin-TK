export default handler;
declare function handler(m: any, { conn, args, usedPrefix, command }: {
    conn: any;
    args: any;
    usedPrefix: any;
    command: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
    let register: boolean;
    let group: boolean;
}
//# sourceMappingURL=game-slot.d.ts.map