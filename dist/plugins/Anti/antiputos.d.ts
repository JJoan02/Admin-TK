export default AntiForeignPlugin;
declare class AntiForeignPlugin {
    name: string;
    commands: [];
    all(m: WAMessage, { conn }: {
        conn: Baileys;
    }): Promise<boolean>;
}
import { WAMessage } from '@whiskeysockets/baileys';
//# sourceMappingURL=antiputos.d.ts.map