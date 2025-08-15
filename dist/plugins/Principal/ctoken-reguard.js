const generateToken = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';
    for (let i = 0; i < 8; i++) {
        token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
};
const handler = async (m, { args }) => {
    if (args.length < 1) {
        return m.reply('⚠️ Debes proporcionar el valor y el número máximo de usos.\nEjemplo: *.ctoken 200, 50*');
    }
    const [value, maxUses] = args[0].split(',').map(item => item.trim());
    if (!value || isNaN(maxUses)) {
        return m.reply('⚠️ El formato es incorrecto. Debes usar el formato: *.ctoken valor, máximo_uso*');
    }
    const token = generateToken();
    const creationDate = new Date().toISOString();
    return m.reply(`✅ Token generado: *${token}*\n🔹 Valor: ${value}\n🔸 Máximo de usos: ${maxUses}\n📅 Fecha de creación: ${creationDate}`);
};
handler.command = ['ctoken'];
handler.rowner = true;
export default handler;
//# sourceMappingURL=ctoken-reguard.js.map