import fetch from 'node-fetch';
import fs from 'fs';
const getRandomJob = async () => {
    const url = 'https://raw.githubusercontent.com/Elpapiema/CharHub-Store/refs/heads/main/Random/slut.json';
    const response = await fetch(url);
    const data = await response.json();
    const jobs = data.jobs;
    return jobs[Math.floor(Math.random() * jobs.length)];
};
const getCurrencyName = () => {
    const config = JSON.parse(fs.readFileSync('./database/personalize.json'));
    return config.global?.currency || 'Yenes';
};
const saveEarnings = (userId, moneyEarned) => {
    const database = fs.existsSync('./database/db_users.json') ? JSON.parse(fs.readFileSync('./database/db_users.json')) : {};
    if (!database[userId]) {
        database[userId] = { money: 0 };
    }
    database[userId].money += moneyEarned;
    fs.writeFileSync('./database/db_users.json', JSON.stringify(database, null, 2));
};
const handler = async (m, { conn, command }) => {
    try {
        const userId = m.sender;
        const job = await getRandomJob();
        const moneyEarned = Math.floor(Math.random() * (job.maxMoney - job.minMoney + 1)) + job.minMoney;
        const currency = getCurrencyName();
        saveEarnings(userId, moneyEarned);
        const message = ` ❀ ${job.description} ${moneyEarned} ${currency}.`;
        await conn.reply(m.chat, message, m);
    }
    catch (error) {
        console.error(error);
        await conn.reply(m.chat, '❌ Hubo un error al procesar \n \n Error de Sintaxis en slut.json.', m);
    }
};
handler.command = /^(slut)$/i;
export default handler;
//# sourceMappingURL=slut.js.map