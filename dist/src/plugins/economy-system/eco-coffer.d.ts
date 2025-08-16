declare const handler: {
    (m: any, { isPrems, conn }: {
        isPrems: any;
        conn: any;
    }): Promise<void>;
    help: string[];
    tags: string[];
    command: string[];
    register: boolean;
};
export default handler;
//# sourceMappingURL=eco-coffer.d.ts.map