import { ICommand } from '../../types';
export default class AcertijoCommand implements ICommand {
    command: string[];
    description: string;
    execute(m: any, { conn }: any): Promise<void>;
    before(m: any, { conn }: any): Promise<void>;
}
//# sourceMappingURL=AcertijoCommand.d.ts.map