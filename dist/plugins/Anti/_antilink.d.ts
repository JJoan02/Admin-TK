export default AntiLinkPlugin;
declare class AntiLinkPlugin {
    name: string;
    commands: [];
    before(m: WAMessage, { conn, isAdmin, isBotAdmin, isOwner, isROwner, participants }: {
        conn: Baileys;
        isAdmin: boolean;
        isBotAdmin: boolean;
        isOwner: boolean;
        isROwner: boolean;
        participants: any[];
    }): Promise<any>;
}
import { WAMessage } from '@whiskeysockets/baileys';
//# sourceMappingURL=_antilink.d.ts.map