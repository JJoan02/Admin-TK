"use strict";
const maker = require('mumaker');
module.exports = {
    name: "transformar",
    alias: ["transformer"],
    desc: "Make text logo.",
    react: "👹",
    category: "Logo Maker",
    start: async (Yaka, m, { pushName, prefix, text }) => {
        if (!text)
            return m.reply(`Example: *${prefix}transformer Yaka Bot*`);
        maker.textpro("https://textpro.me/create-a-transformer-text-effect-online-1035.html", [
            `${text}`,
        ]).then((data) => Yaka.sendMessage(m.from, { image: { url: data }, caption: `Made by ${botName}` }, { quoted: m }))
            .catch((err) => m.reply('An Error occued !'));
    }
};
//# sourceMappingURL=transformer.js.map