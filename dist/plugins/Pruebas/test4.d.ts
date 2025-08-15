export default handler;
declare function handler(m: any, { conn, isRowner }: {
    conn: any;
    isRowner: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
    let rowner: boolean;
}
//# sourceMappingURL=test4.d.ts.map