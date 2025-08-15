import { canLevelUp } from '../../lib/levelling';
import canvafy from 'canvafy';
import { AUTOLEVELUP_ROLES, AUTOLEVELUP_SUCCESS_MESSAGE, AUTOLEVELUP_CAPTION } from '../../content/utilidades/autolevelup-responses';
import { AUTOLEVELUP_DEFAULT_PP_URL, AUTOLEVELUP_BACKGROUND_IMAGE_URL } from '../../../config/redes_sociales/socialMediaConfig';
class AutolevelupPlugin {
    async before(m, { conn }) {
        if (!global.db.data.chats[m.chat].autolevelup)
            return;
        let who = m.mentionedJid && m.mentionedJid[0]
            ? m.mentionedJid[0]
            : m.fromMe
                ? conn.user.jid
                : m.sender;
        let pp = await conn
            .profilePictureUrl(who, 'image')
            .catch((_) => AUTOLEVELUP_DEFAULT_PP_URL);
        let name = await conn.getName(m.sender);
        let user = global.db.data.users[m.sender];
        let chat = global.db.data.chats[m.chat];
        if (!chat.autolevelup)
            return;
        let level = user.level;
        let beforeLevel = user.level * 1;
        while (canLevelUp(user.level, user.exp, global.multiplier))
            user.level++;
        if (beforeLevel !== user.level) {
            let role = '🌱 Novato I';
            for (const r of Object.keys(AUTOLEVELUP_ROLES)) {
                if (AUTOLEVELUP_ROLES[r] <= user.level) {
                    role = r;
                }
            }
            let text = AUTOLEVELUP_SUCCESS_MESSAGE(name, beforeLevel, user.level, role);
            const levelUpImage = await new canvafy.LevelUp()
                .setAvatar(pp)
                .setBackground("image", AUTOLEVELUP_BACKGROUND_IMAGE_URL)
                .setUsername(name)
                .setBorder("#000000")
                .setAvatarBorder("#ff0000")
                .setOverlayOpacity(0.7)
                .setLevels(beforeLevel, user.level)
                .build();
            await conn.sendFile(m.chat, levelUpImage, `levelup-${m.sender}.png`, AUTOLEVELUP_CAPTION(name, role, user.exp, beforeLevel, user.level), m, null, global.fake);
        }
    }
}
export default new AutolevelupPlugin();
//# sourceMappingURL=autolevelup_plugin.js.map