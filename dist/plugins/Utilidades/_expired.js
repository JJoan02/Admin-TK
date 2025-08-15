export async function before(m, conn) {
    if (!m.isGroup)
        return;
    let chats = global.db.data.chats[m.chat];
    if (!chats.expired)
        return !0;
    if (+new Date() > chats.expired) {
        let pp = './media/menus/Menu2.jpg';
        await m.reply(`${this.user.name}\n ${lenguajeGB['smsBottem1']()}`);
        await this.groupLeave(m.chat);
        chats.expired = null;
    }
}
//# sourceMappingURL=_expired.js.map