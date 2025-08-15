import { DESTRABA_DESCRIPTION, DESTRABA_NOT_CONFIGURED, DESTRABA_ERROR, REACTION_SUCCESS, REACTION_FAILURE } from '../../content/administracion_grupos/destrabar-responses';
class DestrabarPlugin {
    name = "DestrabarPlugin";
    commands = [
        {
            name: "destrabar",
            alias: ["destraba"],
            desc: DESTRABA_DESCRIPTION,
            category: "Administración/Grupos",
            react: "🔓",
            execute: async (Yaka, m, context) => {
                const { conn } = context;
                try {
                    if (global.destraba) {
                        await conn.reply(m.chat, global.destraba, m);
                        await conn.reply(m.chat, global.destraba, m);
                        await m.react(REACTION_SUCCESS);
                    }
                    else {
                        await conn.reply(m.chat, DESTRABA_NOT_CONFIGURED, m);
                        await m.react(REACTION_FAILURE);
                    }
                }
                catch (e) {
                    console.error(`Error al ejecutar destraba: ${e.message}`);
                    await conn.reply(m.chat, DESTRABA_ERROR, m);
                    await m.react(REACTION_FAILURE);
                }
            }
        }
    ];
}
export default DestrabarPlugin;
//# sourceMappingURL=destrabar_plugin.js.map