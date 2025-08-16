declare const handler: {
    (m: any, { conn, command, usedPrefix, text }: {
        conn: any;
        command: any;
        usedPrefix: any;
        text: any;
    }): Promise<any>;
    help: string[];
    tags: string[];
    command: string[];
    estrellas: number;
};
export default handler;
//# sourceMappingURL=game-setdescription.d.ts.map