import { ICommand } from '../../types';
export default class AdivinarCommand implements ICommand {
    command: string[];
    description: string;
    execute(m: any, { conn, command }: any): Promise<any>;
    before(m: any, { conn }: any): Promise<void>;
}
//# sourceMappingURL=AdivinarCommand.d.ts.map