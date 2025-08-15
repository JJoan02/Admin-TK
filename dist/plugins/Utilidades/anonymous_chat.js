async function handler(m, { usedPrefix, command }) {
    command = command.toLowerCase();
    this.anonymous = this.anonymous ? this.anonymous : {};
    switch (command) {
        case 'next':
        case 'leave': {
            let room = Object.values(this.anonymous).find(room => room.check(m.sender));
            if (!room)
                return this.sendMessage(m.chat, { text: `${lenguajeGB['smsChatAn1']()}\n${lenguajeGB['smsChatAn2']()}` }, { quoted: m });
            m.reply(`${lenguajeGB['smsChatAn4']()}`);
            let other = room.other(m.sender);
            if (other)
                await this.sendMessage(other, { text: `${lenguajeGB['smsChatAn5']()}` }, { quoted: m });
            delete this.anonymous[room.id];
            if (command === 'leave')
                break;
        }
        case 'start': {
            if (Object.values(this.anonymous).find(room => room.check(m.sender)))
                return this.sendMessage(m.chat, { text: `${lenguajeGB['smsChatAn7']()}` }, { quoted: m });
            let room = Object.values(this.anonymous).find(room => room.state === 'WAITING' && !room.check(m.sender));
            if (room) {
                await this.sendMessage(room.a, { text: `${lenguajeGB['smsChatAn10']()}` }, { quoted: m });
                room.b = m.sender;
                room.state = 'CHATTING';
                await this.sendMessage(m.chat, { text: `${lenguajeGB['smsChatAn10']()}` }, { quoted: m });
            }
            else {
                let id = +new Date;
                this.anonymous[id] = {
                    id,
                    a: m.sender,
                    b: '',
                    state: 'WAITING',
                    check: function (who = '') {
                        return [this.a, this.b].includes(who);
                    },
                    other: function (who = '') {
                        return who === this.a ? this.b : who === this.b ? this.a : '';
                    },
                };
                await this.sendMessage(m.chat, { text: `${lenguajeGB['smsChatAn13']()}` }, { quoted: m });
            }
            break;
        }
    }
}
handler.help = ['start', 'leave', 'next'];
handler.tags = ['anonymous'];
handler.command = ['start', 'leave', 'next'];
handler.private = true;
export default handler;
//# sourceMappingURL=anonymous_chat.js.map