export default ApkpureDownloadPlugin;
declare class ApkpureDownloadPlugin {
    static searchApk(text: string): Promise<any>;
    static downloadApk(id: string): Promise<any>;
    name: string;
    commands: ICommand[];
}
import { ICommand } from '../../types/plugin';
//# sourceMappingURL=ApkpureDownloadCommand.d.ts.map