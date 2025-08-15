import fetch from 'node-fetch';
const handler = async (m, { text, usedPrefix, command }) => {
    const args = text.split(',').map(arg => arg.trim());
    if (args.length < 5) {
        return m.reply(`Uso incorrecto del comando.\nFormato: ${usedPrefix}${command} <Nombre del personaje>, <Edad>, <Situación sentimental>, <Origen>, <Enlace de imagen> \n \n> Nota: el link debe estar en catbox.moe o en qu.ax si se usa qu.ax se debe configurar cono permanente`);
    }
    const [name, age, relationship, source, img] = args;
    if (!img.startsWith('http')) {
        return m.reply('Por favor, proporciona un enlace válido para la imagen.');
    }
    const characterData = {
        name,
        age: parseInt(age),
        relationship,
        source,
        img
    };
    const staffGroupId = '120363395553029777@g.us';
    const jsonMessage = `Nuevo personaje añadido:\n\`\`\`${JSON.stringify(characterData, null, 2)}\`\`\``;
    await conn.sendMessage(staffGroupId, { text: jsonMessage });
    m.reply(`El personaje "${name}" ha sido enviado al grupo del staff para su posterior adicion.`);
};
handler.command = ['addcharacter', 'addrw'];
export default handler;
//# sourceMappingURL=addrw.js.map