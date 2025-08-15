export default AntiFakesPlugin;
declare class AntiFakesPlugin {
    name: string;
    commands: [];
    before(m: WAMessage, { conn, isAdmin, isBotAdmin }: {
        conn: Baileys;
        isAdmin: boolean;
        isBotAdmin: boolean;
    }): Promise<boolean>;
}
import { WAMessage } from '@whiskeysockets/baileys';
//# sourceMappingURL=_antifakes.d.ts.map