export default AppleMusicSearchPlugin;
declare class AppleMusicSearchPlugin {
    static appleMusicSearch(query: string): Promise<any[]>;
    name: string;
    commands: ICommand[];
}
import { ICommand } from '../../types/plugin';
//# sourceMappingURL=AppleMusicSearchCommand.d.ts.map