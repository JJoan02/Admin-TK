"use strict";
const settings = require('../settings');
function isOwner(senderId) {
    const ownerJid = settings.ownerNumber + "@s.whatsapp.net";
    return senderId === ownerJid;
}
module.exports = isOwner;
//# sourceMappingURL=isOwner.js.map