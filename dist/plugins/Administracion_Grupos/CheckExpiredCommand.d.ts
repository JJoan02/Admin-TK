import { ICommand, IPluginModule } from '../../types/plugin';
interface ChatData {
    expired: number;
}
interface GlobalDb {
    data: {
        chats: {
            [key: string]: ChatData;
        };
    };
}
declare global {
    var db: GlobalDb;
}
declare class CheckExpiredPlugin implements IPluginModule {
    name: string;
    commands: ICommand[];
}
export default CheckExpiredPlugin;
//# sourceMappingURL=CheckExpiredCommand.d.ts.map