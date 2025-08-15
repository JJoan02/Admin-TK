"use strict";
const mongoose = require("mongoose");
require("../../config.js");
require("../../Core.js");
const { mku, mk } = require("../../Database/dataschema.js");
const fs = require("fs");
require("../../Database/dataschema.js");
const config = require('../../config');
const eco = require('discord-mongoose-economy');
const ty = eco.connect(config.mongodb);
module.exports = {
    name: "wallet",
    desc: "Shows Wallet.",
    alias: ["wallet"],
    category: "Economy",
    react: "💲",
    start: async (Yaka, m, { text, prefix, isBotAdmin, isAdmin, mentionByTag, pushName, isCreator }) => {
        let user = m.sender;
        const cara = "cara";
        const balance = await eco.balance(user, cara);
        let buttons = [
            {
                buttonId: `${prefix}deposit ${balance.wallet}`,
                buttonText: { displayText: `Deposit All 💴` },
                type: 1,
            },
            {
                buttonId: `${prefix}Bank`,
                buttonText: { displayText: "Bank 🏦" },
                type: 1,
            },
        ];
        let buttonMessage = {
            image: fs.readFileSync("./Assets/Img/card.png"),
            caption: `\n💳 *${m.pushName}'s Wallet:*\n\n_💴 ${balance.wallet}_`,
            footer: `*${botName}*`,
            buttons: buttons,
            type: 4
        };
        await Yaka.sendMessage(m.from, buttonMessage, { quoted: m });
    }
};
//# sourceMappingURL=wallet.js.map