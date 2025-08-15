export default AntiPrivPlugin;
declare class AntiPrivPlugin {
    name: string;
    commands: [];
    before(m: WAMessage, { conn, isOwner }: {
        conn: Baileys;
        isOwner: boolean;
    }): Promise<boolean>;
}
import { WAMessage } from '@whiskeysockets/baileys';
//# sourceMappingURL=_anti-priv.d.ts.map