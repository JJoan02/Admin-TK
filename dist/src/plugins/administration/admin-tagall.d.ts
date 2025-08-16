declare const handler: {
    (m: any, { isOwner, isAdmin, conn, text, participants, args, command, usedPrefix }: {
        isOwner: any;
        isAdmin: any;
        conn: any;
        text: any;
        participants: any;
        args: any;
        command: any;
        usedPrefix: any;
    }): Promise<void>;
    help: string[];
    tags: string[];
    command: string[];
    admin: boolean;
    group: boolean;
};
export default handler;
//# sourceMappingURL=admin-tagall.d.ts.map