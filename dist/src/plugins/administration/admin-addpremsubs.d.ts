declare const handler: {
    (m: any, { conn, args, participants, usedPrefix, command }: {
        conn: any;
        args: any;
        participants: any;
        usedPrefix: any;
        command: any;
    }): Promise<any>;
    command: string[];
    rowner: boolean;
};
export default handler;
//# sourceMappingURL=admin-addpremsubs.d.ts.map