import { canLevelUp, xpRange } from '../../lib/levelling.js';
import moment from 'moment-timezone';
import { levelingMessages } from '../../content/leveling-content.js';
let handler = m => m;
handler.before = async function (m, { conn, usedPrefix }) {
    if (!global.AdminTK_db.data.chats[m.chat].autolevelup)
        return;
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? m.conn.user.jid : m.sender;
    let perfil = await m.conn.profilePictureUrl(who, 'image').catch(_ => 'https://qu.ax/QGAVS.jpg');
    let mentionedJid = [who];
    let username = m.conn.getName(who);
    let userName = m.pushName || 'Anónimo';
    let user = global.AdminTK_db.data.users[m.sender];
    let chat = global.AdminTK_db.data.chats[m.chat];
    if (!chat.autolevelup)
        return !0;
    let level = user.level;
    let before = user.level * 1;
    while (canLevelUp(user.level, user.exp, global.AdminTK_multiplier))
        user.level++;
    if (before !== user.level) {
        let currentRole = Object.entries(global.AdminTK_roles).sort((a, b) => b[1] - a[1]).find(([, minLevel]) => level + 1 >= minLevel)[0];
        let nextRole = Object.entries(global.AdminTK_roles).sort((a, b) => a[1] - b[1]).find(([, minLevel]) => level + 2 < minLevel)[0];
        if (level >= 1) {
            user.role = currentRole;
            let text22 = levelingMessages.newRankNotification(userName, currentRole, nextRole, global.AdminTK_roles[nextRole]);
            await m.conn.sendMessage(global.AdminTK_botInfo.rcanal, {
                text: text22, contextInfo: {
                    externalAdReply: {
                        title: levelingMessages.channelNotificationTitle,
                        body: levelingMessages.channelNotificationBodyNewRank,
                        thumbnailUrl: perfil,
                        sourceUrl: global.AdminTK_officialAccounts.youtube,
                        mediaType: 1,
                        showAdAttribution: false,
                        renderLargerThumbnail: false
                    }
                }
            }, { quoted: null });
        }
        m.reply(levelingMessages.levelUpCongrats(userName, user.level, user.role, moment.tz('America/Bogota').format('DD/MM/YY')));
        let especial = 'yenes';
        let especial2 = 'exp';
        let especial3 = 'money';
        let especial4 = 'joincount';
        let especialCant = Math.floor(Math.random() * (9 - 6 + 1)) + 6;
        let especialCant2 = Math.floor(Math.random() * (10 - 6 + 1)) + 6;
        let especialCant3 = Math.floor(Math.random() * (10 - 6 + 1)) + 6;
        let especialCant4 = Math.floor(Math.random() * (3 - 2 + 1)) + 2;
        let normal = ['potion', 'aqua', 'trash', 'wood', 'rock', 'batu', 'string', 'iron', 'coal', 'botol', 'kaleng', 'kardus'].getRandom();
        let normal2 = ['petFood', 'makanancentaur', 'makanangriffin', 'makanankyubi', 'makanannaga', 'makananpet', 'makananphonix'].getRandom();
        let normal3 = ['anggur', 'apel', 'jeruk', 'mangga', 'pisang'].getRandom();
        let normalCant = [1, 3, 3, 3, 4, 4, 2, 2, 4, 4, 4, 4, 1].getRandom();
        let normalCant2 = [1, 3, 2, 2, 4, 4, 2, 2, 4, 4, 5, 5, 1].getRandom();
        let normalCant3 = [1, 3, 3, 3, 4, 4, 2, 2, 4, 4, 4, 4, 1].getRandom();
        if (level >= 1) {
            let chtxt = levelingMessages.levelUpChannelNotification(userName, before, level + 1, user.role);
            if ((level + 1) % 5 === 0) {
                chtxt += `\n\n💰 *𝚁𝚎𝚌𝚘𝚖𝚙𝚎𝚗𝚜𝚊 𝚙𝚘𝚛 𝚊𝚕𝚊𝚌𝚊𝚗𝚣𝚊𝚛 𝚎𝚕 𝚗𝚒𝚟𝚎𝚕 ${level + 1}:*\n🎁 *Bono:* \`X${Math.floor(((level + 1) - 5) / 10) + 1}\`\n- ${levelingMessages.rewardNotification(especialCant * (Math.floor(((level + 1) - 5) / 10) + 1), especial)}\n- ${levelingMessages.rewardNotification(especialCant2 * (Math.floor(((level + 1) - 5) / 10) + 1), especial2)}\n- ${levelingMessages.rewardNotification(especialCant3 * (Math.floor(((level + 1) - 5) / 10) + 1), especial3)}\n- ${levelingMessages.rewardNotification(especialCant4 * (Math.floor(((level + 1) - 5) / 10) + 1), especial4)}\n\n> 👀 Siguiente recompensa en el *nivel ${level + 6}*`;
            }
            chtxt = chtxt.trim();
            await m.conn.sendMessage(global.AdminTK_botInfo.rcanal, {
                text: chtxt, contextInfo: {
                    externalAdReply: {
                        title: levelingMessages.channelNotificationTitle,
                        body: levelingMessages.channelNotificationBodyLevelUp,
                        thumbnailUrl: perfil,
                        sourceUrl: global.AdminTK_officialAccounts.youtube,
                        mediaType: 1,
                        showAdAttribution: false,
                        renderLargerThumbnail: false
                    }
                }
            }, { quoted: null });
        }
        const rewards = [
            { level: 5, amount: especialCant * 1, type: especial, amount2: especialCant2 * 1, type2: especial2, amount3: especialCant3 * 1, type3: especial3, amount4: especialCant4 * 1, type4: especial4 },
            { level: 10, amount: especialCant * 1, type: especial, amount2: especialCant2 * 1, type2: especial2, amount3: especialCant3 * 1, type3: especial3, amount4: especialCant4 * 1, type4: especial4 },
            { level: 15, amount: especialCant * 2, type: especial, amount2: especialCant2 * 2, type2: especial2, amount3: especialCant3 * 2, type3: especial3, amount4: especialCant4 * 2, type4: especial4 },
            { level: 20, amount: especialCant * 2, type: especial, amount2: especialCant2 * 2, type2: especial2, amount3: especialCant3 * 2, type3: especial3, amount4: especialCant4 * 2, type4: especial4 },
            { level: 25, amount: especialCant * 3, type: especial, amount2: especialCant2 * 3, type2: especial2, amount3: especialCant3 * 3, type3: especial3, amount4: especialCant4 * 3, type4: especial4 },
            { level: 30, amount: especialCant * 3, type: especial, amount2: especialCant2 * 3, type2: especial2, amount3: especialCant3 * 3, type3: especial3, amount4: especialCant4 * 3, type4: especial4 },
            { level: 35, amount: especialCant * 4, type: especial, amount2: especialCant2 * 4, type2: especial2, amount3: especialCant3 * 4, type3: especial3, amount4: especialCant4 * 4, type4: especial4 },
            { level: 40, amount: especialCant * 4, type: especial, amount2: especialCant2 * 4, type2: especial2, amount3: especialCant3 * 4, type3: especial3, amount4: especialCant4 * 4, type4: especial4 },
            { level: 45, amount: especialCant * 5, type: especial, amount2: especialCant2 * 5, type2: especial2, amount3: especialCant3 * 5, type3: especial3, amount4: especialCant4 * 5, type4: especial4 },
            { level: 50, amount: especialCant * 5, type: especial, amount2: especialCant2 * 5, type2: especial2, amount3: especialCant3 * 5, type3: especial3, amount4: especialCant4 * 5, type4: especial4 },
            { level: 55, amount: especialCant * 6, type: especial, amount2: especialCant2 * 6, type2: especial2, amount3: especialCant3 * 6, type3: especial3, amount4: especialCant4 * 6, type4: especial4 },
            { level: 60, amount: especialCant * 6, type: especial, amount2: especialCant2 * 6, type2: especial2, amount3: especialCant3 * 6, type3: especial3, amount4: especialCant4 * 6, type4: especial4 },
            { level: 65, amount: especialCant * 7, type: especial, amount2: especialCant2 * 7, type2: especial2, amount3: especialCant3 * 7, type3: especial3, amount4: especialCant4 * 7, type4: especial4 },
            { level: 70, amount: especialCant * 7, type: especial, amount2: especialCant2 * 7, type2: especial2, amount3: especialCant3 * 7, type3: especial3, amount4: especialCant4 * 7, type4: especial4 },
            { level: 75, amount: especialCant * 8, type: especial, amount2: especialCant2 * 8, type2: especial2, amount3: especialCant3 * 8, type3: especial3, amount4: especialCant4 * 8, type4: especial4 },
            { level: 80, amount: especialCant * 8, type: especial, amount2: especialCant2 * 8, type2: especial2, amount3: especialCant3 * 8, type3: especial3, amount4: especialCant4 * 8, type4: especial4 },
            { level: 85, amount: especialCant * 9, type: especial, amount2: especialCant2 * 9, type2: especial2, amount3: especialCant3 * 9, type3: especial3, amount4: especialCant4 * 9, type4: especial4 },
            { level: 90, amount: especialCant * 9, type: especial, amount2: especialCant2 * 9, type2: especial2, amount3: especialCant3 * 9, type3: especial3, amount4: especialCant4 * 9, type4: especial4 },
            { level: 95, amount: especialCant * 10, type: especial, amount2: especialCant2 * 10, type2: especial2, amount3: especialCant3 * 10, type3: especial3, amount4: especialCant4 * 10, type4: especial4 },
            { level: 100, amount: especialCant * 10, type: especial, amount2: especialCant2 * 10, type2: especial2, amount3: especialCant3 * 10, type3: especial3, amount4: especialCant4 * 10, type4: especial4 },
        ];
        const currentLevelReward = rewards.find(r => r.level === user.level);
        if (currentLevelReward) {
            const rewardMessages = [
                { amount: currentLevelReward.amount, type: especial },
                { amount: currentLevelReward.amount2, type: especial2 },
                { amount: currentLevelReward.amount3, type: especial3 },
                { amount: currentLevelReward.amount4, type: especial4 },
            ];
            m.reply(levelingMessages.levelReward(user.level, rewardMessages));
            user[especial] += currentLevelReward.amount;
            user[especial2] += currentLevelReward.amount2;
            user[especial3] += currentLevelReward.amount3;
            user[especial4] += currentLevelReward.amount4;
        }
    }
};
export default handler;
//# sourceMappingURL=autolevelup.js.map