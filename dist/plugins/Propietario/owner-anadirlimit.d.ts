export default handler;
declare function handler(m: any, { conn, text }: {
    conn: any;
    text: any;
}): Promise<void>;
declare namespace handler {
    let command: string[];
    let rowner: boolean;
}
//# sourceMappingURL=owner-anadirlimit.d.ts.map