import { Baileys } from '@whiskeysockets/baileys';
declare function isAdmin(sock: Baileys, chatId: string, senderId: string): Promise<{
    isSenderAdmin: boolean;
    isBotAdmin: boolean;
}>;
export default isAdmin;
//# sourceMappingURL=isAdmin.d.ts.map