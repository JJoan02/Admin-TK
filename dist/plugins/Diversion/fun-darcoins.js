import _0x32dc00 from '@whiskeysockets/baileys';
let pajak = 0x0, handler = async (_0x434612, { conn: _0x237f6b, text: _0x390afc }) => { let _0x14ff57; if (_0x434612['isGroup'])
    _0x14ff57 = _0x434612['mentionedJid'][0x0];
else
    _0x14ff57 = _0x434612['chat']; if (!_0x14ff57)
    throw 'Etiqueta a la persona y escribe la cantidad.\nEjemplo :\n\n.darcoins @kevin 50'; let _0x1f5ba0 = _0x390afc['replace']('@' + _0x14ff57['split'] `@`[0x0], '')['trim'](); if (!_0x1f5ba0)
    throw '[❗] 𝙥𝙤𝙣 𝙡𝙖 𝙘𝙖𝙣𝙩𝙞𝙙𝙖𝙙 𝙦𝙪𝙚 𝙦𝙪𝙞𝙚𝙧𝙖𝙨'; if (isNaN(_0x1f5ba0))
    throw '[❗] ¡𝙪𝙨𝙖 𝙣𝙪𝙢𝙚𝙧𝙤𝙨, 𝙣𝙤 𝙨𝙞𝙢𝙗𝙤𝙡𝙤𝙨!'; let _0x1e02e4 = parseInt(_0x1f5ba0), _0x1fd243 = _0x1e02e4, _0x51d7ff = Math['ceil'](_0x1e02e4 * pajak); _0x1fd243 += _0x51d7ff; if (_0x1fd243 < 0x1)
    throw '[❗] 𝙚𝙡 𝙣𝙪𝙢𝙚𝙧𝙤 𝙢𝙖𝙭𝙞𝙢𝙤 𝙖 𝙨𝙪𝙢𝙖𝙧 𝙚𝙨 1'; let _0x41aa9d = global['db']['data']['users']; _0x41aa9d[_0x14ff57]['money'] += _0x1e02e4, _0x434612['reply']('≡\x20👌 *𝙇𝙀 𝘿𝙄𝙎𝙏𝙀 𝙈𝙊𝙉𝙀𝘿𝘼𝙎*\x0a┌──────────────\x0a▢\x20*𝙏𝙊𝙏𝘼𝙇:*\x20' + _0x1e02e4 + '\x0a└──────────────'); };
handler['command'] = ['añadircoins', 'darcoins'], handler['admin'] = !![];
export default handler;
//# sourceMappingURL=fun-darcoins.js.map