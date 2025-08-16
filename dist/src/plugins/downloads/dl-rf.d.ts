declare function handler(m: any, { conn }: {
    conn: any;
}): Promise<any>;
declare namespace handler {
    var before: (m: any, { conn }: {
        conn: any;
    }) => Promise<any>;
    var help: string[];
    var tags: string[];
    var command: string[];
}
export default handler;
//# sourceMappingURL=dl-rf.d.ts.map