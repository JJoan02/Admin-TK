import { LISTANUM_USAGE, LISTANUM_NO_NUMBERS_FOUND, LISTANUM_HEADER, KICKNUM_RESTRICT_DISABLED, KICKNUM_BOT_NOT_ADMIN, KICKNUM_STARTING_DELETION, KICKNUM_ERROR_ALREADY_REMOVED, KICKNUM_GENERIC_ERROR } from '../../content/admin-responses';
class ListarNumerosGrupoPlugin {
    name = "ListarNumerosGrupoPlugin";
    commands = [
        {
            name: "listar_numeros",
            alias: ["listanum", "listnum"],
            desc: "Lista los números de los miembros del grupo por prefijo.",
            category: "Administración/Grupos",
            react: "🔢",
            execute: async (Yaka, m, { conn, args, usedPrefix, command, participants, isGroup, isAdmin, isBotAdmin }) => {
                if (!isGroup) {
                    return m.reply("Este comando solo puede ser usado en grupos.");
                }
                if (!isAdmin) {
                    return m.reply("Necesitas ser administrador del grupo para usar este comando.");
                }
                if (!args[0]) {
                    return m.reply(LISTANUM_USAGE(usedPrefix, command));
                }
                if (isNaN(args[0])) {
                    return m.reply(LISTANUM_USAGE(usedPrefix, command));
                }
                const lol = args[0].replace(/[+]/g, '');
                const ps = participants.map((u) => u.id).filter((v) => v !== conn.user.jid && v.startsWith(lol || lol));
                if (ps.length === 0) {
                    return m.reply(LISTANUM_NO_NUMBERS_FOUND(lol));
                }
                const numeros = ps.map((v) => '🤍 @' + v.replace(/@.+/, ''));
                conn.reply(m.chat, `${LISTANUM_HEADER(lol)}
` + numeros.join('\n'), m, { mentions: ps });
            }
        },
        {
            name: "expulsar_numeros",
            alias: ["kicknum"],
            desc: "Expulsa miembros del grupo por prefijo de número.",
            category: "Administración/Grupos",
            react: "🚫",
            execute: async (Yaka, m, { conn, args, usedPrefix, command, participants, isGroup, isAdmin, isBotAdmin }) => {
                if (!isGroup) {
                    return m.reply("Este comando solo puede ser usado en grupos.");
                }
                if (!isAdmin) {
                    return m.reply("Necesitas ser administrador del grupo para usar este comando.");
                }
                if (!isBotAdmin) {
                    return m.reply("El bot necesita ser administrador del grupo para usar este comando.");
                }
                const botSettings = global.db.data.settings[conn.user.jid] || {};
                if (!botSettings.restrict) {
                    return m.reply(KICKNUM_RESTRICT_DISABLED);
                }
                if (!isBotAdmin) {
                    return m.reply(KICKNUM_BOT_NOT_ADMIN);
                }
                if (!args[0]) {
                    return m.reply(LISTANUM_USAGE(usedPrefix, command));
                }
                if (isNaN(args[0])) {
                    return m.reply(LISTANUM_USAGE(usedPrefix, command));
                }
                const lol = args[0].replace(/[+]/g, '');
                const usersToKick = participants.map((u) => u.id).filter((v) => v !== conn.user.jid && v.startsWith(lol || lol));
                if (usersToKick.length === 0) {
                    return m.reply(LISTANUM_NO_NUMBERS_FOUND(lol));
                }
                conn.reply(m.chat, KICKNUM_STARTING_DELETION, m);
                const ownerGroup = m.chat.split('-')[0] + '@s.whatsapp.net';
                const botOwner = global.owner[0][0] + '@s.whatsapp.net';
                for (const user of usersToKick) {
                    const errorMsg = KICKNUM_ERROR_ALREADY_REMOVED(user.split('@')[0]);
                    if (user !== ownerGroup && user !== botOwner && user.startsWith(lol || lol) && isBotAdmin && botSettings.restrict) {
                        await new Promise(resolve => setTimeout(resolve, 2000));
                        const responseb = await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
                        if (responseb[0].status === '404') {
                            m.reply(errorMsg, m.chat, { mentions: conn.parseMention(errorMsg) });
                        }
                        await new Promise(resolve => setTimeout(resolve, 10000));
                    }
                    else {
                        m.reply(KICKNUM_GENERIC_ERROR);
                    }
                }
            }
        }
    ];
}
export default ListarNumerosGrupoPlugin;
//# sourceMappingURL=listar_numeros_grupo_plugin.js.map