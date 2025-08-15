import { ICommand, IPluginModule } from '../../types/plugin';
import axios from 'axios';
import { ANIME_IMAGES_RESULT_HEADER, ANIME_IMAGES_SUB_HEADER, ANIME_IMAGES_ERROR } from '../../content/anime/anime-images-responses';
class AnimeImagesPlugin {
    name = "AnimeImagesPlugin";
    commands = [
        {
            name: "anime_images",
            alias: [
                'akira', 'akiyama', 'anna', 'asuna', 'ayuzawa', 'boruto', 'chiho', 'chitoge', 'deidara', 'erza', 'elaina', 'eba', 'emilia', 'hestia', 'hinata', 'inori', 'isuzu', 'itachi', 'itori', 'kaga', 'kagura', 'kaori', 'keneki', 'kotori', 'kurumi', 'madara', 'mikasa', 'miku', 'minato', 'naruto', 'nezuko', 'sagiri', 'sasuke', 'sakura', 'cosplay'
            ],
            desc: "Muestra imágenes de anime de varias categorías.",
            category: "Anime",
            react: "🖼️",
            execute: async (Yaka, m, { conn, command }) => {
                try {
                    const res = (await axios.get(`https://raw.githubusercontent.com/CheirZ/HuTao-Proyect/master/src/JSON/anime-${command}.json`)).data;
                    const haha = await res[Math.floor(res.length * Math.random())];
                    const messages = [
                        ['Imagen 1', dev, await res[Math.floor(res.length * Math.random())], [[]], [[]], [[]], [[]]],
                        ['Imagen 2', dev, await res[Math.floor(res.length * Math.random())], [[]], [[]], [[]], [[]]],
                        ['Imagen 3', dev, await res[Math.floor(res.length * Math.random())], [[]], [[]], [[]], [[]]],
                        ['Imagen 4', dev, await res[Math.floor(res.length * Math.random())], [[]], [[]], [[]], [[]]]
                    ];
                    await conn.sendCarousel(m.chat, ANIME_IMAGES_RESULT_HEADER(command), ANIME_IMAGES_SUB_HEADER(command), null, messages, m);
                }
                catch (e) {
                    console.error("Error al obtener imágenes de anime:", e);
                    conn.reply(m.chat, ANIME_IMAGES_ERROR, m);
                }
            }
        }
    ];
}
export default AnimeImagesPlugin;
//# sourceMappingURL=anime-imagenes.js.map