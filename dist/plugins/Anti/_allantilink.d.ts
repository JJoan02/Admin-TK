export default AllAntiLinkPlugin;
declare class AllAntiLinkPlugin {
    name: string;
    commands: [];
    before(m: WAMessage, { conn, isAdmin, isBotAdmin, isOwner, isROwner }: {
        conn: Baileys;
        isAdmin: boolean;
        isBotAdmin: boolean;
        isOwner: boolean;
        isROwner: boolean;
    }): Promise<boolean>;
}
import { WAMessage } from '@whiskeysockets/baileys';
//# sourceMappingURL=_allantilink.d.ts.map