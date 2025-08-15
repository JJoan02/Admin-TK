let handler = async (m, { text }) => {
    if (!text)
        throw `🌴 Ingresa el nombre con el que se guardará la imagen.`;
    if (!m.quoted || !m.quoted.fileSha256)
        throw `🌺 Por favor responde a la imágen`;
    let media = await m.quoted.download();
    const path = `src/${text}.jpg`;
    await fs.writeFileSync(path, media);
    m.reply(`Imagen guardada como: ${path}`);
};
handler.help = ['saveimage'];
handler.tags = ['owner'];
handler.command = /^(saveimage|sp)$/i;
handler.owner = true;
export default handler;
//# sourceMappingURL=owner-saveimage.js.map