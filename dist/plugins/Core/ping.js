import { PING_INBOX_MESSAGE, PING_FUKKU_MESSAGE } from '../../content/core/ping-responses';
class PingPlugin {
    name = "PingPlugin";
    commands = [
        {
            name: "ping",
            alias: ["test", "live", "fuck", ".", "xxx", "sexo", "..."],
            desc: "Envía un mensaje de ping para verificar la conexión.",
            category: "Core",
            cool: 3,
            react: "🈁",
            execute: async (Yaka, m, { pushName }) => {
                m.reply(PING_INBOX_MESSAGE(pushName));
                let botpic = botImage1;
                let txt = PING_FUKKU_MESSAGE;
                await Yaka.sendMessage(m.sender, { image: { url: botpic }, caption: txt }, { quoted: m });
            }
        }
    ];
}
export default PingPlugin;
//# sourceMappingURL=ping.js.map