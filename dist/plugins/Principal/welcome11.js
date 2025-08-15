import fetch from 'node-fetch';
import fs from 'fs';
const settingsPath = './database/settings.json';
const welcomeStatusCache = {};
export async function before(m, { conn, groupMetadata }) {
    if (!m.messageStubType || !m.isGroup)
        return;
    const chatId = m.chat;
    let settings = {};
    if (fs.existsSync(settingsPath)) {
        try {
            settings = JSON.parse(fs.readFileSync(settingsPath));
        }
        catch (e) {
            console.error('[ERROR] No se pudo leer settings.json:', e);
            return;
        }
    }
    const groupConfig = settings.groups?.[chatId];
    const currentWelcome = groupConfig?.welcome ?? settings.global?.welcome ?? false;
    const prevWelcome = welcomeStatusCache[chatId];
    if (prevWelcome !== currentWelcome) {
        welcomeStatusCache[chatId] = currentWelcome;
        if (currentWelcome) {
            console.log(`✅ Bienvenida activada para el grupo ${chatId}`);
        }
        else {
            console.log(`❌ Bienvenida desactivada para el grupo ${chatId}`);
        }
    }
    if (!currentWelcome)
        return;
    const userJid = m.messageStubParameters?.[0];
    if (!userJid)
        return;
    const usuario = `@${userJid.split('@')[0]}`;
    const pp = await conn.profilePictureUrl(userJid, 'image').catch(() => 'https://files.catbox.moe/xegxay.jpg');
    const img = await (await fetch(pp)).buffer();
    const subject = groupMetadata.subject;
    const descs = groupMetadata.desc || "*Descripción predeterminada del grupo*";
    if (m.messageStubType === 27) {
        const textWel = `
┏━━━━━❖━━━✦━━━❖━━━━━┓
┃ 💠 𝑩𝑰𝑬𝑵𝑽𝑬𝑵𝑰𝑫𝑶/𝑨 💠
┗━━━━━❖━━━✦━━━❖━━━━━┛

🌸 Hola ${usuario}~
✨ Bienvenido/a a *『${subject}』*

🫶 Aquí solo hay:
– Amistades lindas  
– Caos bonito  
– Un bot adorable... *o sea, yo~ 💁‍♀️*

💬 Escribe *#menu* si quieres ver lo que sé hacer~

📌 *Lee la descripción del grupo, ¿vale?*
> *${descs}*

🎀 Disfruta tu estancia, o te jalo las orejas 😘
`;
        await conn.sendMessage(chatId, {
            image: img,
            caption: textWel,
            mentions: [userJid]
        });
    }
    else if (m.messageStubType === 32) {
        const textBye = `
┏━━━━━❖━━━✦━━━❖━━━━━┓
┃ 💔 𝑨𝑫𝑰𝑶́𝑺... 𝒐 𝒏𝒐 💔
┗━━━━━❖━━━✦━━━❖━━━━━┛

😢 Se nos fue ${usuario}...

🕊️ Que el destino lo cuide...  
🚆 O que lo atropelle un tren, quién sabe 😇

✨ El grupo brillará menos sin ti... pero solo un poquito~
`;
        await conn.sendMessage(chatId, {
            image: img,
            caption: textBye,
            mentions: [userJid]
        });
    }
    else if (m.messageStubType === 28) {
        const textBan = `
┏━━━━━❖━━━✦━━━❖━━━━━┓
┃ 💅 𝑬𝑿𝑷𝑼𝑳𝑺𝑨𝑫𝑶 💥
┗━━━━━❖━━━✦━━━❖━━━━━┛

${usuario} fue *expulsado/a del grupo* 🧹

🥀 Que le vaya bonito...  
🚪 Y que no vuelva, gracias~

✨ Menos drama, más paz ☕
`;
        await conn.sendMessage(chatId, {
            image: img,
            caption: textBan,
            mentions: [userJid]
        });
    }
}
//# sourceMappingURL=welcome11.js.map