import { ICommand, IPluginModule } from '../../types/plugin';
declare class AnimeDownloadPlugin implements IPluginModule {
    name: string;
    commands: ICommand[];
    before(m: any, { conn }: any): Promise<any>;
}
export default AnimeDownloadPlugin;
//# sourceMappingURL=dl-anime.d.ts.map