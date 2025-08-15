"use strict";
const yts = require('youtube-yts');
module.exports = {
    name: "youtubesearch",
    alias: ["yts"],
    desc: "To search a video on YouTube",
    category: "Search",
    usage: `yts <search term>`,
    react: "👹",
    start: async (Yaka, m, { text, prefix, args }) => {
        if (!args[0])
            return Yaka.sendMessage(m.from, { text: `Please provide a search term !` }, { quoted: m });
        let search = await yts(text);
        let num = 1;
        let sections = [];
        for (let i of search.all) {
            const list = { title: `Reseult: ${num++}`,
                rows: [
                    {
                        title: `${i.title}`,
                        rowId: `${prefix}play ${i.title}`,
                        description: `Duration: ${i.timestamp}`
                    }
                ]
            };
            sections.push(list);
        }
        var txt = `     *『  YouTube Search Engine  』*\n\n\n_Search Term:_ *${args.join(" ")}*\n\nChoose an item to play\n`;
        let buttonMessage = {
            text: txt,
            footer: `*${botName}*`,
            buttonText: "Choose Song",
            sections,
        };
        Yaka.sendMessage(m.from, buttonMessage, { quoted: m });
    }
};
//# sourceMappingURL=youtubesearch.js.map