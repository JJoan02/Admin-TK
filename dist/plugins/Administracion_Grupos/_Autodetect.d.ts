import { WAMessage, Baileys, GroupMetadata } from '@whiskeysockets/baileys';
import { IPluginModule } from '../../types/plugin';
interface ChatData {
    detect: boolean;
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
declare class AutodetectPlugin implements IPluginModule {
    name: string;
    commands: [];
    before(m: WAMessage, { conn, participants, groupMetadata }: {
        conn: Baileys;
        participants: any[];
        groupMetadata: GroupMetadata;
    }): Promise<boolean>;
}
export default AutodetectPlugin;
//# sourceMappingURL=_Autodetect.d.ts.map