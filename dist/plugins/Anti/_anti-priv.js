import { IPluginModule } from '../../types/plugin';
import { WAMessage, Baileys } from '@whiskeysockets/baileys';
import * as fs from 'fs';
import { ANTI_PRIV_BLOCKED_MESSAGE, ANTI_PRIV_WARN_MESSAGE, ANTI_PRIV_ALLOWED_WORDS, ANTI_PRIV_ALLOWED_EMOJIS, ANTI_PRIV_WARN_PATH, ANTI_PRIV_SETTINGS_PATH } from '../../content/anti/anti-priv-responses';
function loadSettings() {
    if (!fs.existsSync(ANTI_PRIV_SETTINGS_PATH))
        return { global: {} };
    return JSON.parse(fs.readFileSync(ANTI_PRIV_SETTINGS_PATH, 'utf-8'));
}
function loadWarns() {
    if (!fs.existsSync(ANTI_PRIV_WARN_PATH))
        fs.writeFileSync(ANTI_PRIV_WARN_PATH, '{}');
    return JSON.parse(fs.readFileSync(ANTI_PRIV_WARN_PATH, 'utf-8'));
}
function saveWarns(data) {
    fs.writeFileSync(ANTI_PRIV_WARN_PATH, JSON.stringify(data, null, 2));
}
class AntiPrivPlugin {
    name = "AntiPrivPlugin";
    commands = [];
    async before(m, { conn, isOwner }) {
        const settings = loadSettings();
        const antiprivado = settings?.global?.antiprivado;
        if (!antiprivado)
            return false;
        if (m.isGroup)
            return false;
        if (isOwner)
            return false;
        const texto = (m.text || '').toLowerCase().replace(/\s+/g, ' ').trim();
        const esSoloPpt = texto === 'ppt';
        const esSoloJugada = ANTI_PRIV_ALLOWED_WORDS.includes(texto) || ANTI_PRIV_ALLOWED_EMOJIS.includes(texto);
        const esComboValido = texto.startsWith('ppt ') && (ANTI_PRIV_ALLOWED_WORDS.includes(texto.slice(4)) || ANTI_PRIV_ALLOWED_EMOJIS.includes(texto.slice(4)));
        if (esSoloPpt || esSoloJugada || esComboValido)
            return false;
        const warns = loadWarns();
        const id = m.sender;
        warns[id] = (warns[id] || 0) + 1;
        if (warns[id] >= 3) {
            await conn.sendMessage(id, {
                text: ANTI_PRIV_BLOCKED_MESSAGE
            });
            await conn.updateBlockStatus(id, 'block');
        }
        else {
            await conn.sendMessage(id, {
                text: ANTI_PRIV_WARN_MESSAGE(warns[id])
            });
        }
        saveWarns(warns);
        return true;
    }
}
export default AntiPrivPlugin;
//# sourceMappingURL=_anti-priv.js.map