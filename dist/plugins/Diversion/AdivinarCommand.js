import { funMessages } from '../content/fun-content';
import fs from 'fs';
import fetch from 'node-fetch';
import similarity from 'similarity';
const timeout = 60000;
const timeout2 = 20000;
const poin = 500;
const threshold = 0.72;
let juegos = {};
const archivosRespaldo = {
    acertijo: "acertijo.json",
    pelicula: "peliculas.json",
    trivia: "trivia.json"
};
async function obtenerPregunta(tipo) {
    let prompt = "";
    if (tipo === "acertijo") {
        prompt = "Genera un acertijo con su respuesta en formato JSON: {\"question\": \"<pregunta>\", \"response\": \"<respuesta>\"}. Solo genera el JSON sin ningún comentario adicional.";
    }
    else if (tipo === "pelicula") {
        prompt = "Genera un juego de adivinar película usando emojis como pista, en formato JSON: {\"question\": \"<pregunta>\", \"response\": \"<respuesta>\"}. Solo genera el JSON sin ningún comentario adicional.";
    }
    else if (tipo === "trivia") {
        prompt = "Genera una pregunta de trivia con opciones múltiples en formato JSON, siguiendo este formato: {\"question\": \"<pregunta>\\n\\nA) ...\\n\\nB) ...\\n\\nC) ...\", \"response\": \"<letra de la respuesta correcta>\"}. Solo genera el JSON sin ningún comentario adicional.";
    }
    try {
        let gpt = await fetch(`https://api.lolhuman.xyz/api/openai?apikey=Gatadios&text=${encodeURIComponent(prompt)}`);
        let res = await gpt.json();
        if (res.result) {
            let dataText = res.result;
            const match = dataText.match(/```json\s*([\s\S]*?)\s*```/);
            if (match) {
                dataText = match[1];
            }
            try {
                return JSON.parse(dataText);
            }
            catch (error) {
                console.error("Error al parsear JSON de la API:", error);
            }
        }
    }
    catch (error) {
        console.error(`Error en la API para ${tipo}:`, error);
    }
    try {
        let archivo = `./src/game/${archivosRespaldo[tipo]}`;
        let data = JSON.parse(fs.readFileSync(archivo, 'utf-8'));
        return data[Math.floor(Math.random() * data.length)];
    }
    catch (error) {
        return null;
    }
}
export default class AdivinarCommand {
    command = ['acertijo', 'acert', 'adivinanza', 'tekateki', 'advpe', 'adv', 'peliculas', 'pelicula', 'trivia', 'triviador'];
    description = 'Juega a adivinar acertijos, peliculas o trivias.';
    async execute(m, { conn, command }) {
        let id = m.chat;
        if (juegos[id])
            return conn.reply(m.chat, funMessages.adivinar.gameInProgress, m);
        try {
            let tipo = "";
            if (/^(acertijo|acert|adivinanza|tekateki)$/i.test(command))
                tipo = "acertijo";
            else if (/^(advpe|adv|peliculas|pelicula)$/i.test(command))
                tipo = "pelicula";
            else if (/^(trivia|triviador)$/i.test(command))
                tipo = "trivia";
            if (!tipo)
                return;
            let pregunta = await obtenerPregunta(tipo);
            if (!pregunta)
                return;
            let caption = "";
            if (tipo === "acertijo") {
                caption = funMessages.adivinar.acertijo.caption(pregunta.question, timeout, poin);
            }
            else if (tipo === "pelicula") {
                let clue = pregunta.response.replace(/[A-Za-z]/g, '_');
                caption = funMessages.adivinar.pelicula.caption(pregunta.question, clue, timeout, poin);
            }
            else if (tipo === "trivia") {
                caption = funMessages.adivinar.trivia.caption(pregunta.question, timeout2, poin);
            }
            let enviado = await conn.reply(m.chat, caption, m);
            juegos[id] = {
                tipo,
                pregunta,
                caption: enviado,
                puntos: poin,
                timeout: setTimeout(() => {
                    if (juegos[id]) {
                        conn.reply(m.chat, funMessages.adivinar.acertijo.timeUp(pregunta.response), enviado);
                        delete juegos[id];
                    }
                }, tipo === "trivia" ? timeout2 : timeout)
            };
        }
        catch (e) {
            console.error(e);
        }
    }
    async before(m, { conn }) {
        let id = m.chat;
        if (!juegos[id] || !m.quoted || !m.quoted.fromMe || !m.quoted.id)
            return;
        let juego = juegos[id];
        if (m.quoted.id !== juego.caption.key.id)
            return;
        let respuestaCorrecta = juego.pregunta.response.toLowerCase().trim();
        let respuestaUsuario = m.text.toLowerCase().trim();
        if (respuestaUsuario === respuestaCorrecta) {
            global.db.data.users[m.sender].exp += juego.puntos;
            m.reply(funMessages.adivinar.correct(juego.puntos));
            clearTimeout(juego.timeout);
            delete juegos[id];
        }
        else if (similarity(respuestaUsuario, respuestaCorrecta) >= threshold) {
            m.reply(funMessages.adivinar.almost);
        }
        else {
            m.reply(funMessages.adivinar.incorrect);
        }
    }
}
//# sourceMappingURL=AdivinarCommand.js.map