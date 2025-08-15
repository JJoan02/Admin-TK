import { Baileys, WAMessage } from '@whiskeysockets/baileys';
import { IPluginModule } from '../../types/plugin';
interface ChatData {
    autoRechazar: boolean;
}
interface GlobalDb {
    data: {
        chats: {
            [key: string]: ChatData;
        };
    };
}
declare global {
    var db: GlobalDb;
}
declare class AutoRechazarPlugin implements IPluginModule {
    name: string;
    commands: [];
    before(m: WAMessage, { conn, isAdmin, isBotAdmin }: {
        conn: Baileys;
        isAdmin: boolean;
        isBotAdmin: boolean;
    }): Promise<boolean>;
}
export default AutoRechazarPlugin;
//# sourceMappingURL=_autorechazar.d.ts.map