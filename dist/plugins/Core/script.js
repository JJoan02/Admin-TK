"use strict";
const axios = require('axios');
const fs = require('fs');
module.exports = {
    name: "script",
    alias: ["repo", "sc", "sourcecode"],
    desc: "Say hello to bot.",
    react: "📃",
    category: "Core",
    start: async (Yaka, m, { pushName, prefix }) => {
        let picURL = fs.readFileSync('./Page/yaka.jpg');
        let repoInfo = await axios.get('https://api.github.com/repos/Yakashi13/Yaka-bot');
        let repo = repoInfo.data;
        let txt = `      ⭕️ *| Y A K A  B O T's Script |* ⭕️\n\n*🔄 Total Forks:* ${repo.forks_count}\n*⭐ Total Stars:* ${repo.stargazers_count}\n*📜 License:* ${repo.license.name}\n*📁 Repo Size:* ${(repo.size / 1024).toFixed(2)} MB\n*📅 Last Updated:* ${repo.updated_at}\n\n*❝ Thanks For Using *Y A K A - B O T.* ❞\n\n*©️ 𝖄𝖆𝖐𝖆𝖘𝖍𝖎 - 2023*`;
        await Yaka.sendMessage(m.from, { image: picURL, caption: txt }, { quoted: m });
    }
};
//# sourceMappingURL=script.js.map