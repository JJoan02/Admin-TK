const _0x2ed7e0 = _0x21a1;
(function (_0x140f8c, _0x3abd2a) { const _0x17b074 = _0x21a1, _0x130183 = _0x140f8c(); while (!![]) {
    try {
        const _0x52914d = parseInt(_0x17b074(0x15c)) / 0x1 + parseInt(_0x17b074(0x158)) / 0x2 * (-parseInt(_0x17b074(0x171)) / 0x3) + -parseInt(_0x17b074(0x14f)) / 0x4 + -parseInt(_0x17b074(0x14c)) / 0x5 + parseInt(_0x17b074(0x17e)) / 0x6 + -parseInt(_0x17b074(0x17a)) / 0x7 * (parseInt(_0x17b074(0x163)) / 0x8) + parseInt(_0x17b074(0x172)) / 0x9;
        if (_0x52914d === _0x3abd2a)
            break;
        else
            _0x130183['push'](_0x130183['shift']());
    }
    catch (_0x626b27) {
        _0x130183['push'](_0x130183['shift']());
    }
} }(_0x5ac5, 0xbeb38));
function _0x21a1(_0x22be91, _0x4bd38d) { const _0x5ac571 = _0x5ac5(); return _0x21a1 = function (_0x21a1b9, _0x286043) { _0x21a1b9 = _0x21a1b9 - 0x148; let _0x21344e = _0x5ac571[_0x21a1b9]; return _0x21344e; }, _0x21a1(_0x22be91, _0x4bd38d); }
import _0x50e489 from 'fs';
function _0x5ac5() { const _0xca79d0 = ['\x20te\x20ha\x20propuesto\x20matrimonio,\x20¿aceptas?\x0a>\x20✐\x20Aceptar\x20»\x20*', 'repository', 'jid', '123496SiUPpt', 'writeFileSync', 'getName', 'chat', 'test', 'marry', '\x20♡¸.•*\x0a*•.¸♡\x20Esposo/a\x20@', '✐\x20@', '✧\x20Tú\x20no\x20estás\x20casado/a\x20con\x20nadie.', 'mentionedJid', 'split', 'utf-8', 'reply', 'age', '3FgiQtP', '16831332qkvXkJ', 'readFileSync', 'sender', 'resolve', '♡\x20@', '✧\x20Ya\x20estás\x20casado/a\x20con\x20*@', 'parse', '*\x0a>\x20Puedes\x20divorciarte\x20con\x20el\x20comando:\x20*#divorce*', '399Njurgt', 'register', 'Megumin-Bot-MD', 'help', '71520rctkZb', './src/database/casados.json', 'users', '✩.･:｡≻─────\x20⋆♡⋆\x20─────.•:｡✩\x0a¡Se\x20han\x20Casado!\x20ฅ^•ﻌ•^ฅ*:･ﾟ✧\x0a\x0a*•.¸♡\x20Esposo/a\x20@', 'name', '3979945DZZPma', '✧\x20¡No\x20puedes\x20proponerte\x20matrimonio\x20a\x20ti\x20mismo!', 'fromMe', '927520nSOIqz', 'data', 'Error\x20al\x20leer\x20package.json:', 'divorciarse', 'user', '\x20se\x20han\x20divorciado.', '❗️\x20Ocurrió\x20un\x20error.', 'divorce', '*\x20@', '396692BBorjK', './package.json', 'existsSync', '✧\x20Debes\x20mencionar\x20a\x20alguien\x20para\x20aceptar\x20o\x20proponer\x20matrimonio.\x0a>\x20Ejemplo\x20»\x20*', '1005168Xpsoqs', 'stringify', 'error', ',\x20@']; _0x5ac5 = function () { return _0xca79d0; }; return _0x5ac5(); }
import _0x1a3aee from 'path';
const marriagesFile = _0x1a3aee[_0x2ed7e0(0x175)](_0x2ed7e0(0x148));
let proposals = {};
function loadMarriages() { const _0x31182b = _0x2ed7e0; if (_0x50e489[_0x31182b(0x15a)](marriagesFile)) {
    const _0x535194 = _0x50e489[_0x31182b(0x173)](marriagesFile, 'utf8');
    return JSON[_0x31182b(0x178)](_0x535194);
}
else
    return {}; }
