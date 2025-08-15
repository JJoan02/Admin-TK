export default handler;
declare function handler(m: any, { conn, text, isROwner, isOwner }: {
    conn: any;
    text: any;
    isROwner: any;
    isOwner: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
    let botAdmin: boolean;
    let admin: boolean;
    let group: boolean;
}
//# sourceMappingURL=group-setwelcome.d.ts.map