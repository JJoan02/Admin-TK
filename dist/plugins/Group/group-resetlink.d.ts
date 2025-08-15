export default handler;
declare function handler(m: any, { conn }: {
    conn: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
    let group: boolean;
    let admin: boolean;
    let botAdmin: boolean;
}
//# sourceMappingURL=group-resetlink.d.ts.map