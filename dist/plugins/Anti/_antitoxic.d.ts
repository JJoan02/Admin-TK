export default AntiToxicPlugin;
declare class AntiToxicPlugin {
    name: string;
    commands: [];
    before(m: WAMessage, { conn, isAdmin, isBotAdmin, isOwner }: {
        conn: Baileys;
        isAdmin: boolean;
        isBotAdmin: boolean;
        isOwner: boolean;
    }): Promise<boolean>;
}
import { WAMessage } from '@whiskeysockets/baileys';
//# sourceMappingURL=_antitoxic.d.ts.map