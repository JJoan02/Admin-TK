import { Command } from '../../core/CommandBus.js';
import { funMessages } from '../content/fun-content.js';
export class ReactionCommand extends Command {
    reactionType;
    videos;
    reactEmoji;
    isNsfw;
    constructor(name, description, commands, tags, help, reactionType, videos, reactEmoji, isNsfw = false) {
        super();
        this.name = name;
        this.description = description;
        this.commands = commands;
        this.tags = tags;
        this.help = help;
        this.reactionType = reactionType;
        this.videos = videos;
        this.reactEmoji = reactEmoji;
        this.isNsfw = isNsfw;
        this.group = true;
    }
    async execute(context) {
        const { conn, m } = context;
        let who;
        if (this.isNsfw && !global.AdminTK_db.data.chats[m.chat].nsfw && m.isGroup) {
            return m.reply(funMessages.nsfwDisabled);
        }
        if (m.mentionedJid.length > 0) {
            who = m.mentionedJid[0];
        }
        else if (m.quoted) {
            who = m.quoted.sender;
        }
        else {
            who = m.sender;
        }
        const name = conn.getName(who);
        const name2 = conn.getName(m.sender);
        m.react(this.reactEmoji);
        let str;
        if (m.mentionedJid.length > 0) {
            str = funMessages[this.reactionType].mentioned(name2, name);
        }
        else if (m.quoted) {
            str = funMessages[this.reactionType].quoted(name2, name);
        }
        else {
            str = funMessages[this.reactionType].self(name2).trim();
        }
        if (m.isGroup) {
            const video = this.videos[Math.floor(Math.random() * this.videos.length)];
            const mentions = [who];
            conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
        }
    }
}
//# sourceMappingURL=ReactionCommand.js.map