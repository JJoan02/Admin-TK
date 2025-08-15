import fs from 'fs';
import path from 'path';
const dbPath = path.join(process.cwd(), 'database', 'db_users.json');
const personalizePath = path.join(process.cwd(), 'database', 'personalize.json');
function readJSON(filePath) {
    if (!fs.existsSync(filePath))
        return {};
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}
function writeJSON(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
function getCurrency() {
    let personalizeData = readJSON(personalizePath);
    return personalizeData.global?.currency || personalizeData.default?.currency || 'monedas';
}
let handler = async (m, { text }) => {
    let userId = m.sender;
    if (!userId) {
        m.reply('❌ No se pudo obtener tu ID.');
        return;
    }
    let db = readJSON(dbPath);
    let currency = getCurrency();
    if (!db[userId])
        db[userId] = { money: 0, bank: 0 };
    let userMoney = db[userId].money;
    let userBank = db[userId].bank;
    if (!text) {
        m.reply(`❌ Uso incorrecto. Usa:\n- \`.deposit cantidad\`\n- \`.deposit all\``);
        return;
    }
    let depositAmount;
    if (text.toLowerCase() === 'all') {
        depositAmount = userMoney;
    }
    else {
        depositAmount = parseInt(text);
        if (isNaN(depositAmount) || depositAmount <= 0) {
            m.reply(`❌ Ingresa una cantidad válida.`);
            return;
        }
    }
    if (depositAmount > userMoney) {
        m.reply(`❌ No tienes suficiente ${currency} para depositar esa cantidad.`);
        return;
    }
    db[userId].money = userMoney - depositAmount;
    db[userId].bank = userBank + depositAmount;
    writeJSON(dbPath, db);
    m.reply(`✅ Has depositado ${depositAmount} ${currency} en el banco.\n\n💰 **${currency} restante:** ${db[userId].money}\n🏦 **Saldo en el banco:** ${db[userId].bank}`);
};
handler.command = ['deposit', 'depositar', 'd'];
export default handler;
//# sourceMappingURL=bank.js.map