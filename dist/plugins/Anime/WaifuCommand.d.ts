import { ICommand } from '../../types';
export default class WaifuCommand implements ICommand {
    command: string[];
    description: string;
    execute(m: any, { conn }: any): Promise<any>;
}
//# sourceMappingURL=WaifuCommand.d.ts.map