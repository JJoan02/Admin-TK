"use strict";
const mongoose = require("mongoose");
require("../../config.js");
require("../../Core.js");
const { mku } = require("../../Database/dataschema.js");
module.exports = {
    name: "unban",
    alias: ["unban"],
    desc: "Unban a member",
    category: "core",
    usage: "unban @user",
    react: "🍃",
    start: async (Yaka, m, { text, prefix, isBotAdmin, isAdmin, mentionByTag, pushName, isCreator, modStatus }) => {
        if (modStatus == "false" && !isCreator)
            return Yaka.sendMessage(m.from, { text: 'Sorry, only my *Owner* and *Mods* can use this command !' }, { quoted: m });
        if (!text && !m.quoted) {
            return Yaka.sendMessage(m.from, { text: `Please tag a user to *Unban*!` }, { quoted: m });
        }
        else if (m.quoted) {
            var mentionedUser = m.quoted.sender;
        }
        else {
            var mentionedUser = mentionByTag[0];
        }
        let userId = (await mentionedUser) || m.msg.contextInfo.participant;
        try {
            mku.findOne({ id: userId }).then(async (user) => {
                if (!user) {
                    return Yaka.sendMessage(m.from, { text: `@${mentionedUser.split("@")[0]} is not *Banned* !`, mentions: [mentionedUser] }, { quoted: m });
                }
                else {
                    if (user.ban == "false")
                        return Yaka.sendMessage(m.from, { text: `@${mentionedUser.split("@")[0]} is not *Banned* !`, mentions: [mentionedUser] }, { quoted: m });
                    await mku.findOneAndUpdate({ id: userId }, { ban: false }, { new: true });
                    return Yaka.sendMessage(m.from, { text: `@${mentionedUser.split("@")[0]} has been *Unbanned* Successfully! by *${pushName}*`, mentions: [mentionedUser] }, { quoted: m });
                }
            }).catch(error => {
                console.log(error);
                return Yaka.sendMessage(m.from, { text: `An internal error occurred while Unbanning the user.` }, { quoted: m });
            });
        }
        catch (err) {
            console.log(err);
            return Yaka.sendMessage(m.from, { text: `An internal error occurred while Unbanning the user.` }, { quoted: m });
        }
    },
};
//# sourceMappingURL=unban.js.map