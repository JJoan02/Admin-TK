import { Command } from '../../core/CommandBus.js';
import { tkContent } from '../content/tk-content.js';
export class TKStaffCommand extends Command {
    constructor() {
        super();
        this.name = 'staff';
        this.description = 'Muestra la información del staff del grupo.';
        this.commands = ['staff'];
        this.tags = ['tk'];
        this.help = ['staff'];
        this.group = true;
    }
    async execute(context) {
        const { conn, m, participants, groupMetadata } = context;
        const imageUrl = tkContent.images.staff;
        const fallbackImage = tkContent.images.staffFallback;
        const groupAdmins = participants.filter((p) => p.admin);
        if (groupAdmins.length === 0) {
            return m.reply('No hay administradores en este grupo.');
        }
        const formatPhoneNumber = (number) => {
            return number.replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, '+' + '$1 $2 $3 $4');
        };
        const listAdmin = groupAdmins.map((v, i) => {
            const number = formatPhoneNumber(v.id.split('@')[0]);
            const name = conn.getName(v.id) || 'Sin Nombre';
            return `*${i + 1}.* ${number} (${name})`;
        }).join('\n');
        const ownerId = groupMetadata.owner || groupAdmins.find((p) => p.admin === 'superadmin')?.id || '';
        const ownerNumber = ownerId ? formatPhoneNumber(ownerId.split('@')[0]) : 'No disponible';
        const ownerName = ownerId ? conn.getName(ownerId) || 'Sin Nombre' : 'No disponible';
        const text = tkContent.text.staff(ownerName, ownerNumber, listAdmin, tkContent.text.supportEmail, tkContent.text.supportWa, tkContent.urls.dashboard);
        try {
            await conn.sendFile(m.chat, imageUrl, 'soporte.jpg', text, m, null, fake);
        }
        catch (err) {
            console.error('Error al enviar la imagen desde la URL:', err.message);
            await conn.reply(m.chat, 'No se pudo cargar la imagen desde la URL. Enviando imagen de respaldo...');
            try {
                await conn.sendFile(m.chat, fallbackImage, 'soporte.jpg', text, m, null, fake);
            }
            catch (fallbackErr) {
                console.error('Error al enviar la imagen de respaldo:', fallbackErr.message);
                await conn.reply(m.chat, 'No se pudo cargar ninguna imagen. Por favor, contacta al soporte.');
            }
        }
    }
}
//# sourceMappingURL=TKStaffCommand.js.map