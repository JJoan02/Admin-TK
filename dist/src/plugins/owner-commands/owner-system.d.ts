declare const handler: {
    (m: any, { conn }: {
        conn: any;
    }): Promise<void>;
    help: string[];
    tags: string[];
    command: string[];
    register: boolean;
};
export default handler;
//# sourceMappingURL=owner-system.d.ts.map