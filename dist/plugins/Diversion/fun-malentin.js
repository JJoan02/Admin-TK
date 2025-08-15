"use strict";
const carteras = {};
const handler = async (m) => {
    if (m.text.startsWith('.maleta')) {
        const usuarioId = m.sender;
        const monedas = 20;
        const dulcesGanados = 10;
        const xp = 100;
        if (!carteras[usuarioId]) {
            carteras[usuarioId] = { monedas: 0, dulces: 0, xp: 0 };
        }
        carteras[usuarioId].monedas += monedas;
        carteras[usuarioId].dulces += dulcesGanados;
        carteras[usuarioId].xp += xp;
        const mensaje = `🎒 *Maleta Abierta*\n\n¡Sorpresa! Has recibido:\n💰 ${monedas} Monedas\n🍬 ${dulcesGanados} Dulces ganados\n✨ ${xp} XP\n\n➤ ¡Disfruta tu recompensa!`;
        return m.reply(mensaje);
    }
};
handler.command = /^(maleta)$/i;
//# sourceMappingURL=fun-malentin.js.map