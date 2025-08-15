import { mku, sessionSchema } from '../../Database/dataschema';
import { runtime } from '../../lib/myfunc';
import { STATS_PERMISSION_DENIED, STATS_ERROR_FETCHING, STATS_HEADER, STATS_USERS, STATS_BOTS, STATS_GROUPS, STATS_MODS, STATS_COMMANDS, STATS_SESSIONS, STATS_UPTIME, STATS_FOOTER } from '../../content/core/informacion-responses';
function generateStatsText(users, bots, groups, mods, commands, sessions, uptime) {
    return `
${STATS_HEADER(botName)}
` +
        `${STATS_USERS(users)}
` +
        `${STATS_BOTS(bots)}
` +
        `${STATS_GROUPS(groups)}
` +
        `${STATS_MODS(mods)}
` +
        `${STATS_COMMANDS(commands)}
` +
        `${STATS_SESSIONS(sessions)}
` +
        `${STATS_UPTIME(runtime(uptime))}
` +
        `${STATS_FOOTER}`;
}
class InformacionPlugin {
    name = "InformacionPlugin";
    commands = [
        {
            name: 'informacion',
            alias: ['stats', 'info'],
            desc: 'Muestra estadísticas del bot.',
            category: 'Core',
            react: '📊',
            execute: async (Yaka, m, { text, prefix, mentionByTag, pushName, isCreator, modStatus, commands, store, from, participants }) => {
                try {
                    if (!isCreator && modStatus === 'false') {
                        return Yaka.sendMessage(m.from, { text: STATS_PERMISSION_DENIED }, { quoted: m });
                    }
                    const [modlist, FetchGC, totalUsers, sessionCount] = await Promise.all([
                        mku.find({ addedMods: 'true' }),
                        Yaka.groupFetchAllParticipating(),
                        mku.find({}),
                        sessionSchema.countDocuments(),
                    ]);
                    const groups = Object.entries(FetchGC).map(([, value]) => value);
                    const groupIds = groups.map((v) => v.id);
                    const modIds = modlist.map((mod) => mod.id);
                    const cmds = Array.from(commands.values()).filter((v) => v.type !== 'hide').length;
                    const statsText = generateStatsText(totalUsers.length, 2, groupIds.length, modIds.length, cmds, sessionCount, process.uptime());
                    return Yaka.sendMessage(m.from, { text: statsText }, { quoted: m });
                }
                catch (error) {
                    console.error('Error en el comando de estadísticas:', error);
                    return Yaka.sendMessage(m.from, { text: STATS_ERROR_FETCHING }, { quoted: m });
                }
            },
        }
    ];
}
export default InformacionPlugin;
//# sourceMappingURL=informacion.js.map