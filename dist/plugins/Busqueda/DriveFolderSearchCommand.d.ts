export default DriveFolderSearchPlugin;
declare class DriveFolderSearchPlugin {
    static getData(folderUrl: string): Promise<string[]>;
    static eliminarDuplicados(lista: string[]): string[];
    name: string;
    commands: ICommand[];
}
import { ICommand } from '../../types/plugin';
//# sourceMappingURL=DriveFolderSearchCommand.d.ts.map