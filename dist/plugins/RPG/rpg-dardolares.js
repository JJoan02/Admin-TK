import _0x2115af from '@whiskeysockets/baileys';
let pajak = 0x0, handler = async (_0x5454bd, { conn: _0x8ba397, text: _0x1cd1b2 }) => { let _0x268973; if (_0x5454bd['isGroup'])
    _0x268973 = _0x5454bd['mentionedJid'][0x0];
else
    _0x268973 = _0x5454bd['chat']; if (!_0x268973)
    throw 'Etiqueta a la persona y escribe la cantidad.\nEjemplo :\n\n.dardolares @kevin 50'; let _0x5ec106 = _0x1cd1b2['replace']('@' + _0x268973['split'] `@`[0x0], '')['trim'](); if (!_0x5ec106)
    throw '[❗] 𝙄𝙣𝙜𝙧𝙚𝙨𝙖 𝙡𝙖 𝙘𝙖𝙣𝙩𝙞𝙙𝙖𝙙 𝙙𝙚 𝙙𝙤𝙡𝙖𝙧𝙚𝙨 𝙦𝙪𝙚 𝙙𝙚𝙨𝙚𝙖𝙨 𝙖𝙜𝙧𝙚𝙜𝙖𝙧'; if (isNaN(_0x5ec106))
    throw '[❗] ¡𝙀𝙡 𝙨𝙞𝙢𝙗𝙤𝙡𝙤 𝙣𝙤 𝙚𝙨 𝙫𝙖𝙡𝙞𝙙𝙤, 𝙨𝙤𝙡𝙤 𝙣𝙪𝙢𝙚𝙧𝙤𝙨! '; let _0x2da25b = parseInt(_0x5ec106), _0x5c6808 = _0x2da25b, _0x3379a0 = Math['ceil'](_0x2da25b * pajak); _0x5c6808 += _0x3379a0; if (_0x5c6808 < 0x1)
    throw '[❗] 𝙇𝙖 𝙘𝙖𝙣𝙩𝙞𝙙𝙖𝙙 𝙢𝙞𝙣𝙞𝙢𝙖 𝙙𝙚 𝙙𝙤𝙡𝙖𝙧𝙚𝙨 𝙥𝙖𝙧𝙖 𝙖𝙜𝙧𝙚𝙜𝙖𝙧 𝙚𝙨 1'; let _0x2d54e1 = global['db']['data']['users']; _0x2d54e1[_0x268973]['joincount'] += _0x2da25b, _0x5454bd['reply']('≡\x20*💵\x20𝙏𝙧𝙖𝙣𝙨𝙛𝙚𝙧𝙞𝙨𝙩𝙚*\x0a┌──────────────\x0a▢\x20*𝙏𝙤𝙩𝙖𝙡:*\x20' + _0x2da25b + '\x0a└──────────────'); };
handler['command'] = ['añadirdolares', 'dardolares'], handler['admin'] = !![];
export default handler;
//# sourceMappingURL=rpg-dardolares.js.map