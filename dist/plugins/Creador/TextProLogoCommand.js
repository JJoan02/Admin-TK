import { Command } from '../../core/Command.js';
import axios from "axios";
import * as cheerio from "cheerio";
import FormData from "form-data";
import { textProEffects, textProMessages } from '../../lib/creator-content.js';
class TextProLogoCommand extends Command {
    #logger;
    constructor(logger) {
        super('logos', 'Genera logos con efectos de texto de TextPro.me. Uso: !logos <efecto> <texto1>|<texto2>');
        this.#logger = logger;
        this.commands = ['logo', 'logos', 'logos2'];
    }
    async execute(context) {
        const { m, conn, args, usedPrefix, command } = context;
        const effectName = args[0];
        const textInput = args.slice(1).join(' ');
        if (!effectName) {
            await conn.reply(m.chat, textProMessages.usage(usedPrefix + command, `American-flag-3D GataBot`, `Wolf-Logo-Galaxy GataBot|GataDios`, textProEffects.map(v => v.title).join(`\n💜 ${usedPrefix + command} `)), m);
            return;
        }
        const effectSelect = textProEffects.find(v => (new RegExp(v.title, 'gi')).test(effectName));
        if (!effectSelect) {
            await conn.reply(m.chat, textProMessages.effectNotFound(effectName), m);
            return;
        }
        let texts = [];
        if (textInput.includes('|')) {
            texts = textInput.split('|').map(t => t.trim());
        }
        else {
            texts = [textInput.trim()];
        }
        if (texts.some(t => !t)) {
            await conn.reply(m.chat, textProMessages.missingText, m);
            return;
        }
        try {
            await m.react(global.rwait);
            await conn.reply(m.chat, textProMessages.creatingLogo, m);
            const res = await this.#maker(effectSelect.url, texts);
            if (typeof res === 'number') {
                await conn.reply(m.chat, textProMessages.effectNotFound(effectName), m);
                await m.react('✖️');
                return;
            }
            await conn.sendMessage(m.chat, { image: { url: res.image }, caption: textProMessages.success(effectName) }, { quoted: m });
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error al generar logo: ${e.message}`);
            await conn.reply(m.chat, textProMessages.error(usedPrefix + command), m);
            await m.react('✖️');
        }
    }
    async #maker(url, text) {
        try {
            let a = await axios.get(url, {
                headers: {
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                    "Origin": (new URL(url)).origin,
                    "Referer": url,
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.188"
                }
            });
            let $ = cheerio.load(a.data);
            let server = $('#build_server').val();
            let serverId = $('#build_server_id').val();
            let token = $('#token').val();
            let submit = $('#submit').val();
            let types = [];
            $('input[name="radio0[radio]"]').each((i, elem) => {
                types.push($(elem).attr("value"));
            });
            let post;
            if (types.length !== 0) {
                post = {
                    'radio0[radio]': types[Math.floor(Math.random() * types.length)],
                    'submit': submit,
                    'token': token,
                    'build_server': server,
                    'build_server_id': Number(serverId)
                };
            }
            else {
                post = {
                    'submit': submit,
                    'token': token,
                    'build_server': server,
                    'build_server_id': Number(serverId)
                };
            }
            let form = new FormData();
            for (let i in post) {
                form.append(i, post[i]);
            }
            if (typeof text === "string")
                text = [text];
            for (let i of text)
                form.append("text[]", i);
            let b = await axios.post(url, form, {
                headers: {
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                    "Origin": (new URL(url)).origin,
                    "Referer": url,
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.188",
                    "Cookie": a.headers.get("set-cookie").join("; "),
                    ...form.getHeaders()
                }
            });
            $ = cheerio.load(b.data);
            let out = ($('#form_value').first().text() || $('#form_value_input').first().text() || $('#form_value').first().val() || $('#form_value_input').first().val());
            let c = await axios.post((new URL(url)).origin + "/effect/create-image", JSON.parse(out), {
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "Origin": (new URL(url)).origin,
                    "Referer": url,
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.188",
                    "Cookie": a.headers.get("set-cookie").join("; ")
                }
            });
            return { status: c.data?.success, image: c.data?.fullsize_image || c.data?.image || "", session: c.data?.session_id };
        }
        catch (e) {
            throw e;
        }
    }
}
export default TextProLogoCommand;
//# sourceMappingURL=TextProLogoCommand.js.map