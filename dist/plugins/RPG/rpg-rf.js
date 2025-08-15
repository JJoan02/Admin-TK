const wm = "Mi Watermark";
const nna = "https://ejemplo.com/nna.jpg";
const nna2 = "https://ejemplo.com/nna2.jpg";
const nn = "https://ejemplo.com/nn.jpg";
const md = "https://ejemplo.com/md.jpg";
const yt = "https://youtube.com/c/ejemplo";
const tiktok = "https://tiktok.com/@ejemplo";
const fake = false;
Array.prototype.getRandom = function () {
    return this[Math.floor(Math.random() * this.length)];
};
global.db = global.db || { data: { users: {}, tempCharacter: {} } };
const claimedCharacters = [];
const mainCharacters = [
    { name: "Naruto Uzumaki", url: "https://i.ibb.co/MygvfhNp/file.jpg", price: 100, claimedBy: null },
    { name: "Sakura Haruno", url: "https://i.ibb.co/MygvfhNp/file.jpg", price: 120, claimedBy: null },
    { name: "Sasuke Uchiha", url: "https://i.ibb.co/MygvfhNp/file.jpg", price: 150, claimedBy: null }
];
function syncCharacters() {
    const newCharacters = mainCharacters.filter(mainChar => !claimedCharacters.some(claimedChar => claimedChar.url === mainChar.url));
    if (newCharacters.length > 0) {
        claimedCharacters.push(...newCharacters);
        console.log(`${newCharacters.length} personaje(s) agregado(s) a "claimed".`);
    }
    return claimedCharacters;
}
function msToTime(duration) {
    let milliseconds = parseInt((duration % 1000) / 100), seconds = Math.floor((duration / 1000) % 60), minutes = Math.floor((duration / (1000 * 60)) % 60);
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    return `${minutes} min ${seconds} seg`;
}
async function handler(m, { conn }) {
    if (!global.db.data.users[m.sender]) {
        global.db.data.users[m.sender] = { exp: 0, timeRy: 0 };
    }
    let who = (m.mentionedJid && m.mentionedJid[0])
        ? m.mentionedJid[0]
        : (m.fromMe ? conn.user.jid : m.sender);
    let pp = await conn.profilePictureUrl(who, 'image').catch(() => 'https://example.com/default-profile.jpg');
    const availableCharacters = syncCharacters();
    let userTime = global.db.data.users[m.sender].timeRy;
    let cooldown = 300000;
    let nextAvailable = userTime + cooldown;
    if (new Date() - userTime < cooldown) {
        return conn.fakeReply(m.chat, `Espera ${msToTime(nextAvailable - new Date())} antes de usar este comando de nuevo`, m.sender, `No hagas spam`, 'status@broadcast', null, fake);
    }
    if (!availableCharacters || availableCharacters.length === 0) {
        return await conn.sendMessage(m.chat, { text: '⚠️ No hay personajes disponibles en este momento.' }, { quoted: m });
    }
    const randomCharacter = availableCharacters[Math.floor(Math.random() * availableCharacters.length)];
    const status = randomCharacter.claimedBy
        ? `🔒 Estado: Comprado por @${randomCharacter.claimedBy.split('@')[0]}`
        : `🆓 Estado: Libre`;
    const sentMessage = await conn.sendFile(m.chat, randomCharacter.url, 'lp.jpg', `💥 Nombre: ${randomCharacter.name}\n💰 Precio: ${randomCharacter.price} exp\n${status}\n\n> Responde con "c" para comprarlo`, m, false, {
        contextInfo: {
            mentionedJid: randomCharacter.claimedBy ? [randomCharacter.claimedBy] : [],
            externalAdReply: {
                title: "✨️ Character Details ✨️",
                body: wm,
                thumbnailUrl: pp,
                sourceUrl: [nna, nna2, nn, md, yt, tiktok].getRandom(),
                mediaType: 1,
                showAdAttribution: false,
                renderLargerThumbnail: false
            }
        }
    });
    global.db.data.users[m.sender].timeRy = new Date().getTime();
    global.db.data.tempCharacter = { ...randomCharacter, messageId: sentMessage.id };
}
handler.before = async (m, { conn }) => {
    const character = global.db.data.tempCharacter;
    if (m.quoted && m.text.toLowerCase() === 'c' && character && character.messageId === m.quoted.id) {
        const user = global.db.data.users[m.sender];
        const claimedCharacter = claimedCharacters.find(c => c.url === character.url);
        if (claimedCharacter.claimedBy) {
            return await conn.sendMessage(m.chat, {
                text: `❌ Este personaje ya ha sido comprado por @${claimedCharacter.claimedBy.split('@')[0]}`,
                contextInfo: { mentionedJid: [claimedCharacter.claimedBy] }
            }, { quoted: m });
        }
        if (user.exp < character.price) {
            return await conn.sendMessage(m.chat, { text: '❌ No tienes suficientes exp para comprar este personaje.' }, { quoted: m });
        }
        user.exp -= character.price;
        claimedCharacter.claimedBy = m.sender;
        await conn.sendMessage(m.chat, { text: `🎉 ¡Has comprado a ${character.name} por ${character.price} exp!`, image: { url: character.url } }, { quoted: m });
        delete global.db.data.tempCharacter;
    }
};
handler.help = ['rf', 'rm'];
handler.tags = ['econ'];
handler.command = ['rf', 'rm'];
export default handler;
//# sourceMappingURL=rpg-rf.js.map