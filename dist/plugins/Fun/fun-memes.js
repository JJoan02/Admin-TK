let handler = async (m) => {
    const memes = [
        'https://i.imgur.com/1.jpg',
        'https://qu.ax/dpYLN.jpg',
        'https://qu.ax/YvLWt.jpg',
        'https://qu.ax/FxBzq.jpg',
        'https://qu.ax/oRkAi.jpg',
        'https://qu.ax/Gfnrz.jpg',
        'https://qu.ax/UFWsB.jpg',
        'https://qu.ax/rubYe.jpg',
        'https://qu.ax/UFWsB.jpg',
        'https://qu.ax/uyjpK.jpg',
        'https://qu.ax/RcxFR.jpg',
        'https://qu.ax/MctMj.jpg',
        'https://qu.ax/znbWC.jpg',
        'https://qu.ax/lLJMP.jpg',
        'https://qu.ax/HhOVP.jpg',
        'https://qu.ax/yQoQW.jpg',
        'https://qu.ax/msDFZ.jpg',
        'https://qu.ax/MTDhM.jpg',
        'https://qu.ax/hFQOL.jpg'
    ];
    const randomMeme = memes[Math.floor(Math.random() * memes.length)];
    await conn.sendMessage(m.chat, { image: { url: randomMeme }, caption: "¡Aquí tienes un meme para alegrar tu día!" }, { quoted: m });
};
handler.help = ['meme'];
handler.tags = ['diversión'];
handler.command = ['meme'];
export default handler;
//# sourceMappingURL=fun-memes.js.map