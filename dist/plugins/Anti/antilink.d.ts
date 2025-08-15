export default AntilinkPlugin;
declare class AntilinkPlugin {
    name: string;
    commands: [];
    before(m: WAMessage, { conn, isAdmin, isOwner, isROwner }: {
        conn: Baileys;
        isAdmin: boolean;
        isOwner: boolean;
        isROwner: boolean;
    }): Promise<boolean>;
}
import { WAMessage } from '@whiskeysockets/baileys';
//# sourceMappingURL=antilink.d.ts.map