"use strict";
const { sessionSchema } = require("../Database");
module.exports = class Database {
    constructor() { }
    getSession = async (sessionId) => await this.session.findOne({ sessionId });
    session = sessionSchema;
};
//# sourceMappingURL=Database.js.map