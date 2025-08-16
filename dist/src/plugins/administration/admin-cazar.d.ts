declare const handler: {
    (m: any, { conn }: {
        conn: any;
    }): Promise<any>;
    help: string[];
    tags: string[];
    command: string[];
    group: boolean;
};
export default handler;
//# sourceMappingURL=admin-cazar.d.ts.map