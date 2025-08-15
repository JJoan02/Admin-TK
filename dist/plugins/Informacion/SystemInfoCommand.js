import { Command } from '../../core/Command.js';
import os from 'os';
import { execSync } from 'child_process';
import { formatBytes, clockString } from '../../utils/helpers.js';
import { systemInfoMessages } from '../../lib/informacion-content.js';
const getDiskSpace = (logger) => {
    try {
        const stdout = execSync('df -h | grep -E "^/dev/root|^/dev/sda1"').toString();
        const [, size, used, available, usePercent] = stdout.split(/\s+/);
        return { size, used, available, usePercent };
    }
    catch (error) {
        logger.error('Error al obtener el espacio en disco:', error);
        return null;
    }
};
class SystemInfoCommand extends Command {
    #logger;
    constructor(logger) {
        super('system', 'Muestra información del sistema del bot.');
        this.#logger = logger;
        this.commands = ['system', 'sistema'];
    }
    async execute(context) {
        const { m, conn } = context;
        const totalMem = os.totalmem();
        const freeMem = os.freemem();
        const usedMem = totalMem - freeMem;
        const _muptime = process.uptime() * 1000;
        const muptime = clockString(_muptime);
        const hostname = os.hostname();
        const platform = os.platform();
        const arch = os.arch();
        const nodeUsage = process.memoryUsage();
        const diskSpace = getDiskSpace(this.#logger);
        let message = systemInfoMessages.header;
        message += systemInfoMessages.host(hostname);
        message += systemInfoMessages.platform(platform);
        message += systemInfoMessages.arch(arch);
        message += systemInfoMessages.totalRam(formatBytes(totalMem));
        message += systemInfoMessages.freeRam(formatBytes(freeMem));
        message += systemInfoMessages.usedRam(formatBytes(usedMem));
        message += systemInfoMessages.uptime(muptime);
        message += systemInfoMessages.nodeMemoryUsage;
        message += systemInfoMessages.rss(formatBytes(nodeUsage.rss));
        message += systemInfoMessages.heapTotal(formatBytes(nodeUsage.heapTotal));
        message += systemInfoMessages.heapUsed(formatBytes(nodeUsage.heapUsed));
        message += systemInfoMessages.external(formatBytes(nodeUsage.external));
        message += systemInfoMessages.arrayBuffers(formatBytes(nodeUsage.arrayBuffers));
        if (diskSpace) {
            message += systemInfoMessages.diskSpaceHeader;
            message += systemInfoMessages.diskSize(diskSpace.size);
            message += systemInfoMessages.diskUsed(diskSpace.used);
            message += systemInfoMessages.diskAvailable(diskSpace.available);
            message += systemInfoMessages.diskUsePercent(diskSpace.usePercent);
        }
        else {
            message += systemInfoMessages.diskError;
        }
        await conn.reply(m.chat, message.trim(), m, global.rcanal);
    }
}
export default SystemInfoCommand;
//# sourceMappingURL=SystemInfoCommand.js.map