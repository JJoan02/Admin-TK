export default MangaDexSearchPlugin;
declare class MangaDexSearchPlugin {
    static createImageMessage(conn: Baileys, url: string | null): Promise<proto.Message.IImageMessage | null | undefined>;
    name: string;
    commands: ICommand[];
}
import { ICommand } from '../../types/plugin';
import { proto } from '@whiskeysockets/baileys';
//# sourceMappingURL=MangaDexSearchCommand.d.ts.map