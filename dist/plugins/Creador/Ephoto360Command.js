import { Command } from '../../core/CommandBus.js';
import { ephoto360Messages } from '../content/creator-content.js';
import axios from 'axios';
export class Ephoto360Command extends Command {
    apiEndpoints = {
        logohacker: 'anonymhacker',
        aovwallpaper: 'aovwall',
        logofreefire: 'freefire',
        meme1: 'meme4',
        meme2: 'kannagen',
        boom: 'boom-comic',
        graffiticartoon: 'cartoon-graffiti',
        girlgamer: 'cute-girl-gamer',
        firework: 'firework-effect',
        cardchristmas: 'card-christmas',
        flowercard: 'flower-card',
        gold: 'gold-effect',
        handlove: 'hand-love',
        heartcup: 'heart-cup',
        heartflashlight: 'heart-flashlight',
        birthdaycake: 'birthday-cake',
        birthdaycake2: 'birthday-cake10',
        birthdaycake3: 'birthday-cake2',
        facebooksilverplay: 'facebook-silver-play-button',
        facebooksilverplay2: 'facebook-gold-play-button',
        neonsantin: 'neon-satin',
        womenday: 'women-day',
        summerysand: 'summerysand',
        wetglass: 'wet-glass',
        mylove: 'my-love',
        pikachu: 'pikachu',
        logochristmas: 'christmas-snow',
    };
    constructor() {
        super();
        this.name = 'ephoto360';
        this.description = 'Genera logos y efectos de imagen usando Ephoto360.';
        this.commands = Object.keys(this.apiEndpoints);
        this.tags = ['maker'];
        this.help = Object.keys(this.apiEndpoints).map(cmd => `${cmd} <text>`);
    }
    async execute(context) {
        const { conn, m, args, command } = context;
        const responseText = args.join(' ');
        if (!responseText) {
            return conn.reply(m.chat, ephoto360Messages.noText(global.mg), m);
        }
        const endpoint = this.apiEndpoints[command];
        if (!endpoint) {
            return conn.reply(m.chat, `Comando ${command} no reconocido.`, m);
        }
        if (command === 'link1') {
            return conn.reply(m.chat, 'Este comando requiere una imagen. No implementado aún para esta refactorización.', m);
        }
        try {
            await conn.reply(m.chat, ephoto360Messages.creating(global.eg), m);
            let apiUrl = '';
            if (command === 'meme1' || command === 'meme2') {
                apiUrl = `https://api.lolhuman.xyz/api/meme4?apikey=${global.Key360}&text=${encodeURIComponent(responseText)}`;
                if (command === 'meme2') {
                    apiUrl = `https://api.lolhuman.xyz/api/creator/kannagen?apikey=${global.Key360}&text=${encodeURIComponent(responseText)}`;
                }
            }
            else if (command === 'logochristmas') {
                apiUrl = `https://violetics.pw/api/ephoto360/christmas-snow?apikey=beta&text=${encodeURIComponent(responseText)}`;
            }
            else {
                apiUrl = `https://violetics.pw/api/ephoto360/${endpoint}?apikey=${global.Key360}&text=${encodeURIComponent(responseText)}`;
            }
            const res = await axios.get(apiUrl, { responseType: 'arraybuffer' });
            await conn.sendFile(m.chat, res.data, 'image.jpg', null, m);
        }
        catch (e) {
            console.error(e);
            conn.reply(m.chat, ephoto360Messages.error(global.fg), m);
        }
    }
}
//# sourceMappingURL=Ephoto360Command.js.map