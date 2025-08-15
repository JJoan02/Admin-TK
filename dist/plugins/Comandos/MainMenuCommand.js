import { Command } from '../../core/CommandBus.js';
import { mainMenuContent } from '../content/main-menu-content.js';
import { clockString, generateCommand } from '../../utils/helpers.js';
import moment from 'moment-timezone';
import ct from 'countries-and-timezones';
import { parsePhoneNumber } from 'libphonenumber-js';
export class MainMenuCommand extends Command {
    constructor() {
        super();
        this.name = 'menu';
        this.description = 'Muestra el menú principal del bot.';
        this.commands = ['menu', 'menú', 'memu', 'memú', 'help', 'info', 'comandos', '2help', 'menu1.2', 'ayuda', 'commands', 'commandos', 'menucompleto', 'allmenu', 'allm', 'm', '?'];
        this.tags = ['main'];
        this.help = ['menu'];
        this.exp = 50;
    }
    async execute(context) {
        const { conn, m, usedPrefix, command } = context;
        try {
            const wm = "Gata Dios";
            const vs = "1.0.0";
            const gt = "Admin-TK";
            const imagen4 = "https://example.com/imagen4.jpg";
            const redesMenu = "https://example.com/redesMenu";
            const fkontak = {};
            const gataVidMenu = "https://example.com/gataVidMenu.mp4";
            const gataImg = "https://example.com/gataImg.jpg";
            const accountsgb = "https://example.com/accountsgb";
            const { exp, limit, level, role } = global.db.data.users[m.sender];
            const { min, xp, max } = global.xpRange(level, global.multiplier);
            const d = new Date(new Date().getTime() + 3600000);
            const locale = 'es';
            const weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d.getTime() / 84600000) % 5];
            const week = d.toLocaleDateString(locale, { weekday: 'long' });
            const date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
            const dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);
            const time = d.toLocaleTimeString(locale, { hour: 'numeric', minute: 'numeric', second: 'numeric' });
            let _uptime = process.uptime() * 1000;
            let _muptime;
            if (process.send) {
                process.send('uptime');
                _muptime = await new Promise(resolve => {
                    process.once('message', resolve);
                    setTimeout(resolve, 1000);
                }) * 1000;
            }
            const muptime = clockString(_muptime);
            const uptime = clockString(_uptime);
            const totalreg = Object.keys(global.db.data.users).length;
            const rtotalreg = Object.values(global.db.data.users).filter((user) => user.registered == true).length;
            const user = global.db.data.users[m.sender];
            const username = conn.getName(m.sender);
            const mentionedJid = [m.sender];
            const pp = gataVidMenu;
            const numberToEmoji = { "0": "0️⃣", "1": "1️⃣", "2": "2️⃣", "3": "3️⃣", "4": "4️⃣", "5": "5️⃣", "6": "6️⃣", "7": "7️⃣", "8": "8️⃣", "9": "9️⃣", };
            const lvl = level;
            const emoji = Array.from(lvl.toString()).map((digit) => numberToEmoji[digit] || "❓").join("");
            let fechaMoment, formatDate, nombreLugar, ciudad = null;
            const phoneNumber = '+' + m.sender;
            const parsedPhoneNumber = parsePhoneNumber(phoneNumber);
            const countryCode = parsedPhoneNumber.country;
            const countryData = ct.getCountry(countryCode);
            const timezones = countryData.timezones;
            const zonaHoraria = timezones.length > 0 ? timezones[0] : 'UTC';
            moment.locale(global.mid.idioma_code);
            let lugarMoment = moment().tz(zonaHoraria);
            if (lugarMoment) {
                fechaMoment = lugarMoment.format('llll [(]a[)]');
                formatDate = fechaMoment.charAt(0).toUpperCase() + fechaMoment.slice(1);
                nombreLugar = countryData.name;
                const partes = zonaHoraria.split('/');
                ciudad = partes[partes.length - 1].replace(/_/g, ' ');
            }
            else {
                lugarMoment = moment().tz('America/Lima');
                fechaMoment = lugarMoment.format('llll [(]a[)]');
                formatDate = fechaMoment.charAt(0).toUpperCase() + fechaMoment.slice(1);
                nombreLugar = 'America';
                ciudad = 'Lima';
            }
            const margen = mainMenuContent.general.margin;
            const menuText = `
${mainMenuContent.header(wm, week, date, totalreg, role, level, user.premiumTime > 0)}

${margen}

> 🌟 ${mainMenuContent.infoSection.title} 🌟 

${mainMenuContent.infoSection.totalUsers(totalreg)}
${mainMenuContent.infoSection.registeredUsers(rtotalreg, totalreg)}    
${mainMenuContent.infoSection.uptime(uptime)}
${mainMenuContent.infoSection.version(vs)}
${mainMenuContent.infoSection.mode(global.opts?.['self'], 'Privado', 'Público')}
${mainMenuContent.infoSection.bannedChats(Object.entries(global.db.data.chats).filter((chat) => chat[1].isBanned).length)}
${mainMenuContent.infoSection.bannedUsers(Object.entries(global.db.data.users).filter((user) => user[1].banned).length)}

${margen}

> ✨ ${mainMenuContent.userInfoSection.title} ✨

*❰❰ Tipo de registro ❱❱*
➺ ${mainMenuContent.userInfoSection.registrationType(user.registered, user.registroC)}

*❰❰ Mi estado ❱❱*
➺ ${mainMenuContent.userInfoSection.myStatus(user.miestado, usedPrefix)}

*❰❰ Registrado ❱❱*
➺ ${mainMenuContent.userInfoSection.verified(user.registered, usedPrefix)}

*❰❰ Premium ❱❱* 
➺ ${mainMenuContent.userInfoSection.premiumStatus(user.premiumTime > 0, usedPrefix)}

*❰❰ Rol ❱❱* 
➺ ${mainMenuContent.userInfoSection.role(role)}

*❰❰ Nivel ❱❱*
➺ ${mainMenuContent.userInfoSection.level(emoji, user.exp - min, xp)}

*❰❰ Pareja ❱❱*
➺ ${mainMenuContent.userInfoSection.partner(user.pasangan ? conn.getName(user.pasangan) : null, username, 'Sin pareja')}

*❰❰ Pasatiempo(s) ❱❱* 
➺ ${mainMenuContent.userInfoSection.hobby(user.pasatiempo)}

${margen}

> 💫 INFORMACIÓN 💫
${generateCommand(mainMenuContent.sections.info.commands, usedPrefix)}

${margen}

> 💻 COMANDOS - SUB BOT
${generateCommand(mainMenuContent.sections.jadiBot.commands, usedPrefix)}

${margen}

> 🆘 REPORTAR COMANDOS 🆘
${generateCommand(mainMenuContent.sections.report.commands, usedPrefix)}

${margen}

> 🪅 GATABOT TEMPORAL 🪅
${generateCommand(mainMenuContent.sections.link.commands, usedPrefix)}

${margen}

> 🎟️ SER PREMIUM 🎟️
${generateCommand(mainMenuContent.sections.premium.commands, usedPrefix)}

${margen}

> 🎡 JUEGOS 🎡
${generateCommand(mainMenuContent.sections.games.commands, usedPrefix)}

${margen}

> ✨ IA ✨
${generateCommand(mainMenuContent.sections.ai.commands, usedPrefix)}

${margen}

> ⚙️ AJUSTES ⚙️
${m.isGroup ? `_✅ ➤ Activado_\n_❌ ➤ Desactivado_` : mainMenuContent.sections.settings.groupSettingsInfo.replace('${usedPrefix}', usedPrefix)}
${generateCommand(mainMenuContent.sections.settings.commands.map((cmd) => ({
                ...cmd,
                comando: typeof cmd.comando === 'function' ? cmd.comando(global.db.data.settings[conn.user.jid]?.[cmd.comando.name.replace(/^(bot|global|chat)/, '').toLowerCase()] || false) : cmd.comando,
                descripcion: typeof cmd.descripcion === 'function' ? cmd.descripcion(global.db.data.settings[conn.user.jid]?.[cmd.comando.name.replace(/^(bot|global|chat)/, '').toLowerCase()] || false) : cmd.descripcion,
            })), usedPrefix).replace(/≡/g, '𖡡')}

${margen}

> 🧾 AJUSTES/INFO - GRUPO 🧾
${generateCommand(mainMenuContent.sections.groupSettings.commands, usedPrefix)}

> 🪄 DESCARGAS 🪄
${generateCommand(mainMenuContent.sections.downloads.commands, usedPrefix)}

> 👤 CHAT ANONIMO 👤
${generateCommand(mainMenuContent.sections.anonymousChat.commands, usedPrefix)}

> 🌐 COMANDOS PARA GRUPOS 🌐
${generateCommand(mainMenuContent.sections.groupCommands.commands, usedPrefix)}

> 💞 PAREJAS 💞
${generateCommand(mainMenuContent.sections.couples.commands, usedPrefix)}

> 📦 VOTACIONES EN GRUPOS 📦
${generateCommand(mainMenuContent.sections.voting.commands, usedPrefix)}

> 🔞 CONTENIDO 🔞
${generateCommand(mainMenuContent.sections.nsfw.commands, usedPrefix)}

> 🔁 CONVERTIDORES 🔁
${generateCommand(mainMenuContent.sections.converters.commands, usedPrefix)}

> 🔆 LOGOS 🔆
${generateCommand(mainMenuContent.sections.logos.commands, usedPrefix)}

> 💥 EFECTOS 💥
${generateCommand(mainMenuContent.sections.effects.commands, usedPrefix)}

> 🍭 RANDOM/ANIME 🍭
${generateCommand(mainMenuContent.sections.randomAnime.commands, usedPrefix)}

> 🎙️ EFECTO DE AUDIO 🎙️
${generateCommand(mainMenuContent.sections.audioEffects.commands, usedPrefix)}

> 🔍 BÚSQUEDAS 🔍
${generateCommand(mainMenuContent.sections.search.commands, usedPrefix)}

> 🛠️ HERRAMIENTAS 🛠️
${generateCommand(mainMenuContent.sections.tools.commands, usedPrefix)}

> ⚗️ COMANDOS RPG ⚗️
${generateCommand(mainMenuContent.sections.rpg.commands, usedPrefix)}

> 🌟 RPG Fnatasy 🌟
${generateCommand(mainMenuContent.sections.rpgFantasy.commands, usedPrefix)}

> 🏆 TOP en RPG Fnatasy 🏆
${generateCommand(mainMenuContent.sections.rpgFantasyTop.commands, usedPrefix)}

> 🏆 TOP en GATABOT 🏆
${generateCommand(mainMenuContent.sections.gataBotTop.commands, usedPrefix)}

> 🎭 FILTROS EN STICKERS 🎭
${generateCommand(mainMenuContent.sections.stickerFilters.commands, usedPrefix)}

> 😼 MODIFICAR STICKERS 😼
${generateCommand(mainMenuContent.sections.modifyStickers.commands, usedPrefix)}

> 👻 STICKERS DINÁMICOS 👻
${generateCommand(mainMenuContent.sections.dynamicStickers.commands, usedPrefix)}

> 💎 PARA MI CREADOR/A 💎
${generateCommand(mainMenuContent.sections.ownerCommands.commands, usedPrefix)}
`.trim();
            await conn.sendFile(m.chat, gataVidMenu, 'gata.mp4', menuText, global.fkontak, false, {
                contextInfo: {
                    externalAdReply: {
                        mediaUrl: null,
                        mediaType: 1,
                        description: null,
                        title: gt,
                        body: ' 😻 𝗦𝘂𝗽𝗲𝗿 𝗚𝗮𝘁𝗮𝗕𝗼𝘁-𝗠𝗗 - 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 ',
                        previewType: 0,
                        thumbnail: imagen4,
                        sourceUrl: redesMenu
                    }
                }
            });
        }
        catch (e) {
            console.error(e);
            await conn.reply(m.chat, `Error al generar el menú: ${e.message}`, m);
        }
    }
}
//# sourceMappingURL=MainMenuCommand.js.map