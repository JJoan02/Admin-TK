import { promises } from 'fs';
import { join } from 'path';
import fetch from 'node-fetch';
import { xpRange } from '../lib/levelling.js';
let tags = {
    'main': 'I͜͡N͜͡F͜͡O͜͡',
    'search': 'S͜͡E͜͡A͜͡R͜͡C͜͡H͜͡',
    'game': 'G͜͡A͜͡M͜͡E͜͡',
    'serbot': 'B͜͡O͜͡T͜͡S͜͡',
    'rpg': 'R͜͡P͜͡G͜͡',
    'rg': 'R͜͡E͜͡G͜͡I͜͡S͜͡T͜͡R͜͡O͜͡',
    'sticker': 'S͜͡T͜͡I͜͡C͜͡K͜͡E͜͡R͜͡S͜͡',
    'img': 'I͜͡M͜͡A͜͡G͜͡E͜͡',
    'group': 'G͜͡R͜͡U͜͡P͜͡O͜͡',
    'nable': 'O͜͡N͜͡ ⟺ O͜͡F͜͡F͜͡',
    'premium': 'P͜͡R͜͡E͜͡M͜͡I͜͡U͜͡M͜͡',
    'downloader': 'D͜͡E͜͡S͜͡C͜͡A͜͡R͜͡G͜͡A͜͡S͜͡',
    'tools': 'T͜͡O͜͡O͜͡L͜͡S͜͡',
    'fun': 'F͜͡U͜͡N͜͡',
    'nsfw': 'N͜͡S͜͡F͜͡W͜͡',
    'cmd': 'D͜͡A͜͡T͜͡A͜͡B͜͡A͜͡S͜͡E͜͡',
    'owner': 'O͜͡W͜͡N͜͡E͜͡R͜͡',
    'audio': 'A͜͡U͜͡D͜͡I͜͡O͜͡S͜͡',
    'advanced': 'A͜͡D͜͡V͜͡A͜͡N͜͡C͜͡E͜͡',
};
const defaultMenu = {
    before: `


"> /)_/)
(,,>.<)  <(𝑯𝒐𝒍𝒂!)
/ >❤️ 𝑴𝒊 𝒏𝒐𝒎𝒃𝒓𝒆 𝒆𝒔 *𝑨𝒊 𝑯𝒐𝒔𝒉𝒊𝒏𝒐*, 
%greeting 

    ══════⊹⊱≼≽⊰⊹══════
   ╭══• ೋ•✧๑♡๑✧•ೋ •══╮
   
   *𖣔 𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝑻𝒆𝒂𝒎 𝑨𝒔𝒄𝒆𝒏𝒅* 
   *𝑪𝒂𝒏𝒂𝒍 𝑶𝒇𝒊𝒄𝒊𝒂𝒍* : https://whatsapp.com/channel/0029Vak9Hmd1iUxdfDUdCK1w
   
   ╰══• ೋ•✧๑♡๑✧•ೋ •══╯

%readmore

   ══════⊹⊱≼≽⊰⊹══════
╭══• ೋ•✧๑♡๑✧•ೋ •══╮
 
 𖣔 𝑺𝒊 𝒒𝒖𝒊𝒆𝒓𝒆𝒔 𝒔𝒆𝒓 𝒑𝒂𝒓𝒕𝒆 𝒅𝒆𝒍 𝒕𝒆𝒂𝒎 𝒖𝒔𝒂 𝒍𝒐𝒔 𝒄𝒐𝒎𝒂𝒏𝒅𝒐𝒔 
 *#𝒄𝒐𝒅𝒆/#𝒔𝒆𝒓𝒃𝒐𝒕* 𝒚 𝒔𝒊𝒈𝒖𝒆 𝒍𝒐𝒔 𝒑𝒂𝒔𝒐𝒔 
   
╰══• ೋ•✧๑♡๑✧•ೋ •══╯
%readmore

*✧･ﾟ: *✧･ﾟ:* 💞　*:･ﾟ✧*:･ﾟ✧*

\t\t\t*🅼 🅴 🅽 🆄 ➸ 🅲 🅾︎ 🅼 🅿︎ 🅻 🅴 🆃 🅾︎*

`.trimStart(),
    header: ' ≈☆≈ [ ᪥ `M͜͡E͜͡N͜͡U͜͡ ✯ %category` ♡ ] ≈☆≈ \n│ ≈☆≈ ',
    body: '> 💖│%cmd %islimit %isPremium\n',
    footer: '│•——————•°•᪥•°•——————•···\n╰•——————•°•᪥•°•——————•═┅═•——————•°•᪥•°•——————•\n',
    after: `> 🚩 ${textbot}`,
};
let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
    try {
        let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {};
        let { exp, limit, level } = global.db.data.users[m.sender];
        let { min, xp, max } = xpRange(level, global.multiplier);
        let name = await conn.getName(m.sender);
        let d = new Date(new Date + 3600000);
        let locale = 'es';
        let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5];
        let week = d.toLocaleDateString(locale, { weekday: 'long' });
        let date = d.toLocaleDateString(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(d);
        let time = d.toLocaleTimeString(locale, {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        });
        let _uptime = process.uptime() * 1000;
        let _muptime;
        if (process.send) {
            process.send('uptime');
            _muptime = await new Promise(resolve => {
                process.once('message', resolve);
                setTimeout(resolve, 1000);
            }) * 1000;
        }
        let muptime = clockString(_muptime);
        let uptime = clockString(_uptime);
        let totalreg = Object.keys(global.db.data.users).length;
        let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length;
        let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
            return {
                help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
                tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
                prefix: 'customPrefix' in plugin,
                limit: plugin.limit,
                premium: plugin.premium,
                enabled: !plugin.disabled,
            };
        });
        for (let plugin of help)
            if (plugin && 'tags' in plugin)
                for (let tag of plugin.tags)
                    if (!(tag in tags) && tag)
                        tags[tag] = tag;
        conn.menu = conn.menu ? conn.menu : {};
        let before = conn.menu.before || defaultMenu.before;
        let header = conn.menu.header || defaultMenu.header;
        let body = conn.menu.body || defaultMenu.body;
        let footer = conn.menu.footer || defaultMenu.footer;
        let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : ``) + defaultMenu.after;
        let _text = [
            before,
            ...Object.keys(tags).map(tag => {
                return header.replace(/%category/g, tags[tag]) + '\n' + [
                    ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
                        return menu.help.map(help => {
                            return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                                .replace(/%islimit/g, menu.limit ? '◜🌊◞' : '')
                                .replace(/%isPremium/g, menu.premium ? '◜🪪◞' : '')
                                .trim();
                        }).join('\n');
                    }),
                    footer
                ].join('\n');
            }),
            after
        ].join('\n');
        let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : '';
        let replace = {
            '%': '%',
            p: _p, uptime, muptime,
            taguser: '@' + m.sender.split("@s.whatsapp.net")[0],
            wasp: '@0',
            me: conn.getName(conn.user.jid),
            npmname: _package.name,
            version: _package.version,
            npmdesc: _package.description,
            npmmain: _package.main,
            author: _package.author.name,
            license: _package.license,
            exp: exp - min,
            maxexp: xp,
            totalexp: exp,
            xp4levelup: max - exp,
            github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
            greeting, level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg,
            readmore: readMore
        };
        text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join `|`})`, 'g'), (_, name) => '' + replace[name]);
        let pp = 'https://telegra.ph/file/4c3e4b782c82511b3874d.mp4';
        let pp2 = 'https://telegra.ph/file/d8c5e18ab0cfc10511f63.mp4';
        let pp3 = 'https://telegra.ph/file/96e471a87971e2fb4955f.mp4';
        let pp4 = 'https://telegra.ph/file/09b920486c3c291f5a9e6.mp4';
        let pp5 = 'https://telegra.ph/file/4948429d0ab0212e9000f.mp4';
        let pp6 = 'https://telegra.ph/file/cab0bf344ba83d79c1a47.mp4';
        let pp7 = 'https://telegra.ph/file/6d89bd150ad55db50e332.mp4';
        let pp8 = 'https://telegra.ph/file/e2f791011e8d183bd6b50.mp4';
        let pp9 = 'https://telegra.ph/file/546a6a2101423efcce4bd.mp4';
        let pp10 = 'https://telegra.ph/file/930b9fddde1034360fd86.mp4';
        let pp11 = 'https://telegra.ph/file/81da492e08bfdb4fda695.mp4';
        let pp12 = 'https://telegra.ph/file/ec8393df422d40f923e00.mp4';
        let pp13 = 'https://telegra.ph/file/ba7c4a3eb7bf3d892b0c8.mp4';
        let pp14 = 'https://tinyurl.com/ymlqb6ml';
        let pp15 = 'https://tinyurl.com/ykv7g4zy';
        let gifUrl = "https://telegra.ph/file/4c3e4b782c82511b3874d.mp4";
        await conn.sendMessage(m.chat, { video: { url: gifUrl }, gifPlayback: true, caption: text.trim(), mentions: [m.sender] }, { quoted: m });
        await m.react('💌');
        await conn.sendFile(m.chat, img, 'thumbnail.mp4', text.trim(), m, null);
    }
    catch (e) {
        conn.reply(m.chat, '╚═ ✰ ═ ✮ :𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 : ᪥𝑻𝒆𝒂𝒎 𝑨𝒔𝒄𝒆𝒏𝒅: ✮ ═ ✰ ═╝ ', m);
        throw e;
    }
};
handler.help = ['nakano'];
handler.tags = ['main'];
handler.command = ['menu', 'help', 'menú'];
handler.register = true;
export default handler;
const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);
function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}
var ase = new Date();
var hour = ase.getHours();
switch (hour) {
    case 0:
        hour = 'una linda noche 🌙';
        break;
    case 1:
        hour = 'una linda noche 💤';
        break;
    case 2:
        hour = 'una linda noche 🦉';
        break;
    case 3:
        hour = 'una linda mañana ✨';
        break;
    case 4:
        hour = 'una linda mañana 💫';
        break;
    case 5:
        hour = 'una linda mañana 🌅';
        break;
    case 6:
        hour = 'una linda mañana 🌄';
        break;
    case 7:
        hour = 'una linda mañana 🌅';
        break;
    case 8:
        hour = 'una linda mañana 💫';
        break;
    case 9:
        hour = 'una linda mañana ✨';
        break;
    case 10:
        hour = 'un lindo dia 🌞';
        break;
    case 11:
        hour = 'un lindo dia 🌨';
        break;
    case 12:
        hour = 'un lindo dia ❄';
        break;
    case 13:
        hour = 'un lindo dia 🌤';
        break;
    case 14:
        hour = 'una linda tarde 🌇';
        break;
    case 15:
        hour = 'una linda tarde 🥀';
        break;
    case 16:
        hour = 'una linda tarde 🌹';
        break;
    case 17:
        hour = 'una linda tarde 🌆';
        break;
    case 18:
        hour = 'una linda noche 🌙';
        break;
    case 19:
        hour = 'una linda noche 🌃';
        break;
    case 20:
        hour = 'una linda noche 🌌';
        break;
    case 21:
        hour = 'una linda noche 🌃';
        break;
    case 22:
        hour = 'una linda noche 🌙';
        break;
    case 23:
        hour = 'una linda noche 🌃';
        break;
}
var greeting = "espero que tengas " + hour;
//# sourceMappingURL=main-menu.js.map