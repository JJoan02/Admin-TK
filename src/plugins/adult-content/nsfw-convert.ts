// nsfw-convert.ts - Plugin mejorado y optimizado
// Categoría: adult-content
// Funcionalidad: Contenido para adultos
// Convertido automáticamente a TypeScript con mejoras

import { InternalAPIService } from '../../api/InternalAPIService.js';


// TODO: Convertir require() a import
// TODO: Añadir export default
// TODO: Usar API interna en lugar de llamadas directas

import { InternalAPIService } from '../../api/InternalAPIService.js';
import axios from 'axios';

module.exports = {
  name: "yuri",
  alias: ["nsfwyuri"],
  desc: "Hentai picture of yuri waifu",
  category: "Nsfw",
  usage: `yuri`,
  react: "👹",
  start: async (Yaka, m, { prefix, NSFWstatus }) => {

    if (NSFWstatus == "false") return m.reply(`This group is not NSFW enabled!\n\nTo configure NSFW mode, type:\n\n*${prefix}nsfw*`);
    m.reply(mess.waiting)
    let buff = await axios.get(`https://fantox-apis.vercel.app/yuri`)
    let imgURL = buff.data.url


    let Button = [];
     
    let bmffg = {
      image: { url: imgURL },
      caption: `\n* Here What you are looking for 👀..*\n`,
      footer: `*${botName}*`,
      buttons: Button,
      headerType: 4,
    };

    await Yaka.sendMessage(m.from, bmffg, { quoted: m }).catch((err) => {
      return "Error!";
    });
  },
};


export default {};