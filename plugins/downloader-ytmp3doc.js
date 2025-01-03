import FormData from 'form-data';
import axios from 'axios';
import cheerio from 'cheerio';

const extractVideoID = (url) => {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(
      `🔰 Admin-TK: Por favor, envía el enlace del video de YouTube junto al comando.\n\n✦ Ejemplo:\n> ${usedPrefix + command} https://youtube.com/watch?v=kGobHQ7z8X4`
    );
  }

  const videoID = extractVideoID(text);
  if (!videoID) {
    return m.reply('🔰 Admin-TK: El enlace proporcionado no es válido. Asegúrate de usar un enlace de YouTube.');
  }

  await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key } });

  try {
    let ytdata = await ytdl(text);

    if (!ytdata.success || !ytdata.audio[0]) {
      throw new Error('No se pudo obtener el enlace de descarga de audio. Inténtalo más tarde.');
    }

    let audioInfo = ytdata.audio[0];
    await conn.sendMessage(
      m.chat,
      {
        document: { url: audioInfo.downloadLink },
        caption: `🔰 Admin-TK: Tu pedido está listo.\n\n🎵 Título: ${ytdata.title}\n⏳ Duración: ${ytdata.duration}\n✅ Audio descargado con éxito.`,
        mimetype: 'audio/mp3',
        fileName: `${ytdata.title}.mp3`,
      },
      { quoted: m }
    );

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    m.reply(
      `🔰 Admin-TK: Ocurrió un error al procesar tu solicitud.\n\n✦ Detalle del error:\n${error.message || 'Error desconocido.'}`
    );
  }
};

handler.help = ['ytmp3 *<link>*', 'ytadoc *<link>*'];
handler.tags = ['downloader'];
handler.command = /^(ytmp3|ytadoc|ytmp3doc)$/i;

export default handler;

async function ytdl(query) {
  const form = new FormData();
  form.append('query', query);

  try {
    const response = await axios.post('https://yttomp4.pro/', form, {
      headers: {
        ...form.getHeaders(),
      },
    });

    const $ = cheerio.load(response.data);

    const results = {
      success: true,
      title: $('.vtitle').text().trim(),
      duration: $('.res_left p').text().replace('Duracion: ', '').trim(),
      image: $('.ac img').attr('src'),
      video: [],
      audio: [],
      other: [],
    };

    $('.tab-item-data').each((index, tab) => {
      const tabTitle = $(tab).attr('id');
      $(tab).find('tbody tr').each((i, element) => {
        const fileType = $(element).find('td').eq(0).text().trim();
        const fileSize = $(element).find('td').eq(1).text().trim();
        const downloadLink = $(element).find('a.dbtn').attr('href');

        if (tabTitle === 'tab-item-1') {
          results.video.push({ fileType, fileSize, downloadLink });
        } else if (tabTitle === 'tab-item-2') {
          results.audio.push({ fileType, fileSize, downloadLink });
        } else if (tabTitle === 'tab-item-3') {
          results.other.push({ fileType, fileSize, downloadLink });
        }
      });
    });

    return results;
  } catch (error) {
    console.error('Error:', error.message);
    return { success: false, message: error.message };
  }
}
