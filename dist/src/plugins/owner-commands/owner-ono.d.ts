declare const handler: {
    (m: any, { conn, args, isOwner, command }: {
        conn: any;
        args: any;
        isOwner: any;
        command: any;
    }): Promise<any>;
    command: string[];
    owner: boolean;
};
export default handler;
//# sourceMappingURL=owner-ono.d.ts.map