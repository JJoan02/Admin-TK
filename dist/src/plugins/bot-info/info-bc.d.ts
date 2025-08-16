declare const handler: {
    (m: any, { conn, command, participants, usedPrefix, text }: {
        conn: any;
        command: any;
        participants: any;
        usedPrefix: any;
        text: any;
    }): Promise<any>;
    help: string[];
    tags: string[];
    command: string[];
    owner: boolean;
};
export default handler;
//# sourceMappingURL=info-bc.d.ts.map