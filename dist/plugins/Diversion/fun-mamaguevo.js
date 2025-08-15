const handler = async (m) => {
    if (m.text.startsWith('.mamaguevo')) {
        const usuario = m.sender;
        const mensaje = `💫 *CALCULADORA*\n\n💅🏻 Los cálculos han arrojado que @${usuario} *%* mmgvo 🏳️‍🌈\n> ✰ La Propia Puta Mamando!\n\n➤ ¡Sorpresa!`;
        return m.reply(mensaje);
    }
};
handler.command = /^(mamaguevo)$/i;
export default handler;
//# sourceMappingURL=fun-mamaguevo.js.map