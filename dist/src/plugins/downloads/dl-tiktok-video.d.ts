declare const handler: {
    (m: any, { conn, text, args, usedPrefix, command }: {
        conn: any;
        text: any;
        args: any;
        usedPrefix: any;
        command: any;
    }): Promise<void>;
    tags: string[];
    help: string[];
    command: string[];
    group: boolean;
    register: boolean;
};
export default handler;
//# sourceMappingURL=dl-tiktok-video.d.ts.map