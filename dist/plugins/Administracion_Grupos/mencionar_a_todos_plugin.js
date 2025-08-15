import { TAGALL_HEADER, TAGALL_FOOTER, TAGALL_IMAGE_URL, TAGALL_AUDIO_URL } from '../../content/administracion_grupos/tagall-responses';
import fetch from "node-fetch";
class MencionarATodosPlugin {
    name = 'MencionarATodosPlugin';
    commands = [
        {
            name: 'tagall',
            alias: ['invocar', 'marcar', 'todos', 'invocación'],
            desc: 'Menciona a todos los miembros del grupo con un mensaje, imagen y audio.',
            category: 'Administración/Grupos',
            react: '📣',
            execute: async (Yaka, m, { conn, text, participants, args, isOwner, isAdmin }) => {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn);
                    throw new Error('No tienes permisos para usar este comando.');
                }
                const customMessage = args.join(' ');
                const groupMetadata = await conn.groupMetadata(m.chat);
                const groupName = groupMetadata.subject;
                const countryFlags = {
                    '1': '🇺🇸', '44': '🇬🇧', '33': '🇫🇷', '49': '🇩🇪', '39': '🇮🇹', '81': '🇯🇵',
                    '82': '🇰🇷', '86': '🇨🇳', '7': '🇷🇺', '91': '🇮🇳', '61': '🇦🇺', '64': '🇳🇿',
                    '34': '🇪🇸', '55': '🇧🇷', '52': '🇲🇽', '54': '🇦🇷', '57': '🇨🇴', '51': '🇵🇪',
                    '56': '🇨🇱', '58': '🇻🇪', '502': '🇬🇹', '503': '🇸🇻', '504': '🇭🇳', '505': '🇳🇮',
                    '506': '🇨🇷', '507': '🇵🇦', '591': '🇧🇴', '592': '🇬🇾', '593': '🇪🇨', '595': '🇵🇾',
                    '596': '🇲🇶', '597': '🇸🇷', '598': '🇺🇾', '53': '🇨🇺', '20': '🇪🇬', '972': '🇮🇱',
                    '90': '🇹🇷', '63': '🇵🇭', '62': '🇮🇩', '60': '🇲🇾', '65': '🇸🇬', '66': '🇹🇭',
                    '31': '🇳🇱', '32': '🇧🇪', '30': '🇬🇷', '36': '🇭🇺', '46': '🇸🇪', '47': '🇳🇴',
                    '48': '🇵🇱', '421': '🇸🇰', '420': '🇨🇿', '40': '🇷🇴', '43': '🇦🇹', '373': '🇲🇩'
                };
                const getCountryFlag = (id) => {
                    const phoneNumber = id.split('@')[0];
                    if (phoneNumber.startsWith('1'))
                        return '🇺🇸';
                    let prefix = phoneNumber.substring(0, 3);
                    if (!countryFlags[prefix]) {
                        prefix = phoneNumber.substring(0, 2);
                    }
                    return countryFlags[prefix] || '🏳️‍🌈';
                };
                let messageText = TAGALL_HEADER(groupName, participants.length, customMessage) + '\n';
                for (const mem of participants) {
                    messageText += `🤖 ${getCountryFlag(mem.id)} @${mem.id.split('@')[0]}\n`;
                }
                messageText += TAGALL_FOOTER;
                const fkontak = {
                    key: {
                        participants: "0@s.whatsapp.net",
                        remoteJid: "status@broadcast",
                        fromMe: false,
                        id: "AlienMenu"
                    },
                    message: {
                        locationMessage: {
                            name: "*Admin-TK 🌀*",
                            jpegThumbnail: await (await fetch(TAGALL_IMAGE_URL)).buffer(),
                            vcard: "BEGIN:VCARD\n" +
                                "VERSION:3.0\n" +
                                "N:;Admin-TK;;;\n" +
                                "FN:Admin-TK\n" +
                                "ORG:JJoan02\n" +
                                "TITLE:\n" +
                                "item1.TEL;waid=59169082575:+591 69082575\n" +
                                "item1.X-ABLabel:Admin-TK\n" +
                                "X-WA-BIZ-DESCRIPTION:🛸 Llamado grupal universal con estilo.\n" +
                                "X-WA-BIZ-NAME:Admin-TK\n" +
                                "END:VCARD"
                        }
                    },
                    participant: "0@s.whatsapp.net"
                };
                await conn.sendMessage(m.chat, {
                    image: { url: TAGALL_IMAGE_URL },
                    caption: messageText,
                    mentions: participants.map((a) => a.id)
                }, { quoted: fkontak });
                await conn.sendMessage(m.chat, {
                    audio: { url: TAGALL_AUDIO_URL },
                    mimetype: 'audio/mp4',
                    ptt: true
                }, { quoted: fkontak });
            }
        }
    ];
}
export default MencionarATodosPlugin;
//# sourceMappingURL=mencionar_a_todos_plugin.js.map