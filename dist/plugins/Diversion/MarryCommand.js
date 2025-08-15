import { Command } from '../../core/Command.js';
import { marryMessages } from '../../lib/diversion-content.js';
let proposals = {};
const confirmation = {};
class MarryCommand extends Command {
    #dbService;
    #logger;
    constructor(dbService, logger) {
        super('marry', 'Propone matrimonio o se divorcia. Uso: !marry @mencion o !divorce');
        this.#dbService = dbService;
        this.#logger = logger;
        this.commands = ['marry', 'divorce'];
        this.groupOnly = true;
    }
    async execute(context) {
        const { m, conn, command } = context;
        const isPropose = /^marry$/i.test(command);
        const isDivorce = /^divorce$/i.test(command);
        const userIsMarried = async (userJid) => {
            const user = await this.#dbService.getUser(userJid);
            return user && user.partnerJid !== undefined;
        };
        const getPartnerJid = async (userJid) => {
            const user = await this.#dbService.getUser(userJid);
            return user ? user.partnerJid : undefined;
        };
        try {
            if (isPropose) {
                const proposee = m.quoted?.sender || m.mentionedJid?.[0];
                const proposer = m.sender;
                if (!proposee) {
                    if (await userIsMarried(proposer)) {
                        const partnerJid = await getPartnerJid(proposer);
                        return await conn.reply(m.chat, marryMessages.alreadyMarried(conn.getName(partnerJid)), m);
                    }
                    else {
                        throw new Error(marryMessages.mentionRequired);
                    }
                }
                if (await userIsMarried(proposer))
                    throw new Error(marryMessages.proposerAlreadyMarried(conn.getName(await getPartnerJid(proposer))));
                if (await userIsMarried(proposee))
                    throw new Error(marryMessages.proposeeAlreadyMarried(conn.getName(proposee), conn.getName(await getPartnerJid(proposee))));
                if (proposer === proposee)
                    throw new Error(marryMessages.selfPropose);
                proposals[proposer] = proposee;
                const proposerName = conn.getName(proposer);
                const proposeeName = conn.getName(proposee);
                const confirmationMessage = marryMessages.proposal(proposerName, proposeeName);
                await conn.reply(m.chat, confirmationMessage, m, { mentions: [proposee, proposer] });
                confirmation[proposee] = {
                    proposer,
                    timeout: setTimeout(async () => {
                        await conn.sendMessage(m.chat, { text: marryMessages.proposalTimeout }, { quoted: m });
                        delete confirmation[proposee];
                    }, 60000)
                };
            }
            else if (isDivorce) {
                if (!(await userIsMarried(m.sender)))
                    throw new Error(marryMessages.notMarried);
                const partner = await getPartnerJid(m.sender);
                await this.#dbService.updateUser(m.sender, { partnerJid: undefined });
                await this.#dbService.updateUser(partner, { partnerJid: undefined });
                await conn.reply(m.chat, marryMessages.divorceSuccess(conn.getName(m.sender), conn.getName(partner)), m);
            }
        }
        catch (error) {
            await conn.reply(m.chat, marryMessages.genericError(error.message), m);
        }
    }
    static async before(m, conn, dbService) {
        if (m.isBaileys)
            return;
        if (!(m.sender in confirmation))
            return;
        if (!m.text)
            return;
        const { proposer, timeout } = confirmation[m.sender];
        if (/^No$/i.test(m.text)) {
            clearTimeout(timeout);
            delete confirmation[m.sender];
            return conn.sendMessage(m.chat, { text: marryMessages.proposalRejected }, { quoted: m });
        }
        if (/^Si$/i.test(m.text)) {
            clearTimeout(timeout);
            delete proposals[proposer];
            delete confirmation[m.sender];
            await dbService.updateUser(proposer, { partnerJid: m.sender });
            await dbService.updateUser(m.sender, { partnerJid: proposer });
            await conn.sendMessage(m.chat, { text: marryMessages.marriageSuccess(conn.getName(proposer), conn.getName(m.sender)), mentions: [proposer, m.sender] }, { quoted: m });
        }
    }
}
export default MarryCommand;
//# sourceMappingURL=MarryCommand.js.map