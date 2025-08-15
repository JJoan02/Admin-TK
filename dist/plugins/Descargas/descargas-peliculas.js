import { ICommand, IPluginModule } from '../../types/plugin';
import fetch from "node-fetch";
import { MOVIE_INFO_NO_TEXT, MOVIE_INFO_NOT_FOUND, MOVIE_INFO_HEADER, MOVIE_INFO_TITLE, MOVIE_INFO_YEAR, MOVIE_INFO_RUNTIME, MOVIE_INFO_GENRE, MOVIE_INFO_DIRECTOR, MOVIE_INFO_ACTORS, MOVIE_INFO_LANGUAGE, MOVIE_INFO_AWARDS, MOVIE_INFO_VOTES, MOVIE_INFO_SCORE, MOVIE_INFO_TYPE, MOVIE_INFO_BOX_OFFICE, MOVIE_INFO_COUNTRY, MOVIE_INFO_REQUESTED_BY, MOVIE_INFO_FOOTER, OMDB_API_KEY } from '../../content/descargas/movie-info-responses';
class MovieInfoPlugin {
    name = "MovieInfoPlugin";
    commands = [
        {
            name: "pelicula",
            alias: ["peli"],
            desc: "Busca información sobre una película.",
            category: "Descargas",
            react: "🎬",
            execute: async (Yaka, m, { conn, text, usedPrefix, command }) => {
                if (!text)
                    throw m.reply(MOVIE_INFO_NO_TEXT(usedPrefix, command));
                let a = await fetch(`https://www.omdbapi.com/?t=${text}&apikey=${OMDB_API_KEY}`);
                let x = await a.json();
                if (x.Response === "False")
                    throw m.reply(MOVIE_INFO_NOT_FOUND(text));
                let mov_txt = `${MOVIE_INFO_HEADER}\n\n` +
                    `${MOVIE_INFO_TITLE} ${x.Title || "-"}\n` +
                    `${MOVIE_INFO_YEAR} ${x.Year || "-"}\n` +
                    `${MOVIE_INFO_RUNTIME} ${x.Runtime || "-"}\n` +
                    `${MOVIE_INFO_GENRE} ${x.Genre || "-"}\n` +
                    `${MOVIE_INFO_DIRECTOR} ${x.Director || "-"}\n` +
                    `${MOVIE_INFO_ACTORS} ${x.Actors || "-"}\n` +
                    `${MOVIE_INFO_LANGUAGE} ${x.Language || "-"}\n` +
                    `${MOVIE_INFO_AWARDS} ${x.Awards || "-"}\n` +
                    `${MOVIE_INFO_VOTES} ${x.imdbVotes || "-"}\n` +
                    `${MOVIE_INFO_SCORE} ${x.Metascore || "-"}\n` +
                    `${MOVIE_INFO_TYPE} ${x.Type || "-"}\n` +
                    `${MOVIE_INFO_BOX_OFFICE} ${x.BoxOffice || "-"}\n` +
                    `${MOVIE_INFO_COUNTRY} ${x.Country || "-"}\n\n` +
                    `${MOVIE_INFO_REQUESTED_BY(m.sender.split("@")[0])}\n` +
                    `${MOVIE_INFO_FOOTER}`;
                await conn.sendMessage(m.chat, { image: { url: x.Poster }, caption: mov_txt, mentions: [m.sender] }, { quoted: m });
            }
        }
    ];
}
export default MovieInfoPlugin;
//# sourceMappingURL=descargas-peliculas.js.map