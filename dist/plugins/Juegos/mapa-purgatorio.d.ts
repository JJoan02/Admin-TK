export default handler;
declare function handler(m: any, { isPrems, conn }: {
    isPrems: any;
    conn: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
    let admin: boolean;
}
//# sourceMappingURL=mapa-purgatorio.d.ts.map