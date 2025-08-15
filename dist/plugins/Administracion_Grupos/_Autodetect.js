import { WAMessageStubType } from '@whiskeysockets/baileys';
import { AUTODETECT_GROUP_NAME_CHANGED, AUTODETECT_GROUP_PHOTO_CHANGED, AUTODETECT_GROUP_LINK_RESET, AUTODETECT_GROUP_SETTINGS_ADJUSTED, AUTODETECT_GROUP_STATUS_CHANGED, AUTODETECT_ADMIN_PROMOTED, AUTODETECT_ADMIN_DEMOTED } from '../../content/administracion_grupos/autodetect-responses';
import { ADMIN_TK_IMAGE_URL, ADMIN_TK_VCARD_NAME, ADMIN_TK_VCARD_ORG, ADMIN_TK_VCARD_TITLE, ADMIN_TK_VCARD_TEL, ADMIN_TK_VCARD_LABEL, ADMIN_TK_VCARD_DESCRIPTION, ADMIN_TK_IMAGE_URL_2 } from '../../../config/redes_sociales/socialMediaConfig';
class AutodetectPlugin {
    name = "AutodetectPlugin";
    commands = [];
    async before(m, { conn, participants, groupMetadata }) {
        if (!m.messageStubType || !m.isGroup)
            return false;
        const fkontak = {
            key: {
                participants: "0@s.whatsapp.net",
                remoteJid: "status@broadcast",
                fromMe: false,
                id: "Admin-TK"
            },
            message: {
                locationMessage: {
                    name: `*${ADMIN_TK_VCARD_NAME} 🌀*`,
                    jpegThumbnail: await (await fetch(ADMIN_TK_IMAGE_URL)).buffer(),
                    vcard: "BEGIN:VCARD\n" +
                        "VERSION:3.0\n" +
                        `N:;${ADMIN_TK_VCARD_NAME};;;\n` +
                        `FN:${ADMIN_TK_VCARD_NAME}\n` +
                        `ORG:${ADMIN_TK_VCARD_ORG}\n` +
                        `TITLE:${ADMIN_TK_VCARD_TITLE}\n` +
                        `item1.TEL;waid=${ADMIN_TK_VCARD_TEL}:+${ADMIN_TK_VCARD_TEL}\n` +
                        `item1.X-ABLabel:${ADMIN_TK_VCARD_LABEL}\n` +
                        `X-WA-BIZ-DESCRIPTION:${ADMIN_TK_VCARD_DESCRIPTION}\n` +
                        `X-WA-BIZ-NAME:${ADMIN_TK_VCARD_NAME}\n` +
                        "END:VCARD"
                }
            },
            participant: "0@s.whatsapp.net"
        };
        let chat = global.db.data.chats[m.chat];
        let usuario = `@${m.sender.split('@')[0]}`;
        let pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || ADMIN_TK_IMAGE_URL_2;
        if (chat?.detect) {
            switch (m.messageStubType) {
                case WAMessageStubType.GROUP_CHANGE_SUBJECT:
                    await conn.sendMessage(m.chat, { text: AUTODETECT_GROUP_NAME_CHANGED(usuario, m.messageStubParameters[0]), mentions: [m.sender] }, { quoted: fkontak });
                    break;
                case WAMessageStubType.GROUP_CHANGE_ICON:
                    await conn.sendMessage(m.chat, { image: { url: pp }, caption: AUTODETECT_GROUP_PHOTO_CHANGED(usuario), mentions: [m.sender] }, { quoted: fkontak });
                    break;
                case WAMessageStubType.GROUP_CHANGE_INVITE_LINK:
                    await conn.sendMessage(m.chat, { text: AUTODETECT_GROUP_LINK_RESET(usuario), mentions: [m.sender] }, { quoted: fkontak });
                    break;
                case WAMessageStubType.GROUP_CHANGE_SETTING:
                    await conn.sendMessage(m.chat, { text: AUTODETECT_GROUP_SETTINGS_ADJUSTED(usuario, m.messageStubParameters[0] === 'on' ? 'on' : 'off'), mentions: [m.sender] }, { quoted: fkontak });
                    break;
                case WAMessageStubType.GROUP_CHANGE_ANNOUNCE:
                    await conn.sendMessage(m.chat, { text: AUTODETECT_GROUP_STATUS_CHANGED(usuario, m.messageStubParameters[0] === 'on' ? 'on' : 'off'), mentions: [m.sender] }, { quoted: fkontak });
                    break;
                case WAMessageStubType.GROUP_PARTICIPANT_CHANGE_ADMIN:
                    await conn.sendMessage(m.chat, { text: AUTODETECT_ADMIN_PROMOTED(usuario, m.messageStubParameters[0].split('@')[0]), mentions: [`${m.sender}`, `${m.messageStubParameters[0]}`] }, { quoted: fkontak });
                    break;
                case WAMessageStubType.GROUP_PARTICIPANT_CHANGE_NO_ADMIN:
                    await conn.sendMessage(m.chat, { text: AUTODETECT_ADMIN_DEMOTED(usuario, m.messageStubParameters[0].split('@')[0]), mentions: [`${m.sender}`, `${m.messageStubParameters[0]}`] }, { quoted: fkontak });
                    break;
                default:
                    console.log({
                        messageStubType: m.messageStubType,
                        messageStubParameters: m.messageStubParameters,
                        type: WAMessageStubType[m.messageStubType],
                    });
                    break;
            }
        }
        return true;
    }
}
export default AutodetectPlugin;
//# sourceMappingURL=_Autodetect.js.map