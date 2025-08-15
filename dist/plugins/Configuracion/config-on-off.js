import fs from 'fs';
const settingsPath = './database/settings.json';
let settings = {};
if (fs.existsSync(settingsPath)) {
    settings = JSON.parse(fs.readFileSync(settingsPath));
}
else {
    settings = {
        global: {
            welcome: true,
            nsfw: false,
            antiprivado: true
        },
        groups: {}
    };
}
const handler = async (m, { conn, args, isAdmin, isBotAdmin, command }) => {
    if (!m.isGroup)
        return m.reply('Este comando solo funciona en grupos.');
    if (!isAdmin)
        return m.reply('Solo los administradores pueden usar este comando.');
    const option = (args[0] || '').toLowerCase();
    if (!['welcome', 'nsfw'].includes(option)) {
        return m.reply(`Opciones disponibles: *welcome*, *nsfw*`);
    }
    const value = command === 'on';
    const groupId = m.chat;
    if (!settings.groups[groupId]) {
        settings.groups[groupId] = {};
    }
    settings.groups[groupId][option] = value;
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
    m.reply(`✅ La opción *${option}* fue ${value ? 'activada' : 'desactivada'} para este grupo.`);
};
handler.command = ['on', 'off'];
handler.group = true;
handler.admin = true;
export default handler;
//# sourceMappingURL=config-on-off.js.map