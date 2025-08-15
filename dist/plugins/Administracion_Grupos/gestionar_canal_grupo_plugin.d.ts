import { ICommand, IPluginModule } from '../../types/plugin';
declare class GestionarCanalGrupoPlugin implements IPluginModule {
    name: string;
    commands: ICommand[];
    static enviarAvisoCanal(conn: any, notifyChat?: string | null): Promise<{
        usuarios: string[];
        grupos: string[];
    }>;
}
export default GestionarCanalGrupoPlugin;
//# sourceMappingURL=gestionar_canal_grupo_plugin.d.ts.map