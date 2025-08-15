export default AntiViewOncePlugin;
declare class AntiViewOncePlugin {
    name: string;
    commands: [];
    before(m: WAMessage, { conn, isAdmin, isBotAdmin }: {
        conn: Baileys;
        isAdmin: boolean;
        isBotAdmin: boolean;
    }): Promise<any>;
}
import { WAMessage } from '@whiskeysockets/baileys';
//# sourceMappingURL=_antiviewonce.d.ts.map