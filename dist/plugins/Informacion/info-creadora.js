import fetch from 'node-fetch';
let handler = async (m, { conn, usedPrefix, text, args, command }) => {
    try {
        let contact, number, ofc, nombre, description, correo, lugar, enlace, biog;
        let pp = gataImg;
        const cat = `𝙂𝙖𝙩𝙖𝘽𝙤𝙩-𝙈𝘿 💖🐈
* ${bot}

*---------------------*

*CENTER GATABOT*
*centergatabot@gmail.com*

𝙂𝘼𝙏𝘼 𝘿𝙄𝙊𝙎 - 𝘼𝙎𝙄𝙎𝙏𝙀𝙉𝘾𝙄𝘼
*${asistencia}*

*---------------------*

ᵃ ᶜᵒⁿᵗᶦⁿᵘᵃᶜᶦᵒ́ⁿ ˢᵉ ᵉⁿᵛᶦᵃʳᵃⁿ ˡᵒˢ ᶜᵒⁿᵗᵃᶜᵗᵒˢ ᵈᵉ ᵐᶦ ᵖʳᵒᵖᶦᵉᵗᵃʳᶦᵒ / ᵈᵉˢᵃʳʳᵒˡˡᵃᵈᵒʳᵉˢ`;
        let biografiaBot = await conn.fetchStatus(conn.user.jid.split('@')[0] + '@s.whatsapp.net').catch(_ => 'undefined');
        let bioBot = biografiaBot.status?.toString() || `${desc2 == '' ? lenguajeGB.smsContacto1() : desc2}`;
        let contacts = global.official;
        let lista = [];
        for (let i = 0; i < contacts.length; i++) {
            const contact = contacts[i];
            const number = String(contact[0]);
            let ofc = '';
            try {
                ofc = await conn.getName(number + '@s.whatsapp.net');
            }
            catch {
                ofc = '';
            }
            const biografia = await conn.fetchStatus(number + '@s.whatsapp.net').catch(() => null);
            let bio = biografia?.status?.toString() || (desc2 === '' ? lenguajeGB.smsContacto2() : desc2);
            const nombre = contact[2] || lenguajeGB.smsContacto3();
            const description = i === 0
                ? 'Solo temas de GataBot'
                : lenguajeGB.smsContacto4();
            const correo = i === 0
                ? 'socialplus.gata@gamil.com'
                : i === 1
                    ? 'thelolibotm@gmail.com'
                    : i === 2
                        ? 'alexismaldonado90700@gmail.com'
                        : '';
            const lugar = i === 0
                ? '🇪🇨 Ecuador'
                : i === 1
                    ? '🇦🇷 Argentina'
                    : i === 2
                        ? '🇲🇽 México'
                        : i === 3
                            ? '🇧🇷 Brazil'
                            : '';
            const enlace = i === 0
                ? 'https://github.com/GataNina-Li'
                : i === 1
                    ? 'https://github.com/elrebelde21'
                    : i === 2
                        ? 'https://github.com/AzamiJs'
                        : i === 3
                            ? 'https://github.com/Abiguelreyes75'
                            : '';
            const youtube = i === 1 ? 'https://www.youtube.com/@elrebelde.21' : '';
            lista.push([
                number || '',
                ofc || '',
                nombre || '',
                description || '',
                correo || '',
                lugar || '',
                enlace || '',
                bio || '',
                youtube || ''
            ]);
        }
        const safeField = (field) => {
            if (field === undefined || field === null)
                return '';
            if (typeof field === 'number')
                return field.toString();
            return field;
        };
        let safeLista = lista.map(contact => contact.map(safeField));
        await conn.sendFile(m.chat, pp, 'lp.jpg', cat || '', fkontak, false, {
            contextInfo: {
                externalAdReply: {
                    mediaUrl: undefined,
                    mediaType: 1,
                    description: undefined,
                    title: gt || '',
                    body: '😻 𝗦𝘂𝗽𝗲𝗿 𝗚𝗮𝘁𝗮𝗕𝗼𝘁-𝗠𝗗 - 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽',
                    previewType: 0,
                    thumbnail: gataImg,
                    sourceUrl: accountsgb.getRandom() || ''
                }
            }
        });
        await conn.sendContactArray(m.chat, safeLista, null, { quoted: fkontak });
    }
    catch (e) {
        await m.reply(lenguajeGB['smsMalError3']() + '\n*' + lenguajeGB.smsMensError1() + '*\n*' + usedPrefix + `${lenguajeGB.lenguaje() == 'es' ? 'reporte' : 'report'}` + '* ' + `${lenguajeGB.smsMensError2()} ` + usedPrefix + command);
        console.log(`❗❗ ${lenguajeGB['smsMensError2']()} ${usedPrefix + command} ❗❗`);
        console.log(e);
    }
};
handler.help = ['owner', 'creator'];
handler.tags = ['info'];
handler.command = /^(owner|creator|propietario|dueño|dueña|propietaria|dueño|creadora|creador|contactos?|contacts?)$/i;
export default handler;
//# sourceMappingURL=info-creadora.js.map