export default AnimeFLVSearchPlugin;
declare class AnimeFLVSearchPlugin {
    static createImageMessage(conn: Baileys, url: string): Promise<proto.Message.IImageMessage | null | undefined>;
    name: string;
    commands: ICommand[];
}
import { ICommand } from '../../types/plugin';
import { proto } from '@whiskeysockets/baileys';
//# sourceMappingURL=AnimeFLVSearchCommand.d.ts.map