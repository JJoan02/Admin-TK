import { IPluginModule } from '../../types/plugin';
import { WAMessage, Baileys } from '@whiskeysockets/baileys';
import { ANTI_FOREIGN_BLOCKED_CODES, ANTI_FOREIGN_BLOCK_MESSAGE, ANTI_FOREIGN_ERROR } from '../../content/anti/anti-foreign-responses';
class AntiForeignPlugin {
    name = "AntiForeignPlugin";
    commands = [];
    async all(m, { conn }) {
        try {
            if (m.isGroup || m.text)
                return false;
            let sender = m.sender;
            const esBloqueado = ANTI_FOREIGN_BLOCKED_CODES.some(codigo => sender.startsWith(codigo));
            if (esBloqueado) {
                await conn.reply(m.chat, ANTI_FOREIGN_BLOCK_MESSAGE, m);
                await conn.updateBlockStatus(sender, 'block');
                console.log(`Usuario con código bloqueado (${sender}) bloqueado automáticamente.`);
            }
        }
        catch (e) {
            console.error(ANTI_FOREIGN_ERROR(e.message));
        }
        return true;
    }
}
export default AntiForeignPlugin;
//# sourceMappingURL=antiputos.js.map