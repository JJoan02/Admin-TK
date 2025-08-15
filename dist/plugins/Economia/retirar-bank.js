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
        m.reply(`❌ Uso incorrecto. Usa:\n- \`.retirar cantidad\`\n- \`.retirar all\``);
        return;
    }
    let withdrawAmount;
    if (text.toLowerCase() === 'all') {
        withdrawAmount = userBank;
    }
    else {
        withdrawAmount = parseInt(text);
        if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
            m.reply(`❌ Ingresa una cantidad válida.`);
            return;
        }
    }
    if (withdrawAmount > userBank) {
        m.reply(`❌ No tienes suficiente saldo en el banco para retirar esa cantidad.`);
        return;
    }
    db[userId].money = userMoney + withdrawAmount;
    db[userId].bank = userBank - withdrawAmount;
    writeJSON(dbPath, db);
    m.reply(`✅ Has retirado ${withdrawAmount} ${currency} de tu banco.\n\n💰 **${currency} disponible:** ${db[userId].money}\n🏦 **Saldo restante en el banco:** ${db[userId].bank}`);
};
handler.command = /^(retirar)$/i;
export default handler;
//# sourceMappingURL=retirar-bank.js.map