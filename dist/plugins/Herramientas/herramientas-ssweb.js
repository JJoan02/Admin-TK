import fetch from 'node-fetch';
import axios from "axios";
const handler = async (m, { conn, text, args, usedPrefix, isPrems }) => {
    if (!args[0])
        return conn.reply(m.chat, '*Por favor ingresa una url de la página a la que se le tomará captura 🔎*', m);
    let user = global.db.data.users[m.sender];
    try {
        await conn.sendMessage(m.chat, { image: { url: `https://image.thum.io/get/fullpage/${args[0]}` }, caption: `Tu imagen 📷` }, { quoted: m });
    }
    catch {
        try {
            let krt = await ssweb(args[0]);
            await conn.sendMessage(m.chat, { image: { url: krt.result }, caption: `Tu imagen 📷` }, { quoted: m });
        }
        catch {
            m.reply("Error.");
        }
    }
};
handler.command = /^ss(web)?f?$/i;
export default handler;
async function ssweb(url, device = 'desktop') {
    return new Promise((resolve, reject) => {
        const base = 'https://www.screenshotmachine.com';
        const param = {
            url: url,
            device: device,
            cacheLimit: 0
        };
        axios({ url: base + '/capture.php',
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
                    result = {
                        status: 200,
                        result: data
                    };
                    resolve(result);
                });
            }
            else {
                reject({ status: 404, statuses: `Link Error`, message: data.data });
            }
        }).catch(reject);
    });
}
//# sourceMappingURL=herramientas-ssweb.js.map