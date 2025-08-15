import { WAConnection } from '@whiskeysockets/baileys';
export declare class RentalExpirationChecker {
    private intervalId;
    private conn;
    constructor(conn: WAConnection);
    start(): void;
    stop(): void;
}
//# sourceMappingURL=rental_expiration_checker.d.ts.map