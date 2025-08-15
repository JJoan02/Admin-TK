import fs from 'fs/promises';
import fetch from 'node-fetch';
import { fileTypeFromBuffer } from 'file-type';
async function getFile(path) {
    let res;
    let data = Buffer.isBuffer(path) ? path
        : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split(',')[1], 'base64')
            : /^https?:\/\//.test(path) ? await (res = await fetch(path)).buffer()
                : fs.existsSync(path) ? await fs.readFile(path)
                    : typeof path === 'string' ? path
                        : Buffer.alloc(0);
    if (!Buffer.isBuffer(data))
        throw new TypeError('Result is not a buffer');
    const type = await fileTypeFromBuffer(data) || { mime: 'application/octet-stream', ext: '.bin' };
    return { res, ...type, data };
}
export async function sendButtonImg(conn, jid, contentText, footerText, buffer, buttons, quoted, options = {}) {
    const { data: file } = await getFile(buffer);
    const aButtons = buttons.map(([displayText, id]) => ({
        buttonId: id,
        buttonText: { displayText },
        type: 1,
    }));
    const buttonMessage = {
        image: file,
        caption: contentText,
        footer: footerText,
        mentions: await conn.parseMention(contentText + footerText),
        ...options,
        buttons: aButtons,
        headerType: 4,
    };
    return conn.sendMessage(jid, buttonMessage, { quoted, ...options });
}
export async function sendContactArray(conn, jid, data, quoted, options) {
    if (!Array.isArray(data[0]) && typeof data[0] === 'string')
        data = [data];
    const contacts = [];
    for (let [number, name] of data) {
        number = number.replace(/[^0-9]/g, '');
        const vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;${name.replace(/\n/g, '\\n')};;\nFN:${name.replace(/\n/g, '\\n')}\nTEL;type=CELL;type=VOICE;waid=${number}:${number}\nEND:VCARD`;
        contacts.push({ vcard, displayName: name });
    }
    return conn.sendMessage(jid, {
        contacts: {
            displayName: `${contacts.length} contacto${contacts.length === 1 ? '' : 's'}`,
            contacts,
        },
        ...options,
    }, { quoted, ...options });
}
//# sourceMappingURL=TKUtils.js.map