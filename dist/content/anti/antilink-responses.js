export const ANTILINK_URL_REGEX = /(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/[^\s]*)?/i;
export const ANTILINK_DELETE_MESSAGE = (user) => `\
\
@${user} link are not allowed here\
\
`;
export const ANTILINK_KICK_MESSAGE = (user) => `\
\
@${user} has been kicked for sending links\
\
`;
export const ANTILINK_WARN_MESSAGE = (user, warningCount, warnCountLimit) => `\
\
@${user} warning ${warningCount}/${warnCountLimit} for sending links\
\
`;
export const ANTILINK_KICK_AFTER_WARN_MESSAGE = (user, warnCountLimit) => `\
\
@${user} has been kicked after ${warnCountLimit} warnings\
\
`;
export const ANTILINK_ERROR = "Error in Antilink:";
//# sourceMappingURL=antilink-responses.js.map