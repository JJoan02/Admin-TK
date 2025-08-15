import { ICommand } from '../../types';
export default class WallpaperCommand implements ICommand {
    command: string[];
    description: string;
    execute(m: any, { conn, text }: any): Promise<any>;
}
//# sourceMappingURL=WallpaperCommand.d.ts.map