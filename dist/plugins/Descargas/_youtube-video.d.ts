export default YoutubeVideoPlugin;
declare class YoutubeVideoPlugin {
    name: string;
    commands: ICommand[];
    all(m: WAMessage, { conn, isPrems, isOwner }: {
        conn: Baileys;
        isPrems: boolean;
        isOwner: boolean;
    }): Promise<any>;
}
import { ICommand } from '../../types/plugin';
import { WAMessage } from '@whiskeysockets/baileys';
//# sourceMappingURL=_youtube-video.d.ts.map