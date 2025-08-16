declare const handler: {
    (m: any, { conn, isROwner, text }: {
        conn: any;
        isROwner: any;
        text: any;
    }): Promise<void>;
    help: string[];
    tags: string[];
    command: string[];
    owner: boolean;
};
export default handler;
//# sourceMappingURL=owner-restart-bot.d.ts.map