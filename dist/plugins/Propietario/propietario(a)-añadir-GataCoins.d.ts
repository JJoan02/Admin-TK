export default handler;
declare function handler(m: any, { conn, text, usedPrefix, command }: {
    conn: any;
    text: any;
    usedPrefix: any;
    command: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
    let group: boolean;
    let rowner: boolean;
}
//# sourceMappingURL=propietario(a)-a%C3%B1adir-GataCoins.d.ts.map