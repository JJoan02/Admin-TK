import fs from 'fs';
import yaoiImages from 'module-gatadios';
let handler = async (m, { conn }) => {
    const resultJson = yaoiImages.getRandomImage();
    let txt;
    txt = `
Nombre: ${resultJson.name}

Autor: ${resultJson.author}

Descripción: ${resultJson.description}`;
    conn.sendEventV2(m.chat, "Text", "Descripción", "Toca para ver más", false);
};
handler.command = /^(prueba36)$/i;
export default handler;
//# sourceMappingURL=prueba20.js.map