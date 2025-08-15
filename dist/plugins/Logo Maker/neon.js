"use strict";
const maker = require('mumaker');
module.exports = {
    name: "neon",
    alias: ["neonstyle"],
    desc: "Make text logo.",
    react: "👹",
    category: "Logo Maker",
    start: async (Yaka, m, { pushName, prefix, text }) => {
        if (!text)
            return m.reply(`Example: *${prefix}neon Yaka Bot*`);
        maker.textpro("https://textpro.me/neon-text-effect-online-879.html", [
            `${text}`,
        ]).then((data) => Yaka.sendMessage(m.from, { image: { url: data }, caption: `Made by ${botName}` }, { quoted: m }))
            .catch((err) => m.reply('An Error occued !'));
    }
};
//# sourceMappingURL=neon.js.map