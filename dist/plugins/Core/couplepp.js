"use strict";
const axios = require("axios");
module.exports = {
    name: "couplepp",
    alias: ["ppcouple"],
    desc: "Get matching couple profile picture.",
    react: "💞",
    category: "Core",
    start: async (Yaka, m, { pushName, prefix }) => {
        let shibam = await axios.get('https://neko-couple-api.onrender.com');
        Yaka.sendMessage(m.from, { image: { url: shibam.data.male }, caption: `_For Him..._` }, { quoted: m });
        Yaka.sendMessage(m.from, { image: { url: shibam.data.female }, caption: `_For Her..._` }, { quoted: m });
    }
};
//# sourceMappingURL=couplepp.js.map