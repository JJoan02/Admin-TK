import axios from 'axios';
import crypto from 'crypto';
async function suno(prompt, { style = '', title = '', instrumental = false } = {}) {
    if (!prompt)
        throw new Error('Se requiere un prompt');
    if (typeof instrumental !== 'boolean')
        throw new Error('Instrumental debe ser un valor booleano');
    const { data: cf } = await axios.get('https://api.nekorinn.my.id/tools/rynn-stuff', {
        params: {
            mode: 'turnstile-min',
            siteKey: '0x4AAAAAAAgeJUEUvYlF2CzO',
            url: 'https://songgenerator.io/features/s-45',
            accessKey: '2c9247ce8044d5f87af608a244e10c94c5563b665e5f32a4bb2b2ad17613c1fc'
        }
    });
    const uid = crypto.createHash('md5').update(Date.now().toString()).digest('hex');
    const { data: task } = await axios.post('https://aiarticle.erweima.ai/api/v1/secondary-page/api/create', {
        prompt,
        channel: 'MUSIC',
        id: 1631,
        type: 'features',
        source: 'songgenerator.io',
        style,
        title,
        customMode: false,
        instrumental
    }, {
        headers: {
            uniqueid: uid,
            verify: cf.result.token
        }
    });
    while (true) {
        const { data } = await axios.get(`https://aiarticle.erweima.ai/api/v1/secondary-page/api/${task.data.recordId}`, {
            headers: {
                uniqueid: uid,
                verify: cf.result.token
            }
        });
        if (data?.data?.state === 'success') {
            try {
                let parsed = JSON.parse(data.data.completeData);
                return parsed;
            }
            catch {
                return data.data.completeData;
            }
        }
        await new Promise(res => setTimeout(res, 1500));
    }
}
let handler = async (m, { conn, text }) => {
    if (!text)
        return m.reply(`Ejemplo:.suno canción sobre lo que siento por ella, cantante masculino, estilo lofi relajado`);
    m.reply('🔄 Generando...');
    try {
        let result = await suno(text);
        if (!result?.data?.length)
            return m.reply('❌ No se pudo obtener la canción');
        let audioUrl = result.data[0].audio_url;
        let songTitle = result.data[0].title || 'Suno Music';
        let lyrics = result.data[0].prompt || '';
        await conn.sendMessage(m.chat, {
            audio: { url: audioUrl },
            mimetype: 'audio/mpeg',
            fileName: `${songTitle}.mp3`,
            ptt: false
        }, { quoted: m });
        if (lyrics) {
            m.reply(`*Letra de la canción: ${songTitle}*\n\n${lyrics}`);
        }
    }
    catch (e) {
        m.reply(`⚠️ Error: ${e.message}`);
    }
};
handler.help = ['suno <prompt>'];
handler.tags = ['ai'];
handler.command = ['suno'];
export default handler;
//# sourceMappingURL=tools-newname.js.map