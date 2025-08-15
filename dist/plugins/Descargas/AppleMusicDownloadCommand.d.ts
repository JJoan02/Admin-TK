export default AppleMusicDownloadPlugin;
declare class AppleMusicDownloadPlugin {
    static appleMusicSearch(query: string): Promise<any[]>;
    static appleMusicDownload(url: string): Promise<{
        success: boolean;
        name: string;
        albumname: string;
        artist: string;
        thumb: string | undefined;
        duration: string;
        download: any;
        message?: never;
    } | {
        success: boolean;
        message: any;
        name?: never;
        albumname?: never;
        artist?: never;
        thumb?: never;
        duration?: never;
        download?: never;
    }>;
    static getAudio(trackName: string, artist: string, urlMusic: string, token: string): Promise<any>;
    name: string;
    commands: ICommand[];
}
import { ICommand } from '../../types/plugin';
//# sourceMappingURL=AppleMusicDownloadCommand.d.ts.map