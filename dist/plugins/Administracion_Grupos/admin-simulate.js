import { ADMIN_SIMULATE_WELCOME_NOT_ENABLED, ADMIN_SIMULATE_EVENT_LIST, ADMIN_SIMULATE_SIMULATING, ADMIN_SIMULATE_INVALID_EVENT } from '../../content/administracion_grupos/admin-simulate-responses';
class AdminSimulatePlugin {
    name = "AdminSimulatePlugin";
    commands = [
        {
            name: "simular",
            alias: ["simulate"],
            desc: "Simula eventos de grupo (bienvenida, despedida, promoción, degradación).",
            category: "Administración/Grupos",
            react: "🎭",
            execute: async (Yaka, m, { conn, usedPrefix, command, args, text, isGroup, isAdmin, isBotAdmin }) => {
                if (!isGroup) {
                    return m.reply("Este comando solo puede ser usado en grupos.");
                }
                if (!isAdmin) {
                    return m.reply("Necesitas ser administrador del grupo para usar este comando.");
                }
                if (!isBotAdmin) {
                    return m.reply("El bot necesita ser administrador del grupo para usar este comando.");
                }
                let chat = global.db.data.chats[m.chat];
                if (!chat?.welcome) {
                    return conn.reply(m.chat, ADMIN_SIMULATE_WELCOME_NOT_ENABLED(usedPrefix), m);
                }
                let event = args[0];
                let mentions = text.replace(event, '').trimStart();
                let who = mentions ? conn.parseMention(mentions) : [];
                let part = who.length ? who : [m.sender];
                let act = false;
                if (!event) {
                    return conn.reply(m.chat, ADMIN_SIMULATE_EVENT_LIST(usedPrefix, command), m);
                }
                conn.reply(m.chat, ADMIN_SIMULATE_SIMULATING(event), m);
                switch (event.toLowerCase()) {
                    case 'add':
                    case 'bienvenida':
                    case 'invite':
                    case 'welcome':
                        act = 'add';
                        break;
                    case 'bye':
                    case 'despedida':
                    case 'leave':
                    case 'remove':
                        act = 'remove';
                        break;
                    case 'promote':
                    case 'promover':
                        act = 'promote';
                        break;
                    case 'demote':
                    case 'degradar':
                        act = 'demote';
                        break;
                    default:
                        throw ADMIN_SIMULATE_INVALID_EVENT;
                }
                if (act) {
                    return conn.groupParticipantsUpdate({
                        id: m.chat,
                        participants: part,
                        action: act
                    });
                }
            }
        }
    ];
}
export default AdminSimulatePlugin;
//# sourceMappingURL=admin-simulate.js.map