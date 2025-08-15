import fetch from 'node-fetch';
const handler = async (m, { conn }) => {
    try {
        const url = 'https://raw.githubusercontent.com/Elpapiema/CharHub-Store/refs/heads/main/plugin_Store/store.json';
        let response = await fetch(url);
        if (!response.ok)
            throw new Error('Error al obtener el JSON');
        const data = await response.json();
        let message = '*Plugins Disponibles*\n\n';
        data.plugins.forEach(plugin => {
            message += `🔹 *${plugin.name}*\n${plugin.description}\n💲 *${plugin.price}*\n\n`;
        });
        data.packages.forEach(pack => {
            message += `*Paquetes disponibles*\n \n 🔸 *${pack.name}*\n${pack.description}\n💲 *${pack.price}*\n\n`;
        });
        await conn.reply(m.chat, message.trim(), m);
    }
    catch (err) {
        console.error(err);
        await conn.reply(m.chat, 'Hubo un error al obtener la tienda. Inténtalo más tarde.', m);
    }
};
handler.command = /^(store|pluginstore|tienda)$/i;
export default handler;
//# sourceMappingURL=plugin_store.js.map