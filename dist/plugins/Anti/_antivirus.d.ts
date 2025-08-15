export default AntiVirusPlugin;
declare class AntiVirusPlugin {
    name: string;
    commands: [];
    all(m: WAMessage, { conn, isBotAdmin }: {
        conn: Baileys;
        isBotAdmin: boolean;
    }): Promise<boolean>;
}
import { WAMessage } from '@whiskeysockets/baileys';
//# sourceMappingURL=_antivirus.d.ts.map