import fs from 'fs';
import path from 'path';
const dbPath = path.join(process.cwd(), 'database', 'db_users.json');
const haremPath = path.join(process.cwd(), 'database', 'harem.json');
const personalizePath = path.join(process.cwd(), 'database', 'personalize.json');
function readJSON(filePath) {
    if (!fs.existsSync(filePath))
        return {};
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}
function getCurrency() {
    let personalizeData = readJSON(personalizePath);
    return personalizeData.global?.currency || personalizeData.default?.currency || 'monedas';
}
let handler = async (m, { conn }) => {
    let userId = m.sender;
    if (!userId) {
        m.reply('❌ No se pudo obtener tu ID.');
        return;
    }
    let db = readJSON(dbPath);
    let harem = readJSON(haremPath);
    let currency = getCurrency();
    let userData = db[userId] || { money: 0, bank: 0 };
    let userMoney = userData.money;
    let userBank = userData.bank;
    let haremCount = harem[userId] ? harem[userId].length : 0;
    let profilePicUrl;
    try {
        profilePicUrl = await conn.profilePictureUrl(userId, 'image');
    }
    catch (e) {
        profilePicUrl = 'https://files.catbox.moe/vpqhom.webp';
    }
    let message = `🌟 *Perfil de Usuario* 🌟\n\n`
        + `👤 *Usuario:* @${userId.split('@')[0]}\n`
        + `💰 *Dinero en mano:* ${userMoney} ${currency} \n`
        + `🏦 *Banco:* ${userBank} ${currency} \n`
        + `💞 *Personajes en harem:* ${haremCount}`;
    await conn.sendMessage(m.chat, {
        image: { url: profilePicUrl },
        caption: message,
        mentions: [userId]
    }, { quoted: m });
};
handler.command = ['profile', 'perfil', 'bal', 'balance'];
export default handler;
//# sourceMappingURL=profile-user.js.map