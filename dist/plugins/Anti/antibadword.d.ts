export default AntiBadwordPlugin;
declare class AntiBadwordPlugin {
    name: string;
    commands: ICommand[];
    before(m: WAMessage, { conn, isGroup, isAdmin, isBotAdmin }: {
        conn: Baileys;
        isGroup: boolean;
        isAdmin: boolean;
        isBotAdmin: boolean;
    }): Promise<boolean>;
}
import { ICommand } from '../../types/plugin';
import { WAMessage } from '@whiskeysockets/baileys';
//# sourceMappingURL=antibadword.d.ts.map