import { CHECKEXPIRED_NOT_CONFIGURED, CHECKEXPIRED_MESSAGE, CHECKEXPIRED_DAYS, CHECKEXPIRED_HOURS, CHECKEXPIRED_MINUTES, CHECKEXPIRED_SECONDS } from '../../content/admin-responses';
class VerificarExpiracionGrupoPlugin {
    name = "VerificarExpiracionGrupoPlugin";
    commands = [
        {
            name: "verificar_expiracion",
            alias: ["checkexpired", "cexpired"],
            desc: "Verifica el tiempo restante de alquiler del bot en el grupo.",
            category: "Administración/Grupos",
            react: "⏳",
            execute: async (Yaka, m, { conn, args, isGroup }) => {
                if (!isGroup) {
                    return m.reply("Este comando solo puede ser usado en grupos.");
                }
                if (global.db.data.chats[m.chat].expired < 1) {
                    return m.reply(CHECKEXPIRED_NOT_CONFIGURED);
                }
                let who = m.isGroup ? args[1] ? args[1] : m.chat : args[1];
                var now = new Date() * 1;
                const timeRemaining = this.#msToDate(global.db.data.chats[who].expired - now);
                m.reply(CHECKEXPIRED_MESSAGE(timeRemaining));
            }
        }
    ];
    #msToDate(ms) {
        let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
        let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
        let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
        let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
        return [d, CHECKEXPIRED_DAYS + '\n ', h, CHECKEXPIRED_HOURS + '\n ', m, CHECKEXPIRED_MINUTES + '\n ', s, CHECKEXPIRED_SECONDS + ' '].map(v => v.toString().padStart(2, '0')).join('');
    }
}
export default VerificarExpiracionGrupoPlugin;
//# sourceMappingURL=verificar_expiracion_grupo_plugin.js.map