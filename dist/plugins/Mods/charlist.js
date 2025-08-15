"use strict";
module.exports = {
    name: "charlist",
    alias: ["characterlist", "botcharacterlist"],
    desc: "Ban a member",
    category: "Mods",
    usage: "setchar 0/1/2/3/4/5/6/7",
    react: "🧝‍♀️",
    start: async (Yaka, m, { text, prefix, modStatus }) => {
        let txt = `\n                  ＢＯＴ ＣＨＡＲＡＣＴＥＲ ＬＩＳＴ
       ━━━━━━━━━━━━━━━━━━━━━━
       
   \n\n╠ • 0 - 𝐘𝐚𝐤𝐚
     \n╠ • 🔥 𝘾𝙝𝙖𝙣𝙜𝙚 𝘽𝙤𝙩 𝘾𝙝𝙖𝙧𝙖𝙘𝙩𝙚𝙧 𝙩𝙤 Yaka (Akuma)
       \n╠ ═════════════════════
     \n╠ • 1 - 𝐁𝐞𝐧𝐢𝐦𝐚𝐫𝐮
     \n╠ • 🔥 𝘾𝙝𝙖𝙣𝙜𝙚 𝘽𝙤𝙩 𝘾𝙝𝙖𝙧𝙖𝙘𝙩𝙚𝙧 𝙩𝙤 Benimaru Shinmon
      \n╠ ══════════════════════
     \n╠ • 2 - 𝐏𝐨𝐰𝐞𝐫
     \n╠ • 🔥 𝘾𝙝𝙖𝙣𝙜𝙚 𝘽𝙤𝙩 𝘾𝙝𝙖𝙧𝙖𝙘𝙩𝙚𝙧 𝙩𝙤 Power
       \n╠ ═════════════════════
     \n╠ • 3 - 𝐇𝐢𝐧𝐚𝐭𝐚
     \n╠ • 🔥 𝘾𝙝𝙖𝙣𝙜𝙚 𝘽𝙤𝙩 𝘾𝙝𝙖𝙧𝙖𝙘𝙩𝙚𝙧 𝙩𝙤 Hinata Hyuuga
       \n╠ ═════════════════════
     \n╠ • 4 - 𝐎𝐛𝐢𝐭𝐨
     \n╠ • 🔥 𝘾𝙝𝙖𝙣𝙜𝙚 𝘽𝙤𝙩 𝘾𝙝𝙖𝙧𝙖𝙘𝙩𝙚𝙧 𝙩𝙤 Obito Uchiha
       \n╠ •════════════════════
     \n╠ • 5 - 𝐌𝐢𝐤𝐚𝐬𝐚
     \n╠ • 🔥 𝘾𝙝𝙖𝙣𝙜𝙚 𝘽𝙤𝙩 𝘾𝙝𝙖𝙧𝙖𝙘𝙩𝙚𝙧 𝙩𝙤 Mikasa Ackerman
       \n╠ ═════════════════════
     \n╠ • 6 - 𝐄𝐦𝐢𝐥𝐢𝐚
     \n╠ • 🔥 𝘾𝙝𝙖𝙣𝙜𝙚 𝘽𝙤𝙩 𝘾𝙝𝙖𝙧𝙖𝙘𝙩𝙚𝙧 𝙩𝙤 Emilia
       \n╠ ═════════════════════
     \n╠ • 7 - 𝐀𝐲𝐚𝐧𝐞
     \n╠ • 🔥 𝘾𝙝𝙖𝙣𝙜𝙚 𝘽𝙤𝙩 𝘾𝙝𝙖𝙧𝙖𝙘𝙩𝙚𝙧 𝙩𝙤 Ayane Shirakawa
       \n╠ ═════════════════════
     \n╠ • 8 - 𝐘𝐨𝐭𝐬𝐮𝐛𝐚
     \n╠ • 🔥 𝘾𝙝𝙖𝙣𝙜𝙚 𝘽𝙤𝙩 𝘾𝙝𝙖𝙧𝙖𝙘𝙩𝙚𝙧 𝙩𝙤 Yotsuba
       \n╠ ═════════════════════
     \n╠ • 9 - 𝐌𝐚𝐢
     \n╠ • 🔥 𝘾𝙝𝙖𝙣𝙜𝙚 𝘽𝙤𝙩 𝘾𝙝𝙖𝙧𝙖𝙘𝙩𝙚𝙧 𝙩𝙤 Mai Shirakawa
       \n╠ ═════════════════════
     \n╠ • 10 - 𝐓𝐨𝐡𝐫𝐮
     \n╠ • 🔥 𝘾𝙝𝙖𝙣𝙜𝙚 𝘽𝙤𝙩 𝘾𝙝𝙖𝙧𝙖𝙘𝙩𝙚𝙧 𝙩𝙤 Tohru Kobayashi
       \n╠ ═════════════════════
     \n╠ • 11 - 𝐌𝐚𝐫𝐢𝐧
     \n╠ • 🔥 𝘾𝙝𝙖𝙣𝙜𝙚 𝘽𝙤𝙩 𝘾𝙝𝙖𝙧𝙖𝙘𝙩𝙚𝙧 𝙩𝙤 Marin Kitagawa
       \n╠ ═════════════════════
     \n╠ • 12 - 𝐑𝐞𝐦
     \n╠ • 🔥 𝘾𝙝𝙖𝙣𝙜𝙚 𝘽𝙤𝙩 𝘾𝙝𝙖𝙧𝙖𝙘𝙩𝙚𝙧 𝙩𝙤 Rem
       \n╠ ═════════════════════
     \n╠ • 13 - 𝐌𝐚𝐤𝐢𝐦𝐚
     \n╠ • 🔥 𝘾𝙝𝙖𝙣𝙜𝙚 𝘽𝙤𝙩 𝘾𝙝𝙖𝙧𝙖𝙘𝙩𝙚𝙧 𝙩𝙤 Makima
       \n╠ ═════════════════════
     \n╠ • 14 - 𝐍𝐞𝐳𝐮𝐤𝐨
     \n╠ • 🔥 𝘾𝙝𝙖𝙣𝙜𝙚 𝘽𝙤𝙩 𝘾𝙝𝙖𝙧𝙖𝙘𝙩𝙚𝙧 𝙩𝙤 Nezuko 
       \n╠ ═════════════════════
     \n╠ • 15 - 𝐎𝐜𝐡𝐚𝐜𝐨
     \n╠ • 🔥 𝘾𝙝𝙖𝙣𝙜𝙚 𝘽𝙤𝙩 𝘾𝙝𝙖𝙧𝙖𝙘𝙩𝙚𝙧 𝙩𝙤 Ochako Uraraka
       \n╠ ═════════════════════
     \n╠ • 16 - 𝐀𝐪𝐮𝐚
     \n╠ • 🔥 𝘾𝙝𝙖𝙣𝙜𝙚 𝘽𝙤𝙩 𝘾𝙝𝙖𝙧𝙖𝙘𝙩𝙚𝙧 𝙩𝙤 Aqua
       \n╠ ═════════════════════
     \n╠ • 17 - 𝐅𝐮𝐛𝐮𝐤𝐢
     \n╠ • 🔥 𝘾𝙝𝙖𝙣𝙜𝙚 𝘽𝙤𝙩 𝘾𝙝𝙖𝙧𝙖𝙘𝙩𝙚𝙧 𝙩𝙤 Fubuki
       \n╠ ═════════════════════
     \n╠ • 18 - 𝐆𝐨𝐣𝐨
     \n╠ • 🔥 𝘾𝙝𝙖𝙣𝙜𝙚 𝘽𝙤𝙩 𝘾𝙝𝙖𝙧𝙖𝙘𝙩𝙚𝙧 𝙩𝙤 Gojo Satoru
       \n╠ ═════════════════════
     \n╠ • 19 - 𝐇𝐚𝐲𝐚𝐬𝐞
     \n╠ • 🔥 𝘾𝙝𝙖𝙣𝙜𝙚 𝘽𝙤𝙩 𝘾𝙝𝙖𝙧𝙖𝙘𝙩𝙚𝙧 𝙩𝙤 Hayase Nagatoro
       \n╠ ═════════════════════
     \n╠ • 20 - 𝐈𝐭𝐚𝐜𝐡𝐢
     \n╠ • 🔥 𝘾𝙝𝙖𝙣𝙜𝙚 𝘽𝙤𝙩 𝘾𝙝𝙖𝙧𝙖𝙘𝙩𝙚𝙧 𝙩𝙤 Itachi Uchiha
       \n╠ ═════════════════════
     \n╠ • 21 - 𝐒𝐡𝐨𝐤𝐨
     \n╠ • 🔥 𝘾𝙝𝙖𝙣𝙜𝙚 𝘽𝙤𝙩 𝘾𝙝𝙖𝙧𝙖𝙘𝙩𝙚𝙧 𝙩𝙤 Shoko komi
       \n╠ ═════════════════════
     \n╠ • 22 - 𝐊𝐮𝐫𝐮𝐦𝐢
     \n╠ • 🔥 𝘾𝙝𝙖𝙣𝙜𝙚 𝘽𝙤𝙩 𝘾𝙝𝙖𝙧𝙖𝙘𝙩𝙚𝙧 𝙩𝙤 Kurumi Tokisaki
       \n╠ ═════════════════════
     \n╠ • 23 - 𝐌𝐢𝐭𝐬𝐮𝐫𝐢
     \n╠ • 🔥 𝘾𝙝𝙖𝙣𝙜𝙚 𝘽𝙤𝙩 𝘾𝙝𝙖𝙧𝙖𝙘𝙩𝙚𝙧 𝙩𝙤 Mitsuri kanroji
       \n╠━━━━━━━━━━━━━━━━━━━━━━
    \n\nUsage => *${prefix}setchar {number of character}*
    \nMore characters coming soon...`;
        let botLogos = [];
        let sections = [];
        let chars = [];
        let buttonDesc = [];
        let buttonTexts = [];
        await Yaka.sendMessage(m.from, {
            video: { url: 'https://media.tenor.com/jWRFHjiNdkgAAAPo/anime-dance.mp4' },
            caption: txt,
            gifPlayback: true
        }, { quoted: m });
    },
};
//# sourceMappingURL=charlist.js.map