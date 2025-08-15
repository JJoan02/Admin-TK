export default AntiArabPlugin;
declare class AntiArabPlugin {
    name: string;
    commands: [];
    before(m: WAMessage, { conn }: {
        conn: Baileys;
    }): Promise<boolean>;
}
import { WAMessage } from '@whiskeysockets/baileys';
//# sourceMappingURL=_antiArabe.d.ts.map