import { RENTAL_EXPIRED_MESSAGE } from '../content/rental-service-responses';
export class RentalExpirationChecker {
    intervalId = null;
    conn;
    constructor(conn) {
        this.conn = conn;
    }
    start() {
        if (this.intervalId) {
            console.warn("RentalExpirationChecker ya está en ejecución.");
            return;
        }
        this.intervalId = setInterval(async () => {
            console.log("Verificando expiración de alquileres de grupos...");
            let userRents = global.db.data.userRents;
            for (let user in userRents) {
                let rentData = userRents[user];
                if (Array.isArray(rentData.groups)) {
                    for (let i = rentData.groups.length - 1; i >= 0; i--) {
                        let group = rentData.groups[i];
                        let groupData = global.db.data.groupRents[group];
                        if (groupData && Date.now() >= groupData.startTime + groupData.duration) {
                            try {
                                await this.conn.groupLeave(group);
                                delete global.db.data.groupRents[group];
                                rentData.groups.splice(i, 1);
                                await this.conn.reply(user, RENTAL_EXPIRED_MESSAGE(group), null);
                                console.log(`Bot salió del grupo ${group} debido a la expiración del alquiler.`);
                            }
                            catch (e) {
                                console.error(`Error al salir del grupo ${group} o al notificar al usuario ${user}:`, e);
                            }
                        }
                    }
                }
            }
        }, 1000 * 60 * 10);
        console.log("RentalExpirationChecker iniciado.");
    }
    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
            console.log("RentalExpirationChecker detenido.");
        }
    }
}
//# sourceMappingURL=rental_expiration_checker.js.map