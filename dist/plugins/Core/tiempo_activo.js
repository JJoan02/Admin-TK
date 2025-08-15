import * as os from 'os';
import { UPTIME_BOT_STATUS, UPTIME_LABEL, LOAD_AVERAGE_LABEL, CPU_LABEL, MEMORY_LABEL, SEPARATOR } from '../../content/core/tiempo_activo-responses';
class TiempoActivoPlugin {
    name = "TiempoActivoPlugin";
    commands = [
        {
            name: "tiempo_activo",
            alias: ["uptime", "alive", "up", "time", "server", "runtime", "run"],
            desc: "Verifica el tiempo de actividad del bot y estadísticas del sistema.",
            category: "Core",
            cool: 3,
            react: "👻",
            execute: async (Yaka, m, { uptime, prefix }) => {
                const loadavg = os.loadavg();
                const cpu = {
                    model: os.cpus()[0].model,
                    speed: `${os.cpus()[0].speed} MHz`,
                    cores: os.cpus().length,
                };
                const memTotal = Math.round(os.totalmem() / (1024 ** 2));
                const memFree = Math.round(os.freemem() / (1024 ** 2));
                const memUsed = memTotal - memFree;
                const message = `${UPTIME_BOT_STATUS(botName)}

` +
                    `${UPTIME_LABEL} : *${uptime}*
` +
                    `${SEPARATOR}
` +
                    `${LOAD_AVERAGE_LABEL} : *${loadavg.map(avg => avg.toFixed(2)).join(', ')}*
` +
                    `${SEPARATOR}
` +
                    `${CPU_LABEL} : *${cpu.model} (${cpu.cores} núcleos @ ${cpu.speed})*
` +
                    `${SEPARATOR}
` +
                    `${MEMORY_LABEL} : *${memUsed} MB usados / ${memTotal} MB totales*
` +
                    `${SEPARATOR}
`;
                await Yaka.sendMessage(m.from, { text: message }, { quoted: m });
            }
        }
    ];
}
export default TiempoActivoPlugin;
//# sourceMappingURL=tiempo_activo.js.map