import { funMessages } from '../content/fun-content';
import fs from 'fs';
const timeout = 60000;
const poin = 10;
export default class AcertijoCommand {
    command = ['acertijo', 'acert', 'adivinanza', 'tekateki'];
    description = 'Juega a adivinar acertijos.';
    async execute(m, { conn }) {
        conn.tekateki = conn.tekateki ? conn.tekateki : {};
        const id = m.chat;
        if (id in conn.tekateki) {
            conn.reply(m.chat, funMessages.adivinar.gameInProgress, conn.tekateki[id][0]);
            throw false;
        }
        const tekateki = JSON.parse(fs.readFileSync(`./src/game/acertijo.json`, 'utf-8'));
        const json = tekateki[Math.floor(Math.random() * tekateki.length)];
        const _clue = json.response;
        const clue = _clue.replace(/[A-Za-z]/g, '_');
        const caption = funMessages.adivinar.acertijo.caption(json.question, timeout, poin);
        conn.tekateki[id] = [
            await conn.reply(m.chat, caption, m), json,
            poin,
            setTimeout(async () => {
                if (conn.tekateki[id])
                    await conn.reply(m.chat, funMessages.adivinar.acertijo.timeUp(json.response), conn.tekateki[id][0]);
                delete conn.tekateki[id];
            }, timeout)
        ];
    }
    async before(m, { conn }) {
        conn.tekateki = conn.tekateki ? conn.tekateki : {};
        const id = m.chat;
        if (!conn.tekateki[id])
            return;
        let json = conn.tekateki[id][1];
        if (m.text.toLowerCase() == json.response.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += conn.tekateki[id][2];
            conn.reply(m.chat, `${funMessages.adivinar.correct(conn.tekateki[id][2])}`, m);
            clearTimeout(conn.tekateki[id][3]);
            delete conn.tekateki[id];
        }
        else if (similarity(m.text.toLowerCase(), json.response.toLowerCase().trim()) >= 0.72) {
            m.reply(funMessages.adivinar.almost);
        }
        else {
            m.reply(funMessages.adivinar.incorrect);
        }
    }
}
//# sourceMappingURL=AcertijoCommand.js.map