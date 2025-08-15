import axios from 'axios';
let handler = async (m, { conn, usedPrefix }) => {
    let who;
    if (m.isGroup)
        who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
    else
        who = m.chat;
    if (!who)
        throw 'Etiqueta o menciona a alguien';
    let user = global.db.data.users[who];
    let name = conn.getName(who);
    let name2 = conn.getName(m.sender);
    m.react('🤗');
    let str = `\`${name2}\` está feliz de \`${name}\``.trim();
    if (m.isGroup) {
        try {
            const response = await axios.get('https://raw.githubusercontent.com/Elpapiema/CharHub-Store/refs/heads/main/video_json/SFW/feliz.json');
            const videos = response.data.videos;
            const video = videos[Math.floor(Math.random() * videos.length)];
            conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions: [m.sender] });
        }
        catch (error) {
            console.error('Error al obtener los videos:', error);
            m.reply('Hubo un error al obtener los videos.');
        }
    }
};
handler.help = ['feliz @tag'];
handler.tags = ['fun'];
handler.command = ['feliz', 'happy'];
handler.group = true;
export default handler;
//# sourceMappingURL=fun-feliz.js.map