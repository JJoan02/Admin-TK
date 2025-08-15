let handler = async (m, { conn, args, participants, isAdmin, isBotAdmin }) => {
    if (!m.isGroup)
        return m.reply('❌ *Este comando solo se puede usar en grupos.*');
    if (!isAdmin)
        return m.reply('⚠️ *Solo los administradores del grupo pueden usar este comando.*');
    if (!isBotAdmin)
        return m.reply('🤖 *Necesito ser administrador para ejecutar este comando.*');
    if (args.length < 2)
        return m.reply('ℹ️ *Uso correcto del comando:* \n\n*!repetir <mensaje> <cantidad>*\n\n*Ejemplo:* !repetir Hola 5');
    let message = args.slice(0, -1).join(' ');
    let count = parseInt(args[args.length - 1]);
    if (isNaN(count) || count <= 0 || count > 20)
        return m.reply('🚫 *El número de repeticiones debe ser un valor entre 1 y 20.*');
    await m.reply(`🔄 *Repitiendo el mensaje "${message}"* \n\n📊 *Cantidad de veces:* ${count}`);
    for (let i = 0; i < count; i++) {
        await m.reply(`📢 ${message}`);
    }
    await m.reply(`✅ *Repetición completada correctamente.*`);
};
handler.command = /^(repetir|rep)$/i;
handler.group = true;
handler.admin = true;
export default handler;
//# sourceMappingURL=fun-repetir.js.map