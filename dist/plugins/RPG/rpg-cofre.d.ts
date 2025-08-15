export default handler;
declare function handler(m: any, { isPrems, conn }: {
    isPrems: any;
    conn: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
    let level: number;
}
//# sourceMappingURL=rpg-cofre.d.ts.map