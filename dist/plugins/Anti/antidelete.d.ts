export default AntiDeletePlugin;
declare class AntiDeletePlugin {
    name: string;
    commands: ICommand[];
    all(m: WAMessage, { conn }: {
        conn: Baileys;
    }): Promise<boolean>;
    handleMessageRevocation(sock: Baileys, revocationMessage: WAMessage): Promise<void>;
}
import { ICommand } from '../../types/plugin';
import { WAMessage } from '@whiskeysockets/baileys';
//# sourceMappingURL=antidelete.d.ts.map