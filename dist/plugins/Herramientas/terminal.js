import { exec } from 'child_process';
const handler = async (m, { text }) => {
    if (!text)
        return m.reply('Por favor, ingresa un comando para ejecutar.');
    exec(text, (err, stdout, stderr) => {
        if (err)
            return m.reply(`Error:\n${err.message}`);
        if (stderr)
            return m.reply(`Stderr:\n${stderr}`);
        m.reply(`Resultado:\n${stdout}`);
    });
};
handler.command = /^\$/;
handler.owner = true;
export default handler;
//# sourceMappingURL=terminal.js.map