import jimp from 'jimp'

let handler = async (m, { conn, text }) => {
	let image = m.message?.imageMessage
		? await m.download()
			: /image/.test(m.quoted?.mediaType)
		? await m.quoted.download()
			: m.mentionedJid?.[0]
		? await conn.profilePictureUrl(m.mentionedJid[0], 'image')
			: await conn.profilePictureUrl(m.quoted?.sender || m.sender, 'image')
	if (!image) throw m.reply(`✧ Responde a una *Imagen*.`)
	let level = text || '5', img = await jimp.read(image)
	img.blur(isNaN(level) ? 5 : parseInt(level))
	img.getBuffer('image/jpeg', (err, buffer) => {
		if (err) throw err?.message || `Error`
		m.reply(buffer)
	})
}

handler.help = ['blur']
handler.tags = ['ai']
handler.command = /^(blur)$/i
handler.register = true

export default handler
