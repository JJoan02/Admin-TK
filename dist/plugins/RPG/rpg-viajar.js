let handler = async (m, { conn }) => {
    const destinos = [
        "la playa 🏖️",
        "la montaña ⛰️",
        "un bosque encantado 🌲✨",
        "una ciudad mágica 🏙️",
        "un parque de diversiones 🎢"
    ];
    const destinoElegido = destinos[Math.floor(Math.random() * destinos.length)];
    const mensajeViaje = `¡Tu mascota está lista para viajar! 🐾✈️\nDestino: ${destinoElegido}\n¡Prepárate para la aventura!`;
    await conn.sendMessage(m.chat, { text: mensajeViaje }, { quoted: m });
};
handler.help = ['viajar'];
handler.tags = ['mascotas'];
handler.command = ['viajar'];
export default handler;
//# sourceMappingURL=rpg-viajar.js.map