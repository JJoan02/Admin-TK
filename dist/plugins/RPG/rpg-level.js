let handler = async (m, { conn }) => {
    let nivelActual = Math.floor(Math.random() * 10) + 1;
    let nuevoNivel = nivelActual + 1;
    let mensajeFinal = `¡Felicidades! Tu mascota ha subido de nivel.\nNivel Actual: ${nivelActual}\nNuevo Nivel: ${nuevoNivel} 🎉🐾`;
    await conn.sendMessage(m.chat, { text: mensajeFinal }, { quoted: m });
};
handler.help = ['level'];
handler.tags = ['mascotas'];
handler.command = ['level'];
export default handler;
//# sourceMappingURL=rpg-level.js.map