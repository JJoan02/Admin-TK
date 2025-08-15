"use strict";
const { mku } = require("../../Database/dataschema.js");
module.exports = {
    name: "unblock",
    alias: ["unblockuser"],
    desc: "To unblock an user from bot's account",
    category: "Mods",
    usage: "unblock @user",
    react: "🍃",
    start: async (Yaka, m, { args, text, prefix, isCreator, pushName, modStatus }) => {
        if (modStatus == "false" && !isCreator)
            return Yaka.sendMessage(m.from, { text: 'Sorry, only my *Owner* and *Mods* can use this command !' }, { quoted: m });
        if (!text && !m.quoted) {
            return Yaka.sendMessage(m.from, { text: `Please tag a user to *Block*!` }, { quoted: m });
        }
        else if (m.quoted) {
            var mentionedUser = m.quoted.sender;
        }
        else {
            var mentionedUser = mentionByTag[0];
        }
        await Yaka.updateBlockStatus(mentionedUser, 'unblock').then(async (res) => {
            Yaka.sendMessage(m.from, { text: `Successfully *Un-Blocked* @${mentionedUser.split("@")[0]} Senpai !`, mentions: [mentionedUser] }, { quoted: m }).catch((e) => {
                Yaka.sendMessage(m.from, { text: `Failed to Un-block @${mentionedUser.split("@")[0]} Senpai ! Maybe he is not blocked !`, mentions: [mentionedUser] }, { quoted: m });
            });
        }).catch((e) => {
            Yaka.sendMessage(m.from, { text: `Failed to Un-block @${mentionedUser.split("@")[0]} Senpai ! Maybe he is already blocked !`, mentions: [mentionedUser] }, { quoted: m });
        });
    },
};
//# sourceMappingURL=unblock.js.map