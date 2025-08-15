"use strict";
const mongoose = require("mongoose");
require("../../config.js");
require("../../Core.js");
const { mkchar, mku } = require("../../Database/dataschema.js");
module.exports = {
    name: "chatbotpm",
    alias: ["pmautochat", "autoreplypm", "chatbotgroup", "pmchatbot"],
    desc: "Enable or disable the autoreply feature in a group",
    category: "Mods",
    usage: "pmchatbot [on/off]",
    react: "🍃",
    start: async (Yaka, m, { args, isBotAdmin, isAdmin, isCreator, reply, prefix, pushName, modStatus }) => {
        if (modStatus == "false" && !isCreator)
            return m.reply('Sorry, only my *Devs* and *Mods* can use this command !');
        let checkdata = await mkchar.findOne({ id: '1' });
        if (args[0] === "on") {
            if (!checkdata) {
                await new mkchar({ id: '1', PMchatBot: "true" }).save();
                Yaka.sendMessage(m.from, {
                    text: `*PM Chatbot Activated! *\n\nBot will reply to all personal messages.`
                }, { quoted: m });
                return Yaka.sendMessage(m.from, { text: `*PM Chatbot Activated !*\n\nBot will reply to all personal messages.` }, { quoted: m });
            }
            else {
                if (checkdata.PMchatBot == "true")
                    return Yaka.sendMessage(m.from, { text: `*Already activated.*\n\nBot will reply to all personal messages.` }, { quoted: m });
                await mkchar.updateOne({ id: '1' }, { PMchatBot: "true" });
                return Yaka.sendMessage(m.from, { text: `*PM Chatbot Activated !*` }, { quoted: m });
            }
        }
        else if (args[0] === "off") {
            if (!checkdata) {
                await new mkchar({ id: '1', PMchatBot: "false" }).save();
                return Yaka.sendMessage(m.from, { text: `*PM Group Chatbot De-Activated!*` }, { quoted: m });
            }
            else {
                if (checkdata.PMchatBot == "false")
                    return Yaka.sendMessage(m.from, { text: `*Already deactivated.*` }, { quoted: m });
                await mkchar.updateOne({ id: '1' }, { PMchatBot: "false" });
                return Yaka.sendMessage(m.from, { text: `*PM Chatbot De-Activated !*` }, { quoted: m });
            }
        }
        else {
            let buttonsntilink = [
                {
                    buttonId: `${prefix}pmchatbot on`,
                    buttonText: { displayText: "On" },
                    type: 1,
                },
                {
                    buttonId: `${prefix}pmchatbot off`,
                    buttonText: { displayText: "Off" },
                    type: 1,
                },
            ];
            let bmffg = {
                image: { url: botImage6 },
                caption: `\n *「  PM Chatbot configuration  」*\n\nPlease click the button below\n*On / Off*\n`,
                footer: `*${botName}*`,
                buttons: buttonsntilink,
                headerType: 4,
            };
            await Yaka.sendMessage(m.from, bmffg, { quoted: m });
        }
    },
};
//# sourceMappingURL=pmchatbot.js.map