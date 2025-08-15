import fs from 'fs';
import path from 'path';
const dbPath = path.join(process.cwd(), 'database', 'db_users.json');
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
let handler = async (m, { conn, text }) => {
    let userId = m.sender;
    let args = text.split(' ');
    let amount = parseInt(args[0]);
    let target = args[1];
    if (!amount || isNaN(amount) || amount <= 0) {
        m.reply('❌ Por favor, ingresa una cantidad válida para transferir.');
        return;
    }
    if (!target || !target.startsWith('@')) {
        m.reply('❌ Debes mencionar al usuario al que deseas transferir.');
        return;
    }
    let db = readJSON(dbPath);
    let userData = db[userId] || { money: 0, bank: 0 };
    let targetId = target.replace('@', '') + '@s.whatsapp.net';
    if (userData.bank < amount) {
        m.reply('❌ No tienes suficiente dinero en tu banco para realizar esta transferencia.');
        return;
    }
    if (!db[targetId]) {
        db[targetId] = { money: 0, bank: 0 };
    }
    userData.bank -= amount;
    db[userId] = userData;
    db[targetId].bank += amount;
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    let currency = getCurrency();
    let receiverMention = `@${targetId.split('@')[0]}`;
    m.reply(`✅ Has transferido *${amount} ${currency}* a ${receiverMention} dentro de su banco.`, null, { mentions: [targetId] });
};
handler.command = /^(transferir)$/i;
export default handler;
//# sourceMappingURL=transferir.js.map