export default AntiLinkXXXPlugin;
declare class AntiLinkXXXPlugin {
    name: string;
    commands: [];
    before(m: WAMessage, { conn, isAdmin, isBotAdmin, isOwner, isROwner }: {
        conn: Baileys;
        isAdmin: boolean;
        isBotAdmin: boolean;
        isOwner: boolean;
        isROwner: boolean;
    }): Promise<any>;
}
import { WAMessage } from '@whiskeysockets/baileys';
//# sourceMappingURL=antilinkxxx.d.ts.map