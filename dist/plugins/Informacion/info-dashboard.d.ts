export default handler;
declare function handler(m: any, { conn, command }: {
    conn: any;
    command: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
    let register: boolean;
}
//# sourceMappingURL=info-dashboard.d.ts.map