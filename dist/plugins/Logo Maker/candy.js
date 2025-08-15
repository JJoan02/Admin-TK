"use strict";
const maker = require('mumaker');
module.exports = {
    name: "candy",
    alias: ["candy"],
    desc: "Make text logo.",
    react: "👹",
    category: "Logo Maker",
    start: async (Yaka, m, { pushName, prefix, text }) => {
        if (!text)
            return m.reply(`Example: *${prefix}candy Yaka Bot*`);
        maker.textpro("https://textpro.me/create-christmas-candy-cane-text-effect-1056.html", [
            `${text}`,
        ]).then((data) => Yaka.sendMessage(m.from, { image: { url: data }, caption: `Made by ${botName}` }, { quoted: m }))
            .catch((err) => m.reply('An Error occued !'));
    }
};
//# sourceMappingURL=candy.js.map