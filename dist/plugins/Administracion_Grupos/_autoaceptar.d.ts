import { Baileys, WAMessage } from '@whiskeysockets/baileys';
import { IPluginModule } from '../../types/plugin';
interface ChatData {
    autoAceptar: boolean;
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
declare class AutoAceptarPlugin implements IPluginModule {
    name: string;
    commands: [];
    before(m: WAMessage, { conn, isAdmin, isBotAdmin }: {
        conn: Baileys;
        isAdmin: boolean;
        isBotAdmin: boolean;
    }): Promise<boolean>;
}
export default AutoAceptarPlugin;
//# sourceMappingURL=_autoaceptar.d.ts.map