export const levelingMessages = {
    levelUpCongrats: (userName, level, role, date) => `*🎉 ¡ F E L I C I D A D E S ! 🎉*\n\n⭐ Nivel Actual » *${level}*\n⚜️ Rango » ${role}\n📆 Fecha » *${date}*\n\n> *¡Has alcanzado un Nuevo Nivel!*`,
    newRankNotification: (userName, newRank, nextRank, nextRankLevel) => `🌸 ¡𝙵𝚎𝚕𝚒𝚌𝚒𝚍𝚊𝚍𝚎𝚜 *${userName}*, 𝚙𝚘𝚛 𝚝𝚞 𝚗𝚞𝚎𝚟𝚘 𝚛𝚊𝚗𝚐𝚘!\n\n\`𝙽𝚞𝚎𝚟𝚘 𝚁𝚊𝚗𝚐𝚘:\`\n${newRank}${nextRank ? `\n\n> 𝙿𝚛𝚘́𝚡𝚒𝚖𝚘 𝚛𝚊𝚗𝚐𝚘 ${nextRank}, 𝚎𝚗 𝚎𝚕 *𝚗𝚒𝚟𝚎𝚕 ${nextRankLevel}*. ¡𝚂𝚒𝚐𝚞𝚎 𝚊𝚜𝚒!` : ''}`,
    levelUpChannelNotification: (userName, previousLevel, currentLevel, role) => `👤 *𝚄𝚜𝚞𝚊𝚛𝚒𝚘:* ${userName}\n⭐ *𝙽𝚒𝚟𝚎𝚕 𝚊𝚗𝚝𝚎𝚛𝚒𝚘𝚛:* ${previousLevel}\n🌟 *𝙽𝚒𝚟𝚎𝚕 𝚊𝚌𝚝𝚞𝚊𝚕:* ${currentLevel}\n⚜️ *𝚁𝚊𝚗𝚐𝚘:* ${role}`,
    rewardNotification: (amount, type) => `ᰔᩚ *${amount} ${type}*`,
    levelReward: (level, rewards) => `*🥳 RECOMPENSA POR SU NUEVO NIVEL ${level}!!* 🏆\n${rewards.map(r => `ᰔᩚ *${r.amount} ${r.type}*`).join('\n')}`,
    channelNotificationTitle: "【 🔔 𝐍𝐎𝐓𝐈𝐅𝐈𝐂𝐀𝐂𝐈𝐎́𝐍 🔔 】",
    channelNotificationBodyLevelUp: '🥳 ¡𝚄𝚗 𝚞𝚜𝚞𝚊𝚛𝚒𝚘 𝚘𝚋𝚝𝚒𝚎𝚗𝚎 𝚞𝚗 𝚗𝚞𝚎𝚟𝚘 𝚗𝚒𝚟𝚎𝚕!',
    channelNotificationBodyNewRank: '🥳 ¡𝙰𝚕𝚐𝚞𝚒𝚎𝚗 𝚘𝚋𝚝𝚞𝚟𝚘 𝚞𝚗 𝚗𝚞𝚎𝚟𝚘 𝚛𝚊𝚗𝚐𝚘!',
};
//# sourceMappingURL=leveling-content.js.map