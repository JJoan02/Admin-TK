function _0x1f63(_0xf33abc, _0x3a9bdc) { const _0x2efa3a = _0x2efa(); return _0x1f63 = function (_0x1f63af, _0x49fa27) { _0x1f63af = _0x1f63af - 0xa0; let _0x12991b = _0x2efa3a[_0x1f63af]; return _0x12991b; }, _0x1f63(_0xf33abc, _0x3a9bdc); }
const _0x1ffbd6 = _0x1f63;
(function (_0x3662b5, _0x3d71c7) { const _0xc94e3e = _0x1f63, _0x2a7aeb = _0x3662b5(); while (!![]) {
    try {
        const _0x5df695 = -parseInt(_0xc94e3e(0xa4)) / 0x1 * (-parseInt(_0xc94e3e(0xba)) / 0x2) + parseInt(_0xc94e3e(0xa7)) / 0x3 * (parseInt(_0xc94e3e(0xa6)) / 0x4) + -parseInt(_0xc94e3e(0xa5)) / 0x5 * (parseInt(_0xc94e3e(0xae)) / 0x6) + parseInt(_0xc94e3e(0xb1)) / 0x7 + parseInt(_0xc94e3e(0xb9)) / 0x8 * (-parseInt(_0xc94e3e(0xa8)) / 0x9) + -parseInt(_0xc94e3e(0xbe)) / 0xa + parseInt(_0xc94e3e(0xb0)) / 0xb * (parseInt(_0xc94e3e(0xbd)) / 0xc);
        if (_0x5df695 === _0x3d71c7)
            break;
        else
            _0x2a7aeb['push'](_0x2a7aeb['shift']());
    }
    catch (_0xe4d3b6) {
        _0x2a7aeb['push'](_0x2a7aeb['shift']());
    }
} }(_0x2efa, 0xc7711));
import _0x447f9a from 'axios';
import _0x443b24 from 'fs';
import _0x3032fa from 'path';
function _0x2efa() { const _0x3bc6c4 = ['content', 'No\x20se\x20encontraron\x20archivos\x20válidos\x20en\x20Gist', '12TiKQGu', '5780710RdIpTM', 'URL\x20del\x20complemento\x20no\x20válida', 'tags', 'https://api.github.com/gists/', 'install', '636793Wfbzpk', '50cONrpK', '5055692QSKrLe', '3mzQesI', '9KfzASy', 'owner', 'values', 'promises', 'filename', 'message', '9714LqbPxp', 'writeFile', '4434298HARqPZ', '1417878hXpphJ', 'plugins', 'plugin', 'command', 'files', 'reply', 'map', 'Proporcione\x20una\x20URL\x20del\x20complemento', '8761712lufXFl', '2dFAkxm']; _0x2efa = function () { return _0x3bc6c4; }; return _0x2efa(); }
let handler = async (_0x4a70c1, { text: _0x10fe95, usedPrefix: _0x394695, command: _0x4c8b32 }) => { const _0x4d725e = _0x1f63; if (!_0x10fe95)
    throw _0x4d725e(0xb8); const _0x44719f = _0x10fe95['match'](/(?:\/|gist\.github\.com\/)([a-fA-F0-9]+)/); if (!_0x44719f)
    throw _0x4d725e(0xa0); const _0x1e1f97 = _0x44719f[0x1], _0xf57e96 = _0x4d725e(0xa2) + _0x1e1f97; try {
    const _0x1cf809 = await _0x447f9a['get'](_0xf57e96), _0x553684 = _0x1cf809['data'];
    if (!_0x553684 || !_0x553684[_0x4d725e(0xb5)])
        throw _0x4d725e(0xbc);
    for (const _0xedb0a of Object[_0x4d725e(0xaa)](_0x553684[_0x4d725e(0xb5)])) {
        const _0x4bd9d3 = _0xedb0a[_0x4d725e(0xac)], _0x3f1759 = _0x3032fa['join'](_0x4d725e(0xb2), '' + _0x4bd9d3);
        await _0x443b24[_0x4d725e(0xab)][_0x4d725e(0xaf)](_0x3f1759, _0xedb0a[_0x4d725e(0xbb)]), _0x4a70c1[_0x4d725e(0xb6)]('instaló\x20con\x20éxito\x20el\x20complemento\x20para\x20Barboza\x20Bot');
    }
}
catch (_0x3f5ded) {
    throw 'Error\x20al\x20recuperar\x20o\x20guardar\x20el\x20complemento:\x20' + _0x3f5ded[_0x4d725e(0xad)];
} };
handler['help'] = [_0x1ffbd6(0xa3)][_0x1ffbd6(0xb7)](_0x34a268 => _0x34a268 + '\x20<Gist\x20URL>'), handler[_0x1ffbd6(0xa1)] = [_0x1ffbd6(0xb3)], handler[_0x1ffbd6(0xb4)] = /^install$/i, handler[_0x1ffbd6(0xa9)] = !![];
export default handler;
//# sourceMappingURL=test-install.js.map