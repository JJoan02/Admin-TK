export default handler;
declare function handler(m: any, { command, conn, usedPrefix }: {
    command: any;
    conn: any;
    usedPrefix: any;
}): Promise<any>;
declare namespace handler {
    let command: string[];
    let help: string[];
    let tags: string[];
    let register: boolean;
    let limit: number;
}
//# sourceMappingURL=random-anime.d.ts.map