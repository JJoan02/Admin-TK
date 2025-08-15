export default AntiLinkAllPlugin;
declare class AntiLinkAllPlugin {
    name: string;
    commands: [];
    before(m: WAMessage, { conn, isAdmin, isBotAdmin }: {
        conn: Baileys;
        isAdmin: boolean;
        isBotAdmin: boolean;
    }): Promise<boolean>;
}
import { WAMessage } from '@whiskeysockets/baileys';
//# sourceMappingURL=_antilinkall.d.ts.map