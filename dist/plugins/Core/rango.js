import canvacord from 'canvacord';
import { fetchBuffer } from "../../lib/Function";
import { RANK_ROLES, RANK_XP_MESSAGE, DEFAULT_PROFILE_PICTURE_URL, RANK_ERROR_MESSAGE } from '../../content/core/rango-responses';
class RangoPlugin {
    name = "RangoPlugin";
    commands = [
        {
            name: "rango",
            alias: ["rank"],
            desc: "Muestra el rango del usuario.",
            category: "RPG",
            cool: 3,
            react: "🔮️",
            execute: async (Yaka, m, { text, pushName, sender }) => {
                try {
                    const userq = await Levels.fetch(m.sender, "bot");
                    const levelRole = userq.level;
                    let role = 'Ciudadano';
                    for (const r of RANK_ROLES) {
                        if (levelRole <= r.level) {
                            role = r.name;
                            break;
                        }
                    }
                    let disc = sender.substring(3, 7);
                    let textr = RANK_XP_MESSAGE(pushName || sender, disc, userq.xp, Levels.xpFor(userq.level + 1), userq.level, role);
                    let ppuser;
                    try {
                        ppuser = await Yaka.profilePictureUrl(m.sender, 'image');
                    }
                    catch {
                        ppuser = await fetchBuffer(DEFAULT_PROFILE_PICTURE_URL);
                    }
                    const randomHexs = `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`;
                    const randomHex = `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`;
                    const randomHexz = `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`;
                    const rank = new canvacord.Rank()
                        .setAvatar(ppuser)
                        .setLevel(userq.level)
                        .setLevelColor(randomHexs, randomHex)
                        .setCurrentXP(userq.xp)
                        .setOverlay(randomHex, 100, false)
                        .setRequiredXP(Levels.xpFor(userq.level + 1))
                        .setProgressBar(randomHexs, 'COLOR')
                        .setRank(0, role, false)
                        .setBackground('COLOR', randomHexz)
                        .setUsername(pushName || sender)
                        .setDiscriminator(disc);
                    rank.build().then(async (data) => {
                        Yaka.sendMessage(m.from, { image: data, caption: textr }, { quoted: m });
                    }).catch((err) => {
                        console.error("Error al construir la tarjeta de rango:", err);
                        m.reply(RANK_ERROR_MESSAGE);
                    });
                }
                catch (error) {
                    console.error("Error en el comando de rango:", error);
                    m.reply(RANK_ERROR_MESSAGE);
                }
            }
        }
    ];
}
export default RangoPlugin;
//# sourceMappingURL=rango.js.map