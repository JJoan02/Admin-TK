import { RENTAR_MEGUMIN_HEADER, RENTAR_NOMINAL_PURCHASE, RENTAR_SPENT_CHOCOLATES, RENTAR_AVAILABLE_TOKENS, RENTAR_NOT_ENOUGH_CHOCOLATES } from '../../content/rentar-responses';
const XP_PER_CHOCOLATE = 1000;
class RentarPlugin {
    name = "RentarPlugin";
    commands = [
        {
            name: "rentar",
            alias: ["rentar"],
            desc: "Permite a los usuarios rentar tokens usando chocolates.",
            category: "Administración/Grupos",
            react: "💰",
            execute: async (Yaka, m, { conn, command, args }) => {
                let count;
                let commandText = command.replace(/^rentar/i, '');
                if (commandText) {
                    count = /all/i.test(commandText) ? Math.floor(global.db.data.users[m.sender].exp / XP_PER_CHOCOLATE) : parseInt(commandText);
                }
                else {
                    count = args[0] ? parseInt(args[0]) : 1;
                }
                count = Math.max(1, count);
                if (global.db.data.users[m.sender].chocolates >= XP_PER_CHOCOLATE * count) {
                    global.db.data.users[m.sender].chocolates -= XP_PER_CHOCOLATE * count;
                    global.db.data.users[m.sender].tokens += count;
                    ;
                    let userRents = global.db.data.userRents || {};
                    if (!userRents[m.sender]) {
                        userRents[m.sender] = {
                            tokens: 0,
                            groups: []
                        };
                    }
                    userRents[m.sender].tokens += count;
                    global.db.data.userRents = userRents;
                    conn.reply(m.chat, `
${RENTAR_MEGUMIN_HEADER}
│╭──────────────┄
││ ${RENTAR_NOMINAL_PURCHASE(count)}
││ ${RENTAR_SPENT_CHOCOLATES(XP_PER_CHOCOLATE * count)}
││ ${RENTAR_AVAILABLE_TOKENS(userRents[m.sender].tokens)}
│╰──────────────┄
└──────────────`, m, rcanal);
                }
                else {
                    conn.reply(m.chat, RENTAR_NOT_ENOUGH_CHOCOLATES(count), m, rcanal);
                }
            }
        }
    ];
}
export default RentarPlugin;
//# sourceMappingURL=rentar_plugin.js.map