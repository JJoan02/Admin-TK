export default AntiBotPlugin;
declare class AntiBotPlugin {
    name: string;
    commands: [];
    before(m: WAMessage, { conn, isAdmin, isBotAdmin }: {
        conn: Baileys;
        isAdmin: boolean;
        isBotAdmin: boolean;
    }): Promise<boolean>;
}
import { WAMessage } from '@whiskeysockets/baileys';
//# sourceMappingURL=_antibot.d.ts.map