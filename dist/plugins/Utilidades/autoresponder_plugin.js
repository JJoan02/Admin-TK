import axios from 'axios';
import { AUTORESPONDER_DEFAULT_PROMPT, AUTORESPONDER_IGNORED_KEYWORDS, AUTORESPONDER_GEMINI_PRO_ERROR, AUTORESPONDER_LUMINAI_ERROR } from '../../content/utilidades/autoresponder-responses';
import { LUMINAI_API_URL, GEMINI_PRO_API_URL } from '../../../config/redes_sociales/socialMediaConfig';
class AutoresponderPlugin {
    async all(m, { conn }) {
        let user = global.db.data.users[m.sender];
        let chat = global.db.data.chats[m.chat];
        m.isBot = m.id.startsWith('BAE5') && m.id.length === 16 || m.id.startsWith('3EB0') && m.id.length === 12 || m.id.startsWith('3EB0') && (m.id.length === 20 || m.id.length === 22) || m.id.startsWith('B24E') && m.id.length === 20;
        if (m.isBot)
            return true;
        let prefixRegex = new RegExp('^[' + (global.opts['prefix'] || '‎z/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.,\-').replace(/[|\{}()[⟩^$+*?.
            ^ , /g, '\$&') + ']');
        if (prefixRegex.test(m.text))
            return true;
        if (m.isBot || m.sender.includes('bot') || m.sender.includes('Bot')) {
            return true;
        }
        if (m.mentionedJid.includes(conn.user.jid) || (m.quoted && m.quoted.sender === conn.user.jid) && !chat.isBanned) {
            if (AUTORESPONDER_IGNORED_KEYWORDS.some(keyword => m.text.includes(keyword)))
                return true;
            let query = m.text;
            let username = m.pushName;
            let syms1 = chat.sAutoresponder ? chat.sAutoresponder : AUTORESPONDER_DEFAULT_PROMPT;
            if (chat.autoresponder) {
                if (m.fromMe)
                    return true;
                if (!user.registered)
                    return true;
                await conn.sendPresenceUpdate('composing', m.chat);
                let result = null;
                try {
                    const response = await fetch(`${GEMINI_PRO_API_URL}?text=${encodeURIComponent(query)}&prompt=${encodeURIComponent(syms1)}`);
                    if (!response.ok)
                        throw new Error(`Error en la solicitud: ${response.statusText}`);
                    const jsonResult = await response.json();
                    result = jsonResult.answer;
                }
                catch (error) {
                    console.error(AUTORESPONDER_GEMINI_PRO_ERROR, error);
                }
                if (!result || result.trim().length === 0) {
                    try {
                        const response = await axios.post(LUMINAI_API_URL, {
                            content: query,
                            user: username,
                            prompt: syms1,
                            webSearchMode: true
                        });
                        result = response.data.result;
                    }
                    catch (error) {
                        console.error(AUTORESPONDER_LUMINAI_ERROR, error);
                    }
                }
                if (result && result.trim().length > 0) {
                    await conn.reply(m.chat, result, m);
                }
            }
        }
        return true;
    }
}
export default new AutoresponderPlugin();
//# sourceMappingURL=autoresponder_plugin.js.map