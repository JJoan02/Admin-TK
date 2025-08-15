import { performance } from 'perf_hooks';
import { DOXXING_START_MESSAGE, DOXXING_MESSAGES } from '../../content/diversion/doxxing-responses';
class DoxxingPlugin {
    name = "DoxxingPlugin";
    commands = [
        {
            name: "doxxing",
            alias: [],
            desc: "Simula un proceso de doxxing.",
            category: "Diversión",
            react: "☠️",
            execute: async (Yaka, m, { conn, text }) => {
                const start = performance.now();
                async function loading() {
                    let { key } = await conn.sendMessage(m.chat, { text: DOXXING_START_MESSAGE }, { quoted: m });
                    for (let i = 0; i < DOXXING_MESSAGES.length; i++) {
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        await conn.sendMessage(m.chat, { text: DOXXING_MESSAGES[i], edit: key }, { quoted: m });
                    }
                }
                await loading();
                const end = performance.now();
                const executionTime = (end - start);
            }
        }
    ];
}
export default DoxxingPlugin;
//# sourceMappingURL=doxxing_plugin.js.map