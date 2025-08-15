import { ICommand, IPluginModule } from '../../types/plugin';
import { WAMessage, Baileys } from '@whiskeysockets/baileys';
declare class BotAudiosPlugin implements IPluginModule {
    name: string;
    commands: ICommand[];
    all(m: WAMessage, { conn }: {
        conn: Baileys;
    }): Promise<boolean>;
}
export default BotAudiosPlugin;
//# sourceMappingURL=BotAudiosCommand.d.ts.map