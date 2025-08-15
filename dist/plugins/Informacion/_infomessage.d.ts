export default handler;
declare function handler(m: any): any;
declare namespace handler {
    function before(m: any, { conn, isAdmin, isOwner, isROwner, isBotAdmin, participants, groupMetadata }: {
        conn: any;
        isAdmin: any;
        isOwner: any;
        isROwner: any;
        isBotAdmin: any;
        participants: any;
        groupMetadata: any;
    }): Promise<void>;
}
//# sourceMappingURL=_infomessage.d.ts.map