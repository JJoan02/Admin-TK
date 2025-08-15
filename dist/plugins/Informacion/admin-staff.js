let handler = async (m, { conn, participants, groupMetadata, args }) => {
    const pp = 'https://telegra.ph/file/d33fa4945f9b21bcdd710.jpg';
    const groupAdmins = participants.filter(p => p.admin);
    const listAdmin = groupAdmins.map((v, i) => ` - @${v.id.split('@')[0]}`).join('\n');
    const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split `-`[0] + '@s.whatsapp.net';
    let text = `
≡ \`Admins del grupo :\` *${groupMetadata.subject}*

${listAdmin}

`.trim();
    conn.sendFile(m.chat, pp, 'staff.png', text, m, false, { mentions: [...groupAdmins.map(v => v.id), owner] });
};
handler.help = ['staff'];
handler.tags = ['group'];
handler.command = ['staff', 'admins', 'listadmin'];
handler.group = true;
export default handler;
//# sourceMappingURL=admin-staff.js.map