/**
 * @param {import('@whiskeysockets/baileys').WASocket | import('@whiskeysockets/baileys').WALegacySocket}
 */
declare function bind(conn: any): void;
/**
 *
 * @param {String} filename
 * @param {import('pino').Logger} logger
 * @returns
 */
declare function useSingleFileAuthState(filename: any, logger: any): {
    state: {
        creds: any;
        keys: {
            get: (type: any, ids: any) => any;
            set: (data: any) => void;
        };
    };
    saveState: (forceSave: any) => void;
};
declare function loadMessage(jid: any, id?: null): null;
declare const _default: {
    bind: typeof bind;
    useSingleFileAuthState: typeof useSingleFileAuthState;
    loadMessage: typeof loadMessage;
};
export default _default;
//# sourceMappingURL=info-convert.d.ts.map