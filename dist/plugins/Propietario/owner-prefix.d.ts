export function getSubbotPrefix(jid: any): any;
export default handler;
declare function handler(m: any, { conn, text, args }: {
    conn: any;
    text: any;
    args: any;
}): Promise<any>;
declare namespace handler {
    let command: string[];
    let owner: boolean;
    let register: boolean;
}
//# sourceMappingURL=owner-prefix.d.ts.map