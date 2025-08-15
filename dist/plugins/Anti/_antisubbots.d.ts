export default AntiSubBotsPlugin;
declare class AntiSubBotsPlugin {
    name: string;
    commands: [];
    before(m: WAMessage, { conn, participants }: {
        conn: Baileys;
        participants: GroupParticipant[];
    }): Promise<boolean>;
}
import { WAMessage } from '@whiskeysockets/baileys';
import { GroupParticipant } from '@whiskeysockets/baileys';
//# sourceMappingURL=_antisubbots.d.ts.map