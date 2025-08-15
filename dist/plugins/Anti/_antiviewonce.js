import { IPluginModule } from '../../types/plugin';
import { WAMessage, Baileys, downloadContentFromMessage } from '@whiskeysockets/baileys';
import { ANTI_VIEWONCE_IMAGE_CAPTION, ANTI_VIEWONCE_VIDEO_CAPTION, ANTI_VIEWONCE_AUDIO_CAPTION } from '../../content/anti/anti-viewonce-responses';
class AntiViewOncePlugin {
    name = "AntiViewOncePlugin";
    commands = [];
    async before(m, { conn, isAdmin, isBotAdmin }) {
        let chat = global.db.data.chats[m.chat];
        if (!chat?.antiver || chat?.isBanned)
            return false;
        if (m.mtype == 'viewOnceMessageV2' || m.mtype.hasOwnProperty("viewOnce")) {
            let msg = m.message.viewOnceMessageV2.message;
            let type = Object.keys(msg)[0];
            let media = await downloadContentFromMessage(msg[type], type == 'imageMessage' ? 'image' : 'video');
            let buffer = Buffer.from([]);
            for await (const chunk of media) {
                buffer = Buffer.concat([buffer, chunk]);
            }
            if (/video/.test(type)) {
                return conn.sendFile(m.chat, buffer, 'error.mp4', `${msg[type].caption || ''}` + lenguajeGB.smsAntiView1(), m);
            }
            else if (/image/.test(type)) {
                return conn.sendFile(m.chat, buffer, 'error.jpg', `${msg[type].caption || ''}` + lenguajeGB.smsAntiView2(), m);
            }
        }
        return true;
    }
}
export default AntiViewOncePlugin;
//# sourceMappingURL=_antiviewonce.js.map