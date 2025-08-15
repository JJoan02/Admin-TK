import { toDataURL } from 'qrcode';
let handler = async (m, { conn, text }) => {
    if (!text)
        return conn.reply(m.chat, `🚩 Ingresa un texto junto al comando.`, m);
    conn.sendFile(m.chat, await toDataURL(text.slice(0, 2048), { scale: 8 }), 'qrcode.png', listo, m, null);
};
handler.help = ['qrcode *<texto>*'];
handler.tags = ['tools'];
handler.command = ['qrcode'];
handler.register = true;
export default handler;
//# sourceMappingURL=tools-qrcode.js.map