export default YoutubeAudioPlugin;
declare class YoutubeAudioPlugin {
    name: string;
    commands: ICommand[];
    all(m: WAMessage, { conn, isPrems, isOwner }: {
        conn: Baileys;
        isPrems: boolean;
        isOwner: boolean;
    }): Promise<boolean>;
}
import { ICommand } from '../../types/plugin';
import { WAMessage } from '@whiskeysockets/baileys';
//# sourceMappingURL=_youtube-audio.d.ts.map