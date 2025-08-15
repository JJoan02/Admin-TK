import axios from 'axios';
import { perplexity } from '../../lib/chatgpt';
import { CHATBOT_GREETINGS, CHATBOT_HOST_INFO_TEXT, CHATBOT_HOST_INFO_TITLE, CHATBOT_HOST_INFO_BODY, CHATBOT_HOST_INFO_THUMBNAIL_URL, CHATBOT_AUDIO_URL, CHATBOT_SAY_TEXT_PROMPT, CHATBOT_GET_BOT_INFO, CHATBOT_WHAT_IS_BOT_INFO, CHATBOT_RULES_INFO, CHATBOT_DEFAULT_AI_PROMPT, CHATBOT_SIMSIMI_SLEEPING } from '../../content/utilidades/chatbot-responses';
import { LUMINAI_API_URL, GEMINI_PRO_API_URL, APIS_TOOLS_SIMI_URL } from '../../../config/redes_sociales/socialMediaConfig';
const antiSpam = new Map();
class ChatbotPlugin {
    async all(m, { conn }) {
        if (m.id.startsWith('NJX-') || m.id.startsWith('BAE5') && m.id.length === 16 || m.id.startsWith('3EB0') && m.id.length === 12 || m.id.startsWith('3EB0') && (m.id.length === 20 || m.id.length === 22) || m.id.startsWith('B24E') && m.id.length === 20 || m.id.startsWith('FizzxyTheGreat-'))
            return;
        let setting = global.db.data.settings[conn.user.jid];
        let chat = global.db.data.chats[m.chat];
        let name = conn.getName(m.sender);
        if (chat && chat.isBanned)
            return;
        if (m.fromMe)
            return;
        let prefixRegex = new RegExp('^[' + (global.opts['prefix'] || '‎z/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.,\-').replace(/[|\{}()[\\\]^$+*?.\-\^]/g, '\$&') + ']');
        if (prefixRegex.test(m.text))
            return;
        if (m.isBot || m.sender.includes('bot') || m.sender.includes('Bot')) {
            return;
        }
        if (m.mentionedJid.includes(conn.user.jid) || (m.quoted && m.quoted.sender === conn.user.jid)) {
            if (['PIEDRA', 'PAPEL', 'TIJERA', 'menu', 'estado', 'bots', 'serbot', 'jadibot', 'Video', 'Audio', 'audio'].some(keyword => m.text.includes(keyword))) {
                return;
            }
            const lastMessageTime = antiSpam.get(m.sender) || 0;
            const currentTime = Date.now();
            if (currentTime - lastMessageTime < 5000) {
                return;
            }
            let query = m.text;
            let username = m.pushName;
            let syms1 = chat.sAutoresponder ? chat.sAutoresponder : CHATBOT_DEFAULT_AI_PROMPT;
            if (chat.autoresponder) {
                if (m.fromMe)
                    return;
                if (!global.db.data.users[m.sender].registered)
                    return;
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
                    console.error('Error en Gemini Pro:', error);
                }
                if (!result || result.trim().length === 0) {
                    try {
                        let perplexityResponse = await perplexity.chat([{ role: 'system', content: syms1 }, { role: 'user', content: query }], 'sonar-pro');
                        if (perplexityResponse.status) {
                            result = perplexityResponse.result.response;
                        }
                        else {
                            throw new Error(`Error en Perplexity: ${perplexityResponse.result.error}`);
                        }
                    }
                    catch (error) {
                        console.error('Error en Perplexity:', error);
                    }
                }
                if (!result || result.trim().length === 0) {
                    try {
                        const { data } = await axios.post("https://api.simsimi.vn/v1/simtalk", new URLSearchParams({
                            text: query,
                            lc: 'es'
                        }).toString(), {
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' }
                        });
                        result = data.message;
                    }
                    catch (error) {
                        console.error('Error en SimSimi:', error);
                    }
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
                        result = result.replace(/Maaf, terjadi kesalahan saat memproses permintaan Anda/g, '').trim();
                        result = result.replace(/Generated by BLACKBOX\.AI.*?https:\/\/www\.blackbox\.ai/g, '').trim();
                        result = result.replace(/and for API requests replace https:\/\/www\.blackbox\.ai with https:\/\/api\.blackbox\.ai/g, '').trim();
                    }
                    catch (error) {
                        console.error('Error en LuminAI:', error);
                    }
                }
                if (result && result.trim().length > 0) {
                    await conn.reply(m.chat, result, m);
                    antiSpam.set(m.sender, currentTime);
                }
                else {
                    try {
                        let gpt = await fetch(`${APIS_TOOLS_SIMI_URL}?text=${m.text}`);
                        let res = await gpt.json();
                        await m.reply(res.data.message);
                        antiSpam.set(m.sender, Date.now());
                    }
                    catch (e) {
                        await m.reply(CHATBOT_SIMSIMI_SLEEPING.getRandom());
                        console.log(e);
                    }
                }
            }
        }
        if (/^infohost$/i.test(m.text)) {
            await conn.sendMessage(m.chat, {
                text: CHATBOT_HOST_INFO_TEXT,
                contextInfo: {
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363301598733462@newsletter',
                        serverMessageId: '',
                        newsletterName: 'Sky-Ultra-Plus ☁️'
                    },
                    forwardingScore: 9999999,
                    isForwarded: true,
                    "externalAdReply": {
                        "showAdAttribution": true,
                        "containsAutoReply": true,
                        title: CHATBOT_HOST_INFO_TITLE,
                        body: CHATBOT_HOST_INFO_BODY,
                        "previewType": "PHOTO",
                        thumbnailUrl: CHATBOT_HOST_INFO_THUMBNAIL_URL,
                        sourceUrl: global.accountsgb
                    }
                }
            }, { quoted: global.fkontak });
        }
        if (/^bot$/i.test(m.text)) {
            await conn.reply(m.chat, CHATBOT_GREETINGS.getRandom(), m, global.fakeChannel);
            await conn.sendPresenceUpdate('recording', m.chat);
            await conn.sendFile(m.chat, CHATBOT_AUDIO_URL, 'bot.mp3', null, m, true, { type: 'audioMessage', ptt: true, sendEphemeral: true, quoted: m });
        }
        else if (/^simi$/i.test(m.text)) {
            await conn.reply(m.chat, CHATBOT_SAY_TEXT_PROMPT, m);
        }
        else if (/^Quiero un bot|como obtengo un bot?|Quiero un bot?|quiero un bot|solicitud|solicitó bot|solicito bot|Necesito un bot|necesito un bot$/i.test(m.text)) {
            await conn.reply(m.chat, CHATBOT_GET_BOT_INFO, global.fkontak, {
                contextInfo: {
                    externalAdReply: {
                        mediaUrl: null, mediaType: 1, description: null,
                        title: `Hola ${name} 👋`, body: global.wm, previewType: 0,
                        thumbnail: global.gataImg, sourceUrl: global.accountsgb
                    }
                }
            });
        }
        else if (/^¿Qué es un Bot?|¿Qué es Bot?|Qué es Bot|qué es Bot|QUÉ ES UN BOT|¿QUÉ ES UN BOT?|¿qué es un Bot?|qué es un Bot|que es un Bot|Qué es un Bot?|Que es un Bot? $/i.test(m.text)) {
            await conn.reply(m.chat, CHATBOT_WHAT_IS_BOT_INFO, m);
        }
        else if (/^reglas|normas|Reglas$/i.test(m.text)) {
            await conn.reply(m.chat, CHATBOT_RULES_INFO, global.fkontak, m);
        }
    }
}
export default new ChatbotPlugin();
//# sourceMappingURL=chatbot_plugin.js.map