import { ICommand, IPluginModule } from '../../types/plugin';
interface ChatData {
    welcome: boolean;
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
declare class AdminSimulatePlugin implements IPluginModule {
    name: string;
    commands: ICommand[];
}
export default AdminSimulatePlugin;
//# sourceMappingURL=admin-simulate.d.ts.map