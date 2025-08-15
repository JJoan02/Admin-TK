"use strict";
const maker = require('mumaker');
module.exports = {
    name: "bokeh",
    alias: ["bokehstyle", "bokeheffect"],
    desc: "Make text logo.",
    react: "👹",
    category: "Logo Maker",
    start: async (Yaka, m, { pushName, prefix, text }) => {
        if (!text)
            return m.reply(`Example: *${prefix}bokeh Yaka Bot*`);
        maker.textpro("https://textpro.me/bokeh-text-effect-876.html", [
            `${text}`,
        ]).then((data) => Yaka.sendMessage(m.from, { image: { url: data }, caption: `Made by ${botName}` }, { quoted: m }))
            .catch((err) => m.reply('An Error occued !'));
    }
};
//# sourceMappingURL=bokeh.js.map