import { ICommand } from '../../types';
export default class AhorcadoCommand implements ICommand {
    command: string[];
    description: string;
    execute(m: any, { conn }: any): Promise<any>;
    before(m: any, { conn }: any): Promise<void>;
}
//# sourceMappingURL=AhorcadoCommand.d.ts.map