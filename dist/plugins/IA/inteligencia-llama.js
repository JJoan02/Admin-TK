import Groq from 'groq-sdk';
import 'dotenv/config';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    // Cargar API Key desde variables de entorno
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    conn.aiSessions = conn.aiSessions || {};

    if (!text) {
        return conn.reply(m.chat, `❀ Ingresa un texto para hablar con la IA`, m);
    }

    try {
        if (!(m.sender in conn.aiSessions)) {
            conn.aiSessions[m.sender] = [{
                role: 'system',
                content: `Eres Llama Ai, una inteligencia artificial. Responde de manera clara y concisa con emojis en todo texto para que los usuarios entiendan mejor tus respuestas. El nombre del usuario será: ${conn.getName(m.sender)}`
            }];
        }

        if (conn.aiSessions[m.sender].length > 10) {
            conn.aiSessions[m.sender] = conn.aiSessions[m.sender].slice(-1);
        }

        conn.aiSessions[m.sender].push({ role: 'user', content: text });

        let sessionMessages = [...conn.aiSessions[m.sender], { role: 'user', content: text }];
        let payloads = { messages: sessionMessages, model: 'llama-3.1-70b-versatile' };
        let json = await groq.chat.completions.create(payloads);

        let responseMessage = json.choices[0].message.content;

        conn.aiSessions[m.sender].push({ role: "system", content: responseMessage });

        await conn.sendMessage(m.chat, {
            text: responseMessage,
            contextInfo: {
                externalAdReply: {
                    title: 'ᥣᥣᥲmᥲ - ᥲі ⍴᥆ᥕᥱr ᑲᥡ mᥱ𝗍ᥲ',
                    body: dev,
                    thumbnailUrl: 'https://files.catbox.moe/j791b7.jpeg',
                    sourceUrl: channels,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: m });

    } catch (error) {
        console.error(error);
    }
};

handler.help = ['llama *<texto>*'];
handler.tags = ['ai'];
handler.command = ['llama'];
export default handler;
