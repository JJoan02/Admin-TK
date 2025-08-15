let handler = async (m, { conn, text, usedPrefix, command }) => {
    let text_ = 'Texto';
    let img = 'https://qu.ax/Vmpl.jpg';
    let titulo = 'Titulo texto';
    let canal = 'Canal';
    let id = '120363160031023229@newsletter';
    let titulo_cita = 'Cita Titulo';
    let text_cita = 'Cita Texto';
    let img_cita = 'https://qu.ax/TPVV.jpg';
    let titulo_fkontak = 'Gata Dios';
    conn.sendMessage(m.chat, {
        text: text_,
        footer: titulo_cita,
        buttons: [
            { buttonId: '🚀',
                buttonText: {
                    displayText: '🗿'
                }, type: 1 }
        ],
        headerType: 1,
        viewOnce: true
    }, { quoted: null });
};
handler.command = /^(fake10)$/i;
export default handler;
//# sourceMappingURL=prueba-fake.js.map