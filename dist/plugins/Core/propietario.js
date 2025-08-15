import { mku } from '../../Database/dataschema';
import { BOT_VIDEO_URL } from '../../content/help-responses';
import { OWNER_MODS_HEADER, OWNER_NO_MODS_ADDED, OWNER_WARNING_SPAM, OWNER_HELP_PROMPT, OWNER_THANKS_MESSAGE, OWNER_INTERNAL_ERROR } from '../../content/core/propietario-responses';
class PropietarioPlugin {
    name = "PropietarioPlugin";
    commands = [
        {
            name: "propietario",
            alias: ["owner", "modlist", "mods", "mod"],
            desc: "Muestra la lista de Mods y Propietarios.",
            category: "Core",
            usage: "owner",
            react: "🏅",
            execute: async (Yaka, m, { text, prefix }) => {
                try {
                    var modlist = await mku.find({ addedMods: "true" });
                    var modlistString = "";
                    var ownerList = global.owner;
                    modlist.forEach((mod) => {
                        modlistString += `\n@${mod.id.split("@")[0]}\n`;
                    });
                    var mention = await modlist.map((mod) => mod.id);
                    let xy = modlist.map((mod) => mod.id);
                    let yz = ownerList.map((owner) => owner + "@s.whatsapp.net");
                    let xyz = xy.concat(yz);
                    let textM = OWNER_MODS_HEADER(botName);
                    if (ownerList.length === 0 && modlist.length === 0) {
                        textM = OWNER_NO_MODS_ADDED;
                    }
                    for (var i = 0; i < ownerList.length; i++) {
                        textM += `\n〽️ @${ownerList[i]}\n`;
                    }
                    if (modlistString !== "") {
                        for (var i = 0; i < modlist.length; i++) {
                            textM += `\n🎀 @${modlist[i].id.split("@")[0]}\n`;
                        }
                    }
                    if (modlistString !== "" || ownerList.length !== 0) {
                        textM += `\n\n 📛 ${OWNER_WARNING_SPAM}\n\n🎀 ${OWNER_HELP_PROMPT(prefix)}\n\n${OWNER_THANKS_MESSAGE(botName)}\n`;
                    }
                    return Yaka.sendMessage(m.from, { video: { url: BOT_VIDEO_URL },
                        gifPlayback: true,
                        caption: textM,
                        mentions: xyz }, { quoted: m });
                }
                catch (err) {
                    console.error(err);
                    return Yaka.sendMessage(m.from, { text: OWNER_INTERNAL_ERROR }, { quoted: m });
                }
            }
        }
    ];
}
export default PropietarioPlugin;
//# sourceMappingURL=propietario.js.map