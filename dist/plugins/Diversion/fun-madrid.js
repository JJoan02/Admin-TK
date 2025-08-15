var handler = async (m) => {
    let madridMessage = `
━━━━━━━━━━━━━━━
🤍🤍 *Hala Madrid!* 🤍🤍
━━━━━━━━━━━━━━━
`.trim();
    m.reply(madridMessage);
};
handler.help = ['madrid'];
handler.tags = ['fun'];
handler.command = /^(madrid)$/i;
export default handler;
//# sourceMappingURL=fun-madrid.js.map