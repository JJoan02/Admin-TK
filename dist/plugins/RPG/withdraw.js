"use strict";
const mongoose = require("mongoose");
require("../../config.js");
require("../../Core.js");
const { mku, mk } = require("../../Database/dataschema.js");
const fs = require("fs");
const config = require('../../config');
const eco = require('discord-mongoose-economy');
const ty = eco.connect(config.mongodb);
module.exports = {
    name: "withdraw",
    desc: "withdraw money from bank account.",
    alias: ["withdraw"],
    category: "Economy",
    react: "💳",
    start: async (Yaka, m, { text, prefix, isBotAdmin, isAdmin, mentionByTag, pushName, isCreator }) => {
        if (!text) {
            return Yaka.sendMessage(m.from, { text: `*Provide the amount you want to withdraw!*` }, { quoted: m });
        }
        const user = m.sender;
        const query = text.trim();
        const cara = 'cara';
        const withdraw = await eco.withdraw(user, cara, query);
        if (withdraw.noten)
            Yaka.sendMessage(m.from, { text: '*🏧 Insufficient fund in bank*' }, { quoted: m });
        const add = eco.give(user, cara, query);
        Yaka.sendMessage(m.from, { image: fs.readFileSync("./Assets/Img/card.png"), caption: `*🏧 ALERT*  _💶 ${withdraw.amount} has been added in your wallet._*` }, { quoted: m });
    }
};
//# sourceMappingURL=withdraw.js.map