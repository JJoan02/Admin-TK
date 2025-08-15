export default AfkBeforePlugin;
declare class AfkBeforePlugin {
    name: string;
    commands: [];
    before(m: WAMessage): Promise<boolean>;
}
import { WAMessage } from '@whiskeysockets/baileys';
//# sourceMappingURL=_afk.d.ts.map