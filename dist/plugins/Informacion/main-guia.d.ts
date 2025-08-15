export = handler;
declare function handler(m: any, { conn }: {
    conn: any;
}): Promise<void>;
declare namespace handler {
    let command: string[];
    let help: string[];
    let tags: string[];
}
//# sourceMappingURL=main-guia.d.ts.map