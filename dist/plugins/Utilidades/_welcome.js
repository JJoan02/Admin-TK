import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';
export async function before(m, { conn, participants, groupMetadata }) {
    if (!m.messageStubType || !m.isGroup)
        return !0;
    let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://tinyurl.com/ylgu47w3');
    let img = await (await fetch(`${pp}`)).buffer();
    let chat = global.db.data.chats[m.chat];
    if (chat.bienvenida && m.messageStubType == 27) {
        let bienvenida = `╔═══✦ ✯ *Ai Hoshino - MD* ✯ ✦═══╗

║            
║                   *𝑻𝒆𝒂𝒎 𝑨𝒔𝒄𝒆𝒏𝒅* *
║ 
║ *🔗 Bienvenido*  
╟─➤ 「 @${m.messageStubParameters[0].split `@`[0]}」    
║
║  
╚═►`;
        await conn.sendAi(m.chat, botname, textbot, bienvenida, img, img, estilo);
    }
    if (chat.bienvenida && m.messageStubType == 28) {
        let bye = `┌─★ *${botname}* \n│「 ADIOS 👋 」\n└┬★ 「 @${m.messageStubParameters[0].split `@`[0]} 」\n   │✑  Se fue\n   │✑ ¿Te importa? ¡A nosotros no!\n   └───────────────┈ ⳹`;
        await conn.sendAi(m.chat, botname, textbot, bye, img, img, estilo);
    }
    if (chat.bienvenida && m.messageStubType == 32) {
        let kick = `┌─★ *${botname}* \n│「 ADIOS 👋 」\n└┬★ 「 @${m.messageStubParameters[0].split `@`[0]} 」\n   │✑  Se fue\n   │✑ ¿Te importa? ¡A nosotros no!\n   └───────────────┈ ⳹`;
        await conn.sendAi(m.chat, botname, textbot, kick, img, img, estilo);
    }
}
//# sourceMappingURL=_welcome.js.map