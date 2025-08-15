export default handler;
declare function handler(m: any, { isOwner, isAdmin, conn, text, participants, args, command }: {
    isOwner: any;
    isAdmin: any;
    conn: any;
    text: any;
    participants: any;
    args: any;
    command: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let group: boolean;
}
//# sourceMappingURL=rpg-pedir_ayuda.d.ts.map