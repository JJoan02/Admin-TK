import { GHOST_MANAGEMENT_DESCRIPTION, GHOST_MANAGEMENT_NO_GHOSTS, GHOST_MANAGEMENT_GHOST_LIST, GHOST_MANAGEMENT_KICK_GHOST_LIST, GHOST_MANAGEMENT_KICK_WARNING } from '../../content/administracion_grupos/gestion_fantasmas-responses';
class GestionFantasmasPlugin {
    name = "GestionFantasmasPlugin";
    commands = [
        {
            name: "fantasmas",
            alias: ["fantasmas"],
            desc: GHOST_MANAGEMENT_DESCRIPTION,
            category: "Administración/Grupos",
            react: "👻",
            execute: async (Yaka, m, context) => {
                const { conn, participants, args, command, isGroup, isAdmin, isBotAdmin } = context;
                const { dbService, logger } = context;
                if (!isGroup) {
                    return m.reply("Este comando solo puede ser usado en grupos.");
                }
                if (!isAdmin) {
                    return m.reply("Necesitas ser administrador del grupo para usar este comando.");
                }
                if (!isBotAdmin) {
                    return m.reply("El bot necesita ser administrador del grupo para usar este comando.");
                }
                let member = participants.map((u) => u.id);
                let sum = args[0] ? parseInt(args[0]) : member.length;
                if (isNaN(sum))
                    sum = member.length;
                let total = 0;
                let sider = [];
                for (let i = 0; i < sum; i++) {
                    const userJid = member[i];
                    const userDb = await dbService.getUser(userJid);
                    const isUserAdmin = participants.find((p) => p.id === userJid)?.admin;
                    if ((!userDb || userDb.chat === 0) && !isUserAdmin) {
                        total++;
                        sider.push(userJid);
                    }
                }
                if (total === 0) {
                    await conn.reply(m.chat, GHOST_MANAGEMENT_NO_GHOSTS, m);
                }
                else {
                    const ghostList = sider.map(v => '@' + v.replace(/@.+/, '')).join('\n');
                    await conn.reply(m.chat, GHOST_MANAGEMENT_GHOST_LIST(ghostList), m, { mentions: sider });
                }
            }
        },
        {
            name: "kickfantasmas",
            alias: ["kickfantasmas"],
            desc: "Elimina los miembros inactivos (fantasmas) del grupo.",
            category: "Administración/Grupos",
            react: "🧹",
            execute: async (Yaka, m, context) => {
                const { conn, participants, args, command, isGroup, isAdmin, isBotAdmin } = context;
                const { dbService, logger } = context;
                if (!isGroup) {
                    return m.reply("Este comando solo puede ser usado en grupos.");
                }
                if (!isAdmin) {
                    return m.reply("Necesitas ser administrador del grupo para usar este comando.");
                }
                if (!isBotAdmin) {
                    return m.reply("El bot necesita ser administrador del grupo para usar este comando.");
                }
                let member = participants.map((u) => u.id);
                let sum = args[0] ? parseInt(args[0]) : member.length;
                if (isNaN(sum))
                    sum = member.length;
                let total = 0;
                let sider = [];
                for (let i = 0; i < sum; i++) {
                    const userJid = member[i];
                    const userDb = await dbService.getUser(userJid);
                    const isUserAdmin = participants.find((p) => p.id === userJid)?.admin;
                    if ((!userDb || userDb.chat === 0) && !isUserAdmin) {
                        total++;
                        sider.push(userJid);
                    }
                }
                if (total === 0) {
                    await conn.reply(m.chat, GHOST_MANAGEMENT_NO_GHOSTS, m);
                    return;
                }
                const ghostList = sider.map(v => '@' + v.replace(/@.+/, '')).join('\n');
                await conn.reply(m.chat, GHOST_MANAGEMENT_KICK_GHOST_LIST(ghostList), m, { mentions: sider });
                const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
                await delay(10000);
                const chat = await dbService.getChat(m.chat);
                const originalWelcomeState = chat.welcome;
                await dbService.updateChat(m.chat, { welcome: false });
                try {
                    for (const userJid of sider) {
                        const targetParticipant = participants.find((p) => p.id === userJid);
                        if (targetParticipant && !targetParticipant.admin) {
                            const response = await conn.groupParticipantsUpdate(m.chat, [userJid], 'remove');
                            if (response[0].status === "404") {
                                logger.warn(GHOST_MANAGEMENT_KICK_WARNING(userJid));
                            }
                        }
                        await delay(10000);
                    }
                }
                finally {
                    await dbService.updateChat(m.chat, { welcome: originalWelcomeState });
                }
                await m.react('✅');
            }
        }
    ];
}
export default GestionFantasmasPlugin;
//# sourceMappingURL=gestion_fantasmas_plugin.js.map