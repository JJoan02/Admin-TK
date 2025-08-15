"use strict";
const maker = require('mumaker');
module.exports = {
    name: "neonlight",
    alias: ["neonlighteffect"],
    desc: "Make text logo.",
    react: "👹",
    category: "Logo Maker",
    start: async (Yaka, m, { pushName, prefix, text }) => {
        if (!text)
            return m.reply(`Example: *${prefix}neonlight Yaka Bot*`);
        maker.textpro("https://textpro.me/neon-light-text-effect-with-galaxy-style-981.html", [
            `${text}`,
        ]).then((data) => Yaka.sendMessage(m.from, { image: { url: data }, caption: `Made by ${botName}` }, { quoted: m }))
            .catch((err) => m.reply('An Error occued !'));
    }
};
//# sourceMappingURL=neonlight.js.map