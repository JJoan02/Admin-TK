import { Command } from '../../core/CommandBus.js';
import yts from 'yt-search';
import { busquedaContent } from '../content/busqueda-content.js';
export class YouTubeSearchCommand extends Command {
    constructor() {
        super();
        this.name = 'yts';
        this.description = 'Busca videos y canales de YouTube.';
        this.commands = ['playlist', 'ytbuscar', 'yts', 'ytsearch'];
        this.tags = ['dl'];
        this.help = ['yts <query>'];
        this.limit = 1;
        this.level = 3;
    }
    async execute(context) {
        const { conn, m, text, usedPrefix, command } = context;
        if (!text) {
            return conn.reply(m.chat, busquedaContent.youtubeSearch.noTextYts(global.lenguajeGB.smsAvisoMG()), m);
        }
        try {
            let result = await yts(text);
            let ytres = result.videos;
            if (!ytres.length) {
                return conn.reply(m.chat, busquedaContent.youtubeSearch.noResults, m);
            }
            let listSections = [];
            for (let index in ytres) {
                let v = ytres[index];
                listSections.push({
                    title: `${global.htki} RESULTADOS ${global.htka}`,
                    rows: [
                        {
                            header: busquedaContent.youtubeSearch.listAudioHeader,
                            title: "",
                            description: `${v.title} | ${v.timestamp}\n`,
                            id: `${usedPrefix}ytmp3 ${v.url}`
                        },
                        {
                            header: busquedaContent.youtubeSearch.listVideoHeader,
                            title: "",
                            description: `${v.title} | ${v.timestamp}\n`,
                            id: `${usedPrefix}ytmp4 ${v.url}`
                        },
                        {
                            header: busquedaContent.youtubeSearch.listAudioDocHeader,
                            title: "",
                            description: `${v.title} | ${v.timestamp}\n`,
                            id: `${usedPrefix}play3 ${v.url}`
                        },
                        {
                            header: busquedaContent.youtubeSearch.listVideoDocHeader,
                            title: "",
                            description: `${v.title} | ${v.timestamp}\n`,
                            id: `${usedPrefix}play4 ${v.url}`
                        }
                    ]
                });
            }
            await conn.sendList(m.chat, `${global.htki} *RESULTADOS* ${global.htka}\n`, `\n${busquedaContent.youtubeSearch.listSearchOf(text)}`, `B U S C A R`, listSections, global.fkontak);
        }
        catch (e) {
            console.error(e);
            await conn.reply(m.chat, busquedaContent.youtubeSearch.errorReport(global.lenguajeGB.smsMalError3(), global.lenguajeGB.smsMensError2(), usedPrefix, command, global.wm), m);
        }
    }
}
//# sourceMappingURL=YouTubeSearchCommand.js.map