declare const handler: {
    (m: any, { text, conn, args, usedPrefix, command }: {
        text: any;
        conn: any;
        args: any;
        usedPrefix: any;
        command: any;
    }): Promise<any>;
    help: string[];
    tags: string[];
    command: string[];
    chocolates: number;
    register: boolean;
};
export default handler;
//# sourceMappingURL=dl-facebook-video.d.ts.map