import fs from 'fs';
import path from 'path';
let handler = async (m, { conn, usedPrefix }) => {
    let who;
    if (!db.data.chats[m.chat].nsfw && m.isGroup) {
        return m.reply('*[❗] 𝐋𝐨𝐬 𝐜𝐨𝐦𝐚𝐧𝐝𝐨𝐬 +𝟏𝟖 𝐞𝐬𝐭𝐚́𝐧 𝐝𝐞𝐬𝐚𝐜𝐭𝐢𝐯𝐚𝐝𝐨𝐬 𝐞𝐧 𝐞𝐬𝐭𝐞 𝐠𝐫𝐮𝐩𝐨.*\n> 𝐬𝐢 𝐞𝐬 𝐚𝐝𝐦𝐢𝐧 𝐲 𝐝𝐞𝐬𝐞𝐚 𝐚𝐜𝐭𝐢𝐯𝐚𝐫𝐥𝐨𝐬 𝐮𝐬𝐞 .enable nsfw');
    }
    if (m.mentionedJid.length > 0) {
        who = m.mentionedJid[0];
    }
    else if (m.quoted) {
        who = m.quoted.sender;
    }
    else {
        who = m.sender;
    }
    let name = conn.getName(who);
    let name2 = conn.getName(m.sender);
    m.react('😮');
    let str;
    if (m.mentionedJid.length > 0) {
        str = `\`${name2}\` *le dio una mamada a* \`${name || who}\`.`;
    }
    else if (m.quoted) {
        str = `\`${name2}\` *le está dando una mamada a* \`${name || who}\`.`;
    }
    else {
        str = `\`${name2}\` *está dando una mamada >.<*`.trim();
    }
    if (m.isGroup) {
        let pp = 'https://telegra.ph/file/0260766c6b36537aa2802.mp4';
        let pp2 = 'https://telegra.ph/file/2c1c68c9e310f60f1ded1.mp4';
        let pp3 = 'https://telegra.ph/file/e14f5a31d3b3c279f5593.mp4';
        let pp4 = 'https://telegra.ph/file/e020aa808f154a30b8da7.mp4';
        let pp5 = 'https://telegra.ph/file/1cafb3e72664af94d45c0.mp4';
        let pp6 = 'https://telegra.ph/file/72b49d3b554df64e377bb.mp4';
        let pp7 = 'https://telegra.ph/file/9687aedfd58a3110c7f88.mp4';
        let pp8 = 'https://telegra.ph/file/c799ea8a1ed0fd336579c.mp4';
        let pp9 = 'https://telegra.ph/file/7352d18934971201deed5.mp4';
        let pp10 = 'https://telegra.ph/file/379edd38bac6de4258843.mp4';
        const videos = [pp, pp2, pp3, pp4, pp5, pp6, pp8, pp9, pp10];
        const video = videos[Math.floor(Math.random() * videos.length)];
        let mentions = [who];
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    }
};
handler.help = ['blowjob/mamada @tag'];
handler.tags = ['nsfws'];
handler.command = ['blowjob', 'bj', 'mamada'];
handler.group = true;
export default handler;
//# sourceMappingURL=fun-blowjob.js.map