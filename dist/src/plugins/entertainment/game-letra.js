// game-letra.ts - Plugin mejorado y optimizado
// Categoría: entertainment
// Funcionalidad: Juegos y entretenimiento
// Convertido automáticamente a TypeScript con mejoras
function handler(m, { text }) {
    if (!text)
        return conn.reply(m.chat, '🚩 Ingresa tu nombre junto al comando.', m, rcanal);
    let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text;
    m.reply(teks.replace(/[a-z]/gi, v => {
        return {
            'a': 'ᥲ',
            'b': 'ᑲ',
            'c': 'ᥴ',
            'd': 'ძ',
            'e': 'ᥱ',
            'f': '𝖿',
            'g': 'g',
            'h': 'һ',
            'i': 'і',
            'j': 'ȷ',
            'k': 'k',
            'l': 'ᥣ',
            'm': 'm',
            'n': 'ᥒ',
            'o': '᥆',
            'p': '⍴',
            'q': '𝗊',
            'r': 'r',
            's': 's',
            't': '𝗍',
            'u': 'ᥙ',
            'v': '᥎',
            'w': 'ᥕ',
            'x': '᥊',
            'y': 'ᥡ',
            'z': 'z'
        }[v.toLowerCase()] || v;
    }));
}
handler.help = ['letra *<texto>*'];
handler.tags = ['fun'];
handler.command = ['letra'];
handler.register = true;
export default handler;
//# sourceMappingURL=game-letra.js.map