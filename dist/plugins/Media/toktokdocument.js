"use strict";
module.exports = {
    name: "tiktokdocument",
    alias: ["tiktokdoc"],
    desc: "To download a tiktok audio as document",
    category: "Media",
    usage: `tiktokdoc <link>`,
    react: "👹",
    start: async (Yaka, m, { text, prefix, args, mime }) => {
        if (!args[0])
            return Yaka.sendMessage(m.from, { text: `Please provide a Tiktok Video link !` }, { quoted: m });
        if (!args[0].includes("tiktok")) {
            return m.reply("Please provide a valid Tiktok link!");
        }
        require('../../lib/tiktokScrapper').Tiktok(args[0]).then(data => {
            Yaka.sendMessage(m.from, { document: { url: data.audio }, mimetype: "audio/mpeg", fileName: `Downloaded by ${botName}.mp3`, }, { quoted: m });
        });
    },
};
//# sourceMappingURL=toktokdocument.js.map