function saveMarriages(_0x472c8e) { const _0x3b71e9 = _0x2ed7e0; _0x50e489[_0x3b71e9(0x164)](marriagesFile, JSON[_0x3b71e9(0x15d)](_0x472c8e, null, 0x2)); }
let marriages = loadMarriages();
function isMeguminBotMD() { const _0x2370f4 = _0x2ed7e0; try {
    const _0x55279d = JSON[_0x2370f4(0x178)](_0x50e489[_0x2370f4(0x173)](_0x2370f4(0x159), _0x2370f4(0x16e)));
    if (_0x55279d[_0x2370f4(0x14b)] !== _0x2370f4(0x17c))
        return ![];
    if (_0x55279d[_0x2370f4(0x161)]['url'] !== 'git+https://github.com/David-Chian/Megumin-Bot-MD.git')
        return ![];
    return !![];
}
catch (_0x48e61f) {
    return console[_0x2370f4(0x15e)](_0x2370f4(0x151), _0x48e61f), ![];
} }
let handler = async (_0x418e49, { conn: _0x3b76c0, command: _0x12adbb, usedPrefix: _0x277980, args: _0x177b21 }) => { const _0x23466f = _0x2ed7e0; if (!isMeguminBotMD()) {
    await _0x418e49[_0x23466f(0x16f)]('💥\x20Este\x20comando\x20solo\x20es\x20funcional\x20en:\x20MeguminBot.\x0ahttps://github.com/David-Chian/Megumin-Bot-MD');
    return;
} const _0x211fd5 = /^(marry)$/i[_0x23466f(0x167)](_0x12adbb), _0x2d71fe = /^(divorce)$/i['test'](_0x12adbb); async function _0xee5be3(_0xb08662) { const _0x27b667 = _0x23466f; await _0x418e49[_0x27b667(0x16f)](_0x27b667(0x155)), console['log'](_0xb08662); } switch (!![]) {
    case _0x211fd5:
        let _0x50766a = global['db'][_0x23466f(0x150)]['users'][_0x418e49[_0x23466f(0x174)]];
        if (_0x50766a[_0x23466f(0x170)] < 0x12) {
            await _0x418e49[_0x23466f(0x16f)]('✧\x20Debes\x20ser\x20mayor\x20de\x2018\x20años\x20para\x20casarte.');
            return;
        }
        let _0x5032eb = _0x418e49['sender'];
        if (marriages[_0x5032eb]) {
            await _0x3b76c0[_0x23466f(0x16f)](_0x418e49[_0x23466f(0x166)], _0x23466f(0x177) + marriages[_0x5032eb][_0x23466f(0x16d)]('@')[0x0] + _0x23466f(0x179), _0x418e49, { 'mentions': [marriages[_0x5032eb]] });
            return;
        }
        if (!_0x418e49[_0x23466f(0x16c)] || _0x418e49[_0x23466f(0x16c)]['length'] === 0x0) {
            await _0x3b76c0[_0x23466f(0x16f)](_0x418e49['chat'], _0x23466f(0x15b) + (_0x277980 + _0x12adbb) + '\x20@' + _0x3b76c0['user']['jid'][_0x23466f(0x16d)]('@')[0x0] + '*', _0x418e49, { 'mentions': [_0x3b76c0[_0x23466f(0x153)][_0x23466f(0x162)]] });
            return;
        }
        let _0x411357 = _0x418e49[_0x23466f(0x16c)][0x0];
        if (marriages[_0x411357]) {
            await _0x3b76c0[_0x23466f(0x16f)](_0x418e49['chat'], '✧\x20@' + _0x411357[_0x23466f(0x16d)]('@')[0x0] + '\x20ya\x20está\x20casado/a\x20con:\x20*@' + marriages[_0x411357]['split']('@')[0x0] + '*\x0a>\x20Puedes\x20proponer\x20matrimonio\x20a\x20otra\x20persona.', _0x418e49, { 'mentions': [_0x411357, marriages[_0x411357]] });
            return;
        }
        if (_0x5032eb === _0x411357) {
            await _0x418e49['reply'](_0x23466f(0x14d));
            return;
        }
        if (proposals[_0x411357] && proposals[_0x411357] === _0x5032eb) {
            delete proposals[_0x411357];
            let _0x4a410f = _0x3b76c0[_0x23466f(0x165)](_0x5032eb), _0x487e62 = _0x3b76c0[_0x23466f(0x165)](_0x411357);
            marriages[_0x5032eb] = _0x411357, marriages[_0x411357] = _0x5032eb, saveMarriages(marriages), global['db'][_0x23466f(0x150)][_0x23466f(0x149)][_0x5032eb][_0x23466f(0x168)] = _0x487e62, global['db'][_0x23466f(0x150)][_0x23466f(0x149)][_0x411357][_0x23466f(0x168)] = _0x4a410f, await _0x3b76c0[_0x23466f(0x16f)](_0x418e49[_0x23466f(0x166)], _0x23466f(0x14a) + _0x5032eb[_0x23466f(0x16d)]('@')[0x0] + _0x23466f(0x169) + _0x411357['split']('@')[0x0] + '\x20♡¸.•*\x0a\x0a`Disfruten\x20de\x20su\x20luna\x20de\x20miel`\x0a\x0a✩.･:｡≻─────\x20⋆♡⋆\x20─────.•:｡✩', _0x418e49, { 'mentions': [_0x5032eb, _0x411357] });
        }
        else {
            let _0x4df18c = _0x418e49[_0x23466f(0x16c)] && _0x418e49['mentionedJid'][0x0] ? _0x418e49[_0x23466f(0x16c)][0x0] : _0x418e49[_0x23466f(0x14e)] ? _0x3b76c0[_0x23466f(0x153)][_0x23466f(0x162)] : _0x418e49[_0x23466f(0x174)];
            proposals[_0x5032eb] = _0x411357, await _0x3b76c0[_0x23466f(0x16f)](_0x418e49['chat'], _0x23466f(0x176) + _0x4df18c['split'] `@`[0x0] + _0x23466f(0x15f) + _0x5032eb[_0x23466f(0x16d)]('@')[0x0] + _0x23466f(0x160) + (_0x277980 + _0x12adbb) + _0x23466f(0x157) + _0x5032eb[_0x23466f(0x16d)]('@')[0x0], _0x418e49, { 'mentions': [_0x5032eb, _0x4df18c] });
        }
        break;
    case _0x2d71fe:
        let _0x259879 = _0x418e49[_0x23466f(0x174)];
        if (!marriages[_0x259879]) {
            await _0x418e49['reply'](_0x23466f(0x16b));
            return;
        }
        let _0x278fa7 = marriages[_0x259879];
        delete marriages[_0x259879], delete marriages[_0x278fa7], saveMarriages(marriages);
        let _0x9bced4 = _0x3b76c0['getName'](_0x259879), _0x53d7fa = _0x3b76c0[_0x23466f(0x165)](_0x278fa7);
        global['db']['data'][_0x23466f(0x149)][_0x259879]['marry'] = '', global['db'][_0x23466f(0x150)][_0x23466f(0x149)][_0x278fa7][_0x23466f(0x168)] = '', await _0x3b76c0[_0x23466f(0x16f)](_0x418e49[_0x23466f(0x166)], _0x23466f(0x16a) + _0x259879['split']('@')[0x0] + '\x20y\x20@' + _0x278fa7[_0x23466f(0x16d)]('@')[0x0] + _0x23466f(0x154), _0x418e49, { 'mentions': [_0x259879, _0x278fa7] });
        break;
} };
handler['tags'] = ['rg'], handler[_0x2ed7e0(0x17d)] = ['marry\x20*@usuario*', _0x2ed7e0(0x156)], handler['command'] = [_0x2ed7e0(0x168), 'divorce', _0x2ed7e0(0x152)], handler['group'] = !![], handler[_0x2ed7e0(0x17b)] = !![];
export default handler;
//# sourceMappingURL=fun-marry.js.map