declare const handler: {
    (m: any, { conn, command, args }: {
        conn: any;
        command: any;
        args: any;
    }): Promise<void>;
    help: string[];
    tags: string[];
    register: boolean;
    command: string[];
    disabled: boolean;
};
export default handler;
//# sourceMappingURL=game-buy.d.ts.map