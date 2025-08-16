declare const handler: {
    (m: any, { conn, participants, groupMetadata }: {
        conn: any;
        participants: any;
        groupMetadata: any;
    }): Promise<any>;
    help: string[];
    tags: string[];
    command: string[];
    register: boolean;
    group: boolean;
};
export default handler;
//# sourceMappingURL=admin-infogrupo.d.ts.map