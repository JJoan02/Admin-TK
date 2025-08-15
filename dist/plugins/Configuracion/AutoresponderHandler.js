import axios from 'axios';
import { autoresponderContent } from '../content/autoresponder-content.js';
export class AutoresponderHandler {
    async handleBeforeMessage(m, context) {
        const { conn } = context;
        let user = global.db.data.users[m.sender];
        let chat = global.db.data.chats[m.chat];
        m.isBot = m.id.startsWith('BAE5') && m.id.length === 16 || m.id.startsWith('3EB0') && m.id.length === 12 || m.id.startsWith('3EB0') && (m.id.length === 20 || m.id.length === 22) || m.id.startsWith('B24E') && m.id.length === 20;
        if (m.isBot)
            return;
        let prefixRegex = new RegExp('^[' + (global.opts?.['prefix'] || '‎z/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.,\-').replace(/[|\{}()[\^$+*?.\[\\\]\-]/g, '\$&') + ']');
        if (prefixRegex.test(m.text))
            return;
        if (m.isBot || m.sender.includes('bot') || m.sender.includes('Bot')) {
            return;
        }
        if (m.mentionedJid.includes(conn.user.jid)) {
            if (m.text.includes('PIEDRA') || m.text.includes('PAPEL') || m.text.includes('TIJERA') || m.text.includes('menu') || m.text.includes('estado') || m.text.includes('bots') || m.text.includes('serbot') || m.text.includes('jadibot') || m.text.includes('Video') || m.text.includes('Audio') || m.text.includes('audio'))
                return;
            async function luminsesi(q, username, logic) {
                try {
                    const response = await axios.post("https://luminai.my.id", {
                        content: q,
                        user: username,
                        prompt: logic,
                        webSearchMode: true
                    });
                    return response.data.result;
                }
                catch (error) {
                    return;
                }
            }
            async function geminiProApi(q, logic) {
                try {
                    const response = await fetch(`https://api.ryzendesu.vip/api/ai/gemini-pro?text=${encodeURIComponent(q)}&prompt=${encodeURIComponent(logic)}`);
                    if (!response.ok)
                        throw new Error(`Error en la solicitud: ${response.statusText}`);
                    const result = await response.json();
                    return result.answer;
                }
                catch (error) {
                    return;
                }
            }
            let txtDefault = autoresponderContent.defaultPrompt;
            let query = m.text;
            let username = m.pushName;
            let syms1 = chat.sAutorespond ? chat.sAutorespond : txtDefault;
            if (!chat.autorespond)
                return;
            if (m.fromMe)
                return;
            if (!user.registered)
                return;
            let result;
            if (result && result.trim().length > 0) {
                result = await geminiProApi(query, syms1);
            }
            if (!result || result.trim().length === 0) {
                result = await luminsesi(query, username, syms1);
            }
            if (result && result.trim().length > 0) {
                conn.sendPresenceUpdate('composing', m.chat);
                await conn.reply(m.chat, result, m);
                await conn.readMessages([m.key]);
            }
            else {
            }
        }
        return true;
    }
}
//# sourceMappingURL=AutoresponderHandler.js.map