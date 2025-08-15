import { IPluginModule } from '../../types/plugin';
import { WAMessage, Baileys, GroupParticipant } from '@whiskeysockets/baileys';
interface ChatData {
    bye: boolean;
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
declare class ByePlugin implements IPluginModule {
    name: string;
    commands: [];
    groupParticipantsUpdate(m: WAMessage, { conn, participants, isAdmin }: {
        conn: Baileys;
        participants: GroupParticipant[];
        isAdmin: boolean;
    }): Promise<void>;
}
export default ByePlugin;
//# sourceMappingURL=bye.d.ts.map