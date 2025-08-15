import { ICommand, IPluginModule } from '../../types/plugin';
declare class SilenciarLocalGrupoPlugin implements IPluginModule {
    name: string;
    private static mutedUsers;
    commands: ICommand[];
    static beforeMessage(m: any, conn: any): Promise<void>;
}
export default SilenciarLocalGrupoPlugin;
//# sourceMappingURL=silenciar_local_grupo_plugin.d.ts.map