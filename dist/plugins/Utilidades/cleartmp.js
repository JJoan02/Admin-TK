"use strict";
const fs = require('fs');
const path = require('path');
function clearDirectory(dirPath) {
    try {
        if (!fs.existsSync(dirPath)) {
            return { success: false, message: `Directory does not exist: ${dirPath}` };
        }
        const files = fs.readdirSync(dirPath);
        let deletedCount = 0;
        for (const file of files) {
            try {
                const filePath = path.join(dirPath, file);
                fs.unlinkSync(filePath);
                deletedCount++;
            }
            catch (err) {
                console.error(`Error deleting file ${file}:`, err);
            }
        }
        return { success: true, message: `Cleared ${deletedCount} files in ${path.basename(dirPath)}`, count: deletedCount };
    }
    catch (error) {
        console.error('Error in clearDirectory:', error);
        return { success: false, message: `Failed to clear files in ${path.basename(dirPath)}`, error: error.message };
    }
}
async function clearTmpDirectory() {
    const tmpDir = path.join(process.cwd(), 'tmp');
    const tempDir = path.join(process.cwd(), 'temp');
    const results = [];
    results.push(clearDirectory(tmpDir));
    results.push(clearDirectory(tempDir));
    const success = results.every(r => r.success);
    const totalDeleted = results.reduce((sum, r) => sum + (r.count || 0), 0);
    const message = results.map(r => r.message).join(' | ');
    return { success, message, count: totalDeleted };
}
async function clearTmpCommand(sock, chatId, msg) {
    try {
        const isOwner = msg.key.fromMe;
        if (!isOwner) {
            await sock.sendMessage(chatId, {
                text: '❌ This command is only available for the owner!'
            });
            return;
        }
        const result = await clearTmpDirectory();
        if (result.success) {
            await sock.sendMessage(chatId, {
                text: `✅ ${result.message}`
            });
        }
        else {
            await sock.sendMessage(chatId, {
                text: `❌ ${result.message}`
            });
        }
    }
    catch (error) {
        console.error('Error in cleartmp command:', error);
        await sock.sendMessage(chatId, {
            text: '❌ Failed to clear temporary files!'
        });
    }
}
function startAutoClear() {
    clearTmpDirectory().then(result => {
        if (!result.success) {
            console.error(`[Auto Clear] ${result.message}`);
        }
    });
    setInterval(async () => {
        const result = await clearTmpDirectory();
        if (!result.success) {
            console.error(`[Auto Clear] ${result.message}`);
        }
    }, 6 * 60 * 60 * 1000);
}
startAutoClear();
module.exports = clearTmpCommand;
//# sourceMappingURL=cleartmp.js.map