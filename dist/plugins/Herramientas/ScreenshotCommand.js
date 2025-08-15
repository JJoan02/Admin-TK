import { Command } from '../../core/Command.js';
import fetch from 'node-fetch';
import axios from "axios";
import * as cheerio from "cheerio";
import { screenshotMessages } from '../../lib/herramientas-content.js';
class ScreenshotCommand extends Command {
    #logger;
    constructor(logger) {
        super('ssweb', 'Toma una captura de pantalla de una página web. Uso: !ssweb <url>');
        this.#logger = logger;
        this.commands = ['ssweb', 'ss'];
    }
    async execute(context) {
        const { m, conn, args } = context;
        if (!args[0]) {
            await conn.reply(m.chat, screenshotMessages.noLink, m);
            return;
        }
        const url = args[0];
        try {
            await m.react(global.rwait);
            await conn.reply(m.chat, screenshotMessages.processing, m);
            let imageUrl = null;
            try {
                const ss = await (await fetch(`https://image.thum.io/get/fullpage/${url}`)).buffer();
                imageUrl = ss;
            }
            catch (e) {
                this.#logger.warn(`image.thum.io falló: ${e.message}`);
            }
            if (!imageUrl) {
                try {
                    const krt = await this.#ssweb(url);
                    imageUrl = krt.result;
                }
                catch (e) {
                    this.#logger.warn(`screenshotmachine.com falló: ${e.message}`);
                }
            }
            if (imageUrl) {
                await conn.sendFile(m.chat, imageUrl, 'screenshot.png', screenshotMessages.success(url), m);
                await m.react('✅');
            }
            else {
                await conn.reply(m.chat, screenshotMessages.error, m);
                await m.react('✖️');
            }
        }
        catch (e) {
            this.#logger.error(`Error general al tomar captura de pantalla: ${e.message}`);
            await conn.reply(m.chat, screenshotMessages.error, m);
            await m.react('✖️');
        }
    }
    async #ssweb(url, device = 'desktop') {
        return new Promise((resolve, reject) => {
            const base = 'https://www.screenshotmachine.com';
            const param = {
                url: url,
                device: device,
                cacheLimit: 0
            };
            axios({
                url: base + '/capture.php',
                method: 'POST',
                data: new URLSearchParams(Object.entries(param)),
                headers: {
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            }).then((data) => {
                const cookies = data.headers['set-cookie'];
                if (data.data.status == 'success') {
                    axios.get(base + '/' + data.data.link, {
                        headers: {
                            'cookie': cookies.join('')
                        },
                        responseType: 'arraybuffer'
                    }).then(({ data }) => {
                        const result = {
                            status: 200,
                            result: data
                        };
                        resolve(result);
                    }).catch(reject);
                }
                else {
                    reject({ status: 404, statuses: `Link Error`, message: data.data });
                }
            }).catch(reject);
        });
    }
}
export default ScreenshotCommand;
//# sourceMappingURL=ScreenshotCommand.js.map