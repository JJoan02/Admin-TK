import { Baileys, WAMessage } from '@whiskeysockets/baileys';
import { IPluginModule } from '../../types/plugin';
interface ChatData {
    modoadmin: boolean;
}
interface GlobalDb {
    data: {
        chats: {
            [key: string]: ChatData;
        };
        settings: {
            [key: string]: any;
        };
    };
}
declare global {
    var db: GlobalDb;
    var prefix: string;
}
declare class ModoAdminPlugin implements IPluginModule {
    name: string;
    commands: [];
    before(m: WAMessage, { conn, isAdmin, isBotAdmin, isOwner, isROwner, isPrems }: {
        conn: Baileys;
        isAdmin: boolean;
        isBotAdmin: boolean;
        isOwner: boolean;
        isROwner: boolean;
        isPrems: boolean;
    }): Promise<boolean>;
}
export default ModoAdminPlugin;
//# sourceMappingURL=_modoAdmin.d.ts.map