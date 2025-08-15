"use strict";
let { UploadFileUgu, webp2mp4File, TelegraPh } = require('../../lib/uploader');
const fs = require('fs');
const util = require('util');
module.exports = {
    name: "tourl",
    alias: ["makeurl"],
    desc: "To make a url from image/video/gif",
    category: "Utilities",
    usage: "sticker <reply to image>",
    react: "👹",
    start: async (Yaka, m, { text, prefix, quoted, pushName, mime, body }) => {
        let media = await Yaka.downloadAndSaveMediaMessage(quoted);
        let m2 = await quoted.download();
        if (/image/.test(mime)) {
            let anu = await TelegraPh(media);
            await Yaka.sendMessage(m.from, { image: m2, caption: `*Generated Image Link:* \n\n${util.format(anu)}\n` }, { quoted: m });
        }
        else if (!/image/.test(mime)) {
            m.reply(`Plese provide an image to generate a link!`);
        }
        await fs.unlinkSync(media);
    }
};
//# sourceMappingURL=tourl.js.map