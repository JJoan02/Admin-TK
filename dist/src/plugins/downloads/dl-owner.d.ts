declare function handler(m: any, { conn }: {
    conn: any;
}): Promise<void>;
declare namespace handler {
    var help: string[];
    var tags: string[];
    var command: string[];
}
export default handler;
//# sourceMappingURL=dl-owner.d.ts.map