import fetch from 'node-fetch';
import fs from 'fs';
const fantasyDBPath = './fantasy.json';
let id_message, pp, dato, fake, user = null;
const validClasses = ['Común', 'Poco Común', 'Raro', 'Épico', 'Legendario', 'Sagrado', 'Supremo', 'Transcendental'];
let handler = async (m, { command, usedPrefix, conn, text }) => {
    user = global.db.data.users[m.sender];
    const jsonURL = 'https://raw.githubusercontent.com/GataNina-Li/module/main/imagen_json/anime.json';
    const response = await fetch(jsonURL);
    const data = await response.json();
    var fantasyDB = [];
    if (fs.existsSync(fantasyDBPath)) {
        const data = fs.readFileSync(fantasyDBPath, 'utf8');
        var fantasyDB = JSON.parse(fs.readFileSync(fantasyDBPath, 'utf8'));
    }
    const userId = m.sender;
    let usuarioExistente = fantasyDB.find(user => Object.keys(user)[0] === userId);
    if (!text) {
        if (!usuarioExistente) {
            fake = { contextInfo: { externalAdReply: { title: `🌟 ¡Colecciona Personajes!`, body: `Compra un personaje y vuelve aquí`, sourceUrl: accountsgb, thumbnailUrl: gataMenu } } };
            return conn.reply(m.chat, `Use el comando *${usedPrefix}fantasy* o *${usedPrefix}fy* para comprar un personaje`, m, fake);
        }
        const fantasyUsuario = usuarioExistente[userId].fantasy;
        if (fantasyUsuario.length === 0) {
            fake = { contextInfo: { externalAdReply: { title: `😅 ¡No tienes Personajes!`, body: `Vuelve a comprar y regresa aquí`, sourceUrl: accountsgb, thumbnailUrl: gataMenu } } };
            return conn.reply(m.chat, `*No posee personajes.* Primero compre un personaje usando *${usedPrefix}fantasy* o *${usedPrefix}fy* para cambiarlo por *Tiempo Premium*`, m);
        }
        const personajesDisponibles = obtenerPersonajesDisponibles(userId, fantasyUsuario, data.infoImg);
        const listaPersonajes = construirListaPersonajes(personajesDisponibles);
        await conn.sendFile(m.chat, gataImg, 'fantasy.jpg', `> Use *${usedPrefix + command} nombre o código* del personaje\n\n` + listaPersonajes, fkontak, true, {
            contextInfo: {
                'forwardingScore': 200,
                'isForwarded': false,
                externalAdReply: {
                    showAdAttribution: false,
                    renderLargerThumbnail: false,
                    title: `🌟 FANTASÍA RPG`,
                    body: `😼 Personajes de: » ${conn.getName(userId)}`,
                    mediaType: 1,
                    sourceUrl: accountsgb,
                    thumbnailUrl: 'https://i.imgur.com/vIH5SKp.jpg'
                }
            }
        }, { mentions: userId });
        return;
    }
    const imageInfo = data.infoImg.find(img => img.name.toLowerCase() === text.toLowerCase() || img.code === text);
    fake = { contextInfo: { externalAdReply: { title: `🤨 ¡Verifique el nombre o código!`, body: `Escriba ${usedPrefix + command} para ver sus personajes`, sourceUrl: accountsgb, thumbnailUrl: gataMenu } } };
    if (!imageInfo && text)
        return conn.reply(m.chat, `*No se encontró la imagen con el nombre o código:* \`\`\`${text}\`\`\``, m, fake);
    const imageCode = imageInfo.code;
    const personaje = imageInfo.name;
    const imageClass = imageInfo.class;
    const imageURL = imageInfo.url;
    var fantasyDB = [];
    if (fs.existsSync(fantasyDBPath)) {
        const data = fs.readFileSync(fantasyDBPath, 'utf8');
        fantasyDB = JSON.parse(data);
    }
    usuarioExistente = fantasyDB.find(user => Object.keys(user)[0] === userId);
    if (usuarioExistente) {
        const idUsuario = Object.keys(usuarioExistente)[0];
        const fantasyUsuario = usuarioExistente[idUsuario].fantasy;
        const nombresPersonajesFantasy = fantasyUsuario.map(personaje => personaje.name);
        const personajesInfoCoincidentes = data.infoImg.filter(img => nombresPersonajesFantasy.includes(img.name));
        const imageInfo = data.infoImg.find(img => img.name.toLowerCase() === text.toLowerCase() || img.code === text);
        const imageClass = imageInfo.class;
        const personajesMismaClase = personajesInfoCoincidentes.filter(personaje => personaje.class === imageClass);
        const personajesAEliminar = fantasyUsuario.filter(personaje => {
            const infoCoincidente = personajesInfoCoincidentes.find(img => img.name === personaje.name);
            return infoCoincidente && infoCoincidente.class === imageClass;
        });
        if (personajesMismaClase.length > 1) {
            const tiempoTotal = personajesMismaClase.reduce((total, p) => total + getTiempoPremium(p.class, validClasses), 0);
            const tiempoTotalFormateado = formatearTiempo(tiempoTotal * 60 * 1000, true);
            fake = { contextInfo: { externalAdReply: { title: `🌟 Personajes de clase: ${imageClass}`, body: `Puedes hacer un solo cambio por 🤩🎟️`, sourceUrl: accountsgb, thumbnailUrl: gataMenu } } };
            const mensajeConfirmacion = `*${conn.getName(m.sender)}* Hemos encontrado que tienes *${personajesMismaClase.length}* personajes en la *Clase ${imageClass}*\n\n🤗 *¿Deseas cambiar todos los personajes por tiempo premium 🎟️?*\n😻 _Tiempo premium estimado si cambias todos tus personajes ahora:_ 🎟️ \`\`\`${tiempoTotalFormateado}\`\`\`\n\n🌟 Responde a este mensaje con *"Si"* o *"👍"*, de lo contrario escriba *"No"* o *"👎"* para sólo cambiar el personaje inicial: *${personaje}*`;
            id_message = (await conn.reply(m.chat, mensajeConfirmacion, m, fake)).key.id;
        }
        else {
            const imagenUsuario = fantasyUsuario.find(personaje => personaje.id === imageCode);
            if (imagenUsuario) {
                fantasyUsuario.splice(fantasyUsuario.indexOf(imagenUsuario), 1);
                fs.writeFileSync(fantasyDBPath, JSON.stringify(fantasyDB, null, 2), 'utf8');
                const tiempoPremium = getTiempoPremium(imageClass, validClasses);
                asignarTiempoPremium(user, tiempoPremium);
                const tiempoPremiumFormateado = formatearTiempo(tiempoPremium * 60 * 1000, true);
                fake = { contextInfo: { externalAdReply: { title: `✅ ¡Personaje ${personaje} cambiado!`, body: `🎟️ Tienes Premium por: ${tiempoPremiumFormateado} `, sourceUrl: accountsgb, thumbnailUrl: imageURL } } };
                await conn.reply(m.chat, `*Has cambiado a ${personaje} por Tiempo premium*\n\n🎟️ *Tiempo premium:* \`\`\`${tiempoPremiumFormateado}\`\`\``, m, fake);
                let userInDB = fantasyDB.find(userEntry => userEntry[userId]);
                if (userInDB) {
                    userInDB[userId].record[0].total_purchased -= 1;
                    fs.writeFileSync(fantasyDBPath, JSON.stringify(fantasyDB, null, 2), 'utf8');
                }
            }
        }
    }
    handler.before = async (m) => {
        let usuarioExistente = fantasyDB.find(user => Object.keys(user)[0] === userId);
        if (!(m.sender in usuarioExistente) || !usuarioExistente[m.sender].fantasy.some(personaje => personaje.id === imageInfo.code))
            return;
        if (m.quoted && m.quoted.id == id_message && ['si', '👍'].includes(m.text.toLowerCase())) {
            let usuarioExistente = fantasyDB.find(user => Object.keys(user)[0] === userId);
            if (!usuarioExistente)
                return;
            const idUsuario = Object.keys(usuarioExistente)[0];
            const fantasyUsuario = usuarioExistente[idUsuario].fantasy;
            const nombresPersonajesFantasy = fantasyUsuario.map(personaje => personaje.name);
            const personajesInfoCoincidentes = data.infoImg.filter(img => nombresPersonajesFantasy.includes(img.name));
            const personajesMismaClase = personajesInfoCoincidentes.filter(personaje => personaje.class === imageClass);
            personajesMismaClase.forEach(p => {
                const index = fantasyUsuario.findIndex(personaje => personaje.name === p.name);
                if (index !== -1) {
                    fantasyUsuario.splice(index, 1);
                }
            });
            fs.writeFileSync(fantasyDBPath, JSON.stringify(fantasyDB, null, 2), 'utf8');
            const tiempoTotal = personajesMismaClase.reduce((total, p) => total + getTiempoPremium(p.class, validClasses), 0);
            asignarTiempoPremium(user, tiempoTotal);
            const tiempoTotalFormateado = formatearTiempo(tiempoTotal * 60 * 1000, true);
            fake = { contextInfo: { externalAdReply: { title: `✅ ¡${personajesMismaClase.length} Personajes cambiados!`, body: `🎟️ Tienes Premium por: ${tiempoPremiumFormateado} `, sourceUrl: accountsgb, thumbnailUrl: gataMenu } } };
            await conn.reply(m.chat, `*Has cambiado a ${personajesMismaClase.length} Personajes por Tiempo premium\n\n🎟️ *Tiempo premium:* \`\`\`${tiempoTotalFormateado}\`\`\``, m, fake);
            let userInDB = fantasyDB.find(userEntry => userEntry[userId]);
            if (userInDB) {
                userInDB[userId].record[0].total_purchased -= personajesMismaClase.length;
                fs.writeFileSync(fantasyDBPath, JSON.stringify(fantasyDB, null, 2), 'utf8');
            }
        }
        if (m.quoted && m.quoted.id == id_message && ['no', '👎'].includes(m.text.toLowerCase())) {
            let usuarioExistente = fantasyDB.find(user => Object.keys(user)[0] === userId);
            const fantasyUsuario = usuarioExistente[userId].fantasy;
            const imagenUsuario = fantasyUsuario.find(personaje => personaje.id === imageCode);
            fantasyUsuario.splice(fantasyUsuario.indexOf(imagenUsuario), 1);
            fs.writeFileSync(fantasyDBPath, JSON.stringify(fantasyDB, null, 2), 'utf8');
            const tiempoPremium = getTiempoPremium(imageClass, validClasses);
            asignarTiempoPremium(user, tiempoPremium);
            const tiempoPremiumFormateado = formatearTiempo(tiempoPremium * 60 * 1000, true);
            fake = { contextInfo: { externalAdReply: { title: `✅ ¡Personaje ${personaje} cambiado!`, body: `🎟️ Tienes Premium por: ${tiempoPremiumFormateado} `, sourceUrl: accountsgb, thumbnailUrl: imageURL } } };
            await conn.reply(m.chat, `*Has cambiado a ${personaje} por Tiempo premium*\n\n🎟️ *Tiempo premium:* \`\`\`${tiempoPremiumFormateado}\`\`\``, m, fake);
            let userInDB = fantasyDB.find(userEntry => userEntry[userId]);
            if (userInDB) {
                userInDB[userId].record[0].total_purchased -= 1;
                fs.writeFileSync(fantasyDBPath, JSON.stringify(fantasyDB, null, 2), 'utf8');
            }
        }
    };
};
handler.command = /^(fantasychange|fychange|fantasycambiar|fycambiar)$/i;
export default handler;
function getTiempoPremium(imageClass, validClasses) {
    const index = validClasses.indexOf(imageClass);
    const tiempoPremiums = [30, 60, 90, 120, 240, 420, 600, 1440];
    return tiempoPremiums[index] || 0;
}
function asignarTiempoPremium(user, tiempoPremium) {
    const tiempo = tiempoPremium * 60 * 1000;
    const now = new Date() * 1;
    if (now < user.premiumTime)
        user.premiumTime += tiempo;
    else
        user.premiumTime = now + tiempo;
    user.premium = true;
}
function formatearTiempo(tiempoEnMilisegundos, usarAbreviaturas = false) {
    const segundos = Math.floor(tiempoEnMilisegundos / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    const tiempoFormateado = [];
    if (usarAbreviaturas) {
        if (dias > 0)
            tiempoFormateado.push(`${dias}d`);
        if (horas % 24 > 0)
            tiempoFormateado.push(`${horas % 24}h`);
        if (minutos % 60 > 0)
            tiempoFormateado.push(`${minutos % 60}min`);
        if (segundos % 60 > 0)
            tiempoFormateado.push(`${segundos % 60}seg`);
    }
    else {
        if (dias > 0)
            tiempoFormateado.push(`${dias} día${dias > 1 ? 's' : ''}`);
        if (horas % 24 > 0)
            tiempoFormateado.push(`${horas % 24} hora${horas % 24 > 1 ? 's' : ''}`);
        if (minutos % 60 > 0)
            tiempoFormateado.push(`${minutos % 60} minuto${minutos % 60 > 1 ? 's' : ''}`);
        if (segundos % 60 > 0)
            tiempoFormateado.push(`${segundos % 60} segundo${segundos % 60 > 1 ? 's' : ''}`);
    }
    return tiempoFormateado.length > 0 ? tiempoFormateado.join(', ') : '0 segundos';
}
function obtenerPersonajesDisponibles(userId, fantasyUsuario, infoImg) {
    const personajesDisponibles = [];
    fantasyUsuario.forEach(personaje => {
        const info = infoImg.find(img => img.code === personaje.id);
        if (info) {
            personajesDisponibles.push({
                id: personaje.id,
                name: personaje.name,
                code: personaje.id,
                class: info.class
            });
        }
    });
    return personajesDisponibles;
}
function construirListaPersonajes(personajes) {
    const personajesPorClase = {};
    validClasses.forEach(clase => {
        personajesPorClase[clase] = [];
    });
    personajes.forEach(personaje => {
        personajesPorClase[personaje.class].push(personaje);
    });
    let listaFinal = '';
    validClasses.forEach(clase => {
        const tiempoPremium = formatearTiempo(getTiempoPremium(clase, validClasses) * 60 * 1000, true);
        const mensajeClase = personajesPorClase[clase].length > 0 ?
            `\n*${clase} | ${tiempoPremium} premium 🎟️*\n${personajesPorClase[clase].map(personaje => `• _${personaje.name}_ » \`\`\`(${personaje.id})\`\`\``).join('\n')}\n` :
            `\n*${clase} | ${tiempoPremium} premium 🎟️*\n\`\`\`✘ Personajes no encontrados\`\`\`\n`;
        listaFinal += mensajeClase;
    });
    return listaFinal.trim();
}
//# sourceMappingURL=rpg-fantasy_change.js.map